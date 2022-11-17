import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import graphql from '@rollup/plugin-graphql'
import copy from 'rollup-plugin-copy'

const PORT = Number(process.env.PORT) || 1917

function getBaseUrl(dev: boolean) {
  return dev ? `http://localhost:${PORT}` : `${process.env.DOMAIN || ''}${process.env.URL_PATH || ''}` || ''
}

const copyOpenfinPlugin = (dev: boolean) => {
  const env = process.env.ENVIRONMENT || 'local'
  return {
    ...copy({
      targets: [
        {
          src: `./public-openfin/app.json`,
          dest: './dist/openfin',
          transform: contents =>
            contents
              .toString()
              .replace(/<BASE_URL>/g, getBaseUrl(dev))
              .replace(/<ENV_NAME>/g, env)
              .replace(/<ENV_SUFFIX>/g, env === 'prod' ? '' : env.toUpperCase()),
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
  // const envSuffix = (process.env.ENVIRONMENT || 'local').toUpperCase()
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
  const target = process.env.TARGET || 'web'
  const plugins = [react(), graphql()]

  if (target === 'web') {
    plugins.push(copyWebManifestPlugin(isDev))
  }

  if (target === 'openfin') {
    plugins.push(copyOpenfinPlugin(isDev))
  }
  return defineConfig({
    plugins: plugins,
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
