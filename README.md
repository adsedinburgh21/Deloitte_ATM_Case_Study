## Prerequisites

[Node.js](http://nodejs.org/) must be installed.

## Installation

```shell
# Clone the repository
> git clone https://github.com/DeloitteDigitalUK/atm-case-study.git

# Install dependencies
> cd atm-case-study
> npm install
```
* Running `npm install` in the app's root directory will install everything you need for development.

## Development Server

* `npm start` will run the app's development server at [http://localhost:3000](http://localhost:3000) with hot module reloading.

## Running Tests

* `npm run test-utils` will run the unit tests for the Utils module.
* `npm run test-utils:watch` will run the unit tests for the Utils module on every change.


## Building

* `npm run build` creates a production build by default.

   To create a development build, set the `NODE_ENV` environment variable to `development` while running this command.

* `npm run clean` will delete built resources.

## Project structure

Here you can see the structure for this repo:

```
|-- atm-case-study
    |-- .eslintignore
    |-- .eslintrc
    |-- .gitignore
    |-- README.md
    |-- nwb.config.js
    |-- package.json
    |-- public
    |   |-- index.html
    |-- src
    |   |-- index.js
    |   |-- components
    |   |   |-- atm.js
    |   |   |-- balance.js
    |   |   |-- main.js
    |   |   |-- navigation.js
    |   |   |-- withdraw.js
    |   |-- router
    |   |   |-- AppRouter.js
    |   |-- utils
    |       |-- utils.js
    |-- test-helpers
    |   |-- mockState.js
    |-- test-utils
    |   |-- mocha.opts
    |   |-- utilsSpec.js
```

**Under the hood, this app is using [`nwb`](https://github.com/insin/nwb). A npm package that helps developers to built and setup Javascript projects. Some of the available scripts mentioned above are mapped to `nwb` commands**.

**For more information see the `package.json` file or run the `nwb` command on your terminal**
