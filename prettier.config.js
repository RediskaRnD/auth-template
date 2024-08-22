module.exports = {
  plugins: [
    'prettier-plugin-packagejson',

    'prettier-plugin-import-sort',
    'prettier-plugin-organize-imports',
    'prettier-plugin-style-order',
    'prettier-plugin-tailwindcss', // MUST come last
  ],
  tailwindFunctions: ['clsx'],
};
