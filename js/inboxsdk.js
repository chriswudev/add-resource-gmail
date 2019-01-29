/*!
 * InboxSDK
 * https://www.inboxsdk.com/
 *
 * The use of InboxSDK is governed by the Terms of Services located at
 * https://www.inboxsdk.com/terms


 *  __    __            _     _          _                _                      ___                 _ _ ___
 * / / /\ \ \__ _ _ __ | |_  | |_ ___   | |__   __ _  ___| | __   ___  _ __     / _ \_ __ ___   __ _(_) / _ \
 * \ \/  \/ / _` | '_ \| __| | __/ _ \  | '_ \ / _` |/ __| |/ /  / _ \| '_ \   / /_\/ '_ ` _ \ / _` | | \// /
 *  \  /\  / (_| | | | | |_  | || (_) | | | | | (_| | (__|   <  | (_) | | | | / /_\\| | | | | | (_| | | | \/
 *   \/  \/ \__,_|_| |_|\__|  \__\___/  |_| |_|\__,_|\___|_|\_\  \___/|_| |_| \____/|_| |_| |_|\__,_|_|_| ()
 *
 * Like complex reverse engineering? Want to make Gmail and Inbox a hackable platform?
 *
 * Join us at: www.streak.com/careers?source=sdk
 */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":3}],2:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],3:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/$.core').Object.assign;
},{"../../modules/$.core":6,"../../modules/es6.object.assign":16}],4:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],5:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],6:[function(require,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],7:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":4}],8:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],9:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , ctx       = require('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":6,"./$.ctx":7,"./$.global":11}],10:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],11:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],12:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":5}],13:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],14:[function(require,module,exports){
// 19.1.2.1 Object.assign(target, source, ...)
var $        = require('./$')
  , toObject = require('./$.to-object')
  , IObject  = require('./$.iobject');

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = require('./$.fails')(function(){
  var a = Object.assign
    , A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , $$    = arguments
    , $$len = $$.length
    , index = 1
    , getKeys    = $.getKeys
    , getSymbols = $.getSymbols
    , isEnum     = $.isEnum;
  while($$len > index){
    var S      = IObject($$[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  }
  return T;
} : Object.assign;
},{"./$":13,"./$.fails":10,"./$.iobject":12,"./$.to-object":15}],15:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":8}],16:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./$.export');

$export($export.S + $export.F, 'Object', {assign: require('./$.object-assign')});
},{"./$.export":9,"./$.object-assign":14}],17:[function(require,module,exports){
var isArray = require('../lang/isArray');

/**
 * The inverse of `_.pairs`; this method returns an object composed from arrays
 * of property names and values. Provide either a single two dimensional array,
 * e.g. `[[key1, value1], [key2, value2]]` or two arrays, one of property names
 * and one of corresponding values.
 *
 * @static
 * @memberOf _
 * @alias object
 * @category Array
 * @param {Array} props The property names.
 * @param {Array} [values=[]] The property values.
 * @returns {Object} Returns the new object.
 * @example
 *
 * _.zipObject([['fred', 30], ['barney', 40]]);
 * // => { 'fred': 30, 'barney': 40 }
 *
 * _.zipObject(['fred', 'barney'], [30, 40]);
 * // => { 'fred': 30, 'barney': 40 }
 */
function zipObject(props, values) {
  var index = -1,
      length = props ? props.length : 0,
      result = {};

  if (length && !values && !isArray(props[0])) {
    values = [];
  }
  while (++index < length) {
    var key = props[index];
    if (values) {
      result[key] = values[index];
    } else if (key) {
      result[key[0]] = key[1];
    }
  }
  return result;
}

module.exports = zipObject;

},{"../lang/isArray":38}],18:[function(require,module,exports){
/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that invokes `func`, with the `this` binding and arguments
 * of the created function, while it's called less than `n` times. Subsequent
 * calls to the created function return the result of the last `func` invocation.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {number} n The number of calls at which `func` is no longer invoked.
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * jQuery('#add').on('click', _.before(5, addContactToList));
 * // => allows adding up to 4 contacts to the list
 */
function before(n, func) {
  var result;
  if (typeof func != 'function') {
    if (typeof n == 'function') {
      var temp = n;
      n = func;
      func = temp;
    } else {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
  }
  return function() {
    if (--n > 0) {
      result = func.apply(this, arguments);
    }
    if (n <= 1) {
      func = undefined;
    }
    return result;
  };
}

module.exports = before;

},{}],19:[function(require,module,exports){
var baseDelay = require('../internal/baseDelay'),
    restParam = require('./restParam');

/**
 * Defers invoking the `func` until the current call stack has cleared. Any
 * additional arguments are provided to `func` when it's invoked.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to defer.
 * @param {...*} [args] The arguments to invoke the function with.
 * @returns {number} Returns the timer id.
 * @example
 *
 * _.defer(function(text) {
 *   console.log(text);
 * }, 'deferred');
 * // logs 'deferred' after one or more milliseconds
 */
var defer = restParam(function(func, args) {
  return baseDelay(func, 1, args);
});

module.exports = defer;

},{"../internal/baseDelay":22,"./restParam":21}],20:[function(require,module,exports){
var before = require('./before');

/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls
 * to the function return the value of the first call. The `func` is invoked
 * with the `this` binding and arguments of the created function.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new restricted function.
 * @example
 *
 * var initialize = _.once(createApplication);
 * initialize();
 * initialize();
 * // `initialize` invokes `createApplication` once
 */
function once(func) {
  return before(2, func);
}

module.exports = once;

},{"./before":18}],21:[function(require,module,exports){
/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

},{}],22:[function(require,module,exports){
/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * The base implementation of `_.delay` and `_.defer` which accepts an index
 * of where to slice the arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to delay.
 * @param {number} wait The number of milliseconds to delay invocation.
 * @param {Object} args The arguments provide to `func`.
 * @returns {number} Returns the timer id.
 */
function baseDelay(func, wait, args) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return setTimeout(function() { func.apply(undefined, args); }, wait);
}

module.exports = baseDelay;

},{}],23:[function(require,module,exports){
var createBaseFor = require('./createBaseFor');

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"./createBaseFor":27}],24:[function(require,module,exports){
var baseFor = require('./baseFor'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"../object/keys":43,"./baseFor":23}],25:[function(require,module,exports){
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],26:[function(require,module,exports){
var identity = require('../utility/identity');

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (thisArg === undefined) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

module.exports = bindCallback;

},{"../utility/identity":45}],27:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * Creates a base function for `_.forIn` or `_.forInRight`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var iterable = toObject(object),
        props = keysFunc(object),
        length = props.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      var key = props[index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{"./toObject":36}],28:[function(require,module,exports){
var bindCallback = require('./bindCallback');

/**
 * Creates a function for `_.forOwn` or `_.forOwnRight`.
 *
 * @private
 * @param {Function} objectFunc The function to iterate over an object.
 * @returns {Function} Returns the new each function.
 */
function createForOwn(objectFunc) {
  return function(object, iteratee, thisArg) {
    if (typeof iteratee != 'function' || thisArg !== undefined) {
      iteratee = bindCallback(iteratee, thisArg, 3);
    }
    return objectFunc(object, iteratee);
  };
}

module.exports = createForOwn;

},{"./bindCallback":26}],29:[function(require,module,exports){
var baseProperty = require('./baseProperty');

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

module.exports = getLength;

},{"./baseProperty":25}],30:[function(require,module,exports){
var isNative = require('../lang/isNative');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

module.exports = getNative;

},{"../lang/isNative":40}],31:[function(require,module,exports){
var getLength = require('./getLength'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

module.exports = isArrayLike;

},{"./getLength":29,"./isLength":33}],32:[function(require,module,exports){
/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],33:[function(require,module,exports){
/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],34:[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],35:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    keysIn = require('../object/keysIn');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;

},{"../lang/isArguments":37,"../lang/isArray":38,"../object/keysIn":44,"./isIndex":32,"./isLength":33}],36:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Converts `value` to an object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

module.exports = toObject;

},{"../lang/isObject":41}],37:[function(require,module,exports){
var isArrayLike = require('../internal/isArrayLike'),
    isObjectLike = require('../internal/isObjectLike');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) &&
    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
}

module.exports = isArguments;

},{"../internal/isArrayLike":31,"../internal/isObjectLike":34}],38:[function(require,module,exports){
var getNative = require('../internal/getNative'),
    isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

module.exports = isArray;

},{"../internal/getNative":30,"../internal/isLength":33,"../internal/isObjectLike":34}],39:[function(require,module,exports){
var isObject = require('./isObject');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 which returns 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

module.exports = isFunction;

},{"./isObject":41}],40:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isObjectLike = require('../internal/isObjectLike');

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isNative;

},{"../internal/isObjectLike":34,"./isFunction":39}],41:[function(require,module,exports){
/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],42:[function(require,module,exports){
var baseForOwn = require('../internal/baseForOwn'),
    createForOwn = require('../internal/createForOwn');

/**
 * Iterates over own enumerable properties of an object invoking `iteratee`
 * for each property. The `iteratee` is bound to `thisArg` and invoked with
 * three arguments: (value, key, object). Iteratee functions may exit iteration
 * early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.forOwn(new Foo, function(value, key) {
 *   console.log(key);
 * });
 * // => logs 'a' and 'b' (iteration order is not guaranteed)
 */
var forOwn = createForOwn(baseForOwn);

module.exports = forOwn;

},{"../internal/baseForOwn":24,"../internal/createForOwn":28}],43:[function(require,module,exports){
var getNative = require('../internal/getNative'),
    isArrayLike = require('../internal/isArrayLike'),
    isObject = require('../lang/isObject'),
    shimKeys = require('../internal/shimKeys');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

module.exports = keys;

},{"../internal/getNative":30,"../internal/isArrayLike":31,"../internal/shimKeys":35,"../lang/isObject":41}],44:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('../internal/isIndex'),
    isLength = require('../internal/isLength'),
    isObject = require('../lang/isObject');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"../internal/isIndex":32,"../internal/isLength":33,"../lang/isArguments":37,"../lang/isArray":38,"../lang/isObject":41}],45:[function(require,module,exports){
/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],46:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],47:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],48:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":46,"./encode":47}],49:[function(require,module,exports){
(function (global){
// We only target browsers that natively support Promises, so we replace
// Babel's Promise helper with a reference to the native promise.
"use strict";

module.exports = { "default": global.Promise };

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],50:[function(require,module,exports){

//jshint ignore:start

'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ajax;

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _delay = require('./delay');

var _delay2 = _interopRequireDefault(_delay);

var _cachebustUrl = require('./cachebust-url');

var _cachebustUrl2 = _interopRequireDefault(_cachebustUrl);

var forOwn = require('lodash/object/forOwn');

var MAX_TIMEOUT = 64 * 1000; //64 seconds
var MAX_RETRIES = 5;
var serversToIgnore = {};

// Simple ajax helper.
// opts:
// * url
// * [method]
// * [cachebust] - boolean
// * [headers] - object
// * [xhrFields] - object
// * [data]

function ajax(opts) {
  if (!opts || typeof opts.url !== 'string') {
    throw new Error('URL must be given');
  }
  return new _Promise(function (resolve, reject) {
    var method = opts.method ? opts.method : "GET";
    var url = opts.url;
    var stringData = undefined;
    if (opts.data) {
      stringData = typeof opts.data === "string" ? opts.data : _querystring2['default'].stringify(opts.data);
      if (method === "GET" || method === "HEAD") {
        url += (/\?/.test(url) ? "&" : "?") + stringData;
        stringData = null;
      }
    }

    var match = url.match(/(?:(?:[a-z]+:)?\/\/)?([^/]*)\//);
    if (!match) {
      throw new Error("Failed to match url");
    }
    var server = match[1];
    if (Object.prototype.hasOwnProperty.call(serversToIgnore, server)) {
      reject(new Error('Server at ' + url + ' has told us to stop connecting'));
      return;
    }

    if (opts.cachebust) {
      url = (0, _cachebustUrl2['default'])(url);
    }

    var xhr = new XMLHttpRequest();
    _Object$assign(xhr, opts.xhrFields);
    xhr.onerror = function (event) {
      if ((opts.retryNum || 0) < MAX_RETRIES) {
        if (xhr.status === 502 || (xhr.status === 0 || xhr.status >= 500) && (method === "GET" || method === "HEAD" || opts.canRetry === true)) {
          resolve(_retry(opts));
          return;
        }
      }

      var err = _Object$assign(new Error('Failed to load ' + url), {
        event: event, xhr: xhr, status: xhr.status
      });

      // give a way for a server to tell us to go away for now. Good fallback
      // in case a bug ever causes clients to spam a server with requests.
      if (xhr.status == 490) {
        serversToIgnore[server] = true;
      }
      reject(err);
    };
    xhr.onload = function (event) {
      if (xhr.status === 200) {
        resolve({
          xhr: xhr,
          text: xhr.responseText
        });
      } else {
        xhr.onerror(event);
      }
    };
    xhr.open(method, url, true);
    forOwn(opts.headers, function (value, name) {
      xhr.setRequestHeader(name, value);
    });
    xhr.send(stringData);
  });
}

function _retry(opts) {
  var retryNum = (opts.retryNum || 0) + 1;

  // 2000 4000 8000...
  var retryTimeout = Math.min(Math.pow(2, retryNum) * 1000, MAX_TIMEOUT);

  return (0, _delay2['default'])(retryTimeout).then(function () {
    return ajax(_Object$assign({}, opts, { retryNum: retryNum }));
  });
}
module.exports = exports['default'];

},{"./cachebust-url":51,"./delay":53,"babel-runtime/core-js/object/assign":1,"babel-runtime/core-js/promise":49,"babel-runtime/helpers/interop-require-default":2,"lodash/object/forOwn":42,"querystring":48}],51:[function(require,module,exports){

//jshint ignore:start

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = cachebustUrl;
var r = /([?&])_=[^&]*/;
var nonce = Date.now() + Math.floor(Math.random() * Math.pow(2, 32));

function cachebustUrl(url) {
  if (r.test(url)) {
    return url.replace(r, "$1_=" + nonce++);
  } else {
    return url + (/\?/.test(url) ? "&" : "?") + "_=" + nonce++;
  }
}

module.exports = exports["default"];

},{}],52:[function(require,module,exports){

//jshint ignore:start

'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = connectivityTest;

var _cachebustUrl = require('./cachebust-url');

var _cachebustUrl2 = _interopRequireDefault(_cachebustUrl);

var _lodashArrayZipObject = require('lodash/array/zipObject');

var _lodashArrayZipObject2 = _interopRequireDefault(_lodashArrayZipObject);

var URLS = ['https://mailfoogae.appspot.com/build/images/composeOverflowToggle.png', 'https://www.streak.com/build/images/composeOverflowToggle.png', 'https://www.inboxsdk.com/images/logo-red.png'];

function imageTest(url) {
  return new _Promise(function (resolve, reject) {
    var img = document.createElement('img');
    img.onload = function () {
      resolve(true);
    };
    img.onloadend = img.onerror = function () {
      resolve(false);
    };
    img.src = (0, _cachebustUrl2['default'])(url);
  });
}

function connectivityTest() {
  return _Promise.all(URLS.map(function (url) {
    return imageTest(url).then(function (success) {
      return [url, success];
    });
  })).then(function (results) {
    return (0, _lodashArrayZipObject2['default'])(results);
  });
}

module.exports = exports['default'];

},{"./cachebust-url":51,"babel-runtime/core-js/promise":49,"babel-runtime/helpers/interop-require-default":2,"lodash/array/zipObject":17}],53:[function(require,module,exports){

//jshint ignore:start

"use strict";

var _Promise = require("babel-runtime/core-js/promise")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = delay;

function delay(time, value) {
  return new _Promise(function (resolve, reject) {
    setTimeout(function () {
      return resolve(value);
    }, time);
  });
}

module.exports = exports["default"];

},{"babel-runtime/core-js/promise":49}],54:[function(require,module,exports){
(function (global){

//jshint ignore:start

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getExtensionId;

function getExtensionId() {
  if (global.chrome && global.chrome.extension && global.chrome.extension.getURL) {
    return global.chrome.extension.getURL('');
  }
  return null;
}

module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],55:[function(require,module,exports){
(function (global){

//jshint ignore:start

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getSessionId;

function getSessionId() {
  if (global.document && document.documentElement.hasAttribute('data-inboxsdk-session-id')) {
    return document.documentElement.getAttribute('data-inboxsdk-session-id');
  } else {
    var sessionId = Date.now() + '-' + Math.random();
    if (global.document) {
      document.documentElement.setAttribute('data-inboxsdk-session-id', sessionId);
    }
    return sessionId;
  }
}

module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],56:[function(require,module,exports){

//jshint ignore:start

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getStackTrace;

function getStackTrace() {
  var err = new Error("Stack saver");
  // Cut the first two lines off. The first line has the error name, and the
  // second line is inside this function.
  return ("" + err.stack).replace(/^([^\n]*\n){2}/, '');
}

module.exports = exports["default"];

},{}],57:[function(require,module,exports){
(function (global){

//jshint ignore:start

'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = loadScript;

var _connectivityTest = require('./connectivity-test');

var _connectivityTest2 = _interopRequireDefault(_connectivityTest);

var _logError = require('./log-error');

var _logError2 = _interopRequireDefault(_logError);

var _ajax = require('./ajax');

var _ajax2 = _interopRequireDefault(_ajax);

var _delay = require('./delay');

var _delay2 = _interopRequireDefault(_delay);

var once = require('lodash/function/once');
var defer = require('lodash/function/defer');

var isContentScript = once(function () {
  if (global.chrome && global.chrome.extension) return true;
  if (global.safari && global.safari.extension) return true;
  return false;
});

function addScriptToPage(url, cors) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  if (cors) {
    script.crossOrigin = 'anonymous';
  }

  var promise = new _Promise(function (resolve, reject) {
    script.addEventListener('error', function (event) {
      reject(event.error || new Error(event.message || "Load failure: " + url, event.filename, event.lineno, event.column));
    }, false);
    script.addEventListener('load', function () {
      // Make sure the script has a moment to execute before this promise
      // resolves.
      defer(resolve);
    }, false);
  });

  script.src = url;
  document.head.appendChild(script);
  return promise;
}

function loadScript(url, opts) {
  var pr = undefined;
  if (isContentScript()) {
    (function () {
      var attempt = function attempt(retryNum, lastErr) {
        if (retryNum > 3) {
          throw lastErr || new Error("Ran out of loadScript attempts for unknown reason");
        }

        return (0, _ajax2['default'])({
          url: url, cachebust: retryNum > 0
        }).then(function (response) {
          // jshint evil:true

          // Q: Why put the code into a function before executing it instead of
          //    evaling it immediately?
          // A: Chrome would execute it before applying any remembered
          //    breakpoints.
          // Q: Why not just use `... = new Function(...)`?
          // A: The sourcemaps would be off by one line in Chrome because of
          //    https://code.google.com/p/chromium/issues/detail?id=109362
          // Q: indirectEval?
          // A: Using the eval value rather than the eval keyword causes the
          //    code passed to it to be run in the global scope instead of the
          //    current scope. (Seriously, it's a javascript thing.)
          var originalCode = response.text;
          var indirectEval = eval;

          var codeParts = [];
          if (opts && opts.disableSourceMappingURL) {
            // Don't remove a data: URI sourcemap (used in dev)
            codeParts.push(originalCode.replace(/\/\/# sourceMappingURL=(?!data:)[^\n]*\n?$/, ''));
          } else {
            codeParts.push(originalCode);
          }

          if (!opts || !opts.nowrap) {
            codeParts.unshift("(function(){");
            codeParts.push("\n});");
          }

          codeParts.push("\n//# sourceURL=" + url + "\n");

          var codeToRun = codeParts.join('');
          var program = undefined;
          try {
            program = indirectEval(codeToRun);
          } catch (err) {
            if (err && err.name === 'SyntaxError') {
              (0, _logError2['default'])(err, {
                retryNum: retryNum,
                caughtSyntaxError: true,
                url: url,
                message: 'SyntaxError in loading ' + url + '. Did we not load it fully? Trying again...'
              }, {});
              return (0, _delay2['default'])(5000).then(function () {
                return attempt(retryNum + 1, err);
              });
            }
            // SyntaxErrors are the only errors that can happen during eval that we
            // retry because sometimes AppEngine doesn't serve the full javascript.
            // No other error is retried because other errors aren't likely to be
            // transient.
            throw err;
          }
          if (!opts || !opts.nowrap) {
            program();
          }
        });
      };

      pr = attempt(0, null);
    })();
  } else {
    // Try to add script as CORS first so we can get error stack data from it.
    pr = addScriptToPage(url, true)['catch'](function () {
      // Only show the warning if we successfully load the script on retry.
      return addScriptToPage(url, false).then(function () {
        console.warn("Script " + url + " included without CORS headers. Error logs might be censored by the browser.");
      });
    });
  }
  pr['catch'](function (err) {
    return (0, _connectivityTest2['default'])().then(function (connectivityTestResults) {
      (0, _logError2['default'])(err, {
        url: url,
        connectivityTestResults: connectivityTestResults,
        status: err && err.status,
        response: err && err.xhr ? err.xhr.responseText : null,
        message: 'Failed to load script'
      }, {});
    });
  });
  return pr;
}

module.exports = exports['default'];

// By default, the script is executed within a function, so that top-level
// variables defined in it don't become global variables. Setting nowrap to
// true disables this behavior.

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./ajax":50,"./connectivity-test":52,"./delay":53,"./log-error":58,"babel-runtime/core-js/promise":49,"babel-runtime/helpers/interop-require-default":2,"lodash/function/defer":19,"lodash/function/once":20}],58:[function(require,module,exports){
(function (global){

//jshint ignore:start

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = logError;

var _ajax = require('./ajax');

var _ajax2 = _interopRequireDefault(_ajax);

var _rateLimit = require('./rate-limit');

var _rateLimit2 = _interopRequireDefault(_rateLimit);

var _getStackTrace = require('./get-stack-trace');

var _getStackTrace2 = _interopRequireDefault(_getStackTrace);

var _getExtensionId = require('./get-extension-id');

var _getExtensionId2 = _interopRequireDefault(_getExtensionId);

var _getSessionId = require('./get-session-id');

var _getSessionId2 = _interopRequireDefault(_getSessionId);

var _version = require('./version');

var sessionId = (0, _getSessionId2['default'])();

// code inside the platform-implementation should use logger.js instead of
// interacting with this directly!

function logError(err, details, context) {
  if (!global.document) {
    // In tests, just throw the error.
    throw err;
  }

  var args = arguments;

  // It's important that we can't throw an error or leave a rejected promise
  // unheard while logging an error in order to make sure to avoid ever
  // getting into an infinite loop of reporting uncaught errors.
  try {
    if (haveWeSeenThisErrorAlready(err)) {
      return;
    } else {
      markErrorAsSeen(err);
    }

    if (!(err instanceof Error)) {
      console.warn('First parameter to Logger.error was not an error object:', err);
      err = new Error("Logger.error called with non-error: " + err);
      markErrorAsSeen(err);
    }
    var appId = context.appId;
    var appIds = context.appIds;
    var implVersion = context.implVersion;
    var userEmailHash = context.userEmailHash;

    var _loaderVersion = context.loaderVersion || _version.BUILD_VERSION;
    var _sentByApp = !!context.sentByApp;

    // Might not have been passed a useful error object with a stack, so get
    // our own current stack just in case.
    var nowStack = (0, _getStackTrace2['default'])();

    var stuffToLog = ["Error logged:", err];
    if (err && err.stack) {
      stuffToLog = stuffToLog.concat(["\n\nOriginal error stack:\n" + err.stack]);
    }
    stuffToLog = stuffToLog.concat(["\n\nError logged from:\n" + nowStack]);
    if (details) {
      stuffToLog = stuffToLog.concat(["\n\nError details:", details]);
    }
    stuffToLog = stuffToLog.concat(["\n\nExtension App Ids:", JSON.stringify(appIds, null, 2)]);
    stuffToLog = stuffToLog.concat(["\nSent by App:", _sentByApp]);
    stuffToLog = stuffToLog.concat(["\nSession Id:", sessionId]);
    stuffToLog = stuffToLog.concat(["\nExtension Id:", (0, _getExtensionId2['default'])()]);
    stuffToLog = stuffToLog.concat(["\nInboxSDK Loader Version:", _loaderVersion]);
    stuffToLog = stuffToLog.concat(["\nInboxSDK Implementation Version:", implVersion]);

    console.error.apply(console, stuffToLog);

    var report = {
      message: err && err.message || err,
      stack: err && err.stack,
      loggedFrom: nowStack,
      details: details,
      appIds: appIds,
      sentByApp: _sentByApp,
      sessionId: sessionId,
      emailHash: userEmailHash,
      extensionId: (0, _getExtensionId2['default'])(),
      loaderVersion: _loaderVersion,
      implementationVersion: implVersion,
      origin: document.location.origin,
      timestamp: Date.now() * 1000
    };

    sendError(report);
  } catch (err2) {
    tooManyErrors(err2, args);
  }
}

var _extensionSeenErrors = (function () {
  // Safari <9 doesn't have WeakSet and we don't want to pull in the polyfill,
  // so we make one out of a WeakMap.
  if (!global.__inboxsdk_extensionSeenErrors && global.WeakMap) {
    Object.defineProperty(global, '__inboxsdk_extensionSeenErrors', {
      value: new global.WeakMap()
    });
  }
  return {
    has: function has(e) {
      if (global.__inboxsdk_extensionSeenErrors) {
        return global.__inboxsdk_extensionSeenErrors.has(e);
      } else {
        try {
          return !!e.__inboxsdk_extensionHasSeenError;
        } catch (err) {
          console.error(err);
          return false;
        }
      }
    },
    add: function add(e) {
      if (global.__inboxsdk_extensionSeenErrors) {
        global.__inboxsdk_extensionSeenErrors.set(e, true);
      } else {
        try {
          Object.defineProperty(e, '__inboxsdk_extensionHasSeenError', {
            value: true
          });
        } catch (err) {
          console.error(err);
        }
      }
    }
  };
})();

function haveWeSeenThisErrorAlready(error) {
  if (error && typeof error == 'object') {
    return _extensionSeenErrors.has(error);
  }
  return false;
}

function markErrorAsSeen(error) {
  if (error && typeof error == 'object') {
    _extensionSeenErrors.add(error);
  }
}

// Only let 10 errors be sent per minute.
var sendError = (0, _rateLimit2['default'])(function (report) {
  var args = arguments;

  try {
    (0, _ajax2['default'])({
      url: 'https://www.inboxsdk.com/api/v2/errors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(report)
    })['catch'](function (err2) {
      tooManyErrors(err2, args);
    });
  } catch (err2) {
    tooManyErrors(err2, args);
  }
}, 60 * 1000, 10);

function tooManyErrors(err2, originalArgs) {
  console.error("ERROR REPORTING ERROR", err2);
  console.error("ORIGINAL ERROR", originalArgs);
}
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./ajax":50,"./get-extension-id":54,"./get-session-id":55,"./get-stack-trace":56,"./rate-limit":59,"./version":60,"babel-runtime/helpers/interop-require-default":2}],59:[function(require,module,exports){

//jshint ignore:start

// Returns a wrapped version of the function which throws an exception if it's
// called more than count times within period amount of time.
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rateLimit;

function rateLimit(fn, period, count) {
  var calls = [];
  return function () {
    var now = Date.now();
    calls = calls.filter(function (time) {
      return time > now - period;
    });
    if (calls.length >= count) {
      throw new Error("Function rate limit exceeded");
    }
    calls.push(now);
    return fn.apply(this, arguments);
  };
}

module.exports = exports["default"];

},{}],60:[function(require,module,exports){

//jshint ignore:start

// This is in its own file so that updates to the version value don't cause a
// reload of everything.

"use strict";

exports.BUILD_VERSION = "0.7.19-1464818934368-6413805fb397bd49";

if (module.hot) {
  module.hot.accept();
}

},{}],61:[function(require,module,exports){
(function (global){
"use strict";

function checkRequirements(opts) {
  if (!opts.TEMPORARY_INTERNAL_skipWeakMapRequirement && !global.WeakMap) {
    throw new Error("Browser does not support WeakMap");
  }
}

module.exports = checkRequirements;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],62:[function(require,module,exports){
'use strict';

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _commonLogError = require('../common/log-error');

var _commonLogError2 = _interopRequireDefault(_commonLogError);

var _loadingPlatformImplementationLoader = require('./loading/platform-implementation-loader');

var _loadingPlatformImplementationLoader2 = _interopRequireDefault(_loadingPlatformImplementationLoader);

var _checkRequirements = require('./check-requirements');

var _checkRequirements2 = _interopRequireDefault(_checkRequirements);

var _commonVersion = require('../common/version');

var _commonLoadScript = require('../common/load-script');

var _commonLoadScript2 = _interopRequireDefault(_commonLoadScript);

var InboxSDK = {
  LOADER_VERSION: _commonVersion.BUILD_VERSION,
  loadScript: _commonLoadScript2['default'],
  load: function load(version, appId, opts) {
    opts = _Object$assign({
      // defaults
      globalErrorLogging: true
    }, opts, {
      // stuff that can't be overridden, such as extra stuff this file passes to
      // the implementation script.
      VERSION: InboxSDK.LOADER_VERSION,
      REQUESTED_API_VERSION: version
    });

    (0, _checkRequirements2['default'])(opts);

    return _loadingPlatformImplementationLoader2['default'].load(appId, opts);
  }
};

if (['https://mail.google.com', 'https://inbox.google.com'].indexOf(document.location.origin) != -1) {
  _loadingPlatformImplementationLoader2['default'].preload();
}

exports['default'] = InboxSDK;
module.exports = exports['default'];

},{"../common/load-script":57,"../common/log-error":58,"../common/version":60,"./check-requirements":61,"./loading/platform-implementation-loader":63,"babel-runtime/core-js/object/assign":1,"babel-runtime/helpers/interop-require-default":2}],63:[function(require,module,exports){
(function (global){

//jshint ignore:start

'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _commonLoadScript = require('../../common/load-script');

var _commonLoadScript2 = _interopRequireDefault(_commonLoadScript);

var once = require('lodash/function/once');

var PlatformImplementationLoader = {
  load: function load(appId, opts) {
    return _Promise.resolve().then(function () {
      if (!global.__InboxSDKImpLoader) {
        return PlatformImplementationLoader._loadScript().then(function () {
          if (!global.__InboxSDKImpLoader) {
            throw new Error("Implementation file did not load correctly");
          }
        });
      }
    }).then(function () {
      return global.__InboxSDKImpLoader.load("0.1", appId, opts);
    });
  },

  _loadScript: once(function () {
    var disableSourceMappingURL = true;
    if (window.localStorage) {
      try {
        disableSourceMappingURL = localStorage.getItem('inboxsdk__enable_sourcemap') !== 'true';
      } catch (err) {
        console.error(err);
      }
    }

    return (0, _commonLoadScript2['default'])("https://www.inboxsdk.com/build/platform-implementation.js", {
      nowrap: true, // platform-implementation has no top-level vars so no need for function wrapping
      disableSourceMappingURL: disableSourceMappingURL
    });
  }),

  preload: function preload() {
    // Prime the load by calling it and letting the promise be memoized.
    this._loadScript();
  }
};

exports['default'] = PlatformImplementationLoader;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../common/load-script":57,"babel-runtime/core-js/promise":49,"babel-runtime/helpers/interop-require-default":2,"lodash/function/once":20}],64:[function(require,module,exports){
"use strict";

var oldDefine;
try {
  if (typeof define !== "undefined" && define && define.amd) {
    // work around amd compatibility issue
    // https://groups.google.com/forum/#!msg/inboxsdk/U_bq82Exmwc/I3iIinxxCAAJ
    oldDefine = define;
    define = null;
  }
  // exposes main as a global for browsers
  window.InboxSDK = require('./inboxsdk');
} finally {
  if (oldDefine) {
    define = oldDefine;
  }
}

},{"./inboxsdk":62}]},{},[64])

