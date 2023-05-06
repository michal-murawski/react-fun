import {
    ReactElement,
    Ref,
    RefAttributes,
    forwardRef as forwardRefReact,
} from 'react';

/**
 * To make generic types work with TS and forwardRef
 * https://fettblog.eu/typescript-react-generic-forward-refs/#option-3%3A-augment-forwardref
 */
const forwardRef = <T, P = {}>(
    render: (props: P, ref: Ref<T>) => ReactElement | null,
) =>
    forwardRefReact(render) as (
        props: P & RefAttributes<T>,
    ) => ReactElement | null;

export { forwardRef };
