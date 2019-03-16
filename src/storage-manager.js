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
"use strict"

const LS_STORAGE_KEY = 'storage'

class StorageManager {
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

module.exports = StorageManager

