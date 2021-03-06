# Javascript Storage Manager

A library that makes the [WebStorage](https://en.wikipedia.org/wiki/Web_storage) easy to use: `localStorage`, `sessionStorage`  and `Cookies` (`sessionStorage` and `Cookies` are in progress: [#2](/../../issues/2), [#3](/../../issues/3)).

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

If you are interested to use this library on the modern javascript way, see [here](md/the_webpack_way.md).

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

## The next steps

### How to use the StorageManager in the easiest way

```javascript
var sm = new StorageManager('namespace');
var data_initial = [{id: 1, name: 'Name 1'}, {id: 2, name: 'Name 2'}];

/* save data_initial to localStorage.storage.namespace.data */
sm.set('data', data_initial);

var data_from_web_storage = sm.get('data');
```

### How to use multiple namespaces

```javascript
var namespace_1 = 'namespace1';
var namespace_2 = 'namespace2';

var sm_1 = new StorageManager(namespace_1);
var sm_2 = new StorageManager(namespace_2);

var data_initial_1 = [{id: 1, name: 'Name 1'}, {id: 2, name: 'Name 2'}];
var data_initial_2 = [{id: 3, name: 'Name 3'}, {id: 4, name: 'Name 4'}];

/* save data_initial to localStorage.storage.namespace1.data */
sm.set('data', data_initial_1);

/* save data_initial to localStorage.storage.namespace2.data */
sm.set('data', data_initial_2);

var data_from_web_storage_1 = sm_1.get('data');
var data_from_web_storage_2 = sm_2.get('data');
```

### How to manage the storage yourself

```javascript
var sm = new StorageManager('namespace');
var data_initial = [{id: 1, name: 'Name 1'}, {id: 2, name: 'Name 2'}];

/* Get the storage data object. */
var storage = sm.getStorage();

/* Do something with the data object. */
storage.data = data_initial;

/* Manually save the data object in WebStorage. */
sm.setStorage(storage)
```

### How to let the StorageManager automatically save changes to the storage data object in web storage

```javascript
var sm = new StorageManager('namespace');
var data_initial = [{id: 1, name: 'Name 1'}, {id: 2, name: 'Name 2'}];
var observable = true; // <- important

/* The returned storage data object is now of type "Proxy". */
var storage = sm.getStorage(observable);

/* Do something with the data object. */
storage.data = data_initial;
/* sm.setStorage(storage) is no longer needed. Changes are automatically saved in WebStorage. */
```

### How to create and use a queue list

```javascript
var sm = new StorageManager('namespace');

var queue_data_1 = {id: 1, name: 'Name 1'};
var queue_data_2 = {id: 2, name: 'Name 2'};

/* Initialize the queue (optionally) */
var qm = sm.initQueue();

/* Add records to the queue. The queue namespace used is 'queue'.
 * Attention. If LocalStorage is used, this value is added again and again. Use the Reset parameter within
 * initQueue to clear the persistent memory before.
 */
qm.push(queue_data_1);
qm.push(queue_data_2);

/* Get the number of queue items. */
var number_of_queue_items = qm.getNumber();

/* Read the entire queue */
var queue = qm.getAll();

/* Get the next queue item (FIFO) */
var next_queue_item = qm.getNext();

/* Get the next queue entry and delete it. */
var next_queue_item = qm.deleteNext();
```

### How to use your own queue namespace or multiple instances of a queue within a namespace

```javascript
var sm = new StorageManager('namespace');

var queue_data_1 = {id: 1, name: 'Name 1'};
var queue_data_2 = {id: 2, name: 'Name 2'};

/* Initialize the queue (optionally) */
var qm = sm.initQueue('my_queue', true);
```

### How to get the LocalStorage area completely managed by the StorageManager

```javascript
var sm = new StorageManager('namespace');

/* Returns the LocalStorage area as a ready-parsed object. */
var local_storage_managed_by_sm = sm.getLocalStorage();
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

6. Change the version number

```bash
$ vi package.json
```

```text
...
"version": "0.0.14",
...
```

7. Commit your changes

```bash
$ git add [file1] [file2] [etc.]
$ git commit -m "my bugfixes" .
$ git push
```

8. Tag your version

```bash
$ git tag v0.0.14
$ git push origin v0.0.14
```

9. Create Release

If necessary:

```bash
$ sudo npm install github-release-notes -g
```

Then:

```bash
$ gren release
```

**Important:** You need a valid Github token to access the API. You can get your own here: https://github.com/settings/tokens

Adapt the changelog text to github if necessary: [changelog](https://github.com/bjoern-hempel/js-storage-manager/releases). Show all commits:

```bash
$ git log --oneline --decorate
```

10. Update [CHANGELOG.md](/CHANGELOG.md)

```bash
$ gren changelog --override
$ git commit -m "Change changelog" .
$ git push
```

11. Publish to npm

If necessary:

```bash
$ npm login
```

Then:

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

Changes are tracked as [GitHub releases](https://github.com/bjoern-hempel/js-storage-manager/releases) or in reverse order [here](/CHANGELOG.md).



&nbsp;
&nbsp;

## C. License

This library is licensed under the MIT License - see the [LICENSE.md](/LICENSE.md) file for details
