# vite-plugin-load-css-module

💂‍♂️A plugin to extend vite's css module rules, not just ".module" suffix。

Use the resolveId hook to trick the vite css plugin by returning the filename as '.module.css'.

# Install

```
npm i vite-plugin-load-css-module -D
```

# Usage

```typescript
import { defineConfig } from 'vite'
import loadCssModulePlugin from 'vite-plugin-load-css-module';

// https://vitejs.dev/config/
export default defineConfig({
  ...
  plugins: [
    loadCssModulePlugin({
      include: id => id.endsWith('less') && !id.includes('node_modules'),
    })
  ]
  ...
})
```

# Example

[https://github.com/jsonz1993/vite-plugin-load-css-module/tree/master/playground](https://github.com/jsonz1993/vite-plugin-load-css-module/tree/master/playground)

[Post](https://github.com/jsonz1993/blog/issues/38)
