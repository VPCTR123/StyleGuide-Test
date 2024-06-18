import {
  Predicates,
  StateMachine,
  asArray,
  assign,
  bindNot,
  bus,
  callEach,
  createCache,
  createCascade,
  defaultTo,
  deferThrow,
  either,
  enforce,
  greaterThan,
  hasOwnProperty,
  invariant,
  isArray,
  isEmpty,
  isFunction,
  isNotEmpty,
  isNotNullish,
  isNull,
  isNullish,
  isPositive,
  isPromise,
  isStringValue,
  isUndefined,
  noop,
  numberEquals,
  optionalFunctionValue,
  seq,
  text,
  tinyState
} from "./chunk-WXW2A56X.js";
import "./chunk-ASLTLD6L.js";

// node_modules/vestjs-runtime/dist/es/vestjs-runtime.development.js
var RuntimeEvents = {
  ISOLATE_ENTER: "ISOLATE_ENTER",
  ISOLATE_PENDING: "ISOLATE_PENDING",
  ISOLATE_DONE: "ISOLATE_DONE"
};
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
var ErrorStrings;
(function(ErrorStrings3) {
  ErrorStrings3["NO_ACTIVE_ISOLATE"] = "Not within an active isolate";
  ErrorStrings3["UNABLE_TO_PICK_NEXT_ISOLATE"] = "Unable to pick next isolate. This is a bug, please report it to the Vest maintainers.";
  ErrorStrings3["ENCOUNTERED_THE_SAME_KEY_TWICE"] = 'Encountered the same key "{key}" twice. This may lead to inconsistent or overriding of results.';
  ErrorStrings3["INVALID_ISOLATE_CANNOT_PARSE"] = "Invalid isolate was passed to IsolateSerializer. Cannot proceed.";
})(ErrorStrings || (ErrorStrings = {}));
var IsolateInspector = class _IsolateInspector {
  static at(isolate, at) {
    var _a2, _b2;
    if (isNullish(isolate)) {
      return null;
    }
    return (_b2 = (_a2 = isolate.children) === null || _a2 === void 0 ? void 0 : _a2[at]) !== null && _b2 !== void 0 ? _b2 : null;
  }
  static cursor(isolate) {
    var _a2, _b2;
    if (isNullish(isolate)) {
      return 0;
    }
    return (_b2 = (_a2 = isolate.children) === null || _a2 === void 0 ? void 0 : _a2.length) !== null && _b2 !== void 0 ? _b2 : 0;
  }
  static canReorder(isolate) {
    if (isNullish(isolate)) {
      return false;
    }
    return _IsolateInspector.allowsReorder(isolate.parent);
  }
  static allowsReorder(isolate) {
    return (isolate === null || isolate === void 0 ? void 0 : isolate.allowReorder) === true;
  }
  static usesKey(isolate) {
    if (isNullish(isolate)) {
      return false;
    }
    return isNotNullish(isolate.key);
  }
  static getChildByKey(isolate, key) {
    var _a2, _b2;
    if (isNullish(isolate)) {
      return null;
    }
    return (_b2 = (_a2 = isolate.keys) === null || _a2 === void 0 ? void 0 : _a2[key]) !== null && _b2 !== void 0 ? _b2 : null;
  }
};
var IsolateMutator = class _IsolateMutator {
  static setParent(isolate, parent) {
    isolate.parent = parent;
    return isolate;
  }
  static saveOutput(isolate, output) {
    isolate.output = output;
    return isolate;
  }
  static setKey(isolate, key) {
    isolate.key = key;
    return isolate;
  }
  static addChild(isolate, child) {
    var _a2;
    invariant(isolate);
    isolate.children = (_a2 = isolate.children) !== null && _a2 !== void 0 ? _a2 : [];
    isolate.children.push(child);
    _IsolateMutator.setParent(child, isolate);
  }
  static removeChild(isolate, node) {
    var _a2, _b2;
    isolate.children = (_b2 = (_a2 = isolate.children) === null || _a2 === void 0 ? void 0 : _a2.filter((child) => child !== node)) !== null && _b2 !== void 0 ? _b2 : null;
  }
  static addChildKey(isolate, key, node) {
    var _a2;
    invariant(isolate);
    isolate.keys = (_a2 = isolate.keys) !== null && _a2 !== void 0 ? _a2 : {};
    isolate.keys[key] = node;
  }
  static slice(isolate, at) {
    if (isNullish(isolate.children)) {
      return;
    }
    isolate.children.length = at;
  }
  static setData(isolate, data) {
    isolate.data = data;
  }
  static abort(isolate, reason) {
    if (isNullish(isolate.abortController)) {
      return;
    }
    isolate.abortController.abort(reason);
  }
};
var PersistedContext = createCascade((stateRef, parentContext) => {
  if (parentContext) {
    return null;
  }
  invariant(stateRef.historyRoot);
  const [historyRootNode] = stateRef.historyRoot();
  const ctxRef = {};
  assign(ctxRef, {
    historyNode: historyRootNode,
    runtimeNode: null,
    runtimeRoot: null,
    stateRef
  });
  return ctxRef;
});
var Run = PersistedContext.run;
var RuntimeApi = {
  Run,
  addNodeToHistory,
  createRef,
  persist,
  reset,
  useAvailableRoot,
  useCurrentCursor,
  useHistoryRoot,
  useLoadRootNode,
  useXAppData
};
function useXAppData() {
  return useX().stateRef.appData;
}
function createRef(Reconciler2, setter) {
  return Object.freeze({
    Bus: bus.createBus(),
    Reconciler: Reconciler2,
    appData: optionalFunctionValue(setter),
    historyRoot: tinyState.createTinyState(null)
  });
}
function useReconciler() {
  return useX().stateRef.Reconciler;
}
function persist(cb) {
  const prev = PersistedContext.useX();
  return (...args) => {
    var _a2;
    const ctxToUse = (_a2 = PersistedContext.use()) !== null && _a2 !== void 0 ? _a2 : prev;
    return PersistedContext.run(ctxToUse.stateRef, () => cb(...args));
  };
}
function useX() {
  return PersistedContext.useX();
}
function useHistoryRoot() {
  return useX().stateRef.historyRoot();
}
function useHistoryIsolate() {
  return useX().historyNode;
}
function useHistoryIsolateAtCurrentPosition() {
  const parent = useIsolate();
  const historyNode = useHistoryIsolate();
  if (parent) {
    return IsolateInspector.at(historyNode, IsolateInspector.cursor(parent));
  }
  return historyNode;
}
function addNodeToHistory(node) {
  const parent = useIsolate();
  if (parent) {
    useSetNextIsolateChild(node);
  } else {
    useSetHistory(node);
  }
  IsolateMutator.setParent(node, parent);
}
function useSetHistory(history) {
  const [, setHistoryRoot] = useHistoryRoot();
  setHistoryRoot(history);
}
function useHistoryKey(key) {
  if (isNullish(key)) {
    return null;
  }
  const historyNode = useX().historyNode;
  return IsolateInspector.getChildByKey(historyNode, key);
}
function useIsolate() {
  var _a2;
  return (_a2 = useX().runtimeNode) !== null && _a2 !== void 0 ? _a2 : null;
}
function useCurrentCursor() {
  const isolate = useIsolate();
  return isolate ? IsolateInspector.cursor(isolate) : 0;
}
function useRuntimeRoot() {
  return useX().runtimeRoot;
}
function useSetNextIsolateChild(child) {
  const currentIsolate = useIsolate();
  invariant(currentIsolate, ErrorStrings.NO_ACTIVE_ISOLATE);
  IsolateMutator.addChild(currentIsolate, child);
}
function useSetIsolateKey(key, node) {
  if (!key) {
    return;
  }
  const currentIsolate = useIsolate();
  invariant(currentIsolate, ErrorStrings.NO_ACTIVE_ISOLATE);
  if (isNullish(IsolateInspector.getChildByKey(currentIsolate, key))) {
    IsolateMutator.addChildKey(currentIsolate, key, node);
    return;
  }
  deferThrow(text(ErrorStrings.ENCOUNTERED_THE_SAME_KEY_TWICE, { key }));
}
function useAvailableRoot() {
  const root = useRuntimeRoot();
  if (root) {
    return root;
  }
  const [historyRoot] = useHistoryRoot();
  return historyRoot;
}
function reset() {
  const [, , resetHistoryRoot] = useHistoryRoot();
  resetHistoryRoot();
}
function useLoadRootNode(root) {
  useSetHistory(root);
}
function useBus() {
  return useX().stateRef.Bus;
}
function useEmit(event, data) {
  const emit = useBus().emit;
  if (!isNullish(event)) {
    emit(event, data);
  }
  return persist(emit);
}
function usePrepareEmitter(event) {
  const emit = useEmit();
  return (arg) => emit(event, arg);
}
var Bus = Object.freeze({
  __proto__: null,
  useBus,
  useEmit,
  usePrepareEmitter
});
var IsolateKeys;
(function(IsolateKeys2) {
  IsolateKeys2["Type"] = "$type";
  IsolateKeys2["Keys"] = "keys";
  IsolateKeys2["Key"] = "key";
  IsolateKeys2["Parent"] = "parent";
  IsolateKeys2["Data"] = "data";
  IsolateKeys2["AllowReorder"] = "allowReorder";
  IsolateKeys2["Status"] = "status";
  IsolateKeys2["AbortController"] = "abortController";
  IsolateKeys2["Children"] = "children";
})(IsolateKeys || (IsolateKeys = {}));
var ExcludedFromDump = /* @__PURE__ */ new Set([
  IsolateKeys.AbortController,
  IsolateKeys.Parent,
  IsolateKeys.Keys
]);
function isIsolateType(node, type) {
  return (node === null || node === void 0 ? void 0 : node[IsolateKeys.Type]) === type;
}
function isSameIsolateType(a, b) {
  return isIsolateType(a, b[IsolateKeys.Type]);
}
function isSameIsolateIdentity(a, b) {
  return Object.is(a, b) || isSameIsolateType(a, b) && a.key === b.key;
}
var IsolateSelectors = Object.freeze({
  __proto__: null,
  isIsolateType,
  isSameIsolateIdentity,
  isSameIsolateType
});
function BaseReconciler(currentNode, historyNode) {
  if (isNullish(historyNode)) {
    return currentNode;
  }
  return currentNode;
}
var Reconciler = class {
  /**
   * Reconciles the current isolate with the history isolate.
   * If the current isolate is of a different type than the history isolate,
   * the current isolate is returned.
   * Otherwise, the reconciler function is called to determine the next isolate.
   * If the reconciler function returns null or undefined, the base reconciler is used.
   * If no history isolate exists, the current isolate is returned.
   * @param node The current isolate to reconcile.
   * @returns The next isolate after reconciliation.
   */
  static reconcile(node) {
    const localHistoryNode = useHistoryIsolateAtCurrentPosition();
    const nextNodeResult = pickNextNode(node, localHistoryNode);
    invariant(nextNodeResult, ErrorStrings.UNABLE_TO_PICK_NEXT_ISOLATE);
    return nextNodeResult;
  }
  static dropNextNodesOnReorder(reorderLogic, newNode, prevNode) {
    const didReorder = reorderLogic(newNode, prevNode);
    if (didReorder) {
      removeAllNextNodesInIsolate();
    }
    return didReorder;
  }
  static handleIsolateNodeWithKey(node, revoke) {
    invariant(IsolateInspector.usesKey(node));
    const prevNodeByKey = useHistoryKey(node.key);
    let nextNode = node;
    if (!isNullish(prevNodeByKey) && !optionalFunctionValue(revoke, prevNodeByKey)) {
      nextNode = prevNodeByKey;
    }
    useSetIsolateKey(node.key, nextNode);
    return nextNode;
  }
};
function pickNextNode(currentNode, historyNode) {
  var _a2;
  if (isNullish(historyNode)) {
    return handleNoHistoryNode(currentNode);
  }
  if (!isSameIsolateType(currentNode, historyNode)) {
    return currentNode;
  }
  const reconciler = useReconciler();
  return (_a2 = reconciler(currentNode, historyNode)) !== null && _a2 !== void 0 ? _a2 : BaseReconciler(currentNode, historyNode);
}
function handleNoHistoryNode(newNode) {
  if (IsolateInspector.usesKey(newNode)) {
    return Reconciler.handleIsolateNodeWithKey(newNode, false);
  }
  return newNode;
}
function removeAllNextNodesInIsolate() {
  const currentNode = useIsolate();
  const historyNode = useHistoryIsolate();
  if (!historyNode || !currentNode) {
    return;
  }
  IsolateMutator.slice(historyNode, IsolateInspector.cursor(currentNode));
}
var Isolate = class {
  static create(type, callback, payload = void 0, key) {
    const parent = useIsolate();
    const newCreatedNode = IsolateMutator.setParent(baseIsolate(type, payload, key), parent);
    const nextIsolateChild = Reconciler.reconcile(newCreatedNode);
    const localHistoryNode = useHistoryIsolateAtCurrentPosition();
    const shouldRunNew = Object.is(nextIsolateChild, newCreatedNode);
    addNodeToHistory(nextIsolateChild);
    const output = shouldRunNew ? useRunAsNew(localHistoryNode, newCreatedNode, callback) : nextIsolateChild.output;
    IsolateMutator.saveOutput(nextIsolateChild, output);
    return nextIsolateChild;
  }
  static isIsolate(node) {
    return isNotNullish(node) && node[IsolateKeys.Type];
  }
};
function useRunAsNew(localHistoryNode, current, callback) {
  const runtimeRoot = useRuntimeRoot();
  const emit = useEmit();
  const output = Run(Object.assign({ historyNode: localHistoryNode, runtimeNode: current }, !runtimeRoot && { runtimeRoot: current }), () => {
    emit(RuntimeEvents.ISOLATE_ENTER, current);
    const output2 = callback(current);
    if (isPromise(output2)) {
      emit(RuntimeEvents.ISOLATE_PENDING, current);
      output2.then((iso) => {
        if (Isolate.isIsolate(iso)) {
          IsolateMutator.addChild(current, iso);
        }
        emit(RuntimeEvents.ISOLATE_DONE, current);
      });
    } else {
      emit(RuntimeEvents.ISOLATE_DONE, current);
    }
    return output2;
  });
  current.output = output;
  return output;
}
function baseIsolate(type, payload = void 0, key = null) {
  const _a2 = payload !== null && payload !== void 0 ? payload : {}, { allowReorder, status } = _a2, data = __rest(_a2, ["allowReorder", "status"]);
  return Object.assign(Object.assign({ [IsolateKeys.AllowReorder]: allowReorder, [IsolateKeys.AbortController]: new AbortController(), [IsolateKeys.Keys]: null, [IsolateKeys.Parent]: null, [IsolateKeys.Type]: type, [IsolateKeys.Data]: data }, status && { [IsolateKeys.Status]: status }), { children: null, key, output: null });
}
function walk(startNode, callback, visitOnly) {
  if (isNullish(startNode.children)) {
    return;
  }
  let broke = false;
  for (const isolate of startNode.children) {
    if (broke) {
      return;
    }
    if (isNullish(visitOnly) || optionalFunctionValue(visitOnly, isolate)) {
      callback(isolate, breakout);
    }
    if (broke) {
      return;
    }
    walk(isolate, (child, innerBreakout) => {
      callback(child, () => {
        innerBreakout();
        breakout();
      });
    }, visitOnly);
  }
  function breakout() {
    broke = true;
  }
}
function some(startNode, predicate, visitOnly) {
  let hasMatch = false;
  walk(startNode, (node, breakout) => {
    if (predicate(node)) {
      breakout();
      hasMatch = true;
    }
  }, visitOnly);
  return hasMatch;
}
function has(startNode, match) {
  return some(startNode, () => true, match);
}
function findClosest(startNode, predicate) {
  var _a2, _b2;
  let found = null;
  let current = startNode;
  while (current) {
    found = (_b2 = (_a2 = current.children) === null || _a2 === void 0 ? void 0 : _a2.find(predicate)) !== null && _b2 !== void 0 ? _b2 : null;
    if (found) {
      break;
    }
    current = current.parent;
  }
  return found;
}
function find(startNode, predicate, visitOnly) {
  let found = null;
  walk(startNode, (node, breakout) => {
    if (predicate(node)) {
      breakout();
      found = node;
    }
  }, visitOnly);
  return found;
}
function every(startNode, predicate, visitOnly) {
  let hasMatch = true;
  walk(startNode, (node, breakout) => {
    if (!predicate(node)) {
      breakout();
      hasMatch = false;
    }
  }, visitOnly);
  return hasMatch;
}
function pluck(startNode, predicate, visitOnly) {
  walk(startNode, (node) => {
    if (predicate(node) && node.parent) {
      IsolateMutator.removeChild(node.parent, node);
    }
  }, visitOnly);
}
function closest(startNode, predicate) {
  let current = startNode;
  do {
    if (predicate(current)) {
      return current;
    }
    current = current.parent;
  } while (current);
  return null;
}
function closestExists(startNode, predicate) {
  return !!closest(startNode, predicate);
}
var IsolateWalker = Object.freeze({
  __proto__: null,
  closest,
  closestExists,
  every,
  find,
  findClosest,
  has,
  pluck,
  some,
  walk
});

// node_modules/vest/dist/es/vest.development.js
var VestIsolateType = {
  Each: "Each",
  Focused: "Focused",
  Group: "Group",
  OmitWhen: "OmitWhen",
  SkipWhen: "SkipWhen",
  Suite: "Suite",
  Test: "Test"
};
function IsolateSuite(callback) {
  return Isolate.create(VestIsolateType.Suite, callback, {
    optional: {}
  });
}
var SuiteOptionalFields = class _SuiteOptionalFields {
  static setOptionalField(suite, fieldName, setter) {
    const current = suite.data.optional;
    const currentField = current[fieldName];
    assign(current, {
      [fieldName]: assign({}, currentField, setter(currentField))
    });
  }
  static getOptionalField(suite, fieldName) {
    var _a2;
    return (_a2 = _SuiteOptionalFields.getOptionalFields(suite)[fieldName]) !== null && _a2 !== void 0 ? _a2 : {};
  }
  static getOptionalFields(suite) {
    var _a2, _b2;
    return (_b2 = (_a2 = suite.data) === null || _a2 === void 0 ? void 0 : _a2.optional) !== null && _b2 !== void 0 ? _b2 : {};
  }
};
var OptionalFieldTypes;
(function(OptionalFieldTypes2) {
  OptionalFieldTypes2[OptionalFieldTypes2["CUSTOM_LOGIC"] = 0] = "CUSTOM_LOGIC";
  OptionalFieldTypes2[OptionalFieldTypes2["AUTO"] = 1] = "AUTO";
})(OptionalFieldTypes || (OptionalFieldTypes = {}));
var Modes;
(function(Modes2) {
  Modes2["EAGER"] = "EAGER";
  Modes2["ALL"] = "ALL";
  Modes2["ONE"] = "ONE";
})(Modes || (Modes = {}));
var SuiteContext = createCascade((ctxRef, parentContext) => {
  if (parentContext) {
    return null;
  }
  return assign({
    inclusion: {},
    mode: tinyState.createTinyState(Modes.EAGER),
    suiteParams: [],
    testMemoCache
  }, ctxRef);
});
function useCurrentTest(msg) {
  return SuiteContext.useX(msg).currentTest;
}
function useGroupName() {
  return SuiteContext.useX().groupName;
}
function useInclusion() {
  return SuiteContext.useX().inclusion;
}
function useMode() {
  return SuiteContext.useX().mode();
}
function useSkipped() {
  var _a2;
  return (_a2 = SuiteContext.useX().skipped) !== null && _a2 !== void 0 ? _a2 : false;
}
function useOmitted() {
  var _a2;
  return (_a2 = SuiteContext.useX().omitted) !== null && _a2 !== void 0 ? _a2 : false;
}
var testMemoCache = createCache(10);
function useTestMemoCache() {
  return SuiteContext.useX().testMemoCache;
}
function useSuiteParams() {
  return SuiteContext.useX().suiteParams;
}
function optional(optionals) {
  var _a2;
  const suiteRoot = RuntimeApi.useAvailableRoot();
  const suiteParams = useSuiteParams();
  const dataObject = (_a2 = suiteParams === null || suiteParams === void 0 ? void 0 : suiteParams[0]) !== null && _a2 !== void 0 ? _a2 : {};
  if (isArray(optionals) || isStringValue(optionals)) {
    asArray(optionals).forEach((optionalField) => {
      SuiteOptionalFields.setOptionalField(suiteRoot, optionalField, () => ({
        type: OptionalFieldTypes.AUTO,
        applied: hasOwnProperty(dataObject, optionalField) ? enforce.isBlank().test(dataObject === null || dataObject === void 0 ? void 0 : dataObject[optionalField]) : false,
        rule: null
      }));
    });
  } else {
    for (const field in optionals) {
      const value = optionals[field];
      SuiteOptionalFields.setOptionalField(suiteRoot, field, () => ({
        type: OptionalFieldTypes.CUSTOM_LOGIC,
        rule: value,
        applied: enforce.isBlank().test(value) || value === true
      }));
    }
  }
}
function useIsOptionalFieldApplied(fieldName) {
  var _a2, _b2;
  if (!fieldName) {
    return false;
  }
  const root = RuntimeApi.useAvailableRoot();
  return (_b2 = (_a2 = SuiteOptionalFields.getOptionalField(root, fieldName)) === null || _a2 === void 0 ? void 0 : _a2.applied) !== null && _b2 !== void 0 ? _b2 : false;
}
var ErrorStrings2;
(function(ErrorStrings3) {
  ErrorStrings3["HOOK_CALLED_OUTSIDE"] = "hook called outside of a running suite.";
  ErrorStrings3["EXPECTED_VEST_TEST"] = "Expected value to be an instance of IsolateTest";
  ErrorStrings3["FIELD_NAME_REQUIRED"] = "Field name must be passed";
  ErrorStrings3["SUITE_MUST_BE_INITIALIZED_WITH_FUNCTION"] = "Suite must be initialized with a function";
  ErrorStrings3["PROMISIFY_REQUIRE_FUNCTION"] = "Vest.Promisify must be called with a function";
  ErrorStrings3["PARSER_EXPECT_RESULT_OBJECT"] = "Vest parser: expected argument at position 0 to be Vest's result object.";
  ErrorStrings3["WARN_MUST_BE_CALLED_FROM_TEST"] = "Warn must be called from within the body of a test function";
  ErrorStrings3["EACH_CALLBACK_MUST_BE_A_FUNCTION"] = "Each must be called with a function";
  ErrorStrings3["INVALID_PARAM_PASSED_TO_FUNCTION"] = 'Incompatible params passed to {fn_name} function. "{param}" must be of type {expected}';
  ErrorStrings3["TESTS_CALLED_IN_DIFFERENT_ORDER"] = `Vest Critical Error: Tests called in different order than previous run.
    expected: {fieldName}
    received: {prevName}
    This can happen on one of two reasons:
    1. You're using if/else statements to conditionally select tests. Instead, use "skipWhen".
    2. You are iterating over a list of tests, and their order changed. Use "each" and a custom key prop so that Vest retains their state.`;
  ErrorStrings3["UNEXPECTED_TEST_REGISTRATION_ERROR"] = "Unexpected error encountered during test registration.\n      Please report this issue to Vest's Github repository.\n      Test Object: {testObject}.\n      Error: {error}.";
  ErrorStrings3["UNEXPECTED_TEST_RUN_ERROR"] = "Unexpected error encountered during test run. Please report this issue to Vest's Github repository.\n      Test Object: {testObject}.";
  ErrorStrings3["INCLUDE_SELF"] = "Trying to call include.when on the same field.";
})(ErrorStrings2 || (ErrorStrings2 = {}));
var CommonStates = {
  PENDING: "PENDING",
  INITIAL: "INITIAL"
};
var State = {
  [CommonStates.PENDING]: CommonStates.PENDING,
  [CommonStates.INITIAL]: CommonStates.INITIAL,
  DONE: "DONE"
};
var machine$1 = {
  initial: State.INITIAL,
  states: {
    [State.DONE]: {},
    [State.INITIAL]: {
      [State.PENDING]: State.PENDING,
      [State.DONE]: State.DONE
    },
    [State.PENDING]: {
      [State.DONE]: State.DONE
    }
  }
};
function transition(from, to) {
  return CommonStateMachine.staticTransition(from !== null && from !== void 0 ? from : State.INITIAL, to);
}
function setDone(isolate) {
  isolate.status = transition(isolate.status, State.DONE);
}
function setPending(isolate) {
  isolate.status = transition(isolate.status, State.PENDING);
}
var CommonStateMachine = StateMachine(machine$1);
var TestStatus = {
  [CommonStates.PENDING]: CommonStates.PENDING,
  CANCELED: "CANCELED",
  FAILED: "FAILED",
  OMITTED: "OMITTED",
  PASSING: "PASSING",
  SKIPPED: "SKIPPED",
  UNTESTED: "UNTESTED",
  WARNING: "WARNING"
};
var TestAction = {
  RESET: "RESET"
};
var machine = {
  initial: TestStatus.UNTESTED,
  states: {
    "*": {
      [TestStatus.OMITTED]: TestStatus.OMITTED,
      [TestAction.RESET]: TestStatus.UNTESTED
    },
    [TestStatus.UNTESTED]: {
      [TestStatus.CANCELED]: TestStatus.CANCELED,
      [TestStatus.FAILED]: TestStatus.FAILED,
      [TestStatus.PASSING]: TestStatus.PASSING,
      [TestStatus.PENDING]: TestStatus.PENDING,
      [TestStatus.SKIPPED]: TestStatus.SKIPPED,
      [TestStatus.WARNING]: TestStatus.WARNING
    },
    [TestStatus.PENDING]: {
      [TestStatus.CANCELED]: TestStatus.CANCELED,
      [TestStatus.FAILED]: TestStatus.FAILED,
      [TestStatus.PASSING]: TestStatus.PASSING,
      [TestStatus.SKIPPED]: [
        TestStatus.SKIPPED,
        (force) => force === true
      ],
      [TestStatus.WARNING]: TestStatus.WARNING
    },
    [TestStatus.SKIPPED]: {},
    [TestStatus.FAILED]: {},
    [TestStatus.WARNING]: {},
    [TestStatus.PASSING]: {},
    [TestStatus.CANCELED]: {},
    [TestStatus.OMITTED]: {}
  }
};
var IsolateTestStateMachine = StateMachine(machine);
var Severity;
(function(Severity2) {
  Severity2["WARNINGS"] = "warnings";
  Severity2["ERRORS"] = "errors";
})(Severity || (Severity = {}));
var SeverityCount;
(function(SeverityCount2) {
  SeverityCount2["ERROR_COUNT"] = "errorCount";
  SeverityCount2["WARN_COUNT"] = "warnCount";
})(SeverityCount || (SeverityCount = {}));
function countKeyBySeverity(severity) {
  return severity === Severity.ERRORS ? SeverityCount.ERROR_COUNT : SeverityCount.WARN_COUNT;
}
var TestSeverity;
(function(TestSeverity2) {
  TestSeverity2["Error"] = "error";
  TestSeverity2["Warning"] = "warning";
})(TestSeverity || (TestSeverity = {}));
var VestIsolate = class _VestIsolate {
  static getStatus(isolate) {
    var _a2;
    return (_a2 = isolate.status) !== null && _a2 !== void 0 ? _a2 : CommonStates.INITIAL;
  }
  static setStatus(isolate, status, payload) {
    isolate.status = this.stateMachine.staticTransition(_VestIsolate.getStatus(isolate), status, payload);
  }
  static statusEquals(isolate, status) {
    return _VestIsolate.getStatus(isolate) === status;
  }
  static setPending(isolate) {
    this.setStatus(isolate, CommonStates.PENDING);
  }
  static isPending(isolate) {
    return _VestIsolate.statusEquals(isolate, CommonStates.PENDING);
  }
};
VestIsolate.stateMachine = CommonStateMachine;
var VestTest = class _VestTest extends VestIsolate {
  // Read
  static getData(test2) {
    invariant(test2.data);
    return test2.data;
  }
  static is(isolate) {
    return IsolateSelectors.isIsolateType(isolate, VestIsolateType.Test);
  }
  static isX(isolate) {
    invariant(_VestTest.is(isolate), ErrorStrings2.EXPECTED_VEST_TEST);
  }
  static cast(isolate) {
    _VestTest.isX(isolate);
    return isolate;
  }
  static warns(test2) {
    return _VestTest.getData(test2).severity === TestSeverity.Warning;
  }
  static isOmitted(test2) {
    return _VestTest.statusEquals(test2, TestStatus.OMITTED);
  }
  static isUntested(test2) {
    return _VestTest.statusEquals(test2, TestStatus.UNTESTED);
  }
  static isFailing(test2) {
    return _VestTest.statusEquals(test2, TestStatus.FAILED);
  }
  static isCanceled(test2) {
    return _VestTest.statusEquals(test2, TestStatus.CANCELED);
  }
  static isSkipped(test2) {
    return _VestTest.statusEquals(test2, TestStatus.SKIPPED);
  }
  static isPassing(test2) {
    return _VestTest.statusEquals(test2, TestStatus.PASSING);
  }
  static isWarning(test2) {
    return _VestTest.statusEquals(test2, TestStatus.WARNING);
  }
  static hasFailures(test2) {
    return _VestTest.isFailing(test2) || _VestTest.isWarning(test2);
  }
  static isNonActionable(test2) {
    return _VestTest.isSkipped(test2) || _VestTest.isOmitted(test2) || _VestTest.isCanceled(test2);
  }
  static isTested(test2) {
    return _VestTest.hasFailures(test2) || _VestTest.isPassing(test2);
  }
  static awaitsResolution(test2) {
    return _VestTest.isSkipped(test2) || _VestTest.isUntested(test2) || _VestTest.isPending(test2);
  }
  static isAsyncTest(test2) {
    return isPromise(_VestTest.getData(test2).asyncTest);
  }
  // Mutate
  // static setPending(test: TIsolateTest) {
  //   this.setStatus(test, TestStatus.PENDING);
  // }
  static fail(test2) {
    _VestTest.setStatus(test2, _VestTest.warns(test2) ? TestStatus.WARNING : TestStatus.FAILED);
  }
  static pass(test2) {
    _VestTest.setStatus(test2, TestStatus.PASSING);
  }
  static warn(test2) {
    _VestTest.setData(test2, (current) => Object.assign(Object.assign({}, current), { severity: TestSeverity.Warning }));
  }
  static setData(test2, setter) {
    test2.data = optionalFunctionValue(setter, _VestTest.getData(test2));
  }
  static skip(test2, force) {
    _VestTest.setStatus(test2, TestStatus.SKIPPED, force);
  }
  static cancel(test2) {
    _VestTest.setStatus(test2, TestStatus.CANCELED);
    IsolateMutator.abort(test2, TestStatus.CANCELED);
  }
  static omit(test2) {
    _VestTest.setStatus(test2, TestStatus.OMITTED);
  }
  static reset(test2) {
    _VestTest.setStatus(test2, TestAction.RESET);
  }
};
VestTest.stateMachine = IsolateTestStateMachine;
function nonMatchingFieldName(WithFieldName, fieldName) {
  return !!fieldName && !matchingFieldName(WithFieldName, fieldName);
}
function matchingFieldName(WithFieldName, fieldName) {
  return !!(fieldName && WithFieldName.fieldName === fieldName);
}
function matchesOrHasNoFieldName(WithFieldName, fieldName) {
  if (fieldName) {
    return matchingFieldName(WithFieldName, fieldName);
  }
  return true;
}
function isSameProfileTest(testObject1, testObject2) {
  const { groupName: gn1 } = VestTest.getData(testObject1);
  const { groupName: gn2, fieldName: fn2 } = VestTest.getData(testObject2);
  return matchingFieldName(VestTest.getData(testObject1), fn2) && gn1 === gn2 && // Specifically using == here. The reason is that when serializing
  // suite result, empty key gets removed, but it can also be null.
  testObject1.key == testObject2.key;
}
function cancelOverriddenPendingTest(prevRunTestObject, currentRunTestObject) {
  if (currentRunTestObject !== prevRunTestObject && isSameProfileTest(prevRunTestObject, currentRunTestObject) && VestTest.isPending(prevRunTestObject)) {
    VestTest.cancel(prevRunTestObject);
  }
}
var FocusModes;
(function(FocusModes2) {
  FocusModes2[FocusModes2["ONLY"] = 0] = "ONLY";
  FocusModes2[FocusModes2["SKIP"] = 1] = "SKIP";
})(FocusModes || (FocusModes = {}));
function IsolateFocused(focusMode, match) {
  return Isolate.create(VestIsolateType.Focused, noop, {
    focusMode,
    match: asArray(match).filter(isStringValue),
    matchAll: match === true
  });
}
var FocusSelectors = class {
  static isSkipFocused(focus, fieldName) {
    return (focus === null || focus === void 0 ? void 0 : focus.data.focusMode) === FocusModes.SKIP && (hasFocus(focus, fieldName) || focus.data.matchAll === true);
  }
  static isOnlyFocused(focus, fieldName) {
    return (focus === null || focus === void 0 ? void 0 : focus.data.focusMode) === FocusModes.ONLY && hasFocus(focus, fieldName);
  }
  static isIsolateFocused(isolate) {
    return IsolateSelectors.isIsolateType(isolate, VestIsolateType.Focused);
  }
};
function only(match) {
  return IsolateFocused(FocusModes.ONLY, defaultMatch(match));
}
function skip(match) {
  return IsolateFocused(FocusModes.SKIP, defaultMatch(match));
}
function defaultMatch(match) {
  return match === false ? [] : match;
}
function hasFocus(focus, fieldName) {
  var _a2, _b2;
  return isNotEmpty(focus === null || focus === void 0 ? void 0 : focus.data.match) && (fieldName ? (_b2 = (_a2 = focus === null || focus === void 0 ? void 0 : focus.data.match) === null || _a2 === void 0 ? void 0 : _a2.includes(fieldName)) !== null && _b2 !== void 0 ? _b2 : true : true);
}
var suiteResultCache = createCache();
function useCreateVestState({ suiteName, VestReconciler: VestReconciler2 }) {
  const stateRef = {
    doneCallbacks: tinyState.createTinyState(() => []),
    fieldCallbacks: tinyState.createTinyState(() => ({})),
    suiteId: seq(),
    suiteName,
    suiteResultCache
  };
  return RuntimeApi.createRef(VestReconciler2, stateRef);
}
function useX2() {
  return RuntimeApi.useXAppData();
}
function useDoneCallbacks() {
  return useX2().doneCallbacks();
}
function useFieldCallbacks() {
  return useX2().fieldCallbacks();
}
function useSuiteName() {
  return useX2().suiteName;
}
function useSuiteId() {
  return useX2().suiteId;
}
function useSuiteResultCache(action) {
  const suiteResultCache2 = useX2().suiteResultCache;
  return suiteResultCache2([useSuiteId()], action);
}
function useExpireSuiteResultCache() {
  const suiteResultCache2 = useX2().suiteResultCache;
  suiteResultCache2.invalidate([useSuiteId()]);
}
function useResetCallbacks() {
  const [, , resetDoneCallbacks] = useDoneCallbacks();
  const [, , resetFieldCallbacks] = useFieldCallbacks();
  resetDoneCallbacks();
  resetFieldCallbacks();
}
function useResetSuite() {
  useResetCallbacks();
  RuntimeApi.reset();
}
function useLoadSuite(rootNode) {
  RuntimeApi.useLoadRootNode(rootNode);
  useExpireSuiteResultCache();
}
function gatherFailures(testGroup, severityKey, fieldName) {
  return fieldName ? getByFieldName(testGroup, severityKey, fieldName) : collectAll(testGroup, severityKey);
}
function getByFieldName(testGroup, severityKey, fieldName) {
  var _a2;
  return ((_a2 = testGroup === null || testGroup === void 0 ? void 0 : testGroup[fieldName]) === null || _a2 === void 0 ? void 0 : _a2[severityKey]) || [];
}
function collectAll(testGroup, severityKey) {
  const output = {};
  const countKey = countKeyBySeverity(severityKey);
  for (const field in testGroup) {
    if (isPositive(testGroup[field][countKey])) {
      output[field] = testGroup[field][severityKey] || [];
    }
  }
  return output;
}
function bindSuiteSelectors(get) {
  return {
    getError: (...args) => get().getError(...args),
    getErrors: (...args) => get().getErrors(...args),
    getErrorsByGroup: (...args) => get().getErrorsByGroup(...args),
    getWarning: (...args) => get().getWarning(...args),
    getWarnings: (...args) => get().getWarnings(...args),
    getWarningsByGroup: (...args) => get().getWarningsByGroup(...args),
    hasErrors: (...args) => get().hasErrors(...args),
    hasErrorsByGroup: (...args) => get().hasErrorsByGroup(...args),
    hasWarnings: (...args) => get().hasWarnings(...args),
    hasWarningsByGroup: (...args) => get().hasWarningsByGroup(...args),
    isPending: (...args) => {
      return get().isPending(...args);
    },
    isTested: (...args) => get().isTested(...args),
    isValid: (...args) => get().isValid(...args),
    isValidByGroup: (...args) => get().isValidByGroup(...args)
  };
}
function suiteSelectors(summary) {
  const selectors = {
    getError,
    getErrors,
    getErrorsByGroup,
    getWarning,
    getWarnings,
    getWarningsByGroup,
    hasErrors,
    hasErrorsByGroup,
    hasWarnings,
    hasWarningsByGroup,
    isPending,
    isTested,
    isValid,
    isValidByGroup
  };
  return selectors;
  function isValid(fieldName) {
    var _a2;
    return fieldName ? Boolean((_a2 = summary.tests[fieldName]) === null || _a2 === void 0 ? void 0 : _a2.valid) : summary.valid;
  }
  function isValidByGroup(groupName, fieldName) {
    const group2 = summary.groups[groupName];
    if (!group2) {
      return false;
    }
    if (fieldName) {
      return isFieldValid(group2, fieldName);
    }
    for (const fieldName2 in group2) {
      if (!isFieldValid(group2, fieldName2)) {
        return false;
      }
    }
    return true;
  }
  function hasWarnings(fieldName) {
    return hasFailures(summary, SeverityCount.WARN_COUNT, fieldName);
  }
  function hasErrors(fieldName) {
    return hasFailures(summary, SeverityCount.ERROR_COUNT, fieldName);
  }
  function isTested(fieldName) {
    var _a2;
    return isPositive((_a2 = summary.tests[fieldName]) === null || _a2 === void 0 ? void 0 : _a2.testCount);
  }
  function hasWarningsByGroup(groupName, fieldName) {
    return hasFailuresByGroup(summary, SeverityCount.WARN_COUNT, groupName, fieldName);
  }
  function hasErrorsByGroup(groupName, fieldName) {
    return hasFailuresByGroup(summary, SeverityCount.ERROR_COUNT, groupName, fieldName);
  }
  function getWarnings(fieldName) {
    return getFailures(summary, Severity.WARNINGS, fieldName);
  }
  function getWarning(fieldName) {
    return getFailure(Severity.WARNINGS, summary, fieldName);
  }
  function getErrors(fieldName) {
    return getFailures(summary, Severity.ERRORS, fieldName);
  }
  function getError(fieldName) {
    return getFailure(Severity.ERRORS, summary, fieldName);
  }
  function getErrorsByGroup(groupName, fieldName) {
    return getFailuresByGroup(summary, Severity.ERRORS, groupName, fieldName);
  }
  function getWarningsByGroup(groupName, fieldName) {
    return getFailuresByGroup(summary, Severity.WARNINGS, groupName, fieldName);
  }
  function isPending(fieldName) {
    var _a2;
    return fieldName ? greaterThan((_a2 = summary.tests[fieldName]) === null || _a2 === void 0 ? void 0 : _a2.pendingCount, 0) : greaterThan(summary.pendingCount, 0);
  }
}
function getFailures(summary, severityKey, fieldName) {
  return gatherFailures(summary.tests, severityKey, fieldName);
}
function getFailuresByGroup(summary, severityKey, groupName, fieldName) {
  return gatherFailures(summary.groups[groupName], severityKey, fieldName);
}
function isFieldValid(testContainer, fieldName) {
  var _a2;
  return !!((_a2 = testContainer[fieldName]) === null || _a2 === void 0 ? void 0 : _a2.valid);
}
function hasFailuresByGroup(summary, severityCount, groupName, fieldName) {
  var _a2, _b2;
  const group2 = summary.groups[groupName];
  if (!group2) {
    return false;
  }
  if (fieldName) {
    return isPositive((_a2 = group2[fieldName]) === null || _a2 === void 0 ? void 0 : _a2[severityCount]);
  }
  for (const field in group2) {
    if (isPositive((_b2 = group2[field]) === null || _b2 === void 0 ? void 0 : _b2[severityCount])) {
      return true;
    }
  }
  return false;
}
function hasFailures(summary, countKey, fieldName) {
  var _a2;
  const failureCount = fieldName ? (_a2 = summary.tests[fieldName]) === null || _a2 === void 0 ? void 0 : _a2[countKey] : summary[countKey] || 0;
  return isPositive(failureCount);
}
function getFailure(severity, summary, fieldName) {
  var _a2;
  const summaryKey = summary[severity];
  if (!fieldName) {
    return summaryKey[0];
  }
  return (_a2 = summaryKey.find((summaryFailure) => matchingFieldName(summaryFailure, fieldName))) === null || _a2 === void 0 ? void 0 : _a2.message;
}
var _a;
var _b;
var SummaryBase = class {
  constructor() {
    this.errorCount = 0;
    this.warnCount = 0;
    this.testCount = 0;
    this.pendingCount = 0;
  }
};
var SuiteSummary = class extends SummaryBase {
  constructor() {
    super(...arguments);
    this[_a] = [];
    this[_b] = [];
    this.groups = {};
    this.tests = {};
    this.valid = false;
  }
};
_a = Severity.ERRORS, _b = Severity.WARNINGS;
var SummaryFailure = class _SummaryFailure {
  constructor(fieldName, message, groupName) {
    this.fieldName = fieldName;
    this.message = message;
    this.groupName = groupName;
  }
  static fromTestObject(testObject) {
    const { fieldName, message, groupName } = VestTest.getData(testObject);
    return new _SummaryFailure(fieldName, message, groupName);
  }
};
var TestWalker = class _TestWalker {
  static hasNoTests(root = _TestWalker.defaultRoot()) {
    if (!root)
      return true;
    return !IsolateWalker.has(root, VestTest.is);
  }
  static someTests(predicate, root = _TestWalker.defaultRoot()) {
    if (!root)
      return false;
    return IsolateWalker.some(root, (isolate) => {
      VestTest.isX(isolate);
      return predicate(isolate);
    }, VestTest.is);
  }
  static everyTest(predicate, root = _TestWalker.defaultRoot()) {
    if (!root)
      return false;
    return IsolateWalker.every(root, (isolate) => {
      VestTest.isX(isolate);
      return predicate(isolate);
    }, VestTest.is);
  }
  static walkTests(callback, root = _TestWalker.defaultRoot()) {
    if (!root)
      return;
    IsolateWalker.walk(root, (isolate, breakout) => {
      callback(VestTest.cast(isolate), breakout);
    }, VestTest.is);
  }
  static pluckTests(predicate, root = _TestWalker.defaultRoot()) {
    if (!root)
      return;
    IsolateWalker.pluck(root, (isolate) => {
      VestTest.isX(isolate);
      return predicate(isolate);
    }, VestTest.is);
  }
  static resetField(fieldName) {
    _TestWalker.walkTests((testObject) => {
      if (matchingFieldName(VestTest.getData(testObject), fieldName)) {
        VestTest.reset(testObject);
      }
    }, _TestWalker.defaultRoot());
  }
  static removeTestByFieldName(fieldName, root = _TestWalker.defaultRoot()) {
    _TestWalker.pluckTests((testObject) => {
      return matchingFieldName(VestTest.getData(testObject), fieldName);
    }, root);
  }
};
TestWalker.defaultRoot = RuntimeApi.useAvailableRoot;
var SuiteWalker = class _SuiteWalker {
  static hasPending(predicate) {
    const root = _SuiteWalker.defaultRoot();
    if (!root) {
      return false;
    }
    return IsolateWalker.some(root, Predicates.all(VestIsolate.isPending, predicate !== null && predicate !== void 0 ? predicate : true));
  }
  // Checks whether there are pending isolates in the tree.
  // If a fieldname is provided, will only check tests with a matching fieldname.
  static hasRemainingWithTestNameMatching(fieldName) {
    return _SuiteWalker.hasPending(Predicates.any(isNullish(fieldName), Predicates.all(VestTest.is, (testObject) => {
      return matchesOrHasNoFieldName(VestTest.getData(testObject), fieldName);
    })));
  }
};
SuiteWalker.defaultRoot = RuntimeApi.useAvailableRoot;
var nonMatchingGroupName = bindNot(matchingGroupName);
function matchingGroupName(testObject, groupName) {
  return VestTest.getData(testObject).groupName === groupName;
}
function nonMatchingSeverityProfile(severity, testObject) {
  return either(severity === Severity.WARNINGS, VestTest.warns(testObject));
}
function hasErrorsByTestObjects(fieldName) {
  return hasFailuresByTestObjects(Severity.ERRORS, fieldName);
}
function hasFailuresByTestObjects(severityKey, fieldName) {
  return TestWalker.someTests((testObject) => {
    return hasFailuresByTestObject(testObject, severityKey, fieldName);
  });
}
function hasGroupFailuresByTestObjects(severityKey, groupName, fieldName) {
  return TestWalker.someTests((testObject) => {
    if (nonMatchingGroupName(testObject, groupName)) {
      return false;
    }
    return hasFailuresByTestObject(testObject, severityKey, fieldName);
  });
}
function hasFailuresByTestObject(testObject, severityKey, fieldName) {
  if (!VestTest.hasFailures(testObject)) {
    return false;
  }
  if (nonMatchingFieldName(VestTest.getData(testObject), fieldName)) {
    return false;
  }
  if (nonMatchingSeverityProfile(severityKey, testObject)) {
    return false;
  }
  return true;
}
function useShouldAddValidProperty(fieldName) {
  if (useIsOptionalFieldApplied(fieldName)) {
    return true;
  }
  if (TestWalker.hasNoTests()) {
    return false;
  }
  if (hasErrorsByTestObjects(fieldName)) {
    return false;
  }
  if (useHasNonOptionalIncomplete(fieldName)) {
    return false;
  }
  return useNoMissingTests(fieldName);
}
function useShouldAddValidPropertyInGroup(groupName, fieldName) {
  if (useIsOptionalFieldApplied(fieldName)) {
    return true;
  }
  if (hasGroupFailuresByTestObjects(Severity.ERRORS, groupName, fieldName)) {
    return false;
  }
  if (useHasNonOptionalIncompleteByGroup(groupName, fieldName)) {
    return false;
  }
  return useNoMissingTestsByGroup(groupName, fieldName);
}
function useHasNonOptionalIncomplete(fieldName) {
  return SuiteWalker.hasPending(Predicates.all(VestTest.is, (testObject) => !nonMatchingFieldName(VestTest.getData(testObject), fieldName), () => !useIsOptionalFieldApplied(fieldName)));
}
function useHasNonOptionalIncompleteByGroup(groupName, fieldName) {
  return SuiteWalker.hasPending(Predicates.all(VestTest.is, (testObject) => !nonMatchingGroupName(testObject, groupName), (testObject) => !nonMatchingFieldName(VestTest.getData(testObject), fieldName), () => !useIsOptionalFieldApplied(fieldName)));
}
function useNoMissingTests(fieldName) {
  return TestWalker.everyTest((testObject) => {
    return useNoMissingTestsLogic(testObject, fieldName);
  });
}
function useNoMissingTestsByGroup(groupName, fieldName) {
  return TestWalker.everyTest((testObject) => {
    if (nonMatchingGroupName(testObject, groupName)) {
      return true;
    }
    return useNoMissingTestsLogic(testObject, fieldName);
  });
}
function useNoMissingTestsLogic(testObject, fieldName) {
  if (nonMatchingFieldName(VestTest.getData(testObject), fieldName)) {
    return true;
  }
  return VestTest.isOmitted(testObject) || VestTest.isTested(testObject) || useOptionalTestAwaitsResolution(testObject);
}
function useOptionalTestAwaitsResolution(testObject) {
  const root = RuntimeApi.useAvailableRoot();
  const { fieldName } = VestTest.getData(testObject);
  return SuiteOptionalFields.getOptionalField(root, fieldName).type === OptionalFieldTypes.AUTO && VestTest.awaitsResolution(testObject);
}
function useProduceSuiteSummary() {
  const summary = new SuiteSummary();
  TestWalker.walkTests((testObject) => {
    summary.tests = useAppendToTest(summary.tests, testObject);
    summary.groups = useAppendToGroup(summary.groups, testObject);
    summary.errors = appendFailures(Severity.ERRORS, summary.errors, testObject);
    summary.warnings = appendFailures(Severity.WARNINGS, summary.warnings, testObject);
  });
  summary.valid = useShouldAddValidProperty();
  return countOverallStates(summary);
}
function appendFailures(key, failures, testObject) {
  if (VestTest.isOmitted(testObject)) {
    return failures;
  }
  const shouldAppend = key === Severity.WARNINGS ? VestTest.isWarning(testObject) : VestTest.isFailing(testObject);
  if (shouldAppend) {
    return failures.concat(SummaryFailure.fromTestObject(testObject));
  }
  return failures;
}
function useAppendToTest(tests, testObject) {
  const fieldName = VestTest.getData(testObject).fieldName;
  const newTests = Object.assign({}, tests);
  newTests[fieldName] = appendTestObject(newTests[fieldName], testObject);
  newTests[fieldName].valid = newTests[fieldName].valid === false ? false : useShouldAddValidProperty(fieldName);
  return newTests;
}
function useAppendToGroup(groups, testObject) {
  const { groupName, fieldName } = VestTest.getData(testObject);
  if (!groupName) {
    return groups;
  }
  const newGroups = Object.assign({}, groups);
  newGroups[groupName] = newGroups[groupName] || {};
  newGroups[groupName][fieldName] = appendTestObject(newGroups[groupName][fieldName], testObject);
  newGroups[groupName][fieldName].valid = newGroups[groupName][fieldName].valid === false ? false : useShouldAddValidPropertyInGroup(groupName, fieldName);
  return newGroups;
}
function countOverallStates(summary) {
  for (const test2 in summary.tests) {
    summary.errorCount += summary.tests[test2].errorCount;
    summary.warnCount += summary.tests[test2].warnCount;
    summary.testCount += summary.tests[test2].testCount;
    summary.pendingCount += summary.tests[test2].pendingCount;
  }
  return summary;
}
function appendTestObject(summaryKey, testObject) {
  const { message } = VestTest.getData(testObject);
  const nextSummaryKey = defaultTo(summaryKey ? Object.assign({}, summaryKey) : null, baseTestStats);
  if (VestTest.isNonActionable(testObject))
    return nextSummaryKey;
  if (VestTest.isPending(testObject)) {
    nextSummaryKey.pendingCount++;
  }
  if (VestTest.isFailing(testObject)) {
    incrementFailures(Severity.ERRORS);
  } else if (VestTest.isWarning(testObject)) {
    incrementFailures(Severity.WARNINGS);
  }
  nextSummaryKey.testCount++;
  return nextSummaryKey;
  function incrementFailures(severity) {
    const countKey = countKeyBySeverity(severity);
    nextSummaryKey[countKey]++;
    if (message) {
      nextSummaryKey[severity] = (nextSummaryKey[severity] || []).concat(message);
    }
  }
}
function baseTestStats() {
  return assign(new SummaryBase(), {
    errors: [],
    valid: true,
    warnings: []
  });
}
function useCreateSuiteResult() {
  return useSuiteResultCache(() => {
    const summary = useProduceSuiteSummary();
    const suiteName = useSuiteName();
    return Object.freeze(assign(summary, suiteSelectors(summary), {
      suiteName
    }));
  });
}
function skipWhen(condition, callback) {
  Isolate.create(VestIsolateType.SkipWhen, () => {
    SuiteContext.run({
      skipped: (
        // Checking for nested conditional. If we're in a nested skipWhen,
        // we should skip the test if the parent conditional is true.
        useIsExcludedIndividually() || // Otherwise, we should skip the test if the conditional is true.
        optionalFunctionValue(condition, optionalFunctionValue(useCreateSuiteResult))
      )
    }, callback);
  });
}
function useIsExcludedIndividually() {
  return useSkipped();
}
function useHasOnliedTests(testObject, fieldName) {
  return isNotNullish(IsolateWalker.findClosest(testObject, (child) => {
    if (!FocusSelectors.isIsolateFocused(child))
      return false;
    return FocusSelectors.isOnlyFocused(child, fieldName);
  }));
}
function useClosestMatchingFocus(testObject) {
  return IsolateWalker.findClosest(testObject, (child) => {
    var _a2;
    if (!FocusSelectors.isIsolateFocused(child))
      return false;
    const { fieldName } = VestTest.getData(testObject);
    return ((_a2 = child.data.match) === null || _a2 === void 0 ? void 0 : _a2.includes(fieldName)) || child.data.matchAll;
  });
}
function useIsExcluded(testObject) {
  const { fieldName } = VestTest.getData(testObject);
  if (useIsExcludedIndividually())
    return true;
  const inclusion = useInclusion();
  const focusMatch = useClosestMatchingFocus(testObject);
  if (FocusSelectors.isSkipFocused(focusMatch))
    return true;
  const isTestIncluded = FocusSelectors.isOnlyFocused(focusMatch);
  if (isTestIncluded)
    return false;
  if (useHasOnliedTests(testObject)) {
    return !optionalFunctionValue(inclusion[fieldName], testObject);
  }
  return false;
}
function mode(mode2) {
  const [, setMode] = useMode();
  setMode(mode2);
}
function useIsMode(mode2) {
  const [currentMode] = useMode();
  return currentMode === mode2;
}
function useIsEager() {
  return useIsMode(Modes.EAGER);
}
function useIsOne() {
  return useIsMode(Modes.ONE);
}
function useShouldSkipBasedOnMode(testData) {
  if (useIsOne()) {
    return hasErrorsByTestObjects();
  }
  if (useIsEager()) {
    return hasErrorsByTestObjects(testData.fieldName);
  }
  return false;
}
function omitWhen(conditional, callback) {
  Isolate.create(VestIsolateType.OmitWhen, () => {
    SuiteContext.run({
      omitted: useWithinActiveOmitWhen() || optionalFunctionValue(conditional, optionalFunctionValue(useCreateSuiteResult))
    }, callback);
  });
}
function useWithinActiveOmitWhen() {
  return useOmitted();
}
function useVerifyTestRun(testObject, collisionResult = testObject) {
  const testData = VestTest.getData(testObject);
  if (useShouldSkipBasedOnMode(testData)) {
    return skipTestAndReturn(testObject);
  }
  if (useShouldOmit(testData.fieldName)) {
    return omitTestAndReturn(testObject);
  }
  if (useIsExcluded(testObject)) {
    return useForceSkipIfInSkipWhen(collisionResult);
  }
  return testObject;
}
function useShouldOmit(fieldName) {
  return useWithinActiveOmitWhen() || useIsOptionalFieldApplied(fieldName);
}
function skipTestAndReturn(testNode) {
  VestTest.skip(testNode);
  return testNode;
}
function omitTestAndReturn(testNode) {
  VestTest.omit(testNode);
  return testNode;
}
function useForceSkipIfInSkipWhen(testNode) {
  VestTest.skip(testNode, useIsExcludedIndividually());
  return testNode;
}
var IsolateTestReconciler = class {
  static match(currentNode, historyNode) {
    return VestTest.is(currentNode) && VestTest.is(historyNode);
  }
  static reconcile(currentNode, historyNode) {
    const reconcilerOutput = usePickNode(currentNode, historyNode);
    const nextNode = useVerifyTestRun(currentNode, reconcilerOutput);
    cancelOverriddenPendingTestOnTestReRun(nextNode, currentNode, historyNode);
    return nextNode;
  }
};
function usePickNode(newNode, prevNode) {
  if (IsolateInspector.usesKey(newNode)) {
    return useHandleTestWithKey(newNode);
  }
  if (Reconciler.dropNextNodesOnReorder(nodeReorderDetected, newNode, prevNode)) {
    throwTestOrderError(newNode, prevNode);
    return newNode;
  }
  if (!VestTest.is(prevNode)) {
    return newNode;
  }
  if (VestTest.isOmitted(prevNode)) {
    return newNode;
  }
  return prevNode;
}
function useHandleTestWithKey(newNode) {
  return VestTest.cast(Reconciler.handleIsolateNodeWithKey(newNode, (prevNode) => {
    if (VestTest.isNonActionable(prevNode)) {
      return true;
    }
    if (useIsExcluded(newNode)) {
      return false;
    }
    return true;
  }));
}
function cancelOverriddenPendingTestOnTestReRun(nextNode, currentNode, prevTestObject) {
  if (nextNode === currentNode && VestTest.is(currentNode)) {
    cancelOverriddenPendingTest(prevTestObject, currentNode);
  }
}
function nodeReorderDetected(newNode, prevNode) {
  return VestTest.is(prevNode) && !isSameProfileTest(prevNode, newNode);
}
function throwTestOrderError(newNode, prevNode) {
  if (IsolateInspector.canReorder(newNode)) {
    return;
  }
  deferThrow(text(ErrorStrings2.TESTS_CALLED_IN_DIFFERENT_ORDER, {
    fieldName: VestTest.getData(newNode).fieldName,
    prevName: VestTest.is(prevNode) ? VestTest.getData(prevNode).fieldName : void 0
  }));
}
var reconcilers = [IsolateTestReconciler];
function registerReconciler(reconciler) {
  if (reconcilers.includes(reconciler)) {
    return;
  }
  reconcilers.push(reconciler);
}
function VestReconciler(currentNode, historyNode) {
  var _a2, _b2;
  return (_b2 = (_a2 = reconcilers.find((reconciler) => reconciler.match(currentNode, historyNode))) === null || _a2 === void 0 ? void 0 : _a2.reconcile(currentNode, historyNode)) !== null && _b2 !== void 0 ? _b2 : null;
}
function group(...args) {
  const [callback, groupName] = args.reverse();
  return Isolate.create(VestIsolateType.Group, () => {
    return SuiteContext.run(Object.assign({}, groupName && { groupName }), callback);
  });
}
function include(fieldName) {
  invariant(isStringValue(fieldName));
  const inclusion = useInclusion();
  inclusion[fieldName] = true;
  return { when };
  function when(condition) {
    invariant(condition !== fieldName, ErrorStrings2.INCLUDE_SELF);
    const inclusion2 = useInclusion();
    inclusion2[fieldName] = function isIncluded(currentNode) {
      if (isStringValue(condition)) {
        return useHasOnliedTests(currentNode, condition);
      }
      return optionalFunctionValue(condition, optionalFunctionValue(useCreateSuiteResult));
    };
  }
}
var Events;
(function(Events2) {
  Events2["TEST_RUN_STARTED"] = "test_run_started";
  Events2["TEST_COMPLETED"] = "test_completed";
  Events2["ALL_RUNNING_TESTS_FINISHED"] = "all_running_tests_finished";
  Events2["REMOVE_FIELD"] = "remove_field";
  Events2["RESET_FIELD"] = "reset_field";
  Events2["RESET_SUITE"] = "reset_suite";
  Events2["SUITE_RUN_STARTED"] = "suite_run_started";
  Events2["SUITE_CALLBACK_RUN_FINISHED"] = "SUITE_CALLBACK_RUN_FINISHED";
  Events2["DONE_TEST_OMISSION_PASS"] = "DONE_TEST_OMISSION_PASS";
})(Events || (Events = {}));
function IsolateTest(callback, input, key) {
  const payload = Object.assign(Object.assign({}, IsolateTestBase()), { fieldName: input.fieldName, testFn: input.testFn });
  if (input.groupName) {
    payload.groupName = input.groupName;
  }
  if (input.message) {
    payload.message = input.message;
  }
  const isolate = Isolate.create(VestIsolateType.Test, callback, payload, key !== null && key !== void 0 ? key : null);
  return isolate;
}
function IsolateTestBase() {
  return {
    severity: TestSeverity.Error,
    status: IsolateTestStateMachine.initial()
  };
}
function shouldUseErrorAsMessage(message, error) {
  return isUndefined(message) && isStringValue(error);
}
function useAttemptRunTest(testObject) {
  useVerifyTestRun(testObject);
  if (VestTest.isUntested(testObject)) {
    return useRunTest(testObject);
  }
  if (!VestTest.isNonActionable(testObject)) {
    deferThrow(text(ErrorStrings2.UNEXPECTED_TEST_REGISTRATION_ERROR, {
      testObject: JSON.stringify(testObject)
    }));
  }
}
function runSyncTest(testObject) {
  return SuiteContext.run({ currentTest: testObject }, () => {
    let result;
    const { message, testFn } = VestTest.getData(testObject);
    try {
      result = testFn({ signal: testObject.abortController.signal });
    } catch (error) {
      if (shouldUseErrorAsMessage(message, error)) {
        VestTest.getData(testObject).message = error;
      }
      result = false;
    }
    if (result === false) {
      VestTest.fail(testObject);
    }
    return result;
  });
}
function useRunTest(testObject) {
  const result = runSyncTest(testObject);
  try {
    if (isPromise(result)) {
      VestTest.getData(testObject).asyncTest = result;
      return useRunAsyncTest(testObject);
    }
    onTestCompleted(testObject);
  } catch (e) {
    throw new Error(text(ErrorStrings2.UNEXPECTED_TEST_REGISTRATION_ERROR, {
      testObject: JSON.stringify(testObject),
      error: e
    }));
  }
}
function useRunAsyncTest(testObject) {
  const { asyncTest, message } = VestTest.getData(testObject);
  if (!isPromise(asyncTest))
    return;
  const done2 = RuntimeApi.persist(() => {
    onTestCompleted(testObject);
  });
  const fail = RuntimeApi.persist((rejectionMessage) => {
    if (VestTest.isCanceled(testObject)) {
      return;
    }
    VestTest.getData(testObject).message = isStringValue(rejectionMessage) ? rejectionMessage : message;
    VestTest.fail(testObject);
    done2();
  });
  return asyncTest.then(done2, fail);
}
function onTestCompleted(testObject) {
  VestTest.pass(testObject);
}
function wrapTestMemo(test2) {
  function memo(fieldName, ...args) {
    const [deps, testFn, msg] = args.reverse();
    const dependencies = [
      useSuiteId(),
      fieldName,
      RuntimeApi.useCurrentCursor()
    ].concat(deps);
    return useGetTestFromCache(dependencies, cacheAction);
    function cacheAction() {
      return test2(fieldName, msg, testFn);
    }
  }
  return memo;
}
function useGetTestFromCache(dependencies, cacheAction) {
  const cache = useTestMemoCache();
  const cached = cache.get(dependencies);
  if (isNull(cached)) {
    return cache(dependencies, cacheAction);
  }
  const [, cachedValue] = cached;
  if (VestTest.isCanceled(cachedValue)) {
    cache.invalidate(dependencies);
    return cache(dependencies, cacheAction);
  }
  RuntimeApi.addNodeToHistory(cachedValue);
  return cachedValue;
}
function vestTest(fieldName, ...args) {
  const [message, testFn, key] = isFunction(args[1]) ? args : [void 0, ...args];
  validateTestParams(fieldName, testFn);
  const groupName = useGroupName();
  const testObjectInput = { fieldName, groupName, message, testFn };
  Bus.useEmit(Events.TEST_RUN_STARTED);
  return IsolateTest(useAttemptRunTest, testObjectInput, key);
}
var test = assign(vestTest, {
  memo: wrapTestMemo(vestTest)
});
function validateTestParams(fieldName, testFn) {
  const fnName = "test";
  invariant(isStringValue(fieldName), text(ErrorStrings2.INVALID_PARAM_PASSED_TO_FUNCTION, {
    fn_name: fnName,
    param: "fieldName",
    expected: "string"
  }));
  invariant(isFunction(testFn), text(ErrorStrings2.INVALID_PARAM_PASSED_TO_FUNCTION, {
    fn_name: fnName,
    param: "callback",
    expected: "function"
  }));
}
function getTypedMethods() {
  return {
    group,
    include,
    omitWhen,
    only,
    optional,
    skip,
    skipWhen,
    test
  };
}
function useOmitOptionalFields() {
  const root = RuntimeApi.useAvailableRoot();
  const optionalFields = SuiteOptionalFields.getOptionalFields(root);
  if (isEmpty(optionalFields)) {
    return;
  }
  const shouldOmit = /* @__PURE__ */ new Set();
  TestWalker.walkTests((testObject) => {
    if (VestTest.isPending(testObject)) {
      return;
    }
    const { fieldName } = VestTest.getData(testObject);
    if (shouldOmit.has(fieldName)) {
      verifyAndOmit(testObject);
    } else {
      runOptionalConfig(testObject);
    }
  });
  Bus.useEmit(Events.DONE_TEST_OMISSION_PASS);
  function verifyAndOmit(testObject) {
    const { fieldName } = VestTest.getData(testObject);
    if (shouldOmit.has(fieldName)) {
      VestTest.omit(testObject);
      SuiteOptionalFields.setOptionalField(root, fieldName, (current) => Object.assign(Object.assign({}, current), { applied: true }));
    }
  }
  function runOptionalConfig(testObject) {
    const { fieldName } = VestTest.getData(testObject);
    const optionalConfig = SuiteOptionalFields.getOptionalField(root, fieldName);
    if (optionalFunctionValue(optionalConfig.rule) === true) {
      shouldOmit.add(fieldName);
    }
    verifyAndOmit(testObject);
  }
}
function useRunFieldCallbacks(fieldName) {
  const [fieldCallbacks] = useFieldCallbacks();
  if (fieldName && !SuiteWalker.hasRemainingWithTestNameMatching(fieldName) && isArray(fieldCallbacks[fieldName])) {
    callEach(fieldCallbacks[fieldName]);
  }
}
function useRunDoneCallbacks() {
  const [doneCallbacks] = useDoneCallbacks();
  callEach(doneCallbacks);
}
function useInitVestBus() {
  const VestBus = Bus.useBus();
  on(Events.TEST_COMPLETED, (testObject) => {
    if (VestTest.isCanceled(testObject)) {
      return;
    }
    const { fieldName } = VestTest.getData(testObject);
    useRunFieldCallbacks(fieldName);
  });
  on(Events.TEST_RUN_STARTED, () => {
  });
  on(RuntimeEvents.ISOLATE_PENDING, (isolate) => {
    if (VestTest.is(isolate)) {
      VestTest.setPending(isolate);
    }
    setPending(isolate);
  });
  on(RuntimeEvents.ISOLATE_DONE, (isolate) => {
    if (VestTest.is(isolate)) {
      VestBus.emit(Events.TEST_COMPLETED, isolate);
    }
    setDone(isolate);
    if (!SuiteWalker.hasPending()) {
      VestBus.emit(Events.ALL_RUNNING_TESTS_FINISHED);
    }
  });
  on(Events.DONE_TEST_OMISSION_PASS, () => {
  });
  on(Events.ALL_RUNNING_TESTS_FINISHED, () => {
    if (TestWalker.someTests(VestTest.isAsyncTest)) {
      useOmitOptionalFields();
    }
    useRunDoneCallbacks();
  });
  on(Events.RESET_FIELD, (fieldName) => {
    TestWalker.resetField(fieldName);
  });
  on(Events.SUITE_RUN_STARTED, () => {
    useResetCallbacks();
  });
  on(Events.SUITE_CALLBACK_RUN_FINISHED, () => {
    useOmitOptionalFields();
  });
  on(Events.REMOVE_FIELD, (fieldName) => {
    TestWalker.removeTestByFieldName(fieldName);
  });
  on(Events.RESET_SUITE, () => {
    useResetSuite();
  });
  return {
    subscribe
  };
  function subscribe(cb) {
    return VestBus.on("*", () => {
      cb();
    }).off;
  }
  function on(event, cb) {
    VestBus.on(event, (...args) => {
      useExpireSuiteResultCache();
      cb(...args);
    });
  }
}
function useDeferDoneCallback(doneCallback, fieldName) {
  const [, setFieldCallbacks] = useFieldCallbacks();
  const [, setDoneCallbacks] = useDoneCallbacks();
  if (fieldName) {
    setFieldCallbacks((fieldCallbacks) => assign(fieldCallbacks, {
      [fieldName]: (fieldCallbacks[fieldName] || []).concat(doneCallback)
    }));
    return;
  }
  setDoneCallbacks((doneCallbacks) => doneCallbacks.concat(doneCallback));
}
function shouldSkipDoneRegistration(callback, fieldName, output) {
  var _a2, _b2;
  return !!(!isFunction(callback) || fieldName && numberEquals((_b2 = (_a2 = output.tests[fieldName]) === null || _a2 === void 0 ? void 0 : _a2.testCount) !== null && _b2 !== void 0 ? _b2 : 0, 0));
}
function useSuiteRunResult() {
  return Object.freeze(assign({
    done: RuntimeApi.persist(done)
  }, useCreateSuiteResult()));
}
function done(...args) {
  const [callback, fieldName] = args.reverse();
  const output = useSuiteRunResult();
  if (shouldSkipDoneRegistration(callback, fieldName, output)) {
    return output;
  }
  const useDoneCallback = () => callback(useCreateSuiteResult());
  if (!SuiteWalker.hasRemainingWithTestNameMatching(fieldName)) {
    useDoneCallback();
    return output;
  }
  useDeferDoneCallback(useDoneCallback, fieldName);
  return output;
}
function validateSuiteCallback(suiteCallback) {
  invariant(isFunction(suiteCallback), ErrorStrings2.SUITE_MUST_BE_INITIALIZED_WITH_FUNCTION);
}
function createSuite(...args) {
  const [suiteCallback, suiteName] = args.reverse();
  validateSuiteCallback(suiteCallback);
  const stateRef = useCreateVestState({ suiteName, VestReconciler });
  function suite(...args2) {
    return SuiteContext.run({
      suiteParams: args2
    }, () => {
      Bus.useEmit(Events.SUITE_RUN_STARTED);
      return IsolateSuite(useRunSuiteCallback(suiteCallback, ...args2));
    }).output;
  }
  const mountedStatic = staticSuite(...args);
  return RuntimeApi.Run(stateRef, () => {
    const VestBus = useInitVestBus();
    return assign(
      // We're also binding the suite to the stateRef, so that the suite
      // can access the stateRef when it's called.
      RuntimeApi.persist(suite),
      Object.assign(Object.assign({ dump: RuntimeApi.persist(() => RuntimeApi.useAvailableRoot()), get: RuntimeApi.persist(useCreateSuiteResult), remove: Bus.usePrepareEmitter(Events.REMOVE_FIELD), reset: Bus.usePrepareEmitter(Events.RESET_SUITE), resetField: Bus.usePrepareEmitter(Events.RESET_FIELD), resume: RuntimeApi.persist(useLoadSuite), runStatic: (...args2) => mountedStatic(...args2), subscribe: VestBus.subscribe }, bindSuiteSelectors(RuntimeApi.persist(useCreateSuiteResult))), getTypedMethods())
    );
  });
}
function useRunSuiteCallback(suiteCallback, ...args) {
  const emit = Bus.useEmit();
  return () => {
    suiteCallback(...args);
    emit(Events.SUITE_CALLBACK_RUN_FINISHED);
    return useSuiteRunResult();
  };
}
function staticSuite(...createArgs) {
  return assign((...args) => {
    const suite = createSuite(...createArgs);
    const result = suite(...args);
    return Object.freeze(assign({
      dump: suite.dump
    }, result));
  }, Object.assign({}, getTypedMethods()));
}
function IsolateEach(callback) {
  return Isolate.create(VestIsolateType.Each, callback, {
    allowReorder: true
  });
}
function each(list, callback) {
  invariant(isFunction(callback), ErrorStrings2.EACH_CALLBACK_MUST_BE_A_FUNCTION);
  IsolateEach(() => {
    list.forEach((arg, index) => {
      callback(arg, index);
    });
  });
}
var ERROR_OUTSIDE_OF_TEST = ErrorStrings2.WARN_MUST_BE_CALLED_FROM_TEST;
function warn() {
  const currentTest = useCurrentTest(ErrorStrings2.HOOK_CALLED_OUTSIDE);
  invariant(currentTest, ERROR_OUTSIDE_OF_TEST);
  VestTest.warn(currentTest);
}
export {
  Modes,
  createSuite as create,
  each,
  enforce,
  group,
  include,
  mode,
  omitWhen,
  only,
  optional,
  registerReconciler,
  skip,
  skipWhen,
  staticSuite,
  suiteSelectors,
  test,
  warn
};
//# sourceMappingURL=vest.js.map
