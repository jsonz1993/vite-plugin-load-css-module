import * as path from 'path'
import { promises as fs } from 'fs'
import type { Plugin, ResolvedConfig } from 'vite'

const queryRE = /\?.*$/s
const hashRE = /#.*$/s
export const cleanUrl = (url: string): string =>
  url.replace(hashRE, '').replace(queryRE, '')

let resolvedConfig: ResolvedConfig
let defaultResolvePlugin: Plugin | undefined
type FullModulePath = string
type FullOriginPath = string
const cssModuleMap = new Map<FullModulePath, FullOriginPath>()
const originFileMap = new Map<FullOriginPath, FullOriginPath>()

function getFullPath(id: string): string {
  return path.join(resolvedConfig.root, id)
}

function getFilePath(id: string): string | undefined {
  const fullPath = getFullPath(id)
  if (cssModuleMap.has(id)) return cssModuleMap.get(id)
  if (id.startsWith('/') && cssModuleMap.has(fullPath))
    return cssModuleMap.get(fullPath)
}

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

      // 处理 ensureEntryFromUrl 中的路径问题
      // /a.module.css => /absPath/a.module.css
      if (id.startsWith('/')) {
        const fullPath = getFullPath(id)
        if (cssModuleMap.has(fullPath)) return fullPath
      }

      const result = await defaultResolvePlugin.resolveId.call(
        this,
        id,
        undefined,
        resolveOpts || {},
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
      originFileMap.set(resolvedPath, newPath)
      return newPath
    },

    handleHotUpdate(hmrContext) {
      const { file, server } = hmrContext
      if (!originFileMap.has(file)) return
      const cssModuleFile = originFileMap.get(file)!
      const modules = server.moduleGraph.getModulesByFile(cssModuleFile)
      return [...(modules || [])]
    },

    async load(id) {
      const filePath = getFilePath(id)
      if (filePath) {
        try {
          return await fs.readFile(cleanUrl(filePath), 'utf-8')
        } catch (e) {
          return fs.readFile(filePath, 'utf-8')
        }
      }
    },
  }
}
