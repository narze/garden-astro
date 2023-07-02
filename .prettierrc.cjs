module.exports = {
  // astroAllowShorthand: true,
  plugins: [require.resolve("prettier-plugin-astro")],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  trailingComma: "es5",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
}
