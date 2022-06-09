import React from 'react';

import { merge, Button } from '@fantaptik/react-material';

import icons from '../../conf/icons';

const Buttons = ( { children, ...props } ) => {
    children = React.Children.map( children, child => {
        return React.cloneElement( child, { ...props, ...child.props } );
    } );
    return <>{children}</>;
}

const Cancel = ( { className, ...props } ) => {
    className = merge`${className} cancel`;
    //
    return (
        <Button icon={icons.cancel} label="Cancel" {...props} className={className} />
    );
}

const Reset = ( { className, ...props } ) => {
    className = merge`${className} reset`;
    //
    return (
        <Button icon={icons.reset} label="Reset" {...props} className={className} />
    );
}

const FullReset = ( { className, ...props } ) => {
    className = merge`${className} full-reset`;
    //
    return (
        <Button icon={icons.reset} label="Reset" {...props} className={className} />
    );
}

const Submit = ( { className, ...props } ) => {
    className = merge`${className} submit`;
    return (
        <Button icon={icons.submit} label="Submit" {...props} className={className} />
    );
}

const Create = ( { className, ...props } ) => {
    className = merge`${className} create`;
    return (
        <Button icon={icons.create} label="Create" {...props} className={className} />
    );
}

const Edit = ( { className, ...props } ) => {
    className = merge`${className} edit`;
    return (
        <Button icon={icons.edit} label="Edit" {...props} className={className} />
    );
}

const Delete = ( { className, ...props } ) => {
    className = merge`${className} delete`;
    return (
        <Button icon={icons.delete} label="Delete" {...props} className={className} />
    );
}

Buttons.Cancel = Cancel;
Buttons.FullReset = FullReset;
Buttons.Reset = Reset;
Buttons.Submit = Submit;

Buttons.Create = Create;
Buttons.Edit = Edit;
Buttons.Delete = Delete;

export default Buttons;