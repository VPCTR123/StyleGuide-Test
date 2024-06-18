// node_modules/vest-utils/dist/es/vest-utils.development.js
function bindNot(fn) {
  return (...args) => !fn(...args);
}
function isNumeric(value) {
  const str = String(value);
  const num = Number(value);
  const result = !isNaN(parseFloat(str)) && !isNaN(Number(value)) && isFinite(num);
  return Boolean(result);
}
var isNotNumeric = bindNot(isNumeric);
function numberEquals(value, eq) {
  return isNumeric(value) && isNumeric(eq) && Number(value) === Number(eq);
}
var numberNotEquals = bindNot(numberEquals);
function lengthEquals(value, arg1) {
  return numberEquals(value.length, arg1);
}
var lengthNotEquals = bindNot(lengthEquals);
function greaterThan(value, gt) {
  return isNumeric(value) && isNumeric(gt) && Number(value) > Number(gt);
}
function longerThan(value, arg1) {
  return greaterThan(value.length, arg1);
}
function createCache(maxSize = 1) {
  const cacheStorage = [];
  const cache = (deps, cacheAction) => {
    const cacheHit = cache.get(deps);
    if (cacheHit)
      return cacheHit[1];
    const result = cacheAction();
    cacheStorage.unshift([deps.concat(), result]);
    if (longerThan(cacheStorage, maxSize))
      cacheStorage.length = maxSize;
    return result;
  };
  cache.invalidate = (deps) => {
    const index = findIndex(deps);
    if (index > -1)
      cacheStorage.splice(index, 1);
  };
  cache.get = (deps) => cacheStorage[findIndex(deps)] || null;
  return cache;
  function findIndex(deps) {
    return cacheStorage.findIndex(([cachedDeps]) => lengthEquals(deps, cachedDeps.length) && deps.every((dep, i) => dep === cachedDeps[i]));
  }
}
function isNull(value) {
  return value === null;
}
var isNotNull = bindNot(isNull);
function isUndefined(value) {
  return value === void 0;
}
var isNotUndefined = bindNot(isUndefined);
function isNullish(value) {
  return isNull(value) || isUndefined(value);
}
var isNotNullish = bindNot(isNullish);
function asArray(possibleArg) {
  return [].concat(possibleArg);
}
function callEach(arr) {
  return arr.forEach((fn) => fn());
}
function hasOwnProperty(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function isFunction(value) {
  return typeof value === "function";
}
function isPromise(value) {
  return !!value && isFunction(value.then);
}
function optionalFunctionValue(value, ...args) {
  return isFunction(value) ? value(...args) : value;
}
var assign = Object.assign;
function defaultTo(value, defaultValue) {
  var _a;
  return (_a = optionalFunctionValue(value)) !== null && _a !== void 0 ? _a : optionalFunctionValue(defaultValue);
}
function invariant(condition2, message) {
  if (condition2) {
    return;
  }
  throw message instanceof String ? message.valueOf() : new Error(message ? optionalFunctionValue(message) : message);
}
function isStringValue(v) {
  return String(v) === v;
}
function either(a, b) {
  return !!a !== !!b;
}
function isBoolean(value) {
  return !!value === value;
}
function deferThrow(message) {
  setTimeout(() => {
    throw new Error(message);
  }, 0);
}
var EVENT_WILDCARD = "*";
function createBus() {
  const listeners = {};
  return {
    emit(event, data) {
      getListeners(event).concat(getListeners(EVENT_WILDCARD)).forEach((handler) => {
        handler(data);
      });
    },
    on(event, handler) {
      listeners[event] = getListeners(event).concat(handler);
      return {
        off() {
          listeners[event] = getListeners(event).filter((h) => h !== handler);
        }
      };
    }
  };
  function getListeners(event) {
    return listeners[event] || [];
  }
}
var bus = Object.freeze({
  __proto__: null,
  createBus
});
var seq = genSeq();
function genSeq(namespace) {
  return /* @__PURE__ */ ((n) => () => `${namespace ? namespace + "_" : ""}${n++}`)(0);
}
function mapFirst(array, callback) {
  let broke = false;
  let breakoutValue = null;
  for (let i = 0; i < array.length; i++) {
    callback(array[i], breakout, i);
    if (broke) {
      return breakoutValue;
    }
  }
  function breakout(conditional, value) {
    if (conditional) {
      broke = true;
      breakoutValue = value;
    }
  }
}
function isObject(v) {
  return typeof v === "object" && !isNullish(v);
}
function isArray(value) {
  return Boolean(Array.isArray(value));
}
var isNotArray = bindNot(isArray);
function isEmpty(value) {
  if (!value) {
    return true;
  } else if (hasOwnProperty(value, "length")) {
    return lengthEquals(value, 0);
  } else if (isObject(value)) {
    return lengthEquals(Object.keys(value), 0);
  }
  return false;
}
var isNotEmpty = bindNot(isEmpty);
function isPositive(value) {
  return greaterThan(value, 0);
}
var regexp = /{(.*?)}/g;
function text(str, ...substitutions) {
  const first = substitutions[0];
  if (isObject(first)) {
    return str.replace(regexp, (placeholder, key) => {
      var _a;
      return `${(_a = first[key]) !== null && _a !== void 0 ? _a : placeholder}`;
    });
  }
  const subs = [...substitutions];
  return str.replace(regexp, (placeholder) => {
    return `${isEmpty(subs) ? placeholder : subs.shift()}`;
  });
}
var STATE_WILD_CARD = "*";
function StateMachine(machine) {
  let state = machine.initial;
  const api = { getState, initial, staticTransition, transition };
  return api;
  function getState() {
    return state;
  }
  function initial() {
    return machine.initial;
  }
  function transition(action, payload) {
    return state = staticTransition(state, action, payload);
  }
  function staticTransition(from, action, payload) {
    var _a, _b, _c;
    const transitionTo = (_b = (_a = machine.states[from]) === null || _a === void 0 ? void 0 : _a[action]) !== null && _b !== void 0 ? _b : (
      // @ts-expect-error - This is a valid state
      (_c = machine.states[STATE_WILD_CARD]) === null || _c === void 0 ? void 0 : _c[action]
    );
    let target = transitionTo;
    if (Array.isArray(target)) {
      const [, conditional] = target;
      if (!conditional(payload)) {
        return from;
      }
      target = target[0];
    }
    if (!target || target === from) {
      return from;
    }
    return target;
  }
}
function createTinyState(initialValue) {
  let value;
  resetValue();
  return () => [value, setValue, resetValue];
  function setValue(nextValue) {
    value = optionalFunctionValue(nextValue, value);
  }
  function resetValue() {
    setValue(optionalFunctionValue(initialValue));
  }
}
var tinyState = Object.freeze({
  __proto__: null,
  createTinyState
});
function StringObject(value) {
  return new String(optionalFunctionValue(value));
}
function noop() {
}
function all(...p) {
  return (value) => isEmpty(p) ? false : p.every((predicate) => optionalFunctionValue(predicate, value));
}
function any(...p) {
  return (value) => isEmpty(p) ? false : p.some((predicate) => optionalFunctionValue(predicate, value));
}
var Predicates = Object.freeze({
  __proto__: null,
  all,
  any
});

// node_modules/context/dist/es/context.development.js
var USEX_DEFAULT_ERROR_MESSAGE = "Not inside of a running context.";
var EMPTY_CONTEXT = Symbol();
function createContext(defaultContextValue) {
  let contextValue = EMPTY_CONTEXT;
  return {
    run,
    use,
    useX
  };
  function use() {
    return isInsideContext() ? contextValue : defaultContextValue;
  }
  function useX(errorMessage) {
    invariant(isInsideContext(), defaultTo(errorMessage, USEX_DEFAULT_ERROR_MESSAGE));
    return contextValue;
  }
  function run(value, cb) {
    const parentContext = isInsideContext() ? use() : EMPTY_CONTEXT;
    contextValue = value;
    const res = cb();
    contextValue = parentContext;
    return res;
  }
  function isInsideContext() {
    return contextValue !== EMPTY_CONTEXT;
  }
}
function createCascade(init) {
  const ctx2 = createContext();
  return {
    bind,
    run,
    use: ctx2.use,
    useX: ctx2.useX
  };
  function run(value, fn) {
    var _a;
    const parentContext = ctx2.use();
    const out = assign({}, parentContext ? parentContext : {}, (_a = optionalFunctionValue(init, value, parentContext)) !== null && _a !== void 0 ? _a : value);
    return ctx2.run(Object.freeze(out), fn);
  }
  function bind(value, fn) {
    return function(...runTimeArgs) {
      return run(value, function() {
        return fn(...runTimeArgs);
      });
    };
  }
}

// node_modules/n4s/dist/es/n4s.development.js
var ctx = createCascade((ctxRef, parentContext) => {
  const base = {
    value: ctxRef.value,
    meta: ctxRef.meta || {}
  };
  if (!parentContext) {
    return assign(base, {
      parent: emptyParent
    });
  } else if (ctxRef.set) {
    return assign(base, {
      parent: () => stripContext(parentContext)
    });
  }
  return parentContext;
});
function stripContext(ctx2) {
  return {
    value: ctx2.value,
    meta: ctx2.meta,
    parent: ctx2.parent
  };
}
function emptyParent() {
  return null;
}
function endsWith(value, arg1) {
  return isStringValue(value) && isStringValue(arg1) && value.endsWith(arg1);
}
var doesNotEndWith = bindNot(endsWith);
function equals(value, arg1) {
  return value === arg1;
}
var notEquals = bindNot(equals);
function greaterThanOrEquals(value, gte) {
  return numberEquals(value, gte) || greaterThan(value, gte);
}
function inside(value, arg1) {
  if (isArray(arg1)) {
    return arg1.indexOf(value) !== -1;
  }
  if (isStringValue(arg1) && isStringValue(value)) {
    return arg1.indexOf(value) !== -1;
  }
  return false;
}
var notInside = bindNot(inside);
function lessThan(value, lt) {
  return isNumeric(value) && isNumeric(lt) && Number(value) < Number(lt);
}
function lessThanOrEquals(value, lte) {
  return numberEquals(value, lte) || lessThan(value, lte);
}
function isBetween(value, min, max) {
  return greaterThanOrEquals(value, min) && lessThanOrEquals(value, max);
}
var isNotBetween = bindNot(isBetween);
function isBlank(value) {
  return isNullish(value) || isStringValue(value) && !value.trim();
}
var isNotBlank = bindNot(isBlank);
var isNotBoolean = bindNot(isBoolean);
var isEven = (value) => {
  if (isNumeric(value)) {
    return value % 2 === 0;
  }
  return false;
};
function isKeyOf(key, obj) {
  return key in obj;
}
var isNotKeyOf = bindNot(isKeyOf);
function isNaN2(value) {
  return Number.isNaN(value);
}
var isNotNaN = bindNot(isNaN2);
function isNegative(value) {
  return lessThan(value, 0);
}
function isNumber(value) {
  return Boolean(typeof value === "number");
}
var isNotNumber = bindNot(isNumber);
var isOdd = (value) => {
  if (isNumeric(value)) {
    return value % 2 !== 0;
  }
  return false;
};
var isNotString = bindNot(isStringValue);
function isTruthy(value) {
  return !!value;
}
var isFalsy = bindNot(isTruthy);
function isValueOf(value, objectToCheck) {
  if (isNullish(objectToCheck)) {
    return false;
  }
  for (const key in objectToCheck) {
    if (objectToCheck[key] === value) {
      return true;
    }
  }
  return false;
}
var isNotValueOf = bindNot(isValueOf);
function longerThanOrEquals(value, arg1) {
  return greaterThanOrEquals(value.length, arg1);
}
function matches(value, regex) {
  if (regex instanceof RegExp) {
    return regex.test(value);
  } else if (isStringValue(regex)) {
    return new RegExp(regex).test(value);
  }
  return false;
}
var notMatches = bindNot(matches);
function condition(value, callback) {
  try {
    return callback(value);
  } catch (_a) {
    return false;
  }
}
function shorterThan(value, arg1) {
  return lessThan(value.length, arg1);
}
function shorterThanOrEquals(value, arg1) {
  return lessThanOrEquals(value.length, arg1);
}
function startsWith(value, arg1) {
  return isStringValue(value) && isStringValue(arg1) && value.startsWith(arg1);
}
var doesNotStartWith = bindNot(startsWith);
function rules() {
  return {
    condition,
    doesNotEndWith,
    doesNotStartWith,
    endsWith,
    equals,
    greaterThan,
    greaterThanOrEquals,
    gt: greaterThan,
    gte: greaterThanOrEquals,
    inside,
    isArray,
    isBetween,
    isBlank,
    isBoolean,
    isEmpty,
    isEven,
    isFalsy,
    isKeyOf,
    isNaN: isNaN2,
    isNegative,
    isNotArray,
    isNotBetween,
    isNotBlank,
    isNotBoolean,
    isNotEmpty,
    isNotKeyOf,
    isNotNaN,
    isNotNull,
    isNotNullish,
    isNotNumber,
    isNotNumeric,
    isNotString,
    isNotUndefined,
    isNotValueOf,
    isNull,
    isNullish,
    isNumber,
    isNumeric,
    isOdd,
    isPositive,
    isString: isStringValue,
    isTruthy,
    isUndefined,
    isValueOf,
    lengthEquals,
    lengthNotEquals,
    lessThan,
    lessThanOrEquals,
    longerThan,
    longerThanOrEquals,
    lt: lessThan,
    lte: lessThanOrEquals,
    matches,
    notEquals,
    notInside,
    notMatches,
    numberEquals,
    numberNotEquals,
    shorterThan,
    shorterThanOrEquals,
    startsWith
  };
}
var baseRules = rules();
function getRule(ruleName) {
  return baseRules[ruleName];
}
function ruleReturn(pass, message) {
  const output = { pass };
  if (message) {
    output.message = message;
  }
  return output;
}
function passing() {
  return ruleReturn(true);
}
function defaultToPassing(callback) {
  return defaultTo(callback, passing());
}
function transformResult(result, ruleName, value, ...args) {
  validateResult(result);
  if (isBoolean(result)) {
    return ruleReturn(result);
  }
  return ruleReturn(result.pass, optionalFunctionValue(result.message, ruleName, value, ...args));
}
function validateResult(result) {
  invariant(isBoolean(result) || result && isBoolean(result.pass), "Incorrect return value for rule: " + JSON.stringify(result));
}
function enforceEager(value) {
  const target = {
    message,
    pass: false
  };
  let customMessage = void 0;
  const proxy = new Proxy(target, {
    get: (_, key) => {
      const rule = getRule(key);
      if (rule) {
        return genRuleCall(proxy, rule, key);
      }
      return target[key];
    }
  });
  return proxy;
  function genRuleCall(target2, rule, ruleName) {
    return function ruleCall(...args) {
      const transformedResult = ctx.run({ value }, () => {
        return transformResult(rule(value, ...args), ruleName, value, ...args);
      });
      function enforceMessage() {
        if (!isNullish(customMessage))
          return StringObject(customMessage);
        if (isNullish(transformedResult.message)) {
          return `enforce/${ruleName} failed with ${JSON.stringify(value)}`;
        }
        return StringObject(transformedResult.message);
      }
      invariant(transformedResult.pass, enforceMessage());
      target2.pass = transformedResult.pass;
      return target2;
    };
  }
  function message(input) {
    customMessage = input;
    return proxy;
  }
}
function genEnforceLazy(key) {
  const registeredRules = [];
  let lazyMessage;
  return addLazyRule(key);
  function addLazyRule(ruleName) {
    return (...args) => {
      const rule = getRule(ruleName);
      registeredRules.push((value) => transformResult(rule(value, ...args), ruleName, value, ...args));
      let proxy = {
        run: (value) => {
          return defaultToPassing(mapFirst(registeredRules, (rule2, breakout) => {
            var _a;
            const res = ctx.run({ value }, () => rule2(value));
            breakout(!res.pass, ruleReturn(!!res.pass, (_a = optionalFunctionValue(lazyMessage, value, res.message)) !== null && _a !== void 0 ? _a : res.message));
          }));
        },
        test: (value) => proxy.run(value).pass,
        message: (message) => {
          if (message) {
            lazyMessage = message;
          }
          return proxy;
        }
      };
      proxy = new Proxy(proxy, {
        get: (target, key2) => {
          if (getRule(key2)) {
            return addLazyRule(key2);
          }
          return target[key2];
        }
      });
      return proxy;
    };
  }
}
function genEnforce() {
  const target = {
    context: () => ctx.useX(),
    extend: (customRules) => {
      assign(baseRules, customRules);
    }
  };
  return new Proxy(assign(enforceEager, target), {
    get: (target2, key) => {
      if (key in target2) {
        return target2[key];
      }
      if (!getRule(key)) {
        return;
      }
      return genEnforceLazy(key);
    }
  });
}
var enforce = genEnforce();

export {
  bindNot,
  numberEquals,
  greaterThan,
  createCache,
  isNull,
  isUndefined,
  isNullish,
  isNotNullish,
  asArray,
  callEach,
  hasOwnProperty,
  isFunction,
  isPromise,
  optionalFunctionValue,
  assign,
  defaultTo,
  invariant,
  isStringValue,
  either,
  deferThrow,
  bus,
  seq,
  isArray,
  isEmpty,
  isNotEmpty,
  isPositive,
  text,
  StateMachine,
  tinyState,
  noop,
  Predicates,
  createCascade,
  enforce
};
//# sourceMappingURL=chunk-WXW2A56X.js.map
