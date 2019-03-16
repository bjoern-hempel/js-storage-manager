/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/storage.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
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


const LS_STORAGE_KEY = 'storage'

class Storage {
	constructor (area) {
		this.ls = window.localStorage
		this.area = area

		this.initLocalStorage()
	}

	/**
	 * Initializes the entire "LocalStorage" storage.
	 *
	 * @param defaultValue
	 */
	initLocalStorage (defaultValue = {}) {
		if (this.ls.getItem(LS_STORAGE_KEY) === null) {
			this.ls.setItem(LS_STORAGE_KEY, JSON.stringify(defaultValue))
		}
	}

	/**
	 * Returns the entire content of the storage (in parsed state).
	 *
	 * @returns {any}
	 */
	getLocalStorage () {
		this.initLocalStorage()

		return JSON.parse(this.ls.getItem(LS_STORAGE_KEY))
	}

	/**
	 * Sets the entire storage within the LocalStorage.
	 *
	 * @param value
	 */
	setLocalStorage (value) {
		this.initLocalStorage()

		this.ls.setItem(LS_STORAGE_KEY, JSON.stringify(value))
	}

	/**
	 * Initialize an area of the storage.
	 *
	 * @param defaultValue
	 * @returns {*}
	 */
	initStorage (defaultValue = {}) {
		let localStorage = this.getLocalStorage()

		if (!localStorage.hasOwnProperty(this.area)) {
			this.setStorage(defaultValue)
		}

		if (typeof this.storage === 'undefined') {
			this.storage = localStorage[this.area]
		}
	}

	/**
	 * Returns an area of the storage.
	 *
	 * @returns {*}
	 */
	getStorage (observable = false) {
		this.initStorage()

		if (observable) {
			return this.observe(
				this.storage,
				(property, value) => {
					let data = this.storage

					let properties = property.split('.')
					let lastProperty = properties.pop()

					/* Iterate through given properties. */
					properties.forEach(function (key) {
						data = data[key]
					})

					data[lastProperty] = value

					this.setStorage(this.storage)
				}
			)
		}

		return this.storage
	}

	/**
	 * Sets an area of the storage with value.
	 *
	 * @param storage
	 */
	setStorage (storage) {
		let localStorage = this.getLocalStorage()

		localStorage[this.area] = storage

		this.storage = storage

		this.setLocalStorage(localStorage)
	}

	/**
	 * Gets a key from the storage (this.area).
	 *
	 * @param key
	 * @returns {*}
	 */
	get (key, defaultValue = null, observable = false) {
		let storageArea = this.getStorage(observable)

		if (!storageArea.hasOwnProperty(key)) {
			return defaultValue
		}

		return storageArea[key]
	}

	/**
	 * Sets a key within the storage (this.area).
	 *
	 * @param key
	 * @param value
	 */
	set (key, value) {
		let storageArea = this.getStorage()

		storageArea[key] = value

		this.setStorage(storageArea)
	}

	/**
	 * Initialize a queue.
	 *
	 * @param key
	 */
	initQueue (key = 'queue') {
		let values = this.get(key, [])

		if (!Array.isArray(values)) {
			console.error('initQueue: The given values must be an array!')
			return
		}

		this.set(key, values)
	}

	/**
	 * Returns all entries of the queue.
	 *
	 * @param key
	 */
	getQueue (key = 'queue') {
		this.initQueue(key)

		let values = this.get(key, [])

		if (!Array.isArray(values)) {
			return []
		}

		return values
	}

	/**
	 * Adds the given element to the queue.
	 *
	 * @param value
	 * @param key
	 */
	pushQueue (value, key = 'queue') {
		this.initQueue(key)

		let values = this.get(key, [])

		if (!Array.isArray(values)) {
			console.error('pushQueue: The given values must be an array!')
			return
		}

		values.push(value)

		this.set(key, values)
	}

	/**
	 * Gets the number of queue entries.
	 *
	 * @param value
	 * @param key
	 */
	getNumberOfQueuesItems (key = 'queue') {
		return this.getQueue(key).length
	}

	/**
	 * Gets the next queue entry (FIFO).
	 *
	 * @param value
	 * @param key
	 */
	getNextQueueItem (key = 'queue') {
		this.initQueue(key)

		let values = this.get(key, [])

		if (!Array.isArray(values)) {
			return null
		}

		if (this.getNumberOfQueuesItems(key) <= 0) {
			return null
		}

		return values[0]
	}

	/**
	 * Deletes the next queue entry and returns it (FIFO).
	 *
	 * @param value
	 * @param key
	 */
	deleteNextQueueItem (key = 'queue') {
		this.initQueue(key)

		let values = this.get(key, [])

		if (!Array.isArray(values)) {
			return null
		}

		if (this.getNumberOfQueuesItems(key) <= 0) {
			return null
		}

		return values.shift()
	}

	/**
	 * Adds magic getters and setter methods to the given object to be able to react to changes with a
	 * callback function.
	 *
	 * @param obj
	 * @param callback
	 */
	observe (obj, callback) {
		function buildProxy (prefix, obj) {
			let changeHandler = {
				get: (target, property) => {
					const out = target[property]

					if (out instanceof Object) {
						return buildProxy(prefix + property + '.', out)
					}

					return out
				},
				set: (target, property, value) => {
					callback(prefix + property, value)

					target[property] = value

					return true
				}
			}

			return new Proxy(obj, changeHandler)
		}

		return buildProxy('', obj)
	}
}

module.exports = Storage



/***/ })

/******/ });
//# sourceMappingURL=storage.js.map