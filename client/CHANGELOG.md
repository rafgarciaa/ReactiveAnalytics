### Changes made in Chore/4021 migrate RA to vite

Added Vite 2.8.6
*This version is in line with RTC
Added @vitejs/plugin-react
*With this plugin react import statements are automatically handled, also enables fast refresh
Moved index.html out of client/public into client folder
*This was done because Vite expects the entry point to be in the root directory
Changed import statements to use @ as the root directory
*This is a common alias used with Vite
Removed tsc from build script
*I believe the Vite guidelines recommended using tsc, but it was causing some errors with fdc3
Updated graphql to 16.6.0
*This was done because the version that was currently being used was not able to resolve certain import statements and we could not find the appropriate version of @types/graphql to resolve those issues, and furthermore graphql 16.6.0 automatically gives type definitions for graphql
*Added @rollup-plugin-graphl as a dependency
This was to convert graphql files to ES6 modules so they could be imported as modules
*Added copyOpenfinPlugin and copyWebManifestPlugin to the vite.config
To copy manifest data to the production environment.
*Added both because it is in one build, so there are no modes or target types the way RTC has
Created folders public-openfin and public-pwa
*This was to store the template JSON metadata files to be copied to the production environments
Updated Apollo client to version 3.7.1
*This was done in an effort to resolve the issue of React trying to render Downshift3 and ApolloSearchContainer at the same time, this was the exact error message:
*Alan alluded to upgrading to React 17+ to help resolve this issue
Changed Dockerfile to use node 16 and to build to dist/
*Travis CI was failing without these updated configurations, as it was still using node 12 and react-app-rewired was building to a folder called build/ whereas the default build directory for Vite is dist/
Updated tsconfig to use ES6
*It was initially still using ES5 and that was causing issues in the vite.config because in ES5, const was not a thing yet
