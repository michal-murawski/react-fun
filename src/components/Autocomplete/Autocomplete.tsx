import {
    ChangeEvent,
    ForwardedRef,
    KeyboardEvent,
    ReactNode,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { forwardRef } from '@/components/forwardRef';
import { LoadingIcon } from './components/LoadingIcon';
import { SearchIcon } from './components/SearchIcon';
import { ClearIcon } from './components/ClearIcon';
import { Option } from './components/Option';
import { isVisibleInContainer } from './helpers';

type Value<V = string> = Option<V>;

interface Option<V = string> {
    value: V;
    label: string;
}

type AutocompleteProps<V = string, M extends boolean = false> = {
    name: string;
    // I decided to make it more generic and accept any type of value, not just string.
    // To simplify the workload, I assume that "getValueCompare" and "getValueLabel" are required.
    // Otherwise, I would need to make more checks.
    getValueCompare: (value: V) => string | boolean | number | undefined | null;
    getInputValue: (value: V) => string;
    value?: Value<V>;
    label?: ReactNode;
    placeholder?: string;
    searchEmptyText?: string;
    defaultOptions?: Option<V>[];
    debounceTimeout?: number;
    width?: string | number;
    highlight?: boolean;
    // Adding multiple is possible, but it would add up a lot of extra code.
    // I had first initially implemented some portion of it (generic types, option clicks), but I decided to remove it to keep the code simpler.
    multiple?: M;
    searchEmpty?: boolean;
    closeOnSelect?: boolean;
    onSelect?: (value: Value<V> | undefined) => void;
    onLoadOptionsAsync?: (value?: string) => Promise<Option<V>[]>;
};

const defaultProps: Partial<AutocompleteProps> = {
    multiple: false,
    searchEmpty: false,
    defaultOptions: undefined,
    closeOnSelect: true,
    searchEmptyText: 'No results found',
    highlight: true,
};

const KeyCode = {
    ArrowDown: 'ArrowDown',
    ArrowUp: 'ArrowUp',
    Enter: 'Enter',
    Escape: 'Escape',
};

/**
 * There could be many ways to implement an autocomplete component with async method for loading options.
 * We need to consider the following:
 * - how do we fetch the data? Fetch, graphql, axios, etc.
 * - how do we handle errors? Do we retry?
 * - do we need multiple selections?
 * This is just one way to do it :)
 */

const AutocompleteInner = <V, M extends boolean = false>(
    props: AutocompleteProps<V, M>,
    ref: ForwardedRef<HTMLInputElement>,
) => {
    const {
        name,
        value,
        label,
        placeholder,
        defaultOptions,
        searchEmpty,
        closeOnSelect,
        onSelect,
        highlight,
        onLoadOptionsAsync,
        getValueCompare,
        getInputValue,
        searchEmptyText,
        width,
        debounceTimeout,
    } = props;
    const optionsContainerRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [focused, setFocused] = useState(false);
    const [innerValue, setInnerValue] = useState<Value<V> | undefined>(value);
    const [innerOptions, setInnerOptions] = useState<Option<V>[] | undefined>(
        defaultOptions,
    );
    const [searchValue, setSearchValue] = useState<string>('');
    const [highlightedOptionIndex, setHighlightedOptionIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    useEffect(() => {
        if (!searchValue && !searchEmpty) {
            setLoading(false);
            setInnerOptions(defaultOptions);
            setHighlightedOptionIndex(0);

            return undefined;
        }

        if (!onLoadOptionsAsync) {
            return undefined;
        }

        setLoading(true);

        onLoadOptionsAsync(searchValue)
            .then((options) => {
                setInnerOptions(options);
                setLoading(false);

                if (highlightedOptionIndex >= options.length) {
                    setHighlightedOptionIndex(
                        options.length ? options.length - 1 : 0,
                    );
                }
            })
            .catch(() => {
                // We should handle errors here, simply log it for now, as no time for more
                setLoading(false);
                setInnerOptions(undefined);
            });

        // We only care about the search value, not the other dependencies
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onLoadOptionsAsync, searchValue, open]);

    useEffect(() => {
        const detectOutOfEventTargetClick = (event: MouseEvent) => {
            if (!containerRef.current) {
                return;
            }

            if (containerRef.current.contains(event.target as Node)) {
                return;
            }

            setOpen(false);
            setFocused(false);
        };

        document.addEventListener('click', detectOutOfEventTargetClick, true);

        return function cleanup() {
            document.removeEventListener(
                'click',
                detectOutOfEventTargetClick,
                true,
            );
        };
    }, []);

    // Manage scroll while navigating with keyboard
    useEffect(() => {
        if (!optionsContainerRef.current) {
            return undefined;
        }

        const child =
            optionsContainerRef.current.children[highlightedOptionIndex];

        if (!child) {
            return undefined;
        }

        if (!isVisibleInContainer(child, optionsContainerRef.current)) {
            child.scrollIntoView({
                behavior: 'smooth',
            });
        }
    }, [highlightedOptionIndex]);

    function isSelectedOption(option: Option<V>, value?: Value<V>): boolean {
        if (!value) {
            return false;
        }

        return getValueCompare(value?.value) === getValueCompare(option.value);
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.code === KeyCode.ArrowDown) {
            event.preventDefault();

            if (
                innerOptions &&
                highlightedOptionIndex < innerOptions?.length - 1
            ) {
                setHighlightedOptionIndex((index) => index + 1);
            }
        } else if (event.code === KeyCode.ArrowUp) {
            event.preventDefault();

            if (highlightedOptionIndex > 0) {
                setHighlightedOptionIndex((index) => index - 1);
            }
        } else if (event.code === KeyCode.Enter && innerOptions) {
            event.preventDefault();

            handleOptionSelect(innerOptions[highlightedOptionIndex]);
        } else if (event.code === KeyCode.Escape) {
            event.preventDefault();

            setOpen(false);
            setSearchValue('');
            inputRef.current?.blur();
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setSearchValue(event.target.value);
    }

    function handleOptionSelect(clickedOption: Option<V>) {
        const newValue =
            innerValue?.value &&
            getValueCompare(innerValue?.value) ===
                getValueCompare(clickedOption.value)
                ? undefined
                : clickedOption;

        setInnerValue(newValue);
        setSearchValue(newValue ? getInputValue(newValue.value) : '');

        if (onSelect) {
            onSelect(newValue);
        }

        if (closeOnSelect) {
            setOpen(false);
        }

        inputRef.current?.blur();
    }

    function handleFocus() {
        setOpen(true);
        setFocused(true);
    }

    function handleClearValue() {
        setInnerValue(undefined);
        setSearchValue('');

        if (onSelect) {
            onSelect(undefined);
        }

        inputRef.current?.focus();
        setOpen(true);
    }

    return (
        <div
            className="relative flex flex-col"
            ref={containerRef}
            style={width ? { width } : {}}
        >
            <label
                htmlFor={name}
                className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon />
                </div>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    {loading && <LoadingIcon />}
                </div>
                <input
                    name={name}
                    autoComplete="off"
                    ref={inputRef}
                    value={searchValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder={placeholder}
                />
                {innerValue && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button
                            type="button"
                            className="cursor-pointer text-gray-400 hover:text-gray-500 focus:text-gray-500"
                            onClick={handleClearValue}
                        >
                            <ClearIcon />
                        </button>
                    </div>
                )}

                {open && (
                    <div
                        ref={optionsContainerRef}
                        className="absolute z-10 mt-1 max-h-72 w-full overflow-y-auto rounded-md bg-white shadow-lg dark:bg-gray-800"
                    >
                        {innerOptions?.length === 0 && searchValue && (
                            <div className="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 transition-all dark:text-white">
                                {searchEmptyText}
                            </div>
                        )}
                        {innerOptions?.map((option, index) => (
                            <Option
                                key={index}
                                option={option}
                                highlight={highlight}
                                searchValue={searchValue}
                                isHovered={index === highlightedOptionIndex}
                                isSelected={isSelectedOption(
                                    option,
                                    innerValue,
                                )}
                                onClick={() => handleOptionSelect(option)}
                                onMouseEnter={() => {
                                    setHighlightedOptionIndex(index);
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const Autocomplete = forwardRef(AutocompleteInner);

// https://github.com/facebook/react/issues/25618
// @ts-ignore
Autocomplete.defaultProps = defaultProps;

export { Autocomplete };
export type { AutocompleteProps, Option };
