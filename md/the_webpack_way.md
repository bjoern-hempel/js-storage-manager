# Javascript Storage Manager

## Getting started

### npm

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



&nbsp;
&nbsp;

Go back to the [readme page](../README.md#user-content-the-webpack-way-the-modern-javascript-way)
