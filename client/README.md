# Reactive Analytics Client

Reactive Analytics client is a GraphQL driven React application that showcases how to consume GraphQL queries and subscriptions within a strong-typed React application.

## Installation

Reactive Analytics client has package dependencies on the parent repository that gets injected using yarn workspaces. From the root directory run `yarn install` to install all dependencies.

```sh
  [ReactiveAnalytics] $ yarn install
```

## Working with the Client

### Naming Convention

- All folders named using kebab case
- Only use the `.tsx` extension for files containing tsx syntax
- All `.tsx` files named using title case and the file name must match the default export
- All `.ts` files named using camel case
- Exceptions to the guidelines are okay when warrented!

### Files and Folder Structure

> Note: not all files and folders are listed, only the essentials

    |-- src
        |-- __generated__: auto-generated the type definition files for graphql
        |-- apollo: the configuration files fo the apollo client
        |-- assets: fonts and images that do not belong in public
            |-- StyledComponents.tsx: all global styled-components
        |-- common: any file that does not have an obvious parent
        |-- containers: data-fetching and sub-component rendering elements
            |-- Apollo____Container.tsx: main container file
            |-- components: rendering elements for the parent container
            |-- graphql: fragments and connections for the parent container
        |-- rt-theme: files used to generate the global style of the client

## Testing

### Run Tests:

`$ yarn test`

### Setup Vitest VSCode extension

1. Download Version 0.2.32 of Vitest VSCode extension here: https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer&ssr=false#version-history
   - We are downloading an older version because the newest one breaks when running tests and debugging
2. Install extension in VSCode from VSIX file
3. yarn install Vitest at the root folder of RA (the extension expects vitest to be installed at the root folder)
4. Configure extension
   - navigate to the vitest extension on the extensions tab in VSCode
   - click on the cog icon and go to Extension Settings
   - On the folder subtab, click ReactiveAnalytics
5. You should now see a flask on your sidebar tools, click into it and the extension should now be configured

## Progressive Web App (PWA)

Reactive Analytics can be installed as a progressive web application.

The settings for the PWA are configured in [`manifest.json`](public-pwa/manifest.json).

### Token replacement

The [PWA `manifest.json`](public-pwa/manifest.json) file and the [OpenFin manifest](public-openfin/app.json) contain tokens in the form `{{token}}` that can be replaced at build or run time with environment-specific values (e.g. the application name may have an environment suffix).

#### Local token replacement

When running the client locally with the tokens are replaced with vite [`vite-plugin-static-copy`](https://github.com/sapphi-red/vite-plugin-static-copy).

It only takes place when Vite `mode === development`, i.e. when `yarn start` is used, and it uses environment variables like `ENVIRONMENT_NAME` defined in the `.env.development` file, or defaulted.

#### Docker token replacement

When running in docker, i.e. in a deployment environment, the token replacement is done by the nginx web server, also with environment variables.

For this, we don't use the `nginx/nginx` base docker image, but instead the `openresty/openresty` docker image, which adds Lua scripting modules to nginx that allows us to do this.

### GraphQL Ecosystem

Reactive Analytics client uses graphql import syntax to seperate fragments from queries. When writting a query opt to move non-identification fields into their own fragment file. In the query import the fragment using `#import "{relativepath}.graphql"` at the top of the query file. Keep all graphql Queries, Subsriptions, Mutations, and Fragments in seperate **.graphql** files. This will allow apollo-codegen to easily detect the elements and generate typings.
