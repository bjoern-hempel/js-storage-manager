# Javascript Storage Manager

A library that makes the [WebStorage](https://en.wikipedia.org/wiki/Web_storage) easy to use: `localStorage` and `sessionStorage` (`sessionStorage` in progress).

![npm](https://img.shields.io/npm/v/js-storage-manager.svg) ![NPM](https://img.shields.io/npm/l/js-storage-manager.svg) ![npm bundle size](https://img.shields.io/bundlephobia/min/js-storage-manager.svg)



&nbsp;
&nbsp;

## Install

### bower

```bash
$ bower install js-storage-manager
```

### npm

```bash
$ npm install js-storage-manager
```

### Git

```bash
$ git clone https://github.com/bjoern-hempel/js-storage-manager.git
```

or

```bash
$ git clone git@github.com:bjoern-hempel/js-storage-manager.git
```



&nbsp;
&nbsp;

## Getting started

### bower

```bash
$ mkdir webproject && cd webproject
$ bower install js-storage-manager
$ vi index.html
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>A simple js-storage-manager example</title>
    <script src="bower_components/js-storage-manager/dist/storage-manager.min.js"></script>
  </head>
  <body>
    <script>
      var sm = new StorageManager('namespace');

      sm.set('data', [{id: 123, name: 'Name 1'}, {id: 123, name: 'Name 2'}]);

      document.write(JSON.stringify(sm.get('data')));
    </script>
  </body>
</html>
```

### npm

#### The direct way (the old javascript way)

```bash
$ mkdir webproject && cd webproject
$ npm install js-storage-manager
$ vi index.html
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>A simple js-storage-manager example</title>
    <script src="node_modules/js-storage-manager/dist/storage-manager.min.js"></script>
  </head>
  <body>
    <script>
      var sm = new StorageManager('namespace');

      sm.set('data', [{id: 123, name: 'Name 1'}, {id: 123, name: 'Name 2'}]);

      document.write(JSON.stringify(sm.get('data')));
    </script>
  </body>
</html>
```

#### The webpack way (the modern javascript way)

```bash
$ mkdir webproject && cd webproject
```

```bash
$ vi package.json
```

```json
{
  "name": "js-storage-manager-test",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.js",
    "start:dev": "webpack-dev-server"
  },
  "keywords": [],
  "author": "",
  "license": "MIT"
}
```

```bash
$ npm install js-storage-manager --save
$ npm install webpack --save-dev
$ npm install webpack-cli --save-dev
$ npm install webpack-dev-server --save-dev
$ mkdir src
$ vi src/index.js
```

```javascript
let StorageManager = require('js-storage-manager')

let sm = new StorageManager('namespace')

function component() {
  let element = document.createElement('div');
  
  sm.set('data', [{id: 123, name: 'Name 1'}, {id: 123, name: 'Name 2'}]);

  element.innerHTML = JSON.stringify(sm.get('data'));

  return element;
}

document.body.appendChild(component());
```

```bash
$ vi webpack.config.js
```

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: true,
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080
  }
};
```

```bash
$ mkdir dist
$ vi dist/index.html
```

```html
<!doctype html>
<html>
  <head>
    <title>A simple js-storage-manager example</title>
  </head>
  <body>
    <script src="main.js"></script>
  </body>
</html>
```

```bash
$ npm run start:dev
```

All your changes are now under observation and will automatically be re-rendered in the `/dist` directory. Make the changes in `/src` and paste them directly into your browser.

Open your browser at: http://localhost:8080 (to see the results)

### Git

```bash
$ mkdir webproject && cd webproject
$ mkdir vendor && cd vendor
$ git clone https://github.com/bjoern-hempel/js-storage-manager.git
$ cd ..
$ vi index.html
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>A simple js-storage-manager example</title>
    <script src="vendor/js-storage-manager/dist/storage-manager.min.js"></script>
  </head>
  <body>
    <script>
      var sm = new StorageManager('namespace');

      sm.set('data', [{id: 123, name: 'Name 1'}, {id: 123, name: 'Name 2'}]);

      document.write(JSON.stringify(sm.get('data')));
    </script>
  </body>
</html>
```



&nbsp;
&nbsp;

## Maintenance

1. Checkout the repository

```bash
$ git clone git@github.com:bjoern-hempel/js-storage-manager.git && cd js-storage-manager
$ npm install
```

2. Extend, fix bugs in classes below `/src` folder. 
3. Write more tests below the `/test` folder.
4. Run the tests.

```bash
$ npm test
```

or

```bash
$ npm run test:unit
```

5. Build the `/dist` files

```bash
$ npm run build
```

6. Commit your changes

```bash
$ git add ...
$ git commit -m "my bugfixes" .
$ git push
```

7. Change the version number

```bash
$ vi package.json
```

```text
...
"version": "0.0.14",
...
```

```bash
$ git tag v0.0.14
$ git push origin v0.0.14
```

8. Publish on npm

```bash
$ npm publish
```


&nbsp;
&nbsp;

## A. Authors

* Björn Hempel <bjoern@hempel.li> - _Initial work_ - [https://github.com/bjoern-hempel](https://github.com/bjoern-hempel)



&nbsp;
&nbsp;

## B. Changelog

Changes are tracked as [GitHub releases](https://github.com/bjoern-hempel/js-storage-manager/releases).



&nbsp;
&nbsp;

## C. License

This library is licensed under the MIT License - see the [LICENSE.md](/LICENSE.md) file for details
