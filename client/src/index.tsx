import React from "react"
import ReactDOM from "react-dom"

import App from "@/App"
import * as serviceWorker from "@/serviceWorker"
import { getEnvironment } from "@/utils"

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault()
  window.beforeInstallPromptEvent = e
})

async function init() {
  const env = getEnvironment()
  const envSuffix = env === "demo" ? "" : ` (${env.toUpperCase()})`

  document.title = `Reactive Analytics${envSuffix}`

  console.log(
    `%cReactive Analytics ${
      import.meta.env.VITE_BUILD_VERSION || "vUnknown"
    }, running in ${env.toUpperCase()}`,
    "font-weight:bold;",
  )

  ReactDOM.render(<App />, document.getElementById("root"))
  serviceWorker.register()

  window.gtag("js", new Date())
  window.gtag("config", env === "demo" ? "G-HHXS2LJP6P" : "G-Y28QSEPEC8")
}

init()
