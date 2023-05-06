import classNames from 'classnames';
import type { Option as OptionType } from '@/components/Autocomplete/Autocomplete';

interface OptionProps<V> {
    option: OptionType<V>;
    isHovered: boolean;
    isSelected: boolean;
    highlight?: boolean;
    searchValue?: string;
    onClick?: () => void;
    onMouseEnter?: () => void;
}

function getHighlightedLabel(label: string, searchValue?: string) {
    if (!searchValue) return label;

    // Painful for the performance
    // Consider using string methods instead of regex
    const labelParts = label.split(new RegExp(`(${searchValue})`, 'ig'));

    return labelParts.map((part, index) => (
        <span key={index}>
            {part.toLowerCase() === searchValue.toLowerCase() ? (
                <span className="bg-rose-800">{part}</span>
            ) : (
                part
            )}
        </span>
    ));
}

function Option<V>({
    option,
    highlight,
    searchValue,
    isHovered,
    isSelected,
    onClick,
    onMouseEnter,
}: OptionProps<V>) {
    return (
        <div
            className={classNames(
                'relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 transition-all dark:text-white',
                {
                    'bg-blue-50 dark:bg-gray-700': isHovered,
                    'bg-blue-100 dark:bg-gray-600': isSelected,
                },
            )}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
        >
            {highlight
                ? getHighlightedLabel(option.label, searchValue)
                : option.label}
        </div>
    );
}

export { Option };
