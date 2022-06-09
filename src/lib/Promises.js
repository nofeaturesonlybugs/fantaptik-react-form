/**
 * Creates and returns a Promise that will reject after a `timeout` with `result`.
 *
 * @param {number} timeout The timeout after which the Promise rejects.
 * @param {object} result The result to pass to the Promise.catch() method.
 * @todo Replace uses with promise.reject from @fantaptik/core
 */
const Reject = (timeout, result) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject(result)
		}, timeout)
	})
}

/**
 * Creates and returns a Promise that will resolve after a `timeout` with `result`.
 *
 * @param {number} timeout The timeout after which the Promise resolves.
 * @param {object} result The result to pass to the Promise.then() method.
 * @todo Replace uses with promise.resolve from @fantaptik/core
 */
const Resolve = (timeout, result) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(result)
		}, timeout)
	})
}

export default { Reject, Resolve }
