##### `useForm` hook  
```jsx
const styles = {
    form : {
        maxWidth : "400px",
    },
    error : {
        color : "red",
        fontWeight : "bold",
    },
    buttons : {
        textAlign : "center",
    },
    button : {
        marginRight : "8px",
    }
};
const validator = ( { first_name, last_name, email, username, password, confirm } ) => {
    const errors = {};
    const add = (name, error) => {
        errors[name] = Array.isArray( errors[name] ) ? [ ...errors[name], error ] : [ error ];
    }
    const empty = (name, value, label) => {
        if( ! value || value === "" ) {
            add( name, `'${label}' is required` );
        }
    }
    empty( "first_name", first_name, "First Name" );
    empty( "last_name", last_name, "Last Name" );
    empty( "email", email, "E-mail" );
    empty( "username", username, "Username" );
    empty( "password", password, "Password" );
    empty( "confirm", confirm, "Passord Confirmation" );
    //
    if( password && confirm && password !== confirm ) {
        add( "password", "passwords must match" );
    }
    //
    if( email && email.indexOf( "@" ) === -1 ) {
        add( "email", "e-mail is invalid" );
    }
    //
    Object.entries( errors ).map( ([key, value]) => errors[key] = value.join( "; " ) );
    //
    return Object.keys( errors ).length === 0 ? true : errors;
}
const { validation, text, password, reset, submit } = useForm( { validator } );
const handler = ev => ev.preventDefault();
<form id="classic" onSubmit={handler} style={styles.form}>
    <span style={styles.error}>{validation.first_name}</span>
    <input {...text( "first_name" )} placeholder="First Name" required />
    <span style={styles.error}>{validation.last_name}</span>
    <input {...text( "last_name" )} placeholder="Last Name" required />
    <span style={styles.error}>{validation.email}</span>
    <input {...text( "email" )} type="email" placeholder="E-mail" required />

    <span style={styles.error}>{validation.username}</span>
    <input {...text( "username" )} placeholder="Username" required />
    <span style={styles.error}>{validation.password}</span>
    <input {...password( "password" )} placeholder="Pasword" required />
    <span style={styles.error}>{validation.confirm}</span>
    <input {...password( "confirm" )} placeholder="Confirm Password" required />

    <div style={styles.buttons}>
        <button type="submit" onClick={submit}>Register</button>
    </div>
</form>
```