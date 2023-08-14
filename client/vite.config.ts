import graphql from "@rollup/plugin-graphql"
import react from "@vitejs/plugin-react"
import { Plugin, PluginOption } from "vite"
import macrosPlugin from "vite-plugin-babel-macros"
import { createHtmlPlugin } from "vite-plugin-html"
import { TransformOption, viteStaticCopy } from "vite-plugin-static-copy"
import { defineConfig } from "vitest/config"

const localPort = Number(process.env.PORT) || 3005

const OPENFIN_RUNTIME = "29.108.73.14"

const copyPlugin = (isDev: boolean): Plugin[] => {
  const hostUrl = `http://${process.env.HOST || "localhost"}:${
    process.env.PORT || "3005"
  }`

  const transform: TransformOption | undefined = (contents) =>
    isDev
      ? contents
          .replace(/{\*host_url\*}/g, hostUrl)
          .replace(/{{environment}}/g, "local")
          .replace(/{{environment_suffix}}/g, " (LOCAL)")
          .replace(/<OPENFIN_RUNTIME>/, OPENFIN_RUNTIME)
      : contents.replace(/<OPENFIN_RUNTIME>/, OPENFIN_RUNTIME)

  return viteStaticCopy({
    flatten: true,
    targets: [
      {
        src: "public-openfin/*",
        dest: "openfin",
        transform,
      },
      {
        src: "public-pwa/*",
        dest: "",
        transform,
      },
    ],
  })
}

const injectScriptIntoHtml = (env: string) =>
  createHtmlPlugin({
    inject: {
      data: {
        injectScript: `
          <link rel="manifest" href="/manifest.json" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=${
            env === "demo" ? "G-Z3PC9MRCH9" : "G-Y28QSEPEC8"
          }"></script>
        `,
      },
    },
  })

const setConfig = ({ mode }) => {
  const env = process.env.ENV || "local"
  const isDev = mode === "development"
  const plugins: PluginOption[] = [
    react(),
    graphql(),
    injectScriptIntoHtml(env),
    copyPlugin(isDev),
    macrosPlugin(),
  ]

  return defineConfig({
    plugins,
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
          find: "@",
          replacement: "/src",
        },
      ],
    },
    test: {
      // to setup coverage: https://vitest.dev/guide/coverage.html
      //jsdom gives access to browser apis within node, so we can access objects like window: https://vitest.dev/config/#environment
      environment: "jsdom",
      // For the following 2 settings, this article was referenced: https://dev.to/mbarzeev/from-jest-to-vitest-migration-and-benchmark-23pl
      // setupTests.ts imports the jest-dom before each test is run
      setupFiles: "src/setupTests.ts",
      // setting globals: true gives all tests access to the vitest functions without having to import them everytime
      globals: true,
    },
  })
}

export default setConfig
