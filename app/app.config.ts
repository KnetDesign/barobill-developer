export default defineAppConfig({
  ui: {
    colors: {
      primary: 'brand',
      neutral: 'ink'
    },
    container: {
      base: 'bb-container'
    },
    button: {
      slots: { base: 'font-semibold justify-center' },
      compoundVariants: []
    }
  }
})
