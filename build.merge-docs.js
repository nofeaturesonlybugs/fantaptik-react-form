const fs = require( 'fs-extra' );
const path = require( 'path' );

console.log( "merge styleguidist + jsdocs" );
const src = path.resolve( __dirname, "jsdocs" );
const dest = path.resolve( __dirname, "docs/jsdocs" );
console.log( `\tcopy ${src} to ${dest}` );
fs.copySync( src, dest, { overwrite : true } );
console.log( "\t\tdone" );

console.log( "\tsearch and replace bundle.*.js" );
const docs = path.resolve( __dirname, "docs/build" );
const files = fs.readdirSync( docs );
for( const file of files ) {
    if( /^bundle[.][^.]+[.]js$/i.test( file ) ) {
        console.log( `\t\tfound bundle @ ${file}`)
        const bundle = path.resolve( docs, file );
        let contents = fs.readFileSync( bundle, { encoding : "UTF-8" } );
        contents = contents.replace( 'href:"../jsdocs/index.html"', 'href:"jsdocs/index.html"' );
        fs.writeFileSync( bundle, contents );
        console.log( "\t\tdone" );
        break;
    }
}

console.log( "\tdone" );