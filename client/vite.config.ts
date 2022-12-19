import { Plugin } from 'vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import graphql from '@rollup/plugin-graphql'
import macrosPlugin from 'vite-plugin-babel-macros'
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
  const plugins = [react(), graphql(), copyPlugin(isDev), macrosPlugin()]

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
    test: {
      // to setup coverage: https://vitest.dev/guide/coverage.html
      coverage: { provider: 'istanbul' },
      //jsdom gives access to browser apis within node, so we can access objects like window: https://vitest.dev/config/#environment
      environment: 'jsdom',
      // For the following 2 settings, this article was referenced: https://dev.to/mbarzeev/from-jest-to-vitest-migration-and-benchmark-23pl
      // setupTests.ts imports the jest-dom before each test is run
      setupFiles: 'src/setupTests.ts',
      // setting globals: true gives all tests access to the vitest functions without having to import them everytime
      globals: true,
    },
  })
}

export default setConfig
