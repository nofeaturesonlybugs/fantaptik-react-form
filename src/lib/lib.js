// TODO RM ME
/**
 * `isDirty` returns true if the objects are not deeply equal.  Objects or object keys
 * that are referentially equal shortcut any by value checks.
 * 
 * @param {object} a
 * @param {object} b
 * @returns {boolean}
 */
const isDirty = ( a, b ) => {
    if( a === b ) {
        return false;
    }
    //
    // `sort` is an Array.sort function that sorts by Object keys.
    const sort = entries => entries.sort( ( m, n ) => m[0].localeCompare( n[0] ) );
    //
    // `nested` is an Array.filter function that keeps primitives and pushes nested objects
    // onto the array `pushTo`.
    const nested = ( entries, pushTo ) => entries.filter( item => {
        switch( typeof item[1] ) {
            case "bigint":
            case "boolean":
            case "number":
            case "string":
            case "undefined":
                return true;
            case "function":
            case "symbol":
                return false;
            default:
                pushTo.push( item );
                return false;
        }
    } );
    //
    let [anested, bnested] = [[], []];                              // anested and bnested will contain any nested objects.
    [a, b] = [ Object.entries( a ), Object.entries( b ) ];          // Convert a, b to Object.entries() maps.
    if( a.length !== b.length ) {                                   // Must be dirty if entries have different lengths.
        return true;
    }
    [a, b] = [ nested( a, anested ), nested( b, bnested ) ];        // Filter by keeping primitives and pushing out nested objects.
    if( (a.length !== b.length) || (anested.length !== bnested.length) ) {
        return true;                                                // Another attempt to short-circuit.
    }
    [a, b, anested, bnested] = [                                    // Sort all by key names.
        sort( a ), sort( b ), sort( anested ), sort( bnested ) ];
    //
    let dirty = false;                                              // Assume not dirty.
    while( ! dirty && a.length > 0 ) {
        let [m, n] = [ a.shift(), b.shift() ];                      // Compare [key,value] that are primitives.
        dirty = m[0] != n[0] || m[1] !== n[1];                      // dirty if keys differ or values not referentially equal.
    }
    while( ! dirty && anested.length > 0 ) {
        let [m, n] = [ anested.shift(), bnested.shift() ];          // Compare [key,value] that are nested objects.
        dirty = m[0] !== n[0] || isDirty( m[1], n[1] );             // dirty if keys differ or nested objects are dirty.
    }
    return dirty;
}

export default { isDirty };