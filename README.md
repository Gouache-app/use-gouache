# @gouache-app/use-gouache

[![npm version](https://badge.fury.io/js/@gouache-app%2Fuse-gouache.svg)](https://badge.fury.io/js/@gouache-app%2Fuse-gouache)

## Table of Contents

- [@gouache-app/use-gouache](#gouache-appuse-gouache)
  - [Table of Contents](#table-of-contents)
  - [Intro](#intro)
  - [Features](#features)
  - [Install](#install)
    - [With Yarn](#with-yarn)
    - [With NPM](#with-npm)
  - [Usage](#usage)

## Intro

Welcome to the `useGouache` hook. This hook is needed in order to use the [Gouache app](https://gouache.app/). Gouache is a Design Data Platform created to help your team collaborate, prototyping & uniformise your apps from design to prod.

## Features

- Hot reload (Live updates)
- Easy to use
- Loading state

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

### Get your styles object:

```jsx
import { useGouache } from "@gouache-app/use-gouache";

const MyApp = () => {
  const { styles, isLoading } = useGouache("MY_GOUACHE_API_KEY");

  if(isLoading){
    return <p>Loading...</p>;
  }

  return (
    <>
      <p>{JSON.stringify(styles)}</p>
    </>
  )
}
```

### Connect with `styled-components` theme provider:

...

if you already have a theme, you can add it like this:



### Get your project's API key
TODO: Video


## Documentation

For more information about the Gouache, visit https://gouache-doc.netlify.app/ and to use the platform, visit https://gouache.app/.


## Contributing

We encourage pull requests and other contributions from the community.