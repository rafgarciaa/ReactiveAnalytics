import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import graphql from '@rollup/plugin-graphql'
import { TransformOption, viteStaticCopy } from 'vite-plugin-static-copy'

const localPort = Number(process.env.PORT) || 3005

const copyPlugin = (isDev: boolean): Plugin[] => {
  const hostUrl = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || '3005'}`

  const transform: TransformOption | undefined = isDev
    ? contents =>
        contents
          .replace(/{\*host_url\*}/g, hostUrl)
          .replace(/{{environment}}/g, 'local')
          .replace(/{{environment_suffix}}/g, ' (LOCAL)')
    : undefined

  return viteStaticCopy({
    flatten: true,
    targets: [
      {
        src: 'public-openfin/*',
        dest: 'openfin',
        transform,
      },
      {
        src: 'public-pwa/*',
        dest: '',
        transform,
      },
    ],
  })
}

const setConfig = ({ mode }) => {
  const isDev = mode === 'development'
  const plugins = [react(), graphql(), copyPlugin(isDev)]

  return defineConfig({
    plugins: plugins,
    preview: {
      port: localPort,
    },
    server: {
      port: localPort,
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
