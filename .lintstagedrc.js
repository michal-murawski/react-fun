const path = require('path');

module.exports = {
    // Type check TypeScript files
    '**/*.(ts|tsx)': () => 'tsc --noEmit',

    '*.(json|md)': (filenames) => {
        const filesString = filenames.join(' ');

        return [`prettier --write ${filesString}`];
    },

    '*.{js,jsx,ts,tsx}': (filenames) => {
        const filesString = filenames.join(' ');

        return [
            `next lint --fix --file ${filenames
                .map((f) => path.relative(process.cwd(), f))
                .join(' --file ')}`,
            `prettier --write ${filesString}`,
        ];
    },
};
