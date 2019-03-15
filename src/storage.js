const LS_STORAGE_KEY = 'storage'

export class Storage {
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
	initLocalStorage(defaultValue = {}) {
		if (this.ls.getItem(LS_STORAGE_KEY) === null) {
			this.ls.setItem(LS_STORAGE_KEY, JSON.stringify(defaultValue))
		}
	}

	/**
	 * Returns the entire content of the storage (in parsed state).
	 *
	 * @returns {any}
	 */
	getLocalStorage() {
		this.initLocalStorage()

		return JSON.parse(this.ls.getItem(LS_STORAGE_KEY))
	}

	/**
	 * Sets the entire storage within the LocalStorage.
	 *
	 * @param value
	 */
	setLocalStorage(value) {
		this.initLocalStorage()

		this.ls.setItem(LS_STORAGE_KEY, JSON.stringify(value))
	}

	/**
	 * Initialize an area of the storage.
	 *
	 * @param defaultValue
	 * @returns {*}
	 */
	initStorage(defaultValue = {}) {
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
	getStorage(observable = false) {
		this.initStorage()

		if (observable) {
			return this.observe(
				this.storage,
				(property, value) => {
					this.storage[property] = value
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
	setStorage(storage) {
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
	get(key, defaultValue = null, observable = false) {
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
	set(key, value) {
		let storageArea = this.getStorage()

		storageArea[key] = value

		this.setStorage(storageArea)
	}

	/**
	 * Initialize a queue.
	 *
	 * @param key
	 */
	initQueue(key = 'queue') {
		let values = this.get(key, [])

		if (!Array.isArray(values)) {
			console.error('initQueue: The given values must be an array!')
			return
		}

		this.set(key, values)
	}

	/**
	 * Adds the given element to the queue.
	 *
	 * @param value
	 * @param key
	 */
	pushQueue(value, key = 'queue') {
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
	 * Adds magic getters and setter methods to the given object to be able to react to changes with a
	 * callback function.
	 *
	 * @param obj
	 * @param callback
	 */
	observe(obj, callback) {
		function buildProxy(prefix, obj) {
			let changeHandler = {
				get: (target, property) => {
					const out = target[property];

					if (out instanceof Object) {
						return buildProxy(prefix + property + '.', out);
					}

					return out;
				},
				set: (target, property, value) => {
					callback(prefix + property, value);

					target[property] = value;

					return true;
				}
			}

			return new Proxy(obj, changeHandler);
		}

		return buildProxy('', obj);
	}
}
