import React from 'react'
import PropTypes from 'prop-types'

import { merge } from '@fantaptik/react-material'

import useForm from '../../hooks/useForm'
import Context from './context'
import Buttons from './Buttons'

const Form = ({
	data,
	submitter,
	validator,
	//
	onCancel,
	onReset,
	onSubmit,
	onSuccess,
	//
	children,
	className,
	...props
}) => {
	const ctx = useForm({ data, submitter, validator, onCancel, onReset, onSubmit, onSuccess })
	//
	const handler = (ev) => ev.preventDefault()
	//
	className = merge`${className} form`
	return (
		<Context.Provider value={ctx}>
			<form className={className} onSubmit={handler} {...props}>
				{children}
			</form>
		</Context.Provider>
	)
}

Form.Buttons = Buttons
Form.Context = Context

Form.propTypes = {
	/** The `data` object that will be modified by the form. */
	data: PropTypes.object.isRequired,

	/** `onCancel` is the handler for clicking on a Buttons.Cancel within the form. */
	onCancel: PropTypes.func,

	/** `onReset` is the handler for clicking on a Buttons.Reset within the form. */
	onReset: PropTypes.func,

	/**
	 * TODO Update me.
	 * `onSubmit` is the function to call when the form is submitted; it accepts a single argument
	 * `data` and returns a Promise that represents an async request.
	 */
	onSubmit: PropTypes.func,

	/**
	 * `onSuccess` is called when the Promise returned by `submitter` is resolved with the form context
	 * as the single argument.
	 */
	onSuccess: PropTypes.func,

	/**
	 * `submitter` is a callback function to submit or process `data`.
	 *
	 * If the form processing is async in nature then `submitter` should return a `Promise` representing the request.
	 * The result of the `Promise's` resolution will be placed in the `result` context member.
	 *
	 * ```js
	 * // Promise submitter
	 * const submitter = data => {
	 *  return new Promise( (resolve, reject) => {
	 *      const result = makeAsyncRequest( data );
	 *      resolve( result );
	 *  } );
	 * }
	 * ```
	 *
	 * Any non-`Promise` result is immediately stored in the `result` context member.
	 *
	 * ```js
	 * const [todos, addTodo] = React.useState( [] );
	 * // Non-Promise submitter that immediately enacts processing and returns the result.
	 * const submitter = data => {
	 *  addTodos( [...todos, data] );
	 *  // Note the return value here is arbitrary.  The return value is placed in
	 *  // the `result` context member and presumably other portions of the form
	 *  // logic could watch for `result === true` and reset the form field in
	 *  // order to add another To-Do item.
	 *  return true;
	 * }
	 * ```
	 */
	submitter: PropTypes.func.isRequired,

	/**
	 * `validator` is a callback function to validate `data`.  The return value of `validator` is stored
	 * in the `validation` context member.
	 *
	 * ```js
	 * // Example validator
	 * const validate = data => {
	 *  const errors = {};
	 *  if( data.first_name === "" ) {
	 *      errors.first_name = "First name is required.";
	 *  }
	 *  if( data.last_name === "" ) {
	 *      errors.last_name = "Last name is required.";
	 *  }
	 *  return Object.keys( errors ).length === 0 ? true : errors;
	 * }
	 * ```
	 */
	validator: PropTypes.func,
}

export default Form
