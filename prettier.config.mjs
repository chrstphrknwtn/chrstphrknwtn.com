/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    }
  ],
  arrowParens: 'avoid',
  bracketSpacing: true,
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'none',
  bracketSameLine: true,
  semi: false
}
