module.exports = {
  purge: {
    content: [
    './src/components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './src/pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  safelists: [
    /^bg-/,
    /^to-/,
    /^from-/,

  ]
},
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
