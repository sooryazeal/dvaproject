/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/* ========================================================================
 * Bootstrap: transition.js v3.2.0
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.2.0
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.2.0'

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.2.0
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options        = options
    this.$body          = $(document.body)
    this.$element       = $(element)
    this.$backdrop      =
    this.isShown        = null
    this.scrollbarWidth = 0

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.2.0'

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.$body.addClass('modal-open')

    this.setScrollbar()
    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.$body.removeClass('modal-open')

    this.resetScrollbar()
    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(150) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  Modal.prototype.checkScrollbar = function () {
    if (document.body.clientWidth >= window.innerWidth) return
    this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    if (this.scrollbarWidth) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', '')
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.2.0
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.2.0'

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.trigger('focus')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).trigger('focus')
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $parent = getParent($(this))
      var relatedTarget = { relatedTarget: this }
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role="menu"], [role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.2.0
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var process  = $.proxy(this.process, this)

    this.$body          = $('body')
    this.$scrollElement = $(element).is('body') ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', process)
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.2.0'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = 'offset'
    var offsetBase   = 0

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.offsets = []
    this.targets = []
    this.scrollHeight = this.getScrollHeight()

    var self     = this

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.2.0
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.VERSION = '3.2.0'

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.2.0
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.2.0'

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(document.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var $parent      = this.$element.parent()
        var parentDim    = this.getPosition($parent)

        placement = placement == 'bottom' && pos.top   + pos.height       + actualHeight - parentDim.scroll > parentDim.height ? 'top'    :
                    placement == 'top'    && pos.top   - parentDim.scroll - actualHeight < 0                                   ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth      > parentDim.width                                    ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth      < parentDim.left                                     ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(150) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var arrowDelta          = delta.left ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowPosition       = delta.left ? 'left'        : 'top'
    var arrowOffsetPosition = delta.left ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], arrowPosition)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    this.$element.removeAttr('aria-describedby')

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element
    var el     = $element[0]
    var isBody = el.tagName == 'BODY'
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : null, {
      scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop(),
      width:  isBody ? $(window).width()  : $element.outerWidth(),
      height: isBody ? $(window).height() : $element.outerHeight()
    }, isBody ? { top: 0, left: 0 } : $element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    return (this.$tip = this.$tip || $(this.options.template))
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.2.0
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.2.0'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').empty()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.2.0
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.2.0'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    $el[val](data[state] == null ? this.options[state] : data[state])

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    Plugin.call($btn, 'toggle')
    e.preventDefault()
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.2.0
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.2.0'

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      Plugin.call(actives, 'hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var href
    var $this   = $(this)
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle="collapse"][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    Plugin.call($target, option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.2.0
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element).on('keydown.bs.carousel', $.proxy(this.keydown, this))
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.2.0'

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.keydown = function (e) {
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: affix.js v3.2.0
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.2.0'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin != null) this.$element.css('top', '')

    var affixType = 'affix' + (affix ? '-' + affix : '')
    var e         = $.Event(affixType + '.bs.affix')

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

    this.$element
      .removeClass(Affix.RESET)
      .addClass(affixType)
      .trigger($.Event(affixType.replace('affix', 'affixed')))

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - this.$element.height() - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);












/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.5): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */


var Util = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var transition = false;

  var MAX_UID = 1000000;

  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  };

  // shoutout AngusCroll (https://goo.gl/pxwQGp)
  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function isElement(obj) {
    return (obj[0] || obj).nodeType;
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return undefined;
      }
    };
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement('bootstrap');

    for (var name in TransitionEndEvent) {
      if (el.style[name] !== undefined) {
        return { end: TransitionEndEvent[name] };
      }
    }

    return false;
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;

    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });

    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);

    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();

    $.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {

    TRANSITION_END: 'bsTransitionEnd',

    getUID: function getUID(prefix) {
      do {
        /* eslint-disable no-bitwise */
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        /* eslint-enable no-bitwise */
      } while (document.getElementById(prefix));
      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector) {
        selector = element.getAttribute('href') || '';
        selector = /^#[a-z]/i.test(selector) ? selector : null;
      }

      return selector;
    },
    reflow: function reflow(element) {
      new Function('bs', 'return bs')(element.offsetHeight);
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(transition.end);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(transition);
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (configTypes.hasOwnProperty(property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = void 0;

          if (value && isElement(value)) {
            valueType = 'element';
          } else {
            valueType = toType(value);
          }

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
          }
        }
      }
    }
  };

  setTransitionEndSupport();

  return Util;
}(jQuery);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.5): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Alert = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.0.0-alpha.5';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };

  var Event = {
    CLOSE: 'close' + EVENT_KEY,
    CLOSED: 'closed' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    IN: 'in'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert = function () {
    function Alert(element) {
      _classCallCheck(this, Alert);

      this._element = element;
    }

    // getters

    // public

    Alert.prototype.close = function close(element) {
      element = element || this._element;

      var rootElement = this._getRootElement(element);
      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    Alert.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // private

    Alert.prototype._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = $(selector)[0];
      }

      if (!parent) {
        parent = $(element).closest('.' + ClassName.ALERT)[0];
      }

      return parent;
    };

    Alert.prototype._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $.Event(Event.CLOSE);

      $(element).trigger(closeEvent);
      return closeEvent;
    };

    Alert.prototype._removeElement = function _removeElement(element) {
      $(element).removeClass(ClassName.IN);

      if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);
        return;
      }

      $(element).one(Util.TRANSITION_END, $.proxy(this._destroyElement, this, element)).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Alert.prototype._destroyElement = function _destroyElement(element) {
      $(element).detach().trigger(Event.CLOSED).remove();
    };

    // static

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  return Alert;
}(jQuery);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.5): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Button = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'button';
  var VERSION = '4.0.0-alpha.5';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var ClassName = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };

  var Selector = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };

  var Event = {
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = function () {
    function Button(element) {
      _classCallCheck(this, Button);

      this._element = element;
    }

    // getters

    // public

    Button.prototype.toggle = function toggle() {
      var triggerChangeEvent = true;
      var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

      if (rootElement) {
        var input = $(this._element).find(Selector.INPUT)[0];

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

              if (activeElement) {
                $(activeElement).removeClass(ClassName.ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
            $(this._element).trigger('change');
          }

          input.focus();
        }
      } else {
        this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));
      }

      if (triggerChangeEvent) {
        $(this._element).toggleClass(ClassName.ACTIVE);
      }
    };

    Button.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // static

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Button;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();

    var button = event.target;

    if (!$(button).hasClass(ClassName.BUTTON)) {
      button = $(button).closest(Selector.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector.BUTTON)[0];
    $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Button._jQueryInterface;
  $.fn[NAME].Constructor = Button;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Button._jQueryInterface;
  };

  return Button;
}(jQuery);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.5): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Carousel = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'carousel';
  var VERSION = '4.0.0-alpha.5';
  var DATA_KEY = 'bs.carousel';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true
  };

  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean'
  };

  var Direction = {
    NEXT: 'next',
    PREVIOUS: 'prev'
  };

  var Event = {
    SLIDE: 'slide' + EVENT_KEY,
    SLID: 'slid' + EVENT_KEY,
    KEYDOWN: 'keydown' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'right',
    LEFT: 'left',
    ITEM: 'carousel-item'
  };

  var Selector = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    NEXT_PREV: '.next, .prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel = function () {
    function Carousel(element, config) {
      _classCallCheck(this, Carousel);

      this._items = null;
      this._interval = null;
      this._activeElement = null;

      this._isPaused = false;
      this._isSliding = false;

      this._config = this._getConfig(config);
      this._element = $(element)[0];
      this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

      this._addEventListeners();
    }

    // getters

    // public

    Carousel.prototype.next = function next() {
      if (!this._isSliding) {
        this._slide(Direction.NEXT);
      }
    };

    Carousel.prototype.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      if (!document.hidden) {
        this.next();
      }
    };

    Carousel.prototype.prev = function prev() {
      if (!this._isSliding) {
        this._slide(Direction.PREVIOUS);
      }
    };

    Carousel.prototype.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if ($(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    Carousel.prototype.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval($.proxy(document.visibilityState ? this.nextWhenVisible : this.next, this), this._config.interval);
      }
    };

    Carousel.prototype.to = function to(index) {
      var _this = this;

      this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $(this._element).one(Event.SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREVIOUS;

      this._slide(direction, this._items[index]);
    };

    Carousel.prototype.dispose = function dispose() {
      $(this._element).off(EVENT_KEY);
      $.removeData(this._element, DATA_KEY);

      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    };

    // private

    Carousel.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Carousel.prototype._addEventListeners = function _addEventListeners() {
      if (this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN, $.proxy(this._keydown, this));
      }

      if (this._config.pause === 'hover' && !('ontouchstart' in document.documentElement)) {
        $(this._element).on(Event.MOUSEENTER, $.proxy(this.pause, this)).on(Event.MOUSELEAVE, $.proxy(this.cycle, this));
      }
    };

    Carousel.prototype._keydown = function _keydown(event) {
      event.preventDefault();

      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          this.prev();
          break;
        case ARROW_RIGHT_KEYCODE:
          this.next();
          break;
        default:
          return;
      }
    };

    Carousel.prototype._getItemIndex = function _getItemIndex(element) {
      this._items = $.makeArray($(element).parent().find(Selector.ITEM));
      return this._items.indexOf(element);
    };

    Carousel.prototype._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREVIOUS;
      var activeIndex = this._getItemIndex(activeElement);
      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREVIOUS ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;

      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    Carousel.prototype._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, directionalClassname) {
      var slideEvent = $.Event(Event.SLIDE, {
        relatedTarget: relatedTarget,
        direction: directionalClassname
      });

      $(this._element).trigger(slideEvent);

      return slideEvent;
    };

    Carousel.prototype._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName.ACTIVE);
        }
      }
    };

    Carousel.prototype._slide = function _slide(direction, element) {
      var _this2 = this;

      var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var isCycling = Boolean(this._interval);

      var directionalClassName = direction === Direction.NEXT ? ClassName.LEFT : ClassName.RIGHT;

      if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, directionalClassName);
      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $.Event(Event.SLID, {
        relatedTarget: nextElement,
        direction: directionalClassName
      });

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

        $(nextElement).addClass(direction);

        Util.reflow(nextElement);

        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);

        $(activeElement).one(Util.TRANSITION_END, function () {
          $(nextElement).removeClass(directionalClassName).removeClass(direction);

          $(nextElement).addClass(ClassName.ACTIVE);

          $(activeElement).removeClass(ClassName.ACTIVE).removeClass(direction).removeClass(directionalClassName);

          _this2._isSliding = false;

          setTimeout(function () {
            return $(_this2._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        $(activeElement).removeClass(ClassName.ACTIVE);
        $(nextElement).addClass(ClassName.ACTIVE);

        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    };

    // static

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = $.extend({}, Default, $(this).data());

        if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
          $.extend(_config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (data[action] === undefined) {
            throw new Error('No method named "' + action + '"');
          }
          data[action]();
        } else if (_config.interval) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $(selector)[0];

      if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
        return;
      }

      var config = $.extend({}, $(target).data(), $(this).data());
      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

  $(window).on(Event.LOAD_DATA_API, function () {
    $(Selector.DATA_RIDE).each(function () {
      var $carousel = $(this);
      Carousel._jQueryInterface.call($carousel, $carousel.data());
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Carousel._jQueryInterface;
  $.fn[NAME].Constructor = Carousel;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Carousel._jQueryInterface;
  };

  return Carousel;
}(jQuery);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.5): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Collapse = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'collapse';
  var VERSION = '4.0.0-alpha.5';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;

  var Default = {
    toggle: true,
    parent: ''
  };

  var DefaultType = {
    toggle: 'boolean',
    parent: 'string'
  };

  var Event = {
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    IN: 'in',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };

  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };

  var Selector = {
    ACTIVES: '.card > .in, .card > .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = function () {
    function Collapse(element, config) {
      _classCallCheck(this, Collapse);

      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    }

    // getters

    // public

    Collapse.prototype.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName.IN)) {
        this.hide();
      } else {
        this.show();
      }
    };

    Collapse.prototype.show = function show() {
      var _this = this;

      if (this._isTransitioning || $(this._element).hasClass(ClassName.IN)) {
        return;
      }

      var actives = void 0;
      var activesData = void 0;

      if (this._parent) {
        actives = $.makeArray($(Selector.ACTIVES));
        if (!actives.length) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).data(DATA_KEY);
        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event.SHOW);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives), 'hide');
        if (!activesData) {
          $(actives).data(DATA_KEY, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

      this._element.style[dimension] = 0;
      this._element.setAttribute('aria-expanded', true);

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.IN);

        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $(_this._element).trigger(Event.SHOWN);
      };

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = 'scroll' + capitalizedDimension;

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

      this._element.style[dimension] = this._element[scrollSize] + 'px';
    };

    Collapse.prototype.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$(this._element).hasClass(ClassName.IN)) {
        return;
      }

      var startEvent = $.Event(Event.HIDE);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();
      var offsetDimension = dimension === Dimension.WIDTH ? 'offsetWidth' : 'offsetHeight';

      this._element.style[dimension] = this._element[offsetDimension] + 'px';

      Util.reflow(this._element);

      $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.IN);

      this._element.setAttribute('aria-expanded', false);

      if (this._triggerArray.length) {
        $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);
        $(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
      };

      this._element.style[dimension] = '';

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Collapse.prototype.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    Collapse.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    };

    // private

    Collapse.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      config.toggle = Boolean(config.toggle); // coerce string values
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Collapse.prototype._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    Collapse.prototype._getParent = function _getParent() {
      var _this3 = this;

      var parent = $(this._config.parent)[0];
      var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

      $(parent).find(selector).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });

      return parent;
    };

    Collapse.prototype._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      if (element) {
        var isOpen = $(element).hasClass(ClassName.IN);
        element.setAttribute('aria-expanded', isOpen);

        if (triggerArray.length) {
          $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
        }
      }
    };

    // static

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? $(selector)[0] : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);
        var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Collapse;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();

    var target = Collapse._getTargetFromElement(this);
    var data = $(target).data(DATA_KEY);
    var config = data ? 'toggle' : $(this).data();

    Collapse._jQueryInterface.call($(target), config);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Collapse._jQueryInterface;
  $.fn[NAME].Constructor = Collapse;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };

  return Collapse;
}(jQuery);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.5): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Dropdown = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'dropdown';
  var VERSION = '4.0.0-alpha.5';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    BACKDROP: 'dropdown-backdrop',
    DISABLED: 'disabled',
    OPEN: 'open'
  };

  var Selector = {
    BACKDROP: '.dropdown-backdrop',
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    ROLE_MENU: '[role="menu"]',
    ROLE_LISTBOX: '[role="listbox"]',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = function () {
    function Dropdown(element) {
      _classCallCheck(this, Dropdown);

      this._element = element;

      this._addEventListeners();
    }

    // getters

    // public

    Dropdown.prototype.toggle = function toggle() {
      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return false;
      }

      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName.OPEN);

      Dropdown._clearMenus();

      if (isActive) {
        return false;
      }

      if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {

        // if mobile we use a backdrop because click events don't delegate
        var dropdown = document.createElement('div');
        dropdown.className = ClassName.BACKDROP;
        $(dropdown).insertBefore(this);
        $(dropdown).on('click', Dropdown._clearMenus);
      }

      var relatedTarget = { relatedTarget: this };
      var showEvent = $.Event(Event.SHOW, relatedTarget);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return false;
      }

      this.focus();
      this.setAttribute('aria-expanded', 'true');

      $(parent).toggleClass(ClassName.OPEN);
      $(parent).trigger($.Event(Event.SHOWN, relatedTarget));

      return false;
    };

    Dropdown.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._element).off(EVENT_KEY);
      this._element = null;
    };

    // private

    Dropdown.prototype._addEventListeners = function _addEventListeners() {
      $(this._element).on(Event.CLICK, this.toggle);
    };

    // static

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          $(this).data(DATA_KEY, data = new Dropdown(this));
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config].call(this);
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && event.which === RIGHT_MOUSE_BUTTON_WHICH) {
        return;
      }

      var backdrop = $(Selector.BACKDROP)[0];
      if (backdrop) {
        backdrop.parentNode.removeChild(backdrop);
      }

      var toggles = $.makeArray($(Selector.DATA_TOGGLE));

      for (var i = 0; i < toggles.length; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);
        var relatedTarget = { relatedTarget: toggles[i] };

        if (!$(parent).hasClass(ClassName.OPEN)) {
          continue;
        }

        if (event && event.type === 'click' && /input|textarea/i.test(event.target.tagName) && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(Event.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);
        if (hideEvent.isDefaultPrevented()) {
          continue;
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        $(parent).removeClass(ClassName.OPEN).trigger($.Event(Event.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent = void 0;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = $(selector)[0];
      }

      return parent || element.parentNode;
    };

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      if (!/(38|40|27|32)/.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName.OPEN);

      if (!isActive && event.which !== ESCAPE_KEYCODE || isActive && event.which === ESCAPE_KEYCODE) {

        if (event.which === ESCAPE_KEYCODE) {
          var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = $.makeArray($(Selector.VISIBLE_ITEMS));

      items = items.filter(function (item) {
        return item.offsetWidth || item.offsetHeight;
      });

      if (!items.length) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Dropdown;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_MENU, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_LISTBOX, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, Dropdown.prototype.toggle).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
    e.stopPropagation();
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  return Dropdown;
}(jQuery);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.5): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Modal = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'modal';
  var VERSION = '4.0.0-alpha.5';
  var DATA_KEY = 'bs.modal';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 300;
  var BACKDROP_TRANSITION_DURATION = 150;
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };

  var DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    RESIZE: 'resize' + EVENT_KEY,
    CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
    KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
    MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
    MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    IN: 'in'
  };

  var Selector = {
    DIALOG: '.modal-dialog',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal = function () {
    function Modal(element, config) {
      _classCallCheck(this, Modal);

      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = $(element).find(Selector.DIALOG)[0];
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._originalBodyPadding = 0;
      this._scrollbarWidth = 0;
    }

    // getters

    // public

    Modal.prototype.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    Modal.prototype.show = function show(relatedTarget) {
      var _this = this;

      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: relatedTarget
      });

      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();
      this._setScrollbar();

      $(document.body).addClass(ClassName.OPEN);

      this._setEscapeEvent();
      this._setResizeEvent();

      $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, $.proxy(this.hide, this));

      $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
        $(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop($.proxy(this._showElement, this, relatedTarget));
    };

    Modal.prototype.hide = function hide(event) {
      if (event) {
        event.preventDefault();
      }

      var hideEvent = $.Event(Event.HIDE);

      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;

      this._setEscapeEvent();
      this._setResizeEvent();

      $(document).off(Event.FOCUSIN);

      $(this._element).removeClass(ClassName.IN);

      $(this._element).off(Event.CLICK_DISMISS);
      $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {

        $(this._element).one(Util.TRANSITION_END, $.proxy(this._hideModal, this)).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        this._hideModal();
      }
    };

    Modal.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      $(window).off(EVENT_KEY);
      $(document).off(EVENT_KEY);
      $(this._element).off(EVENT_KEY);
      $(this._backdrop).off(EVENT_KEY);

      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._originalBodyPadding = null;
      this._scrollbarWidth = null;
    };

    // private

    Modal.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Modal.prototype._showElement = function _showElement(relatedTarget) {
      var _this2 = this;

      var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // don't move modals dom position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';
      this._element.removeAttribute('aria-hidden');
      this._element.scrollTop = 0;

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(ClassName.IN);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $.Event(Event.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this2._config.focus) {
          _this2._element.focus();
        }
        $(_this2._element).trigger(shownEvent);
      };

      if (transition) {
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        transitionComplete();
      }
    };

    Modal.prototype._enforceFocus = function _enforceFocus() {
      var _this3 = this;

      $(document).off(Event.FOCUSIN) // guard against infinite focus loop
      .on(Event.FOCUSIN, function (event) {
        if (document !== event.target && _this3._element !== event.target && !$(_this3._element).has(event.target).length) {
          _this3._element.focus();
        }
      });
    };

    Modal.prototype._setEscapeEvent = function _setEscapeEvent() {
      var _this4 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE) {
            _this4.hide();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event.KEYDOWN_DISMISS);
      }
    };

    Modal.prototype._setResizeEvent = function _setResizeEvent() {
      if (this._isShown) {
        $(window).on(Event.RESIZE, $.proxy(this._handleUpdate, this));
      } else {
        $(window).off(Event.RESIZE);
      }
    };

    Modal.prototype._hideModal = function _hideModal() {
      var _this5 = this;

      this._element.style.display = 'none';
      this._element.setAttribute('aria-hidden', 'true');
      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName.OPEN);
        _this5._resetAdjustments();
        _this5._resetScrollbar();
        $(_this5._element).trigger(Event.HIDDEN);
      });
    };

    Modal.prototype._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    Modal.prototype._showBackdrop = function _showBackdrop(callback) {
      var _this6 = this;

      var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

      if (this._isShown && this._config.backdrop) {
        var doAnimate = Util.supportsTransitionEnd() && animate;

        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName.BACKDROP;

        if (animate) {
          $(this._backdrop).addClass(animate);
        }

        $(this._backdrop).appendTo(document.body);

        $(this._element).on(Event.CLICK_DISMISS, function (event) {
          if (_this6._ignoreBackdropClick) {
            _this6._ignoreBackdropClick = false;
            return;
          }
          if (event.target !== event.currentTarget) {
            return;
          }
          if (_this6._config.backdrop === 'static') {
            _this6._element.focus();
          } else {
            _this6.hide();
          }
        });

        if (doAnimate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(ClassName.IN);

        if (!callback) {
          return;
        }

        if (!doAnimate) {
          callback();
          return;
        }

        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName.IN);

        var callbackRemove = function callbackRemove() {
          _this6._removeBackdrop();
          if (callback) {
            callback();
          }
        };

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    };

    // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------

    Modal.prototype._handleUpdate = function _handleUpdate() {
      this._adjustDialog();
    };

    Modal.prototype._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + 'px';
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + 'px';
      }
    };

    Modal.prototype._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    Modal.prototype._checkScrollbar = function _checkScrollbar() {
      this._isBodyOverflowing = document.body.clientWidth < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    Modal.prototype._setScrollbar = function _setScrollbar() {
      var bodyPadding = parseInt($(Selector.FIXED_CONTENT).css('padding-right') || 0, 10);

      this._originalBodyPadding = document.body.style.paddingRight || '';

      if (this._isBodyOverflowing) {
        document.body.style.paddingRight = bodyPadding + this._scrollbarWidth + 'px';
      }
    };

    Modal.prototype._resetScrollbar = function _resetScrollbar() {
      document.body.style.paddingRight = this._originalBodyPadding;
    };

    Modal.prototype._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    };

    // static

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = $.extend({}, Modal.Default, $(this).data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Modal;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    var _this7 = this;

    var target = void 0;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = $(selector)[0];
    }

    var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

    if (this.tagName === 'A') {
      event.preventDefault();
    }

    var $target = $(target).one(Event.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event.HIDDEN, function () {
        if ($(_this7).is(':visible')) {
          _this7.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Modal._jQueryInterface;
  $.fn[NAME].Constructor = Modal;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Modal._jQueryInterface;
  };

  return Modal;
}(jQuery);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.5): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var ScrollSpy = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'scrollspy';
  var VERSION = '4.0.0-alpha.5';
  var DATA_KEY = 'bs.scrollspy';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = {
    offset: 10,
    method: 'auto',
    target: ''
  };

  var DefaultType = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };

  var Event = {
    ACTIVATE: 'activate' + EVENT_KEY,
    SCROLL: 'scroll' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    NAV_LINK: 'nav-link',
    NAV: 'nav',
    ACTIVE: 'active'
  };

  var Selector = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    LIST_ITEM: '.list-item',
    LI: 'li',
    LI_DROPDOWN: 'li.dropdown',
    NAV_LINKS: '.nav-link',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };

  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = function () {
    function ScrollSpy(element, config) {
      _classCallCheck(this, ScrollSpy);

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;

      $(this._scrollElement).on(Event.SCROLL, $.proxy(this._process, this));

      this.refresh();
      this._process();
    }

    // getters

    // public

    ScrollSpy.prototype.refresh = function refresh() {
      var _this = this;

      var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;

      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

      this._offsets = [];
      this._targets = [];

      this._scrollHeight = this._getScrollHeight();

      var targets = $.makeArray($(this._selector));

      targets.map(function (element) {
        var target = void 0;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = $(targetSelector)[0];
        }

        if (target && (target.offsetWidth || target.offsetHeight)) {
          // todo (fat): remove sketch reliance on jQuery position/offset
          return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
        }
        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this._offsets.push(item[0]);
        _this._targets.push(item[1]);
      });
    };

    ScrollSpy.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._scrollElement).off(EVENT_KEY);

      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    };

    // private

    ScrollSpy.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);

      if (typeof config.target !== 'string') {
        var id = $(config.target).attr('id');
        if (!id) {
          id = Util.getUID(NAME);
          $(config.target).attr('id', id);
        }
        config.target = '#' + id;
      }

      Util.typeCheckConfig(NAME, config, DefaultType);

      return config;
    };

    ScrollSpy.prototype._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.scrollY : this._scrollElement.scrollTop;
    };

    ScrollSpy.prototype._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    ScrollSpy.prototype._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;
      var scrollHeight = this._getScrollHeight();
      var maxScroll = this._config.offset + scrollHeight - this._scrollElement.offsetHeight;

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }
      }

      if (this._activeTarget && scrollTop < this._offsets[0]) {
        this._activeTarget = null;
        this._clear();
        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (this._offsets[i + 1] === undefined || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    ScrollSpy.prototype._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',');
      queries = queries.map(function (selector) {
        return selector + '[data-target="' + target + '"],' + (selector + '[href="' + target + '"]');
      });

      var $link = $(queries.join(','));

      if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
        $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        $link.addClass(ClassName.ACTIVE);
      } else {
        // todo (fat) this is kinda sus...
        // recursively add actives to tested nav-links
        $link.parents(Selector.LI).find(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
      }

      $(this._scrollElement).trigger(Event.ACTIVATE, {
        relatedTarget: target
      });
    };

    ScrollSpy.prototype._clear = function _clear() {
      $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
    };

    // static

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config || null;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return ScrollSpy;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(window).on(Event.LOAD_DATA_API, function () {
    var scrollSpys = $.makeArray($(Selector.DATA_SPY));

    for (var i = scrollSpys.length; i--;) {
      var $spy = $(scrollSpys[i]);
      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = ScrollSpy._jQueryInterface;
  $.fn[NAME].Constructor = ScrollSpy;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return ScrollSpy._jQueryInterface;
  };

  return ScrollSpy;
}(jQuery);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.5): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tab = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tab';
  var VERSION = '4.0.0-alpha.5';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    FADE: 'fade',
    IN: 'in'
  };

  var Selector = {
    A: 'a',
    LI: 'li',
    DROPDOWN: '.dropdown',
    UL: 'ul:not(.dropdown-menu)',
    FADE_CHILD: '> .nav-item .fade, > .fade',
    ACTIVE: '.active',
    ACTIVE_CHILD: '> .nav-item > .active, > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = function () {
    function Tab(element) {
      _classCallCheck(this, Tab);

      this._element = element;
    }

    // getters

    // public

    Tab.prototype.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE)) {
        return;
      }

      var target = void 0;
      var previous = void 0;
      var ulElement = $(this._element).closest(Selector.UL)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (ulElement) {
        previous = $.makeArray($(ulElement).find(Selector.ACTIVE));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $.Event(Event.HIDE, {
        relatedTarget: this._element
      });

      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = $(selector)[0];
      }

      this._activate(this._element, ulElement);

      var complete = function complete() {
        var hiddenEvent = $.Event(Event.HIDDEN, {
          relatedTarget: _this._element
        });

        var shownEvent = $.Event(Event.SHOWN, {
          relatedTarget: previous
        });

        $(previous).trigger(hiddenEvent);
        $(_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    Tab.prototype.dispose = function dispose() {
      $.removeClass(this._element, DATA_KEY);
      this._element = null;
    };

    // private

    Tab.prototype._activate = function _activate(element, container, callback) {
      var active = $(container).find(Selector.ACTIVE_CHILD)[0];
      var isTransitioning = callback && Util.supportsTransitionEnd() && (active && $(active).hasClass(ClassName.FADE) || Boolean($(container).find(Selector.FADE_CHILD)[0]));

      var complete = $.proxy(this._transitionComplete, this, element, active, isTransitioning, callback);

      if (active && isTransitioning) {
        $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      if (active) {
        $(active).removeClass(ClassName.IN);
      }
    };

    Tab.prototype._transitionComplete = function _transitionComplete(element, active, isTransitioning, callback) {
      if (active) {
        $(active).removeClass(ClassName.ACTIVE);

        var dropdownChild = $(active).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName.ACTIVE);
        }

        active.setAttribute('aria-expanded', false);
      }

      $(element).addClass(ClassName.ACTIVE);
      element.setAttribute('aria-expanded', true);

      if (isTransitioning) {
        Util.reflow(element);
        $(element).addClass(ClassName.IN);
      } else {
        $(element).removeClass(ClassName.FADE);
      }

      if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

        var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
        if (dropdownElement) {
          $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    };

    // static

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);

        if (!data) {
          data = data = new Tab(this);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Tab;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    Tab._jQueryInterface.call($(this), 'show');
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tab._jQueryInterface;
  $.fn[NAME].Constructor = Tab;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab._jQueryInterface;
  };

  return Tab;
}(jQuery);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.5): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tooltip = function ($) {

  /**
   * Check for Tether dependency
   * Tether - http://tether.io/
   */
  if (window.Tether === undefined) {
    throw new Error('Bootstrap tooltips require Tether (http://tether.io/)');
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tooltip';
  var VERSION = '4.0.0-alpha.5';
  var DATA_KEY = 'bs.tooltip';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;
  var CLASS_PREFIX = 'bs-tether';

  var Default = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: '0 0',
    constraints: []
  };

  var DefaultType = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: 'string',
    constraints: 'array'
  };

  var AttachmentMap = {
    TOP: 'bottom center',
    RIGHT: 'middle left',
    BOTTOM: 'top center',
    LEFT: 'middle right'
  };

  var HoverState = {
    IN: 'in',
    OUT: 'out'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  var ClassName = {
    FADE: 'fade',
    IN: 'in'
  };

  var Selector = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner'
  };

  var TetherClass = {
    element: false,
    enabled: false
  };

  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip = function () {
    function Tooltip(element, config) {
      _classCallCheck(this, Tooltip);

      // private
      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._tether = null;

      // protected
      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    }

    // getters

    // public

    Tooltip.prototype.enable = function enable() {
      this._isEnabled = true;
    };

    Tooltip.prototype.disable = function disable() {
      this._isEnabled = false;
    };

    Tooltip.prototype.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    Tooltip.prototype.toggle = function toggle(event) {
      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {

        if ($(this.getTipElement()).hasClass(ClassName.IN)) {
          this._leave(null, this);
          return;
        }

        this._enter(null, this);
      }
    };

    Tooltip.prototype.dispose = function dispose() {
      clearTimeout(this._timeout);

      this.cleanupTether();

      $.removeData(this.element, this.constructor.DATA_KEY);

      $(this.element).off(this.constructor.EVENT_KEY);

      if (this.tip) {
        $(this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;
      this._tether = null;

      this.element = null;
      this.config = null;
      this.tip = null;
    };

    Tooltip.prototype.show = function show() {
      var _this = this;

      var showEvent = $.Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) {
        $(this.element).trigger(showEvent);

        var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);

        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);

        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(ClassName.FADE);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        $(tip).data(this.constructor.DATA_KEY, this).appendTo(document.body);

        $(this.element).trigger(this.constructor.Event.INSERTED);

        this._tether = new Tether({
          attachment: attachment,
          element: tip,
          target: this.element,
          classes: TetherClass,
          classPrefix: CLASS_PREFIX,
          offset: this.config.offset,
          constraints: this.config.constraints,
          addTargetClasses: false
        });

        Util.reflow(tip);
        this._tether.position();

        $(tip).addClass(ClassName.IN);

        var complete = function complete() {
          var prevHoverState = _this._hoverState;
          _this._hoverState = null;

          $(_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this._leave(null, _this);
          }
        };

        if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
          $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
          return;
        }

        complete();
      }
    };

    Tooltip.prototype.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $.Event(this.constructor.Event.HIDE);
      var complete = function complete() {
        if (_this2._hoverState !== HoverState.IN && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2.element.removeAttribute('aria-describedby');
        $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);
        _this2.cleanupTether();

        if (callback) {
          callback();
        }
      };

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(tip).removeClass(ClassName.IN);

      if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {

        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    // protected

    Tooltip.prototype.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    Tooltip.prototype.getTipElement = function getTipElement() {
      return this.tip = this.tip || $(this.config.template)[0];
    };

    Tooltip.prototype.setContent = function setContent() {
      var $tip = $(this.getTipElement());

      this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());

      $tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);

      this.cleanupTether();
    };

    Tooltip.prototype.setElementContent = function setElementContent($element, content) {
      var html = this.config.html;
      if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object' && (content.nodeType || content.jquery)) {
        // content is a DOM node or a jQuery
        if (html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($(content).text());
        }
      } else {
        $element[html ? 'html' : 'text'](content);
      }
    };

    Tooltip.prototype.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    };

    Tooltip.prototype.cleanupTether = function cleanupTether() {
      if (this._tether) {
        this._tether.destroy();
      }
    };

    // private

    Tooltip.prototype._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };

    Tooltip.prototype._setListeners = function _setListeners() {
      var _this3 = this;

      var triggers = this.config.trigger.split(' ');

      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, $.proxy(_this3.toggle, _this3));
        } else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;

          $(_this3.element).on(eventIn, _this3.config.selector, $.proxy(_this3._enter, _this3)).on(eventOut, _this3.config.selector, $.proxy(_this3._leave, _this3));
        }
      });

      if (this.config.selector) {
        this.config = $.extend({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    Tooltip.prototype._fixTitle = function _fixTitle() {
      var titleType = _typeof(this.element.getAttribute('data-original-title'));
      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    Tooltip.prototype._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;

      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
      }

      if ($(context.getTipElement()).hasClass(ClassName.IN) || context._hoverState === HoverState.IN) {
        context._hoverState = HoverState.IN;
        return;
      }

      clearTimeout(context._timeout);

      context._hoverState = HoverState.IN;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.IN) {
          context.show();
        }
      }, context.config.delay.show);
    };

    Tooltip.prototype._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;

      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);

      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    Tooltip.prototype._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    Tooltip.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

      if (config.delay && typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

      return config;
    };

    Tooltip.prototype._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    // static

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Tooltip;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tooltip._jQueryInterface;
  $.fn[NAME].Constructor = Tooltip;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tooltip._jQueryInterface;
  };

  return Tooltip;
}(jQuery); /* global Tether */
;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.5): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Popover = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'popover';
  var VERSION = '4.0.0-alpha.5';
  var DATA_KEY = 'bs.popover';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = $.extend({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<h3 class="popover-title"></h3>' + '<div class="popover-content"></div></div>'
  });

  var DefaultType = $.extend({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName = {
    FADE: 'fade',
    IN: 'in'
  };

  var Selector = {
    TITLE: '.popover-title',
    CONTENT: '.popover-content'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover = function (_Tooltip) {
    _inherits(Popover, _Tooltip);

    function Popover() {
      _classCallCheck(this, Popover);

      return _possibleConstructorReturn(this, _Tooltip.apply(this, arguments));
    }

    // overrides

    Popover.prototype.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    Popover.prototype.getTipElement = function getTipElement() {
      return this.tip = this.tip || $(this.config.template)[0];
    };

    Popover.prototype.setContent = function setContent() {
      var $tip = $(this.getTipElement());

      // we use append for html objects to maintain js events
      this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
      this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

      $tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);

      this.cleanupTether();
    };

    // private

    Popover.prototype._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
    };

    // static

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

        if (!data && /destroy|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: 'VERSION',


      // getters

      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Popover;
  }(Tooltip);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Popover._jQueryInterface;
  $.fn[NAME].Constructor = Popover;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Popover._jQueryInterface;
  };

  return Popover;
}(jQuery);











/*
Turbolinks 5.0.0
Copyright © 2016 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e,r=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function n(t){this.delegate=t,this.onPopState=r(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},n.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},n.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},n.prototype.shouldHandlePopState=function(){return e===!0},n.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},n}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,c;for(this.element=t,this.elements={},c=this.element.childNodes,s=0,u=c.length;u>s;s++)i=c[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},t.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){
var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
(function() {
  jQuery(function() {
    $("a[rel~=popover], .has-popover").popover();
    return $("a[rel~=tooltip], .has-tooltip").tooltip();
  });

}).call(this);
(function() {
  var slice = [].slice;

  this.ActionCable = {
    INTERNAL: {
      "message_types": {
        "welcome": "welcome",
        "ping": "ping",
        "confirmation": "confirm_subscription",
        "rejection": "reject_subscription"
      },
      "default_mount_path": "/cable",
      "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
    },
    createConsumer: function(url) {
      var ref;
      if (url == null) {
        url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
      }
      return new ActionCable.Consumer(this.createWebSocketURL(url));
    },
    getConfig: function(name) {
      var element;
      element = document.head.querySelector("meta[name='action-cable-" + name + "']");
      return element != null ? element.getAttribute("content") : void 0;
    },
    createWebSocketURL: function(url) {
      var a;
      if (url && !/^wss?:/i.test(url)) {
        a = document.createElement("a");
        a.href = url;
        a.href = a.href;
        a.protocol = a.protocol.replace("http", "ws");
        return a.href;
      } else {
        return url;
      }
    },
    startDebugging: function() {
      return this.debugging = true;
    },
    stopDebugging: function() {
      return this.debugging = null;
    },
    log: function() {
      var messages;
      messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (this.debugging) {
        messages.push(Date.now());
        return console.log.apply(console, ["[ActionCable]"].concat(slice.call(messages)));
      }
    }
  };

  if (typeof window !== "undefined" && window !== null) {
    window.ActionCable = this.ActionCable;
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = this.ActionCable;
  }

}).call(this);
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ActionCable.ConnectionMonitor = (function() {
    var clamp, now, secondsSince;

    ConnectionMonitor.pollInterval = {
      min: 3,
      max: 30
    };

    ConnectionMonitor.staleThreshold = 6;

    function ConnectionMonitor(connection) {
      this.connection = connection;
      this.visibilityDidChange = bind(this.visibilityDidChange, this);
      this.reconnectAttempts = 0;
    }

    ConnectionMonitor.prototype.start = function() {
      if (!this.isRunning()) {
        this.startedAt = now();
        delete this.stoppedAt;
        this.startPolling();
        document.addEventListener("visibilitychange", this.visibilityDidChange);
        return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
      }
    };

    ConnectionMonitor.prototype.stop = function() {
      if (this.isRunning()) {
        this.stoppedAt = now();
        this.stopPolling();
        document.removeEventListener("visibilitychange", this.visibilityDidChange);
        return ActionCable.log("ConnectionMonitor stopped");
      }
    };

    ConnectionMonitor.prototype.isRunning = function() {
      return (this.startedAt != null) && (this.stoppedAt == null);
    };

    ConnectionMonitor.prototype.recordPing = function() {
      return this.pingedAt = now();
    };

    ConnectionMonitor.prototype.recordConnect = function() {
      this.reconnectAttempts = 0;
      this.recordPing();
      delete this.disconnectedAt;
      return ActionCable.log("ConnectionMonitor recorded connect");
    };

    ConnectionMonitor.prototype.recordDisconnect = function() {
      this.disconnectedAt = now();
      return ActionCable.log("ConnectionMonitor recorded disconnect");
    };

    ConnectionMonitor.prototype.startPolling = function() {
      this.stopPolling();
      return this.poll();
    };

    ConnectionMonitor.prototype.stopPolling = function() {
      return clearTimeout(this.pollTimeout);
    };

    ConnectionMonitor.prototype.poll = function() {
      return this.pollTimeout = setTimeout((function(_this) {
        return function() {
          _this.reconnectIfStale();
          return _this.poll();
        };
      })(this), this.getPollInterval());
    };

    ConnectionMonitor.prototype.getPollInterval = function() {
      var interval, max, min, ref;
      ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
      interval = 5 * Math.log(this.reconnectAttempts + 1);
      return Math.round(clamp(interval, min, max) * 1000);
    };

    ConnectionMonitor.prototype.reconnectIfStale = function() {
      if (this.connectionIsStale()) {
        ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
        this.reconnectAttempts++;
        if (this.disconnectedRecently()) {
          return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
        } else {
          ActionCable.log("ConnectionMonitor reopening");
          return this.connection.reopen();
        }
      }
    };

    ConnectionMonitor.prototype.connectionIsStale = function() {
      var ref;
      return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
    };

    ConnectionMonitor.prototype.disconnectedRecently = function() {
      return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
    };

    ConnectionMonitor.prototype.visibilityDidChange = function() {
      if (document.visibilityState === "visible") {
        return setTimeout((function(_this) {
          return function() {
            if (_this.connectionIsStale() || !_this.connection.isOpen()) {
              ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
              return _this.connection.reopen();
            }
          };
        })(this), 200);
      }
    };

    now = function() {
      return new Date().getTime();
    };

    secondsSince = function(time) {
      return (now() - time) / 1000;
    };

    clamp = function(number, min, max) {
      return Math.max(min, Math.min(max, number));
    };

    return ConnectionMonitor;

  })();

}).call(this);
(function() {
  var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

  supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

  ActionCable.Connection = (function() {
    Connection.reopenDelay = 500;

    function Connection(consumer) {
      this.consumer = consumer;
      this.open = bind(this.open, this);
      this.subscriptions = this.consumer.subscriptions;
      this.monitor = new ActionCable.ConnectionMonitor(this);
      this.disconnected = true;
    }

    Connection.prototype.send = function(data) {
      if (this.isOpen()) {
        this.webSocket.send(JSON.stringify(data));
        return true;
      } else {
        return false;
      }
    };

    Connection.prototype.open = function() {
      if (this.isActive()) {
        ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
        throw new Error("Existing connection must be closed before opening");
      } else {
        ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
        if (this.webSocket != null) {
          this.uninstallEventHandlers();
        }
        this.webSocket = new WebSocket(this.consumer.url, protocols);
        this.installEventHandlers();
        this.monitor.start();
        return true;
      }
    };

    Connection.prototype.close = function(arg) {
      var allowReconnect, ref1;
      allowReconnect = (arg != null ? arg : {
        allowReconnect: true
      }).allowReconnect;
      if (!allowReconnect) {
        this.monitor.stop();
      }
      if (this.isActive()) {
        return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
      }
    };

    Connection.prototype.reopen = function() {
      var error, error1;
      ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
      if (this.isActive()) {
        try {
          return this.close();
        } catch (error1) {
          error = error1;
          return ActionCable.log("Failed to reopen WebSocket", error);
        } finally {
          ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
          setTimeout(this.open, this.constructor.reopenDelay);
        }
      } else {
        return this.open();
      }
    };

    Connection.prototype.getProtocol = function() {
      var ref1;
      return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
    };

    Connection.prototype.isOpen = function() {
      return this.isState("open");
    };

    Connection.prototype.isActive = function() {
      return this.isState("open", "connecting");
    };

    Connection.prototype.isProtocolSupported = function() {
      var ref1;
      return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
    };

    Connection.prototype.isState = function() {
      var ref1, states;
      states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
    };

    Connection.prototype.getState = function() {
      var ref1, state, value;
      for (state in WebSocket) {
        value = WebSocket[state];
        if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
          return state.toLowerCase();
        }
      }
      return null;
    };

    Connection.prototype.installEventHandlers = function() {
      var eventName, handler;
      for (eventName in this.events) {
        handler = this.events[eventName].bind(this);
        this.webSocket["on" + eventName] = handler;
      }
    };

    Connection.prototype.uninstallEventHandlers = function() {
      var eventName;
      for (eventName in this.events) {
        this.webSocket["on" + eventName] = function() {};
      }
    };

    Connection.prototype.events = {
      message: function(event) {
        var identifier, message, ref1, type;
        if (!this.isProtocolSupported()) {
          return;
        }
        ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
        switch (type) {
          case message_types.welcome:
            this.monitor.recordConnect();
            return this.subscriptions.reload();
          case message_types.ping:
            return this.monitor.recordPing();
          case message_types.confirmation:
            return this.subscriptions.notify(identifier, "connected");
          case message_types.rejection:
            return this.subscriptions.reject(identifier);
          default:
            return this.subscriptions.notify(identifier, "received", message);
        }
      },
      open: function() {
        ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
        this.disconnected = false;
        if (!this.isProtocolSupported()) {
          ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
          return this.close({
            allowReconnect: false
          });
        }
      },
      close: function(event) {
        ActionCable.log("WebSocket onclose event");
        if (this.disconnected) {
          return;
        }
        this.disconnected = true;
        this.monitor.recordDisconnect();
        return this.subscriptions.notifyAll("disconnected", {
          willAttemptReconnect: this.monitor.isRunning()
        });
      },
      error: function() {
        return ActionCable.log("WebSocket onerror event");
      }
    };

    return Connection;

  })();

}).call(this);
(function() {
  var slice = [].slice;

  ActionCable.Subscriptions = (function() {
    function Subscriptions(consumer) {
      this.consumer = consumer;
      this.subscriptions = [];
    }

    Subscriptions.prototype.create = function(channelName, mixin) {
      var channel, params, subscription;
      channel = channelName;
      params = typeof channel === "object" ? channel : {
        channel: channel
      };
      subscription = new ActionCable.Subscription(this.consumer, params, mixin);
      return this.add(subscription);
    };

    Subscriptions.prototype.add = function(subscription) {
      this.subscriptions.push(subscription);
      this.consumer.ensureActiveConnection();
      this.notify(subscription, "initialized");
      this.sendCommand(subscription, "subscribe");
      return subscription;
    };

    Subscriptions.prototype.remove = function(subscription) {
      this.forget(subscription);
      if (!this.findAll(subscription.identifier).length) {
        this.sendCommand(subscription, "unsubscribe");
      }
      return subscription;
    };

    Subscriptions.prototype.reject = function(identifier) {
      var i, len, ref, results, subscription;
      ref = this.findAll(identifier);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        this.forget(subscription);
        this.notify(subscription, "rejected");
        results.push(subscription);
      }
      return results;
    };

    Subscriptions.prototype.forget = function(subscription) {
      var s;
      this.subscriptions = (function() {
        var i, len, ref, results;
        ref = this.subscriptions;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          s = ref[i];
          if (s !== subscription) {
            results.push(s);
          }
        }
        return results;
      }).call(this);
      return subscription;
    };

    Subscriptions.prototype.findAll = function(identifier) {
      var i, len, ref, results, s;
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (s.identifier === identifier) {
          results.push(s);
        }
      }
      return results;
    };

    Subscriptions.prototype.reload = function() {
      var i, len, ref, results, subscription;
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        results.push(this.sendCommand(subscription, "subscribe"));
      }
      return results;
    };

    Subscriptions.prototype.notifyAll = function() {
      var args, callbackName, i, len, ref, results, subscription;
      callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
      }
      return results;
    };

    Subscriptions.prototype.notify = function() {
      var args, callbackName, i, len, results, subscription, subscriptions;
      subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
      if (typeof subscription === "string") {
        subscriptions = this.findAll(subscription);
      } else {
        subscriptions = [subscription];
      }
      results = [];
      for (i = 0, len = subscriptions.length; i < len; i++) {
        subscription = subscriptions[i];
        results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
      }
      return results;
    };

    Subscriptions.prototype.sendCommand = function(subscription, command) {
      var identifier;
      identifier = subscription.identifier;
      return this.consumer.send({
        command: command,
        identifier: identifier
      });
    };

    return Subscriptions;

  })();

}).call(this);
(function() {
  ActionCable.Subscription = (function() {
    var extend;

    function Subscription(consumer, params, mixin) {
      this.consumer = consumer;
      if (params == null) {
        params = {};
      }
      this.identifier = JSON.stringify(params);
      extend(this, mixin);
    }

    Subscription.prototype.perform = function(action, data) {
      if (data == null) {
        data = {};
      }
      data.action = action;
      return this.send(data);
    };

    Subscription.prototype.send = function(data) {
      return this.consumer.send({
        command: "message",
        identifier: this.identifier,
        data: JSON.stringify(data)
      });
    };

    Subscription.prototype.unsubscribe = function() {
      return this.consumer.subscriptions.remove(this);
    };

    extend = function(object, properties) {
      var key, value;
      if (properties != null) {
        for (key in properties) {
          value = properties[key];
          object[key] = value;
        }
      }
      return object;
    };

    return Subscription;

  })();

}).call(this);
(function() {
  ActionCable.Consumer = (function() {
    function Consumer(url) {
      this.url = url;
      this.subscriptions = new ActionCable.Subscriptions(this);
      this.connection = new ActionCable.Connection(this);
    }

    Consumer.prototype.send = function(data) {
      return this.connection.send(data);
    };

    Consumer.prototype.connect = function() {
      return this.connection.open();
    };

    Consumer.prototype.disconnect = function() {
      return this.connection.close({
        allowReconnect: false
      });
    };

    Consumer.prototype.ensureActiveConnection = function() {
      if (!this.connection.isActive()) {
        return this.connection.open();
      }
    };

    return Consumer;

  })();

}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
/*
 CanvasJS HTML5 & JavaScript Charts - v1.9.5 GA - http://canvasjs.com/ 
 Copyright 2016 fenopix

  --------------------- License Information --------------------
 CanvasJS is a commercial product which requires purchase of license. Without a commercial license you can use it for evaluation purposes for upto 30 days. Please refer to the following link for further details.
     http://canvasjs.com/license-canvasjs/

*/

(function(){function S(a,c){a.prototype=Pa(c.prototype);a.prototype.constructor=a;a.base=c.prototype}function Pa(a){function c(){}c.prototype=a;return new c}function Ga(a,c,b){"millisecond"===b?a.setMilliseconds(a.getMilliseconds()+1*c):"second"===b?a.setSeconds(a.getSeconds()+1*c):"minute"===b?a.setMinutes(a.getMinutes()+1*c):"hour"===b?a.setHours(a.getHours()+1*c):"day"===b?a.setDate(a.getDate()+1*c):"week"===b?a.setDate(a.getDate()+7*c):"month"===b?a.setMonth(a.getMonth()+1*c):"year"===b&&a.setFullYear(a.getFullYear()+
1*c);return a}function O(a,c){var b=!1;0>a&&(b=!0,a*=-1);a=""+a;for(c=c?c:1;a.length<c;)a="0"+a;return b?"-"+a:a}function ka(a){if(!a)return a;a=a.replace(/^\s\s*/,"");for(var c=/\s/,b=a.length;c.test(a.charAt(--b)););return a.slice(0,b+1)}function Qa(a){a.roundRect=function(a,b,d,f,g,h,k,l){k&&(this.fillStyle=k);l&&(this.strokeStyle=l);"undefined"===typeof g&&(g=5);this.lineWidth=h;this.beginPath();this.moveTo(a+g,b);this.lineTo(a+d-g,b);this.quadraticCurveTo(a+d,b,a+d,b+g);this.lineTo(a+d,b+f-g);
this.quadraticCurveTo(a+d,b+f,a+d-g,b+f);this.lineTo(a+g,b+f);this.quadraticCurveTo(a,b+f,a,b+f-g);this.lineTo(a,b+g);this.quadraticCurveTo(a,b,a+g,b);this.closePath();k&&this.fill();l&&0<h&&this.stroke()}}function ya(a,c){return a-c}function Ha(a,c){return a.x-c.x}function D(a){var c=((a&16711680)>>16).toString(16),b=((a&65280)>>8).toString(16);a=((a&255)>>0).toString(16);c=2>c.length?"0"+c:c;b=2>b.length?"0"+b:b;a=2>a.length?"0"+a:a;return"#"+c+b+a}function Ra(a,c){var b=this.length>>>0,d=Number(c)||
0,d=0>d?Math.ceil(d):Math.floor(d);for(0>d&&(d+=b);d<b;d++)if(d in this&&this[d]===a)return d;return-1}function x(a){return null===a||"undefined"===typeof a}function qa(a){a.indexOf||(a.indexOf=Ra);return a}function Ia(a,c,b){b=b||"normal";var d=a+"_"+c+"_"+b,f=Ja[d];if(isNaN(f)){try{a="position:absolute; left:0px; top:-20000px; padding:0px;margin:0px;border:none;white-space:pre;line-height:normal;font-family:"+a+"; font-size:"+c+"px; font-weight:"+b+";";if(!ba){var g=document.body;ba=document.createElement("span");
ba.innerHTML="";var h=document.createTextNode("Mpgyi");ba.appendChild(h);g.appendChild(ba)}ba.style.display="";ba.setAttribute("style",a);f=Math.round(ba.offsetHeight);ba.style.display="none"}catch(k){f=Math.ceil(1.1*c)}f=Math.max(f,c);Ja[d]=f}return f}function E(a,c){var b=[];if(b={solid:[],shortDash:[3,1],shortDot:[1,1],shortDashDot:[3,1,1,1],shortDashDotDot:[3,1,1,1,1,1],dot:[1,2],dash:[4,2],dashDot:[4,2,1,2],longDash:[8,2],longDashDot:[8,2,1,2],longDashDotDot:[8,2,1,2,1,2]}[a||"solid"])for(var d=
0;d<b.length;d++)b[d]*=c;else b=[];return b}function J(a,c,b,d){if(a.addEventListener)a.addEventListener(c,b,d||!1);else if(a.attachEvent)a.attachEvent("on"+c,function(d){d=d||window.event;d.preventDefault=d.preventDefault||function(){d.returnValue=!1};d.stopPropagation=d.stopPropagation||function(){d.cancelBubble=!0};b.call(a,d)});else return!1}function Ka(a,c,b){a*=P;c*=P;a=b.getImageData(a,c,2,2).data;c=!0;for(b=0;4>b;b++)if(a[b]!==a[b+4]|a[b]!==a[b+8]|a[b]!==a[b+12]){c=!1;break}return c?a[0]<<
16|a[1]<<8|a[2]:0}function Q(a,c,b){return a in c?c[a]:b[a]}function ra(a,c,b){if(u&&La){var d=a.getContext("2d");sa=d.webkitBackingStorePixelRatio||d.mozBackingStorePixelRatio||d.msBackingStorePixelRatio||d.oBackingStorePixelRatio||d.backingStorePixelRatio||1;P=za/sa;a.width=c*P;a.height=b*P;za!==sa&&(a.style.width=c+"px",a.style.height=b+"px",d.scale(P,P))}else a.width=c,a.height=b}function Sa(a){if(!Ma){var c=!1,b=!1;"undefined"===typeof ca.Chart.creditHref?(a.creditHref="http://canvasjs.com/",
a.creditText="CanvasJS.com"):(c=a.updateOption("creditText"),b=a.updateOption("creditHref"));if(a.creditHref&&a.creditText){a._creditLink||(a._creditLink=document.createElement("a"),a._creditLink.setAttribute("class","canvasjs-chart-credit"),a._creditLink.setAttribute("style","outline:none;margin:0px;position:absolute;right:2px;top:"+(a.height-14)+"px;color:dimgrey;text-decoration:none;font-size:11px;font-family: Calibri, Lucida Grande, Lucida Sans Unicode, Arial, sans-serif"),a._creditLink.setAttribute("tabIndex",
-1),a._creditLink.setAttribute("target","_blank"));if(0===a.renderCount||c||b)a._creditLink.setAttribute("href",a.creditHref),a._creditLink.innerHTML=a.creditText;a._creditLink&&a.creditHref&&a.creditText?(a._creditLink.parentElement||a._canvasJSContainer.appendChild(a._creditLink),a._creditLink.style.top=a.height-14+"px"):a._creditLink.parentElement&&a._canvasJSContainer.removeChild(a._creditLink)}}}function ga(a,c){var b=document.createElement("canvas");b.setAttribute("class","canvasjs-chart-canvas");
ra(b,a,c);u||"undefined"===typeof G_vmlCanvasManager||G_vmlCanvasManager.initElement(b);return b}function Aa(a,c,b){if(a&&c&&b){b=b+"."+c;var d="image/"+c;a=a.toDataURL(d);var f=!1,g=document.createElement("a");g.download=b;g.href=a;g.target="_blank";if("undefined"!==typeof Blob&&new Blob){for(var h=a.replace(/^data:[a-z/]*;base64,/,""),h=atob(h),k=new ArrayBuffer(h.length),k=new Uint8Array(k),l=0;l<h.length;l++)k[l]=h.charCodeAt(l);c=new Blob([k.buffer],{type:"image/"+c});try{window.navigator.msSaveBlob(c,
b),f=!0}catch(m){g.dataset.downloadurl=[d,g.download,g.href].join(":"),g.href=window.URL.createObjectURL(c)}}if(!f)try{event=document.createEvent("MouseEvents"),event.initMouseEvent("click",!0,!1,window,0,0,0,0,0,!1,!1,!1,!1,0,null),g.dispatchEvent?g.dispatchEvent(event):g.fireEvent&&g.fireEvent("onclick")}catch(p){c=window.open(),c.document.write("<img src='"+a+"'></img><div>Please right click on the image and save it to your device</div>"),c.document.close()}}}function Y(a,c,b){c.getAttribute("state")!==
b&&(c.setAttribute("state",b),c.setAttribute("type","button"),c.style.position="relative",c.style.margin="0px 0px 0px 0px",c.style.padding="3px 4px 0px 4px",c.style.cssFloat="left",c.setAttribute("title",a._cultureInfo[b+"Text"]),c.innerHTML="<img style='height:16px;' src='"+Ta[b].image+"' alt='"+a._cultureInfo[b+"Text"]+"' />")}function ta(){for(var a=null,c=0;c<arguments.length;c++)a=arguments[c],a.style&&(a.style.display="inline")}function Z(){for(var a=null,c=0;c<arguments.length;c++)(a=arguments[c])&&
a.style&&(a.style.display="none")}function K(a,c,b,d){this._defaultsKey=a;this.parent=d;this._eventListeners=[];d={};b&&(ia[b]&&ia[b][a])&&(d=ia[b][a]);this.options=c?c:{_isPlaceholder:!0};this.setOptions(this.options,d)}function y(a,c){c=c||{};y.base.constructor.call(this,"Chart",c,c.theme?c.theme:"theme1");var b=this;this._containerId=a;this._objectsInitialized=!1;this.overlaidCanvasCtx=this.ctx=null;this._indexLabels=[];this._panTimerId=0;this._lastTouchEventType="";this._lastTouchData=null;this.isAnimating=
!1;this.renderCount=0;this.panEnabled=this.disableToolTip=this.animatedRender=!1;this._defaultCursor="default";this.plotArea={canvas:null,ctx:null,x1:0,y1:0,x2:0,y2:0,width:0,height:0};this._dataInRenderedOrder=[];if(this.container="string"===typeof this._containerId?document.getElementById(this._containerId):this._containerId){this.container.innerHTML="";var d=0,f=0,d=this.options.width?this.width:0<this.container.clientWidth?this.container.clientWidth:this.width,f=this.options.height?this.height:
0<this.container.clientHeight?this.container.clientHeight:this.height;this.width=d;this.height=f;this.x1=this.y1=0;this.x2=this.width;this.y2=this.height;this._selectedColorSet="undefined"!==typeof ha[this.colorSet]?ha[this.colorSet]:ha.colorSet1;this._canvasJSContainer=document.createElement("div");this._canvasJSContainer.setAttribute("class","canvasjs-chart-container");this._canvasJSContainer.style.position="relative";this._canvasJSContainer.style.textAlign="left";this._canvasJSContainer.style.cursor=
"auto";u||(this._canvasJSContainer.style.height="0px");this.container.appendChild(this._canvasJSContainer);this.canvas=ga(d,f);this.canvas.style.position="absolute";this.canvas.getContext&&(this._canvasJSContainer.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this.ctx.textBaseline="top",Qa(this.ctx),u?this.plotArea.ctx=this.ctx:(this.plotArea.canvas=ga(d,f),this.plotArea.canvas.style.position="absolute",this.plotArea.canvas.setAttribute("class","plotAreaCanvas"),this._canvasJSContainer.appendChild(this.plotArea.canvas),
this.plotArea.ctx=this.plotArea.canvas.getContext("2d")),this.overlaidCanvas=ga(d,f),this.overlaidCanvas.style.position="absolute",this._canvasJSContainer.appendChild(this.overlaidCanvas),this.overlaidCanvasCtx=this.overlaidCanvas.getContext("2d"),this.overlaidCanvasCtx.textBaseline="top",this._eventManager=new la(this),J(window,"resize",function(){b._updateSize()&&b.render()}),this._toolBar=document.createElement("div"),this._toolBar.setAttribute("class","canvasjs-chart-toolbar"),this._toolBar.style.cssText=
"position: absolute; right: 1px; top: 1px;",this._canvasJSContainer.appendChild(this._toolBar),this.bounds={x1:0,y1:0,x2:this.width,y2:this.height},J(this.overlaidCanvas,"click",function(a){b._mouseEventHandler(a)}),J(this.overlaidCanvas,"mousemove",function(a){b._mouseEventHandler(a)}),J(this.overlaidCanvas,"mouseup",function(a){b._mouseEventHandler(a)}),J(this.overlaidCanvas,"mousedown",function(a){b._mouseEventHandler(a);Z(b._dropdownMenu)}),J(this.overlaidCanvas,"mouseout",function(a){b._mouseEventHandler(a)}),
J(this.overlaidCanvas,window.navigator.msPointerEnabled?"MSPointerDown":"touchstart",function(a){b._touchEventHandler(a)}),J(this.overlaidCanvas,window.navigator.msPointerEnabled?"MSPointerMove":"touchmove",function(a){b._touchEventHandler(a)}),J(this.overlaidCanvas,window.navigator.msPointerEnabled?"MSPointerUp":"touchend",function(a){b._touchEventHandler(a)}),J(this.overlaidCanvas,window.navigator.msPointerEnabled?"MSPointerCancel":"touchcancel",function(a){b._touchEventHandler(a)}),this.toolTip=
new T(this,this.options.toolTip),this.data=null,this.axisX=[],this.axisX2=[],this.axisY=[],this.axisY2=[],this.sessionVariables={axisX:[],axisX2:[],axisY:[],axisY2:[]})}else window.console&&window.console.log('CanvasJS Error: Chart Container with id "'+this._containerId+'" was not found')}function ua(a,c){for(var b=[],d,f=0;f<a.length;f++)if(0==f)b.push(a[0]);else{var g,h,k;k=f-1;g=0===k?0:k-1;h=k===a.length-1?k:k+1;d=Math.abs((a[h].x-a[g].x)/(0===a[h].x-a[k].x?0.01:a[h].x-a[k].x))*(c-1)/2+1;var l=
(a[h].x-a[g].x)/d;d=(a[h].y-a[g].y)/d;b[b.length]=a[k].x>a[g].x&&0<l||a[k].x<a[g].x&&0>l?{x:a[k].x+l/3,y:a[k].y+d/3}:{x:a[k].x,y:a[k].y+d/9};k=f;g=0===k?0:k-1;h=k===a.length-1?k:k+1;d=Math.abs((a[h].x-a[g].x)/(0===a[k].x-a[g].x?0.01:a[k].x-a[g].x))*(c-1)/2+1;l=(a[h].x-a[g].x)/d;d=(a[h].y-a[g].y)/d;b[b.length]=a[k].x>a[g].x&&0<l||a[k].x<a[g].x&&0>l?{x:a[k].x-l/3,y:a[k].y-d/3}:{x:a[k].x,y:a[k].y-d/9};b[b.length]=a[f]}return b}function Na(a,c){if(null===a||"undefined"===typeof a)return c;var b=parseFloat(a.toString())*
(0<=a.toString().indexOf("%")?c/100:1);return!isNaN(b)&&b<=c&&0<=b?b:c}function ja(a,c,b,d,f){"undefined"===typeof f&&(f=0);this._padding=f;this._x1=a;this._y1=c;this._x2=b;this._y2=d;this._rightOccupied=this._leftOccupied=this._bottomOccupied=this._topOccupied=this._padding}function V(a,c){V.base.constructor.call(this,"TextBlock",c);this.ctx=a;this._isDirty=!0;this._wrappedText=null}function ma(a,c){ma.base.constructor.call(this,"Title",c,a.theme,a);this.chart=a;this.canvas=a.canvas;this.ctx=this.chart.ctx;
this.optionsName="title";if(x(this.options.margin)&&a.options.subtitles)for(var b=a.options.subtitles,d=0;d<b.length;d++)if((x(b[d].horizontalAlign)&&"center"===this.horizontalAlign||b[d].horizontalAlign===this.horizontalAlign)&&(x(b[d].verticalAlign)&&"top"===this.verticalAlign||b[d].verticalAlign===this.verticalAlign)&&!b[d].dockInsidePlotArea===!this.dockInsidePlotArea){this.margin=0;break}"undefined"===typeof this.options.fontSize&&(this.fontSize=this.chart.getAutoFontSize(this.fontSize));this.height=
this.width=null;this.bounds={x1:null,y1:null,x2:null,y2:null}}function va(a,c){va.base.constructor.call(this,"Subtitle",c,a.theme,a);this.chart=a;this.canvas=a.canvas;this.ctx=this.chart.ctx;this.optionsName="subtitles";this.isOptionsInArray=!0;"undefined"===typeof this.options.fontSize&&(this.fontSize=this.chart.getAutoFontSize(this.fontSize));this.height=this.width=null;this.bounds={x1:null,y1:null,x2:null,y2:null}}function wa(a,c){wa.base.constructor.call(this,"Legend",c,a.theme,a);this.chart=
a;this.canvas=a.canvas;this.ctx=this.chart.ctx;this.ghostCtx=this.chart._eventManager.ghostCtx;this.items=[];this.optionsName="legend";this.height=this.width=0;this.orientation=null;this.dataSeries=[];this.bounds={x1:null,y1:null,x2:null,y2:null};"undefined"===typeof this.options.fontSize&&(this.fontSize=this.chart.getAutoFontSize(this.fontSize));this.lineHeight=Ia(this.fontFamily,this.fontSize,this.fontWeight);this.horizontalSpacing=this.fontSize}function Ba(a,c){Ba.base.constructor.call(this,c);
this.chart=a;this.canvas=a.canvas;this.ctx=this.chart.ctx}function aa(a,c,b,d){aa.base.constructor.call(this,"DataSeries",c,a.theme,a);this.chart=a;this.canvas=a.canvas;this._ctx=a.canvas.ctx;this.index=b;this.noDataPointsInPlotArea=0;this.id=d;this.chart._eventManager.objectMap[d]={id:d,objectType:"dataSeries",dataSeriesIndex:b};this.dataPointIds=[];this.plotUnit=[];this.axisY=this.axisX=null;this.optionsName="data";this.isOptionsInArray=!0;null===this.fillOpacity&&(this.type.match(/area/i)?this.fillOpacity=
0.7:this.fillOpacity=1);this.axisPlacement=this.getDefaultAxisPlacement();"undefined"===typeof this.options.indexLabelFontSize&&(this.indexLabelFontSize=this.chart.getAutoFontSize(this.indexLabelFontSize))}function A(a,c,b,d,f){A.base.constructor.call(this,"Axis",c,a.theme,a);this.chart=a;this.canvas=a.canvas;this.ctx=a.ctx;this.intervalStartPosition=this.maxHeight=this.maxWidth=0;this.labels=[];this.dataSeries=[];this._stripLineLabels=this._ticks=this._labels=null;this.dataInfo={min:Infinity,max:-Infinity,
viewPortMin:Infinity,viewPortMax:-Infinity,minDiff:Infinity};this.isOptionsInArray=!0;"axisX"===b?("left"===d||"bottom"===d?(this.optionsName="axisX",x(this.chart.sessionVariables.axisX[f])&&(this.chart.sessionVariables.axisX[f]={}),this.sessionVariables=this.chart.sessionVariables.axisX[f]):(this.optionsName="axisX2",x(this.chart.sessionVariables.axisX2[f])&&(this.chart.sessionVariables.axisX2[f]={}),this.sessionVariables=this.chart.sessionVariables.axisX2[f]),this.options.interval||(this.intervalType=
null),"theme2"===this.chart.theme&&x(this.options.lineThickness)&&(this.lineThickness=2)):"left"===d||"top"===d?(this.optionsName="axisY",x(this.chart.sessionVariables.axisY[f])&&(this.chart.sessionVariables.axisY[f]={}),this.sessionVariables=this.chart.sessionVariables.axisY[f]):(this.optionsName="axisY2",x(this.chart.sessionVariables.axisY2[f])&&(this.chart.sessionVariables.axisY2[f]={}),this.sessionVariables=this.chart.sessionVariables.axisY2[f]);"undefined"===typeof this.options.titleFontSize&&
(this.titleFontSize=this.chart.getAutoFontSize(this.titleFontSize));"undefined"===typeof this.options.labelFontSize&&(this.labelFontSize=this.chart.getAutoFontSize(this.labelFontSize));this.type=b;"axisX"!==b||c&&"undefined"!==typeof c.gridThickness||(this.gridThickness=0);this._position=d;this.lineCoordinates={x1:null,y1:null,x2:null,y2:null,width:null};this.labelAngle=(this.labelAngle%360+360)%360;90<this.labelAngle&&270>this.labelAngle?this.labelAngle-=180:270<=this.labelAngle&&360>=this.labelAngle&&
(this.labelAngle-=360);if(this.options.stripLines&&0<this.options.stripLines.length)for(this.stripLines=[],c=0;c<this.options.stripLines.length;c++)this.stripLines.push(new na(this.chart,this.options.stripLines[c],a.theme,++this.chart._eventManager.lastObjectId,this));this._titleTextBlock=null;this.hasOptionChanged("viewportMinimum")&&null===this.viewportMinimum&&(this.options.viewportMinimum=void 0,this.sessionVariables.viewportMinimum=null);this.hasOptionChanged("viewportMinimum")||isNaN(this.sessionVariables.newViewportMinimum)||
null===this.sessionVariables.newViewportMinimum?this.sessionVariables.newViewportMinimum=null:this.viewportMinimum=this.sessionVariables.newViewportMinimum;this.hasOptionChanged("viewportMaximum")&&null===this.viewportMaximum&&(this.options.viewportMaximum=void 0,this.sessionVariables.viewportMaximum=null);this.hasOptionChanged("viewportMaximum")||isNaN(this.sessionVariables.newViewportMaximum)||null===this.sessionVariables.newViewportMaximum?this.sessionVariables.newViewportMaximum=null:this.viewportMaximum=
this.sessionVariables.newViewportMaximum;null!==this.minimum&&null!==this.viewportMinimum&&(this.viewportMinimum=Math.max(this.viewportMinimum,this.minimum));null!==this.maximum&&null!==this.viewportMaximum&&(this.viewportMaximum=Math.min(this.viewportMaximum,this.maximum));this.trackChanges("viewportMinimum");this.trackChanges("viewportMaximum")}function na(a,c,b,d,f){na.base.constructor.call(this,"StripLine",c,b,f);this.id=d;this.chart=a;this.ctx=this.chart.ctx;this.label=this.label;this.axis=f;
this.optionsName="stripLines";this.isOptionsInArray=!0;this._thicknessType="pixel";null!==this.startValue&&null!==this.endValue&&(this.value=f.logarithmic?Math.sqrt((this.startValue.getTime?this.startValue.getTime():this.startValue)*(this.endValue.getTime?this.endValue.getTime():this.endValue)):((this.startValue.getTime?this.startValue.getTime():this.startValue)+(this.endValue.getTime?this.endValue.getTime():this.endValue))/2,this.thickness=f.logarithmic?Math.log(this.endValue/this.startValue)/Math.log(f.logarithmBase):
Math.max(this.endValue-this.startValue),this._thicknessType="value")}function T(a,c){T.base.constructor.call(this,"ToolTip",c,a.theme,a);this.chart=a;this.canvas=a.canvas;this.ctx=this.chart.ctx;this.currentDataPointIndex=this.currentSeriesIndex=-1;this._timerId=0;this._prevY=this._prevX=NaN;this.optionsName="toolTip";this._initialize()}function la(a){this.chart=a;this.lastObjectId=0;this.objectMap=[];this.rectangularRegionEventSubscriptions=[];this.previousDataPointEventObject=null;this.ghostCanvas=
ga(this.chart.width,this.chart.height);this.ghostCtx=this.ghostCanvas.getContext("2d");this.mouseoveredObjectMaps=[]}function oa(a){var c;a&&pa[a]&&(c=pa[a]);oa.base.constructor.call(this,"CultureInfo",c)}function Ca(a){this.chart=a;this.ctx=this.chart.plotArea.ctx;this.animations=[];this.animationRequestId=null}var I={},u=!!document.createElement("canvas").getContext,ca={Chart:{width:500,height:400,zoomEnabled:!1,zoomType:"x",backgroundColor:"white",theme:"theme1",animationEnabled:!1,animationDuration:1200,
dataPointWidth:null,dataPointMinWidth:null,dataPointMaxWidth:null,colorSet:"colorSet1",culture:"en",creditHref:"",creditText:"CanvasJS",interactivityEnabled:!0,exportEnabled:!1,exportFileName:"Chart",rangeChanging:null,rangeChanged:null,publicProperties:{title:"readWrite",subtitles:"readWrite",toolTip:"readWrite",legend:"readWrite",axisX:"readWrite",axisY:"readWrite",data:"readWrite",options:"readWrite",bounds:"readOnly",container:"readOnly"}},Title:{padding:0,text:null,verticalAlign:"top",horizontalAlign:"center",
fontSize:20,fontFamily:"Calibri",fontWeight:"normal",fontColor:"black",fontStyle:"normal",borderThickness:0,borderColor:"black",cornerRadius:0,backgroundColor:null,margin:5,wrap:!0,maxWidth:null,dockInsidePlotArea:!1,publicProperties:{options:"readWrite",bounds:"readOnly",chart:"readOnly"}},Subtitle:{padding:0,text:null,verticalAlign:"top",horizontalAlign:"center",fontSize:14,fontFamily:"Calibri",fontWeight:"normal",fontColor:"black",fontStyle:"normal",borderThickness:0,borderColor:"black",cornerRadius:0,
backgroundColor:null,margin:2,wrap:!0,maxWidth:null,dockInsidePlotArea:!1,publicProperties:{options:"readWrite",bounds:"readOnly",chart:"readOnly"}},Legend:{name:null,verticalAlign:"center",horizontalAlign:"right",fontSize:14,fontFamily:"calibri",fontWeight:"normal",fontColor:"black",fontStyle:"normal",cursor:null,itemmouseover:null,itemmouseout:null,itemmousemove:null,itemclick:null,dockInsidePlotArea:!1,reversed:!1,maxWidth:null,maxHeight:null,markerMargin:null,itemMaxWidth:null,itemWidth:null,
itemWrap:!0,itemTextFormatter:null,publicProperties:{options:"readWrite",bounds:"readOnly",chart:"readOnly"}},ToolTip:{enabled:!0,shared:!1,animationEnabled:!0,content:null,contentFormatter:null,reversed:!1,backgroundColor:null,borderColor:null,borderThickness:2,cornerRadius:5,fontSize:14,fontColor:null,fontFamily:"Calibri, Arial, Georgia, serif;",fontWeight:"normal",fontStyle:"italic",publicProperties:{options:"readWrite",chart:"readOnly"}},Axis:{minimum:null,maximum:null,viewportMinimum:null,viewportMaximum:null,
interval:null,intervalType:null,reversed:!1,logarithmic:!1,logarithmBase:10,title:null,titleFontColor:"black",titleFontSize:20,titleFontFamily:"arial",titleFontWeight:"normal",titleFontStyle:"normal",titleWrap:!0,titleMaxWidth:null,labelAngle:0,labelBackgroundColor:"transparent",labelFontFamily:"arial",labelFontColor:"black",labelFontSize:12,labelFontWeight:"normal",labelFontStyle:"normal",labelAutoFit:!0,labelWrap:!0,labelMaxWidth:null,labelFormatter:null,prefix:"",suffix:"",includeZero:!0,tickLength:5,
tickColor:"black",tickThickness:1,lineColor:"black",lineThickness:1,lineDashType:"solid",gridColor:"A0A0A0",gridThickness:0,gridDashType:"solid",interlacedColor:null,valueFormatString:null,margin:2,stripLines:[],publicProperties:{options:"readWrite",bounds:"readOnly",chart:"readOnly"}},StripLine:{value:null,startValue:null,endValue:null,color:"orange",opacity:null,thickness:2,lineDashType:"solid",label:"",labelPlacement:"inside",labelAlign:"far",labelWrap:!0,labelMaxWidth:null,labelBackgroundColor:"transparent",
labelFontFamily:"arial",labelFontColor:"orange",labelFontSize:12,labelFontWeight:"normal",labelFontStyle:"normal",labelFormatter:null,showOnTop:!1,publicProperties:{options:"readWrite",axis:"readOnly",bounds:"readOnly",chart:"readOnly"}},DataSeries:{name:null,dataPoints:null,label:"",bevelEnabled:!1,highlightEnabled:!0,cursor:null,indexLabel:"",indexLabelPlacement:"auto",indexLabelOrientation:"horizontal",indexLabelFontColor:"black",indexLabelFontSize:12,indexLabelFontStyle:"normal",indexLabelFontFamily:"Arial",
indexLabelFontWeight:"normal",indexLabelBackgroundColor:null,indexLabelLineColor:null,indexLabelLineThickness:1,indexLabelLineDashType:"solid",indexLabelMaxWidth:null,indexLabelWrap:!0,indexLabelFormatter:null,lineThickness:2,lineDashType:"solid",connectNullData:!1,nullDataLineDashType:"dash",color:null,lineColor:null,risingColor:"white",fillOpacity:null,startAngle:0,radius:null,innerRadius:null,type:"column",xValueType:"number",axisXType:"primary",axisYType:"primary",axisXIndex:0,axisYIndex:0,xValueFormatString:null,
yValueFormatString:null,zValueFormatString:null,percentFormatString:null,showInLegend:null,legendMarkerType:null,legendMarkerColor:null,legendText:null,legendMarkerBorderColor:null,legendMarkerBorderThickness:null,markerType:"circle",markerColor:null,markerSize:null,markerBorderColor:null,markerBorderThickness:null,mouseover:null,mouseout:null,mousemove:null,click:null,toolTipContent:null,visible:!0,publicProperties:{options:"readWrite",axisX:"readWrite",axisY:"readWrite",chart:"readOnly"}},TextBlock:{x:0,
y:0,width:null,height:null,maxWidth:null,maxHeight:null,padding:0,angle:0,text:"",horizontalAlign:"center",fontSize:12,fontFamily:"calibri",fontWeight:"normal",fontColor:"black",fontStyle:"normal",borderThickness:0,borderColor:"black",cornerRadius:0,backgroundColor:null,textBaseline:"top"},CultureInfo:{decimalSeparator:".",digitGroupSeparator:",",zoomText:"Zoom",panText:"Pan",resetText:"Reset",menuText:"More Options",saveJPGText:"Save as JPEG",savePNGText:"Save as PNG",printText:"Print",days:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
shortDays:"Sun Mon Tue Wed Thu Fri Sat".split(" "),months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")}},pa={en:{}},ha={colorSet1:"#369EAD #C24642 #7F6084 #86B402 #A2D1CF #C8B631 #6DBCEB #52514E #4F81BC #A064A1 #F79647".split(" "),colorSet2:"#4F81BC #C0504E #9BBB58 #23BFAA #8064A1 #4AACC5 #F79647 #33558B".split(" "),colorSet3:"#8CA1BC #36845C #017E82 #8CB9D0 #708C98 #94838D #F08891 #0366A7 #008276 #EE7757 #E5BA3A #F2990B #03557B #782970".split(" ")},
ia={theme1:{Chart:{colorSet:"colorSet1"},Title:{fontFamily:u?"Calibri, Optima, Candara, Verdana, Geneva, sans-serif":"calibri",fontSize:33,fontColor:"#3A3A3A",fontWeight:"bold",verticalAlign:"top",margin:5},Subtitle:{fontFamily:u?"Calibri, Optima, Candara, Verdana, Geneva, sans-serif":"calibri",fontSize:16,fontColor:"#3A3A3A",fontWeight:"bold",verticalAlign:"top",margin:5},Axis:{titleFontSize:26,titleFontColor:"#666666",titleFontFamily:u?"Calibri, Optima, Candara, Verdana, Geneva, sans-serif":"calibri",
labelFontFamily:u?"Calibri, Optima, Candara, Verdana, Geneva, sans-serif":"calibri",labelFontSize:18,labelFontColor:"grey",tickColor:"#BBBBBB",tickThickness:2,gridThickness:2,gridColor:"#BBBBBB",lineThickness:2,lineColor:"#BBBBBB"},Legend:{verticalAlign:"bottom",horizontalAlign:"center",fontFamily:u?"monospace, sans-serif,arial black":"calibri"},DataSeries:{indexLabelFontColor:"grey",indexLabelFontFamily:u?"Calibri, Optima, Candara, Verdana, Geneva, sans-serif":"calibri",indexLabelFontSize:18,indexLabelLineThickness:1}},
theme2:{Chart:{colorSet:"colorSet2"},Title:{fontFamily:"impact, charcoal, arial black, sans-serif",fontSize:32,fontColor:"#333333",verticalAlign:"top",margin:5},Subtitle:{fontFamily:"impact, charcoal, arial black, sans-serif",fontSize:14,fontColor:"#333333",verticalAlign:"top",margin:5},Axis:{titleFontSize:22,titleFontColor:"rgb(98,98,98)",titleFontFamily:u?"monospace, sans-serif,arial black":"arial",titleFontWeight:"bold",labelFontFamily:u?"monospace, Courier New, Courier":"arial",labelFontSize:16,
labelFontColor:"grey",labelFontWeight:"bold",tickColor:"grey",tickThickness:2,gridThickness:2,gridColor:"grey",lineColor:"grey",lineThickness:0},Legend:{verticalAlign:"bottom",horizontalAlign:"center",fontFamily:u?"monospace, sans-serif,arial black":"arial"},DataSeries:{indexLabelFontColor:"grey",indexLabelFontFamily:u?"Courier New, Courier, monospace":"arial",indexLabelFontWeight:"bold",indexLabelFontSize:18,indexLabelLineThickness:1}},theme3:{Chart:{colorSet:"colorSet1"},Title:{fontFamily:u?"Candara, Optima, Trebuchet MS, Helvetica Neue, Helvetica, Trebuchet MS, serif":
"calibri",fontSize:32,fontColor:"#3A3A3A",fontWeight:"bold",verticalAlign:"top",margin:5},Subtitle:{fontFamily:u?"Candara, Optima, Trebuchet MS, Helvetica Neue, Helvetica, Trebuchet MS, serif":"calibri",fontSize:16,fontColor:"#3A3A3A",fontWeight:"bold",verticalAlign:"top",margin:5},Axis:{titleFontSize:22,titleFontColor:"rgb(98,98,98)",titleFontFamily:u?"Verdana, Geneva, Calibri, sans-serif":"calibri",labelFontFamily:u?"Calibri, Optima, Candara, Verdana, Geneva, sans-serif":"calibri",labelFontSize:18,
labelFontColor:"grey",tickColor:"grey",tickThickness:2,gridThickness:2,gridColor:"grey",lineThickness:2,lineColor:"grey"},Legend:{verticalAlign:"bottom",horizontalAlign:"center",fontFamily:u?"monospace, sans-serif,arial black":"calibri"},DataSeries:{bevelEnabled:!0,indexLabelFontColor:"grey",indexLabelFontFamily:u?"Candara, Optima, Calibri, Verdana, Geneva, sans-serif":"calibri",indexLabelFontSize:18,indexLabelLineColor:"lightgrey",indexLabelLineThickness:2}}},G={numberDuration:1,yearDuration:314496E5,
monthDuration:2592E6,weekDuration:6048E5,dayDuration:864E5,hourDuration:36E5,minuteDuration:6E4,secondDuration:1E3,millisecondDuration:1,dayOfWeekFromInt:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ")},Ja={},ba=null,Da=function(){var a=/D{1,4}|M{1,4}|Y{1,4}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|f{1,3}|t{1,2}|T{1,2}|K|z{1,3}|"[^"]*"|'[^']*'/g,c="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),b="Sun Mon Tue Wed Thu Fri Sat".split(" "),d="January February March April May June July August September October November December".split(" "),
f="Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),g=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,h=/[^-+\dA-Z]/g;return function(k,l,m){var p=m?m.days:c,n=m?m.months:d,e=m?m.shortDays:b,q=m?m.shortMonths:f;m="";var r=!1;k=k&&k.getTime?k:k?new Date(k):new Date;if(isNaN(k))throw SyntaxError("invalid date");"UTC:"===l.slice(0,4)&&(l=l.slice(4),r=!0);m=r?"getUTC":"get";var s=k[m+"Date"](),z=k[m+"Day"](),
v=k[m+"Month"](),t=k[m+"FullYear"](),w=k[m+"Hours"](),u=k[m+"Minutes"](),$=k[m+"Seconds"](),B=k[m+"Milliseconds"](),x=r?0:k.getTimezoneOffset();return m=l.replace(a,function(a){switch(a){case "D":return s;case "DD":return O(s,2);case "DDD":return e[z];case "DDDD":return p[z];case "M":return v+1;case "MM":return O(v+1,2);case "MMM":return q[v];case "MMMM":return n[v];case "Y":return parseInt(String(t).slice(-2));case "YY":return O(String(t).slice(-2),2);case "YYY":return O(String(t).slice(-3),3);case "YYYY":return O(t,
4);case "h":return w%12||12;case "hh":return O(w%12||12,2);case "H":return w;case "HH":return O(w,2);case "m":return u;case "mm":return O(u,2);case "s":return $;case "ss":return O($,2);case "f":return String(B).slice(0,1);case "ff":return O(String(B).slice(0,2),2);case "fff":return O(String(B).slice(0,3),3);case "t":return 12>w?"a":"p";case "tt":return 12>w?"am":"pm";case "T":return 12>w?"A":"P";case "TT":return 12>w?"AM":"PM";case "K":return r?"UTC":(String(k).match(g)||[""]).pop().replace(h,"");
case "z":return(0<x?"-":"+")+Math.floor(Math.abs(x)/60);case "zz":return(0<x?"-":"+")+O(Math.floor(Math.abs(x)/60),2);case "zzz":return(0<x?"-":"+")+O(Math.floor(Math.abs(x)/60),2)+O(Math.abs(x)%60,2);default:return a.slice(1,a.length-1)}})}}(),da=function(a,c,b){if(null===a)return"";a=Number(a);var d=0>a?!0:!1;d&&(a*=-1);var f=b?b.decimalSeparator:".",g=b?b.digitGroupSeparator:",",h="";c=String(c);var h=1,k=b="",l=-1,m=[],p=[],n=0,e=0,q=0,r=!1,s=0,k=c.match(/"[^"]*"|'[^']*'|[eE][+-]*[0]+|[,]+[.]|\u2030|./g);
c=null;for(var z=0;k&&z<k.length;z++)if(c=k[z],"."===c&&0>l)l=z;else{if("%"===c)h*=100;else if("\u2030"===c){h*=1E3;continue}else if(","===c[0]&&"."===c[c.length-1]){h/=Math.pow(1E3,c.length-1);l=z+c.length-1;continue}else"E"!==c[0]&&"e"!==c[0]||"0"!==c[c.length-1]||(r=!0);0>l?(m.push(c),"#"===c||"0"===c?n++:","===c&&q++):(p.push(c),"#"!==c&&"0"!==c||e++)}r&&(c=Math.floor(a),s=(0===c?"":String(c)).length-n,h/=Math.pow(10,s));0>l&&(l=z);h=(a*h).toFixed(e);c=h.split(".");h=(c[0]+"").split("");a=(c[1]+
"").split("");h&&"0"===h[0]&&h.shift();for(z=r=k=e=l=0;0<m.length;)if(c=m.pop(),"#"===c||"0"===c)if(l++,l===n){var v=h,h=[];if("0"===c)for(c=n-e-(v?v.length:0);0<c;)v.unshift("0"),c--;for(;0<v.length;)b=v.pop()+b,z++,0===z%r&&(k===q&&0<v.length)&&(b=g+b);d&&(b="-"+b)}else 0<h.length?(b=h.pop()+b,e++,z++):"0"===c&&(b="0"+b,e++,z++),0===z%r&&(k===q&&0<h.length)&&(b=g+b);else"E"!==c[0]&&"e"!==c[0]||"0"!==c[c.length-1]||!/[eE][+-]*[0]+/.test(c)?","===c?(k++,r=z,z=0,0<h.length&&(b=g+b)):b=1<c.length&&
('"'===c[0]&&'"'===c[c.length-1]||"'"===c[0]&&"'"===c[c.length-1])?c.slice(1,c.length-1)+b:c+b:(c=0>s?c.replace("+","").replace("-",""):c.replace("-",""),b+=c.replace(/[0]+/,function(a){return O(s,a.length)}));d="";for(g=!1;0<p.length;)c=p.shift(),"#"===c||"0"===c?0<a.length&&0!==Number(a.join(""))?(d+=a.shift(),g=!0):"0"===c&&(d+="0",g=!0):1<c.length&&('"'===c[0]&&'"'===c[c.length-1]||"'"===c[0]&&"'"===c[c.length-1])?d+=c.slice(1,c.length-1):"E"!==c[0]&&"e"!==c[0]||"0"!==c[c.length-1]||!/[eE][+-]*[0]+/.test(c)?
d+=c:(c=0>s?c.replace("+","").replace("-",""):c.replace("-",""),d+=c.replace(/[0]+/,function(a){return O(s,a.length)}));return b+((g?f:"")+d)},xa=function(a){var c=0,b=0;a=a||window.event;a.offsetX||0===a.offsetX?(c=a.offsetX,b=a.offsetY):a.layerX||0==a.layerX?(c=a.layerX,b=a.layerY):(c=a.pageX-a.target.offsetLeft,b=a.pageY-a.target.offsetTop);return{x:c,y:b}},La=!0,za=window.devicePixelRatio||1,sa=1,P=La?za/sa:1,Ma=window&&window.location&&window.location.href&&window.location.href.indexOf&&-1!==
window.location.href.indexOf("canvasjs.com"),Ta={reset:{image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAcCAYAAAAAwr0iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAKRSURBVEiJrdY/iF1FFMfxzwnZrGISUSR/JLGIhoh/QiRNBLWxMLIWEkwbgiAoFgoW2mhlY6dgpY2IlRBRxBSKhSAKIklWJRYuMZKAhiyopAiaTY7FvRtmZ+/ed9/zHRjezLw5v/O9d86cuZGZpmURAfdn5o9DfdZNLXpjz+LziPgyIl6MiG0jPTJzZBuyDrP4BVm0P/AKbljTb4ToY/gGewYA7KyCl+1b3DUYANvwbiHw0gCAGRzBOzjTAXEOu0cC4Ch+r5x/HrpdrcZmvIDFSucMtnYCYC++6HmNDw8FKDT34ETrf639/azOr5vwRk/g5fbeuABtgC04XWk9VQLciMP4EH/3AFzErRNC7MXlQmsesSoHsGPE23hmEoBW+61K66HMXFmIMvN8myilXS36R01ub+KfYvw43ZXwYDX+AHP4BAci4pFJomfmr/ihmNofESsBImJGk7mlncrM45n5JPbhz0kAWpsv+juxaX21YIPmVJS2uNzJMS6ZNexC0d+I7fUWXLFyz2kSZlpWPvASlmqAf/FXNXf3FAF2F/1LuFifAlionB6dRuSI2IwHi6lzmXmp6xR8XY0fiIh7psAwh+3FuDkRHQVjl+a8lkXjo0kLUKH7XaV5oO86PmZ1FTzyP4K/XGl9v/zwfbW7BriiuETGCP5ch9bc9f97HF/vcFzCa5gdEPgWq+t/4v0V63oE1uF4h0DiFJ7HnSWMppDdh1dxtsPvJ2wcBNAKbsJXa0Ck5opdaBPsRNu/usba09i1KsaAVzmLt3sghrRjuK1Tf4xkegInxwy8gKf7dKMVH2QRsV5zXR/Cftyu+aKaKbbkQrsdH+PTzLzcqzkOQAVzM+7FHdiqqe2/YT4zF/t8S/sPmawyvC974vcAAAAASUVORK5CYII="},
pan:{image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAJVSURBVFiFvZe7a1RBGMV/x2hWI4JpfKCIiSBKOoOCkID/wP4BFqIIFkE02ChIiC8QDKlSiI3YqRBsBVGwUNAUdiIEUgjiAzQIIsuKJsfizsXr5t7d+8jmwLDfzHz3nLOzc7+ZxTZlGyDgZiWOCuJ9wH2gCUyuqQFgF/AGcKJNrYkBYBj40CIet+muGQi/96kM4WS7C/Tm5VUg7whJg8BkEGkCR4BDYfodsADUgP6wErO5iCtswsuJb32hdbXy8qzL5TIdmzJinHdZoZIBZcSFkGlAKs1Z3YCketZcBtouuaQNkrblMiBpBrhme7mAgU4wMCvpcFsDkq4C54DFVRTH9h+i6vlE0r5UA5ImgCuh28jB28iIs7BIVCOeStoZD64P4uPAjUTygKSx2FsK2TIwkugfk9Qkfd/E+yMWHQCeSRqx/R3gOp3LazfaS2C4B5gHDgD7U9x3E3uAH7KNpC3AHHAwTL4FHgM9GQ8vAaPA0dB/Abxqk2/gBLA9MXba9r1k/d4LfA3JtwueBeM58ucS+edXnAW23wP10N3advEi9CXizTnyN4bPS7Zn4sH/dq3t18AY4e1YLYSy3g/csj2VnFshZPuOpOeSKHCodUINuGj7YetE6je1PV9QoNPJ9StNHKodx7nRbiWrGHBGXAi5DUiqtQwtpcWK0Jubt8CltA5MEV1IfwO7+VffPwGfia5m34CT4bXujIIX0Qna1/cGMNqV/wUJE2czxD8CQ4X5Sl7Jz7SILwCDpbjKPBRMHAd+EtX4HWV5Spdc2w8kDQGPbH8py/MXMygM69/FKz4AAAAASUVORK5CYII="},
zoom:{image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAMqSURBVFiFvdfbj91TFMDxz57U6GUEMS1aYzyMtCSSDhWjCZMInpAI3khE/QHtgzdRkXgSCS8SES9epKLi0oRKNETjRahREq2KS1stdRujtDPtbA97n5zdn9+5zJxTK9k5v3POXmt991p7r71+IcaoGwkhTOIebMRqzOBTvIG3Y4zTXRmqSoyx5cAKbMJOHMFJnMZ8/jyFaXyMR7G6nb1aH22cP4BvcBxziG3GKfyTIR9D6BYg1KUghPBCDveFlb/24Av8iuUYw41YVsz5G7uxKcZ4aMEpwGt5NY3V/YbHsQ6rcAHOw/kYxigewr5CZw4fYGxBKcCLOFEYehXrMdRhr5yLETxVScsOLOkKAPfn1TYMPIvLFrShUlS2FDZm8XRHACzFAWl3R2xbqPMCYhmeLCAOYEMngAczbcTvuHYxzguIy/FesR9e6gSwU/OoPYHBHgHgviIKX2Flq7k34KhmcVnbi/PC8JX4MgMcxb118wZwdz5aISscqx7VRcox7MrPQ7i+btIAJrAkf9+bI9EPmZY2IAxiTSuAldLq4Y9+AcSUh78KP0tbAcwU35cXMD1JCIFUoGiehlqAz6TNB1f1C0DK+0h+nsNPrQC2a4bqGmlD9kOGcWt+Po6pVgDvSxfJaSkFd4UQBvoAsBYbCoB3a2flM7slA0R8iyt6rAFDeDPbm8eOTpVwGD9qVq7nLbIaZnmksPU1JtsCZMXNmpdRxFasWITzh6Xj3LCzra1OxcD2QjHiGVzdpfORnMqZio2PcF23ABdJF1Np4BPptlyPi6WzPYBzpJZtHe7A6xW9cnyP8TqA//SEIYRL8Bxul7rihvwgtVn78WcGGZXa9HGd5TDujDHuOePXNiHdKjWgZX/YbsxLx/ktqbjVzTlcjUSnvI5JrdlUVp6WesZZ6R1hRrpq9+EVTGS9jTjYAuKIouGpbcurEkIYxC051KNSamazsc+xK8b4S0VnEi/j0hqTP+M27O258egQwZuzs7pI7Mf4WQXIEDc5s9sux+5+1Py2EmP8UOq6GvWhIScxfdYjUERiAt9Jd84J6a16zf8JEKT3yCm8g1UxRv8CC4pyRhzR1uUAAAAASUVORK5CYII="},
menu:{image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAgCAYAAAAbifjMAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDcvMTUvMTTPsvU0AAAAP0lEQVRIie2SMQoAIBDDUvH/X667g8sJJ9KOhYYOkW0qGaU1MPdC0vGSbV19EACo3YMPAFH5BUBUjsqfAPpVXtNgGDfxEDCtAAAAAElFTkSuQmCC"}};(function(){I.fSDec=function(a){for(var c="",b=0;b<a.length;b++)c+=String.fromCharCode(a[b]);return c};I.str={tv:[84,114,105,97,108,32,86,101,114,115,105,
111,110],fntStr:[112,120,32,67,97,108,105,98,114,105,44,32,76,117,99,105,100,97,32,71,114,97,110,100,101,44,32,76,117,99,105,100,97,32,83,97,110,115,32,85,110,105,99,111,100,101,44,32,65,114,105,97,108,44,32,115,97,110,115,45,115,101,114,105,102],tBl:[116,101,120,116,66,97,115,101,108,105,110,101],fnt:[102,111,110,116],fSy:[102,105,108,108,83,116,121,108,101],fTx:[102,105,108,108,84,101,120,116],gr:[103,114,101,121],ct:[99,116,120],tp:[116,111,112]};delete ca[I.fSDec([67,104,97,114,116])][I.fSDec([99,
114,101,100,105,116,72,114,101,102])];I.pro={sCH:ca[I.fSDec([67,104,97,114,116])][I.fSDec([99,114,101,100,105,116,72,114,101,102])]};I.fAWm=function(a){if("undefined"===typeof I.pro.sCH&&!Ma){var c=a[I.fSDec(I.str.ct)];c[I.fSDec(I.str.tBl)]=I.fSDec(I.str.tp);c[I.fSDec(I.str.fnt)]=11+I.fSDec(I.str.fntStr);c[I.fSDec(I.str.fSy)]=I.fSDec(I.str.gr);c[I.fSDec(I.str.fTx)](I.fSDec(I.str.tv),2,a.height-11-2)}}})();K.prototype.setOptions=function(a,c){if(ca[this._defaultsKey]){var b=ca[this._defaultsKey],d;
for(d in b)"publicProperties"!==d&&b.hasOwnProperty(d)&&(this[d]=a&&d in a?a[d]:c&&d in c?c[d]:b[d])}};K.prototype.get=function(a){var c=ca[this._defaultsKey];if("options"===a)return this.options&&this.options._isPlaceholder?null:this.options;if(c.hasOwnProperty(a)||c.publicProperties&&c.publicProperties.hasOwnProperty(a))return this[a];window.console&&window.console.log('Property "'+a+"\" doesn't exist. Please check for typo.")};K.prototype.set=function(a,c,b){b="undefined"===typeof b?!0:b;var d=
ca[this._defaultsKey];if("options"===a)this.createUserOptions(c);else if(d.hasOwnProperty(a)||d.publicProperties&&d.publicProperties.hasOwnProperty(a)&&"readWrite"===d.publicProperties[a])this.options._isPlaceholder&&this.createUserOptions(),this.options[a]=c;else{window.console&&(d.publicProperties&&d.publicProperties.hasOwnProperty(a)&&"readOnly"===d.publicProperties[a]?window.console.log('Property "'+a+'" is read-only.'):window.console.log('Property "'+a+"\" doesn't exist. Please check for typo."));
return}b&&(chart=this.chart||this,chart.render())};K.prototype.addTo=function(a,c,b,d){d="undefined"===typeof d?!0:d;var f=ca[this._defaultsKey];f.hasOwnProperty(a)||f.publicProperties&&f.publicProperties.hasOwnProperty(a)&&"readWrite"===f.publicProperties[a]?(this.options._isPlaceholder&&this.createUserOptions(),"undefined"===typeof this.options[a]&&(this.options[a]=[]),a=this.options[a],b="undefined"===typeof b||null===b?a.length:b,a.splice(b,0,c),d&&(chart=this.chart||this,chart.render())):window.console&&
(f.publicProperties&&f.publicProperties.hasOwnProperty(a)&&"readOnly"===f.publicProperties[a]?window.console.log('Property "'+a+'" is read-only.'):window.console.log('Property "'+a+"\" doesn't exist. Please check for typo."))};K.prototype.createUserOptions=function(a){if("undefined"!==typeof a||this.options._isPlaceholder)if(this.parent.options._isPlaceholder&&this.parent.createUserOptions(),this.isOptionsInArray){this.parent.options[this.optionsName]||(this.parent.options[this.optionsName]=[]);var c=
this.parent.options[this.optionsName],b=c.length;this.options._isPlaceholder||(qa(c),b=c.indexOf(this.options));this.options="undefined"===typeof a?{}:a;c[b]=this.options}else this.options="undefined"===typeof a?{}:a,a=this.parent.options,this.optionsName?c=this.optionsName:(c=this._defaultsKey)&&0!==c.length?(b=c.charAt(0).toLowerCase(),1<c.length&&(b=b.concat(c.slice(1))),c=b):c=void 0,a[c]=this.options};K.prototype.remove=function(a){a="undefined"===typeof a?!0:a;if(this.isOptionsInArray){var c=
this.parent.options[this.optionsName];qa(c);var b=c.indexOf(this.options);0<=b&&c.splice(b,1)}else delete this.parent.options[this.optionsName];a&&(chart=this.chart||this,chart.render())};K.prototype.updateOption=function(a){var c=ca[this._defaultsKey],b=this.options.theme?this.options.theme:this.chart&&this.chart.options.theme?this.chart.options.theme:"theme1",d={},f=this[a];b&&(ia[b]&&ia[b][this._defaultsKey])&&(d=ia[b][this._defaultsKey]);a in c&&(f=a in this.options?this.options[a]:d&&a in d?
d[a]:c[a]);if(f===this[a])return!1;this[a]=f;return!0};K.prototype.trackChanges=function(a){if(!this.sessionVariables)throw"Session Variable Store not set";this.sessionVariables[a]=this.options[a]};K.prototype.isBeingTracked=function(a){this.options._oldOptions||(this.options._oldOptions={});return this.options._oldOptions[a]?!0:!1};K.prototype.hasOptionChanged=function(a){if(!this.sessionVariables)throw"Session Variable Store not set";return this.sessionVariables[a]!==this.options[a]};K.prototype.addEventListener=
function(a,c,b){a&&c&&(this._eventListeners[a]=this._eventListeners[a]||[],this._eventListeners[a].push({context:b||this,eventHandler:c}))};K.prototype.removeEventListener=function(a,c){if(a&&c&&this._eventListeners[a])for(var b=this._eventListeners[a],d=0;d<b.length;d++)if(b[d].eventHandler===c){b[d].splice(d,1);break}};K.prototype.removeAllEventListeners=function(){this._eventListeners=[]};K.prototype.dispatchEvent=function(a,c,b){if(a&&this._eventListeners[a]){c=c||{};for(var d=this._eventListeners[a],
f=0;f<d.length;f++)d[f].eventHandler.call(d[f].context,c)}"function"===typeof this[a]&&this[a].call(b||this.chart,c)};S(y,K);y.prototype._updateOptions=function(){var a=this;this.updateOption("width");this.updateOption("height");this.updateOption("dataPointWidth");this.updateOption("dataPointMinWidth");this.updateOption("dataPointMaxWidth");this.updateOption("interactivityEnabled");this.updateOption("theme");this.updateOption("colorSet")&&(this._selectedColorSet="undefined"!==typeof ha[this.colorSet]?
ha[this.colorSet]:ha.colorSet1);this.updateOption("backgroundColor");this.backgroundColor||(this.backgroundColor="rgba(0,0,0,0)");this.updateOption("culture");this._cultureInfo=new oa(this.options.culture);this.updateOption("animationEnabled");this.animationEnabled=this.animationEnabled&&u;this.updateOption("animationDuration");this.updateOption("rangeChanging");this.updateOption("rangeChanged");this.updateOption("exportEnabled");this.updateOption("exportFileName");this.updateOption("zoomType");this.options.zoomEnabled?
(this._zoomButton||(Z(this._zoomButton=document.createElement("button")),Y(this,this._zoomButton,"pan"),this._toolBar.appendChild(this._zoomButton),J(this._zoomButton,"click",function(){a.zoomEnabled?(a.zoomEnabled=!1,a.panEnabled=!0,Y(a,a._zoomButton,"zoom")):(a.zoomEnabled=!0,a.panEnabled=!1,Y(a,a._zoomButton,"pan"));a.render()})),this._resetButton||(Z(this._resetButton=document.createElement("button")),Y(this,this._resetButton,"reset"),this._toolBar.appendChild(this._resetButton),J(this._resetButton,
"click",function(){a.toolTip.hide();a.zoomEnabled||a.panEnabled?(a.zoomEnabled=!0,a.panEnabled=!1,Y(a,a._zoomButton,"pan"),a._defaultCursor="default",a.overlaidCanvas.style.cursor=a._defaultCursor):(a.zoomEnabled=!1,a.panEnabled=!1);if(a.sessionVariables.axisX)for(var b=0;b<a.sessionVariables.axisX.length;b++)a.sessionVariables.axisX[b].newViewportMinimum=null,a.sessionVariables.axisX[b].newViewportMaximum=null;if(a.sessionVariables.axisX2)for(b=0;b<a.sessionVariables.axisX2.length;b++)a.sessionVariables.axisX2[b].newViewportMinimum=
null,a.sessionVariables.axisX2[b].newViewportMaximum=null;if(a.sessionVariables.axisY)for(b=0;b<a.sessionVariables.axisY.length;b++)a.sessionVariables.axisY[b].newViewportMinimum=null,a.sessionVariables.axisY[b].newViewportMaximum=null;if(a.sessionVariables.axisY2)for(b=0;b<a.sessionVariables.axisY2.length;b++)a.sessionVariables.axisY2[b].newViewportMinimum=null,a.sessionVariables.axisY2[b].newViewportMaximum=null;a.resetOverlayedCanvas();Z(a._zoomButton,a._resetButton);a._dispatchRangeEvent("rangeChanging",
"reset");a.render();a._dispatchRangeEvent("rangeChanged","reset")}),this.overlaidCanvas.style.cursor=a._defaultCursor),this.zoomEnabled||this.panEnabled||(this._zoomButton?(a._zoomButton.getAttribute("state")===a._cultureInfo.zoomText?(this.panEnabled=!0,this.zoomEnabled=!1):(this.zoomEnabled=!0,this.panEnabled=!1),ta(a._zoomButton,a._resetButton)):(this.zoomEnabled=!0,this.panEnabled=!1))):this.panEnabled=this.zoomEnabled=!1;this._menuButton?this.exportEnabled?ta(this._menuButton):Z(this._menuButton):
this.exportEnabled&&u&&(this._menuButton=document.createElement("button"),Y(this,this._menuButton,"menu"),this._toolBar.appendChild(this._menuButton),J(this._menuButton,"click",function(){"none"!==a._dropdownMenu.style.display||a._dropDownCloseTime&&500>=(new Date).getTime()-a._dropDownCloseTime.getTime()||(a._dropdownMenu.style.display="block",a._menuButton.blur(),a._dropdownMenu.focus())},!0));if(!this._dropdownMenu&&this.exportEnabled&&u){this._dropdownMenu=document.createElement("div");this._dropdownMenu.setAttribute("tabindex",
-1);this._dropdownMenu.style.cssText="position: absolute; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; cursor: pointer;right: 1px;top: 25px;min-width: 120px;outline: 0;border: 1px solid silver;font-size: 14px;font-family: Calibri, Verdana, sans-serif;padding: 5px 0px 5px 0px;text-align: left;background-color: #fff;line-height: 20px;box-shadow: 2px 2px 10px #888888;";a._dropdownMenu.style.display="none";this._toolBar.appendChild(this._dropdownMenu);J(this._dropdownMenu,
"blur",function(){Z(a._dropdownMenu);a._dropDownCloseTime=new Date},!0);var c=document.createElement("div");c.style.cssText="padding: 2px 15px 2px 10px";c.innerHTML=this._cultureInfo.printText;this._dropdownMenu.appendChild(c);J(c,"mouseover",function(){this.style.backgroundColor="#EEEEEE"},!0);J(c,"mouseout",function(){this.style.backgroundColor="transparent"},!0);J(c,"click",function(){a.print();Z(a._dropdownMenu)},!0);c=document.createElement("div");c.style.cssText="padding: 2px 15px 2px 10px";
c.innerHTML=this._cultureInfo.saveJPGText;this._dropdownMenu.appendChild(c);J(c,"mouseover",function(){this.style.backgroundColor="#EEEEEE"},!0);J(c,"mouseout",function(){this.style.backgroundColor="transparent"},!0);J(c,"click",function(){Aa(a.canvas,"jpeg",a.exportFileName);Z(a._dropdownMenu)},!0);c=document.createElement("div");c.style.cssText="padding: 2px 15px 2px 10px";c.innerHTML=this._cultureInfo.savePNGText;this._dropdownMenu.appendChild(c);J(c,"mouseover",function(){this.style.backgroundColor=
"#EEEEEE"},!0);J(c,"mouseout",function(){this.style.backgroundColor="transparent"},!0);J(c,"click",function(){Aa(a.canvas,"png",a.exportFileName);Z(a._dropdownMenu)},!0)}"none"!==this._toolBar.style.display&&this._zoomButton&&(this.panEnabled?Y(a,a._zoomButton,"zoom"):Y(a,a._zoomButton,"pan"),a._resetButton.getAttribute("state")!==a._cultureInfo.resetText&&Y(a,a._resetButton,"reset"));this.options.toolTip&&this.toolTip.options!==this.options.toolTip&&(this.toolTip.options=this.options.toolTip);for(var b in this.toolTip.options)this.toolTip.options.hasOwnProperty(b)&&
this.toolTip.updateOption(b)};y.prototype._updateSize=function(){var a=0,c=0;this.options.width?a=this.width:this.width=a=0<this.container.clientWidth?this.container.clientWidth:this.width;this.options.height?c=this.height:this.height=c=0<this.container.clientHeight?this.container.clientHeight:this.height;return this.canvas.width!==a*P||this.canvas.height!==c*P?(ra(this.canvas,a,c),ra(this.overlaidCanvas,a,c),ra(this._eventManager.ghostCanvas,a,c),!0):!1};y.prototype._initialize=function(){this._animator?
this._animator.cancelAllAnimations():this._animator=new Ca(this);this.removeAllEventListeners();this.disableToolTip=!1;this._axes=[];this.pieDoughnutClickHandler=null;this.animationRequestId&&this.cancelRequestAnimFrame.call(window,this.animationRequestId);this._updateOptions();this.animatedRender=u&&this.animationEnabled&&0===this.renderCount;this._updateSize();this.clearCanvas();this.ctx.beginPath();this.axisX=[];this.axisX2=[];this.axisY=[];this.axisY2=[];this._indexLabels=[];this._dataInRenderedOrder=
[];this._events=[];this._eventManager&&this._eventManager.reset();this.plotInfo={axisPlacement:null,axisXValueType:null,plotTypes:[]};this.layoutManager=new ja(0,0,this.width,this.height,2);this.plotArea.layoutManager&&this.plotArea.layoutManager.reset();this.data=[];var a=0;if(this.options.data)for(var c=0;c<this.options.data.length;c++)if(a++,!this.options.data[c].type||0<=y._supportedChartTypes.indexOf(this.options.data[c].type)){var b=new aa(this,this.options.data[c],a-1,++this._eventManager.lastObjectId);
null===b.name&&(b.name="DataSeries "+a);null===b.color?1<this.options.data.length?(b._colorSet=[this._selectedColorSet[b.index%this._selectedColorSet.length]],b.color=this._selectedColorSet[b.index%this._selectedColorSet.length]):b._colorSet="line"===b.type||"stepLine"===b.type||"spline"===b.type||"area"===b.type||"stepArea"===b.type||"splineArea"===b.type||"stackedArea"===b.type||"stackedArea100"===b.type||"rangeArea"===b.type||"rangeSplineArea"===b.type||"candlestick"===b.type||"ohlc"===b.type?
[this._selectedColorSet[0]]:this._selectedColorSet:b._colorSet=[b.color];null===b.markerSize&&(("line"===b.type||"stepLine"===b.type||"spline"===b.type||0<=b.type.toLowerCase().indexOf("area"))&&b.dataPoints&&b.dataPoints.length<this.width/16||"scatter"===b.type)&&(b.markerSize=8);"bubble"!==b.type&&"scatter"!==b.type||!b.dataPoints||(b.dataPoints.some?b.dataPoints.some(function(a){return a.x})&&b.dataPoints.sort(Ha):b.dataPoints.sort(Ha));this.data.push(b);var d=b.axisPlacement,f;"normal"===d?"xySwapped"===
this.plotInfo.axisPlacement?f='You cannot combine "'+b.type+'" with bar chart':"none"===this.plotInfo.axisPlacement?f='You cannot combine "'+b.type+'" with pie chart':null===this.plotInfo.axisPlacement&&(this.plotInfo.axisPlacement="normal"):"xySwapped"===d?"normal"===this.plotInfo.axisPlacement?f='You cannot combine "'+b.type+'" with line, area, column or pie chart':"none"===this.plotInfo.axisPlacement?f='You cannot combine "'+b.type+'" with pie chart':null===this.plotInfo.axisPlacement&&(this.plotInfo.axisPlacement=
"xySwapped"):"none"==d&&("normal"===this.plotInfo.axisPlacement?f='You cannot combine "'+b.type+'" with line, area, column or bar chart':"xySwapped"===this.plotInfo.axisPlacement?f='You cannot combine "'+b.type+'" with bar chart':null===this.plotInfo.axisPlacement&&(this.plotInfo.axisPlacement="none"));if(f&&window.console){window.console.log(f);return}}I.fAWm&&I.fAWm(this);Sa(this);this._objectsInitialized=!0};y._supportedChartTypes=qa("line stepLine spline column area stepArea splineArea bar bubble scatter stackedColumn stackedColumn100 stackedBar stackedBar100 stackedArea stackedArea100 candlestick ohlc rangeColumn rangeBar rangeArea rangeSplineArea pie doughnut funnel".split(" "));
y.prototype.render=function(a){a&&(this.options=a);this._initialize();var c=[];for(a=0;a<this.data.length;a++)if("normal"===this.plotInfo.axisPlacement||"xySwapped"===this.plotInfo.axisPlacement){if(!this.data[a].axisYType||"primary"===this.data[a].axisYType)if(this.options.axisY&&0<this.options.axisY.length){if(!this.axisY.length)for(var b=0;b<this.options.axisY.length;b++)"normal"===this.plotInfo.axisPlacement?this._axes.push(this.axisY[b]=new A(this,this.options.axisY[b],"axisY","left",b)):"xySwapped"===
this.plotInfo.axisPlacement&&this._axes.push(this.axisY[b]=new A(this,this.options.axisY[b],"axisY","bottom",b));this.data[a].axisY=this.axisY[0<=this.data[a].axisYIndex&&this.data[a].axisYIndex<this.axisY.length?this.data[a].axisYIndex:0];this.axisY[0<=this.data[a].axisYIndex&&this.data[a].axisYIndex<this.axisY.length?this.data[a].axisYIndex:0].dataSeries.push(this.data[a])}else this.axisY.length||("normal"===this.plotInfo.axisPlacement?this._axes.push(this.axisY[0]=new A(this,this.options.axisY,
"axisY","left",0)):"xySwapped"===this.plotInfo.axisPlacement&&this._axes.push(this.axisY[0]=new A(this,this.options.axisY,"axisY","bottom",0))),this.data[a].axisY=this.axisY[0],this.axisY[0].dataSeries.push(this.data[a]);if("secondary"===this.data[a].axisYType)if(this.options.axisY2&&0<this.options.axisY2.length){if(!this.axisY2.length)for(b=0;b<this.options.axisY2.length;b++)"normal"===this.plotInfo.axisPlacement?this._axes.push(this.axisY2[b]=new A(this,this.options.axisY2[b],"axisY","right",b)):
"xySwapped"===this.plotInfo.axisPlacement&&this._axes.push(this.axisY2[b]=new A(this,this.options.axisY2[b],"axisY","top",b));this.data[a].axisY=this.axisY2[0<=this.data[a].axisYIndex&&this.data[a].axisYIndex<this.axisY2.length?this.data[a].axisYIndex:0];this.axisY2[0<=this.data[a].axisYIndex&&this.data[a].axisYIndex<this.axisY2.length?this.data[a].axisYIndex:0].dataSeries.push(this.data[a])}else this.axisY2.length||("normal"===this.plotInfo.axisPlacement?this._axes.push(this.axisY2[0]=new A(this,
this.options.axisY2,"axisY","right",0)):"xySwapped"===this.plotInfo.axisPlacement&&this._axes.push(this.axisY2[0]=new A(this,this.options.axisY2,"axisY","top",0))),this.data[a].axisY=this.axisY2[0],this.axisY2[0].dataSeries.push(this.data[a]);if(!this.data[a].axisXType||"primary"===this.data[a].axisXType)if(this.options.axisX&&0<this.options.axisX.length){if(!this.axisX.length)for(b=0;b<this.options.axisX.length;b++)"normal"===this.plotInfo.axisPlacement?this._axes.push(this.axisX[b]=new A(this,this.options.axisX[b],
"axisX","bottom",b)):"xySwapped"===this.plotInfo.axisPlacement&&this._axes.push(this.axisX[b]=new A(this,this.options.axisX[b],"axisX","left",b));this.data[a].axisX=this.axisX[0<=this.data[a].axisXIndex&&this.data[a].axisXIndex<this.axisX.length?this.data[a].axisXIndex:0];this.axisX[0<=this.data[a].axisXIndex&&this.data[a].axisXIndex<this.axisX.length?this.data[a].axisXIndex:0].dataSeries.push(this.data[a])}else this.axisX.length||("normal"===this.plotInfo.axisPlacement?this._axes.push(this.axisX[0]=
new A(this,this.options.axisX,"axisX","bottom",0)):"xySwapped"===this.plotInfo.axisPlacement&&this._axes.push(this.axisX[0]=new A(this,this.options.axisX,"axisX","left",0))),this.data[a].axisX=this.axisX[0],this.axisX[0].dataSeries.push(this.data[a]);if("secondary"===this.data[a].axisXType)if(this.options.axisX2&&0<this.options.axisX2.length){if(!this.axisX2.length)for(b=0;b<this.options.axisX2.length;b++)"normal"===this.plotInfo.axisPlacement?this._axes.push(this.axisX2[b]=new A(this,this.options.axisX2[b],
"axisX","top",b)):"xySwapped"===this.plotInfo.axisPlacement&&this._axes.push(this.axisX2[b]=new A(this,this.options.axisX2[b],"axisX","right",b));this.data[a].axisX=this.axisX2[0<=this.data[a].axisXIndex&&this.data[a].axisXIndex<this.axisX2.length?this.data[a].axisXIndex:0];this.axisX2[0<=this.data[a].axisXIndex&&this.data[a].axisXIndex<this.axisX2.length?this.data[a].axisXIndex:0].dataSeries.push(this.data[a])}else this.axisX2.length||("normal"===this.plotInfo.axisPlacement?this._axes.push(this.axisX2[0]=
new A(this,this.options.axisX2,"axisX","top",0)):"xySwapped"===this.plotInfo.axisPlacement&&this._axes.push(this.axisX2[0]=new A(this,this.options.axisX2,"axisX","right",0))),this.data[a].axisX=this.axisX2[0],this.axisX2[0].dataSeries.push(this.data[a])}if(this.axisY){for(b=1;b<this.axisY.length;b++)"undefined"===typeof this.axisY[b].options.gridThickness&&(this.axisY[b].gridThickness=0);for(b=0;b<this.axisY.length-1;b++)"undefined"===typeof this.axisY[b].options.margin&&(this.axisY[b].margin=10)}if(this.axisY2){for(b=
1;b<this.axisY2.length;b++)"undefined"===typeof this.axisY2[b].options.gridThickness&&(this.axisY2[b].gridThickness=0);for(b=0;b<this.axisY2.length-1;b++)"undefined"===typeof this.axisY2[b].options.margin&&(this.axisY2[b].margin=10)}this.axisY&&0<this.axisY.length&&(this.axisY2&&0<this.axisY2.length)&&(0<this.axisY[0].gridThickness&&"undefined"===typeof this.axisY2[0].options.gridThickness?this.axisY2[0].gridThickness=0:0<this.axisY2[0].gridThickness&&"undefined"===typeof this.axisY[0].options.gridThickness&&
(this.axisY[0].gridThickness=0));if(this.axisX)for(b=0;b<this.axisX.length;b++)"undefined"===typeof this.axisX[b].options.gridThickness&&(this.axisX[b].gridThickness=0);if(this.axisX2)for(b=0;b<this.axisX2.length;b++)"undefined"===typeof this.axisX2[b].options.gridThickness&&(this.axisX2[b].gridThickness=0);this.axisX&&0<this.axisX.length&&(this.axisX2&&0<this.axisX2.length)&&(0<this.axisX[0].gridThickness&&"undefined"===typeof this.axisX2[0].options.gridThickness?this.axisX2[0].gridThickness=0:0<
this.axisX2[0].gridThickness&&"undefined"===typeof this.axisX[0].options.gridThickness&&(this.axisX[0].gridThickness=0));b=!1;if(0<this._axes.length&&(this.zoomEnabled||this.panEnabled))for(a=0;a<this._axes.length;a++)if(null!==this._axes[a].viewportMinimum||null!==this._axes[a].viewportMaximum){b=!0;break}b?ta(this._zoomButton,this._resetButton):(Z(this._zoomButton,this._resetButton),this.options.zoomEnabled&&(this.zoomEnabled=!0,this.panEnabled=!1));this._processData();this.options.title&&(this.title=
new ma(this,this.options.title),this.title.dockInsidePlotArea?c.push(this.title):this.title.render());if(this.options.subtitles)for(this.subtitles=[],a=0;a<this.options.subtitles.length;a++)b=new va(this,this.options.subtitles[a]),this.subtitles.push(b),b.dockInsidePlotArea?c.push(b):b.render();this.legend=new wa(this,this.options.legend);for(a=0;a<this.data.length;a++)(this.data[a].showInLegend||"pie"===this.data[a].type||"doughnut"===this.data[a].type)&&this.legend.dataSeries.push(this.data[a]);
this.legend.dockInsidePlotArea?c.push(this.legend):this.legend.render();if("normal"===this.plotInfo.axisPlacement||"xySwapped"===this.plotInfo.axisPlacement)A.setLayoutAndRender(this.axisX,this.axisX2,this.axisY,this.axisY2,this.plotInfo.axisPlacement,this.layoutManager.getFreeSpace());else if("none"===this.plotInfo.axisPlacement)this.preparePlotArea();else return;for(a=0;a<c.length;a++)c[a].render();var d=[];if(this.animatedRender){var f=ga(this.width,this.height);f.getContext("2d").drawImage(this.canvas,
0,0,this.width,this.height)}for(a=0;a<this.plotInfo.plotTypes.length;a++)for(var c=this.plotInfo.plotTypes[a],g=0;g<c.plotUnits.length;g++){var h=c.plotUnits[g],k=null;h.targetCanvas=null;this.animatedRender&&(h.targetCanvas=ga(this.width,this.height),h.targetCanvasCtx=h.targetCanvas.getContext("2d"));"line"===h.type?k=this.renderLine(h):"stepLine"===h.type?k=this.renderStepLine(h):"spline"===h.type?k=this.renderSpline(h):"column"===h.type?k=this.renderColumn(h):"bar"===h.type?k=this.renderBar(h):
"area"===h.type?k=this.renderArea(h):"stepArea"===h.type?k=this.renderStepArea(h):"splineArea"===h.type?k=this.renderSplineArea(h):"stackedColumn"===h.type?k=this.renderStackedColumn(h):"stackedColumn100"===h.type?k=this.renderStackedColumn100(h):"stackedBar"===h.type?k=this.renderStackedBar(h):"stackedBar100"===h.type?k=this.renderStackedBar100(h):"stackedArea"===h.type?k=this.renderStackedArea(h):"stackedArea100"===h.type?k=this.renderStackedArea100(h):"bubble"===h.type?k=k=this.renderBubble(h):
"scatter"===h.type?k=this.renderScatter(h):"pie"===h.type?this.renderPie(h):"doughnut"===h.type?this.renderPie(h):"candlestick"===h.type?k=this.renderCandlestick(h):"ohlc"===h.type?k=this.renderCandlestick(h):"rangeColumn"===h.type?k=this.renderRangeColumn(h):"rangeBar"===h.type?k=this.renderRangeBar(h):"rangeArea"===h.type?k=this.renderRangeArea(h):"rangeSplineArea"===h.type&&(k=this.renderRangeSplineArea(h));for(b=0;b<h.dataSeriesIndexes.length;b++)this._dataInRenderedOrder.push(this.data[h.dataSeriesIndexes[b]]);
this.animatedRender&&k&&d.push(k)}this.animatedRender&&0<this._indexLabels.length&&(a=ga(this.width,this.height).getContext("2d"),d.push(this.renderIndexLabels(a)));var l=this;0<d.length?(l.disableToolTip=!0,l._animator.animate(200,l.animationDuration,function(a){l.ctx.clearRect(0,0,l.width,l.height);l.ctx.drawImage(f,0,0,Math.floor(l.width*P),Math.floor(l.height*P),0,0,l.width,l.height);for(var b=0;b<d.length;b++)k=d[b],1>a&&"undefined"!==typeof k.startTimePercent?a>=k.startTimePercent&&k.animationCallback(k.easingFunction(a-
k.startTimePercent,0,1,1-k.startTimePercent),k):k.animationCallback(k.easingFunction(a,0,1,1),k);l.dispatchEvent("dataAnimationIterationEnd",{chart:l})},function(){d=[];for(var a=0;a<l.plotInfo.plotTypes.length;a++)for(var b=l.plotInfo.plotTypes[a],c=0;c<b.plotUnits.length;c++)b.plotUnits[c].targetCanvas=null;f=null;l.disableToolTip=!1})):(0<l._indexLabels.length&&l.renderIndexLabels(),l.dispatchEvent("dataAnimationIterationEnd",{chart:l}));this.attachPlotAreaEventHandlers();this.zoomEnabled||(this.panEnabled||
!this._zoomButton||"none"===this._zoomButton.style.display)||Z(this._zoomButton,this._resetButton);this.toolTip._updateToolTip();this.renderCount++};y.prototype.attachPlotAreaEventHandlers=function(){this.attachEvent({context:this,chart:this,mousedown:this._plotAreaMouseDown,mouseup:this._plotAreaMouseUp,mousemove:this._plotAreaMouseMove,cursor:this.zoomEnabled?"col-resize":"move",cursor:this.panEnabled?"move":"default",capture:!0,bounds:this.plotArea})};y.prototype.categoriseDataSeries=function(){for(var a=
"",c=0;c<this.data.length;c++)if(a=this.data[c],a.dataPoints&&(0!==a.dataPoints.length&&a.visible)&&0<=y._supportedChartTypes.indexOf(a.type)){for(var b=null,d=!1,f=null,g=!1,h=0;h<this.plotInfo.plotTypes.length;h++)if(this.plotInfo.plotTypes[h].type===a.type){d=!0;b=this.plotInfo.plotTypes[h];break}d||(b={type:a.type,totalDataSeries:0,plotUnits:[]},this.plotInfo.plotTypes.push(b));for(h=0;h<b.plotUnits.length;h++)if(b.plotUnits[h].axisYType===a.axisYType&&b.plotUnits[h].axisXType===a.axisXType&&
b.plotUnits[h].axisYIndex===a.axisYIndex&&b.plotUnits[h].axisXIndex===a.axisXIndex){g=!0;f=b.plotUnits[h];break}g||(f={type:a.type,previousDataSeriesCount:0,index:b.plotUnits.length,plotType:b,axisXType:a.axisXType,axisYType:a.axisYType,axisYIndex:a.axisYIndex,axisXIndex:a.axisXIndex,axisY:"primary"===a.axisYType?this.axisY[0<=a.axisYIndex&&a.axisYIndex<this.axisY.length?a.axisYIndex:0]:this.axisY2[0<=a.axisYIndex&&a.axisYIndex<this.axisY2.length?a.axisYIndex:0],axisX:"primary"===a.axisXType?this.axisX[0<=
a.axisXIndex&&a.axisXIndex<this.axisX.length?a.axisXIndex:0]:this.axisX2[0<=a.axisXIndex&&a.axisXIndex<this.axisX2.length?a.axisXIndex:0],dataSeriesIndexes:[],yTotals:[]},b.plotUnits.push(f));b.totalDataSeries++;f.dataSeriesIndexes.push(c);a.plotUnit=f}for(c=0;c<this.plotInfo.plotTypes.length;c++)for(b=this.plotInfo.plotTypes[c],h=a=0;h<b.plotUnits.length;h++)b.plotUnits[h].previousDataSeriesCount=a,a+=b.plotUnits[h].dataSeriesIndexes.length};y.prototype.assignIdToDataPoints=function(){for(var a=
0;a<this.data.length;a++){var c=this.data[a];if(c.dataPoints)for(var b=c.dataPoints.length,d=0;d<b;d++)c.dataPointIds[d]=++this._eventManager.lastObjectId}};y.prototype._processData=function(){this.assignIdToDataPoints();this.categoriseDataSeries();for(var a=0;a<this.plotInfo.plotTypes.length;a++)for(var c=this.plotInfo.plotTypes[a],b=0;b<c.plotUnits.length;b++){var d=c.plotUnits[b];"line"===d.type||"stepLine"===d.type||"spline"===d.type||"column"===d.type||"area"===d.type||"stepArea"===d.type||"splineArea"===
d.type||"bar"===d.type||"bubble"===d.type||"scatter"===d.type?this._processMultiseriesPlotUnit(d):"stackedColumn"===d.type||"stackedBar"===d.type||"stackedArea"===d.type?this._processStackedPlotUnit(d):"stackedColumn100"===d.type||"stackedBar100"===d.type||"stackedArea100"===d.type?this._processStacked100PlotUnit(d):"candlestick"!==d.type&&"ohlc"!==d.type&&"rangeColumn"!==d.type&&"rangeBar"!==d.type&&"rangeArea"!==d.type&&"rangeSplineArea"!==d.type||this._processMultiYPlotUnit(d)}};y.prototype._processMultiseriesPlotUnit=
function(a){if(a.dataSeriesIndexes&&!(1>a.dataSeriesIndexes.length))for(var c=a.axisY.dataInfo,b=a.axisX.dataInfo,d,f,g=!1,h=0;h<a.dataSeriesIndexes.length;h++){var k=this.data[a.dataSeriesIndexes[h]],l=0,m=!1,p=!1,n;if("normal"===k.axisPlacement||"xySwapped"===k.axisPlacement)var e=this.sessionVariables.axisX.newViewportMinimum?this.sessionVariables.axisX.newViewportMinimum:this.options.axisX&&this.options.axisX.viewportMinimum?this.options.axisX.viewportMinimum:this.options.axisX&&this.options.axisX.minimum?
this.options.axisX.minimum:a.axisX.logarithmic?0:-Infinity,q=this.sessionVariables.axisX.newViewportMaximum?this.sessionVariables.axisX.newViewportMaximum:this.options.axisX&&this.options.axisX.viewportMaximum?this.options.axisX.viewportMaximum:this.options.axisX&&this.options.axisX.maximum?this.options.axisX.maximum:Infinity;if(k.dataPoints[l].x&&k.dataPoints[l].x.getTime||"dateTime"===k.xValueType)g=!0;for(l=0;l<k.dataPoints.length;l++){"undefined"===typeof k.dataPoints[l].x&&(k.dataPoints[l].x=
l+(a.axisX.logarithmic?1:0));k.dataPoints[l].x.getTime?(g=!0,d=k.dataPoints[l].x.getTime()):d=k.dataPoints[l].x;f=k.dataPoints[l].y;d<b.min&&(b.min=d);d>b.max&&(b.max=d);f<c.min&&(c.min=f);f>c.max&&(c.max=f);if(0<l){if(a.axisX.logarithmic){var r=d/k.dataPoints[l-1].x;1>r&&(r=1/r);b.minDiff>r&&1!==r&&(b.minDiff=r)}else r=d-k.dataPoints[l-1].x,0>r&&(r*=-1),b.minDiff>r&&0!==r&&(b.minDiff=r);null!==f&&null!==k.dataPoints[l-1].y&&(a.axisY.logarithmic?(r=f/k.dataPoints[l-1].y,1>r&&(r=1/r),c.minDiff>r&&
1!==r&&(c.minDiff=r)):(r=f-k.dataPoints[l-1].y,0>r&&(r*=-1),c.minDiff>r&&0!==r&&(c.minDiff=r)))}if(d<e&&!m)null!==f&&(n=d);else{if(!m&&(m=!0,0<l)){l-=2;continue}if(d>q&&!p)p=!0;else if(d>q&&p)continue;k.dataPoints[l].label&&(a.axisX.labels[d]=k.dataPoints[l].label);d<b.viewPortMin&&(b.viewPortMin=d);d>b.viewPortMax&&(b.viewPortMax=d);null===f?b.viewPortMin===d&&n<d&&(b.viewPortMin=n):(f<c.viewPortMin&&(c.viewPortMin=f),f>c.viewPortMax&&(c.viewPortMax=f))}}this.plotInfo.axisXValueType=k.xValueType=
g?"dateTime":"number"}};y.prototype._processStackedPlotUnit=function(a){if(a.dataSeriesIndexes&&!(1>a.dataSeriesIndexes.length)){for(var c=a.axisY.dataInfo,b=a.axisX.dataInfo,d,f,g=!1,h=[],k=[],l=Infinity,m=0;m<a.dataSeriesIndexes.length;m++){var p=this.data[a.dataSeriesIndexes[m]],n=0,e=!1,q=!1,r;if("normal"===p.axisPlacement||"xySwapped"===p.axisPlacement)var s=this.sessionVariables.axisX.newViewportMinimum?this.sessionVariables.axisX.newViewportMinimum:this.options.axisX&&this.options.axisX.viewportMinimum?
this.options.axisX.viewportMinimum:this.options.axisX&&this.options.axisX.minimum?this.options.axisX.minimum:-Infinity,z=this.sessionVariables.axisX.newViewportMaximum?this.sessionVariables.axisX.newViewportMaximum:this.options.axisX&&this.options.axisX.viewportMaximum?this.options.axisX.viewportMaximum:this.options.axisX&&this.options.axisX.maximum?this.options.axisX.maximum:Infinity;if(p.dataPoints[n].x&&p.dataPoints[n].x.getTime||"dateTime"===p.xValueType)g=!0;for(n=0;n<p.dataPoints.length;n++){"undefined"===
typeof p.dataPoints[n].x&&(p.dataPoints[n].x=n+(a.axisX.logarithmic?1:0));p.dataPoints[n].x.getTime?(g=!0,d=p.dataPoints[n].x.getTime()):d=p.dataPoints[n].x;x(p.dataPoints[n].y)?f=0:(f=p.dataPoints[n].y,0===m&&(l=Math.min(f,l)));d<b.min&&(b.min=d);d>b.max&&(b.max=d);if(0<n){if(a.axisX.logarithmic){var v=d/p.dataPoints[n-1].x;1>v&&(v=1/v);b.minDiff>v&&1!==v&&(b.minDiff=v)}else v=d-p.dataPoints[n-1].x,0>v&&(v*=-1),b.minDiff>v&&0!==v&&(b.minDiff=v);null!==f&&null!==p.dataPoints[n-1].y&&(a.axisY.logarithmic?
0<f&&(v=f/p.dataPoints[n-1].y,1>v&&(v=1/v),c.minDiff>v&&1!==v&&(c.minDiff=v)):(v=f-p.dataPoints[n-1].y,0>v&&(v*=-1),c.minDiff>v&&0!==v&&(c.minDiff=v)))}if(d<s&&!e)null!==p.dataPoints[n].y&&(r=d);else{if(!e&&(e=!0,0<n)){n-=2;continue}if(d>z&&!q)q=!0;else if(d>z&&q)continue;p.dataPoints[n].label&&(a.axisX.labels[d]=p.dataPoints[n].label);d<b.viewPortMin&&(b.viewPortMin=d);d>b.viewPortMax&&(b.viewPortMax=d);null===p.dataPoints[n].y?b.viewPortMin===d&&r<d&&(b.viewPortMin=r):(a.yTotals[d]=(a.yTotals[d]?
a.yTotals[d]:0)+Math.abs(f),0<=f?h[d]=h[d]?h[d]+f:f:k[d]=k[d]?k[d]+f:f)}}this.plotInfo.axisXValueType=p.xValueType=g?"dateTime":"number"}for(n in h)h.hasOwnProperty(n)&&!isNaN(n)&&(a=h[n],a<c.min&&(c.min=Math.min(a,l)),a>c.max&&(c.max=a),n<b.viewPortMin||n>b.viewPortMax||(a<c.viewPortMin&&(c.viewPortMin=Math.min(a,l)),a>c.viewPortMax&&(c.viewPortMax=a)));for(n in k)k.hasOwnProperty(n)&&!isNaN(n)&&(a=k[n],a<c.min&&(c.min=Math.min(a,l)),a>c.max&&(c.max=a),n<b.viewPortMin||n>b.viewPortMax||(a<c.viewPortMin&&
(c.viewPortMin=Math.min(a,l)),a>c.viewPortMax&&(c.viewPortMax=a)))}};y.prototype._processStacked100PlotUnit=function(a){if(a.dataSeriesIndexes&&!(1>a.dataSeriesIndexes.length)){for(var c=a.axisY.dataInfo,b=a.axisX.dataInfo,d,f,g=!1,h=!1,k=!1,l=[],m=0;m<a.dataSeriesIndexes.length;m++){var p=this.data[a.dataSeriesIndexes[m]],n=0,e=!1,q=!1,r;if("normal"===p.axisPlacement||"xySwapped"===p.axisPlacement)var s=this.sessionVariables.axisX.newViewportMinimum?this.sessionVariables.axisX.newViewportMinimum:
this.options.axisX&&this.options.axisX.viewportMinimum?this.options.axisX.viewportMinimum:this.options.axisX&&this.options.axisX.minimum?this.options.axisX.minimum:-Infinity,z=this.sessionVariables.axisX.newViewportMaximum?this.sessionVariables.axisX.newViewportMaximum:this.options.axisX&&this.options.axisX.viewportMaximum?this.options.axisX.viewportMaximum:this.options.axisX&&this.options.axisX.maximum?this.options.axisX.maximum:Infinity;if(p.dataPoints[n].x&&p.dataPoints[n].x.getTime||"dateTime"===
p.xValueType)g=!0;for(n=0;n<p.dataPoints.length;n++){"undefined"===typeof p.dataPoints[n].x&&(p.dataPoints[n].x=n+(a.axisX.logarithmic?1:0));p.dataPoints[n].x.getTime?(g=!0,d=p.dataPoints[n].x.getTime()):d=p.dataPoints[n].x;f=x(p.dataPoints[n].y)?null:p.dataPoints[n].y;d<b.min&&(b.min=d);d>b.max&&(b.max=d);if(0<n){if(a.axisX.logarithmic){var v=d/p.dataPoints[n-1].x;1>v&&(v=1/v);b.minDiff>v&&1!==v&&(b.minDiff=v)}else v=d-p.dataPoints[n-1].x,0>v&&(v*=-1),b.minDiff>v&&0!==v&&(b.minDiff=v);x(f)||null===
p.dataPoints[n-1].y||(a.axisY.logarithmic?0<f&&(v=f/p.dataPoints[n-1].y,1>v&&(v=1/v),c.minDiff>v&&1!==v&&(c.minDiff=v)):(v=f-p.dataPoints[n-1].y,0>v&&(v*=-1),c.minDiff>v&&0!==v&&(c.minDiff=v)))}if(d<s&&!e)null!==f&&(r=d);else{if(!e&&(e=!0,0<n)){n-=2;continue}if(d>z&&!q)q=!0;else if(d>z&&q)continue;p.dataPoints[n].label&&(a.axisX.labels[d]=p.dataPoints[n].label);d<b.viewPortMin&&(b.viewPortMin=d);d>b.viewPortMax&&(b.viewPortMax=d);null===f?b.viewPortMin===d&&r<d&&(b.viewPortMin=r):(a.yTotals[d]=(a.yTotals[d]?
a.yTotals[d]:0)+Math.abs(f),0<=f?h=!0:0>f&&(k=!0),l[d]=l[d]?l[d]+Math.abs(f):Math.abs(f))}}this.plotInfo.axisXValueType=p.xValueType=g?"dateTime":"number"}a.axisY.logarithmic?(c.max=x(c.viewPortMax)?99*Math.pow(a.axisY.logarithmBase,-0.05):Math.max(c.viewPortMax,99*Math.pow(a.axisY.logarithmBase,-0.05)),c.min=x(c.viewPortMin)?1:Math.min(c.viewPortMin,1)):h&&!k?(c.max=x(c.viewPortMax)?99:Math.max(c.viewPortMax,99),c.min=x(c.viewPortMin)?1:Math.min(c.viewPortMin,1)):h&&k?(c.max=x(c.viewPortMax)?99:
Math.max(c.viewPortMax,99),c.min=x(c.viewPortMin)?-99:Math.min(c.viewPortMin,-99)):!h&&k&&(c.max=x(c.viewPortMax)?-1:Math.max(c.viewPortMax,-1),c.min=x(c.viewPortMin)?-99:Math.min(c.viewPortMin,-99));c.viewPortMin=c.min;c.viewPortMax=c.max;a.dataPointYSums=l}};y.prototype._processMultiYPlotUnit=function(a){if(a.dataSeriesIndexes&&!(1>a.dataSeriesIndexes.length))for(var c=a.axisY.dataInfo,b=a.axisX.dataInfo,d,f,g,h,k=!1,l=0;l<a.dataSeriesIndexes.length;l++){var m=this.data[a.dataSeriesIndexes[l]],
p=0,n=!1,e=!1,q,r,s;if("normal"===m.axisPlacement||"xySwapped"===m.axisPlacement)var z=this.sessionVariables.axisX.newViewportMinimum?this.sessionVariables.axisX.newViewportMinimum:this.options.axisX&&this.options.axisX.viewportMinimum?this.options.axisX.viewportMinimum:this.options.axisX&&this.options.axisX.minimum?this.options.axisX.minimum:-Infinity,v=this.sessionVariables.axisX.newViewportMaximum?this.sessionVariables.axisX.newViewportMaximum:this.options.axisX&&this.options.axisX.viewportMaximum?
this.options.axisX.viewportMaximum:this.options.axisX&&this.options.axisX.maximum?this.options.axisX.maximum:Infinity;if(m.dataPoints[p].x&&m.dataPoints[p].x.getTime||"dateTime"===m.xValueType)k=!0;for(p=0;p<m.dataPoints.length;p++){"undefined"===typeof m.dataPoints[p].x&&(m.dataPoints[p].x=p+(a.axisX.logarithmic?1:0));m.dataPoints[p].x.getTime?(k=!0,d=m.dataPoints[p].x.getTime()):d=m.dataPoints[p].x;if((f=m.dataPoints[p].y)&&f.length){g=Math.min.apply(null,f);h=Math.max.apply(null,f);r=!0;for(var t=
0;t<f.length;t++)null===f.k&&(r=!1);r&&(n||(s=q),q=d)}d<b.min&&(b.min=d);d>b.max&&(b.max=d);g<c.min&&(c.min=g);h>c.max&&(c.max=h);0<p&&(a.axisX.logarithmic?(r=d/m.dataPoints[p-1].x,1>r&&(r=1/r),b.minDiff>r&&1!==r&&(b.minDiff=r)):(r=d-m.dataPoints[p-1].x,0>r&&(r*=-1),b.minDiff>r&&0!==r&&(b.minDiff=r)),f&&(null!==f[0]&&m.dataPoints[p-1].y&&null!==m.dataPoints[p-1].y[0])&&(a.axisY.logarithmic?(r=f[0]/m.dataPoints[p-1].y[0],1>r&&(r=1/r),c.minDiff>r&&1!==r&&(c.minDiff=r)):(r=f[0]-m.dataPoints[p-1].y[0],
0>r&&(r*=-1),c.minDiff>r&&0!==r&&(c.minDiff=r))));if(!(d<z)||n){if(!n&&(n=!0,0<p)){p-=2;q=s;continue}if(d>v&&!e)e=!0;else if(d>v&&e)continue;m.dataPoints[p].label&&(a.axisX.labels[d]=m.dataPoints[p].label);d<b.viewPortMin&&(b.viewPortMin=d);d>b.viewPortMax&&(b.viewPortMax=d);if(b.viewPortMin===d&&f)for(t=0;t<f.length;t++)if(null===f[t]&&q<d){b.viewPortMin=q;break}null===f?b.viewPortMin===d&&q<d&&(b.viewPortMin=q):(g<c.viewPortMin&&(c.viewPortMin=g),h>c.viewPortMax&&(c.viewPortMax=h))}}this.plotInfo.axisXValueType=
m.xValueType=k?"dateTime":"number"}};y.prototype.getDataPointAtXY=function(a,c,b){b=b||!1;for(var d=[],f=this._dataInRenderedOrder.length-1;0<=f;f--){var g=null;(g=this._dataInRenderedOrder[f].getDataPointAtXY(a,c,b))&&d.push(g)}a=null;c=!1;for(b=0;b<d.length;b++)if("line"===d[b].dataSeries.type||"stepLine"===d[b].dataSeries.type||"area"===d[b].dataSeries.type||"stepArea"===d[b].dataSeries.type)if(f=Q("markerSize",d[b].dataPoint,d[b].dataSeries)||8,d[b].distance<=f/2){c=!0;break}for(b=0;b<d.length;b++)c&&
"line"!==d[b].dataSeries.type&&"stepLine"!==d[b].dataSeries.type&&"area"!==d[b].dataSeries.type&&"stepArea"!==d[b].dataSeries.type||(a?d[b].distance<=a.distance&&(a=d[b]):a=d[b]);return a};y.prototype.getObjectAtXY=function(a,c,b){var d=null;if(b=this.getDataPointAtXY(a,c,b||!1))d=b.dataSeries.dataPointIds[b.dataPointIndex];else if(u)d=Ka(a,c,this._eventManager.ghostCtx);else for(b=0;b<this.legend.items.length;b++){var f=this.legend.items[b];a>=f.x1&&(a<=f.x2&&c>=f.y1&&c<=f.y2)&&(d=f.id)}return d};
y.prototype.getAutoFontSize=function(a,c,b){a/=400;return Math.max(10,Math.round(Math.min(this.width,this.height)*a))};y.prototype.resetOverlayedCanvas=function(){this.overlaidCanvasCtx.clearRect(0,0,this.width,this.height)};y.prototype.clearCanvas=function(){this.ctx.clearRect(0,0,this.width,this.height);this.backgroundColor&&(this.ctx.fillStyle=this.backgroundColor,this.ctx.fillRect(0,0,this.width,this.height))};y.prototype.attachEvent=function(a){this._events.push(a)};y.prototype._touchEventHandler=
function(a){if(a.changedTouches&&this.interactivityEnabled){var c=[],b=a.changedTouches,d=b?b[0]:a,f=null;switch(a.type){case "touchstart":case "MSPointerDown":c=["mousemove","mousedown"];this._lastTouchData=xa(d);this._lastTouchData.time=new Date;break;case "touchmove":case "MSPointerMove":c=["mousemove"];break;case "touchend":case "MSPointerUp":c="touchstart"===this._lastTouchEventType||"MSPointerDown"===this._lastTouchEventType?["mouseup","click"]:["mouseup"];break;default:return}if(!(b&&1<b.length)){f=
xa(d);f.time=new Date;try{var g=f.y-this._lastTouchData.y,h=f.time-this._lastTouchData.time;if(15<Math.abs(g)&&(this._lastTouchData.scroll||200>h)){this._lastTouchData.scroll=!0;var k=window.parent||window;k&&k.scrollBy&&k.scrollBy(0,-g)}}catch(l){}this._lastTouchEventType=a.type;if(this._lastTouchData.scroll&&this.zoomEnabled)this.isDrag&&this.resetOverlayedCanvas(),this.isDrag=!1;else for(b=0;b<c.length;b++)f=c[b],g=document.createEvent("MouseEvent"),g.initMouseEvent(f,!0,!0,window,1,d.screenX,
d.screenY,d.clientX,d.clientY,!1,!1,!1,!1,0,null),d.target.dispatchEvent(g),a.preventManipulation&&a.preventManipulation(),a.preventDefault&&a.preventDefault()}}};y.prototype._dispatchRangeEvent=function(a,c){var b={chart:this};b.type=a;b.trigger=c;var d=[];this.axisX&&0<this.axisX.length&&d.push("axisX");this.axisX2&&0<this.axisX2.length&&d.push("axisX2");this.axisY&&0<this.axisY.length&&d.push("axisY");this.axisY2&&0<this.axisY2.length&&d.push("axisY2");for(var f=0;f<d.length;f++)if(x(b[d[f]])&&
(b[d[f]]=[]),"axisY"===d[f])for(var g=0;g<this.axisY.length;g++)b[d[f]].push({viewportMinimum:this[d[f]][g].sessionVariables.newViewportMinimum,viewportMaximum:this[d[f]][g].sessionVariables.newViewportMaximum});else if("axisY2"===d[f])for(g=0;g<this.axisY2.length;g++)b[d[f]].push({viewportMinimum:this[d[f]][g].sessionVariables.newViewportMinimum,viewportMaximum:this[d[f]][g].sessionVariables.newViewportMaximum});else if("axisX"===d[f])for(g=0;g<this.axisX.length;g++)b[d[f]].push({viewportMinimum:this[d[f]][g].sessionVariables.newViewportMinimum,
viewportMaximum:this[d[f]][g].sessionVariables.newViewportMaximum});else if("axisX2"===d[f])for(g=0;g<this.axisX2.length;g++)b[d[f]].push({viewportMinimum:this[d[f]][g].sessionVariables.newViewportMinimum,viewportMaximum:this[d[f]][g].sessionVariables.newViewportMaximum});this.dispatchEvent(a,b,this)};y.prototype._mouseEventHandler=function(a){"undefined"===typeof a.target&&a.srcElement&&(a.target=a.srcElement);var c=xa(a),b=a.type,d,f;a.which?f=3==a.which:a.button&&(f=2==a.button);y.capturedEventParam&&
(d=y.capturedEventParam,"mouseup"===b&&(y.capturedEventParam=null,d.chart.overlaidCanvas.releaseCapture?d.chart.overlaidCanvas.releaseCapture():document.documentElement.removeEventListener("mouseup",d.chart._mouseEventHandler,!1)),d.hasOwnProperty(b)&&("mouseup"!==b||d.chart.overlaidCanvas.releaseCapture?a.target===d.chart.overlaidCanvas&&d[b].call(d.context,c.x,c.y):a.target!==d.chart.overlaidCanvas&&(d.chart.isDrag=!1)));if(this.interactivityEnabled)if(this._ignoreNextEvent)this._ignoreNextEvent=
!1;else if(a.preventManipulation&&a.preventManipulation(),a.preventDefault&&a.preventDefault(),!f){if(!y.capturedEventParam&&this._events){for(var g=0;g<this._events.length;g++)if(this._events[g].hasOwnProperty(b))if(d=this._events[g],f=d.bounds,c.x>=f.x1&&c.x<=f.x2&&c.y>=f.y1&&c.y<=f.y2){d[b].call(d.context,c.x,c.y);"mousedown"===b&&!0===d.capture?(y.capturedEventParam=d,this.overlaidCanvas.setCapture?this.overlaidCanvas.setCapture():document.documentElement.addEventListener("mouseup",this._mouseEventHandler,
!1)):"mouseup"===b&&(d.chart.overlaidCanvas.releaseCapture?d.chart.overlaidCanvas.releaseCapture():document.documentElement.removeEventListener("mouseup",this._mouseEventHandler,!1));break}else d=null;a.target.style.cursor=d&&d.cursor?d.cursor:this._defaultCursor}b=this.plotArea;if(c.x<b.x1||c.x>b.x2||c.y<b.y1||c.y>b.y2)this.toolTip&&this.toolTip.enabled?this.toolTip.hide():this.resetOverlayedCanvas();this.isDrag&&this.zoomEnabled||!this._eventManager||this._eventManager.mouseEventHandler(a)}};y.prototype._plotAreaMouseDown=
function(a,c){this.isDrag=!0;this.dragStartPoint={x:a,y:c}};y.prototype._plotAreaMouseUp=function(a,c){if(("normal"===this.plotInfo.axisPlacement||"xySwapped"===this.plotInfo.axisPlacement)&&this.isDrag){var b=c-this.dragStartPoint.y,d=a-this.dragStartPoint.x,f=0<=this.zoomType.indexOf("x"),g=0<=this.zoomType.indexOf("y"),h=!1;this.resetOverlayedCanvas();if("xySwapped"===this.plotInfo.axisPlacement)var k=g,g=f,f=k;if(this.panEnabled||this.zoomEnabled){if(this.panEnabled)for(f=g=0;f<this._axes.length;f++)b=
this._axes[f],b.logarithmic?b.viewportMinimum<b.minimum?(g=b.minimum/b.viewportMinimum,b.sessionVariables.newViewportMinimum=b.viewportMinimum*g,b.sessionVariables.newViewportMaximum=b.viewportMaximum*g,h=!0):b.viewportMaximum>b.maximum&&(g=b.viewportMaximum/b.maximum,b.sessionVariables.newViewportMinimum=b.viewportMinimum/g,b.sessionVariables.newViewportMaximum=b.viewportMaximum/g,h=!0):b.viewportMinimum<b.minimum?(g=b.minimum-b.viewportMinimum,b.sessionVariables.newViewportMinimum=b.viewportMinimum+
g,b.sessionVariables.newViewportMaximum=b.viewportMaximum+g,h=!0):b.viewportMaximum>b.maximum&&(g=b.viewportMaximum-b.maximum,b.sessionVariables.newViewportMinimum=b.viewportMinimum-g,b.sessionVariables.newViewportMaximum=b.viewportMaximum-g,h=!0);else if((!f||2<Math.abs(d))&&(!g||2<Math.abs(b))&&this.zoomEnabled){if(!this.dragStartPoint)return;b=f?this.dragStartPoint.x:this.plotArea.x1;d=g?this.dragStartPoint.y:this.plotArea.y1;f=f?a:this.plotArea.x2;g=g?c:this.plotArea.y2;2<Math.abs(b-f)&&2<Math.abs(d-
g)&&this._zoomPanToSelectedRegion(b,d,f,g)&&(h=!0)}h&&(this._ignoreNextEvent=!0,this._dispatchRangeEvent("rangeChanging","zoom"),this.render(),this._dispatchRangeEvent("rangeChanged","zoom"),h&&(this.zoomEnabled&&"none"===this._zoomButton.style.display)&&(ta(this._zoomButton,this._resetButton),Y(this,this._zoomButton,"pan"),Y(this,this._resetButton,"reset")))}}this.isDrag=!1};y.prototype._plotAreaMouseMove=function(a,c){if(this.isDrag&&"none"!==this.plotInfo.axisPlacement){var b=0,d=0,f=b=null,f=
0<=this.zoomType.indexOf("x"),g=0<=this.zoomType.indexOf("y"),h=this;"xySwapped"===this.plotInfo.axisPlacement&&(b=g,g=f,f=b);b=this.dragStartPoint.x-a;d=this.dragStartPoint.y-c;2<Math.abs(b)&&8>Math.abs(b)&&(this.panEnabled||this.zoomEnabled)?this.toolTip.hide():this.panEnabled||this.zoomEnabled||this.toolTip.mouseMoveHandler(a,c);if((!f||2<Math.abs(b)||!g||2<Math.abs(d))&&(this.panEnabled||this.zoomEnabled))if(this.panEnabled)f={x1:f?this.plotArea.x1+b:this.plotArea.x1,y1:g?this.plotArea.y1+d:this.plotArea.y1,
x2:f?this.plotArea.x2+b:this.plotArea.x2,y2:g?this.plotArea.y2+d:this.plotArea.y2},clearTimeout(h._panTimerId),h._panTimerId=setTimeout(function(b,d,e,f){return function(){h._zoomPanToSelectedRegion(b,d,e,f,!0)&&(h._dispatchRangeEvent("rangeChanging","pan"),h.render(),h._dispatchRangeEvent("rangeChanged","pan"),h.dragStartPoint.x=a,h.dragStartPoint.y=c)}}(f.x1,f.y1,f.x2,f.y2),0);else if(this.zoomEnabled){this.resetOverlayedCanvas();b=this.overlaidCanvasCtx.globalAlpha;this.overlaidCanvasCtx.fillStyle=
"#A89896";var d=f?this.dragStartPoint.x:this.plotArea.x1,k=g?this.dragStartPoint.y:this.plotArea.y1,l=f?a-this.dragStartPoint.x:this.plotArea.x2-this.plotArea.x1,m=g?c-this.dragStartPoint.y:this.plotArea.y2-this.plotArea.y1;this.validateRegion(d,k,f?a:this.plotArea.x2-this.plotArea.x1,g?c:this.plotArea.y2-this.plotArea.y1,"xy"!==this.zoomType).isValid&&(this.resetOverlayedCanvas(),this.overlaidCanvasCtx.fillStyle="#99B2B5");this.overlaidCanvasCtx.globalAlpha=0.7;this.overlaidCanvasCtx.fillRect(d,
k,l,m);this.overlaidCanvasCtx.globalAlpha=b}}else this.toolTip.mouseMoveHandler(a,c)};y.prototype._zoomPanToSelectedRegion=function(a,c,b,d,f){a=this.validateRegion(a,c,b,d,f);c=a.axesWithValidRange;b=a.axesRanges;if(a.isValid)for(d=0;d<c.length;d++)f=b[d],c[d].setViewPortRange(f.val1,f.val2);return a.isValid};y.prototype.validateRegion=function(a,c,b,d,f){f=f||!1;for(var g=0<=this.zoomType.indexOf("x"),h=0<=this.zoomType.indexOf("y"),k=!1,l=[],m=[],p=[],n=0;n<this.axisX.length;n++)this.axisX[n]&&
g&&m.push(this.axisX[n]);for(n=0;n<this.axisX2.length;n++)this.axisX2[n]&&g&&m.push(this.axisX2[n]);for(n=0;n<this.axisY.length;n++)this.axisY[n]&&h&&m.push(this.axisY[n]);for(n=0;n<this.axisY2.length;n++)this.axisY2[n]&&h&&m.push(this.axisY2[n]);for(g=0;g<m.length;g++){var h=m[g],n=h.convertPixelToValue({x:a,y:c}),e=h.convertPixelToValue({x:b,y:d});if(n>e)var q=e,e=n,n=q;if(isFinite(h.dataInfo.minDiff))if(!(h.logarithmic&&e/n<Math.pow(h.dataInfo.minDiff,3)||!h.logarithmic&&Math.abs(e-n)<3*Math.abs(h.dataInfo.minDiff)||
n<h.minimum||e>h.maximum))l.push(h),p.push({val1:n,val2:e}),k=!0;else if(!f){k=!1;break}}return{isValid:k,axesWithValidRange:l,axesRanges:p}};y.prototype.preparePlotArea=function(){var a=this.plotArea;!u&&(0<a.x1||0<a.y1)&&a.ctx.translate(a.x1,a.y1);if((this.axisX[0]||this.axisX2[0])&&(this.axisY[0]||this.axisY2[0])){var c=this.axisX[0]?this.axisX[0].lineCoordinates:this.axisX2[0].lineCoordinates;if(this.axisY&&0<this.axisY.length&&this.axisY[0]){var b=this.axisY[0];a.x1=c.x1<c.x2?c.x1:b.lineCoordinates.x1;
a.y1=c.y1<b.lineCoordinates.y1?c.y1:b.lineCoordinates.y1;a.x2=c.x2>b.lineCoordinates.x2?c.x2:b.lineCoordinates.x2;a.y2=c.y2>c.y1?c.y2:b.lineCoordinates.y2;a.width=a.x2-a.x1;a.height=a.y2-a.y1}this.axisY2&&0<this.axisY2.length&&this.axisY2[0]&&(b=this.axisY2[0],a.x1=c.x1<c.x2?c.x1:b.lineCoordinates.x1,a.y1=c.y1<b.lineCoordinates.y1?c.y1:b.lineCoordinates.y1,a.x2=c.x2>b.lineCoordinates.x2?c.x2:b.lineCoordinates.x2,a.y2=c.y2>c.y1?c.y2:b.lineCoordinates.y2,a.width=a.x2-a.x1,a.height=a.y2-a.y1)}else c=
this.layoutManager.getFreeSpace(),a.x1=c.x1,a.x2=c.x2,a.y1=c.y1,a.y2=c.y2,a.width=c.width,a.height=c.height;u||(a.canvas.width=a.width,a.canvas.height=a.height,a.canvas.style.left=a.x1+"px",a.canvas.style.top=a.y1+"px",(0<a.x1||0<a.y1)&&a.ctx.translate(-a.x1,-a.y1));a.layoutManager=new ja(a.x1,a.y1,a.x2,a.y2,2)};y.prototype.renderIndexLabels=function(a){a=a||this.plotArea.ctx;for(var c=this.plotArea,b=0,d=0,f=0,g=0,h=b=g=d=f=0,k=0,l=0;l<this._indexLabels.length;l++){var m=this._indexLabels[l],p=m.chartType.toLowerCase(),
n,e,q=Q("indexLabelFontColor",m.dataPoint,m.dataSeries),h=Q("indexLabelFontSize",m.dataPoint,m.dataSeries),k=Q("indexLabelFontFamily",m.dataPoint,m.dataSeries);n=Q("indexLabelFontStyle",m.dataPoint,m.dataSeries);e=Q("indexLabelFontWeight",m.dataPoint,m.dataSeries);var g=Q("indexLabelBackgroundColor",m.dataPoint,m.dataSeries),d=Q("indexLabelMaxWidth",m.dataPoint,m.dataSeries),f=Q("indexLabelWrap",m.dataPoint,m.dataSeries),r=Q("indexLabelLineDashType",m.dataPoint,m.dataSeries),s=Q("indexLabelLineColor",
m.dataPoint,m.dataSeries),z=x(m.dataPoint.indexLabelLineThickness)?x(m.dataSeries.options.indexLabelLineThickness)?0:m.dataSeries.options.indexLabelLineThickness:m.dataPoint.indexLabelLineThickness,b=0<z?Math.min(10,("normal"===this.plotInfo.axisPlacement?this.plotArea.height:this.plotArea.width)<<0):0,v={percent:null,total:null},t=null;if(0<=m.dataSeries.type.indexOf("stacked")||"pie"===m.dataSeries.type||"doughnut"===m.dataSeries.type)v=this.getPercentAndTotal(m.dataSeries,m.dataPoint);if(m.dataSeries.indexLabelFormatter||
m.dataPoint.indexLabelFormatter)t={chart:this,dataSeries:m.dataSeries,dataPoint:m.dataPoint,index:m.indexKeyword,total:v.total,percent:v.percent};var w=m.dataPoint.indexLabelFormatter?m.dataPoint.indexLabelFormatter(t):m.dataPoint.indexLabel?this.replaceKeywordsWithValue(m.dataPoint.indexLabel,m.dataPoint,m.dataSeries,null,m.indexKeyword):m.dataSeries.indexLabelFormatter?m.dataSeries.indexLabelFormatter(t):m.dataSeries.indexLabel?this.replaceKeywordsWithValue(m.dataSeries.indexLabel,m.dataPoint,m.dataSeries,
null,m.indexKeyword):null;if(null!==w&&""!==w){var v=Q("indexLabelPlacement",m.dataPoint,m.dataSeries),t=Q("indexLabelOrientation",m.dataPoint,m.dataSeries),u=m.direction,$=m.dataSeries.axisX,B=m.dataSeries.axisY,y=!1,q=new V(a,{x:0,y:0,maxWidth:d?d:0.5*this.width,maxHeight:f?5*h:1.5*h,angle:"horizontal"===t?0:-90,text:w,padding:0,backgroundColor:g,horizontalAlign:"left",fontSize:h,fontFamily:k,fontWeight:e,fontColor:q,fontStyle:n,textBaseline:"top"});q.measureText();if(0<=p.indexOf("line")||0<=p.indexOf("area")||
0<=p.indexOf("bubble")||0<=p.indexOf("scatter")){if(m.dataPoint.x<$.viewportMinimum||m.dataPoint.x>$.viewportMaximum||m.dataPoint.y<B.viewportMinimum||m.dataPoint.y>B.viewportMaximum)continue}else if(0<=p.indexOf("column")){if(m.dataPoint.x<$.viewportMinimum||m.dataPoint.x>$.viewportMaximum||m.bounds.y1>c.y2||m.bounds.y2<c.y1)continue}else if(0<=p.indexOf("bar")){if(m.dataPoint.x<$.viewportMinimum||m.dataPoint.x>$.viewportMaximum||m.bounds.x1>c.x2||m.bounds.x2<c.x1)continue}else if(m.dataPoint.x<
$.viewportMinimum||m.dataPoint.x>$.viewportMaximum)continue;d=g=2;"horizontal"===t?(h=q.width,k=q.height):(k=q.width,h=q.height);if("normal"===this.plotInfo.axisPlacement){if(0<=p.indexOf("line")||0<=p.indexOf("area"))v="auto",g=4;else if(0<=p.indexOf("stacked"))"auto"===v&&(v="inside");else if("bubble"===p||"scatter"===p)v="inside";n=m.point.x-h/2;"inside"!==v?(d=c.y1,f=c.y2,0<u?(e=m.point.y-k-g-b,e<d&&(e="auto"===v?Math.max(m.point.y,d)+g+b:d+g+b,y=e+k>m.point.y)):(e=m.point.y+g+b,e>f-k-g-b&&(e=
"auto"===v?Math.min(m.point.y,f)-k-g-b:f-k-g-b,y=e<m.point.y))):(d=Math.max(m.bounds.y1,c.y1),f=Math.min(m.bounds.y2,c.y2),b=0<=p.indexOf("range")?0<u?Math.max(m.bounds.y1,c.y1)+k/2+g:Math.min(m.bounds.y2,c.y2)-k/2-g:(Math.max(m.bounds.y1,c.y1)+Math.min(m.bounds.y2,c.y2))/2,0<u?(e=Math.max(m.point.y,b)-k/2,e<d&&("bubble"===p||"scatter"===p)&&(e=Math.max(m.point.y-k-g,c.y1+g))):(e=Math.min(m.point.y,b)-k/2,e>f-k-g&&("bubble"===p||"scatter"===p)&&(e=Math.min(m.point.y+g,c.y2-k-g))),e=Math.min(e,f-k))}else 0<=
p.indexOf("line")||0<=p.indexOf("area")||0<=p.indexOf("scatter")?(v="auto",d=4):0<=p.indexOf("stacked")?"auto"===v&&(v="inside"):"bubble"===p&&(v="inside"),e=m.point.y-k/2,"inside"!==v?(g=c.x1,f=c.x2,0>u?(n=m.point.x-h-d-b,n<g&&(n="auto"===v?Math.max(m.point.x,g)+d+b:g+d+b,y=n+h>m.point.x)):(n=m.point.x+d+b,n>f-h-d-b&&(n="auto"===v?Math.min(m.point.x,f)-h-d-b:f-h-d-b,y=n<m.point.x))):(g=Math.max(m.bounds.x1,c.x1),Math.min(m.bounds.x2,c.x2),b=0<=p.indexOf("range")?0>u?Math.max(m.bounds.x1,c.x1)+h/
2+d:Math.min(m.bounds.x2,c.x2)-h/2-d:(Math.max(m.bounds.x1,c.x1)+Math.min(m.bounds.x2,c.x2))/2,n=0>u?Math.max(m.point.x,b)-h/2:Math.min(m.point.x,b)-h/2,n=Math.max(n,g));"vertical"===t&&(e+=k);q.x=n;q.y=e;q.render(!0);z&&("inside"!==v&&(0>p.indexOf("bar")&&m.point.x>c.x1&&m.point.x<c.x2||!y)&&(0>p.indexOf("column")&&m.point.y>c.y1&&m.point.y<c.y2||!y))&&(a.lineWidth=z,a.strokeStyle=s?s:"gray",a.setLineDash&&a.setLineDash(E(r,z)),a.beginPath(),a.moveTo(m.point.x,m.point.y),0<=p.indexOf("bar")?a.lineTo(n+
(0<m.direction?0:h),e+("horizontal"===t?k:-k)/2):0<=p.indexOf("column")?a.lineTo(n+h/2,e+((0<m.direction?k:-k)+("horizontal"===t?k:-k))/2):a.lineTo(n+h/2,e+((e<m.point.y?k:-k)+("horizontal"===t?k:-k))/2),a.stroke())}}return{source:a,dest:this.plotArea.ctx,animationCallback:F.fadeInAnimation,easingFunction:F.easing.easeInQuad,animationBase:0,startTimePercent:0.7}};y.prototype.renderLine=function(a){var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var b=this._eventManager.ghostCtx;
c.save();var d=this.plotArea;c.beginPath();c.rect(d.x1,d.y1,d.width,d.height);c.clip();for(var d=[],f=0;f<a.dataSeriesIndexes.length;f++){var g=a.dataSeriesIndexes[f],h=this.data[g];c.lineWidth=h.lineThickness;var k=h.dataPoints,l="solid";if(c.setLineDash){var m=E(h.nullDataLineDashType,h.lineThickness),l=h.lineDashType,p=E(l,h.lineThickness);c.setLineDash(p)}var n=h.id;this._eventManager.objectMap[n]={objectType:"dataSeries",dataSeriesIndex:g};n=D(n);b.strokeStyle=n;b.lineWidth=0<h.lineThickness?
Math.max(h.lineThickness,4):0;var n=h._colorSet,e=n=h.options.lineColor?h.options.lineColor:n[0];c.strokeStyle=n;var q=!0,r=0,s,z;c.beginPath();if(0<k.length){for(var v=!1,r=0;r<k.length;r++)if(s=k[r].x.getTime?k[r].x.getTime():k[r].x,!(s<a.axisX.dataInfo.viewPortMin||s>a.axisX.dataInfo.viewPortMax&&(!h.connectNullData||!v)))if("number"!==typeof k[r].y)0<r&&!(h.connectNullData||v||q)&&(c.stroke(),u&&b.stroke()),v=!0;else{s=a.axisX.convertValueToPixel(s);z=a.axisY.convertValueToPixel(k[r].y);var t=
h.dataPointIds[r];this._eventManager.objectMap[t]={id:t,objectType:"dataPoint",dataSeriesIndex:g,dataPointIndex:r,x1:s,y1:z};q||v?(!q&&h.connectNullData?(c.setLineDash&&(h.options.nullDataLineDashType||l===h.lineDashType&&h.lineDashType!==h.nullDataLineDashType)&&(c.stroke(),l=h.nullDataLineDashType,c.setLineDash(m)),c.lineTo(s,z),u&&b.lineTo(s,z)):(c.beginPath(),c.moveTo(s,z),u&&(b.beginPath(),b.moveTo(s,z))),v=q=!1):(c.lineTo(s,z),u&&b.lineTo(s,z),0==r%500&&(c.stroke(),c.beginPath(),c.moveTo(s,
z),u&&(b.stroke(),b.beginPath(),b.moveTo(s,z))));r<k.length-1&&(e!==(k[r].lineColor||n)||l!==(k[r].lineDashType||h.lineDashType))&&(c.stroke(),c.beginPath(),c.moveTo(s,z),e=k[r].lineColor||n,c.strokeStyle=e,c.setLineDash&&(k[r].lineDashType?(l=k[r].lineDashType,c.setLineDash(E(l,h.lineThickness))):(l=h.lineDashType,c.setLineDash(p))));if(0<k[r].markerSize||0<h.markerSize){var w=h.getMarkerProperties(r,s,z,c);d.push(w);t=D(t);u&&d.push({x:s,y:z,ctx:b,type:w.type,size:w.size,color:t,borderColor:t,borderThickness:w.borderThickness})}(k[r].indexLabel||
h.indexLabel||k[r].indexLabelFormatter||h.indexLabelFormatter)&&this._indexLabels.push({chartType:"line",dataPoint:k[r],dataSeries:h,point:{x:s,y:z},direction:0>k[r].y===a.axisY.reversed?1:-1,color:n})}c.stroke();u&&b.stroke()}}M.drawMarkers(d);c.restore();c.beginPath();u&&b.beginPath();return{source:c,dest:this.plotArea.ctx,animationCallback:F.xClipAnimation,easingFunction:F.easing.linear,animationBase:0}}};y.prototype.renderStepLine=function(a){var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=
a.dataSeriesIndexes.length)){var b=this._eventManager.ghostCtx;c.save();var d=this.plotArea;c.beginPath();c.rect(d.x1,d.y1,d.width,d.height);c.clip();for(var d=[],f=0;f<a.dataSeriesIndexes.length;f++){var g=a.dataSeriesIndexes[f],h=this.data[g];c.lineWidth=h.lineThickness;var k=h.dataPoints,l="solid";if(c.setLineDash){var m=E(h.nullDataLineDashType,h.lineThickness),l=h.lineDashType,p=E(l,h.lineThickness);c.setLineDash(p)}var n=h.id;this._eventManager.objectMap[n]={objectType:"dataSeries",dataSeriesIndex:g};
n=D(n);b.strokeStyle=n;b.lineWidth=0<h.lineThickness?Math.max(h.lineThickness,4):0;var n=h._colorSet,e=n=h.options.lineColor?h.options.lineColor:n[0];c.strokeStyle=n;var q=!0,r=0,s,z;c.beginPath();if(0<k.length){for(var v=!1,r=0;r<k.length;r++)if(s=k[r].getTime?k[r].x.getTime():k[r].x,!(s<a.axisX.dataInfo.viewPortMin||s>a.axisX.dataInfo.viewPortMax&&(!h.connectNullData||!v)))if("number"!==typeof k[r].y)0<r&&!(h.connectNullData||v||q)&&(c.stroke(),u&&b.stroke()),v=!0;else{var t=z;s=a.axisX.convertValueToPixel(s);
z=a.axisY.convertValueToPixel(k[r].y);var w=h.dataPointIds[r];this._eventManager.objectMap[w]={id:w,objectType:"dataPoint",dataSeriesIndex:g,dataPointIndex:r,x1:s,y1:z};q||v?(!q&&h.connectNullData?(c.setLineDash&&(h.options.nullDataLineDashType||l===h.lineDashType&&h.lineDashType!==h.nullDataLineDashType)&&(c.stroke(),l=h.nullDataLineDashType,c.setLineDash(m)),c.lineTo(s,t),c.lineTo(s,z),u&&(b.lineTo(s,t),b.lineTo(s,z))):(c.beginPath(),c.moveTo(s,z),u&&(b.beginPath(),b.moveTo(s,z))),v=q=!1):(c.lineTo(s,
t),u&&b.lineTo(s,t),c.lineTo(s,z),u&&b.lineTo(s,z),0==r%500&&(c.stroke(),c.beginPath(),c.moveTo(s,z),u&&(b.stroke(),b.beginPath(),b.moveTo(s,z))));r<k.length-1&&(e!==(k[r].lineColor||n)||l!==(k[r].lineDashType||h.lineDashType))&&(c.stroke(),c.beginPath(),c.moveTo(s,z),e=k[r].lineColor||n,c.strokeStyle=e,c.setLineDash&&(k[r].lineDashType?(l=k[r].lineDashType,c.setLineDash(E(l,h.lineThickness))):(l=h.lineDashType,c.setLineDash(p))));if(0<k[r].markerSize||0<h.markerSize)t=h.getMarkerProperties(r,s,z,
c),d.push(t),w=D(w),u&&d.push({x:s,y:z,ctx:b,type:t.type,size:t.size,color:w,borderColor:w,borderThickness:t.borderThickness});(k[r].indexLabel||h.indexLabel||k[r].indexLabelFormatter||h.indexLabelFormatter)&&this._indexLabels.push({chartType:"stepLine",dataPoint:k[r],dataSeries:h,point:{x:s,y:z},direction:0>k[r].y===a.axisY.reversed?1:-1,color:n})}c.stroke();u&&b.stroke()}}M.drawMarkers(d);c.restore();c.beginPath();u&&b.beginPath();return{source:c,dest:this.plotArea.ctx,animationCallback:F.xClipAnimation,
easingFunction:F.easing.linear,animationBase:0}}};y.prototype.renderSpline=function(a){function c(a){a=ua(a,2);if(0<a.length){b.beginPath();u&&d.beginPath();b.moveTo(a[0].x,a[0].y);a[0].newStrokeStyle&&(b.strokeStyle=a[0].newStrokeStyle);a[0].newLineDashArray&&b.setLineDash(a[0].newLineDashArray);u&&d.moveTo(a[0].x,a[0].y);for(var c=0;c<a.length-3;c+=3)if(b.bezierCurveTo(a[c+1].x,a[c+1].y,a[c+2].x,a[c+2].y,a[c+3].x,a[c+3].y),u&&d.bezierCurveTo(a[c+1].x,a[c+1].y,a[c+2].x,a[c+2].y,a[c+3].x,a[c+3].y),
0<c&&0===c%3E3||a[c+3].newStrokeStyle||a[c+3].newLineDashArray)b.stroke(),b.beginPath(),b.moveTo(a[c+3].x,a[c+3].y),a[c+3].newStrokeStyle&&(b.strokeStyle=a[c+3].newStrokeStyle),a[c+3].newLineDashArray&&b.setLineDash(a[c+3].newLineDashArray),u&&(d.stroke(),d.beginPath(),d.moveTo(a[c+3].x,a[c+3].y));b.stroke();u&&d.stroke()}}var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var d=this._eventManager.ghostCtx;b.save();var f=this.plotArea;b.beginPath();b.rect(f.x1,f.y1,f.width,
f.height);b.clip();for(var f=[],g=0;g<a.dataSeriesIndexes.length;g++){var h=a.dataSeriesIndexes[g],k=this.data[h];b.lineWidth=k.lineThickness;var l=k.dataPoints,m="solid";if(b.setLineDash){var p=E(k.nullDataLineDashType,k.lineThickness),m=k.lineDashType,n=E(m,k.lineThickness);b.setLineDash(n)}var e=k.id;this._eventManager.objectMap[e]={objectType:"dataSeries",dataSeriesIndex:h};e=D(e);d.strokeStyle=e;d.lineWidth=0<k.lineThickness?Math.max(k.lineThickness,4):0;var e=k._colorSet,q=e=k.options.lineColor?
k.options.lineColor:e[0];b.strokeStyle=e;var r=0,s,z,v=[];b.beginPath();if(0<l.length)for(z=!1,r=0;r<l.length;r++)if(s=l[r].getTime?l[r].x.getTime():l[r].x,!(s<a.axisX.dataInfo.viewPortMin||s>a.axisX.dataInfo.viewPortMax&&(!k.connectNullData||!z)))if("number"!==typeof l[r].y)0<r&&!z&&(k.connectNullData?b.setLineDash&&(0<v.length&&(k.options.nullDataLineDashType||!l[r-1].lineDashType))&&(v[v.length-1].newLineDashArray=p,m=k.nullDataLineDashType):(c(v),v=[])),z=!0;else{s=a.axisX.convertValueToPixel(s);
z=a.axisY.convertValueToPixel(l[r].y);var t=k.dataPointIds[r];this._eventManager.objectMap[t]={id:t,objectType:"dataPoint",dataSeriesIndex:h,dataPointIndex:r,x1:s,y1:z};v[v.length]={x:s,y:z};r<l.length-1&&(q!==(l[r].lineColor||e)||m!==(l[r].lineDashType||k.lineDashType))&&(q=l[r].lineColor||e,v[v.length-1].newStrokeStyle=q,b.setLineDash&&(l[r].lineDashType?(m=l[r].lineDashType,v[v.length-1].newLineDashArray=E(m,k.lineThickness)):(m=k.lineDashType,v[v.length-1].newLineDashArray=n)));if(0<l[r].markerSize||
0<k.markerSize){var w=k.getMarkerProperties(r,s,z,b);f.push(w);t=D(t);u&&f.push({x:s,y:z,ctx:d,type:w.type,size:w.size,color:t,borderColor:t,borderThickness:w.borderThickness})}(l[r].indexLabel||k.indexLabel||l[r].indexLabelFormatter||k.indexLabelFormatter)&&this._indexLabels.push({chartType:"spline",dataPoint:l[r],dataSeries:k,point:{x:s,y:z},direction:0>l[r].y===a.axisY.reversed?1:-1,color:e});z=!1}c(v)}M.drawMarkers(f);b.restore();b.beginPath();u&&d.beginPath();return{source:b,dest:this.plotArea.ctx,
animationCallback:F.xClipAnimation,easingFunction:F.easing.linear,animationBase:0}}};var L=function(a,c,b,d,f,g,h,k,l,m,p,n,e){"undefined"===typeof e&&(e=1);h=h||0;k=k||"black";var q=15<d-c&&15<f-b?8:0.35*Math.min(d-c,f-b);a.beginPath();a.moveTo(c,b);a.save();a.fillStyle=g;a.globalAlpha=e;a.fillRect(c,b,d-c,f-b);a.globalAlpha=1;0<h&&(e=0===h%2?0:0.5,a.beginPath(),a.lineWidth=h,a.strokeStyle=k,a.moveTo(c,b),a.rect(c-e,b-e,d-c+2*e,f-b+2*e),a.stroke());a.restore();!0===l&&(a.save(),a.beginPath(),a.moveTo(c,
b),a.lineTo(c+q,b+q),a.lineTo(d-q,b+q),a.lineTo(d,b),a.closePath(),h=a.createLinearGradient((d+c)/2,b+q,(d+c)/2,b),h.addColorStop(0,g),h.addColorStop(1,"rgba(255, 255, 255, .4)"),a.fillStyle=h,a.fill(),a.restore());!0===m&&(a.save(),a.beginPath(),a.moveTo(c,f),a.lineTo(c+q,f-q),a.lineTo(d-q,f-q),a.lineTo(d,f),a.closePath(),h=a.createLinearGradient((d+c)/2,f-q,(d+c)/2,f),h.addColorStop(0,g),h.addColorStop(1,"rgba(255, 255, 255, .4)"),a.fillStyle=h,a.fill(),a.restore());!0===p&&(a.save(),a.beginPath(),
a.moveTo(c,b),a.lineTo(c+q,b+q),a.lineTo(c+q,f-q),a.lineTo(c,f),a.closePath(),h=a.createLinearGradient(c+q,(f+b)/2,c,(f+b)/2),h.addColorStop(0,g),h.addColorStop(1,"rgba(255, 255, 255, 0.1)"),a.fillStyle=h,a.fill(),a.restore());!0===n&&(a.save(),a.beginPath(),a.moveTo(d,b),a.lineTo(d-q,b+q),a.lineTo(d-q,f-q),a.lineTo(d,f),h=a.createLinearGradient(d-q,(f+b)/2,d,(f+b)/2),h.addColorStop(0,g),h.addColorStop(1,"rgba(255, 255, 255, 0.1)"),a.fillStyle=h,h.addColorStop(0,g),h.addColorStop(1,"rgba(255, 255, 255, 0.1)"),
a.fillStyle=h,a.fill(),a.closePath(),a.restore())};y.prototype.renderColumn=function(a){var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var b=null,d=this.plotArea,f=0,g,h,k,l=a.axisY.convertValueToPixel(a.axisY.logarithmic?a.axisY.viewportMinimum:0),f=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:1,m=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?this.dataPointWidth:Math.min(0.15*this.width,0.9*(this.plotArea.width/
a.plotType.totalDataSeries))<<0,p=a.axisX.dataInfo.minDiff;isFinite(p)||(p=0.3*Math.abs(a.axisX.range));p=this.dataPointWidth?this.dataPointWidth:0.9*(d.width*(a.axisX.logarithmic?Math.log(p)/Math.log(a.axisX.range):Math.abs(p)/Math.abs(a.axisX.range))/a.plotType.totalDataSeries)<<0;this.dataPointMaxWidth&&f>m&&(f=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,m));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&m<f)&&(m=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,f));p<
f&&(p=f);p>m&&(p=m);c.save();u&&this._eventManager.ghostCtx.save();c.beginPath();c.rect(d.x1,d.y1,d.width,d.height);c.clip();u&&(this._eventManager.ghostCtx.beginPath(),this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());for(d=0;d<a.dataSeriesIndexes.length;d++){var m=a.dataSeriesIndexes[d],n=this.data[m],e=n.dataPoints;if(0<e.length)for(var q=5<p&&n.bevelEnabled?!0:!1,f=0;f<e.length;f++)if(e[f].getTime?k=e[f].x.getTime():k=e[f].x,!(k<a.axisX.dataInfo.viewPortMin||
k>a.axisX.dataInfo.viewPortMax)&&"number"===typeof e[f].y){g=a.axisX.convertValueToPixel(k);h=a.axisY.convertValueToPixel(e[f].y);g=a.axisX.reversed?g+a.plotType.totalDataSeries*p/2-(a.previousDataSeriesCount+d)*p<<0:g-a.plotType.totalDataSeries*p/2+(a.previousDataSeriesCount+d)*p<<0;var r=a.axisX.reversed?g-p<<0:g+p<<0,s;0<=e[f].y?s=l:(s=h,h=l);h>s&&(b=h,h=s,s=b);b=e[f].color?e[f].color:n._colorSet[f%n._colorSet.length];L(c,g,h,r,s,b,0,null,q&&0<=e[f].y,0>e[f].y&&q,!1,!1,n.fillOpacity);b=n.dataPointIds[f];
this._eventManager.objectMap[b]={id:b,objectType:"dataPoint",dataSeriesIndex:m,dataPointIndex:f,x1:g,y1:h,x2:r,y2:s};b=D(b);u&&L(this._eventManager.ghostCtx,g,h,r,s,b,0,null,!1,!1,!1,!1);(e[f].indexLabel||n.indexLabel||e[f].indexLabelFormatter||n.indexLabelFormatter)&&this._indexLabels.push({chartType:"column",dataPoint:e[f],dataSeries:n,point:{x:g+(r-g)/2,y:0>e[f].y===a.axisY.reversed?h:s},direction:0>e[f].y===a.axisY.reversed?1:-1,bounds:{x1:g,y1:Math.min(h,s),x2:r,y2:Math.max(h,s)},color:b})}}c.restore();
u&&this._eventManager.ghostCtx.restore();a=Math.min(l,a.axisY.bounds.y2);return{source:c,dest:this.plotArea.ctx,animationCallback:F.yScaleAnimation,easingFunction:F.easing.easeOutQuart,animationBase:a}}};y.prototype.renderStackedColumn=function(a){var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var b=null,d=this.plotArea,f=[],g=[],h=[],k=0,l,m=a.axisY.convertValueToPixel(a.axisY.logarithmic?a.axisY.viewportMinimum:0),k=this.dataPointMinWidth?this.dataPointMinWidth:
this.dataPointWidth?this.dataPointWidth:1,p=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?this.dataPointWidth:0.15*this.width<<0,n=a.axisX.dataInfo.minDiff;isFinite(n)||(n=0.3*Math.abs(a.axisX.range));n=this.dataPointWidth?this.dataPointWidth:0.9*(d.width*(a.axisX.logarithmic?Math.log(n)/Math.log(a.axisX.range):Math.abs(n)/Math.abs(a.axisX.range))/a.plotType.plotUnits.length)<<0;this.dataPointMaxWidth&&k>p&&(k=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,p));!this.dataPointMaxWidth&&
(this.dataPointMinWidth&&p<k)&&(p=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,k));n<k&&(n=k);n>p&&(n=p);c.save();u&&this._eventManager.ghostCtx.save();c.beginPath();c.rect(d.x1,d.y1,d.width,d.height);c.clip();u&&(this._eventManager.ghostCtx.beginPath(),this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());for(p=0;p<a.dataSeriesIndexes.length;p++){var e=a.dataSeriesIndexes[p],q=this.data[e],r=q.dataPoints;if(0<r.length){var s=5<n&&q.bevelEnabled?
!0:!1;c.strokeStyle="#4572A7 ";for(k=0;k<r.length;k++)if(b=r[k].x.getTime?r[k].x.getTime():r[k].x,!(b<a.axisX.dataInfo.viewPortMin||b>a.axisX.dataInfo.viewPortMax)&&"number"===typeof r[k].y){var d=a.axisX.convertValueToPixel(b),z=d-a.plotType.plotUnits.length*n/2+a.index*n<<0,v=z+n<<0,t;if(a.axisY.logarithmic)h[b]=r[k].y+(h[b]?h[b]:0),0<h[b]&&(l=a.axisY.convertValueToPixel(h[b]),t=f[b]?f[b]:m,f[b]=l);else if(l=a.axisY.convertValueToPixel(r[k].y),0<=r[k].y){var w=f[b]?f[b]:0;l-=w;t=m-w;f[b]=w+(t-l)}else w=
g[b]?g[b]:0,t=l+w,l=m+w,g[b]=w+(t-l);b=r[k].color?r[k].color:q._colorSet[k%q._colorSet.length];L(c,z,l,v,t,b,0,null,s&&0<=r[k].y,0>r[k].y&&s,!1,!1,q.fillOpacity);b=q.dataPointIds[k];this._eventManager.objectMap[b]={id:b,objectType:"dataPoint",dataSeriesIndex:e,dataPointIndex:k,x1:z,y1:l,x2:v,y2:t};b=D(b);u&&L(this._eventManager.ghostCtx,z,l,v,t,b,0,null,!1,!1,!1,!1);(r[k].indexLabel||q.indexLabel||r[k].indexLabelFormatter||q.indexLabelFormatter)&&this._indexLabels.push({chartType:"stackedColumn",
dataPoint:r[k],dataSeries:q,point:{x:d,y:0<=r[k].y?l:t},direction:0>r[k].y===a.axisY.reversed?1:-1,bounds:{x1:z,y1:Math.min(l,t),x2:v,y2:Math.max(l,t)},color:b})}}}c.restore();u&&this._eventManager.ghostCtx.restore();a=Math.min(m,a.axisY.bounds.y2);return{source:c,dest:this.plotArea.ctx,animationCallback:F.yScaleAnimation,easingFunction:F.easing.easeOutQuart,animationBase:a}}};y.prototype.renderStackedColumn100=function(a){var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var b=
null,d=this.plotArea,f=[],g=[],h=[],k=0,l,m=a.axisY.convertValueToPixel(a.axisY.logarithmic?a.axisY.viewportMinimum:0),k=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:1,p=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?this.dataPointWidth:0.15*this.width<<0,n=a.axisX.dataInfo.minDiff;isFinite(n)||(n=0.3*Math.abs(a.axisX.range));n=this.dataPointWidth?this.dataPointWidth:0.9*(d.width*(a.axisX.logarithmic?Math.log(n)/Math.log(a.axisX.range):Math.abs(n)/
Math.abs(a.axisX.range))/a.plotType.plotUnits.length)<<0;this.dataPointMaxWidth&&k>p&&(k=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,p));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&p<k)&&(p=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,k));n<k&&(n=k);n>p&&(n=p);c.save();u&&this._eventManager.ghostCtx.save();c.beginPath();c.rect(d.x1,d.y1,d.width,d.height);c.clip();u&&(this._eventManager.ghostCtx.beginPath(),this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),
this._eventManager.ghostCtx.clip());for(p=0;p<a.dataSeriesIndexes.length;p++){var e=a.dataSeriesIndexes[p],q=this.data[e],r=q.dataPoints;if(0<r.length)for(var s=5<n&&q.bevelEnabled?!0:!1,k=0;k<r.length;k++)if(b=r[k].x.getTime?r[k].x.getTime():r[k].x,!(b<a.axisX.dataInfo.viewPortMin||b>a.axisX.dataInfo.viewPortMax)&&"number"===typeof r[k].y){d=a.axisX.convertValueToPixel(b);l=0!==a.dataPointYSums[b]?100*(r[k].y/a.dataPointYSums[b]):0;var z=d-a.plotType.plotUnits.length*n/2+a.index*n<<0,v=z+n<<0,t;
if(a.axisY.logarithmic){h[b]=l+(h[b]?h[b]:0);if(0>=h[b])continue;l=a.axisY.convertValueToPixel(h[b]);t=f[b]?f[b]:m;f[b]=l}else if(l=a.axisY.convertValueToPixel(l),0<=r[k].y){var w=f[b]?f[b]:0;l-=w;t=m-w;f[b]=w+(t-l)}else w=g[b]?g[b]:0,t=l+w,l=m+w,g[b]=w+(t-l);b=r[k].color?r[k].color:q._colorSet[k%q._colorSet.length];L(c,z,l,v,t,b,0,null,s&&0<=r[k].y,0>r[k].y&&s,!1,!1,q.fillOpacity);b=q.dataPointIds[k];this._eventManager.objectMap[b]={id:b,objectType:"dataPoint",dataSeriesIndex:e,dataPointIndex:k,
x1:z,y1:l,x2:v,y2:t};b=D(b);u&&L(this._eventManager.ghostCtx,z,l,v,t,b,0,null,!1,!1,!1,!1);(r[k].indexLabel||q.indexLabel||r[k].indexLabelFormatter||q.indexLabelFormatter)&&this._indexLabels.push({chartType:"stackedColumn100",dataPoint:r[k],dataSeries:q,point:{x:d,y:0<=r[k].y?l:t},direction:0>r[k].y===a.axisY.reversed?1:-1,bounds:{x1:z,y1:Math.min(l,t),x2:v,y2:Math.max(l,t)},color:b})}}c.restore();u&&this._eventManager.ghostCtx.restore();a=Math.min(m,a.axisY.bounds.y2);return{source:c,dest:this.plotArea.ctx,
animationCallback:F.yScaleAnimation,easingFunction:F.easing.easeOutQuart,animationBase:a}}};y.prototype.renderBar=function(a){var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var b=null,d=this.plotArea,f=0,g,h,k,l=a.axisY.convertValueToPixel(a.axisY.logarithmic?a.axisY.viewportMinimum:0),f=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:1,m=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?this.dataPointWidth:Math.min(0.15*
this.height,0.9*(this.plotArea.height/a.plotType.totalDataSeries))<<0,p=a.axisX.dataInfo.minDiff;isFinite(p)||(p=0.3*Math.abs(a.axisX.range));p=this.dataPointWidth?this.dataPointWidth:0.9*(d.height*(a.axisX.logarithmic?Math.log(p)/Math.log(a.axisX.range):Math.abs(p)/Math.abs(a.axisX.range))/a.plotType.totalDataSeries)<<0;this.dataPointMaxWidth&&f>m&&(f=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,m));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&m<f)&&(m=Math.max(this.dataPointWidth?
this.dataPointWidth:-Infinity,f));p<f&&(p=f);p>m&&(p=m);c.save();u&&this._eventManager.ghostCtx.save();c.beginPath();c.rect(d.x1,d.y1,d.width,d.height);c.clip();u&&(this._eventManager.ghostCtx.beginPath(),this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());for(d=0;d<a.dataSeriesIndexes.length;d++){var m=a.dataSeriesIndexes[d],n=this.data[m],e=n.dataPoints;if(0<e.length){var q=5<p&&n.bevelEnabled?!0:!1;c.strokeStyle="#4572A7 ";for(f=0;f<e.length;f++)if(e[f].getTime?
k=e[f].x.getTime():k=e[f].x,!(k<a.axisX.dataInfo.viewPortMin||k>a.axisX.dataInfo.viewPortMax)&&"number"===typeof e[f].y){h=a.axisX.convertValueToPixel(k);g=a.axisY.convertValueToPixel(e[f].y);h=a.axisX.reversed?h+a.plotType.totalDataSeries*p/2-(a.previousDataSeriesCount+d)*p<<0:h-a.plotType.totalDataSeries*p/2+(a.previousDataSeriesCount+d)*p<<0;var r=a.axisX.reversed?h-p<<0:h+p<<0,s;0<=e[f].y?s=l:(s=g,g=l);b=e[f].color?e[f].color:n._colorSet[f%n._colorSet.length];L(c,s,h,g,r,b,0,null,q,!1,!1,!1,n.fillOpacity);
b=n.dataPointIds[f];this._eventManager.objectMap[b]={id:b,objectType:"dataPoint",dataSeriesIndex:m,dataPointIndex:f,x1:s,y1:h,x2:g,y2:r};b=D(b);u&&L(this._eventManager.ghostCtx,s,h,g,r,b,0,null,!1,!1,!1,!1);(e[f].indexLabel||n.indexLabel||e[f].indexLabelFormatter||n.indexLabelFormatter)&&this._indexLabels.push({chartType:"bar",dataPoint:e[f],dataSeries:n,point:{x:0<=e[f].y?g:s,y:h+(r-h)/2},direction:0>e[f].y===a.axisY.reversed?1:-1,bounds:{x1:Math.min(s,g),y1:h,x2:Math.max(s,g),y2:r},color:b})}}}c.restore();
u&&this._eventManager.ghostCtx.restore();a=Math.max(l,a.axisX.bounds.x2);return{source:c,dest:this.plotArea.ctx,animationCallback:F.xScaleAnimation,easingFunction:F.easing.easeOutQuart,animationBase:a}}};y.prototype.renderStackedBar=function(a){var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var b=null,d=this.plotArea,f=[],g=[],h=[],k=0,l,m=a.axisY.convertValueToPixel(a.axisY.logarithmic?a.axisY.viewportMinimum:0),k=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?
this.dataPointWidth:1,p=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?this.dataPointWidth:0.15*this.height<<0,n=a.axisX.dataInfo.minDiff;isFinite(n)||(n=0.3*Math.abs(a.axisX.range));n=this.dataPointWidth?this.dataPointWidth:0.9*(d.height*(a.axisX.logarithmic?Math.log(n)/Math.log(a.axisX.range):Math.abs(n)/Math.abs(a.axisX.range))/a.plotType.plotUnits.length)<<0;this.dataPointMaxWidth&&k>p&&(k=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,p));!this.dataPointMaxWidth&&
(this.dataPointMinWidth&&p<k)&&(p=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,k));n<k&&(n=k);n>p&&(n=p);c.save();u&&this._eventManager.ghostCtx.save();c.beginPath();c.rect(d.x1,d.y1,d.width,d.height);c.clip();u&&(this._eventManager.ghostCtx.beginPath(),this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());for(p=0;p<a.dataSeriesIndexes.length;p++){var e=a.dataSeriesIndexes[p],q=this.data[e],r=q.dataPoints;if(0<r.length){var s=5<n&&q.bevelEnabled?
!0:!1;c.strokeStyle="#4572A7 ";for(k=0;k<r.length;k++)if(b=r[k].x.getTime?r[k].x.getTime():r[k].x,!(b<a.axisX.dataInfo.viewPortMin||b>a.axisX.dataInfo.viewPortMax)&&"number"===typeof r[k].y){var d=a.axisX.convertValueToPixel(b),z=d-a.plotType.plotUnits.length*n/2+a.index*n<<0,v=z+n<<0,t;if(a.axisY.logarithmic)h[b]=r[k].y+(h[b]?h[b]:0),0<h[b]&&(t=f[b]?f[b]:m,f[b]=l=a.axisY.convertValueToPixel(h[b]));else if(l=a.axisY.convertValueToPixel(r[k].y),0<=r[k].y){var w=f[b]?f[b]:0;t=m+w;l+=w;f[b]=w+(l-t)}else w=
g[b]?g[b]:0,t=l-w,l=m-w,g[b]=w+(l-t);b=r[k].color?r[k].color:q._colorSet[k%q._colorSet.length];L(c,t,z,l,v,b,0,null,s,!1,!1,!1,q.fillOpacity);b=q.dataPointIds[k];this._eventManager.objectMap[b]={id:b,objectType:"dataPoint",dataSeriesIndex:e,dataPointIndex:k,x1:t,y1:z,x2:l,y2:v};b=D(b);u&&L(this._eventManager.ghostCtx,t,z,l,v,b,0,null,!1,!1,!1,!1);(r[k].indexLabel||q.indexLabel||r[k].indexLabelFormatter||q.indexLabelFormatter)&&this._indexLabels.push({chartType:"stackedBar",dataPoint:r[k],dataSeries:q,
point:{x:0<=r[k].y?l:t,y:d},direction:0>r[k].y===a.axisY.reversed?1:-1,bounds:{x1:Math.min(t,l),y1:z,x2:Math.max(t,l),y2:v},color:b})}}}c.restore();u&&this._eventManager.ghostCtx.restore();a=Math.max(m,a.axisX.bounds.x2);return{source:c,dest:this.plotArea.ctx,animationCallback:F.xScaleAnimation,easingFunction:F.easing.easeOutQuart,animationBase:a}}};y.prototype.renderStackedBar100=function(a){var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var b=null,d=this.plotArea,
f=[],g=[],h=[],k=0,l,m=a.axisY.convertValueToPixel(a.axisY.logarithmic?a.axisY.viewportMinimum:0),k=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:1,p=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?this.dataPointWidth:0.15*this.height<<0,n=a.axisX.dataInfo.minDiff;isFinite(n)||(n=0.3*Math.abs(a.axisX.range));n=this.dataPointWidth?this.dataPointWidth:0.9*(d.height*(a.axisX.logarithmic?Math.log(n)/Math.log(a.axisX.range):Math.abs(n)/Math.abs(a.axisX.range))/
a.plotType.plotUnits.length)<<0;this.dataPointMaxWidth&&k>p&&(k=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,p));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&p<k)&&(p=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,k));n<k&&(n=k);n>p&&(n=p);c.save();u&&this._eventManager.ghostCtx.save();c.beginPath();c.rect(d.x1,d.y1,d.width,d.height);c.clip();u&&(this._eventManager.ghostCtx.beginPath(),this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());
for(p=0;p<a.dataSeriesIndexes.length;p++){var e=a.dataSeriesIndexes[p],q=this.data[e],r=q.dataPoints;if(0<r.length){var s=5<n&&q.bevelEnabled?!0:!1;c.strokeStyle="#4572A7 ";for(k=0;k<r.length;k++)if(b=r[k].x.getTime?r[k].x.getTime():r[k].x,!(b<a.axisX.dataInfo.viewPortMin||b>a.axisX.dataInfo.viewPortMax)&&"number"===typeof r[k].y){var d=a.axisX.convertValueToPixel(b),z;z=0!==a.dataPointYSums[b]?100*(r[k].y/a.dataPointYSums[b]):0;var v=d-a.plotType.plotUnits.length*n/2+a.index*n<<0,t=v+n<<0;if(a.axisY.logarithmic){h[b]=
z+(h[b]?h[b]:0);if(0>=h[b])continue;z=f[b]?f[b]:m;f[b]=l=a.axisY.convertValueToPixel(h[b])}else if(l=a.axisY.convertValueToPixel(z),0<=r[k].y){var w=f[b]?f[b]:0;z=m+w;l+=w;f[b]=w+(l-z)}else w=g[b]?g[b]:0,z=l-w,l=m-w,g[b]=w+(l-z);b=r[k].color?r[k].color:q._colorSet[k%q._colorSet.length];L(c,z,v,l,t,b,0,null,s,!1,!1,!1,q.fillOpacity);b=q.dataPointIds[k];this._eventManager.objectMap[b]={id:b,objectType:"dataPoint",dataSeriesIndex:e,dataPointIndex:k,x1:z,y1:v,x2:l,y2:t};b=D(b);u&&L(this._eventManager.ghostCtx,
z,v,l,t,b,0,null,!1,!1,!1,!1);(r[k].indexLabel||q.indexLabel||r[k].indexLabelFormatter||q.indexLabelFormatter)&&this._indexLabels.push({chartType:"stackedBar100",dataPoint:r[k],dataSeries:q,point:{x:0<=r[k].y?l:z,y:d},direction:0>r[k].y===a.axisY.reversed?1:-1,bounds:{x1:Math.min(z,l),y1:v,x2:Math.max(z,l),y2:t},color:b})}}}c.restore();u&&this._eventManager.ghostCtx.restore();a=Math.max(m,a.axisX.bounds.x2);return{source:c,dest:this.plotArea.ctx,animationCallback:F.xScaleAnimation,easingFunction:F.easing.easeOutQuart,
animationBase:a}}};y.prototype.renderArea=function(a){function c(){t&&(0<m.lineThickness&&b.stroke(),a.axisY.logarithmic||0>=a.axisY.viewportMinimum&&0<=a.axisY.viewportMaximum?v=z:0>a.axisY.viewportMaximum?v=g.y1:0<a.axisY.viewportMinimum&&(v=f.y2),b.lineTo(q,v),b.lineTo(t.x,v),b.closePath(),b.globalAlpha=m.fillOpacity,b.fill(),b.globalAlpha=1,u&&(d.lineTo(q,v),d.lineTo(t.x,v),d.closePath(),d.fill()),b.beginPath(),b.moveTo(q,r),d.beginPath(),d.moveTo(q,r),t={x:q,y:r})}var b=a.targetCanvasCtx||this.plotArea.ctx;
if(!(0>=a.dataSeriesIndexes.length)){var d=this._eventManager.ghostCtx,f=a.axisX.lineCoordinates,g=a.axisY.lineCoordinates,h=[],k=this.plotArea;b.save();u&&d.save();b.beginPath();b.rect(k.x1,k.y1,k.width,k.height);b.clip();u&&(d.beginPath(),d.rect(k.x1,k.y1,k.width,k.height),d.clip());for(k=0;k<a.dataSeriesIndexes.length;k++){var l=a.dataSeriesIndexes[k],m=this.data[l],p=m.dataPoints,h=m.id;this._eventManager.objectMap[h]={objectType:"dataSeries",dataSeriesIndex:l};h=D(h);d.fillStyle=h;var h=[],n=
!0,e=0,q,r,s,z=a.axisY.convertValueToPixel(a.axisY.logarithmic?a.axisY.viewportMinimum:0),v,t=null;if(0<p.length){var w=m._colorSet[e%m._colorSet.length],x=m.options.lineColor||w,y=x;b.fillStyle=w;b.strokeStyle=x;b.lineWidth=m.lineThickness;var B="solid";if(b.setLineDash){var A=E(m.nullDataLineDashType,m.lineThickness),B=m.lineDashType,R=E(B,m.lineThickness);b.setLineDash(R)}for(var N=!0;e<p.length;e++)if(s=p[e].x.getTime?p[e].x.getTime():p[e].x,!(s<a.axisX.dataInfo.viewPortMin||s>a.axisX.dataInfo.viewPortMax&&
(!m.connectNullData||!N)))if("number"!==typeof p[e].y)m.connectNullData||(N||n)||c(),N=!0;else{q=a.axisX.convertValueToPixel(s);r=a.axisY.convertValueToPixel(p[e].y);n||N?(!n&&m.connectNullData?(b.setLineDash&&(m.options.nullDataLineDashType||B===m.lineDashType&&m.lineDashType!==m.nullDataLineDashType)&&(b.stroke(),B=m.nullDataLineDashType,b.setLineDash(A)),b.lineTo(q,r),u&&d.lineTo(q,r)):(b.beginPath(),b.moveTo(q,r),u&&(d.beginPath(),d.moveTo(q,r)),t={x:q,y:r}),N=n=!1):(b.lineTo(q,r),u&&d.lineTo(q,
r),0==e%250&&c());e<p.length-1&&(y!==(p[e].lineColor||x)||B!==(p[e].lineDashType||m.lineDashType))&&(c(),y=p[e].lineColor||x,b.strokeStyle=y,b.setLineDash&&(p[e].lineDashType?(B=p[e].lineDashType,b.setLineDash(E(B,m.lineThickness))):(B=m.lineDashType,b.setLineDash(R))));var H=m.dataPointIds[e];this._eventManager.objectMap[H]={id:H,objectType:"dataPoint",dataSeriesIndex:l,dataPointIndex:e,x1:q,y1:r};0!==p[e].markerSize&&(0<p[e].markerSize||0<m.markerSize)&&(s=m.getMarkerProperties(e,q,r,b),h.push(s),
H=D(H),u&&h.push({x:q,y:r,ctx:d,type:s.type,size:s.size,color:H,borderColor:H,borderThickness:s.borderThickness}));(p[e].indexLabel||m.indexLabel||p[e].indexLabelFormatter||m.indexLabelFormatter)&&this._indexLabels.push({chartType:"area",dataPoint:p[e],dataSeries:m,point:{x:q,y:r},direction:0>p[e].y===a.axisY.reversed?1:-1,color:w})}c();M.drawMarkers(h)}}b.restore();u&&this._eventManager.ghostCtx.restore();return{source:b,dest:this.plotArea.ctx,animationCallback:F.xClipAnimation,easingFunction:F.easing.linear,
animationBase:0}}};y.prototype.renderSplineArea=function(a){function c(){var c=ua(v,2);if(0<c.length){if(0<m.lineThickness){b.beginPath();b.moveTo(c[0].x,c[0].y);c[0].newStrokeStyle&&(b.strokeStyle=c[0].newStrokeStyle);c[0].newLineDashArray&&b.setLineDash(c[0].newLineDashArray);for(var e=0;e<c.length-3;e+=3)if(b.bezierCurveTo(c[e+1].x,c[e+1].y,c[e+2].x,c[e+2].y,c[e+3].x,c[e+3].y),u&&d.bezierCurveTo(c[e+1].x,c[e+1].y,c[e+2].x,c[e+2].y,c[e+3].x,c[e+3].y),c[e+3].newStrokeStyle||c[e+3].newLineDashArray)b.stroke(),
b.beginPath(),b.moveTo(c[e+3].x,c[e+3].y),c[e+3].newStrokeStyle&&(b.strokeStyle=c[e+3].newStrokeStyle),c[e+3].newLineDashArray&&b.setLineDash(c[e+3].newLineDashArray);b.stroke()}b.beginPath();b.moveTo(c[0].x,c[0].y);u&&(d.beginPath(),d.moveTo(c[0].x,c[0].y));for(e=0;e<c.length-3;e+=3)b.bezierCurveTo(c[e+1].x,c[e+1].y,c[e+2].x,c[e+2].y,c[e+3].x,c[e+3].y),u&&d.bezierCurveTo(c[e+1].x,c[e+1].y,c[e+2].x,c[e+2].y,c[e+3].x,c[e+3].y);a.axisY.logarithmic||0>=a.axisY.viewportMinimum&&0<=a.axisY.viewportMaximum?
s=r:0>a.axisY.viewportMaximum?s=g.y1:0<a.axisY.viewportMinimum&&(s=f.y2);z={x:c[0].x,y:c[0].y};b.lineTo(c[c.length-1].x,s);b.lineTo(z.x,s);b.closePath();b.globalAlpha=m.fillOpacity;b.fill();b.globalAlpha=1;u&&(d.lineTo(c[c.length-1].x,s),d.lineTo(z.x,s),d.closePath(),d.fill())}}var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var d=this._eventManager.ghostCtx,f=a.axisX.lineCoordinates,g=a.axisY.lineCoordinates,h=[],k=this.plotArea;b.save();u&&d.save();b.beginPath();
b.rect(k.x1,k.y1,k.width,k.height);b.clip();u&&(d.beginPath(),d.rect(k.x1,k.y1,k.width,k.height),d.clip());for(k=0;k<a.dataSeriesIndexes.length;k++){var l=a.dataSeriesIndexes[k],m=this.data[l],p=m.dataPoints,h=m.id;this._eventManager.objectMap[h]={objectType:"dataSeries",dataSeriesIndex:l};h=D(h);d.fillStyle=h;var h=[],n=0,e,q,r=a.axisY.convertValueToPixel(a.axisY.logarithmic?a.axisY.viewportMinimum:0),s,z=null,v=[];if(0<p.length){var t=m._colorSet[n%m._colorSet.length],w=m.options.lineColor||t,x=
w;b.fillStyle=t;b.strokeStyle=w;b.lineWidth=m.lineThickness;var y="solid";if(b.setLineDash){var B=E(m.nullDataLineDashType,m.lineThickness),y=m.lineDashType,A=E(y,m.lineThickness);b.setLineDash(A)}for(q=!1;n<p.length;n++)if(e=p[n].x.getTime?p[n].x.getTime():p[n].x,!(e<a.axisX.dataInfo.viewPortMin||e>a.axisX.dataInfo.viewPortMax&&(!m.connectNullData||!q)))if("number"!==typeof p[n].y)0<n&&!q&&(m.connectNullData?b.setLineDash&&(0<v.length&&(m.options.nullDataLineDashType||!p[n-1].lineDashType))&&(v[v.length-
1].newLineDashArray=B,y=m.nullDataLineDashType):(c(),v=[])),q=!0;else{e=a.axisX.convertValueToPixel(e);q=a.axisY.convertValueToPixel(p[n].y);var R=m.dataPointIds[n];this._eventManager.objectMap[R]={id:R,objectType:"dataPoint",dataSeriesIndex:l,dataPointIndex:n,x1:e,y1:q};v[v.length]={x:e,y:q};n<p.length-1&&(x!==(p[n].lineColor||w)||y!==(p[n].lineDashType||m.lineDashType))&&(x=p[n].lineColor||w,v[v.length-1].newStrokeStyle=x,b.setLineDash&&(p[n].lineDashType?(y=p[n].lineDashType,v[v.length-1].newLineDashArray=
E(y,m.lineThickness)):(y=m.lineDashType,v[v.length-1].newLineDashArray=A)));if(0!==p[n].markerSize&&(0<p[n].markerSize||0<m.markerSize)){var N=m.getMarkerProperties(n,e,q,b);h.push(N);R=D(R);u&&h.push({x:e,y:q,ctx:d,type:N.type,size:N.size,color:R,borderColor:R,borderThickness:N.borderThickness})}(p[n].indexLabel||m.indexLabel||p[n].indexLabelFormatter||m.indexLabelFormatter)&&this._indexLabels.push({chartType:"splineArea",dataPoint:p[n],dataSeries:m,point:{x:e,y:q},direction:0>p[n].y===a.axisY.reversed?
1:-1,color:t});q=!1}c();M.drawMarkers(h)}}b.restore();u&&this._eventManager.ghostCtx.restore();return{source:b,dest:this.plotArea.ctx,animationCallback:F.xClipAnimation,easingFunction:F.easing.linear,animationBase:0}}};y.prototype.renderStepArea=function(a){function c(){t&&(0<m.lineThickness&&b.stroke(),a.axisY.logarithmic||0>=a.axisY.viewportMinimum&&0<=a.axisY.viewportMaximum?v=z:0>a.axisY.viewportMaximum?v=g.y1:0<a.axisY.viewportMinimum&&(v=f.y2),b.lineTo(q,v),b.lineTo(t.x,v),b.closePath(),b.globalAlpha=
m.fillOpacity,b.fill(),b.globalAlpha=1,u&&(d.lineTo(q,v),d.lineTo(t.x,v),d.closePath(),d.fill()),b.beginPath(),b.moveTo(q,r),d.beginPath(),d.moveTo(q,r),t={x:q,y:r})}var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var d=this._eventManager.ghostCtx,f=a.axisX.lineCoordinates,g=a.axisY.lineCoordinates,h=[],k=this.plotArea;b.save();u&&d.save();b.beginPath();b.rect(k.x1,k.y1,k.width,k.height);b.clip();u&&(d.beginPath(),d.rect(k.x1,k.y1,k.width,k.height),d.clip());for(k=
0;k<a.dataSeriesIndexes.length;k++){var l=a.dataSeriesIndexes[k],m=this.data[l],p=m.dataPoints,h=m.id;this._eventManager.objectMap[h]={objectType:"dataSeries",dataSeriesIndex:l};h=D(h);d.fillStyle=h;var h=[],n=!0,e=0,q,r,s,z=a.axisY.convertValueToPixel(a.axisY.logarithmic?a.axisY.viewportMinimum:0),v,t=null,w=!1;if(0<p.length){var x=m._colorSet[e%m._colorSet.length],y=m.options.lineColor||x,B=y;b.fillStyle=x;b.strokeStyle=y;b.lineWidth=m.lineThickness;var A="solid";if(b.setLineDash){var R=E(m.nullDataLineDashType,
m.lineThickness),A=m.lineDashType,N=E(A,m.lineThickness);b.setLineDash(N)}for(;e<p.length;e++)if(s=p[e].x.getTime?p[e].x.getTime():p[e].x,!(s<a.axisX.dataInfo.viewPortMin||s>a.axisX.dataInfo.viewPortMax&&(!m.connectNullData||!w))){var H=r;"number"!==typeof p[e].y?(m.connectNullData||(w||n)||c(),w=!0):(q=a.axisX.convertValueToPixel(s),r=a.axisY.convertValueToPixel(p[e].y),n||w?(!n&&m.connectNullData?(b.setLineDash&&(m.options.nullDataLineDashType||A===m.lineDashType&&m.lineDashType!==m.nullDataLineDashType)&&
(b.stroke(),A=m.nullDataLineDashType,b.setLineDash(R)),b.lineTo(q,H),b.lineTo(q,r),u&&(d.lineTo(q,H),d.lineTo(q,r))):(b.beginPath(),b.moveTo(q,r),u&&(d.beginPath(),d.moveTo(q,r)),t={x:q,y:r}),w=n=!1):(b.lineTo(q,H),u&&d.lineTo(q,H),b.lineTo(q,r),u&&d.lineTo(q,r),0==e%250&&c()),e<p.length-1&&(B!==(p[e].lineColor||y)||A!==(p[e].lineDashType||m.lineDashType))&&(c(),B=p[e].lineColor||y,b.strokeStyle=B,b.setLineDash&&(p[e].lineDashType?(A=p[e].lineDashType,b.setLineDash(E(A,m.lineThickness))):(A=m.lineDashType,
b.setLineDash(N)))),H=m.dataPointIds[e],this._eventManager.objectMap[H]={id:H,objectType:"dataPoint",dataSeriesIndex:l,dataPointIndex:e,x1:q,y1:r},0!==p[e].markerSize&&(0<p[e].markerSize||0<m.markerSize)&&(s=m.getMarkerProperties(e,q,r,b),h.push(s),H=D(H),u&&h.push({x:q,y:r,ctx:d,type:s.type,size:s.size,color:H,borderColor:H,borderThickness:s.borderThickness})),(p[e].indexLabel||m.indexLabel||p[e].indexLabelFormatter||m.indexLabelFormatter)&&this._indexLabels.push({chartType:"stepArea",dataPoint:p[e],
dataSeries:m,point:{x:q,y:r},direction:0>p[e].y===a.axisY.reversed?1:-1,color:x}))}c();M.drawMarkers(h)}}b.restore();u&&this._eventManager.ghostCtx.restore();return{source:b,dest:this.plotArea.ctx,animationCallback:F.xClipAnimation,easingFunction:F.easing.linear,animationBase:0}}};y.prototype.renderStackedArea=function(a){function c(){if(!(1>k.length)){for(0<t.lineThickness&&b.stroke();0<k.length;){var a=k.pop();b.lineTo(a.x,a.y);u&&s.lineTo(a.x,a.y)}b.closePath();b.globalAlpha=t.fillOpacity;b.fill();
b.globalAlpha=1;b.beginPath();u&&(s.closePath(),s.fill(),s.beginPath());k=[]}}var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var d=null,f=[],g=this.plotArea,h=[],k=[],l=[],m=[],p=0,n,e,q,r=a.axisY.convertValueToPixel(a.axisY.logarithmic?a.axisY.viewportMinimum:0),s=this._eventManager.ghostCtx;u&&s.beginPath();b.save();u&&s.save();b.beginPath();b.rect(g.x1,g.y1,g.width,g.height);b.clip();u&&(s.beginPath(),s.rect(g.x1,g.y1,g.width,g.height),s.clip());for(var z=[],g=
0;g<a.dataSeriesIndexes.length;g++){var v=a.dataSeriesIndexes[g],t=this.data[v],w=t.dataPoints;t.dataPointIndexes=[];for(p=0;p<w.length;p++)v=w[p].x.getTime?w[p].x.getTime():w[p].x,t.dataPointIndexes[v]=p,z[v]||(l.push(v),z[v]=!0);l.sort(ya)}for(g=0;g<a.dataSeriesIndexes.length;g++){v=a.dataSeriesIndexes[g];t=this.data[v];w=t.dataPoints;z=!0;k=[];p=t.id;this._eventManager.objectMap[p]={objectType:"dataSeries",dataSeriesIndex:v};p=D(p);s.fillStyle=p;if(0<l.length){var d=t._colorSet[0],x=t.options.lineColor||
d,y=x;b.fillStyle=d;b.strokeStyle=x;b.lineWidth=t.lineThickness;var B="solid";if(b.setLineDash){var A=E(t.nullDataLineDashType,t.lineThickness),B=t.lineDashType,R=E(B,t.lineThickness);b.setLineDash(R)}for(var N=!0,p=0;p<l.length;p++){q=l[p];var H=null,H=0<=t.dataPointIndexes[q]?w[t.dataPointIndexes[q]]:{x:q,y:null};if(!(q<a.axisX.dataInfo.viewPortMin||q>a.axisX.dataInfo.viewPortMax&&(!t.connectNullData||!N)))if("number"!==typeof H.y)t.connectNullData||(N||z)||c(),N=!0;else{n=a.axisX.convertValueToPixel(q);
var ea=h[q]?h[q]:0;if(a.axisY.logarithmic){m[q]=H.y+(m[q]?m[q]:0);if(0>=m[q])continue;e=a.axisY.convertValueToPixel(m[q])}else e=a.axisY.convertValueToPixel(H.y),e-=ea;k.push({x:n,y:r-ea});h[q]=r-e;z||N?(!z&&t.connectNullData?(b.setLineDash&&(t.options.nullDataLineDashType||B===t.lineDashType&&t.lineDashType!==t.nullDataLineDashType)&&(b.stroke(),B=t.nullDataLineDashType,b.setLineDash(A)),b.lineTo(n,e),u&&s.lineTo(n,e)):(b.beginPath(),b.moveTo(n,e),u&&(s.beginPath(),s.moveTo(n,e))),N=z=!1):(b.lineTo(n,
e),u&&s.lineTo(n,e),0==p%250&&(c(),b.moveTo(n,e),u&&s.moveTo(n,e),k.push({x:n,y:r-ea})));p<w.length-1&&(y!==(w[p].lineColor||x)||B!==(w[p].lineDashType||t.lineDashType))&&(c(),b.beginPath(),b.moveTo(n,e),k.push({x:n,y:r-ea}),y=w[p].lineColor||x,b.strokeStyle=y,b.setLineDash&&(w[p].lineDashType?(B=w[p].lineDashType,b.setLineDash(E(B,t.lineThickness))):(B=t.lineDashType,b.setLineDash(R))));if(0<=t.dataPointIndexes[q]){var fa=t.dataPointIds[t.dataPointIndexes[q]];this._eventManager.objectMap[fa]={id:fa,
objectType:"dataPoint",dataSeriesIndex:v,dataPointIndex:t.dataPointIndexes[q],x1:n,y1:e}}0<=t.dataPointIndexes[q]&&0!==H.markerSize&&(0<H.markerSize||0<t.markerSize)&&(q=t.getMarkerProperties(p,n,e,b),f.push(q),markerColor=D(fa),u&&f.push({x:n,y:e,ctx:s,type:q.type,size:q.size,color:markerColor,borderColor:markerColor,borderThickness:q.borderThickness}));(H.indexLabel||t.indexLabel||H.indexLabelFormatter||t.indexLabelFormatter)&&this._indexLabels.push({chartType:"stackedArea",dataPoint:H,dataSeries:t,
point:{x:n,y:e},direction:0>w[p].y===a.axisY.reversed?1:-1,color:d})}}c();b.moveTo(n,e);u&&s.moveTo(n,e)}delete t.dataPointIndexes}M.drawMarkers(f);b.restore();u&&s.restore();return{source:b,dest:this.plotArea.ctx,animationCallback:F.xClipAnimation,easingFunction:F.easing.linear,animationBase:0}}};y.prototype.renderStackedArea100=function(a){function c(){for(0<t.lineThickness&&b.stroke();0<k.length;){var a=k.pop();b.lineTo(a.x,a.y);u&&s.lineTo(a.x,a.y)}b.closePath();b.globalAlpha=t.fillOpacity;b.fill();
b.globalAlpha=1;b.beginPath();u&&(s.closePath(),s.fill(),s.beginPath());k=[]}var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var d=null,f=this.plotArea,g=[],h=[],k=[],l=[],m=[],p=0,n,e,q,r=a.axisY.convertValueToPixel(a.axisY.logarithmic?a.axisY.viewportMinimum:0),s=this._eventManager.ghostCtx;b.save();u&&s.save();b.beginPath();b.rect(f.x1,f.y1,f.width,f.height);b.clip();u&&(s.beginPath(),s.rect(f.x1,f.y1,f.width,f.height),s.clip());for(var z=[],f=0;f<a.dataSeriesIndexes.length;f++){var v=
a.dataSeriesIndexes[f],t=this.data[v],w=t.dataPoints;t.dataPointIndexes=[];for(p=0;p<w.length;p++)v=w[p].x.getTime?w[p].x.getTime():w[p].x,t.dataPointIndexes[v]=p,z[v]||(l.push(v),z[v]=!0);l.sort(ya)}for(f=0;f<a.dataSeriesIndexes.length;f++){v=a.dataSeriesIndexes[f];t=this.data[v];w=t.dataPoints;z=!0;d=t.id;this._eventManager.objectMap[d]={objectType:"dataSeries",dataSeriesIndex:v};d=D(d);s.fillStyle=d;k=[];if(0<l.length){var d=t._colorSet[p%t._colorSet.length],x=t.options.lineColor||d,y=x;b.fillStyle=
d;b.strokeStyle=x;b.lineWidth=t.lineThickness;var B="solid";if(b.setLineDash){var A=E(t.nullDataLineDashType,t.lineThickness),B=t.lineDashType,R=E(B,t.lineThickness);b.setLineDash(R)}for(var N=!0,p=0;p<l.length;p++){q=l[p];var H=null,H=0<=t.dataPointIndexes[q]?w[t.dataPointIndexes[q]]:{x:q,y:null};if(!(q<a.axisX.dataInfo.viewPortMin||q>a.axisX.dataInfo.viewPortMax&&(!t.connectNullData||!N)))if("number"!==typeof H.y)t.connectNullData||(N||z)||c(),N=!0;else{var ea;ea=0!==a.dataPointYSums[q]?100*(H.y/
a.dataPointYSums[q]):0;n=a.axisX.convertValueToPixel(q);var fa=h[q]?h[q]:0;if(a.axisY.logarithmic){m[q]=ea+(m[q]?m[q]:0);if(0>=m[q])continue;e=a.axisY.convertValueToPixel(m[q])}else e=a.axisY.convertValueToPixel(ea),e-=fa;k.push({x:n,y:r-fa});h[q]=r-e;z||N?(!z&&t.connectNullData?(b.setLineDash&&(t.options.nullDataLineDashType||B===t.lineDashType&&t.lineDashType!==t.nullDataLineDashType)&&(b.stroke(),B=t.nullDataLineDashType,b.setLineDash(A)),b.lineTo(n,e),u&&s.lineTo(n,e)):(b.beginPath(),b.moveTo(n,
e),u&&(s.beginPath(),s.moveTo(n,e))),N=z=!1):(b.lineTo(n,e),u&&s.lineTo(n,e),0==p%250&&(c(),b.moveTo(n,e),u&&s.moveTo(n,e),k.push({x:n,y:r-fa})));p<w.length-1&&(y!==(w[p].lineColor||x)||B!==(w[p].lineDashType||t.lineDashType))&&(c(),b.beginPath(),b.moveTo(n,e),k.push({x:n,y:r-fa}),y=w[p].lineColor||x,b.strokeStyle=y,b.setLineDash&&(w[p].lineDashType?(B=w[p].lineDashType,b.setLineDash(E(B,t.lineThickness))):(B=t.lineDashType,b.setLineDash(R))));if(0<=t.dataPointIndexes[q]){var Ea=t.dataPointIds[t.dataPointIndexes[q]];
this._eventManager.objectMap[Ea]={id:Ea,objectType:"dataPoint",dataSeriesIndex:v,dataPointIndex:t.dataPointIndexes[q],x1:n,y1:e}}0<=t.dataPointIndexes[q]&&0!==H.markerSize&&(0<H.markerSize||0<t.markerSize)&&(q=t.getMarkerProperties(p,n,e,b),g.push(q),markerColor=D(Ea),u&&g.push({x:n,y:e,ctx:s,type:q.type,size:q.size,color:markerColor,borderColor:markerColor,borderThickness:q.borderThickness}));(H.indexLabel||t.indexLabel||H.indexLabelFormatter||t.indexLabelFormatter)&&this._indexLabels.push({chartType:"stackedArea100",
dataPoint:H,dataSeries:t,point:{x:n,y:e},direction:0>w[p].y===a.axisY.reversed?1:-1,color:d})}}c();b.moveTo(n,e);u&&s.moveTo(n,e)}delete t.dataPointIndexes}M.drawMarkers(g);b.restore();u&&s.restore();return{source:b,dest:this.plotArea.ctx,animationCallback:F.xClipAnimation,easingFunction:F.easing.linear,animationBase:0}}};y.prototype.renderBubble=function(a){var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var b=this.plotArea,d=0,f,g;c.save();u&&this._eventManager.ghostCtx.save();
c.beginPath();c.rect(b.x1,b.y1,b.width,b.height);c.clip();u&&(this._eventManager.ghostCtx.beginPath(),this._eventManager.ghostCtx.rect(b.x1,b.y1,b.width,b.height),this._eventManager.ghostCtx.clip());for(var h=-Infinity,k=Infinity,l=0;l<a.dataSeriesIndexes.length;l++)for(var m=a.dataSeriesIndexes[l],p=this.data[m],n=p.dataPoints,e=0,d=0;d<n.length;d++)f=n[d].getTime?f=n[d].x.getTime():f=n[d].x,f<a.axisX.dataInfo.viewPortMin||f>a.axisX.dataInfo.viewPortMax||"undefined"===typeof n[d].z||(e=n[d].z,e>
h&&(h=e),e<k&&(k=e));for(var q=25*Math.PI,b=Math.max(Math.pow(0.25*Math.min(b.height,b.width)/2,2)*Math.PI,q),l=0;l<a.dataSeriesIndexes.length;l++)if(m=a.dataSeriesIndexes[l],p=this.data[m],n=p.dataPoints,0<n.length)for(c.strokeStyle="#4572A7 ",d=0;d<n.length;d++)if(f=n[d].getTime?f=n[d].x.getTime():f=n[d].x,!(f<a.axisX.dataInfo.viewPortMin||f>a.axisX.dataInfo.viewPortMax)&&"number"===typeof n[d].y){f=a.axisX.convertValueToPixel(f);g=a.axisY.convertValueToPixel(n[d].y);var e=n[d].z,r=2*Math.max(Math.sqrt((h===
k?b/2:q+(b-q)/(h-k)*(e-k))/Math.PI)<<0,1),e=p.getMarkerProperties(d,c);e.size=r;c.globalAlpha=p.fillOpacity;M.drawMarker(f,g,c,e.type,e.size,e.color,e.borderColor,e.borderThickness);c.globalAlpha=1;var s=p.dataPointIds[d];this._eventManager.objectMap[s]={id:s,objectType:"dataPoint",dataSeriesIndex:m,dataPointIndex:d,x1:f,y1:g,size:r};r=D(s);u&&M.drawMarker(f,g,this._eventManager.ghostCtx,e.type,e.size,r,r,e.borderThickness);(n[d].indexLabel||p.indexLabel||n[d].indexLabelFormatter||p.indexLabelFormatter)&&
this._indexLabels.push({chartType:"bubble",dataPoint:n[d],dataSeries:p,point:{x:f,y:g},direction:1,bounds:{x1:f-e.size/2,y1:g-e.size/2,x2:f+e.size/2,y2:g+e.size/2},color:null})}c.restore();u&&this._eventManager.ghostCtx.restore();return{source:c,dest:this.plotArea.ctx,animationCallback:F.fadeInAnimation,easingFunction:F.easing.easeInQuad,animationBase:0}}};y.prototype.renderScatter=function(a){var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var b=this.plotArea,d=0,
f,g;c.save();u&&this._eventManager.ghostCtx.save();c.beginPath();c.rect(b.x1,b.y1,b.width,b.height);c.clip();u&&(this._eventManager.ghostCtx.beginPath(),this._eventManager.ghostCtx.rect(b.x1,b.y1,b.width,b.height),this._eventManager.ghostCtx.clip());for(var h=0;h<a.dataSeriesIndexes.length;h++){var k=a.dataSeriesIndexes[h],l=this.data[k],m=l.dataPoints;if(0<m.length){c.strokeStyle="#4572A7 ";Math.pow(0.3*Math.min(b.height,b.width)/2,2);for(var p=0,n=0,d=0;d<m.length;d++)if(f=m[d].getTime?f=m[d].x.getTime():
f=m[d].x,!(f<a.axisX.dataInfo.viewPortMin||f>a.axisX.dataInfo.viewPortMax)&&"number"===typeof m[d].y){f=a.axisX.convertValueToPixel(f);g=a.axisY.convertValueToPixel(m[d].y);var e=l.getMarkerProperties(d,f,g,c);c.globalAlpha=l.fillOpacity;M.drawMarker(e.x,e.y,e.ctx,e.type,e.size,e.color,e.borderColor,e.borderThickness);c.globalAlpha=1;Math.sqrt((p-f)*(p-f)+(n-g)*(n-g))<Math.min(e.size,5)&&m.length>Math.min(this.plotArea.width,this.plotArea.height)||(p=l.dataPointIds[d],this._eventManager.objectMap[p]=
{id:p,objectType:"dataPoint",dataSeriesIndex:k,dataPointIndex:d,x1:f,y1:g},p=D(p),u&&M.drawMarker(e.x,e.y,this._eventManager.ghostCtx,e.type,e.size,p,p,e.borderThickness),(m[d].indexLabel||l.indexLabel||m[d].indexLabelFormatter||l.indexLabelFormatter)&&this._indexLabels.push({chartType:"scatter",dataPoint:m[d],dataSeries:l,point:{x:f,y:g},direction:1,bounds:{x1:f-e.size/2,y1:g-e.size/2,x2:f+e.size/2,y2:g+e.size/2},color:null}),p=f,n=g)}}}c.restore();u&&this._eventManager.ghostCtx.restore();return{source:c,
dest:this.plotArea.ctx,animationCallback:F.fadeInAnimation,easingFunction:F.easing.easeInQuad,animationBase:0}}};y.prototype.renderCandlestick=function(a){var c=a.targetCanvasCtx||this.plotArea.ctx,b=this._eventManager.ghostCtx;if(!(0>=a.dataSeriesIndexes.length)){var d=null,d=this.plotArea,f=0,g,h,k,l,m,p,f=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:1;g=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?this.dataPointWidth:0.015*this.width;
var n=a.axisX.dataInfo.minDiff;isFinite(n)||(n=0.3*Math.abs(a.axisX.range));n=this.dataPointWidth?this.dataPointWidth:0.7*d.width*(a.axisX.logarithmic?Math.log(n)/Math.log(a.axisX.range):Math.abs(n)/Math.abs(a.axisX.range))<<0;this.dataPointMaxWidth&&f>g&&(f=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,g));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&g<f)&&(g=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,f));n<f&&(n=f);n>g&&(n=g);c.save();u&&b.save();c.beginPath();c.rect(d.x1,
d.y1,d.width,d.height);c.clip();u&&(b.beginPath(),b.rect(d.x1,d.y1,d.width,d.height),b.clip());for(var e=0;e<a.dataSeriesIndexes.length;e++){var q=a.dataSeriesIndexes[e],r=this.data[q],s=r.dataPoints;if(0<s.length)for(var z=5<n&&r.bevelEnabled?!0:!1,f=0;f<s.length;f++)if(s[f].getTime?p=s[f].x.getTime():p=s[f].x,!(p<a.axisX.dataInfo.viewPortMin||p>a.axisX.dataInfo.viewPortMax)&&null!==s[f].y&&s[f].y.length&&"number"===typeof s[f].y[0]&&"number"===typeof s[f].y[1]&&"number"===typeof s[f].y[2]&&"number"===
typeof s[f].y[3]){g=a.axisX.convertValueToPixel(p);h=a.axisY.convertValueToPixel(s[f].y[0]);k=a.axisY.convertValueToPixel(s[f].y[1]);l=a.axisY.convertValueToPixel(s[f].y[2]);m=a.axisY.convertValueToPixel(s[f].y[3]);var v=g-n/2<<0,t=v+n<<0,d=s[f].color?s[f].color:r._colorSet[0],w=Math.round(Math.max(1,0.15*n)),x=0===w%2?0:0.5,y=r.dataPointIds[f];this._eventManager.objectMap[y]={id:y,objectType:"dataPoint",dataSeriesIndex:q,dataPointIndex:f,x1:v,y1:h,x2:t,y2:k,x3:g,y3:l,x4:g,y4:m,borderThickness:w,
color:d};c.strokeStyle=d;c.beginPath();c.lineWidth=w;b.lineWidth=Math.max(w,4);"candlestick"===r.type?(c.moveTo(g-x,k),c.lineTo(g-x,Math.min(h,m)),c.stroke(),c.moveTo(g-x,Math.max(h,m)),c.lineTo(g-x,l),c.stroke(),L(c,v,Math.min(h,m),t,Math.max(h,m),s[f].y[0]<=s[f].y[3]?r.risingColor:d,w,d,z,z,!1,!1,r.fillOpacity),u&&(d=D(y),b.strokeStyle=d,b.moveTo(g-x,k),b.lineTo(g-x,Math.min(h,m)),b.stroke(),b.moveTo(g-x,Math.max(h,m)),b.lineTo(g-x,l),b.stroke(),L(b,v,Math.min(h,m),t,Math.max(h,m),d,0,null,!1,!1,
!1,!1))):"ohlc"===r.type&&(c.moveTo(g-x,k),c.lineTo(g-x,l),c.stroke(),c.beginPath(),c.moveTo(g,h),c.lineTo(v,h),c.stroke(),c.beginPath(),c.moveTo(g,m),c.lineTo(t,m),c.stroke(),u&&(d=D(y),b.strokeStyle=d,b.moveTo(g-x,k),b.lineTo(g-x,l),b.stroke(),b.beginPath(),b.moveTo(g,h),b.lineTo(v,h),b.stroke(),b.beginPath(),b.moveTo(g,m),b.lineTo(t,m),b.stroke()));(s[f].indexLabel||r.indexLabel||s[f].indexLabelFormatter||r.indexLabelFormatter)&&this._indexLabels.push({chartType:r.type,dataPoint:s[f],dataSeries:r,
point:{x:v+(t-v)/2,y:a.axisY.reversed?l:k},direction:1,bounds:{x1:v,y1:Math.min(k,l),x2:t,y2:Math.max(k,l)},color:d})}}c.restore();u&&b.restore();return{source:c,dest:this.plotArea.ctx,animationCallback:F.fadeInAnimation,easingFunction:F.easing.easeInQuad,animationBase:0}}};y.prototype.renderRangeColumn=function(a){var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var b=null,d=this.plotArea,f=0,g,h,f=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:
1;g=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?this.dataPointWidth:0.03*this.width;var k=a.axisX.dataInfo.minDiff;isFinite(k)||(k=0.3*Math.abs(a.axisX.range));k=this.dataPointWidth?this.dataPointWidth:0.9*(d.width*(a.axisX.logarithmic?Math.log(k)/Math.log(a.axisX.range):Math.abs(k)/Math.abs(a.axisX.range))/a.plotType.totalDataSeries)<<0;this.dataPointMaxWidth&&f>g&&(f=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,g));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&
g<f)&&(g=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,f));k<f&&(k=f);k>g&&(k=g);c.save();u&&this._eventManager.ghostCtx.save();c.beginPath();c.rect(d.x1,d.y1,d.width,d.height);c.clip();u&&(this._eventManager.ghostCtx.beginPath(),this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());for(var l=0;l<a.dataSeriesIndexes.length;l++){var m=a.dataSeriesIndexes[l],p=this.data[m],n=p.dataPoints;if(0<n.length)for(var e=5<k&&p.bevelEnabled?!0:!1,f=0;f<
n.length;f++)if(n[f].getTime?h=n[f].x.getTime():h=n[f].x,!(h<a.axisX.dataInfo.viewPortMin||h>a.axisX.dataInfo.viewPortMax)&&null!==n[f].y&&n[f].y.length&&"number"===typeof n[f].y[0]&&"number"===typeof n[f].y[1]){b=a.axisX.convertValueToPixel(h);d=a.axisY.convertValueToPixel(n[f].y[0]);g=a.axisY.convertValueToPixel(n[f].y[1]);var q=a.axisX.reversed?b+a.plotType.totalDataSeries*k/2-(a.previousDataSeriesCount+l)*k<<0:b-a.plotType.totalDataSeries*k/2+(a.previousDataSeriesCount+l)*k<<0,r=a.axisX.reversed?
q-k<<0:q+k<<0,b=n[f].color?n[f].color:p._colorSet[f%p._colorSet.length];if(d>g){var s=d,d=g;g=s}s=p.dataPointIds[f];this._eventManager.objectMap[s]={id:s,objectType:"dataPoint",dataSeriesIndex:m,dataPointIndex:f,x1:q,y1:d,x2:r,y2:g};L(c,q,d,r,g,b,0,b,e,e,!1,!1,p.fillOpacity);b=D(s);u&&L(this._eventManager.ghostCtx,q,d,r,g,b,0,null,!1,!1,!1,!1);if(n[f].indexLabel||p.indexLabel||n[f].indexLabelFormatter||p.indexLabelFormatter)this._indexLabels.push({chartType:"rangeColumn",dataPoint:n[f],dataSeries:p,
indexKeyword:0,point:{x:q+(r-q)/2,y:n[f].y[1]>=n[f].y[0]?g:d},direction:n[f].y[1]>=n[f].y[0]?-1:1,bounds:{x1:q,y1:Math.min(d,g),x2:r,y2:Math.max(d,g)},color:b}),this._indexLabels.push({chartType:"rangeColumn",dataPoint:n[f],dataSeries:p,indexKeyword:1,point:{x:q+(r-q)/2,y:n[f].y[1]>=n[f].y[0]?d:g},direction:n[f].y[1]>=n[f].y[0]?1:-1,bounds:{x1:q,y1:Math.min(d,g),x2:r,y2:Math.max(d,g)},color:b})}}c.restore();u&&this._eventManager.ghostCtx.restore();return{source:c,dest:this.plotArea.ctx,animationCallback:F.fadeInAnimation,
easingFunction:F.easing.easeInQuad,animationBase:0}}};y.prototype.renderRangeBar=function(a){var c=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var b=null,d=this.plotArea,f=0,g,h,k,f=this.dataPointMinWidth?this.dataPointMinWidth:this.dataPointWidth?this.dataPointWidth:1;g=this.dataPointMaxWidth?this.dataPointMaxWidth:this.dataPointWidth?this.dataPointWidth:Math.min(0.15*this.height,0.9*(this.plotArea.height/a.plotType.totalDataSeries))<<0;var l=a.axisX.dataInfo.minDiff;
isFinite(l)||(l=0.3*Math.abs(a.axisX.range));l=this.dataPointWidth?this.dataPointWidth:0.9*(d.height*(a.axisX.logarithmic?Math.log(l)/Math.log(a.axisX.range):Math.abs(l)/Math.abs(a.axisX.range))/a.plotType.totalDataSeries)<<0;this.dataPointMaxWidth&&f>g&&(f=Math.min(this.dataPointWidth?this.dataPointWidth:Infinity,g));!this.dataPointMaxWidth&&(this.dataPointMinWidth&&g<f)&&(g=Math.max(this.dataPointWidth?this.dataPointWidth:-Infinity,f));l<f&&(l=f);l>g&&(l=g);c.save();u&&this._eventManager.ghostCtx.save();
c.beginPath();c.rect(d.x1,d.y1,d.width,d.height);c.clip();u&&(this._eventManager.ghostCtx.beginPath(),this._eventManager.ghostCtx.rect(d.x1,d.y1,d.width,d.height),this._eventManager.ghostCtx.clip());for(var m=0;m<a.dataSeriesIndexes.length;m++){var p=a.dataSeriesIndexes[m],n=this.data[p],e=n.dataPoints;if(0<e.length){var q=5<l&&n.bevelEnabled?!0:!1;c.strokeStyle="#4572A7 ";for(f=0;f<e.length;f++)if(e[f].getTime?k=e[f].x.getTime():k=e[f].x,!(k<a.axisX.dataInfo.viewPortMin||k>a.axisX.dataInfo.viewPortMax)&&
null!==e[f].y&&e[f].y.length&&"number"===typeof e[f].y[0]&&"number"===typeof e[f].y[1]){d=a.axisY.convertValueToPixel(e[f].y[0]);g=a.axisY.convertValueToPixel(e[f].y[1]);h=a.axisX.convertValueToPixel(k);h=a.axisX.reversed?h+a.plotType.totalDataSeries*l/2-(a.previousDataSeriesCount+m)*l<<0:h-a.plotType.totalDataSeries*l/2+(a.previousDataSeriesCount+m)*l<<0;var r=a.axisX.reversed?h-l<<0:h+l<<0;d>g&&(b=d,d=g,g=b);b=e[f].color?e[f].color:n._colorSet[f%n._colorSet.length];L(c,d,h,g,r,b,0,null,q,!1,!1,
!1,n.fillOpacity);b=n.dataPointIds[f];this._eventManager.objectMap[b]={id:b,objectType:"dataPoint",dataSeriesIndex:p,dataPointIndex:f,x1:d,y1:h,x2:g,y2:r};b=D(b);u&&L(this._eventManager.ghostCtx,d,h,g,r,b,0,null,!1,!1,!1,!1);if(e[f].indexLabel||n.indexLabel||e[f].indexLabelFormatter||n.indexLabelFormatter)this._indexLabels.push({chartType:"rangeBar",dataPoint:e[f],dataSeries:n,indexKeyword:0,point:{x:e[f].y[1]>=e[f].y[0]?d:g,y:h+(r-h)/2},direction:e[f].y[1]>=e[f].y[0]?-1:1,bounds:{x1:Math.min(d,g),
y1:h,x2:Math.max(d,g),y2:r},color:b}),this._indexLabels.push({chartType:"rangeBar",dataPoint:e[f],dataSeries:n,indexKeyword:1,point:{x:e[f].y[1]>=e[f].y[0]?g:d,y:h+(r-h)/2},direction:e[f].y[1]>=e[f].y[0]?1:-1,bounds:{x1:Math.min(d,g),y1:h,x2:Math.max(d,g),y2:r},color:b})}}}c.restore();u&&this._eventManager.ghostCtx.restore();return{source:c,dest:this.plotArea.ctx,animationCallback:F.fadeInAnimation,easingFunction:F.easing.easeInQuad,animationBase:0}}};y.prototype.renderRangeArea=function(a){function c(){if(z){var a=
null;0<l.lineThickness&&b.stroke();for(var c=h.length-1;0<=c;c--)a=h[c],b.lineTo(a.x,a.y),d.lineTo(a.x,a.y);b.closePath();b.globalAlpha=l.fillOpacity;b.fill();b.globalAlpha=1;d.fill();if(0<l.lineThickness){b.beginPath();b.moveTo(a.x,a.y);for(c=0;c<h.length;c++)a=h[c],b.lineTo(a.x,a.y);b.stroke()}b.beginPath();b.moveTo(e,q);d.beginPath();d.moveTo(e,q);z={x:e,y:q};h=[];h.push({x:e,y:r})}}var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var d=this._eventManager.ghostCtx,
f=[],g=this.plotArea;b.save();u&&d.save();b.beginPath();b.rect(g.x1,g.y1,g.width,g.height);b.clip();u&&(d.beginPath(),d.rect(g.x1,g.y1,g.width,g.height),d.clip());for(g=0;g<a.dataSeriesIndexes.length;g++){var h=[],k=a.dataSeriesIndexes[g],l=this.data[k],m=l.dataPoints,f=l.id;this._eventManager.objectMap[f]={objectType:"dataSeries",dataSeriesIndex:k};f=D(f);d.fillStyle=f;var f=[],p=!0,n=0,e,q,r,s,z=null;if(0<m.length){var v=l._colorSet[n%l._colorSet.length],t=l.options.lineColor||v,w=t;b.fillStyle=
v;b.strokeStyle=t;b.lineWidth=l.lineThickness;var x="solid";if(b.setLineDash){var y=E(l.nullDataLineDashType,l.lineThickness),x=l.lineDashType,B=E(x,l.lineThickness);b.setLineDash(B)}for(var A=!0;n<m.length;n++)if(s=m[n].x.getTime?m[n].x.getTime():m[n].x,!(s<a.axisX.dataInfo.viewPortMin||s>a.axisX.dataInfo.viewPortMax&&(!l.connectNullData||!A)))if(null!==m[n].y&&m[n].y.length&&"number"===typeof m[n].y[0]&&"number"===typeof m[n].y[1]){e=a.axisX.convertValueToPixel(s);q=a.axisY.convertValueToPixel(m[n].y[0]);
r=a.axisY.convertValueToPixel(m[n].y[1]);p||A?(l.connectNullData&&!p?(b.setLineDash&&(l.options.nullDataLineDashType||x===l.lineDashType&&l.lineDashType!==l.nullDataLineDashType)&&(h[h.length-1].newLineDashArray=B,x=l.nullDataLineDashType,b.setLineDash(y)),b.lineTo(e,q),u&&d.lineTo(e,q),h.push({x:e,y:r})):(b.beginPath(),b.moveTo(e,q),z={x:e,y:q},h=[],h.push({x:e,y:r}),u&&(d.beginPath(),d.moveTo(e,q))),A=p=!1):(b.lineTo(e,q),h.push({x:e,y:r}),u&&d.lineTo(e,q),0==n%250&&c());s=l.dataPointIds[n];this._eventManager.objectMap[s]=
{id:s,objectType:"dataPoint",dataSeriesIndex:k,dataPointIndex:n,x1:e,y1:q,y2:r};n<m.length-1&&(w!==(m[n].lineColor||t)||x!==(m[n].lineDashType||l.lineDashType))&&(c(),w=m[n].lineColor||t,h[h.length-1].newStrokeStyle=w,b.strokeStyle=w,b.setLineDash&&(m[n].lineDashType?(x=m[n].lineDashType,h[h.length-1].newLineDashArray=E(x,l.lineThickness),b.setLineDash(h[h.length-1].newLineDashArray)):(x=l.lineDashType,h[h.length-1].newLineDashArray=B,b.setLineDash(B))));if(0!==m[n].markerSize&&(0<m[n].markerSize||
0<l.markerSize)){var R=l.getMarkerProperties(n,e,r,b);f.push(R);var N=D(s);u&&f.push({x:e,y:r,ctx:d,type:R.type,size:R.size,color:N,borderColor:N,borderThickness:R.borderThickness});R=l.getMarkerProperties(n,e,q,b);f.push(R);N=D(s);u&&f.push({x:e,y:q,ctx:d,type:R.type,size:R.size,color:N,borderColor:N,borderThickness:R.borderThickness})}if(m[n].indexLabel||l.indexLabel||m[n].indexLabelFormatter||l.indexLabelFormatter)this._indexLabels.push({chartType:"rangeArea",dataPoint:m[n],dataSeries:l,indexKeyword:0,
point:{x:e,y:q},direction:m[n].y[0]>m[n].y[1]===a.axisY.reversed?-1:1,color:v}),this._indexLabels.push({chartType:"rangeArea",dataPoint:m[n],dataSeries:l,indexKeyword:1,point:{x:e,y:r},direction:m[n].y[0]>m[n].y[1]===a.axisY.reversed?1:-1,color:v})}else A||p||c(),A=!0;c();M.drawMarkers(f)}}b.restore();u&&this._eventManager.ghostCtx.restore();return{source:b,dest:this.plotArea.ctx,animationCallback:F.xClipAnimation,easingFunction:F.easing.linear,animationBase:0}}};y.prototype.renderRangeSplineArea=
function(a){function c(a,c){var e=ua(q,2);if(0<e.length){if(0<k.lineThickness){b.strokeStyle=c;b.setLineDash&&b.setLineDash(a);b.beginPath();b.moveTo(e[0].x,e[0].y);for(var f=0;f<e.length-3;f+=3){if(e[f].newStrokeStyle||e[f].newLineDashArray)b.stroke(),b.beginPath(),b.moveTo(e[f].x,e[f].y),e[f].newStrokeStyle&&(b.strokeStyle=e[f].newStrokeStyle),e[f].newLineDashArray&&b.setLineDash(e[f].newLineDashArray);b.bezierCurveTo(e[f+1].x,e[f+1].y,e[f+2].x,e[f+2].y,e[f+3].x,e[f+3].y)}b.stroke()}b.beginPath();
b.moveTo(e[0].x,e[0].y);u&&(d.beginPath(),d.moveTo(e[0].x,e[0].y));for(f=0;f<e.length-3;f+=3)b.bezierCurveTo(e[f+1].x,e[f+1].y,e[f+2].x,e[f+2].y,e[f+3].x,e[f+3].y),u&&d.bezierCurveTo(e[f+1].x,e[f+1].y,e[f+2].x,e[f+2].y,e[f+3].x,e[f+3].y);e=ua(r,2);b.lineTo(r[r.length-1].x,r[r.length-1].y);for(f=e.length-1;2<f;f-=3)b.bezierCurveTo(e[f-1].x,e[f-1].y,e[f-2].x,e[f-2].y,e[f-3].x,e[f-3].y),u&&d.bezierCurveTo(e[f-1].x,e[f-1].y,e[f-2].x,e[f-2].y,e[f-3].x,e[f-3].y);b.closePath();b.globalAlpha=k.fillOpacity;
b.fill();u&&(d.closePath(),d.fill());b.globalAlpha=1;if(0<k.lineThickness){b.strokeStyle=c;b.setLineDash&&b.setLineDash(a);b.beginPath();b.moveTo(e[0].x,e[0].y);for(var g=f=0;f<e.length-3;f+=3,g++){if(q[g].newStrokeStyle||q[g].newLineDashArray)b.stroke(),b.beginPath(),b.moveTo(e[f].x,e[f].y),q[g].newStrokeStyle&&(b.strokeStyle=q[g].newStrokeStyle),q[g].newLineDashArray&&b.setLineDash(q[g].newLineDashArray);b.bezierCurveTo(e[f+1].x,e[f+1].y,e[f+2].x,e[f+2].y,e[f+3].x,e[f+3].y)}b.stroke()}b.beginPath()}}
var b=a.targetCanvasCtx||this.plotArea.ctx;if(!(0>=a.dataSeriesIndexes.length)){var d=this._eventManager.ghostCtx,f=[],g=this.plotArea;b.save();u&&d.save();b.beginPath();b.rect(g.x1,g.y1,g.width,g.height);b.clip();u&&(d.beginPath(),d.rect(g.x1,g.y1,g.width,g.height),d.clip());for(g=0;g<a.dataSeriesIndexes.length;g++){var h=a.dataSeriesIndexes[g],k=this.data[h],l=k.dataPoints,f=k.id;this._eventManager.objectMap[f]={objectType:"dataSeries",dataSeriesIndex:h};f=D(f);d.fillStyle=f;var f=[],m=0,p,n,e,
q=[],r=[];if(0<l.length){var s=k._colorSet[m%k._colorSet.length],z=k.options.lineColor||s,v=z;b.fillStyle=s;b.lineWidth=k.lineThickness;var t="solid",w;if(b.setLineDash){var x=E(k.nullDataLineDashType,k.lineThickness),t=k.lineDashType;w=E(t,k.lineThickness)}for(n=!1;m<l.length;m++)if(p=l[m].x.getTime?l[m].x.getTime():l[m].x,!(p<a.axisX.dataInfo.viewPortMin||p>a.axisX.dataInfo.viewPortMax&&(!k.connectNullData||!n)))if(null!==l[m].y&&l[m].y.length&&"number"===typeof l[m].y[0]&&"number"===typeof l[m].y[1]){p=
a.axisX.convertValueToPixel(p);n=a.axisY.convertValueToPixel(l[m].y[0]);e=a.axisY.convertValueToPixel(l[m].y[1]);var y=k.dataPointIds[m];this._eventManager.objectMap[y]={id:y,objectType:"dataPoint",dataSeriesIndex:h,dataPointIndex:m,x1:p,y1:n,y2:e};q[q.length]={x:p,y:n};r[r.length]={x:p,y:e};m<l.length-1&&(v!==(l[m].lineColor||z)||t!==(l[m].lineDashType||k.lineDashType))&&(v=l[m].lineColor||z,q[q.length-1].newStrokeStyle=v,b.setLineDash&&(l[m].lineDashType?(t=l[m].lineDashType,q[q.length-1].newLineDashArray=
E(t,k.lineThickness)):(t=k.lineDashType,q[q.length-1].newLineDashArray=w)));if(0!==l[m].markerSize&&(0<l[m].markerSize||0<k.markerSize)){var B=k.getMarkerProperties(m,p,n,b);f.push(B);var A=D(y);u&&f.push({x:p,y:n,ctx:d,type:B.type,size:B.size,color:A,borderColor:A,borderThickness:B.borderThickness});B=k.getMarkerProperties(m,p,e,b);f.push(B);A=D(y);u&&f.push({x:p,y:e,ctx:d,type:B.type,size:B.size,color:A,borderColor:A,borderThickness:B.borderThickness})}if(l[m].indexLabel||k.indexLabel||l[m].indexLabelFormatter||
k.indexLabelFormatter)this._indexLabels.push({chartType:"splineArea",dataPoint:l[m],dataSeries:k,indexKeyword:0,point:{x:p,y:n},direction:l[m].y[0]<=l[m].y[1]?-1:1,color:s}),this._indexLabels.push({chartType:"splineArea",dataPoint:l[m],dataSeries:k,indexKeyword:1,point:{x:p,y:e},direction:l[m].y[0]<=l[m].y[1]?1:-1,color:s});n=!1}else 0<m&&!n&&(k.connectNullData?b.setLineDash&&(0<q.length&&(k.options.nullDataLineDashType||!l[m-1].lineDashType))&&(q[q.length-1].newLineDashArray=x,t=k.nullDataLineDashType):
(c(w,z),q=[],r=[])),n=!0;c(w,z);M.drawMarkers(f)}}b.restore();u&&this._eventManager.ghostCtx.restore();return{source:b,dest:this.plotArea.ctx,animationCallback:F.xClipAnimation,easingFunction:F.easing.linear,animationBase:0}}};var Fa=function(a,c,b,d,f,g,h,k,l){if(!(0>b)){"undefined"===typeof k&&(k=1);if(!u){var m=Number((h%(2*Math.PI)).toFixed(8));Number((g%(2*Math.PI)).toFixed(8))===m&&(h-=1E-4)}a.save();a.globalAlpha=k;"pie"===f?(a.beginPath(),a.moveTo(c.x,c.y),a.arc(c.x,c.y,b,g,h,!1),a.fillStyle=
d,a.strokeStyle="white",a.lineWidth=2,a.closePath(),a.fill()):"doughnut"===f&&(a.beginPath(),a.arc(c.x,c.y,b,g,h,!1),0<=l&&a.arc(c.x,c.y,l*b,h,g,!0),a.closePath(),a.fillStyle=d,a.strokeStyle="white",a.lineWidth=2,a.fill());a.globalAlpha=1;a.restore()}};y.prototype.renderPie=function(a){function c(){if(m&&p){for(var a=0,b=0,c=0,d=0,f=0;f<p.length;f++){var g=p[f],k=m.dataPointIds[f],h={id:k,objectType:"dataPoint",dataPointIndex:f,dataSeriesIndex:0};q.push(h);var n={percent:null,total:null},r=null,n=
l.getPercentAndTotal(m,g);if(m.indexLabelFormatter||g.indexLabelFormatter)r={chart:l.options,dataSeries:m,dataPoint:g,total:n.total,percent:n.percent};n=g.indexLabelFormatter?g.indexLabelFormatter(r):g.indexLabel?l.replaceKeywordsWithValue(g.indexLabel,g,m,f):m.indexLabelFormatter?m.indexLabelFormatter(r):m.indexLabel?l.replaceKeywordsWithValue(m.indexLabel,g,m,f):g.label?g.label:"";l._eventManager.objectMap[k]=h;h.center={x:w.x,y:w.y};h.y=g.y;h.radius=B;h.percentInnerRadius=F;h.indexLabelText=n;
h.indexLabelPlacement=m.indexLabelPlacement;h.indexLabelLineColor=g.indexLabelLineColor?g.indexLabelLineColor:m.indexLabelLineColor?m.indexLabelLineColor:g.color?g.color:m._colorSet[f%m._colorSet.length];h.indexLabelLineThickness=x(g.indexLabelLineThickness)?m.indexLabelLineThickness:g.indexLabelLineThickness;h.indexLabelLineDashType=g.indexLabelLineDashType?g.indexLabelLineDashType:m.indexLabelLineDashType;h.indexLabelFontColor=g.indexLabelFontColor?g.indexLabelFontColor:m.indexLabelFontColor;h.indexLabelFontStyle=
g.indexLabelFontStyle?g.indexLabelFontStyle:m.indexLabelFontStyle;h.indexLabelFontWeight=g.indexLabelFontWeight?g.indexLabelFontWeight:m.indexLabelFontWeight;h.indexLabelFontSize=g.indexLabelFontSize?g.indexLabelFontSize:m.indexLabelFontSize;h.indexLabelFontFamily=g.indexLabelFontFamily?g.indexLabelFontFamily:m.indexLabelFontFamily;h.indexLabelBackgroundColor=g.indexLabelBackgroundColor?g.indexLabelBackgroundColor:m.indexLabelBackgroundColor?m.indexLabelBackgroundColor:null;h.indexLabelMaxWidth=g.indexLabelMaxWidth?
g.indexLabelMaxWidth:m.indexLabelMaxWidth?m.indexLabelMaxWidth:0.33*e.width;h.indexLabelWrap="undefined"!==typeof g.indexLabelWrap?g.indexLabelWrap:m.indexLabelWrap;h.startAngle=0===f?m.startAngle?m.startAngle/180*Math.PI:0:q[f-1].endAngle;h.startAngle=(h.startAngle+2*Math.PI)%(2*Math.PI);h.endAngle=h.startAngle+2*Math.PI/u*Math.abs(g.y);g=(h.endAngle+h.startAngle)/2;g=(g+2*Math.PI)%(2*Math.PI);h.midAngle=g;if(h.midAngle>Math.PI/2-v&&h.midAngle<Math.PI/2+v){if(0===a||q[c].midAngle>h.midAngle)c=f;
a++}else if(h.midAngle>3*Math.PI/2-v&&h.midAngle<3*Math.PI/2+v){if(0===b||q[d].midAngle>h.midAngle)d=f;b++}h.hemisphere=g>Math.PI/2&&g<=3*Math.PI/2?"left":"right";h.indexLabelTextBlock=new V(l.plotArea.ctx,{fontSize:h.indexLabelFontSize,fontFamily:h.indexLabelFontFamily,fontColor:h.indexLabelFontColor,fontStyle:h.indexLabelFontStyle,fontWeight:h.indexLabelFontWeight,horizontalAlign:"left",backgroundColor:h.indexLabelBackgroundColor,maxWidth:h.indexLabelMaxWidth,maxHeight:h.indexLabelWrap?5*h.indexLabelFontSize:
1.5*h.indexLabelFontSize,text:h.indexLabelText,padding:0,textBaseline:"top"});h.indexLabelTextBlock.measureText()}k=g=0;n=!1;for(f=0;f<p.length;f++)h=q[(c+f)%p.length],1<a&&(h.midAngle>Math.PI/2-v&&h.midAngle<Math.PI/2+v)&&(g<=a/2&&!n?(h.hemisphere="right",g++):(h.hemisphere="left",n=!0));n=!1;for(f=0;f<p.length;f++)h=q[(d+f)%p.length],1<b&&(h.midAngle>3*Math.PI/2-v&&h.midAngle<3*Math.PI/2+v)&&(k<=b/2&&!n?(h.hemisphere="left",k++):(h.hemisphere="right",n=!0))}}function b(a){var b=l.plotArea.ctx;b.clearRect(e.x1,
e.y1,e.width,e.height);b.fillStyle=l.backgroundColor;b.fillRect(e.x1,e.y1,e.width,e.height);for(b=0;b<p.length;b++){var c=q[b].startAngle,d=q[b].endAngle;if(d>c){var f=0.07*B*Math.cos(q[b].midAngle),g=0.07*B*Math.sin(q[b].midAngle),h=!1;if(p[b].exploded){if(1E-9<Math.abs(q[b].center.x-(w.x+f))||1E-9<Math.abs(q[b].center.y-(w.y+g)))q[b].center.x=w.x+f*a,q[b].center.y=w.y+g*a,h=!0}else if(0<Math.abs(q[b].center.x-w.x)||0<Math.abs(q[b].center.y-w.y))q[b].center.x=w.x+f*(1-a),q[b].center.y=w.y+g*(1-a),
h=!0;h&&(f={},f.dataSeries=m,f.dataPoint=m.dataPoints[b],f.index=b,l.toolTip.highlightObjects([f]));Fa(l.plotArea.ctx,q[b].center,q[b].radius,p[b].color?p[b].color:m._colorSet[b%m._colorSet.length],m.type,c,d,m.fillOpacity,q[b].percentInnerRadius)}}a=l.plotArea.ctx;a.save();a.fillStyle="black";a.strokeStyle="grey";a.textBaseline="middle";a.lineJoin="round";for(b=b=0;b<p.length;b++)c=q[b],c.indexLabelText&&(c.indexLabelTextBlock.y-=c.indexLabelTextBlock.height/2,d=0,d="left"===c.hemisphere?"inside"!==
m.indexLabelPlacement?-(c.indexLabelTextBlock.width+n):-c.indexLabelTextBlock.width/2:"inside"!==m.indexLabelPlacement?n:-c.indexLabelTextBlock.width/2,c.indexLabelTextBlock.x+=d,c.indexLabelTextBlock.render(!0),c.indexLabelTextBlock.x-=d,c.indexLabelTextBlock.y+=c.indexLabelTextBlock.height/2,"inside"!==c.indexLabelPlacement&&0<c.indexLabelLineThickness&&(d=c.center.x+B*Math.cos(c.midAngle),f=c.center.y+B*Math.sin(c.midAngle),a.strokeStyle=c.indexLabelLineColor,a.lineWidth=c.indexLabelLineThickness,
a.setLineDash&&a.setLineDash(E(c.indexLabelLineDashType,c.indexLabelLineThickness)),a.beginPath(),a.moveTo(d,f),a.lineTo(c.indexLabelTextBlock.x,c.indexLabelTextBlock.y),a.lineTo(c.indexLabelTextBlock.x+("left"===c.hemisphere?-n:n),c.indexLabelTextBlock.y),a.stroke()),a.lineJoin="miter");a.save()}function d(a,b){var c=0,c=a.indexLabelTextBlock.y-a.indexLabelTextBlock.height/2,d=a.indexLabelTextBlock.y+a.indexLabelTextBlock.height/2,e=b.indexLabelTextBlock.y-b.indexLabelTextBlock.height/2,f=b.indexLabelTextBlock.y+
b.indexLabelTextBlock.height/2;return c=b.indexLabelTextBlock.y>a.indexLabelTextBlock.y?e-d:c-f}function f(a){for(var b=null,c=1;c<p.length;c++)if(b=(a+c+q.length)%q.length,q[b].hemisphere!==q[a].hemisphere){b=null;break}else if(q[b].indexLabelText&&b!==a&&(0>d(q[b],q[a])||("right"===q[a].hemisphere?q[b].indexLabelTextBlock.y>=q[a].indexLabelTextBlock.y:q[b].indexLabelTextBlock.y<=q[a].indexLabelTextBlock.y)))break;else b=null;return b}function g(a,b,c){c=(c||0)+1;if(1E3<c)return 0;b=b||0;var e=0,
h=w.y-1*s,k=w.y+1*s;if(0<=a&&a<p.length){var l=q[a];if(0>b&&l.indexLabelTextBlock.y<h||0<b&&l.indexLabelTextBlock.y>k)return 0;var m=0,n=0,n=m=m=0;0>b?l.indexLabelTextBlock.y-l.indexLabelTextBlock.height/2>h&&l.indexLabelTextBlock.y-l.indexLabelTextBlock.height/2+b<h&&(b=-(h-(l.indexLabelTextBlock.y-l.indexLabelTextBlock.height/2+b))):l.indexLabelTextBlock.y+l.indexLabelTextBlock.height/2<h&&l.indexLabelTextBlock.y+l.indexLabelTextBlock.height/2+b>k&&(b=l.indexLabelTextBlock.y+l.indexLabelTextBlock.height/
2+b-k);b=l.indexLabelTextBlock.y+b;h=0;h="right"===l.hemisphere?w.x+Math.sqrt(Math.pow(s,2)-Math.pow(b-w.y,2)):w.x-Math.sqrt(Math.pow(s,2)-Math.pow(b-w.y,2));n=w.x+B*Math.cos(l.midAngle);m=w.y+B*Math.sin(l.midAngle);m=Math.sqrt(Math.pow(h-n,2)+Math.pow(b-m,2));n=Math.acos(B/s);m=Math.acos((s*s+B*B-m*m)/(2*B*s));b=m<n?b-l.indexLabelTextBlock.y:0;h=null;for(k=1;k<p.length;k++)if(h=(a-k+q.length)%q.length,q[h].hemisphere!==q[a].hemisphere){h=null;break}else if(q[h].indexLabelText&&q[h].hemisphere===
q[a].hemisphere&&h!==a&&(0>d(q[h],q[a])||("right"===q[a].hemisphere?q[h].indexLabelTextBlock.y<=q[a].indexLabelTextBlock.y:q[h].indexLabelTextBlock.y>=q[a].indexLabelTextBlock.y)))break;else h=null;n=h;m=f(a);k=h=0;0>b?(k="right"===l.hemisphere?n:m,e=b,null!==k&&(n=-b,b=l.indexLabelTextBlock.y-l.indexLabelTextBlock.height/2-(q[k].indexLabelTextBlock.y+q[k].indexLabelTextBlock.height/2),b-n<r&&(h=-n,k=g(k,h,c+1),+k.toFixed(t)>+h.toFixed(t)&&(e=b>r?-(b-r):-(n-(k-h)))))):0<b&&(k="right"===l.hemisphere?
m:n,e=b,null!==k&&(n=b,b=q[k].indexLabelTextBlock.y-q[k].indexLabelTextBlock.height/2-(l.indexLabelTextBlock.y+l.indexLabelTextBlock.height/2),b-n<r&&(h=n,k=g(k,h,c+1),+k.toFixed(t)<+h.toFixed(t)&&(e=b>r?b-r:n-(h-k)))));e&&(c=l.indexLabelTextBlock.y+e,b=0,b="right"===l.hemisphere?w.x+Math.sqrt(Math.pow(s,2)-Math.pow(c-w.y,2)):w.x-Math.sqrt(Math.pow(s,2)-Math.pow(c-w.y,2)),l.midAngle>Math.PI/2-v&&l.midAngle<Math.PI/2+v?(h=(a-1+q.length)%q.length,h=q[h],a=q[(a+1+q.length)%q.length],"left"===l.hemisphere&&
"right"===h.hemisphere&&b>h.indexLabelTextBlock.x?b=h.indexLabelTextBlock.x-15:"right"===l.hemisphere&&("left"===a.hemisphere&&b<a.indexLabelTextBlock.x)&&(b=a.indexLabelTextBlock.x+15)):l.midAngle>3*Math.PI/2-v&&l.midAngle<3*Math.PI/2+v&&(h=(a-1+q.length)%q.length,h=q[h],a=q[(a+1+q.length)%q.length],"right"===l.hemisphere&&"left"===h.hemisphere&&b<h.indexLabelTextBlock.x?b=h.indexLabelTextBlock.x+15:"left"===l.hemisphere&&("right"===a.hemisphere&&b>a.indexLabelTextBlock.x)&&(b=a.indexLabelTextBlock.x-
15)),l.indexLabelTextBlock.y=c,l.indexLabelTextBlock.x=b,l.indexLabelAngle=Math.atan2(l.indexLabelTextBlock.y-w.y,l.indexLabelTextBlock.x-w.x))}return e}function h(){var a=l.plotArea.ctx;a.fillStyle="grey";a.strokeStyle="grey";a.font="16px Arial";a.textBaseline="middle";for(var b=a=0,c=0,h=!0,b=0;10>b&&(1>b||0<c);b++){if(m.radius||!m.radius&&"undefined"!==typeof m.innerRadius&&null!==m.innerRadius&&B-c<=A)h=!1;h&&(B-=c);c=0;if("inside"!==m.indexLabelPlacement){s=B*z;for(a=0;a<p.length;a++){var k=
q[a];k.indexLabelTextBlock.x=w.x+s*Math.cos(k.midAngle);k.indexLabelTextBlock.y=w.y+s*Math.sin(k.midAngle);k.indexLabelAngle=k.midAngle;k.radius=B;k.percentInnerRadius=F}for(var v,u,a=0;a<p.length;a++){var k=q[a],x=f(a);if(null!==x){v=q[a];u=q[x];var y=0,y=d(v,u)-r;if(0>y){for(var D=u=0,E=0;E<p.length;E++)E!==a&&q[E].hemisphere===k.hemisphere&&(q[E].indexLabelTextBlock.y<k.indexLabelTextBlock.y?u++:D++);u=y/(u+D||1)*D;var D=-1*(y-u),C=E=0;"right"===k.hemisphere?(E=g(a,u),D=-1*(y-E),C=g(x,D),+C.toFixed(t)<
+D.toFixed(t)&&+E.toFixed(t)<=+u.toFixed(t)&&g(a,-(D-C))):(E=g(x,u),D=-1*(y-E),C=g(a,D),+C.toFixed(t)<+D.toFixed(t)&&+E.toFixed(t)<=+u.toFixed(t)&&g(x,-(D-C)))}}}}else for(a=0;a<p.length;a++)k=q[a],s="pie"===m.type?0.7*B:0.8*B,x=w.x+s*Math.cos(k.midAngle),u=w.y+s*Math.sin(k.midAngle),k.indexLabelTextBlock.x=x,k.indexLabelTextBlock.y=u;for(a=0;a<p.length;a++)if(k=q[a],x=k.indexLabelTextBlock.measureText(),0!==x.height&&0!==x.width)x=x=0,"right"===k.hemisphere?(x=e.x2-(k.indexLabelTextBlock.x+k.indexLabelTextBlock.width+
n),x*=-1):x=e.x1-(k.indexLabelTextBlock.x-k.indexLabelTextBlock.width-n),0<x&&(!h&&k.indexLabelText&&(u="right"===k.hemisphere?e.x2-k.indexLabelTextBlock.x:k.indexLabelTextBlock.x-e.x1,0.3*k.indexLabelTextBlock.maxWidth>u?k.indexLabelText="":k.indexLabelTextBlock.maxWidth=0.85*u,0.3*k.indexLabelTextBlock.maxWidth<u&&(k.indexLabelTextBlock.x-="right"===k.hemisphere?2:-2)),Math.abs(k.indexLabelTextBlock.y-k.indexLabelTextBlock.height/2-w.y)<B||Math.abs(k.indexLabelTextBlock.y+k.indexLabelTextBlock.height/
2-w.y)<B)&&(x/=Math.abs(Math.cos(k.indexLabelAngle)),9<x&&(x*=0.3),x>c&&(c=x)),x=x=0,0<k.indexLabelAngle&&k.indexLabelAngle<Math.PI?(x=e.y2-(k.indexLabelTextBlock.y+k.indexLabelTextBlock.height/2+5),x*=-1):x=e.y1-(k.indexLabelTextBlock.y-k.indexLabelTextBlock.height/2-5),0<x&&(!h&&k.indexLabelText&&(u=0<k.indexLabelAngle&&k.indexLabelAngle<Math.PI?-1:1,0===g(a,x*u)&&g(a,2*u)),Math.abs(k.indexLabelTextBlock.x-w.x)<B&&(x/=Math.abs(Math.sin(k.indexLabelAngle)),9<x&&(x*=0.3),x>c&&(c=x)));var G=function(a,
b,c){for(var d=[],e=0;d.push(q[b]),b!==c;b=(b+1+p.length)%p.length);d.sort(function(a,b){return a.y-b.y});for(b=0;b<d.length;b++)if(c=d[b],e<0.7*a)e+=c.indexLabelTextBlock.height,c.indexLabelTextBlock.text="",c.indexLabelText="",c.indexLabelTextBlock.measureText();else break};(function(){for(var a=-1,b=-1,c=0,e=!1,g=0;g<p.length;g++)if(e=!1,v=q[g],v.indexLabelText){var h=f(g);if(null!==h){var k=q[h];y=0;y=d(v,k);var l;if(l=0>y){l=v.indexLabelTextBlock.x;var m=v.indexLabelTextBlock.y-v.indexLabelTextBlock.height/
2,r=v.indexLabelTextBlock.y+v.indexLabelTextBlock.height/2,s=k.indexLabelTextBlock.y-k.indexLabelTextBlock.height/2,t=k.indexLabelTextBlock.x+k.indexLabelTextBlock.width,u=k.indexLabelTextBlock.y+k.indexLabelTextBlock.height/2;l=v.indexLabelTextBlock.x+v.indexLabelTextBlock.width<k.indexLabelTextBlock.x-n||l>t+n||m>u+n||r<s-n?!1:!0}l?(0>a&&(a=g),h!==a&&(b=h,c+=-y),0===g%Math.max(p.length/10,3)&&(e=!0)):e=!0;e&&(0<c&&0<=a&&0<=b)&&(G(c,a,b),b=a=-1,c=0)}}0<c&&G(c,a,b)})()}}function k(){l.plotArea.layoutManager.reset();
l.title&&(l.title.dockInsidePlotArea||"center"===l.title.horizontalAlign&&"center"===l.title.verticalAlign)&&l.title.render();if(l.subtitles)for(var a=0;a<l.subtitles.length;a++){var b=l.subtitles[a];(b.dockInsidePlotArea||"center"===b.horizontalAlign&&"center"===b.verticalAlign)&&b.render()}l.legend&&(l.legend.dockInsidePlotArea||"center"===l.legend.horizontalAlign&&"center"===l.legend.verticalAlign)&&l.legend.render();I.fAWm&&I.fAWm(l)}var l=this;if(!(0>=a.dataSeriesIndexes.length)){var m=this.data[a.dataSeriesIndexes[0]],
p=m.dataPoints,n=10,e=this.plotArea,q=[],r=2,s,z=1.3,v=20/180*Math.PI,t=6,w={x:(e.x2+e.x1)/2,y:(e.y2+e.y1)/2},u=0;a=!1;for(var y=0;y<p.length;y++)u+=Math.abs(p[y].y),!a&&("undefined"!==typeof p[y].indexLabel&&null!==p[y].indexLabel&&0<p[y].indexLabel.toString().length)&&(a=!0),!a&&("undefined"!==typeof p[y].label&&null!==p[y].label&&0<p[y].label.toString().length)&&(a=!0);if(0!==u){a=a||"undefined"!==typeof m.indexLabel&&null!==m.indexLabel&&0<m.indexLabel.toString().length;var B="inside"!==m.indexLabelPlacement&&
a?0.75*Math.min(e.width,e.height)/2:0.92*Math.min(e.width,e.height)/2;m.radius&&(B=Na(m.radius,B));var A="undefined"!==typeof m.innerRadius&&null!==m.innerRadius?Na(m.innerRadius,B):0.7*B,F=Math.min(A/B,(B-1)/B);this.pieDoughnutClickHandler=function(a){l.isAnimating||!x(a.dataSeries.explodeOnClick)&&!a.dataSeries.explodeOnClick||(a=a.dataPoint,a.exploded=a.exploded?!1:!0,1<this.dataPoints.length&&l._animator.animate(0,500,function(a){b(a);k()}))};c();h();h();h();h();this.disableToolTip=!0;this._animator.animate(0,
this.animatedRender?this.animationDuration:0,function(a){var b=l.plotArea.ctx;b.clearRect(e.x1,e.y1,e.width,e.height);b.fillStyle=l.backgroundColor;b.fillRect(e.x1,e.y1,e.width,e.height);a=q[0].startAngle+2*Math.PI*a;for(b=0;b<p.length;b++){var c=0===b?q[b].startAngle:d,d=c+(q[b].endAngle-q[b].startAngle),f=!1;d>a&&(d=a,f=!0);var g=p[b].color?p[b].color:m._colorSet[b%m._colorSet.length];d>c&&Fa(l.plotArea.ctx,q[b].center,q[b].radius,g,m.type,c,d,m.fillOpacity,q[b].percentInnerRadius);if(f)break}k()},
function(){l.disableToolTip=!1;l._animator.animate(0,l.animatedRender?500:0,function(a){b(a);k()})})}}};y.prototype.animationRequestId=null;y.prototype.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();y.prototype.cancelRequestAnimFrame=window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||
window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout;y.prototype.set=function(a,c,b){b="undefined"===typeof b?!0:b;"options"===a?(this.options=c,b&&this.render()):y.base.set.call(this,a,c,b)};y.prototype.exportChart=function(a){a="undefined"===typeof a?{}:a;var c=a.format?a.format:"png",b=a.fileName?a.fileName:this.exportFileName;if(a.toDataURL)return this.canvas.toDataURL("image/"+c);Aa(this.canvas,c,b)};y.prototype.print=function(){var a=this.exportChart({toDataURL:!0}),
c=document.createElement("iframe");c.setAttribute("class","canvasjs-chart-print-frame");c.setAttribute("style","position:absolute; width:100%; border: 0px; margin: 0px 0px 0px 0px; padding 0px 0px 0px 0px;");c.style.height=this.height+"px";this._canvasJSContainer.appendChild(c);var b=this,d=c.contentWindow||c.contentDocument.document||c.contentDocument;d.document.open();d.document.write('<!DOCTYPE HTML>\n<html><body style="margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px;"><img src="'+a+'"/><body/></html>');
d.document.close();setTimeout(function(){d.focus();d.print();setTimeout(function(){b._canvasJSContainer.removeChild(c)},1E3)},500)};ja.prototype.registerSpace=function(a,c){"top"===a?this._topOccupied+=c.height:"bottom"===a?this._bottomOccupied+=c.height:"left"===a?this._leftOccupied+=c.width:"right"===a&&(this._rightOccupied+=c.width)};ja.prototype.unRegisterSpace=function(a,c){"top"===a?this._topOccupied-=c.height:"bottom"===a?this._bottomOccupied-=c.height:"left"===a?this._leftOccupied-=c.width:
"right"===a&&(this._rightOccupied-=c.width)};ja.prototype.getFreeSpace=function(){return{x1:this._x1+this._leftOccupied,y1:this._y1+this._topOccupied,x2:this._x2-this._rightOccupied,y2:this._y2-this._bottomOccupied,width:this._x2-this._x1-this._rightOccupied-this._leftOccupied,height:this._y2-this._y1-this._bottomOccupied-this._topOccupied}};ja.prototype.reset=function(){this._rightOccupied=this._leftOccupied=this._bottomOccupied=this._topOccupied=this._padding};S(V,K);V.prototype.render=function(a){a&&
this.ctx.save();var c=this.ctx.font;this.ctx.textBaseline=this.textBaseline;var b=0;this._isDirty&&this.measureText(this.ctx);this.ctx.translate(this.x,this.y+b);"middle"===this.textBaseline&&(b=-this._lineHeight/2);this.ctx.font=this._getFontString();this.ctx.rotate(Math.PI/180*this.angle);var d=0,f=this.padding,g=null;(0<this.borderThickness&&this.borderColor||this.backgroundColor)&&this.ctx.roundRect(0,b,this.width,this.height,this.cornerRadius,this.borderThickness,this.backgroundColor,this.borderColor);
this.ctx.fillStyle=this.fontColor;for(b=0;b<this._wrappedText.lines.length;b++)g=this._wrappedText.lines[b],"right"===this.horizontalAlign?d=this.width-g.width-this.padding:"left"===this.horizontalAlign?d=this.padding:"center"===this.horizontalAlign&&(d=(this.width-2*this.padding)/2-g.width/2+this.padding),this.ctx.fillText(g.text,d,f),f+=g.height;this.ctx.font=c;a&&this.ctx.restore()};V.prototype.setText=function(a){this.text=a;this._isDirty=!0;this._wrappedText=null};V.prototype.measureText=function(){this._lineHeight=
Ia(this.fontFamily,this.fontSize,this.fontWeight);if(null===this.maxWidth)throw"Please set maxWidth and height for TextBlock";this._wrapText(this.ctx);this._isDirty=!1;return{width:this.width,height:this.height}};V.prototype._getLineWithWidth=function(a,c,b){a=String(a);if(!a)return{text:"",width:0};var d=b=0,f=a.length-1,g=Infinity;for(this.ctx.font=this._getFontString();d<=f;){var g=Math.floor((d+f)/2),h=a.substr(0,g+1);b=this.ctx.measureText(h).width;if(b<c)d=g+1;else if(b>c)f=g-1;else break}b>
c&&1<h.length&&(h=h.substr(0,h.length-1),b=this.ctx.measureText(h).width);c=!0;if(h.length===a.length||" "===a[h.length])c=!1;c&&(a=h.split(" "),1<a.length&&a.pop(),h=a.join(" "),b=this.ctx.measureText(h).width);return{text:h,width:b}};V.prototype._wrapText=function(){var a=new String(ka(String(this.text))),c=[],b=this.ctx.font,d=0,f=0;for(this.ctx.font=this._getFontString();0<a.length;){var g=this.maxHeight-2*this.padding,h=this._getLineWithWidth(a,this.maxWidth-2*this.padding,!1);h.height=this._lineHeight;
c.push(h);var k=f,f=Math.max(f,h.width),d=d+h.height,a=ka(a.slice(h.text.length,a.length));g&&d>g&&(h=c.pop(),d-=h.height,f=k)}this._wrappedText={lines:c,width:f,height:d};this.width=f+2*this.padding;this.height=d+2*this.padding;this.ctx.font=b};V.prototype._getFontString=function(){var a;a=""+(this.fontStyle?this.fontStyle+" ":"");a+=this.fontWeight?this.fontWeight+" ":"";a+=this.fontSize?this.fontSize+"px ":"";var c=this.fontFamily?this.fontFamily+"":"";!u&&c&&(c=c.split(",")[0],"'"!==c[0]&&'"'!==
c[0]&&(c="'"+c+"'"));return a+=c};S(ma,K);ma.prototype.render=function(){if(this.text){var a=this.dockInsidePlotArea?this.chart.plotArea:this.chart,c=a.layoutManager.getFreeSpace(),b=c.x1,d=c.y1,f=0,g=0,h=this.chart._menuButton&&this.chart.exportEnabled&&"top"===this.verticalAlign?22:0,k,l;"top"===this.verticalAlign||"bottom"===this.verticalAlign?(null===this.maxWidth&&(this.maxWidth=c.width-4-h*("center"===this.horizontalAlign?2:1)),g=0.5*c.height-this.margin-2,f=0):"center"===this.verticalAlign&&
("left"===this.horizontalAlign||"right"===this.horizontalAlign?(null===this.maxWidth&&(this.maxWidth=c.height-4),g=0.5*c.width-this.margin-2):"center"===this.horizontalAlign&&(null===this.maxWidth&&(this.maxWidth=c.width-4),g=0.5*c.height-4));this.wrap||(g=Math.min(g,Math.max(1.5*this.fontSize,this.fontSize+2.5*this.padding)));var g=new V(this.ctx,{fontSize:this.fontSize,fontFamily:this.fontFamily,fontColor:this.fontColor,fontStyle:this.fontStyle,fontWeight:this.fontWeight,horizontalAlign:this.horizontalAlign,
verticalAlign:this.verticalAlign,borderColor:this.borderColor,borderThickness:this.borderThickness,backgroundColor:this.backgroundColor,maxWidth:this.maxWidth,maxHeight:g,cornerRadius:this.cornerRadius,text:this.text,padding:this.padding,textBaseline:"top"}),m=g.measureText();"top"===this.verticalAlign||"bottom"===this.verticalAlign?("top"===this.verticalAlign?(d=c.y1+2,l="top"):"bottom"===this.verticalAlign&&(d=c.y2-2-m.height,l="bottom"),"left"===this.horizontalAlign?b=c.x1+2:"center"===this.horizontalAlign?
b=c.x1+c.width/2-m.width/2:"right"===this.horizontalAlign&&(b=c.x2-2-m.width-h),k=this.horizontalAlign,this.width=m.width,this.height=m.height):"center"===this.verticalAlign&&("left"===this.horizontalAlign?(b=c.x1+2,d=c.y2-2-(this.maxWidth/2-m.width/2),f=-90,l="left",this.width=m.height,this.height=m.width):"right"===this.horizontalAlign?(b=c.x2-2,d=c.y1+2+(this.maxWidth/2-m.width/2),f=90,l="right",this.width=m.height,this.height=m.width):"center"===this.horizontalAlign&&(d=a.y1+(a.height/2-m.height/
2),b=a.x1+(a.width/2-m.width/2),l="center",this.width=m.width,this.height=m.height),k="center");g.x=b;g.y=d;g.angle=f;g.horizontalAlign=k;g.render(!0);a.layoutManager.registerSpace(l,{width:this.width+("left"===l||"right"===l?this.margin+2:0),height:this.height+("top"===l||"bottom"===l?this.margin+2:0)});this.bounds={x1:b,y1:d,x2:b+this.width,y2:d+this.height};this.ctx.textBaseline="top"}};S(va,K);va.prototype.render=ma.prototype.render;S(wa,K);wa.prototype.render=function(){var a=this.dockInsidePlotArea?
this.chart.plotArea:this.chart,c=a.layoutManager.getFreeSpace(),b=null,d=0,f=0,g=0,h=0,k=this.chart.options.legend&&!x(this.chart.options.legend.markerMargin)?this.chart.options.legend.markerMargin:0.3*this.fontSize;this.height=0;var l=[],m=[];"top"===this.verticalAlign||"bottom"===this.verticalAlign?(this.orientation="horizontal",b=this.verticalAlign,g=null!==this.maxWidth?this.maxWidth:c.width,h=null!==this.maxHeight?this.maxHeight:0.5*c.height):"center"===this.verticalAlign&&(this.orientation=
"vertical",b=this.horizontalAlign,g=null!==this.maxWidth?this.maxWidth:0.5*c.width,h=null!==this.maxHeight?this.maxHeight:c.height);for(var p=0;p<this.dataSeries.length;p++){var n=this.dataSeries[p];if("pie"!==n.type&&"doughnut"!==n.type&&"funnel"!==n.type){var e=n.legendMarkerType?n.legendMarkerType:"line"!==n.type&&"stepLine"!==n.type&&"spline"!==n.type&&"scatter"!==n.type&&"bubble"!==n.type||!n.markerType?aa.getDefaultLegendMarker(n.type):n.markerType,q=n.legendText?n.legendText:this.itemTextFormatter?
this.itemTextFormatter({chart:this.chart,legend:this.options,dataSeries:n,dataPoint:null}):n.name,r=n.legendMarkerColor?n.legendMarkerColor:n.markerColor?n.markerColor:n._colorSet[0],s=n.markerSize||"line"!==n.type&&"stepLine"!==n.type&&"spline"!==n.type?0.75*this.lineHeight:0,u=n.legendMarkerBorderColor?n.legendMarkerBorderColor:n.markerBorderColor,v=n.legendMarkerBorderThickness?n.legendMarkerBorderThickness:n.markerBorderThickness?Math.max(1,Math.round(0.2*s)):0,q=this.chart.replaceKeywordsWithValue(q,
n.dataPoints[0],n,p),e={markerType:e,markerColor:r,text:q,textBlock:null,chartType:n.type,markerSize:s,lineColor:n._colorSet[0],dataSeriesIndex:n.index,dataPointIndex:null,markerBorderColor:u,markerBorderThickness:v};l.push(e)}else for(var t=0;t<n.dataPoints.length;t++){var w=n.dataPoints[t],e=w.legendMarkerType?w.legendMarkerType:n.legendMarkerType?n.legendMarkerType:aa.getDefaultLegendMarker(n.type),q=w.legendText?w.legendText:n.legendText?n.legendText:this.itemTextFormatter?this.itemTextFormatter({chart:this.chart,
legend:this.options,dataSeries:n,dataPoint:w}):w.name?w.name:"DataPoint: "+(t+1),r=w.legendMarkerColor?w.legendMarkerColor:n.legendMarkerColor?n.legendMarkerColor:w.color?w.color:n.color?n.color:n._colorSet[t%n._colorSet.length],s=0.75*this.lineHeight,u=w.legendMarkerBorderColor?w.legendMarkerBorderColor:n.legendMarkerBorderColor?n.legendMarkerBorderColor:w.markerBorderColor?w.markerBorderColor:n.markerBorderColor,v=w.legendMarkerBorderThickness?w.legendMarkerBorderThickness:n.legendMarkerBorderThickness?
n.legendMarkerBorderThickness:w.markerBorderThickness||n.markerBorderThickness?Math.max(1,Math.round(0.2*s)):0,q=this.chart.replaceKeywordsWithValue(q,w,n,t),e={markerType:e,markerColor:r,text:q,textBlock:null,chartType:n.type,markerSize:s,dataSeriesIndex:p,dataPointIndex:t,markerBorderColor:u,markerBorderThickness:v};(w.showInLegend||n.showInLegend&&!1!==w.showInLegend)&&l.push(e)}}!0===this.reversed&&l.reverse();if(0<l.length){n=null;t=q=w=0;q=null!==this.itemWidth?null!==this.itemMaxWidth?Math.min(this.itemWidth,
this.itemMaxWidth,g):Math.min(this.itemWidth,g):null!==this.itemMaxWidth?Math.min(this.itemMaxWidth,g):g;s=0===s?0.75*this.lineHeight:s;q-=s+k;for(p=0;p<l.length;p++){e=l[p];if("line"===e.chartType||"spline"===e.chartType||"stepLine"===e.chartType)q-=2*0.1*this.lineHeight;if(!(0>=h||"undefined"===typeof h||0>=q||"undefined"===typeof q)){if("horizontal"===this.orientation){e.textBlock=new V(this.ctx,{x:0,y:0,maxWidth:q,maxHeight:this.itemWrap?h:this.lineHeight,angle:0,text:e.text,horizontalAlign:"left",
fontSize:this.fontSize,fontFamily:this.fontFamily,fontWeight:this.fontWeight,fontColor:this.fontColor,fontStyle:this.fontStyle,textBaseline:"middle"});e.textBlock.measureText();null!==this.itemWidth&&(e.textBlock.width=this.itemWidth-(s+k+("line"===e.chartType||"spline"===e.chartType||"stepLine"===e.chartType?2*0.1*this.lineHeight:0)));if(!n||n.width+Math.round(e.textBlock.width+s+k+(0===n.width?0:this.horizontalSpacing)+("line"===e.chartType||"spline"===e.chartType||"stepLine"===e.chartType?2*0.1*
this.lineHeight:0))>g)n={items:[],width:0},m.push(n),this.height+=t,t=0;t=Math.max(t,e.textBlock.height)}else e.textBlock=new V(this.ctx,{x:0,y:0,maxWidth:q,maxHeight:!0===this.itemWrap?h:1.5*this.fontSize,angle:0,text:e.text,horizontalAlign:"left",fontSize:this.fontSize,fontFamily:this.fontFamily,fontWeight:this.fontWeight,fontColor:this.fontColor,fontStyle:this.fontStyle,textBaseline:"middle"}),e.textBlock.measureText(),null!==this.itemWidth&&(e.textBlock.width=this.itemWidth-(s+k+("line"===e.chartType||
"spline"===e.chartType||"stepLine"===e.chartType?2*0.1*this.lineHeight:0))),this.height<h-this.lineHeight?(n={items:[],width:0},m.push(n)):(n=m[w],w=(w+1)%m.length),this.height+=e.textBlock.height;e.textBlock.x=n.width;e.textBlock.y=0;n.width+=Math.round(e.textBlock.width+s+k+(0===n.width?0:this.horizontalSpacing)+("line"===e.chartType||"spline"===e.chartType||"stepLine"===e.chartType?2*0.1*this.lineHeight:0));n.items.push(e);this.width=Math.max(n.width,this.width)}}this.height=!1===this.itemWrap?
m.length*this.lineHeight:this.height+t;this.height=Math.min(h,this.height);this.width=Math.min(g,this.width)}"top"===this.verticalAlign?(f="left"===this.horizontalAlign?c.x1:"right"===this.horizontalAlign?c.x2-this.width:c.x1+c.width/2-this.width/2,d=c.y1):"center"===this.verticalAlign?(f="left"===this.horizontalAlign?c.x1:"right"===this.horizontalAlign?c.x2-this.width:c.x1+c.width/2-this.width/2,d=c.y1+c.height/2-this.height/2):"bottom"===this.verticalAlign&&(f="left"===this.horizontalAlign?c.x1:
"right"===this.horizontalAlign?c.x2-this.width:c.x1+c.width/2-this.width/2,d=c.y2-this.height);this.items=l;for(p=0;p<this.items.length;p++)e=l[p],e.id=++this.chart._eventManager.lastObjectId,this.chart._eventManager.objectMap[e.id]={id:e.id,objectType:"legendItem",legendItemIndex:p,dataSeriesIndex:e.dataSeriesIndex,dataPointIndex:e.dataPointIndex};for(p=c=0;p<m.length;p++){n=m[p];for(w=t=0;w<n.items.length;w++){e=n.items[w];r=e.textBlock.x+f+(0===w?0.2*s:this.horizontalSpacing);u=d+c;q=r;this.chart.data[e.dataSeriesIndex].visible||
(this.ctx.globalAlpha=0.5);this.ctx.save();this.ctx.beginPath();this.ctx.rect(f,d,g,Math.max(h-h%this.lineHeight,0));this.ctx.clip();if("line"===e.chartType||"stepLine"===e.chartType||"spline"===e.chartType)this.ctx.strokeStyle=e.lineColor,this.ctx.lineWidth=Math.ceil(this.lineHeight/8),this.ctx.beginPath(),this.ctx.moveTo(r-0.1*this.lineHeight,u+this.lineHeight/2),this.ctx.lineTo(r+0.85*this.lineHeight,u+this.lineHeight/2),this.ctx.stroke(),q-=0.1*this.lineHeight;M.drawMarker(r+s/2,u+this.lineHeight/
2,this.ctx,e.markerType,e.markerSize,e.markerColor,e.markerBorderColor,e.markerBorderThickness);e.textBlock.x=r+k+s;if("line"===e.chartType||"stepLine"===e.chartType||"spline"===e.chartType)e.textBlock.x+=0.1*this.lineHeight;e.textBlock.y=Math.round(u+this.lineHeight/2);e.textBlock.render(!0);this.ctx.restore();t=0<w?Math.max(t,e.textBlock.height):e.textBlock.height;this.chart.data[e.dataSeriesIndex].visible||(this.ctx.globalAlpha=1);r=D(e.id);this.ghostCtx.fillStyle=r;this.ghostCtx.beginPath();this.ghostCtx.fillRect(q,
e.textBlock.y-this.lineHeight/2,e.textBlock.x+e.textBlock.width-q,e.textBlock.height);e.x1=this.chart._eventManager.objectMap[e.id].x1=q;e.y1=this.chart._eventManager.objectMap[e.id].y1=e.textBlock.y-this.lineHeight/2;e.x2=this.chart._eventManager.objectMap[e.id].x2=e.textBlock.x+e.textBlock.width;e.y2=this.chart._eventManager.objectMap[e.id].y2=e.textBlock.y+e.textBlock.height-this.lineHeight/2}c+=t}0<l.length&&a.layoutManager.registerSpace(b,{width:this.width+2+2,height:this.height+5+5});this.bounds=
{x1:f,y1:d,x2:f+this.width,y2:d+this.height}};S(Ba,K);Ba.prototype.render=function(){var a=this.chart.layoutManager.getFreeSpace();this.ctx.fillStyle="red";this.ctx.fillRect(a.x1,a.y1,a.x2,a.y2)};S(aa,K);aa.prototype.getDefaultAxisPlacement=function(){var a=this.type;if("column"===a||"line"===a||"stepLine"===a||"spline"===a||"area"===a||"stepArea"===a||"splineArea"===a||"stackedColumn"===a||"stackedLine"===a||"bubble"===a||"scatter"===a||"stackedArea"===a||"stackedColumn100"===a||"stackedLine100"===
a||"stackedArea100"===a||"candlestick"===a||"ohlc"===a||"rangeColumn"===a||"rangeArea"===a||"rangeSplineArea"===a)return"normal";if("bar"===a||"stackedBar"===a||"stackedBar100"===a||"rangeBar"===a)return"xySwapped";if("pie"===a||"doughnut"===a||"funnel"===a)return"none";window.console.log("Unknown Chart Type: "+a);return null};aa.getDefaultLegendMarker=function(a){if("column"===a||"stackedColumn"===a||"stackedLine"===a||"bar"===a||"stackedBar"===a||"stackedBar100"===a||"bubble"===a||"scatter"===a||
"stackedColumn100"===a||"stackedLine100"===a||"stepArea"===a||"candlestick"===a||"ohlc"===a||"rangeColumn"===a||"rangeBar"===a||"rangeArea"===a||"rangeSplineArea"===a)return"square";if("line"===a||"stepLine"===a||"spline"===a||"pie"===a||"doughnut"===a||"funnel"===a)return"circle";if("area"===a||"splineArea"===a||"stackedArea"===a||"stackedArea100"===a)return"triangle";window.console.log("Unknown Chart Type: "+a);return null};aa.prototype.getDataPointAtX=function(a,c){if(!this.dataPoints||0===this.dataPoints.length)return null;
var b={dataPoint:null,distance:Infinity,index:NaN},d=null,f=0,g=0,h=1,k=Infinity,l=0,m=0,p=0;"none"!==this.chart.plotInfo.axisPlacement&&(this.axisX.logarithmic?(p=Math.log(this.dataPoints[this.dataPoints.length-1].x/this.dataPoints[0].x),p=1<p?Math.min(Math.max((this.dataPoints.length-1)/p*Math.log(a/this.dataPoints[0].x)>>0,0),this.dataPoints.length):0):(p=this.dataPoints[this.dataPoints.length-1].x-this.dataPoints[0].x,p=0<p?Math.min(Math.max((this.dataPoints.length-1)/p*(a-this.dataPoints[0].x)>>
0,0),this.dataPoints.length):0));for(;;){g=0<h?p+f:p-f;if(0<=g&&g<this.dataPoints.length){var d=this.dataPoints[g],n=this.axisX.logarithmic?d.x>a?d.x/a:a/d.x:Math.abs(d.x-a);n<b.distance&&(b.dataPoint=d,b.distance=n,b.index=g);d=n;d<=k?k=d:0<h?l++:m++;if(1E3<l&&1E3<m)break}else if(0>p-f&&p+f>=this.dataPoints.length)break;-1===h?(f++,h=1):h=-1}return c||b.dataPoint.x!==a?c&&null!==b.dataPoint?b:null:b};aa.prototype.getDataPointAtXY=function(a,c,b){if(!this.dataPoints||0===this.dataPoints.length||a<
this.chart.plotArea.x1||a>this.chart.plotArea.x2||c<this.chart.plotArea.y1||c>this.chart.plotArea.y2)return null;b=b||!1;var d=[],f=0,g=0,h=1,k=!1,l=Infinity,m=0,p=0,n=0;"none"!==this.chart.plotInfo.axisPlacement&&(n=(this.chart.axisX[0]?this.chart.axisX[0]:this.chart.axisX2[0]).getXValueAt({x:a,y:c}),this.axisX.logarithmic?(g=Math.log(this.dataPoints[this.dataPoints.length-1].x/this.dataPoints[0].x),n=1<g?Math.min(Math.max((this.dataPoints.length-1)/g*Math.log(n/this.dataPoints[0].x)>>0,0),this.dataPoints.length):
0):(g=this.dataPoints[this.dataPoints.length-1].x-this.dataPoints[0].x,n=0<g?Math.min(Math.max((this.dataPoints.length-1)/g*(n-this.dataPoints[0].x)>>0,0),this.dataPoints.length):0));for(;;){g=0<h?n+f:n-f;if(0<=g&&g<this.dataPoints.length){var e=this.chart._eventManager.objectMap[this.dataPointIds[g]],q=this.dataPoints[g],r=null;if(e){switch(this.type){case "column":case "stackedColumn":case "stackedColumn100":case "bar":case "stackedBar":case "stackedBar100":case "rangeColumn":case "rangeBar":a>=
e.x1&&(a<=e.x2&&c>=e.y1&&c<=e.y2)&&(d.push({dataPoint:q,dataPointIndex:g,dataSeries:this,distance:Math.min(Math.abs(e.x1-a),Math.abs(e.x2-a),Math.abs(e.y1-c),Math.abs(e.y2-c))}),k=!0);break;case "line":case "stepLine":case "spline":case "area":case "stepArea":case "stackedArea":case "stackedArea100":case "splineArea":case "scatter":var s=Q("markerSize",q,this)||4,u=b?20:s,r=Math.sqrt(Math.pow(e.x1-a,2)+Math.pow(e.y1-c,2));r<=u&&d.push({dataPoint:q,dataPointIndex:g,dataSeries:this,distance:r});g=Math.abs(e.x1-
a);g<=l?l=g:0<h?m++:p++;r<=s/2&&(k=!0);break;case "rangeArea":case "rangeSplineArea":s=Q("markerSize",q,this)||4;u=b?20:s;r=Math.min(Math.sqrt(Math.pow(e.x1-a,2)+Math.pow(e.y1-c,2)),Math.sqrt(Math.pow(e.x1-a,2)+Math.pow(e.y2-c,2)));r<=u&&d.push({dataPoint:q,dataPointIndex:g,dataSeries:this,distance:r});g=Math.abs(e.x1-a);g<=l?l=g:0<h?m++:p++;r<=s/2&&(k=!0);break;case "bubble":s=e.size;r=Math.sqrt(Math.pow(e.x1-a,2)+Math.pow(e.y1-c,2));r<=s/2&&(d.push({dataPoint:q,dataPointIndex:g,dataSeries:this,
distance:r}),k=!0);break;case "pie":case "doughnut":s=e.center;u="doughnut"===this.type?e.percentInnerRadius*e.radius:0;r=Math.sqrt(Math.pow(s.x-a,2)+Math.pow(s.y-c,2));r<e.radius&&r>u&&(r=Math.atan2(c-s.y,a-s.x),0>r&&(r+=2*Math.PI),r=Number(((180*(r/Math.PI)%360+360)%360).toFixed(12)),s=Number(((180*(e.startAngle/Math.PI)%360+360)%360).toFixed(12)),u=Number(((180*(e.endAngle/Math.PI)%360+360)%360).toFixed(12)),0===u&&1<e.endAngle&&(u=360),s>=u&&0!==q.y&&(u+=360,r<s&&(r+=360)),r>s&&r<u&&(d.push({dataPoint:q,
dataPointIndex:g,dataSeries:this,distance:0}),k=!0));break;case "candlestick":if(a>=e.x1-e.borderThickness/2&&a<=e.x2+e.borderThickness/2&&c>=e.y2-e.borderThickness/2&&c<=e.y3+e.borderThickness/2||Math.abs(e.x2-a+e.x1-a)<e.borderThickness&&c>=e.y1&&c<=e.y4)d.push({dataPoint:q,dataPointIndex:g,dataSeries:this,distance:Math.min(Math.abs(e.x1-a),Math.abs(e.x2-a),Math.abs(e.y2-c),Math.abs(e.y3-c))}),k=!0;break;case "ohlc":if(Math.abs(e.x2-a+e.x1-a)<e.borderThickness&&c>=e.y2&&c<=e.y3||a>=e.x1&&a<=(e.x2+
e.x1)/2&&c>=e.y1-e.borderThickness/2&&c<=e.y1+e.borderThickness/2||a>=(e.x1+e.x2)/2&&a<=e.x2&&c>=e.y4-e.borderThickness/2&&c<=e.y4+e.borderThickness/2)d.push({dataPoint:q,dataPointIndex:g,dataSeries:this,distance:Math.min(Math.abs(e.x1-a),Math.abs(e.x2-a),Math.abs(e.y2-c),Math.abs(e.y3-c))}),k=!0}if(k||1E3<m&&1E3<p)break}}else if(0>n-f&&n+f>=this.dataPoints.length)break;-1===h?(f++,h=1):h=-1}a=null;for(c=0;c<d.length;c++)a?d[c].distance<=a.distance&&(a=d[c]):a=d[c];return a};aa.prototype.getMarkerProperties=
function(a,c,b,d){var f=this.dataPoints;return{x:c,y:b,ctx:d,type:f[a].markerType?f[a].markerType:this.markerType,size:f[a].markerSize?f[a].markerSize:this.markerSize,color:f[a].markerColor?f[a].markerColor:this.markerColor?this.markerColor:f[a].color?f[a].color:this.color?this.color:this._colorSet[a%this._colorSet.length],borderColor:f[a].markerBorderColor?f[a].markerBorderColor:this.markerBorderColor?this.markerBorderColor:null,borderThickness:f[a].markerBorderThickness?f[a].markerBorderThickness:
this.markerBorderThickness?this.markerBorderThickness:null}};S(A,K);A.prototype.createExtraLabelsForLog=function(a){a=(a||0)+1;if(!(5<a)){var c=this.logLabelValues[0]||this.intervalStartPosition;if(Math.log(this.range)/Math.log(c/this.viewportMinimum)<this.noTicks-1){for(var b=A.getNiceNumber((c-this.viewportMinimum)/Math.min(Math.max(2,this.noTicks-this.logLabelValues.length),3),!0),d=Math.ceil(this.viewportMinimum/b)*b;d<c;d+=b)d<this.viewportMinimum||this.logLabelValues.push(d);this.logLabelValues.sort(ya);
this.createExtraLabelsForLog(a)}}};A.prototype.createLabels=function(){var a,c,b=0,d=0,f,g=0,h=0,d=0,k=this.interval,l=0,m,p=0.6*this.chart.height;if("axisX"!==this.type||"dateTime"!==this.chart.plotInfo.axisXValueType||this.logarithmic){f=this.viewportMaximum;if(this.labels){a=Math.ceil(k);for(var k=Math.ceil(this.intervalStartPosition),n=!1,b=k;b<this.viewportMaximum;b+=a)if(this.labels[b])n=!0;else{n=!1;break}n&&(this.interval=a,this.intervalStartPosition=k)}if(this.logarithmic&&!this.equidistantInterval){this.logLabelValues||
(this.logLabelValues=[],this.createExtraLabelsForLog());for(var e=0;e<this.logLabelValues.length;e++)b=this.logLabelValues[e],b<this.viewportMinimum||(a=this.labelFormatter?this.labelFormatter({chart:this.chart,axis:this.options,value:b,label:this.labels[b]?this.labels[b]:null}):"axisX"===this.type&&this.labels[b]?this.labels[b]:da(b,this.valueFormatString,this.chart._cultureInfo),a=new V(this.ctx,{x:0,y:0,maxWidth:g,maxHeight:h,angle:this.labelAngle,text:this.prefix+a+this.suffix,backgroundColor:this.labelBackgroundColor,
horizontalAlign:"left",fontSize:this.labelFontSize,fontFamily:this.labelFontFamily,fontWeight:this.labelFontWeight,fontColor:this.labelFontColor,fontStyle:this.labelFontStyle,textBaseline:"middle",borderThickness:0}),this._labels.push({position:b,textBlock:a,effectiveHeight:null}))}for(b=this.intervalStartPosition;b<=f;b=parseFloat((this.logarithmic&&this.equidistantInterval?b*Math.pow(this.logarithmBase,this.interval):b+this.interval).toFixed(14)))a=this.labelFormatter?this.labelFormatter({chart:this.chart,
axis:this.options,value:b,label:this.labels[b]?this.labels[b]:null}):"axisX"===this.type&&this.labels[b]?this.labels[b]:da(b,this.valueFormatString,this.chart._cultureInfo),a=new V(this.ctx,{x:0,y:0,maxWidth:g,maxHeight:h,angle:this.labelAngle,text:this.prefix+a+this.suffix,horizontalAlign:"left",backgroundColor:this.labelBackgroundColor,fontSize:this.labelFontSize,fontFamily:this.labelFontFamily,fontWeight:this.labelFontWeight,fontColor:this.labelFontColor,fontStyle:this.labelFontStyle,textBaseline:"middle",
borderThickness:0}),this._labels.push({position:b,textBlock:a,effectiveHeight:null})}else for(this.intervalStartPosition=this.getLabelStartPoint(new Date(this.viewportMinimum),this.intervalType,this.interval),f=Ga(new Date(this.viewportMaximum),this.interval,this.intervalType),b=this.intervalStartPosition;b<f;Ga(b,k,this.intervalType))a=b.getTime(),a=this.labelFormatter?this.labelFormatter({chart:this.chart,axis:this.options,value:b,label:this.labels[b]?this.labels[b]:null}):"axisX"===this.type&&
this.labels[a]?this.labels[a]:Da(b,this.valueFormatString,this.chart._cultureInfo),a=new V(this.ctx,{x:0,y:0,maxWidth:g,backgroundColor:this.labelBackgroundColor,maxHeight:h,angle:this.labelAngle,text:this.prefix+a+this.suffix,horizontalAlign:"left",fontSize:this.labelFontSize,fontFamily:this.labelFontFamily,fontWeight:this.labelFontWeight,fontColor:this.labelFontColor,fontStyle:this.labelFontStyle,textBaseline:"middle"}),this._labels.push({position:b.getTime(),textBlock:a,effectiveHeight:null});
if("bottom"===this._position||"top"===this._position)l=this.logarithmic&&!this.equidistantInterval&&2<=this._labels.length?this.lineCoordinates.width*Math.log(Math.min(this._labels[this._labels.length-1].position/this._labels[this._labels.length-2].position,this._labels[1].position/this._labels[0].position))/Math.log(this.range):this.lineCoordinates.width/(this.logarithmic&&this.equidistantInterval?Math.log(this.range)/Math.log(this.logarithmBase):Math.abs(this.range))*G[this.intervalType+"Duration"]*
this.interval,g="undefined"===typeof this.options.labelMaxWidth?0.5*this.chart.width>>0:this.options.labelMaxWidth,this.chart.panEnabled||(h="undefined"===typeof this.options.labelWrap||this.labelWrap?0.8*this.chart.height>>0:1.5*this.labelFontSize);else if("left"===this._position||"right"===this._position)l=this.logarithmic&&!this.equidistantInterval&&2<=this._labels.length?this.lineCoordinates.height*Math.log(Math.min(this._labels[this._labels.length-1].position/this._labels[this._labels.length-
2].position,this._labels[1].position/this._labels[0].position))/Math.log(this.range):this.lineCoordinates.height/(this.logarithmic&&this.equidistantInterval?Math.log(this.range)/Math.log(this.logarithmBase):Math.abs(this.range))*G[this.intervalType+"Duration"]*this.interval,this.chart.panEnabled||(g="undefined"===typeof this.options.labelMaxWidth?0.3*this.chart.width>>0:this.options.labelMaxWidth),h="undefined"===typeof this.options.labelWrap||this.labelWrap?0.3*this.chart.height>>0:1.5*this.labelFontSize;
for(d=0;d<this._labels.length;d++){a=this._labels[d].textBlock;a.maxWidth=g;a.maxHeight=h;var q=a.measureText();m=q.height}f=[];n=k=0;if(this.labelAutoFit||this.options.labelAutoFit)if(x(this.labelAngle)||(this.labelAngle=(this.labelAngle%360+360)%360,90<this.labelAngle&&270>this.labelAngle?this.labelAngle-=180:270<=this.labelAngle&&360>=this.labelAngle&&(this.labelAngle-=360)),"bottom"===this._position||"top"===this._position)if(g=0.9*l>>0,n=0,!this.chart.panEnabled&&1<=this._labels.length){this.sessionVariables.labelFontSize=
this.labelFontSize;this.sessionVariables.labelMaxWidth=g;this.sessionVariables.labelMaxHeight=h;this.sessionVariables.labelAngle=this.labelAngle;this.sessionVariables.labelWrap=this.labelWrap;for(b=0;b<this._labels.length;b++){a=this._labels[b].textBlock;for(var r,s=a.text.split(" "),d=0;d<s.length;d++)e=s[d],this.ctx.font=a.fontStyle+" "+a.fontWeight+" "+a.fontSize+"px "+a.fontFamily,e=this.ctx.measureText(e),e.width>n&&(r=b,n=e.width)}b=0;for(b=this.intervalStartPosition<this.viewportMinimum?1:
0;b<this._labels.length;b++)if(a=this._labels[b].textBlock,q=a.measureText(),b<this._labels.length-1&&(e=b+1,c=this._labels[e].textBlock,c=c.measureText()),f.push(a.height),this.sessionVariables.labelMaxHeight=Math.max.apply(Math,f),Math.cos(Math.PI/180*Math.abs(this.labelAngle)),Math.sin(Math.PI/180*Math.abs(this.labelAngle)),d=g*Math.sin(Math.PI/180*Math.abs(this.labelAngle))+(h-a.fontSize/2)*Math.cos(Math.PI/180*Math.abs(this.labelAngle)),x(this.options.labelAngle)&&isNaN(this.options.labelAngle)&&
0!==this.options.labelAngle)if(this.sessionVariables.labelMaxHeight=0===this.labelAngle?h:Math.min((d-g*Math.cos(Math.PI/180*Math.abs(this.labelAngle)))/Math.sin(Math.PI/180*Math.abs(this.labelAngle)),d),s=(p-(m+a.fontSize/2)*Math.cos(Math.PI/180*Math.abs(-25)))/Math.sin(Math.PI/180*Math.abs(-25)),!x(this.options.labelWrap))this.labelWrap?x(this.options.labelMaxWidth)?(this.sessionVariables.labelMaxWidth=Math.min(Math.max(g,n),s),this.sessionVariables.labelWrap=this.labelWrap,q.width+c.width>>0>2*
g&&(this.sessionVariables.labelAngle=-25)):(this.sessionVariables.labelWrap=this.labelWrap,this.sessionVariables.labelMaxWidth=this.options.labelMaxWidth,this.sessionVariables.labelAngle=this.sessionVariables.labelMaxWidth>g?-25:this.sessionVariables.labelAngle):x(this.options.labelMaxWidth)?(this.sessionVariables.labelWrap=this.labelWrap,this.sessionVariables.labelMaxHeight=h,this.sessionVariables.labelMaxWidth=g,q.width+c.width>>0>2*g&&(this.sessionVariables.labelAngle=-25,this.sessionVariables.labelMaxWidth=
s)):(this.sessionVariables.labelAngle=this.sessionVariables.labelMaxWidth>g?-25:this.sessionVariables.labelAngle,this.sessionVariables.labelMaxWidth=this.options.labelMaxWidth,this.sessionVariables.labelMaxHeight=h,this.sessionVariables.labelWrap=this.labelWrap);else{if(x(this.options.labelWrap))if(!x(this.options.labelMaxWidth))this.options.labelMaxWidth<g?(this.sessionVariables.labelMaxWidth=this.options.labelMaxWidth,this.sessionVariables.labelMaxHeight=d):(this.sessionVariables.labelAngle=-25,
this.sessionVariables.labelMaxWidth=this.options.labelMaxWidth,this.sessionVariables.labelMaxHeight=h);else if(!x(c))if(d=q.width+c.width>>0,e=this.labelFontSize,n<g)d-2*g>k&&(k=d-2*g,d>=2*g&&d<2.2*g?(this.sessionVariables.labelMaxWidth=g,x(this.options.labelFontSize)&&12<e&&(e=Math.floor(12/13*e),a.measureText()),this.sessionVariables.labelFontSize=x(this.options.labelFontSize)?e:this.options.labelFontSize,this.sessionVariables.labelAngle=this.labelAngle):d>=2.2*g&&d<2.8*g?(this.sessionVariables.labelAngle=
-25,this.sessionVariables.labelMaxWidth=s,this.sessionVariables.labelFontSize=e):d>=2.8*g&&d<3.2*g?(this.sessionVariables.labelMaxWidth=Math.max(g,n),this.sessionVariables.labelWrap=!0,x(this.options.labelFontSize)&&12<this.labelFontSize&&(this.labelFontSize=Math.floor(12/13*this.labelFontSize),a.measureText()),this.sessionVariables.labelFontSize=x(this.options.labelFontSize)?e:this.options.labelFontSize,this.sessionVariables.labelAngle=this.labelAngle):d>=3.2*g&&d<3.6*g?(this.sessionVariables.labelAngle=
-25,this.sessionVariables.labelWrap=!0,this.sessionVariables.labelMaxWidth=s,this.sessionVariables.labelFontSize=this.labelFontSize):d>3.6*g&&d<5*g?(x(this.options.labelFontSize)&&12<e&&(e=Math.floor(12/13*e),a.measureText()),this.sessionVariables.labelFontSize=x(this.options.labelFontSize)?e:this.options.labelFontSize,this.sessionVariables.labelWrap=!0,this.sessionVariables.labelAngle=-25,this.sessionVariables.labelMaxWidth=s):d>5*g&&(this.sessionVariables.labelWrap=!0,this.sessionVariables.labelMaxWidth=
g,this.sessionVariables.labelFontSize=e,this.sessionVariables.labelMaxHeight=h,this.sessionVariables.labelAngle=this.labelAngle));else if(r===b&&(0===r&&n+this._labels[r+1].textBlock.measureText().width-2*g>k||r===this._labels.length-1&&n+this._labels[r-1].textBlock.measureText().width-2*g>k||0<r&&r<this._labels.length-1&&n+this._labels[r+1].textBlock.measureText().width-2*g>k&&n+this._labels[r-1].textBlock.measureText().width-2*g>k))k=0===r?n+this._labels[r+1].textBlock.measureText().width-2*g:n+
this._labels[r-1].textBlock.measureText().width-2*g,this.sessionVariables.labelFontSize=x(this.options.labelFontSize)?e:this.options.labelFontSize,this.sessionVariables.labelWrap=!0,this.sessionVariables.labelAngle=-25,this.sessionVariables.labelMaxWidth=s;else if(0===k)for(this.sessionVariables.labelFontSize=x(this.options.labelFontSize)?e:this.options.labelFontSize,this.sessionVariables.labelWrap=!0,d=0;d<this._labels.length;d++)a=this._labels[d].textBlock,a.maxWidth=this.sessionVariables.labelMaxWidth=
Math.min(Math.max(g,n),s),q=a.measureText(),d<this._labels.length-1&&(e=d+1,c=this._labels[e].textBlock,c.maxWidth=this.sessionVariables.labelMaxWidth=Math.min(Math.max(g,n),s),c=c.measureText(),q.width+c.width>>0>2*g&&(this.sessionVariables.labelAngle=-25))}else(this.sessionVariables.labelAngle=this.labelAngle,this.sessionVariables.labelMaxHeight=0===this.labelAngle?h:Math.min((d-g*Math.cos(Math.PI/180*Math.abs(this.labelAngle)))/Math.sin(Math.PI/180*Math.abs(this.labelAngle)),d),s=0!=this.labelAngle?
(p-(m+a.fontSize/2)*Math.cos(Math.PI/180*Math.abs(this.labelAngle)))/Math.sin(Math.PI/180*Math.abs(this.labelAngle)):g,this.sessionVariables.labelMaxHeight=h=this.labelWrap?(p-s*Math.sin(Math.PI/180*Math.abs(this.labelAngle)))/Math.cos(Math.PI/180*Math.abs(this.labelAngle)):1.5*this.labelFontSize,x(this.options.labelWrap))?x(this.options.labelWrap)&&(this.labelWrap&&!x(this.options.labelMaxWidth)?(this.sessionVariables.labelWrap=this.labelWrap,this.sessionVariables.labelMaxWidth=this.options.labelMaxWidth?
this.options.labelMaxWidth:s,this.sessionVariables.labelMaxHeight=h):(this.sessionVariables.labelAngle=this.labelAngle,this.sessionVariables.labelMaxWidth=s,this.sessionVariables.labelMaxHeight=d<0.9*l?0.9*l:d,this.sessionVariables.labelWrap=this.labelWrap)):(this.options.labelWrap?(this.sessionVariables.labelWrap=this.labelWrap,this.sessionVariables.labelMaxWidth=this.options.labelMaxWidth?this.options.labelMaxWidth:s):(x(this.options.labelMaxWidth),this.sessionVariables.labelMaxWidth=this.options.labelMaxWidth?
this.options.labelMaxWidth:s,this.sessionVariables.labelWrap=this.labelWrap),this.sessionVariables.labelMaxHeight=h);for(d=0;d<this._labels.length;d++)a=this._labels[d].textBlock,a.maxWidth=this.labelMaxWidth=this.sessionVariables.labelMaxWidth,a.fontSize=this.sessionVariables.labelFontSize,a.angle=this.labelAngle=this.sessionVariables.labelAngle,a.wrap=this.labelWrap=this.sessionVariables.labelWrap,a.maxHeight=this.sessionVariables.labelMaxHeight,a.measureText()}else for(b=0;b<this._labels.length;b++)a=
this._labels[b].textBlock,a.maxWidth=this.labelMaxWidth=x(this.options.labelMaxWidth)?this.sessionVariables.labelMaxWidth:this.options.labelMaxWidth,a.fontSize=this.labelFontSize=x(this.options.labelFontSize)?this.sessionVariables.labelFontSize:this.options.labelFontSize,a.angle=this.labelAngle=x(this.options.labelAngle)?this.sessionVariables.labelAngle:this.labelAngle,a.wrap=this.labelWrap=x(this.options.labelWrap)?this.sessionVariables.labelWrap:this.options.labelWrap,a.maxHeight=this.sessionVariables.labelMaxHeight,
a.measureText();else if("left"===this._position||"right"===this._position)if(g=x(this.options.labelMaxWidth)?0.3*this.chart.width>>0:this.options.labelMaxWidth,h="undefined"===typeof this.options.labelWrap||this.labelWrap?0.3*this.chart.height>>0:1.5*this.labelFontSize,!this.chart.panEnabled&&1<=this._labels.length){this.sessionVariables.labelFontSize=this.labelFontSize;this.sessionVariables.labelMaxWidth=g;this.sessionVariables.labelMaxHeight=h;this.sessionVariables.labelAngle=x(this.sessionVariables.labelAngle)?
0:this.sessionVariables.labelAngle;this.sessionVariables.labelWrap=this.labelWrap;for(b=0;b<this._labels.length;b++)(a=this._labels[b].textBlock,q=a.measureText(),b<this._labels.length-1&&(e=b+1,c=this._labels[e].textBlock,c=c.measureText()),f.push(a.height),this.sessionVariables.labelMaxHeight=Math.max.apply(Math,f),d=g*Math.sin(Math.PI/180*Math.abs(this.labelAngle))+(h-a.fontSize/2)*Math.cos(Math.PI/180*Math.abs(this.labelAngle)),Math.cos(Math.PI/180*Math.abs(this.labelAngle)),Math.sin(Math.PI/
180*Math.abs(this.labelAngle)),x(this.options.labelAngle)&&isNaN(this.options.labelAngle)&&0!==this.options.labelAngle)?x(this.options.labelWrap)?x(this.options.labelWrap)&&(x(this.options.labelMaxWidth)?x(c)||(l=q.height+c.height>>0,l-2*h>n&&(n=l-2*h,l>=2*h&&l<2.4*h?(x(this.options.labelFontSize)&&12<this.labelFontSize&&(this.labelFontSize=Math.floor(12/13*this.labelFontSize),a.measureText()),this.sessionVariables.labelMaxHeight=h,this.sessionVariables.labelFontSize=x(this.options.labelFontSize)?
this.labelFontSize:this.options.labelFontSize):l>=2.4*h&&l<2.8*h?(this.sessionVariables.labelMaxHeight=d,this.sessionVariables.labelFontSize=this.labelFontSize,this.sessionVariables.labelWrap=!0):l>=2.8*h&&l<3.2*h?(this.sessionVariables.labelMaxHeight=h,this.sessionVariables.labelWrap=!0,x(this.options.labelFontSize)&&12<this.labelFontSize&&(this.labelFontSize=Math.floor(12/13*this.labelFontSize),a.measureText()),this.sessionVariables.labelFontSize=x(this.options.labelFontSize)?this.labelFontSize:
this.options.labelFontSize,this.sessionVariables.labelAngle=x(this.sessionVariables.labelAngle)?0:this.sessionVariables.labelAngle):l>=3.2*h&&l<3.6*h?(this.sessionVariables.labelMaxHeight=d,this.sessionVariables.labelWrap=!0,this.sessionVariables.labelFontSize=this.labelFontSize):l>3.6*h&&l<10*h?(x(this.options.labelFontSize)&&12<this.labelFontSize&&(this.labelFontSize=Math.floor(12/13*this.labelFontSize),a.measureText()),this.sessionVariables.labelFontSize=x(this.options.labelFontSize)?this.labelFontSize:
this.options.labelFontSize,this.sessionVariables.labelMaxWidth=g,this.sessionVariables.labelMaxHeight=h,this.sessionVariables.labelAngle=x(this.sessionVariables.labelAngle)?0:this.sessionVariables.labelAngle):l>10*h&&l<50*h&&(x(this.options.labelFontSize)&&12<this.labelFontSize&&(this.labelFontSize=Math.floor(12/13*this.labelFontSize),a.measureText()),this.sessionVariables.labelFontSize=x(this.options.labelFontSize)?this.labelFontSize:this.options.labelFontSize,this.sessionVariables.labelMaxHeight=
h,this.sessionVariables.labelMaxWidth=g,this.sessionVariables.labelAngle=x(this.sessionVariables.labelAngle)?0:this.sessionVariables.labelAngle))):(this.sessionVariables.labelMaxHeight=h,this.sessionVariables.labelMaxWidth=this.options.labelMaxWidth?this.options.labelMaxWidth:this.sessionVariables.labelMaxWidth)):(this.sessionVariables.labelMaxWidth=this.labelWrap?this.options.labelMaxWidth?this.options.labelMaxWidth:this.sessionVariables.labelMaxWidth:this.labelMaxWidth?this.options.labelMaxWidth?
this.options.labelMaxWidth:this.sessionVariables.labelMaxWidth:g,this.sessionVariables.labelMaxHeight=h):(this.sessionVariables.labelAngle=this.labelAngle,this.sessionVariables.labelMaxWidth=0===this.labelAngle?g:Math.min((d-h*Math.sin(Math.PI/180*Math.abs(this.labelAngle)))/Math.cos(Math.PI/180*Math.abs(this.labelAngle)),h),x(this.options.labelWrap))?x(this.options.labelWrap)&&(this.labelWrap&&!x(this.options.labelMaxWidth)?(this.sessionVariables.labelMaxWidth=this.options.labelMaxWidth?this.options.labelMaxWidth>
this.options.labelMaxWidth:this.sessionVariables.labelMaxWidth,this.sessionVariables.labelWrap=this.labelWrap,this.sessionVariables.labelMaxHeight=d):(this.sessionVariables.labelMaxWidth=this.options.labelMaxWidth?this.options.labelMaxWidth:g,this.sessionVariables.labelMaxHeight=0===this.labelAngle?h:d,x(this.options.labelMaxWidth)&&(this.sessionVariables.labelAngle=this.labelAngle))):this.options.labelWrap?(this.sessionVariables.labelMaxHeight=0===this.labelAngle?h:d,this.sessionVariables.labelWrap=
this.labelWrap,this.sessionVariables.labelMaxWidth=g):(this.sessionVariables.labelMaxHeight=h,x(this.options.labelMaxWidth),this.sessionVariables.labelMaxWidth=this.options.labelMaxWidth?this.options.labelMaxWidth:this.sessionVariables.labelMaxWidth,this.sessionVariables.labelWrap=this.labelWrap);for(d=0;d<this._labels.length;d++)a=this._labels[d].textBlock,a.maxWidth=this.labelMaxWidth=this.sessionVariables.labelMaxWidth,a.fontSize=this.labelFontSize=this.sessionVariables.labelFontSize,a.angle=this.labelAngle=
this.sessionVariables.labelAngle,a.wrap=this.labelWrap=this.sessionVariables.labelWrap,a.maxHeight=this.sessionVariables.labelMaxHeight,a.measureText()}else for(b=0;b<this._labels.length;b++)a=this._labels[b].textBlock,a.maxWidth=this.labelMaxWidth=x(this.options.labelMaxWidth)?this.sessionVariables.labelMaxWidth:this.options.labelMaxWidth,a.fontSize=this.labelFontSize=x(this.options.labelFontSize)?this.sessionVariables.labelFontSize:this.options.labelFontSize,a.angle=this.labelAngle=x(this.options.labelAngle)?
this.sessionVariables.labelAngle:this.labelAngle,a.wrap=this.labelWrap=x(this.options.labelWrap)?this.sessionVariables.labelWrap:this.options.labelWrap,a.maxHeight=this.sessionVariables.labelMaxHeight,a.measureText();for(b=0;b<this.stripLines.length;b++){var g=this.stripLines[b],u;if("outside"===g.labelPlacement){h=this.sessionVariables.labelMaxWidth;if("bottom"===this._position||"top"===this._position)u="undefined"===typeof g.options.labelWrap?this.sessionVariables.labelMaxHeight:g.labelWrap?0.8*
this.chart.height>>0:1.5*this.labelFontSize;if("left"===this._position||"right"===this._position)u="undefined"===typeof g.options.labelWrap?this.sessionVariables.labelMaxHeight:g.labelWrap?0.8*this.chart.width>>0:1.5*this.labelFontSize;c=x(g.options.labelBackgroundColor)?"#EEEEEE":g.options.labelBackgroundColor}else h="bottom"===this._position||"top"===this._position?0.9*this.chart.width>>0:0.9*this.chart.height>>0,u="undefined"===typeof g.options.labelWrap||g.labelWrap?"bottom"===this._position||
"top"===this._position?0.8*this.chart.width>>0:0.8*this.chart.height>>0:1.5*this.labelFontSize,c=x(g.options.labelBackgroundColor)?x(g.startValue)&&0!==g.startValue?"transparent":"#EEEEEE":g.options.labelBackgroundColor;a=new V(this.ctx,{x:0,y:0,backgroundColor:c,maxWidth:g.options.labelMaxWidth?g.options.labelMaxWidth:h,maxHeight:u,angle:this.labelAngle,text:g.labelFormatter?g.labelFormatter({chart:this.chart,axis:this,stripLine:g}):g.label,horizontalAlign:"left",fontSize:"outside"===g.labelPlacement?
g.options.labelFontSize?g.options.labelFontSize:this.labelFontSize:g.labelFontSize,fontFamily:"outside"===g.labelPlacement?g.options.labelFontFamily?g.options.labelFontFamily:this.labelFontFamily:g.labelFontFamily,fontWeight:"outside"===g.labelPlacement?g.options.fontWeight?g.options.fontWeight:this.fontWeight:g.fontWeight,fontColor:g.options.labelFontColor||g.color,fontStyle:"outside"===g.labelPlacement?g.options.fontStyle?g.options.fontStyle:this.fontWeight:g.fontStyle,textBaseline:"middle",borderThickness:0});
this._stripLineLabels.push({position:g.value,textBlock:a,effectiveHeight:null,stripLine:g})}};A.prototype.createLabelsAndCalculateWidth=function(){var a=0,c=0;this._labels=[];this._stripLineLabels=[];if("left"===this._position||"right"===this._position){this.createLabels();for(c=0;c<this._labels.length;c++){var b=this._labels[c].textBlock,d=b.measureText(),f=0,f=0===this.labelAngle?d.width:d.width*Math.cos(Math.PI/180*Math.abs(this.labelAngle))+(d.height-b.fontSize/2)*Math.sin(Math.PI/180*Math.abs(this.labelAngle));
a<f&&(a=f);this._labels[c].effectiveWidth=f}for(c=0;c<this._stripLineLabels.length;c++)"outside"===this._stripLineLabels[c].stripLine.labelPlacement&&(this._stripLineLabels[c].stripLine.value>this.viewportMinimum&&this._stripLineLabels[c].stripLine.value<this.viewportMaximum)&&(b=this._stripLineLabels[c].textBlock,d=b.measureText(),f=0===this.labelAngle?d.width:d.width*Math.cos(Math.PI/180*Math.abs(this.labelAngle))+(d.height-b.fontSize/2)*Math.sin(Math.PI/180*Math.abs(this.labelAngle)),a<f&&(a=f),
this._stripLineLabels[c].effectiveWidth=f)}return(this.title?this._titleTextBlock.measureText().height+2:0)+a+this.tickLength+5};A.prototype.createLabelsAndCalculateHeight=function(){var a=0;this._labels=[];this._stripLineLabels=[];var c,b=0;this.createLabels();if("bottom"===this._position||"top"===this._position){for(b=0;b<this._labels.length;b++){c=this._labels[b].textBlock;var d=c.measureText(),f=0,f=0===this.labelAngle?d.height:d.width*Math.sin(Math.PI/180*Math.abs(this.labelAngle))+(d.height-
c.fontSize/2)*Math.cos(Math.PI/180*Math.abs(this.labelAngle));a<f&&(a=f);this._labels[b].effectiveHeight=f}for(b=0;b<this._stripLineLabels.length;b++)"outside"===this._stripLineLabels[b].stripLine.labelPlacement&&(c=this._stripLineLabels[b].textBlock,d=c.measureText(),f=0===this.labelAngle?d.height:d.width*Math.sin(Math.PI/180*Math.abs(this.labelAngle))+(d.height-c.fontSize/2)*Math.cos(Math.PI/180*Math.abs(this.labelAngle)),a<f&&(a=f),this._stripLineLabels[b].effectiveHeight=f)}return(this.title?
this._titleTextBlock.measureText().height+2:0)+a+this.tickLength+5};A.setLayoutAndRender=function(a,c,b,d,f,g){var h,k,l,m,p=a[0]?a[0].chart:c[0].chart,n=p.ctx;if(a&&0<a.length)for(var e=0;e<a.length;e++)a[e]&&a[e].calculateAxisParameters();if(c&&0<c.length)for(e=0;e<c.length;e++)c[e].calculateAxisParameters();if(b&&0<b.length)for(e=0;e<b.length;e++)b[e].calculateAxisParameters();if(d&&0<d.length)for(e=0;e<d.length;e++)d[e].calculateAxisParameters();var q=0,r=0,s=0,u=0,v=0,t=0,w=0,y,A,B=k=0,D,E,F,
H;D=E=F=H=!1;if(a&&0<a.length)for(e=0;e<a.length;e++)a[e]&&a[e].title&&(a[e]._titleTextBlock=new V(a[e].ctx,{text:a[e].title,horizontalAlign:"center",fontSize:a[e].titleFontSize,fontFamily:a[e].titleFontFamily,fontWeight:a[e].titleFontWeight,fontColor:a[e].titleFontColor,fontStyle:a[e].titleFontStyle,textBaseline:"top"}));if(c&&0<c.length)for(e=0;e<c.length;e++)c[e]&&c[e].title&&(c[e]._titleTextBlock=new V(c[e].ctx,{text:c[e].title,horizontalAlign:"center",fontSize:c[e].titleFontSize,fontFamily:c[e].titleFontFamily,
fontWeight:c[e].titleFontWeight,fontColor:c[e].titleFontColor,fontStyle:c[e].titleFontStyle,textBaseline:"top"}));if(b&&0<b.length)for(e=0;e<b.length;e++)b[e]&&b[e].title&&(b[e]._titleTextBlock=new V(b[e].ctx,{text:b[e].title,horizontalAlign:"center",fontSize:b[e].titleFontSize,fontFamily:b[e].titleFontFamily,fontWeight:b[e].titleFontWeight,fontColor:b[e].titleFontColor,fontStyle:b[e].titleFontStyle,textBaseline:"top"}));if(d&&0<d.length)for(e=0;e<d.length;e++)d[e]&&d[e].title&&(d[e]._titleTextBlock=
new V(d[e].ctx,{text:d[e].title,horizontalAlign:"center",fontSize:d[e].titleFontSize,fontFamily:d[e].titleFontFamily,fontWeight:d[e].titleFontWeight,fontColor:d[e].titleFontColor,fontStyle:d[e].titleFontStyle,textBaseline:"top"}));if("normal"===f){var u=[],v=[],t=[],w=[],G=[],I=[],K=[],J=[];if(a&&0<a.length)for(e=0;e<a.length;e++)a[e]&&a[e].title&&(a[e]._titleTextBlock.maxWidth=a[e].titleMaxWidth||g.width,a[e]._titleTextBlock.maxHeight=a[e].titleWrap?0.8*g.height:1.5*a[e].titleFontSize,a[e]._titleTextBlock.angle=
0);if(c&&0<c.length)for(e=0;e<c[e].length;e++)c[e]&&c[e].title&&(c[e]._titleTextBlock.maxWidth=c[e].titleMaxWidth||g.width,c[e]._titleTextBlock.maxHeight=c[e].titleWrap?0.8*g.height:1.5*c[e].titleFontSize,c[e]._titleTextBlock.angle=0);if(b&&0<b.length)for(e=0;e<b.length;e++)b[e]&&b[e].title&&(b[e]._titleTextBlock.maxWidth=b[e].titleMaxWidth||g.height,b[e]._titleTextBlock.maxHeight=b[e].titleWrap?0.8*g.width:1.5*b[e].titleFontSize,b[e]._titleTextBlock.angle=-90);if(d&&0<d.length)for(e=0;e<d.length;e++)d[e]&&
d[e].title&&(d[e]._titleTextBlock.maxWidth=d[e].titleMaxWidth||g.height,d[e]._titleTextBlock.maxHeight=d[e].titleWrap?0.8*g.width:1.5*d[e].titleFontSize,d[e]._titleTextBlock.angle=90);for(;4>q;){var L=0,P=0,M=0,O=0,X=f=0,C=0,Q=0,W=0,U=0,T=0,S=0;if(b&&0<b.length)for(t=[],e=T=0;e<b.length;e++)t.push(Math.ceil(b[e]?b[e].createLabelsAndCalculateWidth():0)),T+=t[e],C+=b[e]?b[e].margin:0;else t.push(Math.ceil(b[0]?b[0].createLabelsAndCalculateWidth():0));K.push(t);if(d&&0<d.length)for(w=[],e=S=0;e<d.length;e++)w.push(Math.ceil(d[e]?
d[e].createLabelsAndCalculateWidth():0)),S+=w[e],Q+=d[e]?d[e].margin:0;else w.push(Math.ceil(d[0]?d[0].createLabelsAndCalculateWidth():0));J.push(w);h=Math.round(g.x1+T+C);l=Math.round(g.x2-S-Q>p.width-10?p.width-10:g.x2-S-Q);if(a&&0<a.length)for(u=[],e=W=0;e<a.length;e++)a[e]&&(a[e].lineCoordinates={}),a[e].lineCoordinates.width=Math.abs(l-h),a[e].title&&(a[e]._titleTextBlock.maxWidth=0<a[e].titleMaxWidth&&a[e].titleMaxWidth<a[e].lineCoordinates.width?a[e].titleMaxWidth:a[e].lineCoordinates.width),
u.push(Math.ceil(a[e]?a[e].createLabelsAndCalculateHeight():0)),W+=u[e],f+=a[e]?a[e].margin:0;else u.push(Math.ceil(a[0]?a[0].createLabelsAndCalculateHeight():0));G.push(u);if(c&&0<c.length)for(v=[],e=U=0;e<c.length;e++)c[e]&&(c[e].lineCoordinates={}),c[e].lineCoordinates.width=Math.abs(l-h),c[e].title&&(c[e]._titleTextBlock.maxWidth=0<c[e].titleMaxWidth&&c[e].titleMaxWidth<c[e].lineCoordinates.width?c[e].titleMaxWidth:c[e].lineCoordinates.width),v.push(Math.ceil(c[e]?c[e].createLabelsAndCalculateHeight():
0)),U+=v[e],X+=c[e]?c[e].margin:0;else v.push(Math.ceil(c[0]?c[0].createLabelsAndCalculateHeight():0));I.push(v);if(a&&0<a.length)for(e=0;e<a.length;e++)a[e]&&(a[e].lineCoordinates.x1=h,a[e].lineCoordinates.x2=Math.round(g.x2-S-Q>p.width-10?p.width-10:g.x2-S-Q),a[e]._labels&&1<a[e]._labels.length&&(k=m=0,m=a[e]._labels[1],k="dateTime"===a[e].chart.plotInfo.axisXValueType?a[e]._labels[a[e]._labels.length-2]:a[e]._labels[a[e]._labels.length-1],r=m.textBlock.width*Math.cos(Math.PI/180*Math.abs(m.textBlock.angle))+
(m.textBlock.height-k.textBlock.fontSize/2)*Math.sin(Math.PI/180*Math.abs(m.textBlock.angle)),s=k.textBlock.width*Math.cos(Math.PI/180*Math.abs(k.textBlock.angle))+(k.textBlock.height-k.textBlock.fontSize/2)*Math.sin(Math.PI/180*Math.abs(k.textBlock.angle))),a[e]&&(a[e].labelAutoFit&&!x(y)&&!x(A))&&(k=0,0<a[e].labelAngle?A+s>l&&(k+=0<a[e].labelAngle?A+s-l-S:0):0>a[e].labelAngle?y-r<h&&y-r<a[e].viewportMinimum&&(B=h-(C+a[e].tickLength+t+y-r+a[e].labelFontSize/2)):0===a[e].labelAngle&&(A+s>l&&(k=A+
s/2-l-S),y-r<h&&y-r<a[e].viewportMinimum&&(B=h-C-a[e].tickLength-t-y+r/2)),a[e].viewportMaximum===a[e].maximum&&a[e].viewportMinimum===a[e].minimum&&0<a[e].labelAngle&&0<k?l-=k:a[e].viewportMaximum===a[e].maximum&&a[e].viewportMinimum===a[e].minimum&&0>a[e].labelAngle&&0<B?h+=B:a[e].viewportMaximum===a[e].maximum&&a[e].viewportMinimum===a[e].minimum&&0===a[e].labelAngle&&(0<B&&(h+=B),0<k&&(l-=k))),p.panEnabled?W=p.sessionVariables.axisX.height:p.sessionVariables.axisX.height=W,k=Math.round(g.y2-W-
f+L),m=Math.round(g.y2),a[e].lineCoordinates.x2=l,a[e].lineCoordinates.width=l-h,a[e].lineCoordinates.y1=k,a[e].lineCoordinates.y2=k,a[e].bounds={x1:h,y1:k,x2:l,y2:m-(W+f-u[e]-L),width:l-h,height:m-k}),L+=u[e]+a[e].margin;if(c&&0<c.length)for(e=0;e<c.length;e++)c[e].lineCoordinates.x1=Math.round(g.x1+T+C),c[e].lineCoordinates.x2=Math.round(g.x2-S-Q>p.width-10?p.width-10:g.x2-S-Q),c[e].lineCoordinates.width=Math.abs(l-h),c[e]._labels&&1<c[e]._labels.length&&(m=c[e]._labels[1],k="dateTime"===c[e].chart.plotInfo.axisXValueType?
c[e]._labels[c[e]._labels.length-2]:c[e]._labels[c[e]._labels.length-1],r=m.textBlock.width*Math.cos(Math.PI/180*Math.abs(m.textBlock.angle))+(m.textBlock.height-k.textBlock.fontSize/2)*Math.sin(Math.PI/180*Math.abs(m.textBlock.angle)),s=k.textBlock.width*Math.cos(Math.PI/180*Math.abs(k.textBlock.angle))+(k.textBlock.height-k.textBlock.fontSize/2)*Math.sin(Math.PI/180*Math.abs(k.textBlock.angle))),p.panEnabled?U=p.sessionVariables.axisX2.height:p.sessionVariables.axisX2.height=U,k=Math.round(g.y1),
m=Math.round(g.y2+c[e].margin),c[e].lineCoordinates.y1=k+U+X-P,c[e].lineCoordinates.y2=k,c[e].bounds={x1:h,y1:k+(U+X-v[e]-P),x2:l,y2:m,width:l-h,height:m-k},P+=v[e]+c[e].margin;if(b&&0<b.length)for(e=0;e<b.length;e++)C=10,b[e]&&(h=Math.round(a[0]?a[0].lineCoordinates.x1:c[0].lineCoordinates.x1),C=b[e]._labels[b[e]._labels.length-1].textBlock.height/2,k=Math.round(g.y1+U+X<Math.max(C,10)?Math.max(C,10):g.y1+U+X),l=Math.round(a[0]?a[0].lineCoordinates.x1:c[0].lineCoordinates.x1),C=0<a.length?0:b[e]._labels[0].textBlock.height/
2,m=Math.round(g.y2-W-f-C),b[e].lineCoordinates={x1:l-M,y1:k,x2:l-M,y2:m,height:Math.abs(m-k)},b[e].bounds={x1:h-(t[e]+M),y1:k,x2:l,y2:m,width:l-h,height:m-k},b[e].title&&(b[e]._titleTextBlock.maxWidth=0<b[e].titleMaxWidth&&b[e].titleMaxWidth<b[e].lineCoordinates.height?b[e].titleMaxWidth:b[e].lineCoordinates.height),M+=t[e]+b[e].margin);if(d&&0<d.length)for(e=0;e<d.length;e++)d[e]&&(h=Math.round(a[0]?a[0].lineCoordinates.x2:c[0].lineCoordinates.x2),l=Math.round(h),C=d[e]._labels[d[e]._labels.length-
1].textBlock.height/2,k=Math.round(g.y1+U+X<Math.max(C,10)?Math.max(C,10):g.y1+U+X),C=0<a.length?0:d[e]._labels[0].textBlock.height/2,m=Math.round(g.y2-(W+f+C)),d[e].lineCoordinates={x1:h+O,y1:k,x2:h+O,y2:m,height:Math.abs(m-k)},d[e].bounds={x1:h,y1:k,x2:l+(w[e]+O),y2:m,width:l-h,height:m-k},d[e].title&&(d[e]._titleTextBlock.maxWidth=0<d[e].titleMaxWidth&&d[e].titleMaxWidth<d[e].lineCoordinates.height?d[e].titleMaxWidth:d[e].lineCoordinates.height),O+=w[e]+d[e].margin);if(a&&0<a.length)for(e=0;e<
a.length;e++)a[e]&&(a[e].calculateValueToPixelConversionParameters(),a[e]._labels&&1<a[e]._labels.length&&(y=(a[e].logarithmic?Math.log(a[e]._labels[1].position/a[e].viewportMinimum)/a[e].conversionParameters.lnLogarithmBase:a[e]._labels[1].position-a[e].viewportMinimum)*Math.abs(a[e].conversionParameters.pixelPerUnit)+a[e].lineCoordinates.x1,A="dateTime"===a[e].chart.plotInfo.axisXValueType?(a[e].logarithmic?Math.log(a[e]._labels[a[e]._labels.length-2].position/a[e].viewportMinimum)/a[e].conversionParameters.lnLogarithmBase:
a[e]._labels[a[e]._labels.length-2].position-a[e].viewportMinimum)*Math.abs(a[e].conversionParameters.pixelPerUnit)+a[e].lineCoordinates.x1:(a[e].logarithmic?Math.log(a[e]._labels[a[e]._labels.length-1].position/a[e].viewportMinimum)/a[e].conversionParameters.lnLogarithmBase:a[e]._labels[a[e]._labels.length-1].position-a[e].viewportMinimum)*Math.abs(a[e].conversionParameters.pixelPerUnit)+a[e].lineCoordinates.x1));if(c&&0<c.length)for(e=0;e<c.length;e++)c[e].calculateValueToPixelConversionParameters(),
c[e]._labels&&1<c[e]._labels.length&&(y=(c[e].logarithmic?Math.log(c[e]._labels[1].position/c[e].viewportMinimum)/c[e].conversionParameters.lnLogarithmBase:c[e]._labels[1].position-c[e].viewportMinimum)*Math.abs(c[e].conversionParameters.pixelPerUnit)+c[e].lineCoordinates.x1,A="dateTime"===c[e].chart.plotInfo.axisXValueType?(c[e].logarithmic?Math.log(c[e]._labels[c[e]._labels.length-2].position/c[e].viewportMinimum)/c[e].conversionParameters.lnLogarithmBase:c[e]._labels[c[e]._labels.length-2].position-
c[e].viewportMinimum)*Math.abs(c[e].conversionParameters.pixelPerUnit)+c[e].lineCoordinates.x1:(c[e].logarithmic?Math.log(c[e]._labels[c[e]._labels.length-1].position/c[e].viewportMinimum)/c[e].conversionParameters.lnLogarithmBase:c[e]._labels[c[e]._labels.length-1].position-c[e].viewportMinimum)*Math.abs(c[e].conversionParameters.pixelPerUnit)+c[e].lineCoordinates.x1);if(b&&0<b.length)for(e=0;e<b.length;e++)b[e].calculateValueToPixelConversionParameters();if(d&&0<d.length)for(e=0;e<d.length;e++)d[e].calculateValueToPixelConversionParameters();
if(0<q){if(a&&0<a.length)for(e=0;e<a.length;e++)D=G[q-1][e]===G[q][e]?!0:!1;else D=!0;if(c&&0<c.length)for(e=0;e<c.length;e++)E=I[q-1][e]===I[q][e]?!0:!1;else E=!0;if(b&&0<b.length)for(e=0;e<b.length;e++)F=K[q-1][e]===K[q][e]?!0:!1;else F=!0;if(d&&0<d.length)for(e=0;e<d.length;e++)H=J[q-1][e]===J[q][e]?!0:!1;else H=!0}if(D&&E&&F&&H)break;q++}n.save();n.beginPath();a[0]&&n.rect(5,a[0].bounds.y1,a[0].chart.width-10,a[0].bounds.height);c[0]&&n.rect(5,c[c.length-1].bounds.y1,c[0].chart.width-10,c[0].bounds.height);
n.clip();if(a&&0<a.length)for(e=0;e<a.length;e++)a[e].renderLabelsTicksAndTitle();if(c&&0<c.length)for(e=0;e<c.length;e++)c[e].renderLabelsTicksAndTitle();n.restore();if(b&&0<b.length)for(e=0;e<b.length;e++)b[e].renderLabelsTicksAndTitle();if(d&&0<d.length)for(e=0;e<d.length;e++)d[e].renderLabelsTicksAndTitle()}else{y=[];A=[];B=[];r=[];s=[];G=[];I=[];K=[];if(a&&0<a.length)for(e=0;e<a.length;e++)a[e]&&a[e].title&&(a[e]._titleTextBlock.maxWidth=a[e].titleMaxWidth||g.width,a[e]._titleTextBlock.maxHeight=
a[e].titleWrap?0.8*g.height:1.5*a[e].titleFontSize,a[e]._titleTextBlock.angle=-90);if(c&&0<c.length)for(e=0;e<c.length;e++)c[e]&&c[e].title&&(c[e]._titleTextBlock.maxWidth=c[e].titleMaxWidth||g.width,c[e]._titleTextBlock.maxHeight=c[e].titleWrap?0.8*g.height:1.5*c[e].titleFontSize,c[e]._titleTextBlock.angle=90);if(b&&0<b.length)for(e=0;e<b.length;e++)b[e]&&b[e].title&&(b[e]._titleTextBlock.maxWidth=b[e].titleMaxWidth||g.width,b[e]._titleTextBlock.maxHeight=b[e].titleWrap?0.8*g.height:1.5*b[e].titleFontSize,
b[e]._titleTextBlock.angle=0);if(d&&0<d.length)for(e=0;e<d.length;e++)d[e]&&d[e].title&&(d[e]._titleTextBlock.maxWidth=d[e].titleMaxWidth||g.width,d[e]._titleTextBlock.maxHeight=d[e].titleWrap?0.8*g.height:1.5*d[e].titleFontSize,d[e]._titleTextBlock.angle=0);for(;4>q;){U=W=T=O=Q=C=X=f=M=J=P=L=0;if(a&&0<a.length)for(B=[],e=W=0;e<a.length;e++)B.push(Math.ceil(a[e]?a[e].createLabelsAndCalculateWidth():0)),W+=B[e],f+=a[e]?a[e].margin:0;else B.push(Math.ceil(a[0]?a[0].createLabelsAndCalculateWidth():0));
I.push(B);if(c&&0<c.length)for(r=[],e=U=0;e<c.length;e++)r.push(Math.ceil(c[e]?c[e].createLabelsAndCalculateWidth():0)),U+=r[e],X+=c[e]?c[e].margin:0;else r.push(Math.ceil(c[0]?c[0].createLabelsAndCalculateWidth():0));K.push(r);if(b&&0<b.length)for(e=0;e<b.length;e++)b[e].lineCoordinates={},h=Math.round(g.x1+W+f),l=Math.round(g.x2-U-X>p.width-10?p.width-10:g.x2-U-X),b[e].labelAutoFit&&!x(u)&&(0<!a.length&&(h=0>b[e].labelAngle?Math.max(h,u):0===b[e].labelAngle?Math.max(h,u/2):h),0<!c.length&&(l=0<
b[e].labelAngle?l-v/2:0===b[e].labelAngle?l-v/2:l)),b[e].lineCoordinates.x1=h,b[e].lineCoordinates.x2=l,b[e].lineCoordinates.width=Math.abs(l-h),b[e].title&&(b[e]._titleTextBlock.maxWidth=0<b[e].titleMaxWidth&&b[e].titleMaxWidth<b[e].lineCoordinates.width?b[e].titleMaxWidth:b[e].lineCoordinates.width);if(d&&0<d.length)for(e=0;e<d.length;e++)d[e].lineCoordinates={},h=Math.round(g.x1+W+f),l=Math.round(g.x2-U-X>d[e].chart.width-10?d[e].chart.width-10:g.x2-U-X),d[e]&&d[e].labelAutoFit&&!x(t)&&(0<!a.length&&
(h=0<d[e].labelAngle?Math.max(h,t):0===d[e].labelAngle?Math.max(h,t/2):h),0<!c.length&&(l-=w/2)),d[e].lineCoordinates.x1=h,d[e].lineCoordinates.x2=l,d[e].lineCoordinates.width=Math.abs(l-h),d[e].title&&(d[e]._titleTextBlock.maxWidth=0<d[e].titleMaxWidth&&d[e].titleMaxWidth<d[e].lineCoordinates.width?d[e].titleMaxWidth:d[e].lineCoordinates.width);if(b&&0<b.length)for(y=[],e=O=0;e<b.length;e++)y.push(Math.ceil(b[e]?b[e].createLabelsAndCalculateHeight():0)),O+=y[e]+b[e].margin,C+=b[e].margin;else y.push(Math.ceil(b[0]?
b[0].createLabelsAndCalculateHeight():0));s.push(y);if(d&&0<d.length)for(A=[],e=T=0;e<d.length;e++)A.push(Math.ceil(d[e]?d[e].createLabelsAndCalculateHeight():0)),T+=A[e],Q+=d[e].margin;else A.push(Math.ceil(d[0]?d[0].createLabelsAndCalculateHeight():0));G.push(A);if(b&&0<b.length)for(e=0;e<b.length;e++)0<b[e]._labels.length&&(m=b[e]._labels[0],k=b[e]._labels[b[e]._labels.length-1],u=m.textBlock.width*Math.cos(Math.PI/180*Math.abs(m.textBlock.angle))+(m.textBlock.height-k.textBlock.fontSize/2)*Math.sin(Math.PI/
180*Math.abs(m.textBlock.angle)),v=k.textBlock.width*Math.cos(Math.PI/180*Math.abs(k.textBlock.angle))+(k.textBlock.height-k.textBlock.fontSize/2)*Math.sin(Math.PI/180*Math.abs(k.textBlock.angle)));if(d&&0<d.length)for(e=0;e<d.length;e++)d[e]&&0<d[e]._labels.length&&(m=d[e]._labels[0],k=d[e]._labels[d[e]._labels.length-1],t=m.textBlock.width*Math.cos(Math.PI/180*Math.abs(m.textBlock.angle))+(m.textBlock.height-k.textBlock.fontSize/2)*Math.sin(Math.PI/180*Math.abs(m.textBlock.angle)),w=k.textBlock.width*
Math.cos(Math.PI/180*Math.abs(k.textBlock.angle))+(k.textBlock.height-k.textBlock.fontSize/2)*Math.sin(Math.PI/180*Math.abs(k.textBlock.angle)));if(p.panEnabled)for(e=0;e<b.length;e++)y[e]=p.sessionVariables.axisY.height;else for(e=0;e<b.length;e++)p.sessionVariables.axisY.height=y[e];if(b&&0<b.length)for(e=b.length-1;0<=e;e--)k=Math.round(g.y2),m=Math.round(g.y2>b[e].chart.height-10?b[e].chart.height-10:g.y2),b[e].lineCoordinates.y1=k-(y[e]+b[e].margin+L),b[e].lineCoordinates.y2=k-(y[e]+b[e].margin+
L),b[e].bounds={x1:h,y1:k-(y[e]+L+b[e].margin),x2:l,y2:m-(L+b[e].margin),width:l-h,height:y[e]},b[e].title&&(b[e]._titleTextBlock.maxWidth=0<b[e].titleMaxWidth&&b[e].titleMaxWidth<b[e].lineCoordinates.width?b[e].titleMaxWidth:b[e].lineCoordinates.width),L+=y[e]+b[e].margin;if(d&&0<d.length)for(e=d.length-1;0<=e;e--)d[e]&&(k=Math.round(g.y1),m=Math.round(g.y1+(A[e]+d[e].margin+P)),d[e].lineCoordinates.y1=m,d[e].lineCoordinates.y2=m,d[e].bounds={x1:h,y1:k+(d[e].margin+P),x2:l,y2:m,width:l-h,height:T},
d[e].title&&(d[e]._titleTextBlock.maxWidth=0<d[e].titleMaxWidth&&d[e].titleMaxWidth<d[e].lineCoordinates.width?d[e].titleMaxWidth:d[e].lineCoordinates.width),P+=A[e]+d[e].margin);if(a&&0<a.length)for(e=0;e<a.length;e++){C=a[e]._labels&&0<a[e]._labels.length?a[e]._labels[0].textBlock.fontSize/2:0;h=Math.round(g.x1+f);k=d&&0<d.length?Math.round(d[0]?d[0].lineCoordinates.y2:g.y1<Math.max(C,10)?Math.max(C,10):g.y1):g.y1<Math.max(C,10)?Math.max(C,10):g.y1;l=Math.round(g.x1+W+f);m=b&&0<b.length?Math.round(b[0]?
b[0].lineCoordinates.y1:g.y2-O>p.height-Math.max(C,10)?p.height-Math.max(C,10):g.y2-O):g.y2>p.height-Math.max(C,10)?p.height-Math.max(C,10):g.y2;if(b&&0<b.length)for(C=0;C<b.length;C++)b[C]&&b[C].labelAutoFit&&(l=0>b[C].labelAngle?Math.max(l,u):0===b[C].labelAngle?Math.max(l,u/2):l,h=0>b[C].labelAngle||0===b[C].labelAngle?l-W:h);if(d&&0<d.length)for(C=0;C<d.length;C++)d[C]&&d[C].labelAutoFit&&(l=d[C].lineCoordinates.x1,h=l-W);a[e].lineCoordinates={x1:l-J,y1:k,x2:l-J,y2:m,height:Math.abs(m-k)};a[e].bounds=
{x1:l-(B[e]+J),y1:k,x2:l,y2:m,width:l-h,height:m-k};a[e].title&&(a[e]._titleTextBlock.maxWidth=0<a[e].titleMaxWidth&&a[e].titleMaxWidth<a[e].lineCoordinates.height?a[e].titleMaxWidth:a[e].lineCoordinates.height);a[e].calculateValueToPixelConversionParameters();J+=B[e]+a[e].margin}if(c&&0<c.length)for(e=0;e<c.length;e++){C=c[e]._labels&&0<c[e]._labels.length?c[e]._labels[0].textBlock.fontSize/2:0;h=Math.round(g.x1-f);k=d&&0<d.length?Math.round(d[0]?d[0].lineCoordinates.y2:g.y1<Math.max(C,10)?Math.max(C,
10):g.y1):g.y1<Math.max(C,10)?Math.max(C,10):g.y1;l=Math.round(g.x2-U-X);m=b&&0<b.length?Math.round(b[0]?b[0].lineCoordinates.y1:g.y2-O>p.height-Math.max(C,10)?p.height-Math.max(C,10):g.y2-O):g.y2>p.height-Math.max(C,10)?p.height-Math.max(C,10):g.y2;if(b&&0<b.length)for(C=0;C<b.length;C++)b[C]&&b[C].labelAutoFit&&(l=0>b[e].labelAngle?Math.max(l,u):0===b[e].labelAngle?Math.max(l,u/2):l,h=0>b[C].labelAngle||0===b[C].labelAngle?l-U:h);if(d&&0<d.length)for(C=0;C<d.length;C++)d[C]&&d[C].labelAutoFit&&
(l=d[C].lineCoordinates.x2,h=l-U);c[e].lineCoordinates={x1:l+M,y1:k,x2:l+M,y2:m,height:Math.abs(m-k)};c[e].bounds={x1:h,y1:k,x2:l+r[e]+M,y2:m,width:l-h,height:m-k};c[e].title&&(c[e]._titleTextBlock.maxWidth=0<c[e].titleMaxWidth&&c[e].titleMaxWidth<c[e].lineCoordinates.height?c[e].titleMaxWidth:c[e].lineCoordinates.height);c[e].calculateValueToPixelConversionParameters();M+=r[e]+c[e].margin}if(b&&0<b.length)for(e=0;e<b.length;e++)b[e].calculateValueToPixelConversionParameters();if(d&&0<d.length)for(e=
0;e<d.length;e++)d[e].calculateValueToPixelConversionParameters();if(0<q){if(a&&0<a.length)for(e=0;e<a.length;e++)D=I[q-1][e]===I[q][e]?!0:!1;else D=!0;if(c&&0<c.length)for(e=0;e<c.length;e++)E=K[q-1][e]===K[q][e]?!0:!1;else E=!0;if(b&&0<b.length)for(e=0;e<b.length;e++)F=s[q-1][e]===s[q][e]?!0:!1;else F=!0;if(d&&0<d.length)for(e=0;e<d.length;e++)H=G[q-1][e]===G[q][e]?!0:!1;else H=!0}if(D&&E&&F&&H)break;q++}if(b&&0<b.length)for(e=0;e<b.length;e++)b[e].renderLabelsTicksAndTitle();if(d&&0<d.length)for(e=
0;e<d.length;e++)d[e].renderLabelsTicksAndTitle();if(a&&0<a.length)for(e=0;e<a.length;e++)a[e].renderLabelsTicksAndTitle();if(c&&0<c.length)for(e=0;e<c.length;e++)c[e].renderLabelsTicksAndTitle()}p.preparePlotArea();g=p.plotArea;n.save();n.beginPath();n.rect(g.x1,g.y1,Math.abs(g.x2-g.x1),Math.abs(g.y2-g.y1));n.clip();if(a&&0<a.length)for(e=0;e<a.length;e++)a[e].renderStripLinesOfThicknessType("value");if(c&&0<c.length)for(e=0;e<c.length;e++)c[e].renderStripLinesOfThicknessType("value");if(b&&0<b.length)for(e=
0;e<b.length;e++)b[e].renderStripLinesOfThicknessType("value");if(d&&0<d.length)for(e=0;e<d.length;e++)d[e].renderStripLinesOfThicknessType("value");if(a&&0<a.length)for(e=0;e<a.length;e++)a[e].renderInterlacedColors();if(c&&0<c.length)for(e=0;e<c.length;e++)c[e].renderInterlacedColors();if(b&&0<b.length)for(e=0;e<b.length;e++)b[e].renderInterlacedColors();if(d&&0<d.length)for(e=0;e<d.length;e++)d[e].renderInterlacedColors();n.restore();if(a&&0<a.length)for(e=0;e<a.length;e++)a[e].renderGrid();if(c&&
0<c.length)for(e=0;e<c.length;e++)c[e].renderGrid();if(b&&0<b.length)for(e=0;e<b.length;e++)b[e].renderGrid();if(d&&0<d.length)for(e=0;e<d.length;e++)d[e].renderGrid();if(a&&0<a.length)for(e=0;e<a.length;e++)a[e].renderAxisLine();if(c&&0<c.length)for(e=0;e<c.length;e++)c[e].renderAxisLine();if(b&&0<b.length)for(e=0;e<b.length;e++)b[e].renderAxisLine();if(d&&0<d.length)for(e=0;e<d.length;e++)d[e].renderAxisLine();if(a&&0<a.length)for(e=0;e<a.length;e++)a[e].renderStripLinesOfThicknessType("pixel");
if(c&&0<c.length)for(e=0;e<c.length;e++)c[e].renderStripLinesOfThicknessType("pixel");if(b&&0<b.length)for(e=0;e<b.length;e++)b[e].renderStripLinesOfThicknessType("pixel");if(d&&0<d.length)for(e=0;e<d.length;e++)d[e].renderStripLinesOfThicknessType("pixel")};A.prototype.renderLabelsTicksAndTitle=function(){var a=!1,c=0,b=0,d=1,f=0;0!==this.labelAngle&&360!==this.labelAngle&&(d=1.2);if("undefined"===typeof this.options.interval){if("bottom"===this._position||"top"===this._position)if(this.logarithmic&&
!this.equidistantInterval&&this.labelAutoFit){for(var c=[],d=0!==this.labelAngle&&360!==this.labelAngle?1:1.2,g,h=this.viewportMaximum,k=this.lineCoordinates.width/Math.log(this.range),l=this._labels.length-1;0<=l;l--){p=this._labels[l];if(p.position<this.viewportMinimum)break;p.position>this.viewportMaximum||!(l===this._labels.length-1||g<Math.log(h/p.position)*k/d)||(c.push(p),h=p.position,g=p.textBlock.width*Math.abs(Math.cos(Math.PI/180*this.labelAngle))+p.textBlock.height*Math.abs(Math.sin(Math.PI/
180*this.labelAngle)))}this._labels=c}else{for(l=0;l<this._labels.length;l++)p=this._labels[l],p.position<this.viewportMinimum||(p=p.textBlock.width*Math.abs(Math.cos(Math.PI/180*this.labelAngle))+p.textBlock.height*Math.abs(Math.sin(Math.PI/180*this.labelAngle)),c+=p);c>this.lineCoordinates.width*d&&this.labelAutoFit&&(a=!0)}if("left"===this._position||"right"===this._position)if(this.logarithmic&&!this.equidistantInterval&&this.labelAutoFit){for(var c=[],m,h=this.viewportMaximum,k=this.lineCoordinates.height/
Math.log(this.range),l=this._labels.length-1;0<=l;l--){p=this._labels[l];if(p.position<this.viewportMinimum)break;p.position>this.viewportMaximum||!(l===this._labels.length-1||m<Math.log(h/p.position)*k)||(c.push(p),h=p.position,m=p.textBlock.height*Math.abs(Math.cos(Math.PI/180*this.labelAngle))+p.textBlock.width*Math.abs(Math.sin(Math.PI/180*this.labelAngle)))}this._labels=c}else{for(l=0;l<this._labels.length;l++)p=this._labels[l],p.position<this.viewportMinimum||(p=p.textBlock.height*Math.abs(Math.cos(Math.PI/
180*this.labelAngle))+p.textBlock.width*Math.abs(Math.sin(Math.PI/180*this.labelAngle)),b+=p);b>this.lineCoordinates.height*d&&this.labelAutoFit&&(a=!0)}}if("bottom"===this._position){for(var p,l=0;l<this._labels.length;l++)p=this._labels[l],p.position<this.viewportMinimum||p.position>this.viewportMaximum||(b=this.getPixelCoordinatesOnAxis(p.position),a&&0!==f++%2&&this.labelAutoFit||(this.tickThickness&&(this.ctx.lineWidth=this.tickThickness,this.ctx.strokeStyle=this.tickColor,d=1===this.ctx.lineWidth%
2?(b.x<<0)+0.5:b.x<<0,this.ctx.beginPath(),this.ctx.moveTo(d,b.y<<0),this.ctx.lineTo(d,b.y+this.tickLength<<0),this.ctx.stroke()),0===p.textBlock.angle?(b.x-=p.textBlock.width/2,b.y+=this.tickLength+p.textBlock.fontSize/2):(b.x-=0>this.labelAngle?p.textBlock.width*Math.cos(Math.PI/180*this.labelAngle):0,b.y+=this.tickLength+Math.abs(0>this.labelAngle?p.textBlock.width*Math.sin(Math.PI/180*this.labelAngle)-5:5)),p.textBlock.x=b.x,p.textBlock.y=b.y,p.textBlock.render(!0)));this.title&&(this._titleTextBlock.measureText(),
this._titleTextBlock.x=this.lineCoordinates.x1+this.lineCoordinates.width/2-this._titleTextBlock.width/2,this._titleTextBlock.y=this.bounds.y2-this._titleTextBlock.height-3,this.titleMaxWidth=this._titleTextBlock.maxWidth,this._titleTextBlock.render(!0))}else if("top"===this._position){for(l=0;l<this._labels.length;l++)p=this._labels[l],p.position<this.viewportMinimum||p.position>this.viewportMaximum||(b=this.getPixelCoordinatesOnAxis(p.position),a&&0!==f++%2&&this.labelAutoFit||(this.tickThickness&&
(this.ctx.lineWidth=this.tickThickness,this.ctx.strokeStyle=this.tickColor,d=1===this.ctx.lineWidth%2?(b.x<<0)+0.5:b.x<<0,this.ctx.beginPath(),this.ctx.moveTo(d,b.y<<0),this.ctx.lineTo(d,b.y-this.tickLength<<0),this.ctx.stroke()),0===p.textBlock.angle?(b.x-=p.textBlock.width/2,b.y-=this.tickLength+p.textBlock.height/2):(b.x+=(p.textBlock.height-this.tickLength-this.labelFontSize/2)*Math.sin(Math.PI/180*this.labelAngle)-(0<this.labelAngle?p.textBlock.width*Math.cos(Math.PI/180*this.labelAngle):0),
b.y-=this.tickLength+(p.textBlock.height/2*Math.cos(Math.PI/180*this.labelAngle)+(0<this.labelAngle?p.textBlock.width*Math.sin(Math.PI/180*this.labelAngle):0))),p.textBlock.x=b.x,p.textBlock.y=b.y,p.textBlock.render(!0)));this.title&&(this._titleTextBlock.measureText(),this._titleTextBlock.x=this.lineCoordinates.x1+this.lineCoordinates.width/2-this._titleTextBlock.width/2,this._titleTextBlock.y=this.bounds.y1+1,this.titleMaxWidth=this._titleTextBlock.maxWidth,this._titleTextBlock.render(!0))}else if("left"===
this._position){for(l=0;l<this._labels.length;l++)p=this._labels[l],p.position<this.viewportMinimum||p.position>this.viewportMaximum||(b=this.getPixelCoordinatesOnAxis(p.position),a&&0!==f++%2&&this.labelAutoFit||(this.tickThickness&&(this.ctx.lineWidth=this.tickThickness,this.ctx.strokeStyle=this.tickColor,d=1===this.ctx.lineWidth%2?(b.y<<0)+0.5:b.y<<0,this.ctx.beginPath(),this.ctx.moveTo(b.x<<0,d),this.ctx.lineTo(b.x-this.tickLength<<0,d),this.ctx.stroke()),0===this.labelAngle?(p.textBlock.y=b.y,
p.textBlock.x=b.x-p.textBlock.width*Math.cos(Math.PI/180*this.labelAngle)-this.tickLength-5):(p.textBlock.y=b.y-p.textBlock.width*Math.sin(Math.PI/180*this.labelAngle),p.textBlock.x=0<this.labelAngle?b.x-p.textBlock.width*Math.cos(Math.PI/180*this.labelAngle)-this.tickLength-5:b.x-p.textBlock.width*Math.cos(Math.PI/180*this.labelAngle)+(p.textBlock.height-p.textBlock.fontSize/2-5)*Math.sin(Math.PI/180*this.labelAngle)-this.tickLength),p.textBlock.render(!0)));this.title&&(this._titleTextBlock.measureText(),
this._titleTextBlock.x=this.bounds.x1+1,this._titleTextBlock.y=this.lineCoordinates.height/2+this._titleTextBlock.width/2+this.lineCoordinates.y1,this.titleMaxWidth=this._titleTextBlock.maxWidth,this._titleTextBlock.render(!0))}else if("right"===this._position){for(l=0;l<this._labels.length;l++)p=this._labels[l],p.position<this.viewportMinimum||p.position>this.viewportMaximum||(b=this.getPixelCoordinatesOnAxis(p.position),a&&0!==f++%2&&this.labelAutoFit||(this.tickThickness&&(this.ctx.lineWidth=this.tickThickness,
this.ctx.strokeStyle=this.tickColor,d=1===this.ctx.lineWidth%2?(b.y<<0)+0.5:b.y<<0,this.ctx.beginPath(),this.ctx.moveTo(b.x<<0,d),this.ctx.lineTo(b.x+this.tickLength<<0,d),this.ctx.stroke()),0===this.labelAngle?(p.textBlock.y=b.y,p.textBlock.x=b.x+this.tickLength+5):(p.textBlock.y=0>this.labelAngle?b.y:b.y-(p.textBlock.height-p.textBlock.fontSize/2-5)*Math.cos(Math.PI/180*this.labelAngle),p.textBlock.x=0<this.labelAngle?b.x+(p.textBlock.height-p.textBlock.fontSize/2-5)*Math.sin(Math.PI/180*this.labelAngle)+
this.tickLength:b.x+this.tickLength+5),p.textBlock.render(!0)));this.title&&(this._titleTextBlock.measureText(),this._titleTextBlock.x=this.bounds.x2-1,this._titleTextBlock.y=this.lineCoordinates.height/2-this._titleTextBlock.width/2+this.lineCoordinates.y1,this.titleMaxWidth=this._titleTextBlock.maxWidth,this._titleTextBlock.render(!0))}};A.prototype.renderInterlacedColors=function(){var a=this.chart.plotArea.ctx,c,b,d=this.chart.plotArea,f=0;c=!0;if(("bottom"===this._position||"top"===this._position)&&
this.interlacedColor)for(a.fillStyle=this.interlacedColor,f=0;f<this._labels.length;f++)c?(c=this.getPixelCoordinatesOnAxis(this._labels[f].position),b=f+1>this._labels.length-1?this.getPixelCoordinatesOnAxis(this.viewportMaximum):this.getPixelCoordinatesOnAxis(this._labels[f+1].position),a.fillRect(Math.min(b.x,c.x),d.y1,Math.abs(b.x-c.x),Math.abs(d.y1-d.y2)),c=!1):c=!0;else if(("left"===this._position||"right"===this._position)&&this.interlacedColor)for(a.fillStyle=this.interlacedColor,f=0;f<this._labels.length;f++)c?
(b=this.getPixelCoordinatesOnAxis(this._labels[f].position),c=f+1>this._labels.length-1?this.getPixelCoordinatesOnAxis(this.viewportMaximum):this.getPixelCoordinatesOnAxis(this._labels[f+1].position),a.fillRect(d.x1,Math.min(b.y,c.y),Math.abs(d.x1-d.x2),Math.abs(c.y-b.y)),c=!1):c=!0;a.beginPath()};A.prototype.renderStripLinesOfThicknessType=function(a){if(this.stripLines&&0<this.stripLines.length&&a){for(var c=this,b,d=0,f=0,g=!1,h=!1,k=[],l=[],h=!1,d=0;d<this.stripLines.length;d++){var m=this.stripLines[d];
m._thicknessType===a&&("pixel"===a&&(m.value<this.viewportMinimum||m.value>this.viewportMaximum||isNaN(this.range))||k.push(m))}for(d=0;d<this._stripLineLabels.length;d++)if(m=this.stripLines[d],b=this._stripLineLabels[d],!(b.position<this.viewportMinimum||b.position>this.viewportMaximum||isNaN(this.range))){a=this.getPixelCoordinatesOnAxis(b.position);if("outside"===b.stripLine.labelPlacement)if(m&&(this.ctx.strokeStyle=m.color,"pixel"===m._thicknessType&&(this.ctx.lineWidth=m.thickness)),"bottom"===
this._position){var p=1===this.ctx.lineWidth%2?(a.x<<0)+0.5:a.x<<0;this.ctx.beginPath();this.ctx.moveTo(p,a.y<<0);this.ctx.lineTo(p,a.y+this.tickLength<<0);this.ctx.stroke();0===this.labelAngle?(a.x-=b.textBlock.width/2,a.y+=this.tickLength+b.textBlock.fontSize/2):(a.x-=0>this.labelAngle?b.textBlock.width*Math.cos(Math.PI/180*this.labelAngle):0,a.y+=this.tickLength+Math.abs(0>this.labelAngle?b.textBlock.width*Math.sin(Math.PI/180*this.labelAngle)-5:5))}else"top"===this._position?(p=1===this.ctx.lineWidth%
2?(a.x<<0)+0.5:a.x<<0,this.ctx.beginPath(),this.ctx.moveTo(p,a.y<<0),this.ctx.lineTo(p,a.y-this.tickLength<<0),this.ctx.stroke(),0===this.labelAngle?(a.x-=b.textBlock.width/2,a.y-=this.tickLength+b.textBlock.height):(a.x+=(b.textBlock.height-this.tickLength-this.labelFontSize/2)*Math.sin(Math.PI/180*this.labelAngle)-(0<this.labelAngle?b.textBlock.width*Math.cos(Math.PI/180*this.labelAngle):0),a.y-=this.tickLength+(b.textBlock.height*Math.cos(Math.PI/180*this.labelAngle)+(0<this.labelAngle?b.textBlock.width*
Math.sin(Math.PI/180*this.labelAngle):0)))):"left"===this._position?(p=1===this.ctx.lineWidth%2?(a.y<<0)+0.5:a.y<<0,this.ctx.beginPath(),this.ctx.moveTo(a.x<<0,p),this.ctx.lineTo(a.x-this.tickLength<<0,p),this.ctx.stroke(),0===this.labelAngle?a.x=a.x-b.textBlock.width*Math.cos(Math.PI/180*this.labelAngle)-this.tickLength-5:(a.y-=b.textBlock.width*Math.sin(Math.PI/180*this.labelAngle),a.x=0<this.labelAngle?a.x-b.textBlock.width*Math.cos(Math.PI/180*this.labelAngle)-this.tickLength-5:a.x-b.textBlock.width*
Math.cos(Math.PI/180*this.labelAngle)+(b.textBlock.height-b.textBlock.fontSize/2-5)*Math.sin(Math.PI/180*this.labelAngle)-this.tickLength)):"right"===this._position&&(p=1===this.ctx.lineWidth%2?(a.y<<0)+0.5:a.y<<0,this.ctx.beginPath(),this.ctx.moveTo(a.x<<0,p),this.ctx.lineTo(a.x+this.tickLength<<0,p),this.ctx.stroke(),0===this.labelAngle?a.x=a.x+this.tickLength+5:(a.y=0>this.labelAngle?a.y:a.y-(b.textBlock.height-b.textBlock.fontSize/2-5)*Math.cos(Math.PI/180*this.labelAngle),a.x=0<this.labelAngle?
a.x+(b.textBlock.height-b.textBlock.fontSize/2-5)*Math.sin(Math.PI/180*this.labelAngle)+this.tickLength:a.x+this.tickLength+5));else b.textBlock.angle=-90,"bottom"===this._position?(b.textBlock.maxWidth=this.options.stripLines[d].labelMaxWidth?this.options.stripLines[d].labelMaxWidth:this.chart.plotArea.height-3,b.textBlock.measureText(),a.x-b.textBlock.height>this.chart.plotArea.x1?x(m.startValue)?a.x-=b.textBlock.height-b.textBlock.fontSize/2:a.x-=b.textBlock.height/2-b.textBlock.fontSize/2+3:(b.textBlock.angle=
90,x(m.startValue)?a.x+=b.textBlock.height-b.textBlock.fontSize/2:a.x+=b.textBlock.height/2-b.textBlock.fontSize/2+3),a.y=-90===b.textBlock.angle?"near"===b.stripLine.labelAlign?this.chart.plotArea.y2-3:"center"===b.stripLine.labelAlign?(this.chart.plotArea.y2+this.chart.plotArea.y1+b.textBlock.width)/2:this.chart.plotArea.y1+b.textBlock.width+3:"near"===b.stripLine.labelAlign?this.chart.plotArea.y2-b.textBlock.width-3:"center"===b.stripLine.labelAlign?(this.chart.plotArea.y2+this.chart.plotArea.y1-
b.textBlock.width)/2:this.chart.plotArea.y1+3):"top"===this._position?(b.textBlock.maxWidth=this.options.stripLines[d].labelMaxWidth?this.options.stripLines[d].labelMaxWidth:this.chart.plotArea.height-3,b.textBlock.measureText(),a.x-b.textBlock.height>this.chart.plotArea.x1?x(m.startValue)?a.x-=b.textBlock.height-b.textBlock.fontSize/2:a.x-=b.textBlock.height/2-b.textBlock.fontSize/2+3:(b.textBlock.angle=90,x(m.startValue)?a.x+=b.textBlock.height-b.textBlock.fontSize/2:a.x+=b.textBlock.height/2-b.textBlock.fontSize/
2+3),a.y=-90===b.textBlock.angle?"near"===b.stripLine.labelAlign?this.chart.plotArea.y1+b.textBlock.width+3:"center"===b.stripLine.labelAlign?(this.chart.plotArea.y2+this.chart.plotArea.y1+b.textBlock.width)/2:this.chart.plotArea.y2-3:"near"===b.stripLine.labelAlign?this.chart.plotArea.y1+3:"center"===b.stripLine.labelAlign?(this.chart.plotArea.y2+this.chart.plotArea.y1-b.textBlock.width)/2:this.chart.plotArea.y2-b.textBlock.width-3):"left"===this._position?(b.textBlock.maxWidth=this.options.stripLines[d].labelMaxWidth?
this.options.stripLines[d].labelMaxWidth:this.chart.plotArea.width-3,b.textBlock.angle=0,b.textBlock.measureText(),a.y-b.textBlock.height>this.chart.plotArea.y1?x(m.startValue)?a.y-=b.textBlock.height-b.textBlock.fontSize/2:a.y-=b.textBlock.height/2-b.textBlock.fontSize+3:a.y-b.textBlock.height<this.chart.plotArea.y2?a.y+=b.textBlock.fontSize/2+3:x(m.startValue)?a.y-=b.textBlock.height-b.textBlock.fontSize/2:a.y-=b.textBlock.height/2-b.textBlock.fontSize+3,a.x="near"===b.stripLine.labelAlign?this.chart.plotArea.x1+
3:"center"===b.stripLine.labelAlign?(this.chart.plotArea.x2+this.chart.plotArea.x1)/2-b.textBlock.width/2:this.chart.plotArea.x2-b.textBlock.width-3):"right"===this._position&&(b.textBlock.maxWidth=this.options.stripLines[d].labelMaxWidth?this.options.stripLines[d].labelMaxWidth:this.chart.plotArea.width-3,b.textBlock.angle=0,b.textBlock.measureText(),a.y-+b.textBlock.height>this.chart.plotArea.y1?x(m.startValue)?a.y-=b.textBlock.height-b.textBlock.fontSize/2:a.y-=b.textBlock.height/2-b.textBlock.fontSize/
2-3:a.y-b.textBlock.height<this.chart.plotArea.y2?a.y+=b.textBlock.fontSize/2+3:x(m.startValue)?a.y-=b.textBlock.height-b.textBlock.fontSize/2:a.y-=b.textBlock.height/2-b.textBlock.fontSize/2+3,a.x="near"===b.stripLine.labelAlign?this.chart.plotArea.x2-b.textBlock.width-3:"center"===b.stripLine.labelAlign?(this.chart.plotArea.x2+this.chart.plotArea.x1)/2-b.textBlock.width/2:this.chart.plotArea.x1+3);b.textBlock.x=a.x;b.textBlock.y=a.y;l.push(b)}if(!h){h=!1;this.ctx.save();this.ctx.beginPath();this.ctx.rect(this.chart.plotArea.x1,
this.chart.plotArea.y1,this.chart.plotArea.width,this.chart.plotArea.height);this.ctx.clip();for(d=0;d<k.length;d++)m=k[d],m.showOnTop?g||(g=!0,this.chart.addEventListener("dataAnimationIterationEnd",function(){this.ctx.save();this.ctx.beginPath();this.ctx.rect(this.chart.plotArea.x1,this.chart.plotArea.y1,this.chart.plotArea.width,this.chart.plotArea.height);this.ctx.clip();for(f=0;f<k.length;f++)m=k[f],m.showOnTop&&m.render();this.ctx.restore()},m)):m.render();for(d=0;d<l.length;d++)b=l[d],b.stripLine.showOnTop?
h||(h=!0,this.chart.addEventListener("dataAnimationIterationEnd",function(){for(f=0;f<l.length;f++)b=l[f],"inside"===b.stripLine.labelPlacement&&b.stripLine.showOnTop&&(c.ctx.save(),c.ctx.beginPath(),c.ctx.rect(c.chart.plotArea.x1,c.chart.plotArea.y1,c.chart.plotArea.width,c.chart.plotArea.height),c.ctx.clip(),b.textBlock.render(!0),c.ctx.restore())},b.textBlock)):"inside"===b.stripLine.labelPlacement&&b.textBlock.render(!0);this.ctx.restore();h=!0}if(h)for(h=!1,d=0;d<l.length;d++)b=l[d],b.stripLine.showOnTop?
h||(h=!0,this.chart.addEventListener("dataAnimationIterationEnd",function(){for(f=0;f<l.length;f++)b=l[f],"outside"===b.stripLine.labelPlacement&&b.stripLine.showOnTop&&b.textBlock.render(!0)},b.textBlock)):"outside"===b.stripLine.labelPlacement&&b.textBlock.render(!0)}};A.prototype.renderGrid=function(){if(this.gridThickness&&0<this.gridThickness){var a=this.chart.ctx;a.save();var c,b=this.chart.plotArea;a.lineWidth=this.gridThickness;a.strokeStyle=this.gridColor;a.setLineDash&&a.setLineDash(E(this.gridDashType,
this.gridThickness));if("bottom"===this._position||"top"===this._position)for(d=0;d<this._labels.length;d++)this._labels[d].position<this.viewportMinimum||this._labels[d].position>this.viewportMaximum||(a.beginPath(),c=this.getPixelCoordinatesOnAxis(this._labels[d].position),c=1===a.lineWidth%2?(c.x<<0)+0.5:c.x<<0,a.moveTo(c,b.y1<<0),a.lineTo(c,b.y2<<0),a.stroke());else if("left"===this._position||"right"===this._position)for(var d=0;d<this._labels.length;d++)this._labels[d].position<this.viewportMinimum||
this._labels[d].position>this.viewportMaximum||(a.beginPath(),c=this.getPixelCoordinatesOnAxis(this._labels[d].position),c=1===a.lineWidth%2?(c.y<<0)+0.5:c.y<<0,a.moveTo(b.x1<<0,c),a.lineTo(b.x2<<0,c),a.stroke());a.restore()}};A.prototype.renderAxisLine=function(){var a=this.chart.ctx;a.save();if("bottom"===this._position||"top"===this._position){if(this.lineThickness){a.lineWidth=this.lineThickness;a.strokeStyle=this.lineColor?this.lineColor:"black";a.setLineDash&&a.setLineDash(E(this.lineDashType,
this.lineThickness));var c=1===this.lineThickness%2?(this.lineCoordinates.y1<<0)+0.5:this.lineCoordinates.y1<<0;a.beginPath();a.moveTo(this.lineCoordinates.x1,c);a.lineTo(this.lineCoordinates.x2,c);a.stroke()}}else"left"!==this._position&&"right"!==this._position||!this.lineThickness||(a.lineWidth=this.lineThickness,a.strokeStyle=this.lineColor,a.setLineDash&&a.setLineDash(E(this.lineDashType,this.lineThickness)),c=1===this.lineThickness%2?(this.lineCoordinates.x1<<0)+0.5:this.lineCoordinates.x1<<
0,a.beginPath(),a.moveTo(c,this.lineCoordinates.y1),a.lineTo(c,this.lineCoordinates.y2),a.stroke());a.restore()};A.prototype.getPixelCoordinatesOnAxis=function(a){var c={};if("bottom"===this._position||"top"===this._position)c.x=this.convertValueToPixel(a),c.y=this.lineCoordinates.y1;if("left"===this._position||"right"===this._position)c.y=this.convertValueToPixel(a),c.x=this.lineCoordinates.x2;return c};A.prototype.convertPixelToValue=function(a){if("undefined"===typeof a)return null;var c=0,c=0,
c="number"===typeof a?a:"left"===this._position||"right"===this._position?a.y:a.x;return c=this.logarithmic?Math.pow(this.logarithmBase,(c-this.conversionParameters.reference)/this.conversionParameters.pixelPerUnit)*this.viewportMinimum:this.conversionParameters.minimum+(c-this.conversionParameters.reference)/this.conversionParameters.pixelPerUnit};A.prototype.convertValueToPixel=function(a){return this.logarithmic?this.conversionParameters.reference+this.conversionParameters.pixelPerUnit*Math.log(a/
this.conversionParameters.minimum)/this.conversionParameters.lnLogarithmBase+0.5<<0:this.conversionParameters.reference+this.conversionParameters.pixelPerUnit*(a-this.conversionParameters.minimum)+0.5<<0};A.prototype.setViewPortRange=function(a,c){this.sessionVariables.newViewportMinimum=this.viewportMinimum=Math.min(a,c);this.sessionVariables.newViewportMaximum=this.viewportMaximum=Math.max(a,c)};A.prototype.getXValueAt=function(a){if(!a)return null;var c=null;"left"===this._position?c=this.convertPixelToValue(a.y):
"bottom"===this._position&&(c=this.convertPixelToValue(a.x));return c};A.prototype.calculateValueToPixelConversionParameters=function(a){a={pixelPerUnit:null,minimum:null,reference:null};var c=this.lineCoordinates.width,b=this.lineCoordinates.height;a.minimum=this.viewportMinimum;if("bottom"===this._position||"top"===this._position)this.logarithmic?(a.lnLogarithmBase=Math.log(this.logarithmBase),a.pixelPerUnit=(this.reversed?-1:1)*c*a.lnLogarithmBase/Math.log(Math.abs(this.range))):a.pixelPerUnit=
(this.reversed?-1:1)*c/Math.abs(this.range),a.reference=this.reversed?this.lineCoordinates.x2:this.lineCoordinates.x1;if("left"===this._position||"right"===this._position)this.logarithmic?(a.lnLogarithmBase=Math.log(this.logarithmBase),a.pixelPerUnit=(this.reversed?1:-1)*b*a.lnLogarithmBase/Math.log(Math.abs(this.range))):a.pixelPerUnit=(this.reversed?1:-1)*b/Math.abs(this.range),a.reference=this.reversed?this.lineCoordinates.y1:this.lineCoordinates.y2;this.conversionParameters=a};A.prototype.calculateAxisParameters=
function(){if(this.logarithmic)this.calculateLogarithamicAxisParameters();else{var a=this.chart.layoutManager.getFreeSpace(),c=!1;"bottom"===this._position||"top"===this._position?(this.maxWidth=a.width,this.maxHeight=a.height):(this.maxWidth=a.height,this.maxHeight=a.width);var a="axisX"===this.type?"xySwapped"===this.chart.plotInfo.axisPlacement?62:70:"xySwapped"===this.chart.plotInfo.axisPlacement?50:40,b=4;"axisX"===this.type&&(b=100>this.maxWidth?3:300>this.maxWidth?6:600>this.maxWidth?8:6);
var a=Math.max(b,Math.floor(this.maxWidth/a)),d,f,g,b=0;if(null===this.viewportMinimum||isNaN(this.viewportMinimum))this.viewportMinimum=this.minimum;if(null===this.viewportMaximum||isNaN(this.viewportMaximum))this.viewportMaximum=this.maximum;"axisX"===this.type?(d=null!==this.viewportMinimum?this.viewportMinimum:this.dataInfo.viewPortMin,f=null!==this.viewportMaximum?this.viewportMaximum:this.dataInfo.viewPortMax,0===f-d&&(b="undefined"===typeof this.options.interval?0.4:this.options.interval,f+=
b,d-=b),Infinity!==this.dataInfo.minDiff?g=this.dataInfo.minDiff:1<f-d?g=0.5*Math.abs(f-d):(g=1,"dateTime"===this.chart.plotInfo.axisXValueType&&(c=!0))):"axisY"===this.type&&(d=null!==this.viewportMinimum?this.viewportMinimum:this.dataInfo.viewPortMin,f=null!==this.viewportMaximum?this.viewportMaximum:this.dataInfo.viewPortMax,isFinite(d)||isFinite(f)?isFinite(d)?isFinite(f)||(f=d):d=f:(f="undefined"===typeof this.options.interval?-Infinity:this.options.interval,d=0),0===d&&0===f?(f+=9,d=0):0===
f-d?(b=Math.min(Math.abs(0.01*Math.abs(f)),5),f+=b,d-=b):d>f?(b=Math.min(Math.abs(0.01*Math.abs(f-d)),5),0<=f?d=f-b:f=d+b):(b=Math.min(Math.abs(0.01*Math.abs(f-d)),0.05),0!==f&&(f+=b),0!==d&&(d-=b)),g=Infinity!==this.dataInfo.minDiff?this.dataInfo.minDiff:1<f-d?0.5*Math.abs(f-d):1,this.includeZero&&(null===this.viewportMinimum||isNaN(this.viewportMinimum))&&0<d&&(d=0),this.includeZero&&(null===this.viewportMaximum||isNaN(this.viewportMaximum))&&0>f&&(f=0));b=(isNaN(this.viewportMaximum)||null===this.viewportMaximum?
f:this.viewportMaximum)-(isNaN(this.viewportMinimum)||null===this.viewportMinimum?d:this.viewportMinimum);if("axisX"===this.type&&"dateTime"===this.chart.plotInfo.axisXValueType){this.intervalType||(b/1<=a?(this.interval=1,this.intervalType="millisecond"):b/2<=a?(this.interval=2,this.intervalType="millisecond"):b/5<=a?(this.interval=5,this.intervalType="millisecond"):b/10<=a?(this.interval=10,this.intervalType="millisecond"):b/20<=a?(this.interval=20,this.intervalType="millisecond"):b/50<=a?(this.interval=
50,this.intervalType="millisecond"):b/100<=a?(this.interval=100,this.intervalType="millisecond"):b/200<=a?(this.interval=200,this.intervalType="millisecond"):b/250<=a?(this.interval=250,this.intervalType="millisecond"):b/300<=a?(this.interval=300,this.intervalType="millisecond"):b/400<=a?(this.interval=400,this.intervalType="millisecond"):b/500<=a?(this.interval=500,this.intervalType="millisecond"):b/(1*G.secondDuration)<=a?(this.interval=1,this.intervalType="second"):b/(2*G.secondDuration)<=a?(this.interval=
2,this.intervalType="second"):b/(5*G.secondDuration)<=a?(this.interval=5,this.intervalType="second"):b/(10*G.secondDuration)<=a?(this.interval=10,this.intervalType="second"):b/(15*G.secondDuration)<=a?(this.interval=15,this.intervalType="second"):b/(20*G.secondDuration)<=a?(this.interval=20,this.intervalType="second"):b/(30*G.secondDuration)<=a?(this.interval=30,this.intervalType="second"):b/(1*G.minuteDuration)<=a?(this.interval=1,this.intervalType="minute"):b/(2*G.minuteDuration)<=a?(this.interval=
2,this.intervalType="minute"):b/(5*G.minuteDuration)<=a?(this.interval=5,this.intervalType="minute"):b/(10*G.minuteDuration)<=a?(this.interval=10,this.intervalType="minute"):b/(15*G.minuteDuration)<=a?(this.interval=15,this.intervalType="minute"):b/(20*G.minuteDuration)<=a?(this.interval=20,this.intervalType="minute"):b/(30*G.minuteDuration)<=a?(this.interval=30,this.intervalType="minute"):b/(1*G.hourDuration)<=a?(this.interval=1,this.intervalType="hour"):b/(2*G.hourDuration)<=a?(this.interval=2,
this.intervalType="hour"):b/(3*G.hourDuration)<=a?(this.interval=3,this.intervalType="hour"):b/(6*G.hourDuration)<=a?(this.interval=6,this.intervalType="hour"):b/(1*G.dayDuration)<=a?(this.interval=1,this.intervalType="day"):b/(2*G.dayDuration)<=a?(this.interval=2,this.intervalType="day"):b/(4*G.dayDuration)<=a?(this.interval=4,this.intervalType="day"):b/(1*G.weekDuration)<=a?(this.interval=1,this.intervalType="week"):b/(2*G.weekDuration)<=a?(this.interval=2,this.intervalType="week"):b/(3*G.weekDuration)<=
a?(this.interval=3,this.intervalType="week"):b/(1*G.monthDuration)<=a?(this.interval=1,this.intervalType="month"):b/(2*G.monthDuration)<=a?(this.interval=2,this.intervalType="month"):b/(3*G.monthDuration)<=a?(this.interval=3,this.intervalType="month"):b/(6*G.monthDuration)<=a?(this.interval=6,this.intervalType="month"):(this.interval=b/(1*G.yearDuration)<=a?1:b/(2*G.yearDuration)<=a?2:b/(4*G.yearDuration)<=a?4:Math.floor(A.getNiceNumber(b/(a-1),!0)/G.yearDuration),this.intervalType="year"));if(null===
this.viewportMinimum||isNaN(this.viewportMinimum))this.viewportMinimum=d-g/2;if(null===this.viewportMaximum||isNaN(this.viewportMaximum))this.viewportMaximum=f+g/2;c?this.autoValueFormatString="MMM DD YYYY HH:mm":"year"===this.intervalType?this.autoValueFormatString="YYYY":"month"===this.intervalType?this.autoValueFormatString="MMM YYYY":"week"===this.intervalType?this.autoValueFormatString="MMM DD YYYY":"day"===this.intervalType?this.autoValueFormatString="MMM DD YYYY":"hour"===this.intervalType?
this.autoValueFormatString="hh:mm TT":"minute"===this.intervalType?this.autoValueFormatString="hh:mm TT":"second"===this.intervalType?this.autoValueFormatString="hh:mm:ss TT":"millisecond"===this.intervalType&&(this.autoValueFormatString="fff'ms'");this.valueFormatString||(this.valueFormatString=this.autoValueFormatString)}else{this.intervalType="number";b=A.getNiceNumber(b,!1);this.interval=this.options&&0<this.options.interval?this.options.interval:A.getNiceNumber(b/(a-1),!0);if(null===this.viewportMinimum||
isNaN(this.viewportMinimum))this.viewportMinimum="axisX"===this.type?d-g/2:Math.floor(d/this.interval)*this.interval;if(null===this.viewportMaximum||isNaN(this.viewportMaximum))this.viewportMaximum="axisX"===this.type?f+g/2:Math.ceil(f/this.interval)*this.interval;0===this.viewportMaximum&&0===this.viewportMinimum&&(0===this.options.viewportMinimum?this.viewportMaximum+=10:0===this.options.viewportMaximum&&(this.viewportMinimum-=10),this.options&&"undefined"===typeof this.options.interval&&(this.interval=
A.getNiceNumber((this.viewportMaximum-this.viewportMinimum)/(a-1),!0)))}if(null===this.minimum||null===this.maximum)if("axisX"===this.type?(d=null!==this.minimum?this.minimum:this.dataInfo.min,f=null!==this.maximum?this.maximum:this.dataInfo.max,0===f-d&&(b="undefined"===typeof this.options.interval?0.4:this.options.interval,f+=b,d-=b),g=Infinity!==this.dataInfo.minDiff?this.dataInfo.minDiff:1<f-d?0.5*Math.abs(f-d):1):"axisY"===this.type&&(d=null!==this.minimum?this.minimum:this.dataInfo.min,f=null!==
this.maximum?this.maximum:this.dataInfo.max,isFinite(d)||isFinite(f)?0===d&&0===f?(f+=9,d=0):0===f-d?(b=Math.min(Math.abs(0.01*Math.abs(f)),5),f+=b,d-=b):d>f?(b=Math.min(Math.abs(0.01*Math.abs(f-d)),5),0<=f?d=f-b:f=d+b):(b=Math.min(Math.abs(0.01*Math.abs(f-d)),0.05),0!==f&&(f+=b),0!==d&&(d-=b)):(f="undefined"===typeof this.options.interval?-Infinity:this.options.interval,d=0),g=Infinity!==this.dataInfo.minDiff?this.dataInfo.minDiff:1<f-d?0.5*Math.abs(f-d):1,this.includeZero&&(null===this.minimum||
isNaN(this.minimum))&&0<d&&(d=0),this.includeZero&&(null===this.maximum||isNaN(this.maximum))&&0>f&&(f=0)),"axisX"===this.type&&"dateTime"===this.chart.plotInfo.axisXValueType){if(null===this.minimum||isNaN(this.minimum))this.minimum=d-g/2;if(null===this.maximum||isNaN(this.maximum))this.maximum=f+g/2}else this.intervalType="number",null===this.minimum&&(this.minimum="axisX"===this.type?d-g/2:Math.floor(d/this.interval)*this.interval,this.minimum=Math.min(this.minimum,null===this.sessionVariables.viewportMinimum||
isNaN(this.sessionVariables.viewportMinimum)?Infinity:this.sessionVariables.viewportMinimum)),null===this.maximum&&(this.maximum="axisX"===this.type?f+g/2:Math.ceil(f/this.interval)*this.interval,this.maximum=Math.max(this.maximum,null===this.sessionVariables.viewportMaximum||isNaN(this.sessionVariables.viewportMaximum)?-Infinity:this.sessionVariables.viewportMaximum)),0===this.maximum&&0===this.minimum&&(0===this.options.minimum?this.maximum+=10:0===this.options.maximum&&(this.minimum-=10));this.viewportMinimum=
Math.max(this.viewportMinimum,this.minimum);this.viewportMaximum=Math.min(this.viewportMaximum,this.maximum);this.range=this.viewportMaximum-this.viewportMinimum;this.intervalStartPosition="axisX"===this.type&&"dateTime"===this.chart.plotInfo.axisXValueType?this.getLabelStartPoint(new Date(this.viewportMinimum),this.intervalType,this.interval):Math.floor((this.viewportMinimum+0.2*this.interval)/this.interval)*this.interval;if(!this.valueFormatString&&(this.valueFormatString="#,##0.##",1>this.range)){c=
Math.floor(Math.abs(Math.log(this.range)/Math.LN10))+2;if(isNaN(c)||!isFinite(c))c=2;if(2<c)for(d=0;d<c-2;d++)this.valueFormatString+="#"}}};A.prototype.calculateLogarithamicAxisParameters=function(){var a=this.chart.layoutManager.getFreeSpace(),c=Math.log(this.logarithmBase),b;"bottom"===this._position||"top"===this._position?(this.maxWidth=a.width,this.maxHeight=a.height):(this.maxWidth=a.height,this.maxHeight=a.width);var a="axisX"===this.type?500>this.maxWidth?7:Math.max(7,Math.floor(this.maxWidth/
100)):Math.max(Math.floor(this.maxWidth/50),3),d,f,g,h;h=1;if(null===this.viewportMinimum||isNaN(this.viewportMinimum))this.viewportMinimum=this.minimum;if(null===this.viewportMaximum||isNaN(this.viewportMaximum))this.viewportMaximum=this.maximum;"axisX"===this.type?(d=null!==this.viewportMinimum?this.viewportMinimum:this.dataInfo.viewPortMin,f=null!==this.viewportMaximum?this.viewportMaximum:this.dataInfo.viewPortMax,1===f/d&&(h=Math.pow(this.logarithmBase,"undefined"===typeof this.options.interval?
0.4:this.options.interval),f*=h,d/=h),g=Infinity!==this.dataInfo.minDiff?this.dataInfo.minDiff:f/d>this.logarithmBase?f/d*Math.pow(this.logarithmBase,0.5):this.logarithmBase):"axisY"===this.type&&(d=null!==this.viewportMinimum?this.viewportMinimum:this.dataInfo.viewPortMin,f=null!==this.viewportMaximum?this.viewportMaximum:this.dataInfo.viewPortMax,0>=d&&!isFinite(f)?(f="undefined"===typeof this.options.interval?0:this.options.interval,d=1):0>=d?d=f:isFinite(f)||(f=d),1===d&&1===f?(f*=this.logarithmBase-
1/this.logarithmBase,d=1):1===f/d?(h=Math.min(f*Math.pow(this.logarithmBase,0.01),Math.pow(this.logarithmBase,5)),f*=h,d/=h):d>f?(h=Math.min(d/f*Math.pow(this.logarithmBase,0.01),Math.pow(this.logarithmBase,5)),1<=f?d=f/h:f=d*h):(h=Math.min(f/d*Math.pow(this.logarithmBase,0.01),Math.pow(this.logarithmBase,0.04)),1!==f&&(f*=h),1!==d&&(d/=h)),g=Infinity!==this.dataInfo.minDiff?this.dataInfo.minDiff:f/d>this.logarithmBase?f/d*Math.pow(this.logarithmBase,0.5):this.logarithmBase,this.includeZero&&(null===
this.viewportMinimum||isNaN(this.viewportMinimum))&&1<d&&(d=1),this.includeZero&&(null===this.viewportMaximum||isNaN(this.viewportMaximum))&&1>f&&(f=1));h=(isNaN(this.viewportMaximum)||null===this.viewportMaximum?f:this.viewportMaximum)/(isNaN(this.viewportMinimum)||null===this.viewportMinimum?d:this.viewportMinimum);linearRange=(isNaN(this.viewportMaximum)||null===this.viewportMaximum?f:this.viewportMaximum)-(isNaN(this.viewportMinimum)||null===this.viewportMinimum?d:this.viewportMinimum);this.intervalType=
"number";h=Math.pow(this.logarithmBase,A.getNiceNumber(Math.abs(Math.log(h)/c),!1));this.options&&0<this.options.interval?this.interval=this.options.interval:(this.interval=A.getNiceExponent(Math.log(h)/c/(a-1),!0),b=A.getNiceNumber(linearRange/(a-1),!0));if(null===this.viewportMinimum||isNaN(this.viewportMinimum))this.viewportMinimum="axisX"===this.type?d/Math.sqrt(g):Math.pow(this.logarithmBase,this.interval*Math.floor(Math.log(d)/c/this.interval));if(null===this.viewportMaximum||isNaN(this.viewportMaximum))this.viewportMaximum=
"axisX"===this.type?f*Math.sqrt(g):Math.pow(this.logarithmBase,this.interval*Math.ceil(Math.log(f)/c/this.interval));1===this.viewportMaximum&&1===this.viewportMinimum&&(1===this.options.viewportMinimum?this.viewportMaximum*=this.logarithmBase-1/this.logarithmBase:1===this.options.viewportMaximum&&(this.viewportMinimum/=this.logarithmBase-1/this.logarithmBase),this.options&&"undefined"===typeof this.options.interval&&(this.interval=A.getNiceExponent(Math.ceil(Math.log(h)/c)/(a-1)),b=A.getNiceNumber((this.viewportMaximum-
this.viewportMinimum)/(a-1),!0)));if(null===this.minimum||null===this.maximum)"axisX"===this.type?(d=null!==this.minimum?this.minimum:this.dataInfo.min,f=null!==this.maximum?this.maximum:this.dataInfo.max,1===f/d&&(h=Math.pow(this.logarithmBase,"undefined"===typeof this.options.interval?0.4:this.options.interval),f*=h,d/=h),g=Infinity!==this.dataInfo.minDiff?this.dataInfo.minDiff:f/d>this.logarithmBase?f/d*Math.pow(this.logarithmBase,0.5):this.logarithmBase):"axisY"===this.type&&(d=null!==this.minimum?
this.minimum:this.dataInfo.min,f=null!==this.maximum?this.maximum:this.dataInfo.max,isFinite(d)||isFinite(f)?1===d&&1===f?(f*=this.logarithmBase,d/=this.logarithmBase):1===f/d?(h=Math.pow(this.logarithmBase,this.interval),f*=h,d/=h):d>f?(h=Math.min(0.01*(d/f),5),1<=f?d=f/h:f=d*h):(h=Math.min(f/d*Math.pow(this.logarithmBase,0.01),Math.pow(this.logarithmBase,0.04)),1!==f&&(f*=h),1!==d&&(d/=h)):(f="undefined"===typeof this.options.interval?0:this.options.interval,d=1),g=Infinity!==this.dataInfo.minDiff?
this.dataInfo.minDiff:f/d>this.logarithmBase?f/d*Math.pow(this.logarithmBase,0.5):this.logarithmBase,this.includeZero&&(null===this.minimum||isNaN(this.minimum))&&1<d&&(d=1),this.includeZero&&(null===this.maximum||isNaN(this.maximum))&&1>f&&(f=1)),this.intervalType="number",null===this.minimum&&(this.minimum="axisX"===this.type?d/Math.sqrt(g):Math.pow(this.logarithmBase,this.interval*Math.floor(Math.log(d)/c/this.interval)),this.minimum=Math.min(this.minimum,null===this.sessionVariables.viewportMinimum||
isNaN(this.sessionVariables.viewportMinimum)?"undefined"===typeof this.sessionVariables.newViewportMinimum?Infinity:this.sessionVariables.newViewportMinimum:this.sessionVariables.viewportMinimum)),null===this.maximum&&(this.maximum="axisX"===this.type?f*Math.sqrt(g):Math.pow(this.logarithmBase,this.interval*Math.ceil(Math.log(f)/c/this.interval)),this.maximum=Math.max(this.maximum,null===this.sessionVariables.viewportMaximum||isNaN(this.sessionVariables.viewportMaximum)?"undefined"===typeof this.sessionVariables.newViewportMaximum?
0:this.sessionVariables.newViewportMaximum:this.sessionVariables.viewportMaximum)),1===this.maximum&&1===this.minimum&&(1===this.options.minimum?this.maximum*=this.logarithmBase-1/this.logarithmBase:1===this.options.maximum&&(this.minimum/=this.logarithmBase-1/this.logarithmBase));this.viewportMinimum=Math.max(this.viewportMinimum,this.minimum);this.viewportMaximum=Math.min(this.viewportMaximum,this.maximum);this.viewportMinimum>this.viewportMaximum&&(!this.options.viewportMinimum&&!this.options.minimum||
this.options.viewportMaximum||this.options.maximum?this.options.viewportMinimum||this.options.minimum||!this.options.viewportMaximum&&!this.options.maximum||(this.viewportMinimum=this.minimum=(this.options.viewportMaximum||this.options.maximum)/Math.pow(this.logarithmBase,2*Math.ceil(this.interval))):this.viewportMaximum=this.maximum=this.options.viewportMinimum||this.options.minimum);d=Math.pow(this.logarithmBase,Math.floor(Math.log(this.viewportMinimum)/(c*this.interval)+0.2)*this.interval);this.range=
this.viewportMaximum/this.viewportMinimum;this.noTicks=a;if(!this.options.interval&&this.range<Math.pow(this.logarithmBase,8>this.viewportMaximum||3>a?2:3)){for(c=Math.floor(this.viewportMinimum/b+0.5)*b;c<this.viewportMinimum;)c+=b;this.equidistantInterval=!1;this.intervalStartPosition=c;this.interval=b}else this.options.interval||(b=Math.ceil(this.interval),this.range>this.interval&&(this.interval=b,d=Math.pow(this.logarithmBase,Math.floor(Math.log(this.viewportMinimum)/(c*this.interval)+0.2)*this.interval))),
this.equidistantInterval=!0,this.intervalStartPosition=d;if(!this.valueFormatString&&(this.valueFormatString="#,##0.##",1>this.viewportMinimum)){c=Math.floor(Math.abs(Math.log(this.viewportMinimum)/Math.LN10))+2;if(isNaN(c)||!isFinite(c))c=2;if(2<c)for(b=0;b<c-2;b++)this.valueFormatString+="#"}};A.getNiceExponent=function(a,c){var b=Math.floor(Math.log(a)/Math.LN10),d=a/Math.pow(10,b),d=0>b?1>=d?1:5>=d?5:10:Math.max(Math.floor(d),1);return Number((d*Math.pow(10,b)).toFixed(20))};A.getNiceNumber=function(a,
c){var b=Math.floor(Math.log(a)/Math.LN10),d=a/Math.pow(10,b);return Number(((c?1.5>d?1:3>d?2:7>d?5:10:1>=d?1:2>=d?2:5>=d?5:10)*Math.pow(10,b)).toFixed(20))};A.prototype.getLabelStartPoint=function(){var a=G[this.intervalType+"Duration"]*this.interval,a=new Date(Math.floor(this.viewportMinimum/a)*a);if("millisecond"!==this.intervalType)if("second"===this.intervalType)0<a.getMilliseconds()&&(a.setSeconds(a.getSeconds()+1),a.setMilliseconds(0));else if("minute"===this.intervalType){if(0<a.getSeconds()||
0<a.getMilliseconds())a.setMinutes(a.getMinutes()+1),a.setSeconds(0),a.setMilliseconds(0)}else if("hour"===this.intervalType){if(0<a.getMinutes()||0<a.getSeconds()||0<a.getMilliseconds())a.setHours(a.getHours()+1),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0)}else if("day"===this.intervalType){if(0<a.getHours()||0<a.getMinutes()||0<a.getSeconds()||0<a.getMilliseconds())a.setDate(a.getDate()+1),a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0)}else if("week"===this.intervalType){if(0<
a.getDay()||0<a.getHours()||0<a.getMinutes()||0<a.getSeconds()||0<a.getMilliseconds())a.setDate(a.getDate()+(7-a.getDay())),a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0)}else if("month"===this.intervalType){if(1<a.getDate()||0<a.getHours()||0<a.getMinutes()||0<a.getSeconds()||0<a.getMilliseconds())a.setMonth(a.getMonth()+1),a.setDate(1),a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0)}else"year"===this.intervalType&&(0<a.getMonth()||1<a.getDate()||0<a.getHours()||
0<a.getMinutes()||0<a.getSeconds()||0<a.getMilliseconds())&&(a.setFullYear(a.getFullYear()+1),a.setMonth(0),a.setDate(1),a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0));return a};S(na,K);na.prototype.createUserOptions=function(a){if("undefined"!==typeof a||this.options._isPlaceholder){var c=0;this.parent.options._isPlaceholder&&this.parent.createUserOptions();this.options._isPlaceholder||(qa(this.parent.stripLines),c=this.parent.options.stripLines.indexOf(this.options));this.options=
"undefined"===typeof a?{}:a;this.parent.options.stripLines[c]=this.options}};na.prototype.render=function(){this.ctx.save();var a=this.parent.getPixelCoordinatesOnAxis(this.value),c=Math.abs("pixel"===this._thicknessType?this.thickness:this.parent.conversionParameters.pixelPerUnit*this.thickness);if(0<c){var b=null===this.opacity?1:this.opacity;this.ctx.strokeStyle=this.color;this.ctx.beginPath();var d=this.ctx.globalAlpha;this.ctx.globalAlpha=b;D(this.id);var f,g,h,k;this.ctx.lineWidth=c;this.ctx.setLineDash&&
this.ctx.setLineDash(E(this.lineDashType,c));if("bottom"===this.parent._position||"top"===this.parent._position)f=g=1===this.ctx.lineWidth%2?(a.x<<0)+0.5:a.x<<0,h=this.chart.plotArea.y1,k=this.chart.plotArea.y2,this.bounds={x1:f-c/2,y1:h,x2:g+c/2,y2:k};else if("left"===this.parent._position||"right"===this.parent._position)h=k=1===this.ctx.lineWidth%2?(a.y<<0)+0.5:a.y<<0,f=this.chart.plotArea.x1,g=this.chart.plotArea.x2,this.bounds={x1:f,y1:h-c/2,x2:g,y2:k+c/2};this.ctx.moveTo(f,h);this.ctx.lineTo(g,
k);this.ctx.stroke();this.ctx.globalAlpha=d}this.ctx.restore()};S(T,K);T.prototype._initialize=function(){if(this.enabled){this.container=document.createElement("div");this.container.setAttribute("class","canvasjs-chart-tooltip");this.container.style.position="absolute";this.container.style.height="auto";this.container.style.boxShadow="1px 1px 2px 2px rgba(0,0,0,0.1)";this.container.style.zIndex="1000";this.container.style.display="none";var a;a='<div style=" width: auto;height: auto;min-width: 50px;';
a+="line-height: auto;";a+="margin: 0px 0px 0px 0px;";a+="padding: 5px;";a+="font-family: Calibri, Arial, Georgia, serif;";a+="font-weight: normal;";a+="font-style: "+(u?"italic;":"normal;");a+="font-size: 14px;";a+="color: #000000;";a+="text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);";a+="text-align: left;";a+="border: 2px solid gray;";a+=u?"background: rgba(255,255,255,.9);":"background: rgb(255,255,255);";a+="text-indent: 0px;";a+="white-space: nowrap;";a+="border-radius: 5px;";a+="-moz-user-select:none;";
a+="-khtml-user-select: none;";a+="-webkit-user-select: none;";a+="-ms-user-select: none;";a+="user-select: none;";u||(a+="filter: alpha(opacity = 90);",a+="filter: progid:DXImageTransform.Microsoft.Shadow(Strength=3, Direction=135, Color='#666666');");a+='} "> Sample Tooltip</div>';this.container.innerHTML=a;this.contentDiv=this.container.firstChild;this.container.style.borderRadius=this.contentDiv.style.borderRadius;this.chart._canvasJSContainer.appendChild(this.container)}};T.prototype.mouseMoveHandler=
function(a,c){this._lastUpdated&&40>(new Date).getTime()-this._lastUpdated||(this._lastUpdated=(new Date).getTime(),this._updateToolTip(a,c))};T.prototype._updateToolTip=function(a,c,b){b="undefined"===typeof b?!0:b;this.container||this._initialize();this.enabled||this.hide();if(!this.chart.disableToolTip){if("undefined"===typeof a||"undefined"===typeof c){if(isNaN(this._prevX)||isNaN(this._prevY))return;a=this._prevX;c=this._prevY}else this._prevX=a,this._prevY=c;var d=null,f=null,g=[],h=0;if(this.shared&&
this.enabled&&"none"!==this.chart.plotInfo.axisPlacement){if("xySwapped"===this.chart.plotInfo.axisPlacement){f=[];if(this.chart.axisX)for(var k=0;k<this.chart.axisX.length;k++){for(var h=this.chart.axisX[k].convertPixelToValue({y:c}),l=null,d=0;d<this.chart.axisX[k].dataSeries.length;d++)(l=this.chart.axisX[k].dataSeries[d].getDataPointAtX(h,b))&&0<=l.index&&(l.dataSeries=this.chart.axisX[k].dataSeries[d],null!==l.dataPoint.y&&f.push(l));l=null}if(this.chart.axisX2)for(k=0;k<this.chart.axisX2.length;k++){h=
this.chart.axisX2[k].convertPixelToValue({y:c});l=null;for(d=0;d<this.chart.axisX2[k].dataSeries.length;d++)(l=this.chart.axisX2[k].dataSeries[d].getDataPointAtX(h,b))&&0<=l.index&&(l.dataSeries=this.chart.axisX2[k].dataSeries[d],null!==l.dataPoint.y&&f.push(l));l=null}}else{f=[];if(this.chart.axisX)for(k=0;k<this.chart.axisX.length;k++)for(h=this.chart.axisX[k].convertPixelToValue({x:a}),l=null,d=0;d<this.chart.axisX[k].dataSeries.length;d++)(l=this.chart.axisX[k].dataSeries[d].getDataPointAtX(h,
b))&&0<=l.index&&(l.dataSeries=this.chart.axisX[k].dataSeries[d],null!==l.dataPoint.y&&f.push(l));if(this.chart.axisX2)for(k=0;k<this.chart.axisX2.length;k++)for(h=this.chart.axisX2[k].convertPixelToValue({x:a}),l=null,d=0;d<this.chart.axisX2[k].dataSeries.length;d++)(l=this.chart.axisX2[k].dataSeries[d].getDataPointAtX(h,b))&&0<=l.index&&(l.dataSeries=this.chart.axisX2[k].dataSeries[d],null!==l.dataPoint.y&&f.push(l))}if(0===f.length)return;f.sort(function(a,b){return a.distance-b.distance});b=f[0];
for(d=0;d<f.length;d++)f[d].dataPoint.x.valueOf()===b.dataPoint.x.valueOf()&&g.push(f[d]);f=null}else{if(l=this.chart.getDataPointAtXY(a,c,b))this.currentDataPointIndex=l.dataPointIndex,this.currentSeriesIndex=l.dataSeries.index;else if(u)if(l=Ka(a,c,this.chart._eventManager.ghostCtx),0<l&&"undefined"!==typeof this.chart._eventManager.objectMap[l]){l=this.chart._eventManager.objectMap[l];if("legendItem"===l.objectType)return;this.currentSeriesIndex=l.dataSeriesIndex;this.currentDataPointIndex=0<=
l.dataPointIndex?l.dataPointIndex:-1}else this.currentDataPointIndex=-1;else this.currentDataPointIndex=-1;if(0<=this.currentSeriesIndex){f=this.chart.data[this.currentSeriesIndex];l={};if(0<=this.currentDataPointIndex)d=f.dataPoints[this.currentDataPointIndex],l.dataSeries=f,l.dataPoint=d,l.index=this.currentDataPointIndex,l.distance=Math.abs(d.x-h);else{if(!this.enabled||"line"!==f.type&&"stepLine"!==f.type&&"spline"!==f.type&&"area"!==f.type&&"stepArea"!==f.type&&"splineArea"!==f.type&&"stackedArea"!==
f.type&&"stackedArea100"!==f.type&&"rangeArea"!==f.type&&"rangeSplineArea"!==f.type&&"candlestick"!==f.type&&"ohlc"!==f.type)return;h=f.axisX.convertPixelToValue({x:a});l=f.getDataPointAtX(h,b);l.dataSeries=f;this.currentDataPointIndex=l.index;d=l.dataPoint}if(!x(l.dataPoint.y))if(l.dataSeries.axisY)if(0<l.dataPoint.y.length){for(d=b=0;d<l.dataPoint.y.length;d++)l.dataPoint.y[d]<l.dataSeries.axisY.viewportMinimum?b--:l.dataPoint.y[d]>l.dataSeries.axisY.viewportMaximum&&b++;b<l.dataPoint.y.length&&
b>-l.dataPoint.y.length&&g.push(l)}else"column"===f.type||"bar"===f.type?0>l.dataPoint.y?0>l.dataSeries.axisY.viewportMinimum&&l.dataSeries.axisY.viewportMaximum>=l.dataPoint.y&&g.push(l):l.dataSeries.axisY.viewportMinimum<=l.dataPoint.y&&0<=l.dataSeries.axisY.viewportMaximum&&g.push(l):"bubble"===f.type?(b=this.chart._eventManager.objectMap[f.dataPointIds[l.index]].size/2,l.dataPoint.y>=l.dataSeries.axisY.viewportMinimum-b&&l.dataPoint.y<=l.dataSeries.axisY.viewportMaximum+b&&g.push(l)):(0<=l.dataSeries.type.indexOf("100")||
"stackedColumn"===f.type||"stackedBar"===f.type||l.dataPoint.y>=l.dataSeries.axisY.viewportMinimum&&l.dataPoint.y<=l.dataSeries.axisY.viewportMaximum)&&g.push(l);else g.push(l)}}if(0<g.length&&(this.highlightObjects(g),this.enabled))if(b="",b=this.getToolTipInnerHTML({entries:g}),null!==b){this.contentDiv.innerHTML=b;this.contentDiv.innerHTML=b;b=!1;"none"===this.container.style.display&&(b=!0,this.container.style.display="block");try{this.contentDiv.style.background=this.backgroundColor?this.backgroundColor:
u?"rgba(255,255,255,.9)":"rgb(255,255,255)",this.contentDiv.style.borderRightColor=this.contentDiv.style.borderLeftColor=this.contentDiv.style.borderColor=this.borderColor?this.borderColor:g[0].dataPoint.color?g[0].dataPoint.color:g[0].dataSeries.color?g[0].dataSeries.color:g[0].dataSeries._colorSet[g[0].index%g[0].dataSeries._colorSet.length],this.contentDiv.style.borderWidth=this.borderThickness||0===this.borderThickness?this.borderThickness+"px":"2px",this.contentDiv.style.borderRadius=this.cornerRadius||
0===this.cornerRadius?this.cornerRadius+"px":"5px",this.container.style.borderRadius=this.contentDiv.style.borderRadius,this.contentDiv.style.fontSize=this.fontSize||0===this.fontSize?this.fontSize+"px":"14px",this.contentDiv.style.color=this.fontColor?this.fontColor:"#000000",this.contentDiv.style.fontFamily=this.fontFamily?this.fontFamily:"Calibri, Arial, Georgia, serif;",this.contentDiv.style.fontWeight=this.fontWeight?this.fontWeight:"normal",this.contentDiv.style.fontStyle=this.fontStyle?this.fontStyle:
u?"italic":"normal"}catch(m){}"pie"===g[0].dataSeries.type||"doughnut"===g[0].dataSeries.type||"funnel"===g[0].dataSeries.type||"bar"===g[0].dataSeries.type||"rangeBar"===g[0].dataSeries.type||"stackedBar"===g[0].dataSeries.type||"stackedBar100"===g[0].dataSeries.type?a=a-10-this.container.clientWidth:(a=g[0].dataSeries.axisX.convertValueToPixel(g[0].dataPoint.x)-this.container.clientWidth<<0,a-=10);0>a&&(a+=this.container.clientWidth+20);a+this.container.clientWidth>Math.max(this.chart.container.clientWidth,
this.chart.width)&&(a=Math.max(0,Math.max(this.chart.container.clientWidth,this.chart.width)-this.container.clientWidth));a+="px";c=1!==g.length||this.shared||"line"!==g[0].dataSeries.type&&"stepLine"!==g[0].dataSeries.type&&"spline"!==g[0].dataSeries.type&&"area"!==g[0].dataSeries.type&&"stepArea"!==g[0].dataSeries.type&&"splineArea"!==g[0].dataSeries.type?"bar"===g[0].dataSeries.type||"rangeBar"===g[0].dataSeries.type||"stackedBar"===g[0].dataSeries.type||"stackedBar100"===g[0].dataSeries.type?
g[0].dataSeries.axisX.convertValueToPixel(g[0].dataPoint.x):c:g[0].dataSeries.axisY.convertValueToPixel(g[0].dataPoint.y);c=-c+10;0<c+this.container.clientHeight+5&&(c-=c+this.container.clientHeight+5-0);this.container.style.left=a;this.container.style.bottom=c+"px";!this.animationEnabled||b?this.disableAnimation():this.enableAnimation()}else this.hide(!1)}};T.prototype.highlightObjects=function(a){var c=this.chart.overlaidCanvasCtx;this.chart.resetOverlayedCanvas();c.clearRect(0,0,this.chart.width,
this.chart.height);c.save();var b=this.chart.plotArea,d=0;c.beginPath();c.rect(b.x1,b.y1,b.x2-b.x1,b.y2-b.y1);c.clip();for(b=0;b<a.length;b++){var f=a[b];if((f=this.chart._eventManager.objectMap[f.dataSeries.dataPointIds[f.index]])&&f.objectType&&"dataPoint"===f.objectType){var d=this.chart.data[f.dataSeriesIndex],g=d.dataPoints[f.dataPointIndex],h=f.dataPointIndex;!1===g.highlightEnabled||!0!==d.highlightEnabled&&!0!==g.highlightEnabled||("line"===d.type||"stepLine"===d.type||"spline"===d.type||
"scatter"===d.type||"area"===d.type||"stepArea"===d.type||"splineArea"===d.type||"stackedArea"===d.type||"stackedArea100"===d.type||"rangeArea"===d.type||"rangeSplineArea"===d.type?(g=d.getMarkerProperties(h,f.x1,f.y1,this.chart.overlaidCanvasCtx),g.size=Math.max(1.5*g.size<<0,10),g.borderColor=g.borderColor||"#FFFFFF",g.borderThickness=g.borderThickness||Math.ceil(0.1*g.size),M.drawMarkers([g]),"undefined"!==typeof f.y2&&(g=d.getMarkerProperties(h,f.x1,f.y2,this.chart.overlaidCanvasCtx),g.size=Math.max(1.5*
g.size<<0,10),g.borderColor=g.borderColor||"#FFFFFF",g.borderThickness=g.borderThickness||Math.ceil(0.1*g.size),M.drawMarkers([g]))):"bubble"===d.type?(g=d.getMarkerProperties(h,f.x1,f.y1,this.chart.overlaidCanvasCtx),g.size=f.size,g.color="white",g.borderColor="white",c.globalAlpha=0.3,M.drawMarkers([g]),c.globalAlpha=1):"column"===d.type||"stackedColumn"===d.type||"stackedColumn100"===d.type||"bar"===d.type||"rangeBar"===d.type||"stackedBar"===d.type||"stackedBar100"===d.type||"rangeColumn"===d.type?
L(c,f.x1,f.y1,f.x2,f.y2,"white",0,null,!1,!1,!1,!1,0.3):"pie"===d.type||"doughnut"===d.type?Fa(c,f.center,f.radius,"white",d.type,f.startAngle,f.endAngle,0.3,f.percentInnerRadius):"candlestick"===d.type?(c.globalAlpha=1,c.strokeStyle=f.color,c.lineWidth=2*f.borderThickness,d=0===c.lineWidth%2?0:0.5,c.beginPath(),c.moveTo(f.x3-d,Math.min(f.y2,f.y3)),c.lineTo(f.x3-d,Math.min(f.y1,f.y4)),c.stroke(),c.beginPath(),c.moveTo(f.x3-d,Math.max(f.y1,f.y4)),c.lineTo(f.x3-d,Math.max(f.y2,f.y3)),c.stroke(),L(c,
f.x1,Math.min(f.y1,f.y4),f.x2,Math.max(f.y1,f.y4),"transparent",2*f.borderThickness,f.color,!1,!1,!1,!1),c.globalAlpha=1):"ohlc"===d.type&&(c.globalAlpha=1,c.strokeStyle=f.color,c.lineWidth=2*f.borderThickness,d=0===c.lineWidth%2?0:0.5,c.beginPath(),c.moveTo(f.x3-d,f.y2),c.lineTo(f.x3-d,f.y3),c.stroke(),c.beginPath(),c.moveTo(f.x3,f.y1),c.lineTo(f.x1,f.y1),c.stroke(),c.beginPath(),c.moveTo(f.x3,f.y4),c.lineTo(f.x2,f.y4),c.stroke(),c.globalAlpha=1))}}c.restore();c.globalAlpha=1;c.beginPath()};T.prototype.getToolTipInnerHTML=
function(a){a=a.entries;for(var c=null,b=null,d=null,f=0,g="",h=!0,k=0;k<a.length;k++)if(a[k].dataSeries.toolTipContent||a[k].dataPoint.toolTipContent){h=!1;break}if(h&&(this.content&&"function"===typeof this.content||this.contentFormatter))a={chart:this.chart,toolTip:this.options,entries:a},c=this.contentFormatter?this.contentFormatter(a):this.content(a);else if(this.shared&&"none"!==this.chart.plotInfo.axisPlacement){for(var l=null,m="",k=0;k<a.length;k++)if(b=a[k].dataSeries,d=a[k].dataPoint,f=
a[k].index,g="",0===k&&(h&&!this.content)&&(this.chart.axisX&&0<this.chart.axisX.length?m+="undefined"!==typeof this.chart.axisX[0].labels[d.x]?this.chart.axisX[0].labels[d.x]:"{x}":this.chart.axisX2&&0<this.chart.axisX2.length&&(m+="undefined"!==typeof this.chart.axisX2[0].labels[d.x]?this.chart.axisX2[0].labels[d.x]:"{x}"),m+="</br>",m=this.chart.replaceKeywordsWithValue(m,d,b,f)),null!==d.toolTipContent&&("undefined"!==typeof d.toolTipContent||null!==b.options.toolTipContent)){if("line"===b.type||
"stepLine"===b.type||"spline"===b.type||"area"===b.type||"stepArea"===b.type||"splineArea"===b.type||"column"===b.type||"bar"===b.type||"scatter"===b.type||"stackedColumn"===b.type||"stackedColumn100"===b.type||"stackedBar"===b.type||"stackedBar100"===b.type||"stackedArea"===b.type||"stackedArea100"===b.type)this.chart.axisX&&1<this.chart.axisX.length&&(g+=l!=b.axisXIndex?b.axisX.title?b.axisX.title+"<br/>":"X:{axisXIndex}<br/>":""),g+=d.toolTipContent?d.toolTipContent:b.toolTipContent?b.toolTipContent:
this.content&&"function"!==typeof this.content?this.content:"<span style='\""+(this.fontColor?"":"'color:{color};'")+"\"'>{name}:</span>&nbsp;&nbsp;{y}",l=b.axisXIndex;else if("bubble"===b.type)this.chart.axisX&&1<this.chart.axisX.length&&(g+=l!=b.axisXIndex?b.axisX.title?b.axisX.title+"<br/>":"X:{axisXIndex}<br/>":""),g+=d.toolTipContent?d.toolTipContent:b.toolTipContent?b.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"<span style='\""+(this.fontColor?"":"'color:{color};'")+
"\"'>{name}:</span>&nbsp;&nbsp;{y}, &nbsp;&nbsp;{z}";else if("rangeColumn"===b.type||"rangeBar"===b.type||"rangeArea"===b.type||"rangeSplineArea"===b.type)this.chart.axisX&&1<this.chart.axisX.length&&(g+=l!=b.axisXIndex?b.axisX.title?b.axisX.title+"<br/>":"X:{axisXIndex}<br/>":""),g+=d.toolTipContent?d.toolTipContent:b.toolTipContent?b.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"<span style='\""+(this.fontColor?"":"'color:{color};'")+"\"'>{name}:</span>&nbsp;&nbsp;{y[0]},&nbsp;{y[1]}";
else if("candlestick"===b.type||"ohlc"===b.type)this.chart.axisX&&1<this.chart.axisX.length&&(g+=l!=b.axisXIndex?b.axisX.title?b.axisX.title+"<br/>":"X:{axisXIndex}<br/>":""),g+=d.toolTipContent?d.toolTipContent:b.toolTipContent?b.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"<span style='\""+(this.fontColor?"":"'color:{color};'")+"\"'>{name}:</span><br/>Open: &nbsp;&nbsp;{y[0]}<br/>High: &nbsp;&nbsp;&nbsp;{y[1]}<br/>Low:&nbsp;&nbsp;&nbsp;{y[2]}<br/>Close: &nbsp;&nbsp;{y[3]}";
null===c&&(c="");!0===this.reversed?(c=this.chart.replaceKeywordsWithValue(g,d,b,f)+c,k<a.length-1&&(c="</br>"+c)):(c+=this.chart.replaceKeywordsWithValue(g,d,b,f),k<a.length-1&&(c+="</br>"))}null!==c&&(c=m+c)}else{b=a[0].dataSeries;d=a[0].dataPoint;f=a[0].index;if(null===d.toolTipContent||"undefined"===typeof d.toolTipContent&&null===b.options.toolTipContent)return null;if("line"===b.type||"stepLine"===b.type||"spline"===b.type||"area"===b.type||"stepArea"===b.type||"splineArea"===b.type||"column"===
b.type||"bar"===b.type||"scatter"===b.type||"stackedColumn"===b.type||"stackedColumn100"===b.type||"stackedBar"===b.type||"stackedBar100"===b.type||"stackedArea"===b.type||"stackedArea100"===b.type)g=d.toolTipContent?d.toolTipContent:b.toolTipContent?b.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"<span style='\""+(this.fontColor?"":"'color:{color};'")+"\"'>"+(d.label?"{label}":"{x}")+":</span>&nbsp;&nbsp;{y}";else if("bubble"===b.type)g=d.toolTipContent?d.toolTipContent:
b.toolTipContent?b.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"<span style='\""+(this.fontColor?"":"'color:{color};'")+"\"'>"+(d.label?"{label}":"{x}")+":</span>&nbsp;&nbsp;{y}, &nbsp;&nbsp;{z}";else if("pie"===b.type||"doughnut"===b.type||"funnel"===b.type)g=d.toolTipContent?d.toolTipContent:b.toolTipContent?b.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"<span style='\""+(this.fontColor?"":"'color:{color};'")+"\"'>"+(d.name?"{name}:</span>&nbsp;&nbsp;":
d.label?"{label}:</span>&nbsp;&nbsp;":"</span>")+"{y}";else if("rangeColumn"===b.type||"rangeBar"===b.type||"rangeArea"===b.type||"rangeSplineArea"===b.type)g=d.toolTipContent?d.toolTipContent:b.toolTipContent?b.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"<span style='\""+(this.fontColor?"":"'color:{color};'")+"\"'>"+(d.label?"{label}":"{x}")+" :</span>&nbsp;&nbsp;{y[0]}, &nbsp;{y[1]}";else if("candlestick"===b.type||"ohlc"===b.type)g=d.toolTipContent?d.toolTipContent:
b.toolTipContent?b.toolTipContent:this.content&&"function"!==typeof this.content?this.content:"<span style='\""+(this.fontColor?"":"'color:{color};'")+"\"'>"+(d.label?"{label}":"{x}")+"</span><br/>Open: &nbsp;&nbsp;{y[0]}<br/>High: &nbsp;&nbsp;&nbsp;{y[1]}<br/>Low: &nbsp;&nbsp;&nbsp;&nbsp;{y[2]}<br/>Close: &nbsp;&nbsp;{y[3]}";null===c&&(c="");c+=this.chart.replaceKeywordsWithValue(g,d,b,f)}return c};T.prototype.enableAnimation=function(){this.container.style.WebkitTransition||(this.container.style.WebkitTransition=
"left .2s ease-out, bottom .2s ease-out",this.container.style.MozTransition="left .2s ease-out, bottom .2s ease-out",this.container.style.MsTransition="left .2s ease-out, bottom .2s ease-out",this.container.style.transition="left .2s ease-out, bottom .2s ease-out")};T.prototype.disableAnimation=function(){this.container.style.WebkitTransition&&(this.container.style.WebkitTransition="",this.container.style.MozTransition="",this.container.style.MsTransition="",this.container.style.transition="")};T.prototype.hide=
function(a){this.container&&(this.container.style.display="none",this.currentSeriesIndex=-1,this._prevY=this._prevX=NaN,("undefined"===typeof a||a)&&this.chart.resetOverlayedCanvas())};T.prototype.show=function(a,c,b){this._updateToolTip(a,c,"undefined"===typeof b?!1:b)};y.prototype.getPercentAndTotal=function(a,c){var b=null,d=null,f=null;if(0<=a.type.indexOf("stacked"))d=0,b=c.x.getTime?c.x.getTime():c.x,b in a.plotUnit.yTotals&&(d=a.plotUnit.yTotals[b],f=isNaN(c.y)?0:0===d?0:100*(c.y/d));else if("pie"===
a.type||"doughnut"===a.type){for(i=d=0;i<a.dataPoints.length;i++)isNaN(a.dataPoints[i].y)||(d+=a.dataPoints[i].y);f=isNaN(c.y)?0:100*(c.y/d)}return{percent:f,total:d}};y.prototype.replaceKeywordsWithValue=function(a,c,b,d,f){var g=this;f="undefined"===typeof f?0:f;if((0<=b.type.indexOf("stacked")||"pie"===b.type||"doughnut"===b.type)&&(0<=a.indexOf("#percent")||0<=a.indexOf("#total"))){var h="#percent",k="#total",l=this.getPercentAndTotal(b,c),k=isNaN(l.total)?k:l.total,h=isNaN(l.percent)?h:l.percent;
do{l="";if(b.percentFormatString)l=b.percentFormatString;else{var l="#,##0.",m=Math.max(Math.ceil(Math.log(1/Math.abs(h))/Math.LN10),2);if(isNaN(m)||!isFinite(m))m=2;for(var p=0;p<m;p++)l+="#"}a=a.replace("#percent",da(h,l,g._cultureInfo));a=a.replace("#total",da(k,b.yValueFormatString?b.yValueFormatString:"#,##0.########",g._cultureInfo))}while(0<=a.indexOf("#percent")||0<=a.indexOf("#total"))}return a.replace(/\{.*?\}|"[^"]*"|'[^']*'/g,function(a){if('"'===a[0]&&'"'===a[a.length-1]||"'"===a[0]&&
"'"===a[a.length-1])return a.slice(1,a.length-1);a=ka(a.slice(1,a.length-1));a=a.replace("#index",f);var e=null;try{var h=a.match(/(.*?)\s*\[\s*(.*?)\s*\]/);h&&0<h.length&&(e=ka(h[2]),a=ka(h[1]))}catch(k){}h=null;if("color"===a)return c.color?c.color:b.color?b.color:b._colorSet[d%b._colorSet.length];if(c.hasOwnProperty(a))h=c;else if(b.hasOwnProperty(a))h=b;else return"";h=h[a];null!==e&&(h=h[e]);if("x"===a)if("dateTime"===g.plotInfo.axisXValueType||"dateTime"===b.xValueType||c.x&&c.x.getTime){if(g.plotInfo.plotTypes[0].plotUnits[0].axisX&&
!g.plotInfo.plotTypes[0].plotUnits[0].axisX.logarithmic)return Da(h,c.xValueFormatString?c.xValueFormatString:b.xValueFormatString?b.xValueFormatString:g.axisX&&g.axisX.autoValueFormatString?g.axisX.autoValueFormatString:"DD MMM YY",g._cultureInfo)}else return da(h,c.xValueFormatString?c.xValueFormatString:b.xValueFormatString?b.xValueFormatString:"#,##0.########",g._cultureInfo);else return"y"===a?da(h,c.yValueFormatString?c.yValueFormatString:b.yValueFormatString?b.yValueFormatString:"#,##0.########",
g._cultureInfo):"z"===a?da(h,c.zValueFormatString?c.zValueFormatString:b.zValueFormatString?b.zValueFormatString:"#,##0.########",g._cultureInfo):h})};la.prototype.reset=function(){this.lastObjectId=0;this.objectMap=[];this.rectangularRegionEventSubscriptions=[];this.previousDataPointEventObject=null;this.eventObjects=[];u&&(this.ghostCtx.clearRect(0,0,this.chart.width,this.chart.height),this.ghostCtx.beginPath())};la.prototype.getNewObjectTrackingId=function(){return++this.lastObjectId};la.prototype.mouseEventHandler=
function(a){if("mousemove"===a.type||"click"===a.type){var c=[],b=xa(a),d=null;if((d=this.chart.getObjectAtXY(b.x,b.y,!1))&&"undefined"!==typeof this.objectMap[d])if(d=this.objectMap[d],"dataPoint"===d.objectType){var f=this.chart.data[d.dataSeriesIndex],g=f.dataPoints[d.dataPointIndex],h=d.dataPointIndex;d.eventParameter={x:b.x,y:b.y,dataPoint:g,dataSeries:f.options,dataPointIndex:h,dataSeriesIndex:f.index,chart:this.chart};d.eventContext={context:g,userContext:g,mouseover:"mouseover",mousemove:"mousemove",
mouseout:"mouseout",click:"click"};c.push(d);d=this.objectMap[f.id];d.eventParameter={x:b.x,y:b.y,dataPoint:g,dataSeries:f.options,dataPointIndex:h,dataSeriesIndex:f.index,chart:this.chart};d.eventContext={context:f,userContext:f.options,mouseover:"mouseover",mousemove:"mousemove",mouseout:"mouseout",click:"click"};c.push(this.objectMap[f.id])}else"legendItem"===d.objectType&&(f=this.chart.data[d.dataSeriesIndex],g=null!==d.dataPointIndex?f.dataPoints[d.dataPointIndex]:null,d.eventParameter={x:b.x,
y:b.y,dataSeries:f.options,dataPoint:g,dataPointIndex:d.dataPointIndex,dataSeriesIndex:d.dataSeriesIndex,chart:this.chart},d.eventContext={context:this.chart.legend,userContext:this.chart.legend.options,mouseover:"itemmouseover",mousemove:"itemmousemove",mouseout:"itemmouseout",click:"itemclick"},c.push(d));f=[];for(b=0;b<this.mouseoveredObjectMaps.length;b++){g=!0;for(d=0;d<c.length;d++)if(c[d].id===this.mouseoveredObjectMaps[b].id){g=!1;break}g?this.fireEvent(this.mouseoveredObjectMaps[b],"mouseout",
a):f.push(this.mouseoveredObjectMaps[b])}this.mouseoveredObjectMaps=f;for(b=0;b<c.length;b++){f=!1;for(d=0;d<this.mouseoveredObjectMaps.length;d++)if(c[b].id===this.mouseoveredObjectMaps[d].id){f=!0;break}f||(this.fireEvent(c[b],"mouseover",a),this.mouseoveredObjectMaps.push(c[b]));"click"===a.type?this.fireEvent(c[b],"click",a):"mousemove"===a.type&&this.fireEvent(c[b],"mousemove",a)}}};la.prototype.fireEvent=function(a,c,b){if(a&&c){var d=a.eventParameter,f=a.eventContext,g=a.eventContext.userContext;
g&&(f&&g[f[c]])&&g[f[c]].call(g,d);"mouseout"!==c?g.cursor&&g.cursor!==b.target.style.cursor&&(b.target.style.cursor=g.cursor):(b.target.style.cursor=this.chart._defaultCursor,delete a.eventParameter,delete a.eventContext);"click"===c&&("dataPoint"===a.objectType&&this.chart.pieDoughnutClickHandler)&&this.chart.pieDoughnutClickHandler.call(this.chart.data[a.dataSeriesIndex],d)}};S(oa,K);Ca.prototype.animate=function(a,c,b,d,f){var g=this;this.chart.isAnimating=!0;f=f||F.easing.linear;b&&this.animations.push({startTime:(new Date).getTime()+
(a?a:0),duration:c,animationCallback:b,onComplete:d});for(a=[];0<this.animations.length;)if(c=this.animations.shift(),b=(new Date).getTime(),d=0,c.startTime<=b&&(d=f(Math.min(b-c.startTime,c.duration),0,1,c.duration),d=Math.min(d,1),isNaN(d)||!isFinite(d))&&(d=1),1>d&&a.push(c),c.animationCallback(d),1<=d&&c.onComplete)c.onComplete();this.animations=a;0<this.animations.length?this.animationRequestId=this.chart.requestAnimFrame.call(window,function(){g.animate.call(g)}):this.chart.isAnimating=!1};
Ca.prototype.cancelAllAnimations=function(){this.animations=[];this.animationRequestId&&this.chart.cancelRequestAnimFrame.call(window,this.animationRequestId);this.animationRequestId=null;this.chart.isAnimating=!1};var F={yScaleAnimation:function(a,c){if(0!==a){var b=c.dest,d=c.source.canvas,f=c.animationBase;b.drawImage(d,0,0,d.width,d.height,0,f-f*a,b.canvas.width/P,a*b.canvas.height/P)}},xScaleAnimation:function(a,c){if(0!==a){var b=c.dest,d=c.source.canvas,f=c.animationBase;b.drawImage(d,0,0,
d.width,d.height,f-f*a,0,a*b.canvas.width/P,b.canvas.height/P)}},xClipAnimation:function(a,c){if(0!==a){var b=c.dest,d=c.source.canvas;b.save();0<a&&b.drawImage(d,0,0,d.width*a,d.height,0,0,d.width*a/P,d.height/P);b.restore()}},fadeInAnimation:function(a,c){if(0!==a){var b=c.dest,d=c.source.canvas;b.save();b.globalAlpha=a;b.drawImage(d,0,0,d.width,d.height,0,0,b.canvas.width/P,b.canvas.height/P);b.restore()}},easing:{linear:function(a,c,b,d){return b*a/d+c},easeOutQuad:function(a,c,b,d){return-b*
(a/=d)*(a-2)+c},easeOutQuart:function(a,c,b,d){return-b*((a=a/d-1)*a*a*a-1)+c},easeInQuad:function(a,c,b,d){return b*(a/=d)*a+c},easeInQuart:function(a,c,b,d){return b*(a/=d)*a*a*a+c}}},M={drawMarker:function(a,c,b,d,f,g,h,k){if(b){var l=1;b.fillStyle=g?g:"#000000";b.strokeStyle=h?h:"#000000";b.lineWidth=k?k:0;"circle"===d?(b.moveTo(a,c),b.beginPath(),b.arc(a,c,f/2,0,2*Math.PI,!1),g&&b.fill(),k&&(h?b.stroke():(l=b.globalAlpha,b.globalAlpha=0.15,b.strokeStyle="black",b.stroke(),b.globalAlpha=l))):
"square"===d?(b.beginPath(),b.rect(a-f/2,c-f/2,f,f),g&&b.fill(),k&&(h?b.stroke():(l=b.globalAlpha,b.globalAlpha=0.15,b.strokeStyle="black",b.stroke(),b.globalAlpha=l))):"triangle"===d?(b.beginPath(),b.moveTo(a-f/2,c+f/2),b.lineTo(a+f/2,c+f/2),b.lineTo(a,c-f/2),b.closePath(),g&&b.fill(),k&&(h?b.stroke():(l=b.globalAlpha,b.globalAlpha=0.15,b.strokeStyle="black",b.stroke(),b.globalAlpha=l)),b.beginPath()):"cross"===d&&(b.strokeStyle=g,b.lineWidth=f/4,b.beginPath(),b.moveTo(a-f/2,c-f/2),b.lineTo(a+f/
2,c+f/2),b.stroke(),b.moveTo(a+f/2,c-f/2),b.lineTo(a-f/2,c+f/2),b.stroke())}},drawMarkers:function(a){for(var c=0;c<a.length;c++){var b=a[c];M.drawMarker(b.x,b.y,b.ctx,b.type,b.size,b.color,b.borderColor,b.borderThickness)}}},Oa={Chart:y,addColorSet:function(a,c){ha[a]=c},addCultureInfo:function(a,c){pa[a]=c},formatNumber:function(a,c,b){b=b||"en";if(pa[b])return da(a,c||"#,##0.##",new oa(b));throw"Unknown Culture Name";},formatDate:function(a,c,b){b=b||"en";if(pa[b])return Da(a,c||"DD MMM YYYY",
new oa(b));throw"Unknown Culture Name";}};Oa.Chart.version="v1.9.5 GA";window.CanvasJS=Oa})();
/*
  excanvas is used to support IE678 which do not implement HTML5 Canvas Element. You can safely remove the following excanvas code if you don't need to support older browsers.

  Copyright 2006 Google Inc. https://code.google.com/p/explorercanvas/
  Licensed under the Apache License, Version 2.0
*/
document.createElement("canvas").getContext||function(){function V(){return this.context_||(this.context_=new C(this))}function W(a,b,c){var g=M.call(arguments,2);return function(){return a.apply(b,g.concat(M.call(arguments)))}}function N(a){return String(a).replace(/&/g,"&amp;").replace(/"/g,"&quot;")}function O(a){a.namespaces.g_vml_||a.namespaces.add("g_vml_","urn:schemas-microsoft-com:vml","#default#VML");a.namespaces.g_o_||a.namespaces.add("g_o_","urn:schemas-microsoft-com:office:office","#default#VML");
a.styleSheets.ex_canvas_||(a=a.createStyleSheet(),a.owningElement.id="ex_canvas_",a.cssText="canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}")}function X(a){var b=a.srcElement;switch(a.propertyName){case "width":b.getContext().clearRect();b.style.width=b.attributes.width.nodeValue+"px";b.firstChild.style.width=b.clientWidth+"px";break;case "height":b.getContext().clearRect(),b.style.height=b.attributes.height.nodeValue+"px",b.firstChild.style.height=b.clientHeight+
"px"}}function Y(a){a=a.srcElement;a.firstChild&&(a.firstChild.style.width=a.clientWidth+"px",a.firstChild.style.height=a.clientHeight+"px")}function D(){return[[1,0,0],[0,1,0],[0,0,1]]}function t(a,b){for(var c=D(),g=0;3>g;g++)for(var e=0;3>e;e++){for(var f=0,d=0;3>d;d++)f+=a[g][d]*b[d][e];c[g][e]=f}return c}function P(a,b){b.fillStyle=a.fillStyle;b.lineCap=a.lineCap;b.lineJoin=a.lineJoin;b.lineWidth=a.lineWidth;b.miterLimit=a.miterLimit;b.shadowBlur=a.shadowBlur;b.shadowColor=a.shadowColor;b.shadowOffsetX=
a.shadowOffsetX;b.shadowOffsetY=a.shadowOffsetY;b.strokeStyle=a.strokeStyle;b.globalAlpha=a.globalAlpha;b.font=a.font;b.textAlign=a.textAlign;b.textBaseline=a.textBaseline;b.arcScaleX_=a.arcScaleX_;b.arcScaleY_=a.arcScaleY_;b.lineScale_=a.lineScale_}function Q(a){var b=a.indexOf("(",3),c=a.indexOf(")",b+1),b=a.substring(b+1,c).split(",");if(4!=b.length||"a"!=a.charAt(3))b[3]=1;return b}function E(a,b,c){return Math.min(c,Math.max(b,a))}function F(a,b,c){0>c&&c++;1<c&&c--;return 1>6*c?a+6*(b-a)*c:
1>2*c?b:2>3*c?a+6*(b-a)*(2/3-c):a}function G(a){if(a in H)return H[a];var b,c=1;a=String(a);if("#"==a.charAt(0))b=a;else if(/^rgb/.test(a)){c=Q(a);b="#";for(var g,e=0;3>e;e++)g=-1!=c[e].indexOf("%")?Math.floor(255*(parseFloat(c[e])/100)):+c[e],b+=v[E(g,0,255)];c=+c[3]}else if(/^hsl/.test(a)){e=c=Q(a);b=parseFloat(e[0])/360%360;0>b&&b++;g=E(parseFloat(e[1])/100,0,1);e=E(parseFloat(e[2])/100,0,1);if(0==g)g=e=b=e;else{var f=0.5>e?e*(1+g):e+g-e*g,d=2*e-f;g=F(d,f,b+1/3);e=F(d,f,b);b=F(d,f,b-1/3)}b="#"+
v[Math.floor(255*g)]+v[Math.floor(255*e)]+v[Math.floor(255*b)];c=c[3]}else b=Z[a]||a;return H[a]={color:b,alpha:c}}function C(a){this.m_=D();this.mStack_=[];this.aStack_=[];this.currentPath_=[];this.fillStyle=this.strokeStyle="#000";this.lineWidth=1;this.lineJoin="miter";this.lineCap="butt";this.miterLimit=1*q;this.globalAlpha=1;this.font="10px sans-serif";this.textAlign="left";this.textBaseline="alphabetic";this.canvas=a;var b="width:"+a.clientWidth+"px;height:"+a.clientHeight+"px;overflow:hidden;position:absolute",
c=a.ownerDocument.createElement("div");c.style.cssText=b;a.appendChild(c);b=c.cloneNode(!1);b.style.backgroundColor="red";b.style.filter="alpha(opacity=0)";a.appendChild(b);this.element_=c;this.lineScale_=this.arcScaleY_=this.arcScaleX_=1}function R(a,b,c,g){a.currentPath_.push({type:"bezierCurveTo",cp1x:b.x,cp1y:b.y,cp2x:c.x,cp2y:c.y,x:g.x,y:g.y});a.currentX_=g.x;a.currentY_=g.y}function S(a,b){var c=G(a.strokeStyle),g=c.color,c=c.alpha*a.globalAlpha,e=a.lineScale_*a.lineWidth;1>e&&(c*=e);b.push("<g_vml_:stroke",
' opacity="',c,'"',' joinstyle="',a.lineJoin,'"',' miterlimit="',a.miterLimit,'"',' endcap="',$[a.lineCap]||"square",'"',' weight="',e,'px"',' color="',g,'" />')}function T(a,b,c,g){var e=a.fillStyle,f=a.arcScaleX_,d=a.arcScaleY_,k=g.x-c.x,n=g.y-c.y;if(e instanceof w){var h=0,l=g=0,u=0,m=1;if("gradient"==e.type_){h=e.x1_/f;c=e.y1_/d;var p=s(a,e.x0_/f,e.y0_/d),h=s(a,h,c),h=180*Math.atan2(h.x-p.x,h.y-p.y)/Math.PI;0>h&&(h+=360);1E-6>h&&(h=0)}else p=s(a,e.x0_,e.y0_),g=(p.x-c.x)/k,l=(p.y-c.y)/n,k/=f*q,
n/=d*q,m=x.max(k,n),u=2*e.r0_/m,m=2*e.r1_/m-u;f=e.colors_;f.sort(function(a,b){return a.offset-b.offset});d=f.length;p=f[0].color;c=f[d-1].color;k=f[0].alpha*a.globalAlpha;a=f[d-1].alpha*a.globalAlpha;for(var n=[],r=0;r<d;r++){var t=f[r];n.push(t.offset*m+u+" "+t.color)}b.push('<g_vml_:fill type="',e.type_,'"',' method="none" focus="100%"',' color="',p,'"',' color2="',c,'"',' colors="',n.join(","),'"',' opacity="',a,'"',' g_o_:opacity2="',k,'"',' angle="',h,'"',' focusposition="',g,",",l,'" />')}else e instanceof
I?k&&n&&b.push("<g_vml_:fill",' position="',-c.x/k*f*f,",",-c.y/n*d*d,'"',' type="tile"',' src="',e.src_,'" />'):(e=G(a.fillStyle),b.push('<g_vml_:fill color="',e.color,'" opacity="',e.alpha*a.globalAlpha,'" />'))}function s(a,b,c){a=a.m_;return{x:q*(b*a[0][0]+c*a[1][0]+a[2][0])-r,y:q*(b*a[0][1]+c*a[1][1]+a[2][1])-r}}function z(a,b,c){isFinite(b[0][0])&&(isFinite(b[0][1])&&isFinite(b[1][0])&&isFinite(b[1][1])&&isFinite(b[2][0])&&isFinite(b[2][1]))&&(a.m_=b,c&&(a.lineScale_=aa(ba(b[0][0]*b[1][1]-b[0][1]*
b[1][0]))))}function w(a){this.type_=a;this.r1_=this.y1_=this.x1_=this.r0_=this.y0_=this.x0_=0;this.colors_=[]}function I(a,b){if(!a||1!=a.nodeType||"IMG"!=a.tagName)throw new A("TYPE_MISMATCH_ERR");if("complete"!=a.readyState)throw new A("INVALID_STATE_ERR");switch(b){case "repeat":case null:case "":this.repetition_="repeat";break;case "repeat-x":case "repeat-y":case "no-repeat":this.repetition_=b;break;default:throw new A("SYNTAX_ERR");}this.src_=a.src;this.width_=a.width;this.height_=a.height}
function A(a){this.code=this[a];this.message=a+": DOM Exception "+this.code}var x=Math,k=x.round,J=x.sin,K=x.cos,ba=x.abs,aa=x.sqrt,q=10,r=q/2;navigator.userAgent.match(/MSIE ([\d.]+)?/);var M=Array.prototype.slice;O(document);var U={init:function(a){a=a||document;a.createElement("canvas");a.attachEvent("onreadystatechange",W(this.init_,this,a))},init_:function(a){a=a.getElementsByTagName("canvas");for(var b=0;b<a.length;b++)this.initElement(a[b])},initElement:function(a){if(!a.getContext){a.getContext=
V;O(a.ownerDocument);a.innerHTML="";a.attachEvent("onpropertychange",X);a.attachEvent("onresize",Y);var b=a.attributes;b.width&&b.width.specified?a.style.width=b.width.nodeValue+"px":a.width=a.clientWidth;b.height&&b.height.specified?a.style.height=b.height.nodeValue+"px":a.height=a.clientHeight}return a}};U.init();for(var v=[],d=0;16>d;d++)for(var B=0;16>B;B++)v[16*d+B]=d.toString(16)+B.toString(16);var Z={aliceblue:"#F0F8FF",antiquewhite:"#FAEBD7",aquamarine:"#7FFFD4",azure:"#F0FFFF",beige:"#F5F5DC",
bisque:"#FFE4C4",black:"#000000",blanchedalmond:"#FFEBCD",blueviolet:"#8A2BE2",brown:"#A52A2A",burlywood:"#DEB887",cadetblue:"#5F9EA0",chartreuse:"#7FFF00",chocolate:"#D2691E",coral:"#FF7F50",cornflowerblue:"#6495ED",cornsilk:"#FFF8DC",crimson:"#DC143C",cyan:"#00FFFF",darkblue:"#00008B",darkcyan:"#008B8B",darkgoldenrod:"#B8860B",darkgray:"#A9A9A9",darkgreen:"#006400",darkgrey:"#A9A9A9",darkkhaki:"#BDB76B",darkmagenta:"#8B008B",darkolivegreen:"#556B2F",darkorange:"#FF8C00",darkorchid:"#9932CC",darkred:"#8B0000",
darksalmon:"#E9967A",darkseagreen:"#8FBC8F",darkslateblue:"#483D8B",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",darkturquoise:"#00CED1",darkviolet:"#9400D3",deeppink:"#FF1493",deepskyblue:"#00BFFF",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1E90FF",firebrick:"#B22222",floralwhite:"#FFFAF0",forestgreen:"#228B22",gainsboro:"#DCDCDC",ghostwhite:"#F8F8FF",gold:"#FFD700",goldenrod:"#DAA520",grey:"#808080",greenyellow:"#ADFF2F",honeydew:"#F0FFF0",hotpink:"#FF69B4",indianred:"#CD5C5C",indigo:"#4B0082",
ivory:"#FFFFF0",khaki:"#F0E68C",lavender:"#E6E6FA",lavenderblush:"#FFF0F5",lawngreen:"#7CFC00",lemonchiffon:"#FFFACD",lightblue:"#ADD8E6",lightcoral:"#F08080",lightcyan:"#E0FFFF",lightgoldenrodyellow:"#FAFAD2",lightgreen:"#90EE90",lightgrey:"#D3D3D3",lightpink:"#FFB6C1",lightsalmon:"#FFA07A",lightseagreen:"#20B2AA",lightskyblue:"#87CEFA",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#B0C4DE",lightyellow:"#FFFFE0",limegreen:"#32CD32",linen:"#FAF0E6",magenta:"#FF00FF",mediumaquamarine:"#66CDAA",
mediumblue:"#0000CD",mediumorchid:"#BA55D3",mediumpurple:"#9370DB",mediumseagreen:"#3CB371",mediumslateblue:"#7B68EE",mediumspringgreen:"#00FA9A",mediumturquoise:"#48D1CC",mediumvioletred:"#C71585",midnightblue:"#191970",mintcream:"#F5FFFA",mistyrose:"#FFE4E1",moccasin:"#FFE4B5",navajowhite:"#FFDEAD",oldlace:"#FDF5E6",olivedrab:"#6B8E23",orange:"#FFA500",orangered:"#FF4500",orchid:"#DA70D6",palegoldenrod:"#EEE8AA",palegreen:"#98FB98",paleturquoise:"#AFEEEE",palevioletred:"#DB7093",papayawhip:"#FFEFD5",
peachpuff:"#FFDAB9",peru:"#CD853F",pink:"#FFC0CB",plum:"#DDA0DD",powderblue:"#B0E0E6",rosybrown:"#BC8F8F",royalblue:"#4169E1",saddlebrown:"#8B4513",salmon:"#FA8072",sandybrown:"#F4A460",seagreen:"#2E8B57",seashell:"#FFF5EE",sienna:"#A0522D",skyblue:"#87CEEB",slateblue:"#6A5ACD",slategray:"#708090",slategrey:"#708090",snow:"#FFFAFA",springgreen:"#00FF7F",steelblue:"#4682B4",tan:"#D2B48C",thistle:"#D8BFD8",tomato:"#FF6347",turquoise:"#40E0D0",violet:"#EE82EE",wheat:"#F5DEB3",whitesmoke:"#F5F5F5",yellowgreen:"#9ACD32"},
H={},L={},$={butt:"flat",round:"round"},d=C.prototype;d.clearRect=function(){this.textMeasureEl_&&(this.textMeasureEl_.removeNode(!0),this.textMeasureEl_=null);this.element_.innerHTML=""};d.beginPath=function(){this.currentPath_=[]};d.moveTo=function(a,b){var c=s(this,a,b);this.currentPath_.push({type:"moveTo",x:c.x,y:c.y});this.currentX_=c.x;this.currentY_=c.y};d.lineTo=function(a,b){var c=s(this,a,b);this.currentPath_.push({type:"lineTo",x:c.x,y:c.y});this.currentX_=c.x;this.currentY_=c.y};d.bezierCurveTo=
function(a,b,c,g,e,f){e=s(this,e,f);a=s(this,a,b);c=s(this,c,g);R(this,a,c,e)};d.quadraticCurveTo=function(a,b,c,g){a=s(this,a,b);c=s(this,c,g);g={x:this.currentX_+2/3*(a.x-this.currentX_),y:this.currentY_+2/3*(a.y-this.currentY_)};R(this,g,{x:g.x+(c.x-this.currentX_)/3,y:g.y+(c.y-this.currentY_)/3},c)};d.arc=function(a,b,c,g,e,f){c*=q;var d=f?"at":"wa",k=a+K(g)*c-r,n=b+J(g)*c-r;g=a+K(e)*c-r;e=b+J(e)*c-r;k!=g||f||(k+=0.125);a=s(this,a,b);k=s(this,k,n);g=s(this,g,e);this.currentPath_.push({type:d,
x:a.x,y:a.y,radius:c,xStart:k.x,yStart:k.y,xEnd:g.x,yEnd:g.y})};d.rect=function(a,b,c,g){this.moveTo(a,b);this.lineTo(a+c,b);this.lineTo(a+c,b+g);this.lineTo(a,b+g);this.closePath()};d.strokeRect=function(a,b,c,g){var e=this.currentPath_;this.beginPath();this.moveTo(a,b);this.lineTo(a+c,b);this.lineTo(a+c,b+g);this.lineTo(a,b+g);this.closePath();this.stroke();this.currentPath_=e};d.fillRect=function(a,b,c,g){var e=this.currentPath_;this.beginPath();this.moveTo(a,b);this.lineTo(a+c,b);this.lineTo(a+
c,b+g);this.lineTo(a,b+g);this.closePath();this.fill();this.currentPath_=e};d.createLinearGradient=function(a,b,c,g){var e=new w("gradient");e.x0_=a;e.y0_=b;e.x1_=c;e.y1_=g;return e};d.createRadialGradient=function(a,b,c,g,e,f){var d=new w("gradientradial");d.x0_=a;d.y0_=b;d.r0_=c;d.x1_=g;d.y1_=e;d.r1_=f;return d};d.drawImage=function(a,b){var c,g,e,d,r,y,n,h;e=a.runtimeStyle.width;d=a.runtimeStyle.height;a.runtimeStyle.width="auto";a.runtimeStyle.height="auto";var l=a.width,u=a.height;a.runtimeStyle.width=
e;a.runtimeStyle.height=d;if(3==arguments.length)c=arguments[1],g=arguments[2],r=y=0,n=e=l,h=d=u;else if(5==arguments.length)c=arguments[1],g=arguments[2],e=arguments[3],d=arguments[4],r=y=0,n=l,h=u;else if(9==arguments.length)r=arguments[1],y=arguments[2],n=arguments[3],h=arguments[4],c=arguments[5],g=arguments[6],e=arguments[7],d=arguments[8];else throw Error("Invalid number of arguments");var m=s(this,c,g),p=[];p.push(" <g_vml_:group",' coordsize="',10*q,",",10*q,'"',' coordorigin="0,0"',' style="width:',
10,"px;height:",10,"px;position:absolute;");if(1!=this.m_[0][0]||this.m_[0][1]||1!=this.m_[1][1]||this.m_[1][0]){var t=[];t.push("M11=",this.m_[0][0],",","M12=",this.m_[1][0],",","M21=",this.m_[0][1],",","M22=",this.m_[1][1],",","Dx=",k(m.x/q),",","Dy=",k(m.y/q),"");var v=s(this,c+e,g),w=s(this,c,g+d);c=s(this,c+e,g+d);m.x=x.max(m.x,v.x,w.x,c.x);m.y=x.max(m.y,v.y,w.y,c.y);p.push("padding:0 ",k(m.x/q),"px ",k(m.y/q),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",t.join(""),", sizingmethod='clip');")}else p.push("top:",
k(m.y/q),"px;left:",k(m.x/q),"px;");p.push(' ">','<g_vml_:image src="',a.src,'"',' style="width:',q*e,"px;"," height:",q*d,'px"',' cropleft="',r/l,'"',' croptop="',y/u,'"',' cropright="',(l-r-n)/l,'"',' cropbottom="',(u-y-h)/u,'"'," />","</g_vml_:group>");this.element_.insertAdjacentHTML("BeforeEnd",p.join(""))};d.stroke=function(a){var b=[];b.push("<g_vml_:shape",' filled="',!!a,'"',' style="position:absolute;width:',10,"px;height:",10,'px;"',' coordorigin="0,0"',' coordsize="',10*q,",",10*q,'"',
' stroked="',!a,'"',' path="');for(var c={x:null,y:null},d={x:null,y:null},e=0;e<this.currentPath_.length;e++){var f=this.currentPath_[e];switch(f.type){case "moveTo":b.push(" m ",k(f.x),",",k(f.y));break;case "lineTo":b.push(" l ",k(f.x),",",k(f.y));break;case "close":b.push(" x ");f=null;break;case "bezierCurveTo":b.push(" c ",k(f.cp1x),",",k(f.cp1y),",",k(f.cp2x),",",k(f.cp2y),",",k(f.x),",",k(f.y));break;case "at":case "wa":b.push(" ",f.type," ",k(f.x-this.arcScaleX_*f.radius),",",k(f.y-this.arcScaleY_*
f.radius)," ",k(f.x+this.arcScaleX_*f.radius),",",k(f.y+this.arcScaleY_*f.radius)," ",k(f.xStart),",",k(f.yStart)," ",k(f.xEnd),",",k(f.yEnd))}if(f){if(null==c.x||f.x<c.x)c.x=f.x;if(null==d.x||f.x>d.x)d.x=f.x;if(null==c.y||f.y<c.y)c.y=f.y;if(null==d.y||f.y>d.y)d.y=f.y}}b.push(' ">');a?T(this,b,c,d):S(this,b);b.push("</g_vml_:shape>");this.element_.insertAdjacentHTML("beforeEnd",b.join(""))};d.fill=function(){this.stroke(!0)};d.closePath=function(){this.currentPath_.push({type:"close"})};d.save=function(){var a=
{};P(this,a);this.aStack_.push(a);this.mStack_.push(this.m_);this.m_=t(D(),this.m_)};d.restore=function(){this.aStack_.length&&(P(this.aStack_.pop(),this),this.m_=this.mStack_.pop())};d.translate=function(a,b){z(this,t([[1,0,0],[0,1,0],[a,b,1]],this.m_),!1)};d.rotate=function(a){var b=K(a);a=J(a);z(this,t([[b,a,0],[-a,b,0],[0,0,1]],this.m_),!1)};d.scale=function(a,b){this.arcScaleX_*=a;this.arcScaleY_*=b;z(this,t([[a,0,0],[0,b,0],[0,0,1]],this.m_),!0)};d.transform=function(a,b,c,d,e,f){z(this,t([[a,
b,0],[c,d,0],[e,f,1]],this.m_),!0)};d.setTransform=function(a,b,c,d,e,f){z(this,[[a,b,0],[c,d,0],[e,f,1]],!0)};d.drawText_=function(a,b,c,d,e){var f=this.m_;d=0;var r=1E3,t=0,n=[],h;h=this.font;if(L[h])h=L[h];else{var l=document.createElement("div").style;try{l.font=h}catch(u){}h=L[h]={style:l.fontStyle||"normal",variant:l.fontVariant||"normal",weight:l.fontWeight||"normal",size:l.fontSize||10,family:l.fontFamily||"sans-serif"}}var l=h,m=this.element_;h={};for(var p in l)h[p]=l[p];p=parseFloat(m.currentStyle.fontSize);
m=parseFloat(l.size);"number"==typeof l.size?h.size=l.size:-1!=l.size.indexOf("px")?h.size=m:-1!=l.size.indexOf("em")?h.size=p*m:-1!=l.size.indexOf("%")?h.size=p/100*m:-1!=l.size.indexOf("pt")?h.size=m/0.75:h.size=p;h.size*=0.981;p=h.style+" "+h.variant+" "+h.weight+" "+h.size+"px "+h.family;m=this.element_.currentStyle;l=this.textAlign.toLowerCase();switch(l){case "left":case "center":case "right":break;case "end":l="ltr"==m.direction?"right":"left";break;case "start":l="rtl"==m.direction?"right":
"left";break;default:l="left"}switch(this.textBaseline){case "hanging":case "top":t=h.size/1.75;break;case "middle":break;default:case null:case "alphabetic":case "ideographic":case "bottom":t=-h.size/2.25}switch(l){case "right":d=1E3;r=0.05;break;case "center":d=r=500}b=s(this,b+0,c+t);n.push('<g_vml_:line from="',-d,' 0" to="',r,' 0.05" ',' coordsize="100 100" coordorigin="0 0"',' filled="',!e,'" stroked="',!!e,'" style="position:absolute;width:1px;height:1px;">');e?S(this,n):T(this,n,{x:-d,y:0},
{x:r,y:h.size});e=f[0][0].toFixed(3)+","+f[1][0].toFixed(3)+","+f[0][1].toFixed(3)+","+f[1][1].toFixed(3)+",0,0";b=k(b.x/q)+","+k(b.y/q);n.push('<g_vml_:skew on="t" matrix="',e,'" ',' offset="',b,'" origin="',d,' 0" />','<g_vml_:path textpathok="true" />','<g_vml_:textpath on="true" string="',N(a),'" style="v-text-align:',l,";font:",N(p),'" /></g_vml_:line>');this.element_.insertAdjacentHTML("beforeEnd",n.join(""))};d.fillText=function(a,b,c,d){this.drawText_(a,b,c,d,!1)};d.strokeText=function(a,
b,c,d){this.drawText_(a,b,c,d,!0)};d.measureText=function(a){this.textMeasureEl_||(this.element_.insertAdjacentHTML("beforeEnd",'<span style="position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;"></span>'),this.textMeasureEl_=this.element_.lastChild);var b=this.element_.ownerDocument;this.textMeasureEl_.innerHTML="";this.textMeasureEl_.style.font=this.font;this.textMeasureEl_.appendChild(b.createTextNode(a));return{width:this.textMeasureEl_.offsetWidth}};d.clip=function(){};
d.arcTo=function(){};d.createPattern=function(a,b){return new I(a,b)};w.prototype.addColorStop=function(a,b){b=G(b);this.colors_.push({offset:a,color:b.color,alpha:b.alpha})};d=A.prototype=Error();d.INDEX_SIZE_ERR=1;d.DOMSTRING_SIZE_ERR=2;d.HIERARCHY_REQUEST_ERR=3;d.WRONG_DOCUMENT_ERR=4;d.INVALID_CHARACTER_ERR=5;d.NO_DATA_ALLOWED_ERR=6;d.NO_MODIFICATION_ALLOWED_ERR=7;d.NOT_FOUND_ERR=8;d.NOT_SUPPORTED_ERR=9;d.INUSE_ATTRIBUTE_ERR=10;d.INVALID_STATE_ERR=11;d.SYNTAX_ERR=12;d.INVALID_MODIFICATION_ERR=
13;d.NAMESPACE_ERR=14;d.INVALID_ACCESS_ERR=15;d.VALIDATION_ERR=16;d.TYPE_MISMATCH_ERR=17;G_vmlCanvasManager=U;CanvasRenderingContext2D=C;CanvasGradient=w;CanvasPattern=I;DOMException=A}();
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//






;
