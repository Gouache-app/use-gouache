# @gouache-app/use-gouache

[![npm version](https://badge.fury.io/js/@gouache-app%2Fuse-gouache.svg)](https://badge.fury.io/js/@gouache-app%2Fuse-gouache) ![Gouache](https://circleci.com/gh/Gouache-app/use-gouache.svg?style=shield)

<p align="center">
  <img style="width: 200px; margin: 0 auto;" src="https://cdn.sanity.io/images/fc5brcyr/production/ea382e95cec9a0a0b7193f7d96694ab66a7f1d3c-512x512.png" />
</p>

## Table of Contents

- [Intro](#intro)
- [Features](#features)
- [Tutorials](#tutorials)
- [Install](#install)
  - [With Yarn](#with-yarn)
  - [With NPM](#with-npm)
- [Usage](#usage)
  - [Basics](#basics)
  - [How to get your project's API key?](#how-to-get-your-projects-api-key)
  - [Default style object / production mode](#default-style-object--production-mode)
  - [URL params override](#url-paramsoverride)
- [Documentation](#documentation)
- [Contributing](#contributing)
## Intro

Welcome to the `useGouache` hook. This hook is needed in order to use the [Gouache app](https://gouache.app/). Gouache is a Design Data Platform created to help your team collaborate, prototyping & uniformise your apps from design to prod.

## Features

- Hot reload (Live updates)
- Loading state
- Production mode
- Styles override using search params

## Tutorials

- [Let's introduce Gouache](https://blog.gouache.app/)
- [Gouache | Advanced features](https://blog.gouache.app/)
- [Theming with Gouache and styled-components 💅🏾](https://blog.gouache.app/)


## Install


### With Yarn

```sh
yarn add @gouache-app/use-gouache
```

### With NPM

```sh
npm i @gouache-app/use-gouache --save
```


## Usage

### Basics

```jsx
import { useGouache } from '@gouache-app/use-gouache';

const App = () => {
  const { styles, isLoading } = useGouache({ apiKey: 'MY_GOUACHE_API_KEY' });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <p>{JSON.stringify(styles)}</p>
    </>
  );
};
```

### How to get your project's API key?
 
Take a look at our docs: https://docs.gouache.app/docs/faq/api-key

### Default style object / production mode

We recommend using the use-gouache hook in production using the defaultStyles object in order to prevent fetching the styles object in production. To do so, you need to download the Styles object and use the `defaultStyles` and the `useDefaultStyles` params.

```jsx
import defaultStyles from './path_to_downloaded_json_file.json';

const App = () => {
  const { styles, isLoading } = useGouache({
    apiKey: 'MY_API_KEY',
    useDefaultStyles: true,
    defaultStyles,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <p>{JSON.stringify(styles)}</p>
    </>
  );
};
```

### URL params override

When you're using Gouache in production, like said earlier, you should use the defaultStyles object. That said, it did not mean that you cannot use the Gouache platform to test things out. To override the default styles, you can add the following search params to your app URL `?gouache-api-key=MY_GOUACHE_API_KEY`. (replacing `MY_GOUACHE_API_KEY` with your project's API key). This will only change the styles in your browser and not on any other user.

ex: https://example.com?gouache-api-key=MY_GOUACHE_API_KEY


## Documentation

For more information about the Gouache, visit https://docs.gouache.app/ and to use the platform, visit https://gouache.app/.


## Contributing

We encourage pull requests and other contributions from the community.

<details>
  <summary>Development tips</summary>

  ## Testing

  to run tests, simply run `yarn test`.

  ## Local development using `yarn link`

  If you're getting a `Warning: Invalid hook call.` error, it's because there is an issue with the bundler thinking there are "two" react. 

  There is 2 workaround (I preffer use the first one):

  https://github.com/facebook/react/issues/14257#issuecomment-595183610
  ```
  cd PACKAGE_YOU_DEBUG_LOCALLY
  yarn link
  yarn install
  cd node_modules/react
  yarn link
  cd ../../node_modules/react-dom
  yarn link
  cd YOUR_PROJECT
  yarn link PACKAGE_YOU_DEBUG_LOCALLY
  yarn link react
  yarn link react-dom
  ```

  and 

  https://reactjs.org/warnings/invalid-hook-call-warning.html

  ```
  This problem can also come up when you use npm link or an equivalent. In that case, your bundler might “see” two Reacts — one in application folder and one in your library folder. Assuming myapp and mylib are sibling folders, one possible fix is to run npm link ../myapp/node_modules/react from mylib. This should make the library use the application’s React copy.
  ```
</details>
