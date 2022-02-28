# A SPA generator to work with the api of blaetterkatalog.de

## Prerequisites

1. nodejs & npm
2. Yarn (Not required)

## Usage

1. Configure the build by editing the variables inside the .env file
2. Execute `yarn build` or `npm run build` from the terminal within the project-directory
3. Output is to be found inside the build-directory `./build`
4. Use the static-files in your desired target-location (F.e. inside a cms)

## The output can be configured with the following environment-variables

`REACT_APP_ROOT_ID`

`REACT_APP_BLAETTERBARES_API_URL`

<!-- `REACT_APP_BLAETTERBARES_FILTER_ID` -->

The variables are easily configurable in the .env file.

## Output

![Output](./screenshots/loaded.png)

## Mainly used technologies

- Typescript
- React.js
- Immutable.js
- Axios
- Fast-XML-parser
- Blueprint.js

## Features

- Skeleton loading placeholders
- Responsive styling depending on root-container width
