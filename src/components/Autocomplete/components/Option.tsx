import classNames from 'classnames';
import type { Option as OptionType } from '@/components/Autocomplete/Autocomplete';

interface OptionProps<V> {
    label: string;
    isHovered: boolean;
    isSelected: boolean;
    highlight?: boolean;
    searchValue?: string;
    onClick?: () => void;
    onMouseEnter?: () => void;
}

function highlightMatchingLabel(label: string, searchValue?: string) {
    if (!searchValue) return label;

    // Painful for the performance
    // Consider using string methods instead of regex, benchmark it
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
    label,
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
            {highlight ? highlightMatchingLabel(label, searchValue) : label}
        </div>
    );
}

export { Option };
export type { OptionProps };
