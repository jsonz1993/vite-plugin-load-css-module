import * as path from 'path'
import { promises as fs } from 'fs'
import type { Plugin, ResolvedConfig } from 'vite'

const queryRE = /\?.*$/s
const hashRE = /#.*$/s
const cleanUrl = (url: string): string =>
  url.replace(hashRE, '').replace(queryRE, '')
let resolvedConfig: ResolvedConfig
let defaultResolvePlugin: Plugin | undefined
const cssModuleMap = new Map<string, string>()

export interface LoadCssModuleFileOptions {
  include: (id: string) => boolean
}

export default function loadCssModuleFile(
  options: LoadCssModuleFileOptions,
): Plugin {
  const { include } = options

  return {
    name: 'load-css-module',
    enforce: 'pre',

    configResolved(config) {
      defaultResolvePlugin = config.plugins.find(
        (i) => i.name === 'vite:resolve',
      )
      resolvedConfig = config
    },

    async resolveId(id, importer, resolveOpts) {
      if (!defaultResolvePlugin?.resolveId || !include(id)) return null

      if (cssModuleMap.has(id)) return id
      if (id.startsWith('/')) {
        const fullPath = path.join(resolvedConfig.root, id)
        if (cssModuleMap.has(fullPath)) return fullPath
      }

      const result = await defaultResolvePlugin.resolveId.call(
        this,
        id,
        importer,
        resolveOpts,
      )
      if (!result) return null
      let resolvedPath: string
      if (typeof result === 'string') resolvedPath = result
      else resolvedPath = result.id

      const p = path.parse(resolvedPath)
      const newPath = path.format({
        ...p,
        base: `${p.name}.module${p.ext}`,
      })
      cssModuleMap.set(newPath, resolvedPath)
      return newPath
    },

    async load(id) {
      if (cssModuleMap.has(id)) {
        const filePath = cssModuleMap.get(id)!
        try {
          return await fs.readFile(cleanUrl(filePath), 'utf-8')
        } catch (e) {
          return fs.readFile(filePath, 'utf-8')
        }
      }
    },
  }
}
