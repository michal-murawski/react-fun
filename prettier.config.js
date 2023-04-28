module.exports = {
    semi: true,
    trailingComma: 'all',
    bracketSpacing: true,
    singleQuote: true,
    tabWidth: 4,
    endOfLine: 'auto',
    useTabs: false,
    tailwindConfig: './tailwind.config.js',
    plugins: [require('prettier-plugin-tailwindcss')],
};
