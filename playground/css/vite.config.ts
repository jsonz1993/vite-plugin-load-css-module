import loadCssModuleFile from '../../dist'

export default {
  plugins: [
    loadCssModuleFile({
      include: (id) => id.includes('.less') || id.includes('.scss'),
    }),
  ],
}
