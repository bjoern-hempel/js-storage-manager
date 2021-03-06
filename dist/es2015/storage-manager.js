/**
 * Class to save data to localStorage.
 *
 *
 * Usage (without observable flag):
 * --------------------------------
 *
 * // Create the "test" storage (localStore.storage.test)
 * let ts = new Storage('test')
 *
 * // Get the entire "test" storage
 * let observable = false
 * testStorage = ts.getStorage(observable)
 *
 * // Save the entire storage to localStorage (localStorage.storage.test)
 * let data = [{'id': 123, 'name': 'Björn Hempel'}]
 * testStorage.data = data
 * ts.setStorage(testStorage)
 *
 * // Save a part of the storage to localStorage (localStorage.storage.test.data2)
 * let data2 = [{'id': 123, 'name': 'Björn Hempel'}]
 * ts.set('data2', data2)
 * console.log(testStorage.data2) // testStorage.data2 = data2 is not needed
 *
 * // Get a part of the storage (localStorage.storage.test.data)
 * let data = ts.get('data')
 *
 * // output the entire "test" storage (localStorage.storage.test.data && localStorage.storage.test.data2)
 * console.log(testStorage)
 *
 *
 * Usage (with observable flag - Proxy):
 * -------------------------------------
 *
 * // Create the "test" storage (localStore.storage.test)
 * let ts = new Storage('test')
 *
 * // Get the entire "test" storage as observable object
 * let observable = true
 * testStorage = ts.getStorage(observable)
 *
 * // Now all changes on testStorage are automatically saved into the localStorage
 * let data = [{'id': 123, 'name': 'Björn Hempel'}]
 * testStorage['data'] = data // auto-save to localstorage
 * // saved in localStorage: ls.storage.test.data[].id = 123, ls.storage.test.data[].name = 'Björn Hempel'
 * // same as: ts.set('data', [{'id': 123, 'name': 'Björn Hempel'}]) -> wenn observable = false
 *
 * // output the entire "test" storage (localStorage.storage.test.data)
 * console.log(testStorage)
 *
 *
 * @author  Björn Hempel <bjoern@hempel.li>
 * @version 1.0 (2019-03-15)
 */
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LS_STORAGE_KEY = 'storage';

var StorageManager =
/*#__PURE__*/
function () {
  function StorageManager(area) {
    _classCallCheck(this, StorageManager);

    this.ls = window.localStorage;
    this.area = area;
    this.initLocalStorage();
  }
  /**
   * Initializes the entire "LocalStorage" storage.
   *
   * @param defaultValue
   */


  _createClass(StorageManager, [{
    key: "initLocalStorage",
    value: function initLocalStorage() {
      var defaultValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this.ls.getItem(LS_STORAGE_KEY) === null) {
        this.ls.setItem(LS_STORAGE_KEY, JSON.stringify(defaultValue));
      }
    }
    /**
     * Returns the entire content of the storage (in parsed state).
     *
     * @returns {any}
     */

  }, {
    key: "getLocalStorage",
    value: function getLocalStorage() {
      this.initLocalStorage();
      return JSON.parse(this.ls.getItem(LS_STORAGE_KEY));
    }
    /**
     * Sets the entire storage within the LocalStorage.
     *
     * @param value
     */

  }, {
    key: "setLocalStorage",
    value: function setLocalStorage(value) {
      this.initLocalStorage();
      this.ls.setItem(LS_STORAGE_KEY, JSON.stringify(value));
    }
    /**
     * Initialize an area of the storage.
     *
     * @param defaultValue
     * @returns {*}
     */

  }, {
    key: "initStorage",
    value: function initStorage() {
      var defaultValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var localStorage = this.getLocalStorage();

      if (!localStorage.hasOwnProperty(this.area)) {
        this.setStorage(defaultValue);
      }

      if (typeof this.storage === 'undefined') {
        this.storage = localStorage[this.area];
      }
    }
    /**
     * Returns an area of the storage.
     *
     * @returns {*}
     */

  }, {
    key: "getStorage",
    value: function getStorage() {
      var _this = this;

      var observable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.initStorage();

      if (observable) {
        return this.observe(this.storage, function (property, value) {
          var data = _this.storage;
          var properties = property.split('.');
          var lastProperty = properties.pop();
          /* Iterate through given properties. */

          properties.forEach(function (key) {
            data = data[key];
          });
          data[lastProperty] = value;

          _this.setStorage(_this.storage);
        });
      }

      return this.storage;
    }
    /**
     * Sets an area of the storage with value.
     *
     * @param storage
     */

  }, {
    key: "setStorage",
    value: function setStorage(storage) {
      var localStorage = this.getLocalStorage();
      localStorage[this.area] = storage;
      this.storage = storage;
      this.setLocalStorage(localStorage);
    }
    /**
     * Gets a key from the storage (this.area).
     *
     * @param key
     * @returns {*}
     */

  }, {
    key: "get",
    value: function get(key) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var observable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var storageArea = this.getStorage(observable);

      if (!storageArea.hasOwnProperty(key)) {
        return defaultValue;
      }

      return storageArea[key];
    }
    /**
     * Sets a key within the storage (this.area).
     *
     * @param key
     * @param value
     */

  }, {
    key: "set",
    value: function set(key, value) {
      var storageArea = this.getStorage();
      storageArea[key] = value;
      this.setStorage(storageArea);
    }
    /**
     * Initialize a queue.
     *
     * @param key
     */

  }, {
    key: "initQueue",
    value: function initQueue() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'queue';
      var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return new QueueManager(this, key, reset);
    }
    /**
     * Adds magic getters and setter methods to the given object to be able to react to changes with a
     * callback function.
     *
     * @param obj
     * @param callback
     */

  }, {
    key: "observe",
    value: function observe(obj, callback) {
      function buildProxy(prefix, obj) {
        var changeHandler = {
          get: function get(target, property) {
            var out = target[property];

            if (out instanceof Object) {
              return buildProxy(prefix + property + '.', out);
            }

            return out;
          },
          set: function set(target, property, value) {
            callback(prefix + property, value);
            target[property] = value;
            return true;
          }
        };
        return new Proxy(obj, changeHandler);
      }

      return buildProxy('', obj);
    }
  }]);

  return StorageManager;
}();

var QueueManager =
/*#__PURE__*/
function () {
  function QueueManager(sm) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'queue';
    var reset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, QueueManager);

    this.sm = sm;
    this.key = key;
    this.init(reset);
  }
  /**
   * Initialize the queue.
   */


  _createClass(QueueManager, [{
    key: "init",
    value: function init() {
      var reset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (reset) {
        this.sm.set(this.key, []);
      }

      var values = this.sm.get(this.key, []);

      if (!Array.isArray(values)) {
        console.error('initQueue: The given values must be an array!');
        return;
      }

      this.sm.set(this.key, values);
    }
    /**
     * Returns all entries of the queue.
     *
     * @param key
     */

  }, {
    key: "getAll",
    value: function getAll() {
      this.init();
      var values = this.sm.get(this.key, []);

      if (!Array.isArray(values)) {
        return [];
      }

      return values;
    }
    /**
     * Adds the given element to the queue.
     *
     * @param value
     * @param key
     */

  }, {
    key: "push",
    value: function push(value) {
      this.init();
      var values = this.sm.get(this.key, []);

      if (!Array.isArray(values)) {
        console.error('pushQueue: The given values must be an array!');
        return;
      }

      values.push(value);
      this.sm.set(this.key, values);
    }
    /**
     * Gets the number of queue entries.
     *
     * @param value
     * @param key
     */

  }, {
    key: "getNumber",
    value: function getNumber() {
      return this.getAll().length;
    }
    /**
     * Gets the next queue entry (FIFO).
     *
     * @param value
     * @param key
     */

  }, {
    key: "getNext",
    value: function getNext() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'queue';
      this.init();
      var values = this.sm.get(this.key, []);

      if (!Array.isArray(values)) {
        return null;
      }

      if (this.getNumber() <= 0) {
        return null;
      }

      return values[0];
    }
    /**
     * Deletes the next queue entry and returns it (FIFO).
     *
     * @param value
     * @param key
     */

  }, {
    key: "deleteNext",
    value: function deleteNext() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'queue';
      this.init();
      var values = this.sm.get(key, []);

      if (!Array.isArray(values)) {
        return null;
      }

      if (this.getNumber() <= 0) {
        return null;
      }

      return values.shift();
    }
  }]);

  return QueueManager;
}();

module.exports = StorageManager;