import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import graphql from '@rollup/plugin-graphql'
import copy from 'rollup-plugin-copy'

const copyOpenfinPlugin = () => {
  const scheme = process.env.HTTPS === 'true' ? 'https' : 'http'
  const hostUrl = `${scheme}://${process.env.HOST || 'localhost'}:${process.env.PORT || '3005'}`
  const env = process.env.ENVIRONMENT_NAME || 'local'
  return {
    ...copy({
      targets: [
        {
          src: `./public/app.json`,
          dest: './dist/openfin',
          transform: contents => {
            const transformed = contents
              .toString()
              .replace(/local/g, env)
              .replace(/LOCAL/g, env === 'prod' ? '' : env.toUpperCase())
              .replace(/http\:\/\/localhost\:3005/g, hostUrl)
            return transformed
          },
        },
      ],
      verbose: true,
      // For dev, (most) output generation hooks are not called, so this needs to be buildStart.
      // For prod, writeBundle is the appropriate hook, otherwise it gets wiped by the dist clean.
      // Ref: https://vitejs.dev/guide/api-plugin.html#universal-hooks
      hook: 'writeBundle',
    }),
  }
}

const copyWebManifestPlugin = () => {
  // const envSuffix = (process.env.ENVIRONMENT || 'local').toUpperCase()
  return {
    ...copy({
      targets: [
        {
          src: './public/manifest.json',
          dest: './dist',
          transform: contents =>
            contents
              .toString()
              // We don't want to show PROD in the PWA name
              .replace(/ \(DEV\)/g, ''),
        },
      ],
      verbose: true,
      // For dev, (most) output generation hooks are not called, so this needs to be buildStart.
      // For prod, writeBundle is the appropriate hook, otherwise it gets wiped by the dist clean.
      // Ref: https://vitejs.dev/guide/api-plugin.html#universal-hooks
      hook: 'writeBundle',
    }),
  }
}
const setConfig = ({ mode }) => {
  const isDev = mode === 'development'
  const plugins = [react(), graphql()]
  if (!isDev) {
    plugins.push(copyOpenfinPlugin())
    plugins.push(copyWebManifestPlugin())
  }
  return defineConfig({
    plugins: plugins,
    server: {
      port: process.env.PORT ? Number(process.env.PORT) : 3005,
    },
    resolve: {
      alias: [
        {
          // see https://github.com/vitejs/vite/issues/279#issuecomment-773454743
          find: '@',
          replacement: '/src',
        },
      ],
    },
  })
}

export default setConfig
