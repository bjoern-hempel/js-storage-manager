# Javascript Storage Manager

A library that makes the WebStorage easy to use: `localStorage` and `sessionStorage` (`sessionStorage` in progress).

![npm](https://img.shields.io/npm/v/js-storage-manager.svg) ![NPM](https://img.shields.io/npm/l/js-storage-manager.svg) ![npm bundle size](https://img.shields.io/bundlephobia/min/js-storage-manager.svg)


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

## Usage

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

#### The direct way (the old way)

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

#### The webpack way (the modern way)

Todo..

## Maintenance

```bash
$ git clone git@github.com:bjoern-hempel/js-storage-manager.git && cd js-storage-manager
$ npm install
```

1. Extend, fix bugs in classes below `/src` folder. 
2. Write more tests below the `/test` folder.
3. Run the tests.

```bash
$ npm run test:unit
```


## A. Authors

* Björn Hempel <bjoern@hempel.li> - _Initial work_ - [https://github.com/bjoern-hempel](https://github.com/bjoern-hempel)

## B. License

This library is licensed under the MIT License - see the [LICENSE.md](/LICENSE.md) file for details
