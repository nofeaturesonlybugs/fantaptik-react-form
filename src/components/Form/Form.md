`Form` is the container for form logic.

##### Standard `inputs`  
```jsx
const Fields = (props) => {
    const { input } = React.useContext( Form.Context );
    return (
        <>
            <input type="text" {...input( "firstname" )} />
            <input type="text" {...input( "lastname" )} />
        </>
    );
}
<Form
    data={{ firstname : "", lastname : ""}}
    submitter={() => ({ error : "The form had errors." })}
    validator={data => data.firstname !== "" && data.lastname !== ""}>
    <Fields />
    <Form.Buttons>
        <Form.Buttons.Reset />
        <Form.Buttons.Submit />
    </Form.Buttons>
</Form>
```

##### Using `Form.Context.Consumer` Directly  
```jsx
<Form 
        data={{ firstname : "", lastname : "" }} 
        submitter={() => Promises.Reject( 1000, { error : "The form had errors." })}
        validator={data => data.firstname !== "" && data.lastname !== ""}
        >
    <Form.Context.Consumer>
        { ( { data, updateData, result } ) => {
            const { error } = result || { error : "" };
            return (
                <>
                    <Show when={error !== ""}>
                        <p>The following error occurred: {error}</p>
                    </Show>
                    <Text label="First Name" value={data.firstname} onChange={firstname => updateData( { firstname } ) } />
                    <Text label="Last Name" value={data.lastname} onChange={lastname => updateData( { lastname } ) } />
                </>
            );
        } }
    </Form.Context.Consumer>
    <Form.Buttons>
        <Form.Buttons.Cancel />
        <Form.Buttons.Reset />
        <Form.Buttons.Submit />
    </Form.Buttons>
</Form>
```
