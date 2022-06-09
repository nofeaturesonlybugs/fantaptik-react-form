import React from 'react'

import ButtonsBase from '../Buttons/Buttons'
import Context from './context'

const Buttons = ({ children, ...props }) => {
	children = React.Children.map(children, (child) => {
		return React.cloneElement(child, { ...props, ...child.props })
	})
	return <>{children}</>
}

const Cancel = ({ disabled, onClick, ...props }) => {
	const { isProcessing, cancel } = React.useContext(Context)
	const handler = () => {
		cancel()
		onClick && onClick()
	}
	disabled = disabled || isProcessing
	return <ButtonsBase.Cancel onClick={handler} disabled={disabled} {...props} />
}

const Reset = ({ disabled, onClick, ...props }) => {
	const { isProcessing, isDirty, reset } = React.useContext(Context)
	const handler = () => {
		reset()
		onClick && onClick()
	}
	disabled = disabled || isProcessing || !isDirty
	return <ButtonsBase.Reset onClick={handler} disabled={disabled} {...props} />
}

const FullReset = ({ disabled, onClick, ...props }) => {
	const { isProcessing, fullReset } = React.useContext(Context)
	const handler = () => {
		fullReset()
		onClick && onClick()
	}
	disabled = disabled || isProcessing
	return <ButtonsBase.FullReset onClick={handler} disabled={disabled} {...props} />
}

/**
 * `useSubmit` combines the button props with the context to create new props for submit button logic.
 *
 * @param {Object} props Button properties.
 * @returns Object
 */
const useSubmit = ({ disabled, onClick: __onClick } = {}) => {
	const { isProcessing, isDirty, validation, submit } = React.useContext(Context)
	const onClick = () => {
		submit()
		__onClick && __onClick()
	}
	disabled = disabled || isProcessing || validation !== true || !isDirty
	return { disabled, onClick }
}

const Submit = (props) => {
	props = { ...props, ...useSubmit(props) }
	return <ButtonsBase.Submit {...props} />
}

const Save = (props) => {
	props = { ...props, ...useSubmit(props) }
	return <ButtonsBase.Save {...props} />
}

const Create = (props) => {
	props = { ...props, ...useSubmit(props) }
	return <ButtonsBase.Create {...props} />
}

const Edit = (props) => {
	props = { ...props, ...useSubmit(props) }
	return <ButtonsBase.Edit {...props} />
}

const Delete = (props) => {
	props = { ...props, ...useSubmit(props) }
	return <ButtonsBase.Delete {...props} />
}

Buttons.Cancel = Cancel
Buttons.Reset = Reset
Buttons.FullReset = FullReset
Buttons.Submit = Submit
Buttons.Save = Save

Buttons.Create = Create
Buttons.Edit = Edit
Buttons.Delete = Delete

Buttons.displayName = 'Form.Buttons'

export default Buttons
