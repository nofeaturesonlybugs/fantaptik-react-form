import React from 'react'

import { isDirty as dirtyCheck } from '../js'

/**
 * The properties that can be passed to the `useForm` hook.
 *
 * @typedef hooks.useFormProps
 * @type {Object}
 * @property {Object} data Any initial form data.
 * @property {function} submitter A form submission function. TODO signature and returns.
 * @property {function} validator A validation function. TODO signature and returns.
 * @property {function} onCancel TODO
 * @property {function} onReset TODO
 * @property {function} onSubmit TODO
 * @property {function} onSuccess TODO
 */

/**
 * The result type for the `useForm` hook.
 *
 * @typedef hooks.useFormResult
 * @type Object
 * @property {Object} data The form data.
 * @property {Object} snapshotData The original data or data during the most recent successful submission.
 * @property {Object} originalData The original form data.
 * @property {Object} result The most recent submission result.
 * @property {any} validation The most recent validation result.
 * @property {boolean} isDirty `true` when `data` is not equal to `snapshotData`.
 * @property {boolean} isProcessing `true` when a submission is in flight or processing.
 * @property {function} setData Sets `data` to a completely new object.
 * @property {function} updateData Spreads the incoming value to the existing `data`.
 * @property {function} cancel TODO
 * @property {function} fullReset TODO
 * @property {function} reset TODO
 * @property {function} submit TODO
 */

/**
 * `useForm` creates and returns a form management object.
 *
 * @param {hooks.useFormProps} props The initial `useForm` values.
 * @returns {Hooks.useFormResult}
 */
const useForm = ({
	data: __data = {},
	submitter,
	validator = () => true,
	//
	onCancel,
	onReset,
	onSubmit,
	onSuccess,
} = {}) => {
	const [state, setState] = React.useState({
		data: __data,
		snapshotData: __data,
		originalData: __data,
		result: null,
		validation: validator(__data),
		isDirty: false,
		isProcessing: false,
	})
	//
	// __reset is the common logic for reset() and fullReset(); where they differ is the data to reset to.
	const __reset = (data) => {
		setState((prev) => ({
			...prev,
			data,
			result: null,
			validation: validator(data),
			isDirty: false,
		}))
		onReset && onReset()
	}
	const cancel = () => {
		onCancel && onCancel()
	}
	const fullReset = () => __reset(state.originalData)
	const reset = () => __reset(state.snapshotData)
	const submit = () => {
		if (typeof submitter !== 'function') {
			return
		}
		//
		// Clear our current result and set isProcessing.
		setState((prev) => ({
			...prev,
			isProcessing: true,
			result: null,
		}))
		const submission = submitter(state.data)
		if (submission instanceof Promise) {
			// When return value of submitter is a Promise...
			submission
				.then((result) => {
					setState((prev) => ({
						...prev,
						result,
						snapshotData: prev.data,
						isDirty: false,
						isProcessing: false,
					}))
					onSuccess && onSuccess({ ...state, result, isDirty: false, isProcessing: false })
				})
				.catch(
					(result) =>
						setState((prev) => ({
							...prev,
							result,
							isProcessing: false,
						}))
					// TODO onError in here?  Or no....
				)
		} else {
			// When return value of submitter is not a Promise we immediately update the result
			// and other context members.
			setState((prev) => ({
				...prev,
				result: submission,
				snapshotData: prev.data,
				isDirty: false,
				isProcessing: false,
			}))
		}
	}
	const setData = (value) => {
		setState((prev) => ({
			...prev,
			isDirty: dirtyCheck(prev.snapshotData, value),
			data: value,
			validation: validator(value),
		}))
	}
	const updateData = (value) => {
		setData({ ...state.data, ...value })
	}
	//
	const input = (name) => {
		const rv = {
			name,
			onChange: (ev) => {
				if (typeof ev === 'string') {
					updateData({ [name]: ev })
				} else {
					updateData({ [ev.target.name]: ev.target.value })
				}
			},
			value: state.data[name] || '',
		}
		return rv
	}
	const text = (name) => {
		return {
			...input(name),
			type: 'text',
		}
	}
	const password = (name) => {
		return {
			...input(name),
			type: 'password',
		}
	}
	//
	return {
		...state,
		setData,
		updateData,
		cancel,
		reset,
		fullReset,
		submit,
		input,
		text,
		password,
	}
}

export const useFormDefaultResult = {
	data: null,
	setData: (data) => null,
	updateData: (data) => null,
	originalData: null,
	snapshotData: null,
	result: null,
	validation: null,

	isDirty: false,
	isProcessing: false,

	cancel: () => null,
	fullReset: () => null,
	reset: () => null,
	submit: () => null,
}

useForm.defaultResult = useFormDefaultResult

export default useForm
