const path = require( 'path' );

module.exports = {
    styleguideDir : "docs",
    
    skipComponentsWithoutExample : false,
    
    require : [
        path.join( __dirname, 'node_modules/materialize-css/dist/css/materialize.min.css' ),
        path.join( __dirname, 'styleguide.globals.js' ),
    ],

    template : {
        head : {
            links : [
                {
                    rel : 'stylesheet',
                    href : 'https://fonts.googleapis.com/icon?family=Material+Icons',
                },
            ],
        },
    },

    ignore : [
        '**/components/**/common.js',
        '**/components/**/context.js',
    ],

    //
    // SECTIONS

    //tocMode : 'collapse', // TODO

    pagePerSection : true,

    // TODO No sections yet.
    sections : [
        {
            name : 'jsdocs',
            href : '../jsdocs/index.html',
            external : true,
        },
        {
            name : 'Components',
            content : 'src/components/components.md',
            components : 'src/components/**/*.js',
            sectionDepth : 1,
        },
        {
            name : 'Sample Registration Form',
            content : 'docs-examples/registration.md',
            sectionDepth : 0,
        }
    ],

    //
    // STYLES
    styles : './styleguide.styles.js',
};