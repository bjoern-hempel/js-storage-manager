/**
 * Simple storage test runner
 *
 * run with:
 * user$ npm run test:unit
 */

/* global describe, beforeEach, afterEach, localStorage, it */
import 'mock-local-storage'

let Storage = require('../src/storage')
let assert = require('assert')

const STORAGE_NAMESPACE = 'storageNamespace'

describe('export class Storage {}', () => {
	beforeEach(() => {
		/* Mock the localStorage */
		global.window = {}
		window.localStorage = global.localStorage
	})

	afterEach(() => {
		/* Clear the localStorage */
		localStorage.clear();
		localStorage.itemInsertionCallback = null;
	})

	/**
	 * Test some basic functions without the localStorage.
	 */
	describe('Basic function tests.', () => {
		it('Test Storage.get default value: null.', () => {
			/* Arrange */
			let dataExpected = null

			/* Act */
			let s = new Storage(STORAGE_NAMESPACE)
			let returnData = s.get('data')

			/* Assert */
			assert.deepStrictEqual(returnData, dataExpected)
		})

		it('Test Storage.get given default value without given values before: [1, 2, 3]', () => {
			/* Arrange */
			let dataExpected = [1, 2, 3]

			/* Act */
			let s = new Storage(STORAGE_NAMESPACE)
			let dataReturn = s.get('data', dataExpected)

			/* Assert */
			assert.deepStrictEqual(dataReturn, dataExpected)
		})

		it('Test Storage.get given default value with given values before: [1, 2, 3]', () => {
			/* Arrange */
			let data1 = [1, 2, 3]
			let data2 = [4, 5, 6]
			let dataExpected = data1

			/* Act */
			let s = new Storage(STORAGE_NAMESPACE)
			s.set('data', data1)
			let dataReturn = s.get('data', data2)

			/* Assert */
			assert.deepStrictEqual(dataReturn, dataExpected)
		})

		it('Test Storage.getStorage function.', () => {
			/* Arrange */
			let data = []
			let dataExpected = { 'data': data }

			/* Act */
			let s = new Storage(STORAGE_NAMESPACE)
			s.set('data', data)
			let dataReturn = s.getStorage()

			/* Assert */
			assert.deepStrictEqual(dataReturn, dataExpected)
		})
	})

	/**
	 * Test the localStorage without the observable magic methods.
	 */
	describe('Empty localStorage (non observable).', () => {
		it('Test localStorage which should be empty first.', () => {
			/* Arrange */
			let localStorageExpected = {}
			localStorageExpected[STORAGE_NAMESPACE] = {}

			/* Act */
			let s = new Storage(STORAGE_NAMESPACE)
			s.initStorage()

			/* Assert */
			assert.deepStrictEqual(s.getLocalStorage(), localStorageExpected)
		})

		it('Test localStorage with Storage.set function.', () => {
			/* Arrange */
			let localStorageExpected = {}
			let data = [1, 2, 3]
			localStorageExpected[STORAGE_NAMESPACE] = { data: data }

			/* Act */
			let s = new Storage(STORAGE_NAMESPACE)
			s.set('data', data)

			/* Assert */
			assert.deepStrictEqual(s.getLocalStorage(), localStorageExpected)
		})

		it('Test Storage.initQueue (empty queue).', () => {
			/* Arrange */
			let localStorageExpected = {}
			localStorageExpected[STORAGE_NAMESPACE] = { queue: [] }

			/* Act */
			let s = new Storage(STORAGE_NAMESPACE)
			s.initQueue()

			/* Assert */
			assert.deepStrictEqual(s.getLocalStorage(), localStorageExpected)
		})

		it('Test Storage.addQueue (one entry).', () => {
			/* Arrange */
			let localStorageExpected = {}
			let data = { 'id': 123, 'name': 'Name' }
			localStorageExpected[STORAGE_NAMESPACE] = { queue: [data] }

			/* Act */
			let s = new Storage(STORAGE_NAMESPACE)
			s.pushQueue(data)

			/* Assert */
			assert.deepStrictEqual(s.getLocalStorage(), localStorageExpected)
		})

		it('Test Storage.addQueue (two entries).', () => {
			/* Arrange */
			let localStorageExpected = {}
			let data = { 'id': 123, 'name': 'Name' }
			localStorageExpected[STORAGE_NAMESPACE] = { queue: [data, data] }

			/* Act */
			let s = new Storage(STORAGE_NAMESPACE)
			s.pushQueue(data)
			s.pushQueue(data)

			/* Assert */
			assert.deepStrictEqual(s.getLocalStorage(), localStorageExpected)
		})

		it('Test Storage.getNumberOfQueuesItems (three entries).', () => {
			/* Arrange */
			let data = { 'id': 123, 'name': 'Name' }
			let numberExpected = 3

			/* Act */
			let s = new Storage(STORAGE_NAMESPACE)
			s.pushQueue(data)
			s.pushQueue(data)
			s.pushQueue(data)

			/* Assert */
			assert.equal(s.getNumberOfQueuesItems(), numberExpected)
		})

		it('Test Storage.getQueue (two entries).', () => {
			/* Arrange */
			let data = { 'id': 123, 'name': 'Name' }
			let queueExpected = [data, data]

			/* Act */
			let s = new Storage(STORAGE_NAMESPACE)
			s.pushQueue(data)
			s.pushQueue(data)

			/* Assert */
			assert.deepStrictEqual(s.getQueue(), queueExpected)
		})

		it('Test Storage.getNextQueueEntry.', () => {
			/* Arrange */
			let data1 = { 'id': 1, 'name': 'Name 1' }
			let data2 = { 'id': 2, 'name': 'Name 2' }
			let data3 = { 'id': 3, 'name': 'Name 3' }

			/* Act */
			let s = new Storage(STORAGE_NAMESPACE)
			s.pushQueue(data1)
			s.pushQueue(data2)
			s.pushQueue(data3)

			/* Assert */
			assert.deepStrictEqual(s.getNextQueueItem(), data1)
		})

		it('Test Storage.deleteNextQueueEntry (get deleted entry).', () => {
			/* Arrange */
			let data1 = { 'id': 1, 'name': 'Name 1' }
			let data2 = { 'id': 2, 'name': 'Name 2' }
			let data3 = { 'id': 3, 'name': 'Name 3' }

			/* Act */
			let s = new Storage(STORAGE_NAMESPACE)
			s.pushQueue(data1)
			s.pushQueue(data2)
			s.pushQueue(data3)

			/* Assert */
			assert.deepStrictEqual(s.deleteNextQueueItem(), data1)
		})

		it('Test Storage.deleteNextQueueEntry (check new queue list).', () => {
			/* Arrange */
			let data1 = { 'id': 1, 'name': 'Name 1' }
			let data2 = { 'id': 2, 'name': 'Name 2' }
			let data3 = { 'id': 3, 'name': 'Name 3' }
			let queueExpected = [data2, data3]

			/* Act */
			let s = new Storage(STORAGE_NAMESPACE)
			s.pushQueue(data1)
			s.pushQueue(data2)
			s.pushQueue(data3)
			s.deleteNextQueueItem()

			/* Assert */
			assert.deepStrictEqual(s.getQueue(), queueExpected)
		})
	})

	/**
	 * Test the localStorage with the observable magic methods.
	 */
	describe('Empty localStorage (observable).', () => {
		it('Test auto-save to localStorage (Simple).', () => {
			/* Arrange */
			let localStorageExpected = {}
			let data = { 'id': 1, 'name': 'Name 1', 'queue': ['a', 'b', 'c'] }
			localStorageExpected[STORAGE_NAMESPACE] = { data: data }

			/* Act */
			let s = new Storage(STORAGE_NAMESPACE)
			let observable = true
			let storage = s.getStorage(observable)
			storage.data = data /* auto save to localStorage */

			/* Assert */
			assert.deepStrictEqual(s.getLocalStorage(), localStorageExpected)
		})

		it('Test auto-save to localStorage (Deep).', () => {
			/* Arrange */
			let localStorageExpected = {}
			let data = { 'id': 1, 'name': 'Name 1', 'queue': ['a', 'b', 'c'] }
			let dataExpected = { 'id': 2, 'name': 'Name 1', 'queue': ['a', 'd', 'c'] }
			localStorageExpected[STORAGE_NAMESPACE] = { data: dataExpected }

			/* Act */
			let s = new Storage(STORAGE_NAMESPACE)
			let observable = true
			let storage = s.getStorage(observable)
			storage.data = data /* auto save to localStorage */
			storage.data.id = 2 /* auto save to localStorage */
			storage.data.queue[1] = 'd' /* auto save to localStorage */

			/* Assert */
			assert.deepStrictEqual(s.getLocalStorage(), localStorageExpected)
		})
	})
})

