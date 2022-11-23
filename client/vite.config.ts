import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import graphql from '@rollup/plugin-graphql'
import copy from 'rollup-plugin-copy'

const copyOpenfinPlugin = (dev: boolean) => {
  const scheme = process.env.HTTPS === 'true' ? 'https' : 'http'
  const hostUrl = `${scheme}://${process.env.HOST || 'localhost'}:${process.env.PORT || '3005'}`
  const env = process.env.ENVIRONMENT_NAME || 'local'
  return {
    ...copy({
      targets: [
        {
          src: `./public-openfin/app.json`,
          dest: './dist/openfin',
          transform: contents => {
            const transformed = contents
              .toString()
              .replace(/{\*host_url\*}/g, hostUrl)
              .replace(/{{environment}}/g, env)
              .replace(/{{environment_suffix}}/g, env === 'prod' ? '' : env.toUpperCase())
            return transformed
          },
        },
      ],
      verbose: true,
      // For dev, (most) output generation hooks are not called, so this needs to be buildStart.
      // For prod, writeBundle is the appropriate hook, otherwise it gets wiped by the dist clean.
      // Ref: https://vitejs.dev/guide/api-plugin.html#universal-hooks
      hook: dev ? 'buildStart' : 'writeBundle',
    }),
  }
}

const copyWebManifestPlugin = (dev: boolean) => {
  return {
    ...copy({
      targets: [
        {
          src: './public-pwa/manifest.json',
          dest: dev ? './public' : './dist',
          transform: contents =>
            contents
              .toString()
              // We don't want to show PROD in the PWA name
              .replace(/{{environment_suffix}}/g, dev ? ' (DEV)' : ''),
        },
      ],
      verbose: true,
      // For dev, (most) output generation hooks are not called, so this needs to be buildStart.
      // For prod, writeBundle is the appropriate hook, otherwise it gets wiped by the dist clean.
      // Ref: https://vitejs.dev/guide/api-plugin.html#universal-hooks
      hook: dev ? 'buildStart' : 'writeBundle',
    }),
  }
}

const setConfig = ({ mode }) => {
  const isDev = mode === 'development'
  const plugins = [react(), graphql(), copyOpenfinPlugin(isDev), copyWebManifestPlugin(isDev)]
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
