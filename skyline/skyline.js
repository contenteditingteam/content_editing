var Vu = { exports: {} }, fo = {}, $u = { exports: {} }, te = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mc;
function td() {
  if (mc) return te;
  mc = 1;
  var m = Symbol.for("react.element"), v = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), F = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), B = Symbol.for("react.provider"), $ = Symbol.for("react.context"), H = Symbol.for("react.forward_ref"), j = Symbol.for("react.suspense"), oe = Symbol.for("react.memo"), ne = Symbol.for("react.lazy"), Q = Symbol.iterator;
  function se(f) {
    return f === null || typeof f != "object" ? null : (f = Q && f[Q] || f["@@iterator"], typeof f == "function" ? f : null);
  }
  var Ve = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, Ze = Object.assign, ge = {};
  function we(f, y, G) {
    this.props = f, this.context = y, this.refs = ge, this.updater = G || Ve;
  }
  we.prototype.isReactComponent = {}, we.prototype.setState = function(f, y) {
    if (typeof f != "object" && typeof f != "function" && f != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, f, y, "setState");
  }, we.prototype.forceUpdate = function(f) {
    this.updater.enqueueForceUpdate(this, f, "forceUpdate");
  };
  function De() {
  }
  De.prototype = we.prototype;
  function Ot(f, y, G) {
    this.props = f, this.context = y, this.refs = ge, this.updater = G || Ve;
  }
  var Et = Ot.prototype = new De();
  Et.constructor = Ot, Ze(Et, we.prototype), Et.isPureReactComponent = !0;
  var Je = Array.isArray, Ct = Object.prototype.hasOwnProperty, ke = { current: null }, at = { key: !0, ref: !0, __self: !0, __source: !0 };
  function _t(f, y, G) {
    var X, b = {}, re = null, ie = null;
    if (y != null) for (X in y.ref !== void 0 && (ie = y.ref), y.key !== void 0 && (re = "" + y.key), y) Ct.call(y, X) && !at.hasOwnProperty(X) && (b[X] = y[X]);
    var pe = arguments.length - 2;
    if (pe === 1) b.children = G;
    else if (1 < pe) {
      for (var Se = Array(pe), wt = 0; wt < pe; wt++) Se[wt] = arguments[wt + 2];
      b.children = Se;
    }
    if (f && f.defaultProps) for (X in pe = f.defaultProps, pe) b[X] === void 0 && (b[X] = pe[X]);
    return { $$typeof: m, type: f, key: re, ref: ie, props: b, _owner: ke.current };
  }
  function gt(f, y) {
    return { $$typeof: m, type: f.type, key: y, ref: f.ref, props: f.props, _owner: f._owner };
  }
  function ln(f) {
    return typeof f == "object" && f !== null && f.$$typeof === m;
  }
  function Nt(f) {
    var y = { "=": "=0", ":": "=2" };
    return "$" + f.replace(/[=:]/g, function(G) {
      return y[G];
    });
  }
  var At = /\/+/g;
  function ct(f, y) {
    return typeof f == "object" && f !== null && f.key != null ? Nt("" + f.key) : y.toString(36);
  }
  function Pt(f, y, G, X, b) {
    var re = typeof f;
    (re === "undefined" || re === "boolean") && (f = null);
    var ie = !1;
    if (f === null) ie = !0;
    else switch (re) {
      case "string":
      case "number":
        ie = !0;
        break;
      case "object":
        switch (f.$$typeof) {
          case m:
          case v:
            ie = !0;
        }
    }
    if (ie) return ie = f, b = b(ie), f = X === "" ? "." + ct(ie, 0) : X, Je(b) ? (G = "", f != null && (G = f.replace(At, "$&/") + "/"), Pt(b, y, G, "", function(wt) {
      return wt;
    })) : b != null && (ln(b) && (b = gt(b, G + (!b.key || ie && ie.key === b.key ? "" : ("" + b.key).replace(At, "$&/") + "/") + f)), y.push(b)), 1;
    if (ie = 0, X = X === "" ? "." : X + ":", Je(f)) for (var pe = 0; pe < f.length; pe++) {
      re = f[pe];
      var Se = X + ct(re, pe);
      ie += Pt(re, y, G, Se, b);
    }
    else if (Se = se(f), typeof Se == "function") for (f = Se.call(f), pe = 0; !(re = f.next()).done; ) re = re.value, Se = X + ct(re, pe++), ie += Pt(re, y, G, Se, b);
    else if (re === "object") throw y = String(f), Error("Objects are not valid as a React child (found: " + (y === "[object Object]" ? "object with keys {" + Object.keys(f).join(", ") + "}" : y) + "). If you meant to render a collection of children, use an array instead.");
    return ie;
  }
  function Be(f, y, G) {
    if (f == null) return f;
    var X = [], b = 0;
    return Pt(f, X, "", "", function(re) {
      return y.call(G, re, b++);
    }), X;
  }
  function rt(f) {
    if (f._status === -1) {
      var y = f._result;
      y = y(), y.then(function(G) {
        (f._status === 0 || f._status === -1) && (f._status = 1, f._result = G);
      }, function(G) {
        (f._status === 0 || f._status === -1) && (f._status = 2, f._result = G);
      }), f._status === -1 && (f._status = 0, f._result = y);
    }
    if (f._status === 1) return f._result.default;
    throw f._result;
  }
  var xe = { current: null }, E = { transition: null }, O = { ReactCurrentDispatcher: xe, ReactCurrentBatchConfig: E, ReactCurrentOwner: ke };
  function N() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return te.Children = { map: Be, forEach: function(f, y, G) {
    Be(f, function() {
      y.apply(this, arguments);
    }, G);
  }, count: function(f) {
    var y = 0;
    return Be(f, function() {
      y++;
    }), y;
  }, toArray: function(f) {
    return Be(f, function(y) {
      return y;
    }) || [];
  }, only: function(f) {
    if (!ln(f)) throw Error("React.Children.only expected to receive a single React element child.");
    return f;
  } }, te.Component = we, te.Fragment = c, te.Profiler = T, te.PureComponent = Ot, te.StrictMode = F, te.Suspense = j, te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = O, te.act = N, te.cloneElement = function(f, y, G) {
    if (f == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + f + ".");
    var X = Ze({}, f.props), b = f.key, re = f.ref, ie = f._owner;
    if (y != null) {
      if (y.ref !== void 0 && (re = y.ref, ie = ke.current), y.key !== void 0 && (b = "" + y.key), f.type && f.type.defaultProps) var pe = f.type.defaultProps;
      for (Se in y) Ct.call(y, Se) && !at.hasOwnProperty(Se) && (X[Se] = y[Se] === void 0 && pe !== void 0 ? pe[Se] : y[Se]);
    }
    var Se = arguments.length - 2;
    if (Se === 1) X.children = G;
    else if (1 < Se) {
      pe = Array(Se);
      for (var wt = 0; wt < Se; wt++) pe[wt] = arguments[wt + 2];
      X.children = pe;
    }
    return { $$typeof: m, type: f.type, key: b, ref: re, props: X, _owner: ie };
  }, te.createContext = function(f) {
    return f = { $$typeof: $, _currentValue: f, _currentValue2: f, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, f.Provider = { $$typeof: B, _context: f }, f.Consumer = f;
  }, te.createElement = _t, te.createFactory = function(f) {
    var y = _t.bind(null, f);
    return y.type = f, y;
  }, te.createRef = function() {
    return { current: null };
  }, te.forwardRef = function(f) {
    return { $$typeof: H, render: f };
  }, te.isValidElement = ln, te.lazy = function(f) {
    return { $$typeof: ne, _payload: { _status: -1, _result: f }, _init: rt };
  }, te.memo = function(f, y) {
    return { $$typeof: oe, type: f, compare: y === void 0 ? null : y };
  }, te.startTransition = function(f) {
    var y = E.transition;
    E.transition = {};
    try {
      f();
    } finally {
      E.transition = y;
    }
  }, te.unstable_act = N, te.useCallback = function(f, y) {
    return xe.current.useCallback(f, y);
  }, te.useContext = function(f) {
    return xe.current.useContext(f);
  }, te.useDebugValue = function() {
  }, te.useDeferredValue = function(f) {
    return xe.current.useDeferredValue(f);
  }, te.useEffect = function(f, y) {
    return xe.current.useEffect(f, y);
  }, te.useId = function() {
    return xe.current.useId();
  }, te.useImperativeHandle = function(f, y, G) {
    return xe.current.useImperativeHandle(f, y, G);
  }, te.useInsertionEffect = function(f, y) {
    return xe.current.useInsertionEffect(f, y);
  }, te.useLayoutEffect = function(f, y) {
    return xe.current.useLayoutEffect(f, y);
  }, te.useMemo = function(f, y) {
    return xe.current.useMemo(f, y);
  }, te.useReducer = function(f, y, G) {
    return xe.current.useReducer(f, y, G);
  }, te.useRef = function(f) {
    return xe.current.useRef(f);
  }, te.useState = function(f) {
    return xe.current.useState(f);
  }, te.useSyncExternalStore = function(f, y, G) {
    return xe.current.useSyncExternalStore(f, y, G);
  }, te.useTransition = function() {
    return xe.current.useTransition();
  }, te.version = "18.3.1", te;
}
var hc;
function ns() {
  return hc || (hc = 1, $u.exports = td()), $u.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vc;
function nd() {
  if (vc) return fo;
  vc = 1;
  var m = ns(), v = Symbol.for("react.element"), c = Symbol.for("react.fragment"), F = Object.prototype.hasOwnProperty, T = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, B = { key: !0, ref: !0, __self: !0, __source: !0 };
  function $(H, j, oe) {
    var ne, Q = {}, se = null, Ve = null;
    oe !== void 0 && (se = "" + oe), j.key !== void 0 && (se = "" + j.key), j.ref !== void 0 && (Ve = j.ref);
    for (ne in j) F.call(j, ne) && !B.hasOwnProperty(ne) && (Q[ne] = j[ne]);
    if (H && H.defaultProps) for (ne in j = H.defaultProps, j) Q[ne] === void 0 && (Q[ne] = j[ne]);
    return { $$typeof: v, type: H, key: se, ref: Ve, props: Q, _owner: T.current };
  }
  return fo.Fragment = c, fo.jsx = $, fo.jsxs = $, fo;
}
var yc;
function rd() {
  return yc || (yc = 1, Vu.exports = nd()), Vu.exports;
}
var _ = rd(), vi = {}, Qu = { exports: {} }, It = {}, Ku = { exports: {} }, Yu = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gc;
function ld() {
  return gc || (gc = 1, (function(m) {
    function v(E, O) {
      var N = E.length;
      E.push(O);
      e: for (; 0 < N; ) {
        var f = N - 1 >>> 1, y = E[f];
        if (0 < T(y, O)) E[f] = O, E[N] = y, N = f;
        else break e;
      }
    }
    function c(E) {
      return E.length === 0 ? null : E[0];
    }
    function F(E) {
      if (E.length === 0) return null;
      var O = E[0], N = E.pop();
      if (N !== O) {
        E[0] = N;
        e: for (var f = 0, y = E.length, G = y >>> 1; f < G; ) {
          var X = 2 * (f + 1) - 1, b = E[X], re = X + 1, ie = E[re];
          if (0 > T(b, N)) re < y && 0 > T(ie, b) ? (E[f] = ie, E[re] = N, f = re) : (E[f] = b, E[X] = N, f = X);
          else if (re < y && 0 > T(ie, N)) E[f] = ie, E[re] = N, f = re;
          else break e;
        }
      }
      return O;
    }
    function T(E, O) {
      var N = E.sortIndex - O.sortIndex;
      return N !== 0 ? N : E.id - O.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var B = performance;
      m.unstable_now = function() {
        return B.now();
      };
    } else {
      var $ = Date, H = $.now();
      m.unstable_now = function() {
        return $.now() - H;
      };
    }
    var j = [], oe = [], ne = 1, Q = null, se = 3, Ve = !1, Ze = !1, ge = !1, we = typeof setTimeout == "function" ? setTimeout : null, De = typeof clearTimeout == "function" ? clearTimeout : null, Ot = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Et(E) {
      for (var O = c(oe); O !== null; ) {
        if (O.callback === null) F(oe);
        else if (O.startTime <= E) F(oe), O.sortIndex = O.expirationTime, v(j, O);
        else break;
        O = c(oe);
      }
    }
    function Je(E) {
      if (ge = !1, Et(E), !Ze) if (c(j) !== null) Ze = !0, rt(Ct);
      else {
        var O = c(oe);
        O !== null && xe(Je, O.startTime - E);
      }
    }
    function Ct(E, O) {
      Ze = !1, ge && (ge = !1, De(_t), _t = -1), Ve = !0;
      var N = se;
      try {
        for (Et(O), Q = c(j); Q !== null && (!(Q.expirationTime > O) || E && !Nt()); ) {
          var f = Q.callback;
          if (typeof f == "function") {
            Q.callback = null, se = Q.priorityLevel;
            var y = f(Q.expirationTime <= O);
            O = m.unstable_now(), typeof y == "function" ? Q.callback = y : Q === c(j) && F(j), Et(O);
          } else F(j);
          Q = c(j);
        }
        if (Q !== null) var G = !0;
        else {
          var X = c(oe);
          X !== null && xe(Je, X.startTime - O), G = !1;
        }
        return G;
      } finally {
        Q = null, se = N, Ve = !1;
      }
    }
    var ke = !1, at = null, _t = -1, gt = 5, ln = -1;
    function Nt() {
      return !(m.unstable_now() - ln < gt);
    }
    function At() {
      if (at !== null) {
        var E = m.unstable_now();
        ln = E;
        var O = !0;
        try {
          O = at(!0, E);
        } finally {
          O ? ct() : (ke = !1, at = null);
        }
      } else ke = !1;
    }
    var ct;
    if (typeof Ot == "function") ct = function() {
      Ot(At);
    };
    else if (typeof MessageChannel < "u") {
      var Pt = new MessageChannel(), Be = Pt.port2;
      Pt.port1.onmessage = At, ct = function() {
        Be.postMessage(null);
      };
    } else ct = function() {
      we(At, 0);
    };
    function rt(E) {
      at = E, ke || (ke = !0, ct());
    }
    function xe(E, O) {
      _t = we(function() {
        E(m.unstable_now());
      }, O);
    }
    m.unstable_IdlePriority = 5, m.unstable_ImmediatePriority = 1, m.unstable_LowPriority = 4, m.unstable_NormalPriority = 3, m.unstable_Profiling = null, m.unstable_UserBlockingPriority = 2, m.unstable_cancelCallback = function(E) {
      E.callback = null;
    }, m.unstable_continueExecution = function() {
      Ze || Ve || (Ze = !0, rt(Ct));
    }, m.unstable_forceFrameRate = function(E) {
      0 > E || 125 < E ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : gt = 0 < E ? Math.floor(1e3 / E) : 5;
    }, m.unstable_getCurrentPriorityLevel = function() {
      return se;
    }, m.unstable_getFirstCallbackNode = function() {
      return c(j);
    }, m.unstable_next = function(E) {
      switch (se) {
        case 1:
        case 2:
        case 3:
          var O = 3;
          break;
        default:
          O = se;
      }
      var N = se;
      se = O;
      try {
        return E();
      } finally {
        se = N;
      }
    }, m.unstable_pauseExecution = function() {
    }, m.unstable_requestPaint = function() {
    }, m.unstable_runWithPriority = function(E, O) {
      switch (E) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          E = 3;
      }
      var N = se;
      se = E;
      try {
        return O();
      } finally {
        se = N;
      }
    }, m.unstable_scheduleCallback = function(E, O, N) {
      var f = m.unstable_now();
      switch (typeof N == "object" && N !== null ? (N = N.delay, N = typeof N == "number" && 0 < N ? f + N : f) : N = f, E) {
        case 1:
          var y = -1;
          break;
        case 2:
          y = 250;
          break;
        case 5:
          y = 1073741823;
          break;
        case 4:
          y = 1e4;
          break;
        default:
          y = 5e3;
      }
      return y = N + y, E = { id: ne++, callback: O, priorityLevel: E, startTime: N, expirationTime: y, sortIndex: -1 }, N > f ? (E.sortIndex = N, v(oe, E), c(j) === null && E === c(oe) && (ge ? (De(_t), _t = -1) : ge = !0, xe(Je, N - f))) : (E.sortIndex = y, v(j, E), Ze || Ve || (Ze = !0, rt(Ct))), E;
    }, m.unstable_shouldYield = Nt, m.unstable_wrapCallback = function(E) {
      var O = se;
      return function() {
        var N = se;
        se = O;
        try {
          return E.apply(this, arguments);
        } finally {
          se = N;
        }
      };
    };
  })(Yu)), Yu;
}
var wc;
function od() {
  return wc || (wc = 1, Ku.exports = ld()), Ku.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kc;
function id() {
  if (kc) return It;
  kc = 1;
  var m = ns(), v = od();
  function c(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var F = /* @__PURE__ */ new Set(), T = {};
  function B(e, t) {
    $(e, t), $(e + "Capture", t);
  }
  function $(e, t) {
    for (T[e] = t, e = 0; e < t.length; e++) F.add(t[e]);
  }
  var H = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), j = Object.prototype.hasOwnProperty, oe = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ne = {}, Q = {};
  function se(e) {
    return j.call(Q, e) ? !0 : j.call(ne, e) ? !1 : oe.test(e) ? Q[e] = !0 : (ne[e] = !0, !1);
  }
  function Ve(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function Ze(e, t, n, r) {
    if (t === null || typeof t > "u" || Ve(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null) switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
    return !1;
  }
  function ge(e, t, n, r, l, o, i) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i;
  }
  var we = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    we[e] = new ge(e, 0, !1, e, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    we[t] = new ge(t, 1, !1, e[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    we[e] = new ge(e, 2, !1, e.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    we[e] = new ge(e, 2, !1, e, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    we[e] = new ge(e, 3, !1, e.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(e) {
    we[e] = new ge(e, 3, !0, e, null, !1, !1);
  }), ["capture", "download"].forEach(function(e) {
    we[e] = new ge(e, 4, !1, e, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(e) {
    we[e] = new ge(e, 6, !1, e, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(e) {
    we[e] = new ge(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var De = /[\-:]([a-z])/g;
  function Ot(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(
      De,
      Ot
    );
    we[t] = new ge(t, 1, !1, e, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(De, Ot);
    we[t] = new ge(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(De, Ot);
    we[t] = new ge(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    we[e] = new ge(e, 1, !1, e.toLowerCase(), null, !1, !1);
  }), we.xlinkHref = new ge("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(e) {
    we[e] = new ge(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  function Et(e, t, n, r) {
    var l = we.hasOwnProperty(t) ? we[t] : null;
    (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Ze(t, n, l, r) && (n = null), r || l === null ? se(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
  }
  var Je = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Ct = Symbol.for("react.element"), ke = Symbol.for("react.portal"), at = Symbol.for("react.fragment"), _t = Symbol.for("react.strict_mode"), gt = Symbol.for("react.profiler"), ln = Symbol.for("react.provider"), Nt = Symbol.for("react.context"), At = Symbol.for("react.forward_ref"), ct = Symbol.for("react.suspense"), Pt = Symbol.for("react.suspense_list"), Be = Symbol.for("react.memo"), rt = Symbol.for("react.lazy"), xe = Symbol.for("react.offscreen"), E = Symbol.iterator;
  function O(e) {
    return e === null || typeof e != "object" ? null : (e = E && e[E] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var N = Object.assign, f;
  function y(e) {
    if (f === void 0) try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      f = t && t[1] || "";
    }
    return `
` + f + e;
  }
  var G = !1;
  function X(e, t) {
    if (!e || G) return "";
    G = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t) if (t = function() {
        throw Error();
      }, Object.defineProperty(t.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(t, []);
        } catch (h) {
          var r = h;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (h) {
          r = h;
        }
        e.call(t.prototype);
      }
      else {
        try {
          throw Error();
        } catch (h) {
          r = h;
        }
        e();
      }
    } catch (h) {
      if (h && r && typeof h.stack == "string") {
        for (var l = h.stack.split(`
`), o = r.stack.split(`
`), i = l.length - 1, u = o.length - 1; 1 <= i && 0 <= u && l[i] !== o[u]; ) u--;
        for (; 1 <= i && 0 <= u; i--, u--) if (l[i] !== o[u]) {
          if (i !== 1 || u !== 1)
            do
              if (i--, u--, 0 > u || l[i] !== o[u]) {
                var s = `
` + l[i].replace(" at new ", " at ");
                return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s;
              }
            while (1 <= i && 0 <= u);
          break;
        }
      }
    } finally {
      G = !1, Error.prepareStackTrace = n;
    }
    return (e = e ? e.displayName || e.name : "") ? y(e) : "";
  }
  function b(e) {
    switch (e.tag) {
      case 5:
        return y(e.type);
      case 16:
        return y("Lazy");
      case 13:
        return y("Suspense");
      case 19:
        return y("SuspenseList");
      case 0:
      case 2:
      case 15:
        return e = X(e.type, !1), e;
      case 11:
        return e = X(e.type.render, !1), e;
      case 1:
        return e = X(e.type, !0), e;
      default:
        return "";
    }
  }
  function re(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case at:
        return "Fragment";
      case ke:
        return "Portal";
      case gt:
        return "Profiler";
      case _t:
        return "StrictMode";
      case ct:
        return "Suspense";
      case Pt:
        return "SuspenseList";
    }
    if (typeof e == "object") switch (e.$$typeof) {
      case Nt:
        return (e.displayName || "Context") + ".Consumer";
      case ln:
        return (e._context.displayName || "Context") + ".Provider";
      case At:
        var t = e.render;
        return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
      case Be:
        return t = e.displayName || null, t !== null ? t : re(e.type) || "Memo";
      case rt:
        t = e._payload, e = e._init;
        try {
          return re(e(t));
        } catch {
        }
    }
    return null;
  }
  function ie(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return re(t);
      case 8:
        return t === _t ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function") return t.displayName || t.name || null;
        if (typeof t == "string") return t;
    }
    return null;
  }
  function pe(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Se(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function wt(e) {
    var t = Se(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
      var l = n.get, o = n.set;
      return Object.defineProperty(e, t, { configurable: !0, get: function() {
        return l.call(this);
      }, set: function(i) {
        r = "" + i, o.call(this, i);
      } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
        return r;
      }, setValue: function(i) {
        r = "" + i;
      }, stopTracking: function() {
        e._valueTracker = null, delete e[t];
      } };
    }
  }
  function on(e) {
    e._valueTracker || (e._valueTracker = wt(e));
  }
  function zl(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), r = "";
    return e && (r = Se(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
  }
  function Ee(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Ce(e, t) {
    var n = t.checked;
    return N({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
  }
  function gr(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
    n = pe(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
  }
  function qe(e, t) {
    t = t.checked, t != null && Et(e, "checked", t, !1);
  }
  function Gr(e, t) {
    qe(e, t);
    var n = pe(t.value), r = t.type;
    if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
      e.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? Fn(e, t.type, n) : t.hasOwnProperty("defaultValue") && Fn(e, t.type, pe(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
  }
  function wr(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type;
      if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
      t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
    }
    n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
  }
  function Fn(e, t, n) {
    (t !== "number" || Ee(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
  }
  var Dn = Array.isArray;
  function un(e, t, n, r) {
    if (e = e.options, t) {
      t = {};
      for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
      for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + pe(n), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === n) {
          e[l].selected = !0, r && (e[l].defaultSelected = !0);
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Xr(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(c(91));
    return N({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
  }
  function Ll(e, t) {
    var n = t.value;
    if (n == null) {
      if (n = t.children, t = t.defaultValue, n != null) {
        if (t != null) throw Error(c(92));
        if (Dn(n)) {
          if (1 < n.length) throw Error(c(93));
          n = n[0];
        }
        t = n;
      }
      t == null && (t = ""), n = t;
    }
    e._wrapperState = { initialValue: pe(n) };
  }
  function Tl(e, t) {
    var n = pe(t.value), r = pe(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
  }
  function A(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
  }
  function ae(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function J(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? ae(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
  }
  var ft, K = (function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, r, l);
      });
    } : e;
  })(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
      for (ft = ft || document.createElement("div"), ft.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = ft.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
  function En(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Xn = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, Cn = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Xn).forEach(function(e) {
    Cn.forEach(function(t) {
      t = t + e.charAt(0).toUpperCase() + e.substring(1), Xn[t] = Xn[e];
    });
  });
  function sn(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Xn.hasOwnProperty(e) && Xn[e] ? ("" + t).trim() : t + "px";
  }
  function Ut(e, t) {
    e = e.style;
    for (var n in t) if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0, l = sn(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
    }
  }
  var Rl = N({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function In(e, t) {
    if (t) {
      if (Rl[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(c(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(c(60));
        if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(c(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(c(62));
    }
  }
  function On(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var an = null;
  function cn(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var $e = null, _n = null, Nn = null;
  function kr(e) {
    if (e = Zl(e)) {
      if (typeof $e != "function") throw Error(c(280));
      var t = e.stateNode;
      t && (t = To(t), $e(e.stateNode, e.type, t));
    }
  }
  function Zr(e) {
    _n ? Nn ? Nn.push(e) : Nn = [e] : _n = e;
  }
  function Zn() {
    if (_n) {
      var e = _n, t = Nn;
      if (Nn = _n = null, kr(e), t) for (e = 0; e < t.length; e++) kr(t[e]);
    }
  }
  function xr(e, t) {
    return e(t);
  }
  function jl() {
  }
  var Sr = !1;
  function Bt(e, t, n) {
    if (Sr) return e(t, n);
    Sr = !0;
    try {
      return xr(e, t, n);
    } finally {
      Sr = !1, (_n !== null || Nn !== null) && (jl(), Zn());
    }
  }
  function Pn(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = To(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(c(231, t, typeof n));
    return n;
  }
  var Jr = !1;
  if (H) try {
    var Qe = {};
    Object.defineProperty(Qe, "passive", { get: function() {
      Jr = !0;
    } }), window.addEventListener("test", Qe, Qe), window.removeEventListener("test", Qe, Qe);
  } catch {
    Jr = !1;
  }
  function qr(e, t, n, r, l, o, i, u, s) {
    var h = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, h);
    } catch (w) {
      this.onError(w);
    }
  }
  var fn = !1, ce = null, Jn = !1, dt = null, Wt = { onError: function(e) {
    fn = !0, ce = e;
  } };
  function br(e, t, n, r, l, o, i, u, s) {
    fn = !1, ce = null, qr.apply(Wt, arguments);
  }
  function el(e, t, n, r, l, o, i, u, s) {
    if (br.apply(this, arguments), fn) {
      if (fn) {
        var h = ce;
        fn = !1, ce = null;
      } else throw Error(c(198));
      Jn || (Jn = !0, dt = h);
    }
  }
  function Ht(e) {
    var t = e, n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (n = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function An(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function Er(e) {
    if (Ht(e) !== e) throw Error(c(188));
  }
  function Y(e) {
    var t = e.alternate;
    if (!t) {
      if (t = Ht(e), t === null) throw Error(c(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var l = n.return;
      if (l === null) break;
      var o = l.alternate;
      if (o === null) {
        if (r = l.return, r !== null) {
          n = r;
          continue;
        }
        break;
      }
      if (l.child === o.child) {
        for (o = l.child; o; ) {
          if (o === n) return Er(l), e;
          if (o === r) return Er(l), t;
          o = o.sibling;
        }
        throw Error(c(188));
      }
      if (n.return !== r.return) n = l, r = o;
      else {
        for (var i = !1, u = l.child; u; ) {
          if (u === n) {
            i = !0, n = l, r = o;
            break;
          }
          if (u === r) {
            i = !0, r = l, n = o;
            break;
          }
          u = u.sibling;
        }
        if (!i) {
          for (u = o.child; u; ) {
            if (u === n) {
              i = !0, n = o, r = l;
              break;
            }
            if (u === r) {
              i = !0, r = o, n = l;
              break;
            }
            u = u.sibling;
          }
          if (!i) throw Error(c(189));
        }
      }
      if (n.alternate !== r) throw Error(c(190));
    }
    if (n.tag !== 3) throw Error(c(188));
    return n.stateNode.current === n ? e : t;
  }
  function Cr(e) {
    return e = Y(e), e !== null ? _r(e) : null;
  }
  function _r(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = _r(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var tl = v.unstable_scheduleCallback, Nr = v.unstable_cancelCallback, Vt = v.unstable_shouldYield, $t = v.unstable_requestPaint, ve = v.unstable_now, ho = v.unstable_getCurrentPriorityLevel, Mn = v.unstable_ImmediatePriority, nl = v.unstable_UserBlockingPriority, Pr = v.unstable_NormalPriority, qn = v.unstable_LowPriority, rl = v.unstable_IdlePriority, bn = null, Mt = null;
  function vo(e) {
    if (Mt && typeof Mt.onCommitFiberRoot == "function") try {
      Mt.onCommitFiberRoot(bn, e, void 0, (e.current.flags & 128) === 128);
    } catch {
    }
  }
  var Ke = Math.clz32 ? Math.clz32 : go, Un = Math.log, yo = Math.LN2;
  function go(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Un(e) / yo | 0) | 0;
  }
  var Ie = 64, Mr = 4194304;
  function er(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function zr(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0, l = e.suspendedLanes, o = e.pingedLanes, i = n & 268435455;
    if (i !== 0) {
      var u = i & ~l;
      u !== 0 ? r = er(u) : (o &= i, o !== 0 && (r = er(o)));
    } else i = n & ~l, i !== 0 ? r = er(i) : o !== 0 && (r = er(o));
    if (r === 0) return 0;
    if (t !== 0 && t !== r && (t & l) === 0 && (l = r & -r, o = t & -t, l >= o || l === 16 && (o & 4194240) !== 0)) return t;
    if ((r & 4) !== 0 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Ke(t), l = 1 << n, r |= e[n], t &= ~l;
    return r;
  }
  function wo(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function ko(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
      var i = 31 - Ke(o), u = 1 << i, s = l[i];
      s === -1 ? ((u & n) === 0 || (u & r) !== 0) && (l[i] = wo(u, t)) : s <= t && (e.expiredLanes |= u), o &= ~u;
    }
  }
  function ll(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
  }
  function Fl() {
    var e = Ie;
    return Ie <<= 1, (Ie & 4194240) === 0 && (Ie = 64), e;
  }
  function ol(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function tr(e, t, n) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Ke(t), e[t] = n;
  }
  function xo(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
      var l = 31 - Ke(n), o = 1 << l;
      t[l] = 0, r[l] = -1, e[l] = -1, n &= ~o;
    }
  }
  function Zt(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var r = 31 - Ke(n), l = 1 << r;
      l & t | e[r] & t && (e[r] |= t), n &= ~l;
    }
  }
  var me = 0;
  function Dl(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var Il, S, Z, R, U, ye = !1, _e = [], le = null, Ne = null, ue = null, Me = /* @__PURE__ */ new Map(), Oe = /* @__PURE__ */ new Map(), fe = [], lt = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function ot(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        le = null;
        break;
      case "dragenter":
      case "dragleave":
        Ne = null;
        break;
      case "mouseover":
      case "mouseout":
        ue = null;
        break;
      case "pointerover":
      case "pointerout":
        Me.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Oe.delete(t.pointerId);
    }
  }
  function dn(e, t, n, r, l, o) {
    return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [l] }, t !== null && (t = Zl(t), t !== null && S(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
  }
  function Lr(e, t, n, r, l) {
    switch (t) {
      case "focusin":
        return le = dn(le, e, t, n, r, l), !0;
      case "dragenter":
        return Ne = dn(Ne, e, t, n, r, l), !0;
      case "mouseover":
        return ue = dn(ue, e, t, n, r, l), !0;
      case "pointerover":
        var o = l.pointerId;
        return Me.set(o, dn(Me.get(o) || null, e, t, n, r, l)), !0;
      case "gotpointercapture":
        return o = l.pointerId, Oe.set(o, dn(Oe.get(o) || null, e, t, n, r, l)), !0;
    }
    return !1;
  }
  function So(e) {
    var t = Fr(e.target);
    if (t !== null) {
      var n = Ht(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = An(n), t !== null) {
            e.blockedOn = t, U(e.priority, function() {
              Z(n);
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Tr(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = zn(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(n.type, n);
        an = r, n.target.dispatchEvent(r), an = null;
      } else return t = Zl(n), t !== null && S(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function zt(e, t, n) {
    Tr(e) && n.delete(t);
  }
  function kt() {
    ye = !1, le !== null && Tr(le) && (le = null), Ne !== null && Tr(Ne) && (Ne = null), ue !== null && Tr(ue) && (ue = null), Me.forEach(zt), Oe.forEach(zt);
  }
  function Qt(e, t) {
    e.blockedOn === t && (e.blockedOn = null, ye || (ye = !0, v.unstable_scheduleCallback(v.unstable_NormalPriority, kt)));
  }
  function pt(e) {
    function t(l) {
      return Qt(l, e);
    }
    if (0 < _e.length) {
      Qt(_e[0], e);
      for (var n = 1; n < _e.length; n++) {
        var r = _e[n];
        r.blockedOn === e && (r.blockedOn = null);
      }
    }
    for (le !== null && Qt(le, e), Ne !== null && Qt(Ne, e), ue !== null && Qt(ue, e), Me.forEach(t), Oe.forEach(t), n = 0; n < fe.length; n++) r = fe[n], r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < fe.length && (n = fe[0], n.blockedOn === null); ) So(n), n.blockedOn === null && fe.shift();
  }
  var nr = Je.ReactCurrentBatchConfig, Rr = !0;
  function Eo(e, t, n, r) {
    var l = me, o = nr.transition;
    nr.transition = null;
    try {
      me = 1, Ol(e, t, n, r);
    } finally {
      me = l, nr.transition = o;
    }
  }
  function ki(e, t, n, r) {
    var l = me, o = nr.transition;
    nr.transition = null;
    try {
      me = 4, Ol(e, t, n, r);
    } finally {
      me = l, nr.transition = o;
    }
  }
  function Ol(e, t, n, r) {
    if (Rr) {
      var l = zn(e, t, n, r);
      if (l === null) ji(e, t, r, il, n), ot(e, r);
      else if (Lr(l, e, t, n, r)) r.stopPropagation();
      else if (ot(e, r), t & 4 && -1 < lt.indexOf(e)) {
        for (; l !== null; ) {
          var o = Zl(l);
          if (o !== null && Il(o), o = zn(e, t, n, r), o === null && ji(e, t, r, il, n), o === l) break;
          l = o;
        }
        l !== null && r.stopPropagation();
      } else ji(e, t, r, null, n);
    }
  }
  var il = null;
  function zn(e, t, n, r) {
    if (il = null, e = cn(r), e = Fr(e), e !== null) if (t = Ht(e), t === null) e = null;
    else if (n = t.tag, n === 13) {
      if (e = An(t), e !== null) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
    return il = e, null;
  }
  function Al(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (ho()) {
          case Mn:
            return 1;
          case nl:
            return 4;
          case Pr:
          case qn:
            return 16;
          case rl:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var pn = null, ee = null, q = null;
  function ze() {
    if (q) return q;
    var e, t = ee, n = t.length, r, l = "value" in pn ? pn.value : pn.textContent, o = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++) ;
    var i = n - e;
    for (r = 1; r <= i && t[n - r] === l[o - r]; r++) ;
    return q = l.slice(e, 1 < r ? 1 - r : void 0);
  }
  function it(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function be() {
    return !0;
  }
  function Lt() {
    return !1;
  }
  function Ye(e) {
    function t(n, r, l, o, i) {
      this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
      for (var u in e) e.hasOwnProperty(u) && (n = e[u], this[u] = n ? n(o) : o[u]);
      return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? be : Lt, this.isPropagationStopped = Lt, this;
    }
    return N(t.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var n = this.nativeEvent;
      n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = be);
    }, stopPropagation: function() {
      var n = this.nativeEvent;
      n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = be);
    }, persist: function() {
    }, isPersistent: be }), t;
  }
  var V = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
    return e.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, ul = Ye(V), mn = N({}, V, { view: 0, detail: 0 }), Ul = Ye(mn), hn, vn, Kt, Bn = N({}, mn, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Si, button: 0, buttons: 0, relatedTarget: function(e) {
    return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
  }, movementX: function(e) {
    return "movementX" in e ? e.movementX : (e !== Kt && (Kt && e.type === "mousemove" ? (hn = e.screenX - Kt.screenX, vn = e.screenY - Kt.screenY) : vn = hn = 0, Kt = e), hn);
  }, movementY: function(e) {
    return "movementY" in e ? e.movementY : vn;
  } }), jr = Ye(Bn), Bl = N({}, Bn, { dataTransfer: 0 }), zc = Ye(Bl), Lc = N({}, mn, { relatedTarget: 0 }), xi = Ye(Lc), Tc = N({}, V, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Rc = Ye(Tc), jc = N({}, V, { clipboardData: function(e) {
    return "clipboardData" in e ? e.clipboardData : window.clipboardData;
  } }), Fc = Ye(jc), Dc = N({}, V, { data: 0 }), ls = Ye(Dc), Ic = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Oc = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Ac = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Uc(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Ac[e]) ? !!t[e] : !1;
  }
  function Si() {
    return Uc;
  }
  var Bc = N({}, mn, { key: function(e) {
    if (e.key) {
      var t = Ic[e.key] || e.key;
      if (t !== "Unidentified") return t;
    }
    return e.type === "keypress" ? (e = it(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Oc[e.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Si, charCode: function(e) {
    return e.type === "keypress" ? it(e) : 0;
  }, keyCode: function(e) {
    return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  }, which: function(e) {
    return e.type === "keypress" ? it(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
  } }), Wc = Ye(Bc), Hc = N({}, Bn, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), os = Ye(Hc), Vc = N({}, mn, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Si }), $c = Ye(Vc), Qc = N({}, V, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Kc = Ye(Qc), Yc = N({}, Bn, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Gc = Ye(Yc), Xc = [9, 13, 27, 32], Ei = H && "CompositionEvent" in window, Wl = null;
  H && "documentMode" in document && (Wl = document.documentMode);
  var Zc = H && "TextEvent" in window && !Wl, is = H && (!Ei || Wl && 8 < Wl && 11 >= Wl), us = " ", ss = !1;
  function as(e, t) {
    switch (e) {
      case "keyup":
        return Xc.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function cs(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var sl = !1;
  function Jc(e, t) {
    switch (e) {
      case "compositionend":
        return cs(t);
      case "keypress":
        return t.which !== 32 ? null : (ss = !0, us);
      case "textInput":
        return e = t.data, e === us && ss ? null : e;
      default:
        return null;
    }
  }
  function qc(e, t) {
    if (sl) return e === "compositionend" || !Ei && as(e, t) ? (e = ze(), q = ee = pn = null, sl = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return is && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var bc = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function fs(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!bc[e.type] : t === "textarea";
  }
  function ds(e, t, n, r) {
    Zr(r), t = Mo(t, "onChange"), 0 < t.length && (n = new ul("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
  }
  var Hl = null, Vl = null;
  function ef(e) {
    Ls(e, 0);
  }
  function Co(e) {
    var t = pl(e);
    if (zl(t)) return e;
  }
  function tf(e, t) {
    if (e === "change") return t;
  }
  var ps = !1;
  if (H) {
    var Ci;
    if (H) {
      var _i = "oninput" in document;
      if (!_i) {
        var ms = document.createElement("div");
        ms.setAttribute("oninput", "return;"), _i = typeof ms.oninput == "function";
      }
      Ci = _i;
    } else Ci = !1;
    ps = Ci && (!document.documentMode || 9 < document.documentMode);
  }
  function hs() {
    Hl && (Hl.detachEvent("onpropertychange", vs), Vl = Hl = null);
  }
  function vs(e) {
    if (e.propertyName === "value" && Co(Vl)) {
      var t = [];
      ds(t, Vl, e, cn(e)), Bt(ef, t);
    }
  }
  function nf(e, t, n) {
    e === "focusin" ? (hs(), Hl = t, Vl = n, Hl.attachEvent("onpropertychange", vs)) : e === "focusout" && hs();
  }
  function rf(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Co(Vl);
  }
  function lf(e, t) {
    if (e === "click") return Co(t);
  }
  function of(e, t) {
    if (e === "input" || e === "change") return Co(t);
  }
  function uf(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var yn = typeof Object.is == "function" ? Object.is : uf;
  function $l(e, t) {
    if (yn(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e), r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var l = n[r];
      if (!j.call(t, l) || !yn(e[l], t[l])) return !1;
    }
    return !0;
  }
  function ys(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function gs(e, t) {
    var n = ys(e);
    e = 0;
    for (var r; n; ) {
      if (n.nodeType === 3) {
        if (r = e + n.textContent.length, e <= t && r >= t) return { node: n, offset: t - e };
        e = r;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = ys(n);
    }
  }
  function ws(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ws(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function ks() {
    for (var e = window, t = Ee(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Ee(e.document);
    }
    return t;
  }
  function Ni(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function sf(e) {
    var t = ks(), n = e.focusedElem, r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && ws(n.ownerDocument.documentElement, n)) {
      if (r !== null && Ni(n)) {
        if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
        else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
          e = e.getSelection();
          var l = n.textContent.length, o = Math.min(r.start, l);
          r = r.end === void 0 ? o : Math.min(r.end, l), !e.extend && o > r && (l = r, r = o, o = l), l = gs(n, o);
          var i = gs(
            n,
            r
          );
          l && i && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== i.node || e.focusOffset !== i.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset), e.addRange(t)));
        }
      }
      for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
    }
  }
  var af = H && "documentMode" in document && 11 >= document.documentMode, al = null, Pi = null, Ql = null, Mi = !1;
  function xs(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Mi || al == null || al !== Ee(r) || (r = al, "selectionStart" in r && Ni(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Ql && $l(Ql, r) || (Ql = r, r = Mo(Pi, "onSelect"), 0 < r.length && (t = new ul("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = al)));
  }
  function _o(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var cl = { animationend: _o("Animation", "AnimationEnd"), animationiteration: _o("Animation", "AnimationIteration"), animationstart: _o("Animation", "AnimationStart"), transitionend: _o("Transition", "TransitionEnd") }, zi = {}, Ss = {};
  H && (Ss = document.createElement("div").style, "AnimationEvent" in window || (delete cl.animationend.animation, delete cl.animationiteration.animation, delete cl.animationstart.animation), "TransitionEvent" in window || delete cl.transitionend.transition);
  function No(e) {
    if (zi[e]) return zi[e];
    if (!cl[e]) return e;
    var t = cl[e], n;
    for (n in t) if (t.hasOwnProperty(n) && n in Ss) return zi[e] = t[n];
    return e;
  }
  var Es = No("animationend"), Cs = No("animationiteration"), _s = No("animationstart"), Ns = No("transitionend"), Ps = /* @__PURE__ */ new Map(), Ms = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function rr(e, t) {
    Ps.set(e, t), B(t, [e]);
  }
  for (var Li = 0; Li < Ms.length; Li++) {
    var Ti = Ms[Li], cf = Ti.toLowerCase(), ff = Ti[0].toUpperCase() + Ti.slice(1);
    rr(cf, "on" + ff);
  }
  rr(Es, "onAnimationEnd"), rr(Cs, "onAnimationIteration"), rr(_s, "onAnimationStart"), rr("dblclick", "onDoubleClick"), rr("focusin", "onFocus"), rr("focusout", "onBlur"), rr(Ns, "onTransitionEnd"), $("onMouseEnter", ["mouseout", "mouseover"]), $("onMouseLeave", ["mouseout", "mouseover"]), $("onPointerEnter", ["pointerout", "pointerover"]), $("onPointerLeave", ["pointerout", "pointerover"]), B("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), B("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), B("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), B("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), B("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), B("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Kl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), df = new Set("cancel close invalid load scroll toggle".split(" ").concat(Kl));
  function zs(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n, el(r, t, void 0, e), e.currentTarget = null;
  }
  function Ls(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n], l = r.event;
      r = r.listeners;
      e: {
        var o = void 0;
        if (t) for (var i = r.length - 1; 0 <= i; i--) {
          var u = r[i], s = u.instance, h = u.currentTarget;
          if (u = u.listener, s !== o && l.isPropagationStopped()) break e;
          zs(l, u, h), o = s;
        }
        else for (i = 0; i < r.length; i++) {
          if (u = r[i], s = u.instance, h = u.currentTarget, u = u.listener, s !== o && l.isPropagationStopped()) break e;
          zs(l, u, h), o = s;
        }
      }
    }
    if (Jn) throw e = dt, Jn = !1, dt = null, e;
  }
  function Le(e, t) {
    var n = t[Ui];
    n === void 0 && (n = t[Ui] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    n.has(r) || (Ts(t, e, 2, !1), n.add(r));
  }
  function Ri(e, t, n) {
    var r = 0;
    t && (r |= 4), Ts(n, e, r, t);
  }
  var Po = "_reactListening" + Math.random().toString(36).slice(2);
  function Yl(e) {
    if (!e[Po]) {
      e[Po] = !0, F.forEach(function(n) {
        n !== "selectionchange" && (df.has(n) || Ri(n, !1, e), Ri(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Po] || (t[Po] = !0, Ri("selectionchange", !1, t));
    }
  }
  function Ts(e, t, n, r) {
    switch (Al(t)) {
      case 1:
        var l = Eo;
        break;
      case 4:
        l = ki;
        break;
      default:
        l = Ol;
    }
    n = l.bind(null, t, n, e), l = void 0, !Jr || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
  }
  function ji(e, t, n, r, l) {
    var o = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null) e: for (; ; ) {
      if (r === null) return;
      var i = r.tag;
      if (i === 3 || i === 4) {
        var u = r.stateNode.containerInfo;
        if (u === l || u.nodeType === 8 && u.parentNode === l) break;
        if (i === 4) for (i = r.return; i !== null; ) {
          var s = i.tag;
          if ((s === 3 || s === 4) && (s = i.stateNode.containerInfo, s === l || s.nodeType === 8 && s.parentNode === l)) return;
          i = i.return;
        }
        for (; u !== null; ) {
          if (i = Fr(u), i === null) return;
          if (s = i.tag, s === 5 || s === 6) {
            r = o = i;
            continue e;
          }
          u = u.parentNode;
        }
      }
      r = r.return;
    }
    Bt(function() {
      var h = o, w = cn(n), k = [];
      e: {
        var g = Ps.get(e);
        if (g !== void 0) {
          var C = ul, M = e;
          switch (e) {
            case "keypress":
              if (it(n) === 0) break e;
            case "keydown":
            case "keyup":
              C = Wc;
              break;
            case "focusin":
              M = "focus", C = xi;
              break;
            case "focusout":
              M = "blur", C = xi;
              break;
            case "beforeblur":
            case "afterblur":
              C = xi;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              C = jr;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              C = zc;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              C = $c;
              break;
            case Es:
            case Cs:
            case _s:
              C = Rc;
              break;
            case Ns:
              C = Kc;
              break;
            case "scroll":
              C = Ul;
              break;
            case "wheel":
              C = Gc;
              break;
            case "copy":
            case "cut":
            case "paste":
              C = Fc;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              C = os;
          }
          var z = (t & 4) !== 0, We = !z && e === "scroll", d = z ? g !== null ? g + "Capture" : null : g;
          z = [];
          for (var a = h, p; a !== null; ) {
            p = a;
            var x = p.stateNode;
            if (p.tag === 5 && x !== null && (p = x, d !== null && (x = Pn(a, d), x != null && z.push(Gl(a, x, p)))), We) break;
            a = a.return;
          }
          0 < z.length && (g = new C(g, M, null, n, w), k.push({ event: g, listeners: z }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (g = e === "mouseover" || e === "pointerover", C = e === "mouseout" || e === "pointerout", g && n !== an && (M = n.relatedTarget || n.fromElement) && (Fr(M) || M[Wn])) break e;
          if ((C || g) && (g = w.window === w ? w : (g = w.ownerDocument) ? g.defaultView || g.parentWindow : window, C ? (M = n.relatedTarget || n.toElement, C = h, M = M ? Fr(M) : null, M !== null && (We = Ht(M), M !== We || M.tag !== 5 && M.tag !== 6) && (M = null)) : (C = null, M = h), C !== M)) {
            if (z = jr, x = "onMouseLeave", d = "onMouseEnter", a = "mouse", (e === "pointerout" || e === "pointerover") && (z = os, x = "onPointerLeave", d = "onPointerEnter", a = "pointer"), We = C == null ? g : pl(C), p = M == null ? g : pl(M), g = new z(x, a + "leave", C, n, w), g.target = We, g.relatedTarget = p, x = null, Fr(w) === h && (z = new z(d, a + "enter", M, n, w), z.target = p, z.relatedTarget = We, x = z), We = x, C && M) t: {
              for (z = C, d = M, a = 0, p = z; p; p = fl(p)) a++;
              for (p = 0, x = d; x; x = fl(x)) p++;
              for (; 0 < a - p; ) z = fl(z), a--;
              for (; 0 < p - a; ) d = fl(d), p--;
              for (; a--; ) {
                if (z === d || d !== null && z === d.alternate) break t;
                z = fl(z), d = fl(d);
              }
              z = null;
            }
            else z = null;
            C !== null && Rs(k, g, C, z, !1), M !== null && We !== null && Rs(k, We, M, z, !0);
          }
        }
        e: {
          if (g = h ? pl(h) : window, C = g.nodeName && g.nodeName.toLowerCase(), C === "select" || C === "input" && g.type === "file") var L = tf;
          else if (fs(g)) if (ps) L = of;
          else {
            L = rf;
            var D = nf;
          }
          else (C = g.nodeName) && C.toLowerCase() === "input" && (g.type === "checkbox" || g.type === "radio") && (L = lf);
          if (L && (L = L(e, h))) {
            ds(k, L, n, w);
            break e;
          }
          D && D(e, g, h), e === "focusout" && (D = g._wrapperState) && D.controlled && g.type === "number" && Fn(g, "number", g.value);
        }
        switch (D = h ? pl(h) : window, e) {
          case "focusin":
            (fs(D) || D.contentEditable === "true") && (al = D, Pi = h, Ql = null);
            break;
          case "focusout":
            Ql = Pi = al = null;
            break;
          case "mousedown":
            Mi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Mi = !1, xs(k, n, w);
            break;
          case "selectionchange":
            if (af) break;
          case "keydown":
          case "keyup":
            xs(k, n, w);
        }
        var I;
        if (Ei) e: {
          switch (e) {
            case "compositionstart":
              var W = "onCompositionStart";
              break e;
            case "compositionend":
              W = "onCompositionEnd";
              break e;
            case "compositionupdate":
              W = "onCompositionUpdate";
              break e;
          }
          W = void 0;
        }
        else sl ? as(e, n) && (W = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (W = "onCompositionStart");
        W && (is && n.locale !== "ko" && (sl || W !== "onCompositionStart" ? W === "onCompositionEnd" && sl && (I = ze()) : (pn = w, ee = "value" in pn ? pn.value : pn.textContent, sl = !0)), D = Mo(h, W), 0 < D.length && (W = new ls(W, e, null, n, w), k.push({ event: W, listeners: D }), I ? W.data = I : (I = cs(n), I !== null && (W.data = I)))), (I = Zc ? Jc(e, n) : qc(e, n)) && (h = Mo(h, "onBeforeInput"), 0 < h.length && (w = new ls("onBeforeInput", "beforeinput", null, n, w), k.push({ event: w, listeners: h }), w.data = I));
      }
      Ls(k, t);
    });
  }
  function Gl(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Mo(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
      var l = e, o = l.stateNode;
      l.tag === 5 && o !== null && (l = o, o = Pn(e, n), o != null && r.unshift(Gl(e, o, l)), o = Pn(e, t), o != null && r.push(Gl(e, o, l))), e = e.return;
    }
    return r;
  }
  function fl(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Rs(e, t, n, r, l) {
    for (var o = t._reactName, i = []; n !== null && n !== r; ) {
      var u = n, s = u.alternate, h = u.stateNode;
      if (s !== null && s === r) break;
      u.tag === 5 && h !== null && (u = h, l ? (s = Pn(n, o), s != null && i.unshift(Gl(n, s, u))) : l || (s = Pn(n, o), s != null && i.push(Gl(n, s, u)))), n = n.return;
    }
    i.length !== 0 && e.push({ event: t, listeners: i });
  }
  var pf = /\r\n?/g, mf = /\u0000|\uFFFD/g;
  function js(e) {
    return (typeof e == "string" ? e : "" + e).replace(pf, `
`).replace(mf, "");
  }
  function zo(e, t, n) {
    if (t = js(t), js(e) !== t && n) throw Error(c(425));
  }
  function Lo() {
  }
  var Fi = null, Di = null;
  function Ii(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Oi = typeof setTimeout == "function" ? setTimeout : void 0, hf = typeof clearTimeout == "function" ? clearTimeout : void 0, Fs = typeof Promise == "function" ? Promise : void 0, vf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Fs < "u" ? function(e) {
    return Fs.resolve(null).then(e).catch(yf);
  } : Oi;
  function yf(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ai(e, t) {
    var n = t, r = 0;
    do {
      var l = n.nextSibling;
      if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
        if (r === 0) {
          e.removeChild(l), pt(t);
          return;
        }
        r--;
      } else n !== "$" && n !== "$?" && n !== "$!" || r++;
      n = l;
    } while (n);
    pt(t);
  }
  function lr(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function Ds(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?") {
          if (t === 0) return e;
          t--;
        } else n === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var dl = Math.random().toString(36).slice(2), Ln = "__reactFiber$" + dl, Xl = "__reactProps$" + dl, Wn = "__reactContainer$" + dl, Ui = "__reactEvents$" + dl, gf = "__reactListeners$" + dl, wf = "__reactHandles$" + dl;
  function Fr(e) {
    var t = e[Ln];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Wn] || n[Ln]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Ds(e); e !== null; ) {
          if (n = e[Ln]) return n;
          e = Ds(e);
        }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Zl(e) {
    return e = e[Ln] || e[Wn], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
  }
  function pl(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(c(33));
  }
  function To(e) {
    return e[Xl] || null;
  }
  var Bi = [], ml = -1;
  function or(e) {
    return { current: e };
  }
  function Te(e) {
    0 > ml || (e.current = Bi[ml], Bi[ml] = null, ml--);
  }
  function Pe(e, t) {
    ml++, Bi[ml] = e.current, e.current = t;
  }
  var ir = {}, mt = or(ir), Tt = or(!1), Dr = ir;
  function hl(e, t) {
    var n = e.type.contextTypes;
    if (!n) return ir;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var l = {}, o;
    for (o in n) l[o] = t[o];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
  }
  function Rt(e) {
    return e = e.childContextTypes, e != null;
  }
  function Ro() {
    Te(Tt), Te(mt);
  }
  function Is(e, t, n) {
    if (mt.current !== ir) throw Error(c(168));
    Pe(mt, t), Pe(Tt, n);
  }
  function Os(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
    r = r.getChildContext();
    for (var l in r) if (!(l in t)) throw Error(c(108, ie(e) || "Unknown", l));
    return N({}, n, r);
  }
  function jo(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || ir, Dr = mt.current, Pe(mt, e), Pe(Tt, Tt.current), !0;
  }
  function As(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(c(169));
    n ? (e = Os(e, t, Dr), r.__reactInternalMemoizedMergedChildContext = e, Te(Tt), Te(mt), Pe(mt, e)) : Te(Tt), Pe(Tt, n);
  }
  var Hn = null, Fo = !1, Wi = !1;
  function Us(e) {
    Hn === null ? Hn = [e] : Hn.push(e);
  }
  function kf(e) {
    Fo = !0, Us(e);
  }
  function ur() {
    if (!Wi && Hn !== null) {
      Wi = !0;
      var e = 0, t = me;
      try {
        var n = Hn;
        for (me = 1; e < n.length; e++) {
          var r = n[e];
          do
            r = r(!0);
          while (r !== null);
        }
        Hn = null, Fo = !1;
      } catch (l) {
        throw Hn !== null && (Hn = Hn.slice(e + 1)), tl(Mn, ur), l;
      } finally {
        me = t, Wi = !1;
      }
    }
    return null;
  }
  var vl = [], yl = 0, Do = null, Io = 0, Jt = [], qt = 0, Ir = null, Vn = 1, $n = "";
  function Or(e, t) {
    vl[yl++] = Io, vl[yl++] = Do, Do = e, Io = t;
  }
  function Bs(e, t, n) {
    Jt[qt++] = Vn, Jt[qt++] = $n, Jt[qt++] = Ir, Ir = e;
    var r = Vn;
    e = $n;
    var l = 32 - Ke(r) - 1;
    r &= ~(1 << l), n += 1;
    var o = 32 - Ke(t) + l;
    if (30 < o) {
      var i = l - l % 5;
      o = (r & (1 << i) - 1).toString(32), r >>= i, l -= i, Vn = 1 << 32 - Ke(t) + l | n << l | r, $n = o + e;
    } else Vn = 1 << o | n << l | r, $n = e;
  }
  function Hi(e) {
    e.return !== null && (Or(e, 1), Bs(e, 1, 0));
  }
  function Vi(e) {
    for (; e === Do; ) Do = vl[--yl], vl[yl] = null, Io = vl[--yl], vl[yl] = null;
    for (; e === Ir; ) Ir = Jt[--qt], Jt[qt] = null, $n = Jt[--qt], Jt[qt] = null, Vn = Jt[--qt], Jt[qt] = null;
  }
  var Yt = null, Gt = null, Re = !1, gn = null;
  function Ws(e, t) {
    var n = nn(5, null, null, 0);
    n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
  }
  function Hs(e, t) {
    switch (e.tag) {
      case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Yt = e, Gt = lr(t.firstChild), !0) : !1;
      case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Yt = e, Gt = null, !0) : !1;
      case 13:
        return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Ir !== null ? { id: Vn, overflow: $n } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = nn(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Yt = e, Gt = null, !0) : !1;
      default:
        return !1;
    }
  }
  function $i(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function Qi(e) {
    if (Re) {
      var t = Gt;
      if (t) {
        var n = t;
        if (!Hs(e, t)) {
          if ($i(e)) throw Error(c(418));
          t = lr(n.nextSibling);
          var r = Yt;
          t && Hs(e, t) ? Ws(r, n) : (e.flags = e.flags & -4097 | 2, Re = !1, Yt = e);
        }
      } else {
        if ($i(e)) throw Error(c(418));
        e.flags = e.flags & -4097 | 2, Re = !1, Yt = e;
      }
    }
  }
  function Vs(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
    Yt = e;
  }
  function Oo(e) {
    if (e !== Yt) return !1;
    if (!Re) return Vs(e), Re = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Ii(e.type, e.memoizedProps)), t && (t = Gt)) {
      if ($i(e)) throw $s(), Error(c(418));
      for (; t; ) Ws(e, t), t = lr(t.nextSibling);
    }
    if (Vs(e), e.tag === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var n = e.data;
            if (n === "/$") {
              if (t === 0) {
                Gt = lr(e.nextSibling);
                break e;
              }
              t--;
            } else n !== "$" && n !== "$!" && n !== "$?" || t++;
          }
          e = e.nextSibling;
        }
        Gt = null;
      }
    } else Gt = Yt ? lr(e.stateNode.nextSibling) : null;
    return !0;
  }
  function $s() {
    for (var e = Gt; e; ) e = lr(e.nextSibling);
  }
  function gl() {
    Gt = Yt = null, Re = !1;
  }
  function Ki(e) {
    gn === null ? gn = [e] : gn.push(e);
  }
  var xf = Je.ReactCurrentBatchConfig;
  function Jl(e, t, n) {
    if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
      if (n._owner) {
        if (n = n._owner, n) {
          if (n.tag !== 1) throw Error(c(309));
          var r = n.stateNode;
        }
        if (!r) throw Error(c(147, e));
        var l = r, o = "" + e;
        return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
          var u = l.refs;
          i === null ? delete u[o] : u[o] = i;
        }, t._stringRef = o, t);
      }
      if (typeof e != "string") throw Error(c(284));
      if (!n._owner) throw Error(c(290, e));
    }
    return e;
  }
  function Ao(e, t) {
    throw e = Object.prototype.toString.call(t), Error(c(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
  }
  function Qs(e) {
    var t = e._init;
    return t(e._payload);
  }
  function Ks(e) {
    function t(d, a) {
      if (e) {
        var p = d.deletions;
        p === null ? (d.deletions = [a], d.flags |= 16) : p.push(a);
      }
    }
    function n(d, a) {
      if (!e) return null;
      for (; a !== null; ) t(d, a), a = a.sibling;
      return null;
    }
    function r(d, a) {
      for (d = /* @__PURE__ */ new Map(); a !== null; ) a.key !== null ? d.set(a.key, a) : d.set(a.index, a), a = a.sibling;
      return d;
    }
    function l(d, a) {
      return d = hr(d, a), d.index = 0, d.sibling = null, d;
    }
    function o(d, a, p) {
      return d.index = p, e ? (p = d.alternate, p !== null ? (p = p.index, p < a ? (d.flags |= 2, a) : p) : (d.flags |= 2, a)) : (d.flags |= 1048576, a);
    }
    function i(d) {
      return e && d.alternate === null && (d.flags |= 2), d;
    }
    function u(d, a, p, x) {
      return a === null || a.tag !== 6 ? (a = Ou(p, d.mode, x), a.return = d, a) : (a = l(a, p), a.return = d, a);
    }
    function s(d, a, p, x) {
      var L = p.type;
      return L === at ? w(d, a, p.props.children, x, p.key) : a !== null && (a.elementType === L || typeof L == "object" && L !== null && L.$$typeof === rt && Qs(L) === a.type) ? (x = l(a, p.props), x.ref = Jl(d, a, p), x.return = d, x) : (x = si(p.type, p.key, p.props, null, d.mode, x), x.ref = Jl(d, a, p), x.return = d, x);
    }
    function h(d, a, p, x) {
      return a === null || a.tag !== 4 || a.stateNode.containerInfo !== p.containerInfo || a.stateNode.implementation !== p.implementation ? (a = Au(p, d.mode, x), a.return = d, a) : (a = l(a, p.children || []), a.return = d, a);
    }
    function w(d, a, p, x, L) {
      return a === null || a.tag !== 7 ? (a = Qr(p, d.mode, x, L), a.return = d, a) : (a = l(a, p), a.return = d, a);
    }
    function k(d, a, p) {
      if (typeof a == "string" && a !== "" || typeof a == "number") return a = Ou("" + a, d.mode, p), a.return = d, a;
      if (typeof a == "object" && a !== null) {
        switch (a.$$typeof) {
          case Ct:
            return p = si(a.type, a.key, a.props, null, d.mode, p), p.ref = Jl(d, null, a), p.return = d, p;
          case ke:
            return a = Au(a, d.mode, p), a.return = d, a;
          case rt:
            var x = a._init;
            return k(d, x(a._payload), p);
        }
        if (Dn(a) || O(a)) return a = Qr(a, d.mode, p, null), a.return = d, a;
        Ao(d, a);
      }
      return null;
    }
    function g(d, a, p, x) {
      var L = a !== null ? a.key : null;
      if (typeof p == "string" && p !== "" || typeof p == "number") return L !== null ? null : u(d, a, "" + p, x);
      if (typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case Ct:
            return p.key === L ? s(d, a, p, x) : null;
          case ke:
            return p.key === L ? h(d, a, p, x) : null;
          case rt:
            return L = p._init, g(
              d,
              a,
              L(p._payload),
              x
            );
        }
        if (Dn(p) || O(p)) return L !== null ? null : w(d, a, p, x, null);
        Ao(d, p);
      }
      return null;
    }
    function C(d, a, p, x, L) {
      if (typeof x == "string" && x !== "" || typeof x == "number") return d = d.get(p) || null, u(a, d, "" + x, L);
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case Ct:
            return d = d.get(x.key === null ? p : x.key) || null, s(a, d, x, L);
          case ke:
            return d = d.get(x.key === null ? p : x.key) || null, h(a, d, x, L);
          case rt:
            var D = x._init;
            return C(d, a, p, D(x._payload), L);
        }
        if (Dn(x) || O(x)) return d = d.get(p) || null, w(a, d, x, L, null);
        Ao(a, x);
      }
      return null;
    }
    function M(d, a, p, x) {
      for (var L = null, D = null, I = a, W = a = 0, nt = null; I !== null && W < p.length; W++) {
        I.index > W ? (nt = I, I = null) : nt = I.sibling;
        var he = g(d, I, p[W], x);
        if (he === null) {
          I === null && (I = nt);
          break;
        }
        e && I && he.alternate === null && t(d, I), a = o(he, a, W), D === null ? L = he : D.sibling = he, D = he, I = nt;
      }
      if (W === p.length) return n(d, I), Re && Or(d, W), L;
      if (I === null) {
        for (; W < p.length; W++) I = k(d, p[W], x), I !== null && (a = o(I, a, W), D === null ? L = I : D.sibling = I, D = I);
        return Re && Or(d, W), L;
      }
      for (I = r(d, I); W < p.length; W++) nt = C(I, d, W, p[W], x), nt !== null && (e && nt.alternate !== null && I.delete(nt.key === null ? W : nt.key), a = o(nt, a, W), D === null ? L = nt : D.sibling = nt, D = nt);
      return e && I.forEach(function(vr) {
        return t(d, vr);
      }), Re && Or(d, W), L;
    }
    function z(d, a, p, x) {
      var L = O(p);
      if (typeof L != "function") throw Error(c(150));
      if (p = L.call(p), p == null) throw Error(c(151));
      for (var D = L = null, I = a, W = a = 0, nt = null, he = p.next(); I !== null && !he.done; W++, he = p.next()) {
        I.index > W ? (nt = I, I = null) : nt = I.sibling;
        var vr = g(d, I, he.value, x);
        if (vr === null) {
          I === null && (I = nt);
          break;
        }
        e && I && vr.alternate === null && t(d, I), a = o(vr, a, W), D === null ? L = vr : D.sibling = vr, D = vr, I = nt;
      }
      if (he.done) return n(
        d,
        I
      ), Re && Or(d, W), L;
      if (I === null) {
        for (; !he.done; W++, he = p.next()) he = k(d, he.value, x), he !== null && (a = o(he, a, W), D === null ? L = he : D.sibling = he, D = he);
        return Re && Or(d, W), L;
      }
      for (I = r(d, I); !he.done; W++, he = p.next()) he = C(I, d, W, he.value, x), he !== null && (e && he.alternate !== null && I.delete(he.key === null ? W : he.key), a = o(he, a, W), D === null ? L = he : D.sibling = he, D = he);
      return e && I.forEach(function(ed) {
        return t(d, ed);
      }), Re && Or(d, W), L;
    }
    function We(d, a, p, x) {
      if (typeof p == "object" && p !== null && p.type === at && p.key === null && (p = p.props.children), typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case Ct:
            e: {
              for (var L = p.key, D = a; D !== null; ) {
                if (D.key === L) {
                  if (L = p.type, L === at) {
                    if (D.tag === 7) {
                      n(d, D.sibling), a = l(D, p.props.children), a.return = d, d = a;
                      break e;
                    }
                  } else if (D.elementType === L || typeof L == "object" && L !== null && L.$$typeof === rt && Qs(L) === D.type) {
                    n(d, D.sibling), a = l(D, p.props), a.ref = Jl(d, D, p), a.return = d, d = a;
                    break e;
                  }
                  n(d, D);
                  break;
                } else t(d, D);
                D = D.sibling;
              }
              p.type === at ? (a = Qr(p.props.children, d.mode, x, p.key), a.return = d, d = a) : (x = si(p.type, p.key, p.props, null, d.mode, x), x.ref = Jl(d, a, p), x.return = d, d = x);
            }
            return i(d);
          case ke:
            e: {
              for (D = p.key; a !== null; ) {
                if (a.key === D) if (a.tag === 4 && a.stateNode.containerInfo === p.containerInfo && a.stateNode.implementation === p.implementation) {
                  n(d, a.sibling), a = l(a, p.children || []), a.return = d, d = a;
                  break e;
                } else {
                  n(d, a);
                  break;
                }
                else t(d, a);
                a = a.sibling;
              }
              a = Au(p, d.mode, x), a.return = d, d = a;
            }
            return i(d);
          case rt:
            return D = p._init, We(d, a, D(p._payload), x);
        }
        if (Dn(p)) return M(d, a, p, x);
        if (O(p)) return z(d, a, p, x);
        Ao(d, p);
      }
      return typeof p == "string" && p !== "" || typeof p == "number" ? (p = "" + p, a !== null && a.tag === 6 ? (n(d, a.sibling), a = l(a, p), a.return = d, d = a) : (n(d, a), a = Ou(p, d.mode, x), a.return = d, d = a), i(d)) : n(d, a);
    }
    return We;
  }
  var wl = Ks(!0), Ys = Ks(!1), Uo = or(null), Bo = null, kl = null, Yi = null;
  function Gi() {
    Yi = kl = Bo = null;
  }
  function Xi(e) {
    var t = Uo.current;
    Te(Uo), e._currentValue = t;
  }
  function Zi(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function xl(e, t) {
    Bo = e, Yi = kl = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (jt = !0), e.firstContext = null);
  }
  function bt(e) {
    var t = e._currentValue;
    if (Yi !== e) if (e = { context: e, memoizedValue: t, next: null }, kl === null) {
      if (Bo === null) throw Error(c(308));
      kl = e, Bo.dependencies = { lanes: 0, firstContext: e };
    } else kl = kl.next = e;
    return t;
  }
  var Ar = null;
  function Ji(e) {
    Ar === null ? Ar = [e] : Ar.push(e);
  }
  function Gs(e, t, n, r) {
    var l = t.interleaved;
    return l === null ? (n.next = n, Ji(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Qn(e, r);
  }
  function Qn(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
    return n.tag === 3 ? n.stateNode : null;
  }
  var sr = !1;
  function qi(e) {
    e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Xs(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
  }
  function Kn(e, t) {
    return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ar(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (de & 2) !== 0) {
      var l = r.pending;
      return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Qn(e, n);
    }
    return l = r.interleaved, l === null ? (t.next = t, Ji(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Qn(e, n);
  }
  function Wo(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, Zt(e, n);
    }
  }
  function Zs(e, t) {
    var n = e.updateQueue, r = e.alternate;
    if (r !== null && (r = r.updateQueue, n === r)) {
      var l = null, o = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var i = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
          o === null ? l = o = i : o = o.next = i, n = n.next;
        } while (n !== null);
        o === null ? l = o = t : o = o.next = t;
      } else l = o = t;
      n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  function Ho(e, t, n, r) {
    var l = e.updateQueue;
    sr = !1;
    var o = l.firstBaseUpdate, i = l.lastBaseUpdate, u = l.shared.pending;
    if (u !== null) {
      l.shared.pending = null;
      var s = u, h = s.next;
      s.next = null, i === null ? o = h : i.next = h, i = s;
      var w = e.alternate;
      w !== null && (w = w.updateQueue, u = w.lastBaseUpdate, u !== i && (u === null ? w.firstBaseUpdate = h : u.next = h, w.lastBaseUpdate = s));
    }
    if (o !== null) {
      var k = l.baseState;
      i = 0, w = h = s = null, u = o;
      do {
        var g = u.lane, C = u.eventTime;
        if ((r & g) === g) {
          w !== null && (w = w.next = {
            eventTime: C,
            lane: 0,
            tag: u.tag,
            payload: u.payload,
            callback: u.callback,
            next: null
          });
          e: {
            var M = e, z = u;
            switch (g = t, C = n, z.tag) {
              case 1:
                if (M = z.payload, typeof M == "function") {
                  k = M.call(C, k, g);
                  break e;
                }
                k = M;
                break e;
              case 3:
                M.flags = M.flags & -65537 | 128;
              case 0:
                if (M = z.payload, g = typeof M == "function" ? M.call(C, k, g) : M, g == null) break e;
                k = N({}, k, g);
                break e;
              case 2:
                sr = !0;
            }
          }
          u.callback !== null && u.lane !== 0 && (e.flags |= 64, g = l.effects, g === null ? l.effects = [u] : g.push(u));
        } else C = { eventTime: C, lane: g, tag: u.tag, payload: u.payload, callback: u.callback, next: null }, w === null ? (h = w = C, s = k) : w = w.next = C, i |= g;
        if (u = u.next, u === null) {
          if (u = l.shared.pending, u === null) break;
          g = u, u = g.next, g.next = null, l.lastBaseUpdate = g, l.shared.pending = null;
        }
      } while (!0);
      if (w === null && (s = k), l.baseState = s, l.firstBaseUpdate = h, l.lastBaseUpdate = w, t = l.shared.interleaved, t !== null) {
        l = t;
        do
          i |= l.lane, l = l.next;
        while (l !== t);
      } else o === null && (l.shared.lanes = 0);
      Wr |= i, e.lanes = i, e.memoizedState = k;
    }
  }
  function Js(e, t, n) {
    if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
      var r = e[t], l = r.callback;
      if (l !== null) {
        if (r.callback = null, r = n, typeof l != "function") throw Error(c(191, l));
        l.call(r);
      }
    }
  }
  var ql = {}, Tn = or(ql), bl = or(ql), eo = or(ql);
  function Ur(e) {
    if (e === ql) throw Error(c(174));
    return e;
  }
  function bi(e, t) {
    switch (Pe(eo, t), Pe(bl, e), Pe(Tn, ql), e = t.nodeType, e) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : J(null, "");
        break;
      default:
        e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = J(t, e);
    }
    Te(Tn), Pe(Tn, t);
  }
  function Sl() {
    Te(Tn), Te(bl), Te(eo);
  }
  function qs(e) {
    Ur(eo.current);
    var t = Ur(Tn.current), n = J(t, e.type);
    t !== n && (Pe(bl, e), Pe(Tn, n));
  }
  function eu(e) {
    bl.current === e && (Te(Tn), Te(bl));
  }
  var je = or(0);
  function Vo(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var tu = [];
  function nu() {
    for (var e = 0; e < tu.length; e++) tu[e]._workInProgressVersionPrimary = null;
    tu.length = 0;
  }
  var $o = Je.ReactCurrentDispatcher, ru = Je.ReactCurrentBatchConfig, Br = 0, Fe = null, Ge = null, et = null, Qo = !1, to = !1, no = 0, Sf = 0;
  function ht() {
    throw Error(c(321));
  }
  function lu(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++) if (!yn(e[n], t[n])) return !1;
    return !0;
  }
  function ou(e, t, n, r, l, o) {
    if (Br = o, Fe = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, $o.current = e === null || e.memoizedState === null ? Nf : Pf, e = n(r, l), to) {
      o = 0;
      do {
        if (to = !1, no = 0, 25 <= o) throw Error(c(301));
        o += 1, et = Ge = null, t.updateQueue = null, $o.current = Mf, e = n(r, l);
      } while (to);
    }
    if ($o.current = Go, t = Ge !== null && Ge.next !== null, Br = 0, et = Ge = Fe = null, Qo = !1, t) throw Error(c(300));
    return e;
  }
  function iu() {
    var e = no !== 0;
    return no = 0, e;
  }
  function Rn() {
    var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return et === null ? Fe.memoizedState = et = e : et = et.next = e, et;
  }
  function en() {
    if (Ge === null) {
      var e = Fe.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ge.next;
    var t = et === null ? Fe.memoizedState : et.next;
    if (t !== null) et = t, Ge = e;
    else {
      if (e === null) throw Error(c(310));
      Ge = e, e = { memoizedState: Ge.memoizedState, baseState: Ge.baseState, baseQueue: Ge.baseQueue, queue: Ge.queue, next: null }, et === null ? Fe.memoizedState = et = e : et = et.next = e;
    }
    return et;
  }
  function ro(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function uu(e) {
    var t = en(), n = t.queue;
    if (n === null) throw Error(c(311));
    n.lastRenderedReducer = e;
    var r = Ge, l = r.baseQueue, o = n.pending;
    if (o !== null) {
      if (l !== null) {
        var i = l.next;
        l.next = o.next, o.next = i;
      }
      r.baseQueue = l = o, n.pending = null;
    }
    if (l !== null) {
      o = l.next, r = r.baseState;
      var u = i = null, s = null, h = o;
      do {
        var w = h.lane;
        if ((Br & w) === w) s !== null && (s = s.next = { lane: 0, action: h.action, hasEagerState: h.hasEagerState, eagerState: h.eagerState, next: null }), r = h.hasEagerState ? h.eagerState : e(r, h.action);
        else {
          var k = {
            lane: w,
            action: h.action,
            hasEagerState: h.hasEagerState,
            eagerState: h.eagerState,
            next: null
          };
          s === null ? (u = s = k, i = r) : s = s.next = k, Fe.lanes |= w, Wr |= w;
        }
        h = h.next;
      } while (h !== null && h !== o);
      s === null ? i = r : s.next = u, yn(r, t.memoizedState) || (jt = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = s, n.lastRenderedState = r;
    }
    if (e = n.interleaved, e !== null) {
      l = e;
      do
        o = l.lane, Fe.lanes |= o, Wr |= o, l = l.next;
      while (l !== e);
    } else l === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch];
  }
  function su(e) {
    var t = en(), n = t.queue;
    if (n === null) throw Error(c(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch, l = n.pending, o = t.memoizedState;
    if (l !== null) {
      n.pending = null;
      var i = l = l.next;
      do
        o = e(o, i.action), i = i.next;
      while (i !== l);
      yn(o, t.memoizedState) || (jt = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
    }
    return [o, r];
  }
  function bs() {
  }
  function ea(e, t) {
    var n = Fe, r = en(), l = t(), o = !yn(r.memoizedState, l);
    if (o && (r.memoizedState = l, jt = !0), r = r.queue, au(ra.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || et !== null && et.memoizedState.tag & 1) {
      if (n.flags |= 2048, lo(9, na.bind(null, n, r, l, t), void 0, null), tt === null) throw Error(c(349));
      (Br & 30) !== 0 || ta(n, t, l);
    }
    return l;
  }
  function ta(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Fe.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Fe.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function na(e, t, n, r) {
    t.value = n, t.getSnapshot = r, la(t) && oa(e);
  }
  function ra(e, t, n) {
    return n(function() {
      la(t) && oa(e);
    });
  }
  function la(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !yn(e, n);
    } catch {
      return !0;
    }
  }
  function oa(e) {
    var t = Qn(e, 1);
    t !== null && Sn(t, e, 1, -1);
  }
  function ia(e) {
    var t = Rn();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ro, lastRenderedState: e }, t.queue = e, e = e.dispatch = _f.bind(null, Fe, e), [t.memoizedState, e];
  }
  function lo(e, t, n, r) {
    return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = Fe.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Fe.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
  }
  function ua() {
    return en().memoizedState;
  }
  function Ko(e, t, n, r) {
    var l = Rn();
    Fe.flags |= e, l.memoizedState = lo(1 | t, n, void 0, r === void 0 ? null : r);
  }
  function Yo(e, t, n, r) {
    var l = en();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (Ge !== null) {
      var i = Ge.memoizedState;
      if (o = i.destroy, r !== null && lu(r, i.deps)) {
        l.memoizedState = lo(t, n, o, r);
        return;
      }
    }
    Fe.flags |= e, l.memoizedState = lo(1 | t, n, o, r);
  }
  function sa(e, t) {
    return Ko(8390656, 8, e, t);
  }
  function au(e, t) {
    return Yo(2048, 8, e, t);
  }
  function aa(e, t) {
    return Yo(4, 2, e, t);
  }
  function ca(e, t) {
    return Yo(4, 4, e, t);
  }
  function fa(e, t) {
    if (typeof t == "function") return e = e(), t(e), function() {
      t(null);
    };
    if (t != null) return e = e(), t.current = e, function() {
      t.current = null;
    };
  }
  function da(e, t, n) {
    return n = n != null ? n.concat([e]) : null, Yo(4, 4, fa.bind(null, t, e), n);
  }
  function cu() {
  }
  function pa(e, t) {
    var n = en();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && lu(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
  }
  function ma(e, t) {
    var n = en();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && lu(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
  }
  function ha(e, t, n) {
    return (Br & 21) === 0 ? (e.baseState && (e.baseState = !1, jt = !0), e.memoizedState = n) : (yn(n, t) || (n = Fl(), Fe.lanes |= n, Wr |= n, e.baseState = !0), t);
  }
  function Ef(e, t) {
    var n = me;
    me = n !== 0 && 4 > n ? n : 4, e(!0);
    var r = ru.transition;
    ru.transition = {};
    try {
      e(!1), t();
    } finally {
      me = n, ru.transition = r;
    }
  }
  function va() {
    return en().memoizedState;
  }
  function Cf(e, t, n) {
    var r = pr(e);
    if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, ya(e)) ga(t, n);
    else if (n = Gs(e, t, n, r), n !== null) {
      var l = St();
      Sn(n, e, r, l), wa(n, t, r);
    }
  }
  function _f(e, t, n) {
    var r = pr(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
    if (ya(e)) ga(t, l);
    else {
      var o = e.alternate;
      if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
        var i = t.lastRenderedState, u = o(i, n);
        if (l.hasEagerState = !0, l.eagerState = u, yn(u, i)) {
          var s = t.interleaved;
          s === null ? (l.next = l, Ji(t)) : (l.next = s.next, s.next = l), t.interleaved = l;
          return;
        }
      } catch {
      } finally {
      }
      n = Gs(e, t, l, r), n !== null && (l = St(), Sn(n, e, r, l), wa(n, t, r));
    }
  }
  function ya(e) {
    var t = e.alternate;
    return e === Fe || t !== null && t === Fe;
  }
  function ga(e, t) {
    to = Qo = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function wa(e, t, n) {
    if ((n & 4194240) !== 0) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, Zt(e, n);
    }
  }
  var Go = { readContext: bt, useCallback: ht, useContext: ht, useEffect: ht, useImperativeHandle: ht, useInsertionEffect: ht, useLayoutEffect: ht, useMemo: ht, useReducer: ht, useRef: ht, useState: ht, useDebugValue: ht, useDeferredValue: ht, useTransition: ht, useMutableSource: ht, useSyncExternalStore: ht, useId: ht, unstable_isNewReconciler: !1 }, Nf = { readContext: bt, useCallback: function(e, t) {
    return Rn().memoizedState = [e, t === void 0 ? null : t], e;
  }, useContext: bt, useEffect: sa, useImperativeHandle: function(e, t, n) {
    return n = n != null ? n.concat([e]) : null, Ko(
      4194308,
      4,
      fa.bind(null, t, e),
      n
    );
  }, useLayoutEffect: function(e, t) {
    return Ko(4194308, 4, e, t);
  }, useInsertionEffect: function(e, t) {
    return Ko(4, 2, e, t);
  }, useMemo: function(e, t) {
    var n = Rn();
    return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
  }, useReducer: function(e, t, n) {
    var r = Rn();
    return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Cf.bind(null, Fe, e), [r.memoizedState, e];
  }, useRef: function(e) {
    var t = Rn();
    return e = { current: e }, t.memoizedState = e;
  }, useState: ia, useDebugValue: cu, useDeferredValue: function(e) {
    return Rn().memoizedState = e;
  }, useTransition: function() {
    var e = ia(!1), t = e[0];
    return e = Ef.bind(null, e[1]), Rn().memoizedState = e, [t, e];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(e, t, n) {
    var r = Fe, l = Rn();
    if (Re) {
      if (n === void 0) throw Error(c(407));
      n = n();
    } else {
      if (n = t(), tt === null) throw Error(c(349));
      (Br & 30) !== 0 || ta(r, t, n);
    }
    l.memoizedState = n;
    var o = { value: n, getSnapshot: t };
    return l.queue = o, sa(ra.bind(
      null,
      r,
      o,
      e
    ), [e]), r.flags |= 2048, lo(9, na.bind(null, r, o, n, t), void 0, null), n;
  }, useId: function() {
    var e = Rn(), t = tt.identifierPrefix;
    if (Re) {
      var n = $n, r = Vn;
      n = (r & ~(1 << 32 - Ke(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = no++, 0 < n && (t += "H" + n.toString(32)), t += ":";
    } else n = Sf++, t = ":" + t + "r" + n.toString(32) + ":";
    return e.memoizedState = t;
  }, unstable_isNewReconciler: !1 }, Pf = {
    readContext: bt,
    useCallback: pa,
    useContext: bt,
    useEffect: au,
    useImperativeHandle: da,
    useInsertionEffect: aa,
    useLayoutEffect: ca,
    useMemo: ma,
    useReducer: uu,
    useRef: ua,
    useState: function() {
      return uu(ro);
    },
    useDebugValue: cu,
    useDeferredValue: function(e) {
      var t = en();
      return ha(t, Ge.memoizedState, e);
    },
    useTransition: function() {
      var e = uu(ro)[0], t = en().memoizedState;
      return [e, t];
    },
    useMutableSource: bs,
    useSyncExternalStore: ea,
    useId: va,
    unstable_isNewReconciler: !1
  }, Mf = { readContext: bt, useCallback: pa, useContext: bt, useEffect: au, useImperativeHandle: da, useInsertionEffect: aa, useLayoutEffect: ca, useMemo: ma, useReducer: su, useRef: ua, useState: function() {
    return su(ro);
  }, useDebugValue: cu, useDeferredValue: function(e) {
    var t = en();
    return Ge === null ? t.memoizedState = e : ha(t, Ge.memoizedState, e);
  }, useTransition: function() {
    var e = su(ro)[0], t = en().memoizedState;
    return [e, t];
  }, useMutableSource: bs, useSyncExternalStore: ea, useId: va, unstable_isNewReconciler: !1 };
  function wn(e, t) {
    if (e && e.defaultProps) {
      t = N({}, t), e = e.defaultProps;
      for (var n in e) t[n] === void 0 && (t[n] = e[n]);
      return t;
    }
    return t;
  }
  function fu(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : N({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var Xo = { isMounted: function(e) {
    return (e = e._reactInternals) ? Ht(e) === e : !1;
  }, enqueueSetState: function(e, t, n) {
    e = e._reactInternals;
    var r = St(), l = pr(e), o = Kn(r, l);
    o.payload = t, n != null && (o.callback = n), t = ar(e, o, l), t !== null && (Sn(t, e, l, r), Wo(t, e, l));
  }, enqueueReplaceState: function(e, t, n) {
    e = e._reactInternals;
    var r = St(), l = pr(e), o = Kn(r, l);
    o.tag = 1, o.payload = t, n != null && (o.callback = n), t = ar(e, o, l), t !== null && (Sn(t, e, l, r), Wo(t, e, l));
  }, enqueueForceUpdate: function(e, t) {
    e = e._reactInternals;
    var n = St(), r = pr(e), l = Kn(n, r);
    l.tag = 2, t != null && (l.callback = t), t = ar(e, l, r), t !== null && (Sn(t, e, r, n), Wo(t, e, r));
  } };
  function ka(e, t, n, r, l, o, i) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !$l(n, r) || !$l(l, o) : !0;
  }
  function xa(e, t, n) {
    var r = !1, l = ir, o = t.contextType;
    return typeof o == "object" && o !== null ? o = bt(o) : (l = Rt(t) ? Dr : mt.current, r = t.contextTypes, o = (r = r != null) ? hl(e, l) : ir), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Xo, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = o), t;
  }
  function Sa(e, t, n, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Xo.enqueueReplaceState(t, t.state, null);
  }
  function du(e, t, n, r) {
    var l = e.stateNode;
    l.props = n, l.state = e.memoizedState, l.refs = {}, qi(e);
    var o = t.contextType;
    typeof o == "object" && o !== null ? l.context = bt(o) : (o = Rt(t) ? Dr : mt.current, l.context = hl(e, o)), l.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (fu(e, t, o, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && Xo.enqueueReplaceState(l, l.state, null), Ho(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
  }
  function El(e, t) {
    try {
      var n = "", r = t;
      do
        n += b(r), r = r.return;
      while (r);
      var l = n;
    } catch (o) {
      l = `
Error generating stack: ` + o.message + `
` + o.stack;
    }
    return { value: e, source: t, stack: l, digest: null };
  }
  function pu(e, t, n) {
    return { value: e, source: null, stack: n ?? null, digest: t ?? null };
  }
  function mu(e, t) {
    try {
      console.error(t.value);
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  var zf = typeof WeakMap == "function" ? WeakMap : Map;
  function Ea(e, t, n) {
    n = Kn(-1, n), n.tag = 3, n.payload = { element: null };
    var r = t.value;
    return n.callback = function() {
      ni || (ni = !0, zu = r), mu(e, t);
    }, n;
  }
  function Ca(e, t, n) {
    n = Kn(-1, n), n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var l = t.value;
      n.payload = function() {
        return r(l);
      }, n.callback = function() {
        mu(e, t);
      };
    }
    var o = e.stateNode;
    return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
      mu(e, t), typeof r != "function" && (fr === null ? fr = /* @__PURE__ */ new Set([this]) : fr.add(this));
      var i = t.stack;
      this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
    }), n;
  }
  function _a(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new zf();
      var l = /* @__PURE__ */ new Set();
      r.set(t, l);
    } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
    l.has(n) || (l.add(n), e = Vf.bind(null, e, t, n), t.then(e, e));
  }
  function Na(e) {
    do {
      var t;
      if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Pa(e, t, n, r, l) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Kn(-1, 1), t.tag = 2, ar(n, t, 1))), n.lanes |= 1), e) : (e.flags |= 65536, e.lanes = l, e);
  }
  var Lf = Je.ReactCurrentOwner, jt = !1;
  function xt(e, t, n, r) {
    t.child = e === null ? Ys(t, null, n, r) : wl(t, e.child, n, r);
  }
  function Ma(e, t, n, r, l) {
    n = n.render;
    var o = t.ref;
    return xl(t, l), r = ou(e, t, n, r, o, l), n = iu(), e !== null && !jt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Yn(e, t, l)) : (Re && n && Hi(t), t.flags |= 1, xt(e, t, r, l), t.child);
  }
  function za(e, t, n, r, l) {
    if (e === null) {
      var o = n.type;
      return typeof o == "function" && !Iu(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, La(e, t, o, r, l)) : (e = si(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (o = e.child, (e.lanes & l) === 0) {
      var i = o.memoizedProps;
      if (n = n.compare, n = n !== null ? n : $l, n(i, r) && e.ref === t.ref) return Yn(e, t, l);
    }
    return t.flags |= 1, e = hr(o, r), e.ref = t.ref, e.return = t, t.child = e;
  }
  function La(e, t, n, r, l) {
    if (e !== null) {
      var o = e.memoizedProps;
      if ($l(o, r) && e.ref === t.ref) if (jt = !1, t.pendingProps = r = o, (e.lanes & l) !== 0) (e.flags & 131072) !== 0 && (jt = !0);
      else return t.lanes = e.lanes, Yn(e, t, l);
    }
    return hu(e, t, n, r, l);
  }
  function Ta(e, t, n) {
    var r = t.pendingProps, l = r.children, o = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden") if ((t.mode & 1) === 0) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Pe(_l, Xt), Xt |= n;
    else {
      if ((n & 1073741824) === 0) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Pe(_l, Xt), Xt |= e, null;
      t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, Pe(_l, Xt), Xt |= r;
    }
    else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, Pe(_l, Xt), Xt |= r;
    return xt(e, t, l, n), t.child;
  }
  function Ra(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
  }
  function hu(e, t, n, r, l) {
    var o = Rt(n) ? Dr : mt.current;
    return o = hl(t, o), xl(t, l), n = ou(e, t, n, r, o, l), r = iu(), e !== null && !jt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Yn(e, t, l)) : (Re && r && Hi(t), t.flags |= 1, xt(e, t, n, l), t.child);
  }
  function ja(e, t, n, r, l) {
    if (Rt(n)) {
      var o = !0;
      jo(t);
    } else o = !1;
    if (xl(t, l), t.stateNode === null) Jo(e, t), xa(t, n, r), du(t, n, r, l), r = !0;
    else if (e === null) {
      var i = t.stateNode, u = t.memoizedProps;
      i.props = u;
      var s = i.context, h = n.contextType;
      typeof h == "object" && h !== null ? h = bt(h) : (h = Rt(n) ? Dr : mt.current, h = hl(t, h));
      var w = n.getDerivedStateFromProps, k = typeof w == "function" || typeof i.getSnapshotBeforeUpdate == "function";
      k || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== r || s !== h) && Sa(t, i, r, h), sr = !1;
      var g = t.memoizedState;
      i.state = g, Ho(t, r, i, l), s = t.memoizedState, u !== r || g !== s || Tt.current || sr ? (typeof w == "function" && (fu(t, n, w, r), s = t.memoizedState), (u = sr || ka(t, n, u, r, g, s, h)) ? (k || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = s), i.props = r, i.state = s, i.context = h, r = u) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
    } else {
      i = t.stateNode, Xs(e, t), u = t.memoizedProps, h = t.type === t.elementType ? u : wn(t.type, u), i.props = h, k = t.pendingProps, g = i.context, s = n.contextType, typeof s == "object" && s !== null ? s = bt(s) : (s = Rt(n) ? Dr : mt.current, s = hl(t, s));
      var C = n.getDerivedStateFromProps;
      (w = typeof C == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (u !== k || g !== s) && Sa(t, i, r, s), sr = !1, g = t.memoizedState, i.state = g, Ho(t, r, i, l);
      var M = t.memoizedState;
      u !== k || g !== M || Tt.current || sr ? (typeof C == "function" && (fu(t, n, C, r), M = t.memoizedState), (h = sr || ka(t, n, h, r, g, M, s) || !1) ? (w || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, M, s), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, M, s)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && g === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && g === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = M), i.props = r, i.state = M, i.context = s, r = h) : (typeof i.componentDidUpdate != "function" || u === e.memoizedProps && g === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && g === e.memoizedState || (t.flags |= 1024), r = !1);
    }
    return vu(e, t, n, r, o, l);
  }
  function vu(e, t, n, r, l, o) {
    Ra(e, t);
    var i = (t.flags & 128) !== 0;
    if (!r && !i) return l && As(t, n, !1), Yn(e, t, o);
    r = t.stateNode, Lf.current = t;
    var u = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && i ? (t.child = wl(t, e.child, null, o), t.child = wl(t, null, u, o)) : xt(e, t, u, o), t.memoizedState = r.state, l && As(t, n, !0), t.child;
  }
  function Fa(e) {
    var t = e.stateNode;
    t.pendingContext ? Is(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Is(e, t.context, !1), bi(e, t.containerInfo);
  }
  function Da(e, t, n, r, l) {
    return gl(), Ki(l), t.flags |= 256, xt(e, t, n, r), t.child;
  }
  var yu = { dehydrated: null, treeContext: null, retryLane: 0 };
  function gu(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Ia(e, t, n) {
    var r = t.pendingProps, l = je.current, o = !1, i = (t.flags & 128) !== 0, u;
    if ((u = i) || (u = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), u ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Pe(je, l & 1), e === null)
      return Qi(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, (r & 1) === 0 && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = ai(i, r, 0, null), e = Qr(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = gu(n), t.memoizedState = yu, e) : wu(t, i));
    if (l = e.memoizedState, l !== null && (u = l.dehydrated, u !== null)) return Tf(e, t, i, r, u, l, n);
    if (o) {
      o = r.fallback, i = t.mode, l = e.child, u = l.sibling;
      var s = { mode: "hidden", children: r.children };
      return (i & 1) === 0 && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = s, t.deletions = null) : (r = hr(l, s), r.subtreeFlags = l.subtreeFlags & 14680064), u !== null ? o = hr(u, o) : (o = Qr(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? gu(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = yu, r;
    }
    return o = e.child, e = o.sibling, r = hr(o, { mode: "visible", children: r.children }), (t.mode & 1) === 0 && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
  }
  function wu(e, t) {
    return t = ai({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
  }
  function Zo(e, t, n, r) {
    return r !== null && Ki(r), wl(t, e.child, null, n), e = wu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
  }
  function Tf(e, t, n, r, l, o, i) {
    if (n)
      return t.flags & 256 ? (t.flags &= -257, r = pu(Error(c(422))), Zo(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, l = t.mode, r = ai({ mode: "visible", children: r.children }, l, 0, null), o = Qr(o, l, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, (t.mode & 1) !== 0 && wl(t, e.child, null, i), t.child.memoizedState = gu(i), t.memoizedState = yu, o);
    if ((t.mode & 1) === 0) return Zo(e, t, i, null);
    if (l.data === "$!") {
      if (r = l.nextSibling && l.nextSibling.dataset, r) var u = r.dgst;
      return r = u, o = Error(c(419)), r = pu(o, r, void 0), Zo(e, t, i, r);
    }
    if (u = (i & e.childLanes) !== 0, jt || u) {
      if (r = tt, r !== null) {
        switch (i & -i) {
          case 4:
            l = 2;
            break;
          case 16:
            l = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            l = 32;
            break;
          case 536870912:
            l = 268435456;
            break;
          default:
            l = 0;
        }
        l = (l & (r.suspendedLanes | i)) !== 0 ? 0 : l, l !== 0 && l !== o.retryLane && (o.retryLane = l, Qn(e, l), Sn(r, e, l, -1));
      }
      return Du(), r = pu(Error(c(421))), Zo(e, t, i, r);
    }
    return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = $f.bind(null, e), l._reactRetry = t, null) : (e = o.treeContext, Gt = lr(l.nextSibling), Yt = t, Re = !0, gn = null, e !== null && (Jt[qt++] = Vn, Jt[qt++] = $n, Jt[qt++] = Ir, Vn = e.id, $n = e.overflow, Ir = t), t = wu(t, r.children), t.flags |= 4096, t);
  }
  function Oa(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Zi(e.return, t, n);
  }
  function ku(e, t, n, r, l) {
    var o = e.memoizedState;
    o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = l);
  }
  function Aa(e, t, n) {
    var r = t.pendingProps, l = r.revealOrder, o = r.tail;
    if (xt(e, t, r.children, n), r = je.current, (r & 2) !== 0) r = r & 1 | 2, t.flags |= 128;
    else {
      if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Oa(e, n, t);
        else if (e.tag === 19) Oa(e, n, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
      r &= 1;
    }
    if (Pe(je, r), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && Vo(e) === null && (l = n), n = n.sibling;
        n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), ku(t, !1, l, n, o);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && Vo(e) === null) {
            t.child = l;
            break;
          }
          e = l.sibling, l.sibling = n, n = l, l = e;
        }
        ku(t, !0, n, null, o);
        break;
      case "together":
        ku(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Jo(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
  }
  function Yn(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), Wr |= t.lanes, (n & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(c(153));
    if (t.child !== null) {
      for (e = t.child, n = hr(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = hr(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function Rf(e, t, n) {
    switch (t.tag) {
      case 3:
        Fa(t), gl();
        break;
      case 5:
        qs(t);
        break;
      case 1:
        Rt(t.type) && jo(t);
        break;
      case 4:
        bi(t, t.stateNode.containerInfo);
        break;
      case 10:
        var r = t.type._context, l = t.memoizedProps.value;
        Pe(Uo, r._currentValue), r._currentValue = l;
        break;
      case 13:
        if (r = t.memoizedState, r !== null)
          return r.dehydrated !== null ? (Pe(je, je.current & 1), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? Ia(e, t, n) : (Pe(je, je.current & 1), e = Yn(e, t, n), e !== null ? e.sibling : null);
        Pe(je, je.current & 1);
        break;
      case 19:
        if (r = (n & t.childLanes) !== 0, (e.flags & 128) !== 0) {
          if (r) return Aa(e, t, n);
          t.flags |= 128;
        }
        if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), Pe(je, je.current), r) break;
        return null;
      case 22:
      case 23:
        return t.lanes = 0, Ta(e, t, n);
    }
    return Yn(e, t, n);
  }
  var Ua, xu, Ba, Wa;
  Ua = function(e, t) {
    for (var n = t.child; n !== null; ) {
      if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
      else if (n.tag !== 4 && n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
  }, xu = function() {
  }, Ba = function(e, t, n, r) {
    var l = e.memoizedProps;
    if (l !== r) {
      e = t.stateNode, Ur(Tn.current);
      var o = null;
      switch (n) {
        case "input":
          l = Ce(e, l), r = Ce(e, r), o = [];
          break;
        case "select":
          l = N({}, l, { value: void 0 }), r = N({}, r, { value: void 0 }), o = [];
          break;
        case "textarea":
          l = Xr(e, l), r = Xr(e, r), o = [];
          break;
        default:
          typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Lo);
      }
      In(n, r);
      var i;
      n = null;
      for (h in l) if (!r.hasOwnProperty(h) && l.hasOwnProperty(h) && l[h] != null) if (h === "style") {
        var u = l[h];
        for (i in u) u.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
      } else h !== "dangerouslySetInnerHTML" && h !== "children" && h !== "suppressContentEditableWarning" && h !== "suppressHydrationWarning" && h !== "autoFocus" && (T.hasOwnProperty(h) ? o || (o = []) : (o = o || []).push(h, null));
      for (h in r) {
        var s = r[h];
        if (u = l != null ? l[h] : void 0, r.hasOwnProperty(h) && s !== u && (s != null || u != null)) if (h === "style") if (u) {
          for (i in u) !u.hasOwnProperty(i) || s && s.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
          for (i in s) s.hasOwnProperty(i) && u[i] !== s[i] && (n || (n = {}), n[i] = s[i]);
        } else n || (o || (o = []), o.push(
          h,
          n
        )), n = s;
        else h === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, u = u ? u.__html : void 0, s != null && u !== s && (o = o || []).push(h, s)) : h === "children" ? typeof s != "string" && typeof s != "number" || (o = o || []).push(h, "" + s) : h !== "suppressContentEditableWarning" && h !== "suppressHydrationWarning" && (T.hasOwnProperty(h) ? (s != null && h === "onScroll" && Le("scroll", e), o || u === s || (o = [])) : (o = o || []).push(h, s));
      }
      n && (o = o || []).push("style", n);
      var h = o;
      (t.updateQueue = h) && (t.flags |= 4);
    }
  }, Wa = function(e, t, n, r) {
    n !== r && (t.flags |= 4);
  };
  function oo(e, t) {
    if (!Re) switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
        n === null ? e.tail = null : n.sibling = null;
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
        r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
    }
  }
  function vt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
    if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
    else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t;
  }
  function jf(e, t, n) {
    var r = t.pendingProps;
    switch (Vi(t), t.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return vt(t), null;
      case 1:
        return Rt(t.type) && Ro(), vt(t), null;
      case 3:
        return r = t.stateNode, Sl(), Te(Tt), Te(mt), nu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Oo(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, gn !== null && (Ru(gn), gn = null))), xu(e, t), vt(t), null;
      case 5:
        eu(t);
        var l = Ur(eo.current);
        if (n = t.type, e !== null && t.stateNode != null) Ba(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
        else {
          if (!r) {
            if (t.stateNode === null) throw Error(c(166));
            return vt(t), null;
          }
          if (e = Ur(Tn.current), Oo(t)) {
            r = t.stateNode, n = t.type;
            var o = t.memoizedProps;
            switch (r[Ln] = t, r[Xl] = o, e = (t.mode & 1) !== 0, n) {
              case "dialog":
                Le("cancel", r), Le("close", r);
                break;
              case "iframe":
              case "object":
              case "embed":
                Le("load", r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < Kl.length; l++) Le(Kl[l], r);
                break;
              case "source":
                Le("error", r);
                break;
              case "img":
              case "image":
              case "link":
                Le(
                  "error",
                  r
                ), Le("load", r);
                break;
              case "details":
                Le("toggle", r);
                break;
              case "input":
                gr(r, o), Le("invalid", r);
                break;
              case "select":
                r._wrapperState = { wasMultiple: !!o.multiple }, Le("invalid", r);
                break;
              case "textarea":
                Ll(r, o), Le("invalid", r);
            }
            In(n, o), l = null;
            for (var i in o) if (o.hasOwnProperty(i)) {
              var u = o[i];
              i === "children" ? typeof u == "string" ? r.textContent !== u && (o.suppressHydrationWarning !== !0 && zo(r.textContent, u, e), l = ["children", u]) : typeof u == "number" && r.textContent !== "" + u && (o.suppressHydrationWarning !== !0 && zo(
                r.textContent,
                u,
                e
              ), l = ["children", "" + u]) : T.hasOwnProperty(i) && u != null && i === "onScroll" && Le("scroll", r);
            }
            switch (n) {
              case "input":
                on(r), wr(r, o, !0);
                break;
              case "textarea":
                on(r), A(r);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof o.onClick == "function" && (r.onclick = Lo);
            }
            r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
          } else {
            i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = ae(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[Ln] = t, e[Xl] = r, Ua(e, t, !1, !1), t.stateNode = e;
            e: {
              switch (i = On(n, r), n) {
                case "dialog":
                  Le("cancel", e), Le("close", e), l = r;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Le("load", e), l = r;
                  break;
                case "video":
                case "audio":
                  for (l = 0; l < Kl.length; l++) Le(Kl[l], e);
                  l = r;
                  break;
                case "source":
                  Le("error", e), l = r;
                  break;
                case "img":
                case "image":
                case "link":
                  Le(
                    "error",
                    e
                  ), Le("load", e), l = r;
                  break;
                case "details":
                  Le("toggle", e), l = r;
                  break;
                case "input":
                  gr(e, r), l = Ce(e, r), Le("invalid", e);
                  break;
                case "option":
                  l = r;
                  break;
                case "select":
                  e._wrapperState = { wasMultiple: !!r.multiple }, l = N({}, r, { value: void 0 }), Le("invalid", e);
                  break;
                case "textarea":
                  Ll(e, r), l = Xr(e, r), Le("invalid", e);
                  break;
                default:
                  l = r;
              }
              In(n, l), u = l;
              for (o in u) if (u.hasOwnProperty(o)) {
                var s = u[o];
                o === "style" ? Ut(e, s) : o === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && K(e, s)) : o === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && En(e, s) : typeof s == "number" && En(e, "" + s) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (T.hasOwnProperty(o) ? s != null && o === "onScroll" && Le("scroll", e) : s != null && Et(e, o, s, i));
              }
              switch (n) {
                case "input":
                  on(e), wr(e, r, !1);
                  break;
                case "textarea":
                  on(e), A(e);
                  break;
                case "option":
                  r.value != null && e.setAttribute("value", "" + pe(r.value));
                  break;
                case "select":
                  e.multiple = !!r.multiple, o = r.value, o != null ? un(e, !!r.multiple, o, !1) : r.defaultValue != null && un(
                    e,
                    !!r.multiple,
                    r.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof l.onClick == "function" && (e.onclick = Lo);
              }
              switch (n) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  r = !!r.autoFocus;
                  break e;
                case "img":
                  r = !0;
                  break e;
                default:
                  r = !1;
              }
            }
            r && (t.flags |= 4);
          }
          t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
        }
        return vt(t), null;
      case 6:
        if (e && t.stateNode != null) Wa(e, t, e.memoizedProps, r);
        else {
          if (typeof r != "string" && t.stateNode === null) throw Error(c(166));
          if (n = Ur(eo.current), Ur(Tn.current), Oo(t)) {
            if (r = t.stateNode, n = t.memoizedProps, r[Ln] = t, (o = r.nodeValue !== n) && (e = Yt, e !== null)) switch (e.tag) {
              case 3:
                zo(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 && zo(r.nodeValue, n, (e.mode & 1) !== 0);
            }
            o && (t.flags |= 4);
          } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ln] = t, t.stateNode = r;
        }
        return vt(t), null;
      case 13:
        if (Te(je), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (Re && Gt !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) $s(), gl(), t.flags |= 98560, o = !1;
          else if (o = Oo(t), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!o) throw Error(c(318));
              if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(c(317));
              o[Ln] = t;
            } else gl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            vt(t), o = !1;
          } else gn !== null && (Ru(gn), gn = null), o = !0;
          if (!o) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (je.current & 1) !== 0 ? Xe === 0 && (Xe = 3) : Du())), t.updateQueue !== null && (t.flags |= 4), vt(t), null);
      case 4:
        return Sl(), xu(e, t), e === null && Yl(t.stateNode.containerInfo), vt(t), null;
      case 10:
        return Xi(t.type._context), vt(t), null;
      case 17:
        return Rt(t.type) && Ro(), vt(t), null;
      case 19:
        if (Te(je), o = t.memoizedState, o === null) return vt(t), null;
        if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) oo(o, !1);
        else {
          if (Xe !== 0 || e !== null && (e.flags & 128) !== 0) for (e = t.child; e !== null; ) {
            if (i = Vo(e), i !== null) {
              for (t.flags |= 128, oo(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
              return Pe(je, je.current & 1 | 2), t.child;
            }
            e = e.sibling;
          }
          o.tail !== null && ve() > Nl && (t.flags |= 128, r = !0, oo(o, !1), t.lanes = 4194304);
        }
        else {
          if (!r) if (e = Vo(i), e !== null) {
            if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), oo(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !Re) return vt(t), null;
          } else 2 * ve() - o.renderingStartTime > Nl && n !== 1073741824 && (t.flags |= 128, r = !0, oo(o, !1), t.lanes = 4194304);
          o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = ve(), t.sibling = null, n = je.current, Pe(je, r ? n & 1 | 2 : n & 1), t) : (vt(t), null);
      case 22:
      case 23:
        return Fu(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && (t.mode & 1) !== 0 ? (Xt & 1073741824) !== 0 && (vt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : vt(t), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(c(156, t.tag));
  }
  function Ff(e, t) {
    switch (Vi(t), t.tag) {
      case 1:
        return Rt(t.type) && Ro(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Sl(), Te(Tt), Te(mt), nu(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 5:
        return eu(t), null;
      case 13:
        if (Te(je), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null) throw Error(c(340));
          gl();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Te(je), null;
      case 4:
        return Sl(), null;
      case 10:
        return Xi(t.type._context), null;
      case 22:
      case 23:
        return Fu(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var qo = !1, yt = !1, Df = typeof WeakSet == "function" ? WeakSet : Set, P = null;
  function Cl(e, t) {
    var n = e.ref;
    if (n !== null) if (typeof n == "function") try {
      n(null);
    } catch (r) {
      Ae(e, t, r);
    }
    else n.current = null;
  }
  function Su(e, t, n) {
    try {
      n();
    } catch (r) {
      Ae(e, t, r);
    }
  }
  var Ha = !1;
  function If(e, t) {
    if (Fi = Rr, e = ks(), Ni(e)) {
      if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
      else e: {
        n = (n = e.ownerDocument) && n.defaultView || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset, o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var i = 0, u = -1, s = -1, h = 0, w = 0, k = e, g = null;
          t: for (; ; ) {
            for (var C; k !== n || l !== 0 && k.nodeType !== 3 || (u = i + l), k !== o || r !== 0 && k.nodeType !== 3 || (s = i + r), k.nodeType === 3 && (i += k.nodeValue.length), (C = k.firstChild) !== null; )
              g = k, k = C;
            for (; ; ) {
              if (k === e) break t;
              if (g === n && ++h === l && (u = i), g === o && ++w === r && (s = i), (C = k.nextSibling) !== null) break;
              k = g, g = k.parentNode;
            }
            k = C;
          }
          n = u === -1 || s === -1 ? null : { start: u, end: s };
        } else n = null;
      }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (Di = { focusedElem: e, selectionRange: n }, Rr = !1, P = t; P !== null; ) if (t = P, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, P = e;
    else for (; P !== null; ) {
      t = P;
      try {
        var M = t.alternate;
        if ((t.flags & 1024) !== 0) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (M !== null) {
              var z = M.memoizedProps, We = M.memoizedState, d = t.stateNode, a = d.getSnapshotBeforeUpdate(t.elementType === t.type ? z : wn(t.type, z), We);
              d.__reactInternalSnapshotBeforeUpdate = a;
            }
            break;
          case 3:
            var p = t.stateNode.containerInfo;
            p.nodeType === 1 ? p.textContent = "" : p.nodeType === 9 && p.documentElement && p.removeChild(p.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(c(163));
        }
      } catch (x) {
        Ae(t, t.return, x);
      }
      if (e = t.sibling, e !== null) {
        e.return = t.return, P = e;
        break;
      }
      P = t.return;
    }
    return M = Ha, Ha = !1, M;
  }
  function io(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
      var l = r = r.next;
      do {
        if ((l.tag & e) === e) {
          var o = l.destroy;
          l.destroy = void 0, o !== void 0 && Su(t, n, o);
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function bo(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
      var n = t = t.next;
      do {
        if ((n.tag & e) === e) {
          var r = n.create;
          n.destroy = r();
        }
        n = n.next;
      } while (n !== t);
    }
  }
  function Eu(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode;
      switch (e.tag) {
        case 5:
          e = n;
          break;
        default:
          e = n;
      }
      typeof t == "function" ? t(e) : t.current = e;
    }
  }
  function Va(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Va(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ln], delete t[Xl], delete t[Ui], delete t[gf], delete t[wf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  function $a(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function Qa(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || $a(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Cu(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Lo));
    else if (r !== 4 && (e = e.child, e !== null)) for (Cu(e, t, n), e = e.sibling; e !== null; ) Cu(e, t, n), e = e.sibling;
  }
  function _u(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child, e !== null)) for (_u(e, t, n), e = e.sibling; e !== null; ) _u(e, t, n), e = e.sibling;
  }
  var ut = null, kn = !1;
  function cr(e, t, n) {
    for (n = n.child; n !== null; ) Ka(e, t, n), n = n.sibling;
  }
  function Ka(e, t, n) {
    if (Mt && typeof Mt.onCommitFiberUnmount == "function") try {
      Mt.onCommitFiberUnmount(bn, n);
    } catch {
    }
    switch (n.tag) {
      case 5:
        yt || Cl(n, t);
      case 6:
        var r = ut, l = kn;
        ut = null, cr(e, t, n), ut = r, kn = l, ut !== null && (kn ? (e = ut, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ut.removeChild(n.stateNode));
        break;
      case 18:
        ut !== null && (kn ? (e = ut, n = n.stateNode, e.nodeType === 8 ? Ai(e.parentNode, n) : e.nodeType === 1 && Ai(e, n), pt(e)) : Ai(ut, n.stateNode));
        break;
      case 4:
        r = ut, l = kn, ut = n.stateNode.containerInfo, kn = !0, cr(e, t, n), ut = r, kn = l;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!yt && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
          l = r = r.next;
          do {
            var o = l, i = o.destroy;
            o = o.tag, i !== void 0 && ((o & 2) !== 0 || (o & 4) !== 0) && Su(n, t, i), l = l.next;
          } while (l !== r);
        }
        cr(e, t, n);
        break;
      case 1:
        if (!yt && (Cl(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
          r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
        } catch (u) {
          Ae(n, t, u);
        }
        cr(e, t, n);
        break;
      case 21:
        cr(e, t, n);
        break;
      case 22:
        n.mode & 1 ? (yt = (r = yt) || n.memoizedState !== null, cr(e, t, n), yt = r) : cr(e, t, n);
        break;
      default:
        cr(e, t, n);
    }
  }
  function Ya(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new Df()), t.forEach(function(r) {
        var l = Qf.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      });
    }
  }
  function xn(e, t) {
    var n = t.deletions;
    if (n !== null) for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var o = e, i = t, u = i;
        e: for (; u !== null; ) {
          switch (u.tag) {
            case 5:
              ut = u.stateNode, kn = !1;
              break e;
            case 3:
              ut = u.stateNode.containerInfo, kn = !0;
              break e;
            case 4:
              ut = u.stateNode.containerInfo, kn = !0;
              break e;
          }
          u = u.return;
        }
        if (ut === null) throw Error(c(160));
        Ka(o, i, l), ut = null, kn = !1;
        var s = l.alternate;
        s !== null && (s.return = null), l.return = null;
      } catch (h) {
        Ae(l, t, h);
      }
    }
    if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Ga(t, e), t = t.sibling;
  }
  function Ga(e, t) {
    var n = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (xn(t, e), jn(e), r & 4) {
          try {
            io(3, e, e.return), bo(3, e);
          } catch (z) {
            Ae(e, e.return, z);
          }
          try {
            io(5, e, e.return);
          } catch (z) {
            Ae(e, e.return, z);
          }
        }
        break;
      case 1:
        xn(t, e), jn(e), r & 512 && n !== null && Cl(n, n.return);
        break;
      case 5:
        if (xn(t, e), jn(e), r & 512 && n !== null && Cl(n, n.return), e.flags & 32) {
          var l = e.stateNode;
          try {
            En(l, "");
          } catch (z) {
            Ae(e, e.return, z);
          }
        }
        if (r & 4 && (l = e.stateNode, l != null)) {
          var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, u = e.type, s = e.updateQueue;
          if (e.updateQueue = null, s !== null) try {
            u === "input" && o.type === "radio" && o.name != null && qe(l, o), On(u, i);
            var h = On(u, o);
            for (i = 0; i < s.length; i += 2) {
              var w = s[i], k = s[i + 1];
              w === "style" ? Ut(l, k) : w === "dangerouslySetInnerHTML" ? K(l, k) : w === "children" ? En(l, k) : Et(l, w, k, h);
            }
            switch (u) {
              case "input":
                Gr(l, o);
                break;
              case "textarea":
                Tl(l, o);
                break;
              case "select":
                var g = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!o.multiple;
                var C = o.value;
                C != null ? un(l, !!o.multiple, C, !1) : g !== !!o.multiple && (o.defaultValue != null ? un(
                  l,
                  !!o.multiple,
                  o.defaultValue,
                  !0
                ) : un(l, !!o.multiple, o.multiple ? [] : "", !1));
            }
            l[Xl] = o;
          } catch (z) {
            Ae(e, e.return, z);
          }
        }
        break;
      case 6:
        if (xn(t, e), jn(e), r & 4) {
          if (e.stateNode === null) throw Error(c(162));
          l = e.stateNode, o = e.memoizedProps;
          try {
            l.nodeValue = o;
          } catch (z) {
            Ae(e, e.return, z);
          }
        }
        break;
      case 3:
        if (xn(t, e), jn(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
          pt(t.containerInfo);
        } catch (z) {
          Ae(e, e.return, z);
        }
        break;
      case 4:
        xn(t, e), jn(e);
        break;
      case 13:
        xn(t, e), jn(e), l = e.child, l.flags & 8192 && (o = l.memoizedState !== null, l.stateNode.isHidden = o, !o || l.alternate !== null && l.alternate.memoizedState !== null || (Mu = ve())), r & 4 && Ya(e);
        break;
      case 22:
        if (w = n !== null && n.memoizedState !== null, e.mode & 1 ? (yt = (h = yt) || w, xn(t, e), yt = h) : xn(t, e), jn(e), r & 8192) {
          if (h = e.memoizedState !== null, (e.stateNode.isHidden = h) && !w && (e.mode & 1) !== 0) for (P = e, w = e.child; w !== null; ) {
            for (k = P = w; P !== null; ) {
              switch (g = P, C = g.child, g.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  io(4, g, g.return);
                  break;
                case 1:
                  Cl(g, g.return);
                  var M = g.stateNode;
                  if (typeof M.componentWillUnmount == "function") {
                    r = g, n = g.return;
                    try {
                      t = r, M.props = t.memoizedProps, M.state = t.memoizedState, M.componentWillUnmount();
                    } catch (z) {
                      Ae(r, n, z);
                    }
                  }
                  break;
                case 5:
                  Cl(g, g.return);
                  break;
                case 22:
                  if (g.memoizedState !== null) {
                    Ja(k);
                    continue;
                  }
              }
              C !== null ? (C.return = g, P = C) : Ja(k);
            }
            w = w.sibling;
          }
          e: for (w = null, k = e; ; ) {
            if (k.tag === 5) {
              if (w === null) {
                w = k;
                try {
                  l = k.stateNode, h ? (o = l.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (u = k.stateNode, s = k.memoizedProps.style, i = s != null && s.hasOwnProperty("display") ? s.display : null, u.style.display = sn("display", i));
                } catch (z) {
                  Ae(e, e.return, z);
                }
              }
            } else if (k.tag === 6) {
              if (w === null) try {
                k.stateNode.nodeValue = h ? "" : k.memoizedProps;
              } catch (z) {
                Ae(e, e.return, z);
              }
            } else if ((k.tag !== 22 && k.tag !== 23 || k.memoizedState === null || k === e) && k.child !== null) {
              k.child.return = k, k = k.child;
              continue;
            }
            if (k === e) break e;
            for (; k.sibling === null; ) {
              if (k.return === null || k.return === e) break e;
              w === k && (w = null), k = k.return;
            }
            w === k && (w = null), k.sibling.return = k.return, k = k.sibling;
          }
        }
        break;
      case 19:
        xn(t, e), jn(e), r & 4 && Ya(e);
        break;
      case 21:
        break;
      default:
        xn(
          t,
          e
        ), jn(e);
    }
  }
  function jn(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var n = e.return; n !== null; ) {
            if ($a(n)) {
              var r = n;
              break e;
            }
            n = n.return;
          }
          throw Error(c(160));
        }
        switch (r.tag) {
          case 5:
            var l = r.stateNode;
            r.flags & 32 && (En(l, ""), r.flags &= -33);
            var o = Qa(e);
            _u(e, o, l);
            break;
          case 3:
          case 4:
            var i = r.stateNode.containerInfo, u = Qa(e);
            Cu(e, u, i);
            break;
          default:
            throw Error(c(161));
        }
      } catch (s) {
        Ae(e, e.return, s);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Of(e, t, n) {
    P = e, Xa(e);
  }
  function Xa(e, t, n) {
    for (var r = (e.mode & 1) !== 0; P !== null; ) {
      var l = P, o = l.child;
      if (l.tag === 22 && r) {
        var i = l.memoizedState !== null || qo;
        if (!i) {
          var u = l.alternate, s = u !== null && u.memoizedState !== null || yt;
          u = qo;
          var h = yt;
          if (qo = i, (yt = s) && !h) for (P = l; P !== null; ) i = P, s = i.child, i.tag === 22 && i.memoizedState !== null ? qa(l) : s !== null ? (s.return = i, P = s) : qa(l);
          for (; o !== null; ) P = o, Xa(o), o = o.sibling;
          P = l, qo = u, yt = h;
        }
        Za(e);
      } else (l.subtreeFlags & 8772) !== 0 && o !== null ? (o.return = l, P = o) : Za(e);
    }
  }
  function Za(e) {
    for (; P !== null; ) {
      var t = P;
      if ((t.flags & 8772) !== 0) {
        var n = t.alternate;
        try {
          if ((t.flags & 8772) !== 0) switch (t.tag) {
            case 0:
            case 11:
            case 15:
              yt || bo(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !yt) if (n === null) r.componentDidMount();
              else {
                var l = t.elementType === t.type ? n.memoizedProps : wn(t.type, n.memoizedProps);
                r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
              }
              var o = t.updateQueue;
              o !== null && Js(t, o, r);
              break;
            case 3:
              var i = t.updateQueue;
              if (i !== null) {
                if (n = null, t.child !== null) switch (t.child.tag) {
                  case 5:
                    n = t.child.stateNode;
                    break;
                  case 1:
                    n = t.child.stateNode;
                }
                Js(t, i, n);
              }
              break;
            case 5:
              var u = t.stateNode;
              if (n === null && t.flags & 4) {
                n = u;
                var s = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    s.autoFocus && n.focus();
                    break;
                  case "img":
                    s.src && (n.src = s.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var h = t.alternate;
                if (h !== null) {
                  var w = h.memoizedState;
                  if (w !== null) {
                    var k = w.dehydrated;
                    k !== null && pt(k);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(c(163));
          }
          yt || t.flags & 512 && Eu(t);
        } catch (g) {
          Ae(t, t.return, g);
        }
      }
      if (t === e) {
        P = null;
        break;
      }
      if (n = t.sibling, n !== null) {
        n.return = t.return, P = n;
        break;
      }
      P = t.return;
    }
  }
  function Ja(e) {
    for (; P !== null; ) {
      var t = P;
      if (t === e) {
        P = null;
        break;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, P = n;
        break;
      }
      P = t.return;
    }
  }
  function qa(e) {
    for (; P !== null; ) {
      var t = P;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var n = t.return;
            try {
              bo(4, t);
            } catch (s) {
              Ae(t, n, s);
            }
            break;
          case 1:
            var r = t.stateNode;
            if (typeof r.componentDidMount == "function") {
              var l = t.return;
              try {
                r.componentDidMount();
              } catch (s) {
                Ae(t, l, s);
              }
            }
            var o = t.return;
            try {
              Eu(t);
            } catch (s) {
              Ae(t, o, s);
            }
            break;
          case 5:
            var i = t.return;
            try {
              Eu(t);
            } catch (s) {
              Ae(t, i, s);
            }
        }
      } catch (s) {
        Ae(t, t.return, s);
      }
      if (t === e) {
        P = null;
        break;
      }
      var u = t.sibling;
      if (u !== null) {
        u.return = t.return, P = u;
        break;
      }
      P = t.return;
    }
  }
  var Af = Math.ceil, ei = Je.ReactCurrentDispatcher, Nu = Je.ReactCurrentOwner, tn = Je.ReactCurrentBatchConfig, de = 0, tt = null, He = null, st = 0, Xt = 0, _l = or(0), Xe = 0, uo = null, Wr = 0, ti = 0, Pu = 0, so = null, Ft = null, Mu = 0, Nl = 1 / 0, Gn = null, ni = !1, zu = null, fr = null, ri = !1, dr = null, li = 0, ao = 0, Lu = null, oi = -1, ii = 0;
  function St() {
    return (de & 6) !== 0 ? ve() : oi !== -1 ? oi : oi = ve();
  }
  function pr(e) {
    return (e.mode & 1) === 0 ? 1 : (de & 2) !== 0 && st !== 0 ? st & -st : xf.transition !== null ? (ii === 0 && (ii = Fl()), ii) : (e = me, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Al(e.type)), e);
  }
  function Sn(e, t, n, r) {
    if (50 < ao) throw ao = 0, Lu = null, Error(c(185));
    tr(e, n, r), ((de & 2) === 0 || e !== tt) && (e === tt && ((de & 2) === 0 && (ti |= n), Xe === 4 && mr(e, st)), Dt(e, r), n === 1 && de === 0 && (t.mode & 1) === 0 && (Nl = ve() + 500, Fo && ur()));
  }
  function Dt(e, t) {
    var n = e.callbackNode;
    ko(e, t);
    var r = zr(e, e === tt ? st : 0);
    if (r === 0) n !== null && Nr(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
      if (n != null && Nr(n), t === 1) e.tag === 0 ? kf(ec.bind(null, e)) : Us(ec.bind(null, e)), vf(function() {
        (de & 6) === 0 && ur();
      }), n = null;
      else {
        switch (Dl(r)) {
          case 1:
            n = Mn;
            break;
          case 4:
            n = nl;
            break;
          case 16:
            n = Pr;
            break;
          case 536870912:
            n = rl;
            break;
          default:
            n = Pr;
        }
        n = sc(n, ba.bind(null, e));
      }
      e.callbackPriority = t, e.callbackNode = n;
    }
  }
  function ba(e, t) {
    if (oi = -1, ii = 0, (de & 6) !== 0) throw Error(c(327));
    var n = e.callbackNode;
    if (Pl() && e.callbackNode !== n) return null;
    var r = zr(e, e === tt ? st : 0);
    if (r === 0) return null;
    if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = ui(e, r);
    else {
      t = r;
      var l = de;
      de |= 2;
      var o = nc();
      (tt !== e || st !== t) && (Gn = null, Nl = ve() + 500, Vr(e, t));
      do
        try {
          Wf();
          break;
        } catch (u) {
          tc(e, u);
        }
      while (!0);
      Gi(), ei.current = o, de = l, He !== null ? t = 0 : (tt = null, st = 0, t = Xe);
    }
    if (t !== 0) {
      if (t === 2 && (l = ll(e), l !== 0 && (r = l, t = Tu(e, l))), t === 1) throw n = uo, Vr(e, 0), mr(e, r), Dt(e, ve()), n;
      if (t === 6) mr(e, r);
      else {
        if (l = e.current.alternate, (r & 30) === 0 && !Uf(l) && (t = ui(e, r), t === 2 && (o = ll(e), o !== 0 && (r = o, t = Tu(e, o))), t === 1)) throw n = uo, Vr(e, 0), mr(e, r), Dt(e, ve()), n;
        switch (e.finishedWork = l, e.finishedLanes = r, t) {
          case 0:
          case 1:
            throw Error(c(345));
          case 2:
            $r(e, Ft, Gn);
            break;
          case 3:
            if (mr(e, r), (r & 130023424) === r && (t = Mu + 500 - ve(), 10 < t)) {
              if (zr(e, 0) !== 0) break;
              if (l = e.suspendedLanes, (l & r) !== r) {
                St(), e.pingedLanes |= e.suspendedLanes & l;
                break;
              }
              e.timeoutHandle = Oi($r.bind(null, e, Ft, Gn), t);
              break;
            }
            $r(e, Ft, Gn);
            break;
          case 4:
            if (mr(e, r), (r & 4194240) === r) break;
            for (t = e.eventTimes, l = -1; 0 < r; ) {
              var i = 31 - Ke(r);
              o = 1 << i, i = t[i], i > l && (l = i), r &= ~o;
            }
            if (r = l, r = ve() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Af(r / 1960)) - r, 10 < r) {
              e.timeoutHandle = Oi($r.bind(null, e, Ft, Gn), r);
              break;
            }
            $r(e, Ft, Gn);
            break;
          case 5:
            $r(e, Ft, Gn);
            break;
          default:
            throw Error(c(329));
        }
      }
    }
    return Dt(e, ve()), e.callbackNode === n ? ba.bind(null, e) : null;
  }
  function Tu(e, t) {
    var n = so;
    return e.current.memoizedState.isDehydrated && (Vr(e, t).flags |= 256), e = ui(e, t), e !== 2 && (t = Ft, Ft = n, t !== null && Ru(t)), e;
  }
  function Ru(e) {
    Ft === null ? Ft = e : Ft.push.apply(Ft, e);
  }
  function Uf(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var n = t.updateQueue;
        if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
          var l = n[r], o = l.getSnapshot;
          l = l.value;
          try {
            if (!yn(o(), l)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function mr(e, t) {
    for (t &= ~Pu, t &= ~ti, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
      var n = 31 - Ke(t), r = 1 << n;
      e[n] = -1, t &= ~r;
    }
  }
  function ec(e) {
    if ((de & 6) !== 0) throw Error(c(327));
    Pl();
    var t = zr(e, 0);
    if ((t & 1) === 0) return Dt(e, ve()), null;
    var n = ui(e, t);
    if (e.tag !== 0 && n === 2) {
      var r = ll(e);
      r !== 0 && (t = r, n = Tu(e, r));
    }
    if (n === 1) throw n = uo, Vr(e, 0), mr(e, t), Dt(e, ve()), n;
    if (n === 6) throw Error(c(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, $r(e, Ft, Gn), Dt(e, ve()), null;
  }
  function ju(e, t) {
    var n = de;
    de |= 1;
    try {
      return e(t);
    } finally {
      de = n, de === 0 && (Nl = ve() + 500, Fo && ur());
    }
  }
  function Hr(e) {
    dr !== null && dr.tag === 0 && (de & 6) === 0 && Pl();
    var t = de;
    de |= 1;
    var n = tn.transition, r = me;
    try {
      if (tn.transition = null, me = 1, e) return e();
    } finally {
      me = r, tn.transition = n, de = t, (de & 6) === 0 && ur();
    }
  }
  function Fu() {
    Xt = _l.current, Te(_l);
  }
  function Vr(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, hf(n)), He !== null) for (n = He.return; n !== null; ) {
      var r = n;
      switch (Vi(r), r.tag) {
        case 1:
          r = r.type.childContextTypes, r != null && Ro();
          break;
        case 3:
          Sl(), Te(Tt), Te(mt), nu();
          break;
        case 5:
          eu(r);
          break;
        case 4:
          Sl();
          break;
        case 13:
          Te(je);
          break;
        case 19:
          Te(je);
          break;
        case 10:
          Xi(r.type._context);
          break;
        case 22:
        case 23:
          Fu();
      }
      n = n.return;
    }
    if (tt = e, He = e = hr(e.current, null), st = Xt = t, Xe = 0, uo = null, Pu = ti = Wr = 0, Ft = so = null, Ar !== null) {
      for (t = 0; t < Ar.length; t++) if (n = Ar[t], r = n.interleaved, r !== null) {
        n.interleaved = null;
        var l = r.next, o = n.pending;
        if (o !== null) {
          var i = o.next;
          o.next = l, r.next = i;
        }
        n.pending = r;
      }
      Ar = null;
    }
    return e;
  }
  function tc(e, t) {
    do {
      var n = He;
      try {
        if (Gi(), $o.current = Go, Qo) {
          for (var r = Fe.memoizedState; r !== null; ) {
            var l = r.queue;
            l !== null && (l.pending = null), r = r.next;
          }
          Qo = !1;
        }
        if (Br = 0, et = Ge = Fe = null, to = !1, no = 0, Nu.current = null, n === null || n.return === null) {
          Xe = 1, uo = t, He = null;
          break;
        }
        e: {
          var o = e, i = n.return, u = n, s = t;
          if (t = st, u.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
            var h = s, w = u, k = w.tag;
            if ((w.mode & 1) === 0 && (k === 0 || k === 11 || k === 15)) {
              var g = w.alternate;
              g ? (w.updateQueue = g.updateQueue, w.memoizedState = g.memoizedState, w.lanes = g.lanes) : (w.updateQueue = null, w.memoizedState = null);
            }
            var C = Na(i);
            if (C !== null) {
              C.flags &= -257, Pa(C, i, u, o, t), C.mode & 1 && _a(o, h, t), t = C, s = h;
              var M = t.updateQueue;
              if (M === null) {
                var z = /* @__PURE__ */ new Set();
                z.add(s), t.updateQueue = z;
              } else M.add(s);
              break e;
            } else {
              if ((t & 1) === 0) {
                _a(o, h, t), Du();
                break e;
              }
              s = Error(c(426));
            }
          } else if (Re && u.mode & 1) {
            var We = Na(i);
            if (We !== null) {
              (We.flags & 65536) === 0 && (We.flags |= 256), Pa(We, i, u, o, t), Ki(El(s, u));
              break e;
            }
          }
          o = s = El(s, u), Xe !== 4 && (Xe = 2), so === null ? so = [o] : so.push(o), o = i;
          do {
            switch (o.tag) {
              case 3:
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var d = Ea(o, s, t);
                Zs(o, d);
                break e;
              case 1:
                u = s;
                var a = o.type, p = o.stateNode;
                if ((o.flags & 128) === 0 && (typeof a.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (fr === null || !fr.has(p)))) {
                  o.flags |= 65536, t &= -t, o.lanes |= t;
                  var x = Ca(o, u, t);
                  Zs(o, x);
                  break e;
                }
            }
            o = o.return;
          } while (o !== null);
        }
        lc(n);
      } catch (L) {
        t = L, He === n && n !== null && (He = n = n.return);
        continue;
      }
      break;
    } while (!0);
  }
  function nc() {
    var e = ei.current;
    return ei.current = Go, e === null ? Go : e;
  }
  function Du() {
    (Xe === 0 || Xe === 3 || Xe === 2) && (Xe = 4), tt === null || (Wr & 268435455) === 0 && (ti & 268435455) === 0 || mr(tt, st);
  }
  function ui(e, t) {
    var n = de;
    de |= 2;
    var r = nc();
    (tt !== e || st !== t) && (Gn = null, Vr(e, t));
    do
      try {
        Bf();
        break;
      } catch (l) {
        tc(e, l);
      }
    while (!0);
    if (Gi(), de = n, ei.current = r, He !== null) throw Error(c(261));
    return tt = null, st = 0, Xe;
  }
  function Bf() {
    for (; He !== null; ) rc(He);
  }
  function Wf() {
    for (; He !== null && !Vt(); ) rc(He);
  }
  function rc(e) {
    var t = uc(e.alternate, e, Xt);
    e.memoizedProps = e.pendingProps, t === null ? lc(e) : He = t, Nu.current = null;
  }
  function lc(e) {
    var t = e;
    do {
      var n = t.alternate;
      if (e = t.return, (t.flags & 32768) === 0) {
        if (n = jf(n, t, Xt), n !== null) {
          He = n;
          return;
        }
      } else {
        if (n = Ff(n, t), n !== null) {
          n.flags &= 32767, He = n;
          return;
        }
        if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
        else {
          Xe = 6, He = null;
          return;
        }
      }
      if (t = t.sibling, t !== null) {
        He = t;
        return;
      }
      He = t = e;
    } while (t !== null);
    Xe === 0 && (Xe = 5);
  }
  function $r(e, t, n) {
    var r = me, l = tn.transition;
    try {
      tn.transition = null, me = 1, Hf(e, t, n, r);
    } finally {
      tn.transition = l, me = r;
    }
    return null;
  }
  function Hf(e, t, n, r) {
    do
      Pl();
    while (dr !== null);
    if ((de & 6) !== 0) throw Error(c(327));
    n = e.finishedWork;
    var l = e.finishedLanes;
    if (n === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(c(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var o = n.lanes | n.childLanes;
    if (xo(e, o), e === tt && (He = tt = null, st = 0), (n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0 || ri || (ri = !0, sc(Pr, function() {
      return Pl(), null;
    })), o = (n.flags & 15990) !== 0, (n.subtreeFlags & 15990) !== 0 || o) {
      o = tn.transition, tn.transition = null;
      var i = me;
      me = 1;
      var u = de;
      de |= 4, Nu.current = null, If(e, n), Ga(n, e), sf(Di), Rr = !!Fi, Di = Fi = null, e.current = n, Of(n), $t(), de = u, me = i, tn.transition = o;
    } else e.current = n;
    if (ri && (ri = !1, dr = e, li = l), o = e.pendingLanes, o === 0 && (fr = null), vo(n.stateNode), Dt(e, ve()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
    if (ni) throw ni = !1, e = zu, zu = null, e;
    return (li & 1) !== 0 && e.tag !== 0 && Pl(), o = e.pendingLanes, (o & 1) !== 0 ? e === Lu ? ao++ : (ao = 0, Lu = e) : ao = 0, ur(), null;
  }
  function Pl() {
    if (dr !== null) {
      var e = Dl(li), t = tn.transition, n = me;
      try {
        if (tn.transition = null, me = 16 > e ? 16 : e, dr === null) var r = !1;
        else {
          if (e = dr, dr = null, li = 0, (de & 6) !== 0) throw Error(c(331));
          var l = de;
          for (de |= 4, P = e.current; P !== null; ) {
            var o = P, i = o.child;
            if ((P.flags & 16) !== 0) {
              var u = o.deletions;
              if (u !== null) {
                for (var s = 0; s < u.length; s++) {
                  var h = u[s];
                  for (P = h; P !== null; ) {
                    var w = P;
                    switch (w.tag) {
                      case 0:
                      case 11:
                      case 15:
                        io(8, w, o);
                    }
                    var k = w.child;
                    if (k !== null) k.return = w, P = k;
                    else for (; P !== null; ) {
                      w = P;
                      var g = w.sibling, C = w.return;
                      if (Va(w), w === h) {
                        P = null;
                        break;
                      }
                      if (g !== null) {
                        g.return = C, P = g;
                        break;
                      }
                      P = C;
                    }
                  }
                }
                var M = o.alternate;
                if (M !== null) {
                  var z = M.child;
                  if (z !== null) {
                    M.child = null;
                    do {
                      var We = z.sibling;
                      z.sibling = null, z = We;
                    } while (z !== null);
                  }
                }
                P = o;
              }
            }
            if ((o.subtreeFlags & 2064) !== 0 && i !== null) i.return = o, P = i;
            else e: for (; P !== null; ) {
              if (o = P, (o.flags & 2048) !== 0) switch (o.tag) {
                case 0:
                case 11:
                case 15:
                  io(9, o, o.return);
              }
              var d = o.sibling;
              if (d !== null) {
                d.return = o.return, P = d;
                break e;
              }
              P = o.return;
            }
          }
          var a = e.current;
          for (P = a; P !== null; ) {
            i = P;
            var p = i.child;
            if ((i.subtreeFlags & 2064) !== 0 && p !== null) p.return = i, P = p;
            else e: for (i = a; P !== null; ) {
              if (u = P, (u.flags & 2048) !== 0) try {
                switch (u.tag) {
                  case 0:
                  case 11:
                  case 15:
                    bo(9, u);
                }
              } catch (L) {
                Ae(u, u.return, L);
              }
              if (u === i) {
                P = null;
                break e;
              }
              var x = u.sibling;
              if (x !== null) {
                x.return = u.return, P = x;
                break e;
              }
              P = u.return;
            }
          }
          if (de = l, ur(), Mt && typeof Mt.onPostCommitFiberRoot == "function") try {
            Mt.onPostCommitFiberRoot(bn, e);
          } catch {
          }
          r = !0;
        }
        return r;
      } finally {
        me = n, tn.transition = t;
      }
    }
    return !1;
  }
  function oc(e, t, n) {
    t = El(n, t), t = Ea(e, t, 1), e = ar(e, t, 1), t = St(), e !== null && (tr(e, 1, t), Dt(e, t));
  }
  function Ae(e, t, n) {
    if (e.tag === 3) oc(e, e, n);
    else for (; t !== null; ) {
      if (t.tag === 3) {
        oc(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (fr === null || !fr.has(r))) {
          e = El(n, e), e = Ca(t, e, 1), t = ar(t, e, 1), e = St(), t !== null && (tr(t, 1, e), Dt(t, e));
          break;
        }
      }
      t = t.return;
    }
  }
  function Vf(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), t = St(), e.pingedLanes |= e.suspendedLanes & n, tt === e && (st & n) === n && (Xe === 4 || Xe === 3 && (st & 130023424) === st && 500 > ve() - Mu ? Vr(e, 0) : Pu |= n), Dt(e, t);
  }
  function ic(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = Mr, Mr <<= 1, (Mr & 130023424) === 0 && (Mr = 4194304)));
    var n = St();
    e = Qn(e, t), e !== null && (tr(e, t, n), Dt(e, n));
  }
  function $f(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), ic(e, n);
  }
  function Qf(e, t) {
    var n = 0;
    switch (e.tag) {
      case 13:
        var r = e.stateNode, l = e.memoizedState;
        l !== null && (n = l.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      default:
        throw Error(c(314));
    }
    r !== null && r.delete(t), ic(e, n);
  }
  var uc;
  uc = function(e, t, n) {
    if (e !== null) if (e.memoizedProps !== t.pendingProps || Tt.current) jt = !0;
    else {
      if ((e.lanes & n) === 0 && (t.flags & 128) === 0) return jt = !1, Rf(e, t, n);
      jt = (e.flags & 131072) !== 0;
    }
    else jt = !1, Re && (t.flags & 1048576) !== 0 && Bs(t, Io, t.index);
    switch (t.lanes = 0, t.tag) {
      case 2:
        var r = t.type;
        Jo(e, t), e = t.pendingProps;
        var l = hl(t, mt.current);
        xl(t, n), l = ou(null, t, r, e, l, n);
        var o = iu();
        return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Rt(r) ? (o = !0, jo(t)) : o = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, qi(t), l.updater = Xo, t.stateNode = l, l._reactInternals = t, du(t, r, e, n), t = vu(null, t, r, !0, o, n)) : (t.tag = 0, Re && o && Hi(t), xt(null, t, l, n), t = t.child), t;
      case 16:
        r = t.elementType;
        e: {
          switch (Jo(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Yf(r), e = wn(r, e), l) {
            case 0:
              t = hu(null, t, r, e, n);
              break e;
            case 1:
              t = ja(null, t, r, e, n);
              break e;
            case 11:
              t = Ma(null, t, r, e, n);
              break e;
            case 14:
              t = za(null, t, r, wn(r.type, e), n);
              break e;
          }
          throw Error(c(
            306,
            r,
            ""
          ));
        }
        return t;
      case 0:
        return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : wn(r, l), hu(e, t, r, l, n);
      case 1:
        return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : wn(r, l), ja(e, t, r, l, n);
      case 3:
        e: {
          if (Fa(t), e === null) throw Error(c(387));
          r = t.pendingProps, o = t.memoizedState, l = o.element, Xs(e, t), Ho(t, r, null, n);
          var i = t.memoizedState;
          if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
            l = El(Error(c(423)), t), t = Da(e, t, r, n, l);
            break e;
          } else if (r !== l) {
            l = El(Error(c(424)), t), t = Da(e, t, r, n, l);
            break e;
          } else for (Gt = lr(t.stateNode.containerInfo.firstChild), Yt = t, Re = !0, gn = null, n = Ys(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
          else {
            if (gl(), r === l) {
              t = Yn(e, t, n);
              break e;
            }
            xt(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 5:
        return qs(t), e === null && Qi(t), r = t.type, l = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = l.children, Ii(r, l) ? i = null : o !== null && Ii(r, o) && (t.flags |= 32), Ra(e, t), xt(e, t, i, n), t.child;
      case 6:
        return e === null && Qi(t), null;
      case 13:
        return Ia(e, t, n);
      case 4:
        return bi(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = wl(t, null, r, n) : xt(e, t, r, n), t.child;
      case 11:
        return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : wn(r, l), Ma(e, t, r, l, n);
      case 7:
        return xt(e, t, t.pendingProps, n), t.child;
      case 8:
        return xt(e, t, t.pendingProps.children, n), t.child;
      case 12:
        return xt(e, t, t.pendingProps.children, n), t.child;
      case 10:
        e: {
          if (r = t.type._context, l = t.pendingProps, o = t.memoizedProps, i = l.value, Pe(Uo, r._currentValue), r._currentValue = i, o !== null) if (yn(o.value, i)) {
            if (o.children === l.children && !Tt.current) {
              t = Yn(e, t, n);
              break e;
            }
          } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
            var u = o.dependencies;
            if (u !== null) {
              i = o.child;
              for (var s = u.firstContext; s !== null; ) {
                if (s.context === r) {
                  if (o.tag === 1) {
                    s = Kn(-1, n & -n), s.tag = 2;
                    var h = o.updateQueue;
                    if (h !== null) {
                      h = h.shared;
                      var w = h.pending;
                      w === null ? s.next = s : (s.next = w.next, w.next = s), h.pending = s;
                    }
                  }
                  o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), Zi(
                    o.return,
                    n,
                    t
                  ), u.lanes |= n;
                  break;
                }
                s = s.next;
              }
            } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
            else if (o.tag === 18) {
              if (i = o.return, i === null) throw Error(c(341));
              i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), Zi(i, n, t), i = o.sibling;
            } else i = o.child;
            if (i !== null) i.return = o;
            else for (i = o; i !== null; ) {
              if (i === t) {
                i = null;
                break;
              }
              if (o = i.sibling, o !== null) {
                o.return = i.return, i = o;
                break;
              }
              i = i.return;
            }
            o = i;
          }
          xt(e, t, l.children, n), t = t.child;
        }
        return t;
      case 9:
        return l = t.type, r = t.pendingProps.children, xl(t, n), l = bt(l), r = r(l), t.flags |= 1, xt(e, t, r, n), t.child;
      case 14:
        return r = t.type, l = wn(r, t.pendingProps), l = wn(r.type, l), za(e, t, r, l, n);
      case 15:
        return La(e, t, t.type, t.pendingProps, n);
      case 17:
        return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : wn(r, l), Jo(e, t), t.tag = 1, Rt(r) ? (e = !0, jo(t)) : e = !1, xl(t, n), xa(t, r, l), du(t, r, l, n), vu(null, t, r, !0, e, n);
      case 19:
        return Aa(e, t, n);
      case 22:
        return Ta(e, t, n);
    }
    throw Error(c(156, t.tag));
  };
  function sc(e, t) {
    return tl(e, t);
  }
  function Kf(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function nn(e, t, n, r) {
    return new Kf(e, t, n, r);
  }
  function Iu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Yf(e) {
    if (typeof e == "function") return Iu(e) ? 1 : 0;
    if (e != null) {
      if (e = e.$$typeof, e === At) return 11;
      if (e === Be) return 14;
    }
    return 2;
  }
  function hr(e, t) {
    var n = e.alternate;
    return n === null ? (n = nn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
  }
  function si(e, t, n, r, l, o) {
    var i = 2;
    if (r = e, typeof e == "function") Iu(e) && (i = 1);
    else if (typeof e == "string") i = 5;
    else e: switch (e) {
      case at:
        return Qr(n.children, l, o, t);
      case _t:
        i = 8, l |= 8;
        break;
      case gt:
        return e = nn(12, n, t, l | 2), e.elementType = gt, e.lanes = o, e;
      case ct:
        return e = nn(13, n, t, l), e.elementType = ct, e.lanes = o, e;
      case Pt:
        return e = nn(19, n, t, l), e.elementType = Pt, e.lanes = o, e;
      case xe:
        return ai(n, l, o, t);
      default:
        if (typeof e == "object" && e !== null) switch (e.$$typeof) {
          case ln:
            i = 10;
            break e;
          case Nt:
            i = 9;
            break e;
          case At:
            i = 11;
            break e;
          case Be:
            i = 14;
            break e;
          case rt:
            i = 16, r = null;
            break e;
        }
        throw Error(c(130, e == null ? e : typeof e, ""));
    }
    return t = nn(i, n, t, l), t.elementType = e, t.type = r, t.lanes = o, t;
  }
  function Qr(e, t, n, r) {
    return e = nn(7, e, r, t), e.lanes = n, e;
  }
  function ai(e, t, n, r) {
    return e = nn(22, e, r, t), e.elementType = xe, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
  }
  function Ou(e, t, n) {
    return e = nn(6, e, null, t), e.lanes = n, e;
  }
  function Au(e, t, n) {
    return t = nn(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
  }
  function Gf(e, t, n, r, l) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = ol(0), this.expirationTimes = ol(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ol(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
  }
  function Uu(e, t, n, r, l, o, i, u, s) {
    return e = new Gf(e, t, n, u, s), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = nn(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, qi(o), e;
  }
  function Xf(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: ke, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
  }
  function ac(e) {
    if (!e) return ir;
    e = e._reactInternals;
    e: {
      if (Ht(e) !== e || e.tag !== 1) throw Error(c(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (Rt(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(c(171));
    }
    if (e.tag === 1) {
      var n = e.type;
      if (Rt(n)) return Os(e, n, t);
    }
    return t;
  }
  function cc(e, t, n, r, l, o, i, u, s) {
    return e = Uu(n, r, !0, e, l, o, i, u, s), e.context = ac(null), n = e.current, r = St(), l = pr(n), o = Kn(r, l), o.callback = t ?? null, ar(n, o, l), e.current.lanes = l, tr(e, l, r), Dt(e, r), e;
  }
  function ci(e, t, n, r) {
    var l = t.current, o = St(), i = pr(l);
    return n = ac(n), t.context === null ? t.context = n : t.pendingContext = n, t = Kn(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = ar(l, t, i), e !== null && (Sn(e, l, i, o), Wo(e, l, i)), i;
  }
  function fi(e) {
    if (e = e.current, !e.child) return null;
    switch (e.child.tag) {
      case 5:
        return e.child.stateNode;
      default:
        return e.child.stateNode;
    }
  }
  function fc(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Bu(e, t) {
    fc(e, t), (e = e.alternate) && fc(e, t);
  }
  function Zf() {
    return null;
  }
  var dc = typeof reportError == "function" ? reportError : function(e) {
    console.error(e);
  };
  function Wu(e) {
    this._internalRoot = e;
  }
  di.prototype.render = Wu.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(c(409));
    ci(e, t, null, null);
  }, di.prototype.unmount = Wu.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Hr(function() {
        ci(null, e, null, null);
      }), t[Wn] = null;
    }
  };
  function di(e) {
    this._internalRoot = e;
  }
  di.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = R();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < fe.length && t !== 0 && t < fe[n].priority; n++) ;
      fe.splice(n, 0, e), n === 0 && So(e);
    }
  };
  function Hu(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function pi(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
  }
  function pc() {
  }
  function Jf(e, t, n, r, l) {
    if (l) {
      if (typeof r == "function") {
        var o = r;
        r = function() {
          var h = fi(i);
          o.call(h);
        };
      }
      var i = cc(t, r, e, 0, null, !1, !1, "", pc);
      return e._reactRootContainer = i, e[Wn] = i.current, Yl(e.nodeType === 8 ? e.parentNode : e), Hr(), i;
    }
    for (; l = e.lastChild; ) e.removeChild(l);
    if (typeof r == "function") {
      var u = r;
      r = function() {
        var h = fi(s);
        u.call(h);
      };
    }
    var s = Uu(e, 0, !1, null, null, !1, !1, "", pc);
    return e._reactRootContainer = s, e[Wn] = s.current, Yl(e.nodeType === 8 ? e.parentNode : e), Hr(function() {
      ci(t, s, n, r);
    }), s;
  }
  function mi(e, t, n, r, l) {
    var o = n._reactRootContainer;
    if (o) {
      var i = o;
      if (typeof l == "function") {
        var u = l;
        l = function() {
          var s = fi(i);
          u.call(s);
        };
      }
      ci(t, i, e, l);
    } else i = Jf(n, t, e, l, r);
    return fi(i);
  }
  Il = function(e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var n = er(t.pendingLanes);
          n !== 0 && (Zt(t, n | 1), Dt(t, ve()), (de & 6) === 0 && (Nl = ve() + 500, ur()));
        }
        break;
      case 13:
        Hr(function() {
          var r = Qn(e, 1);
          if (r !== null) {
            var l = St();
            Sn(r, e, 1, l);
          }
        }), Bu(e, 1);
    }
  }, S = function(e) {
    if (e.tag === 13) {
      var t = Qn(e, 134217728);
      if (t !== null) {
        var n = St();
        Sn(t, e, 134217728, n);
      }
      Bu(e, 134217728);
    }
  }, Z = function(e) {
    if (e.tag === 13) {
      var t = pr(e), n = Qn(e, t);
      if (n !== null) {
        var r = St();
        Sn(n, e, t, r);
      }
      Bu(e, t);
    }
  }, R = function() {
    return me;
  }, U = function(e, t) {
    var n = me;
    try {
      return me = e, t();
    } finally {
      me = n;
    }
  }, $e = function(e, t, n) {
    switch (t) {
      case "input":
        if (Gr(e, n), t = n.name, n.type === "radio" && t != null) {
          for (n = e; n.parentNode; ) n = n.parentNode;
          for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
            var r = n[t];
            if (r !== e && r.form === e.form) {
              var l = To(r);
              if (!l) throw Error(c(90));
              zl(r), Gr(r, l);
            }
          }
        }
        break;
      case "textarea":
        Tl(e, n);
        break;
      case "select":
        t = n.value, t != null && un(e, !!n.multiple, t, !1);
    }
  }, xr = ju, jl = Hr;
  var qf = { usingClientEntryPoint: !1, Events: [Zl, pl, To, Zr, Zn, ju] }, co = { findFiberByHostInstance: Fr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, bf = { bundleType: co.bundleType, version: co.version, rendererPackageName: co.rendererPackageName, rendererConfig: co.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Je.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
    return e = Cr(e), e === null ? null : e.stateNode;
  }, findFiberByHostInstance: co.findFiberByHostInstance || Zf, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var hi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!hi.isDisabled && hi.supportsFiber) try {
      bn = hi.inject(bf), Mt = hi;
    } catch {
    }
  }
  return It.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = qf, It.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Hu(t)) throw Error(c(200));
    return Xf(e, t, null, n);
  }, It.createRoot = function(e, t) {
    if (!Hu(e)) throw Error(c(299));
    var n = !1, r = "", l = dc;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Uu(e, 1, !1, null, null, n, !1, r, l), e[Wn] = t.current, Yl(e.nodeType === 8 ? e.parentNode : e), new Wu(t);
  }, It.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(c(188)) : (e = Object.keys(e).join(","), Error(c(268, e)));
    return e = Cr(t), e = e === null ? null : e.stateNode, e;
  }, It.flushSync = function(e) {
    return Hr(e);
  }, It.hydrate = function(e, t, n) {
    if (!pi(t)) throw Error(c(200));
    return mi(null, e, t, !0, n);
  }, It.hydrateRoot = function(e, t, n) {
    if (!Hu(e)) throw Error(c(405));
    var r = n != null && n.hydratedSources || null, l = !1, o = "", i = dc;
    if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = cc(t, null, e, 1, n ?? null, l, !1, o, i), e[Wn] = t.current, Yl(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
      n,
      l
    );
    return new di(t);
  }, It.render = function(e, t, n) {
    if (!pi(t)) throw Error(c(200));
    return mi(null, e, t, !1, n);
  }, It.unmountComponentAtNode = function(e) {
    if (!pi(e)) throw Error(c(40));
    return e._reactRootContainer ? (Hr(function() {
      mi(null, null, e, !1, function() {
        e._reactRootContainer = null, e[Wn] = null;
      });
    }), !0) : !1;
  }, It.unstable_batchedUpdates = ju, It.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!pi(n)) throw Error(c(200));
    if (e == null || e._reactInternals === void 0) throw Error(c(38));
    return mi(e, t, n, !1, r);
  }, It.version = "18.3.1-next-f1338f8080-20240426", It;
}
var xc;
function ud() {
  if (xc) return Qu.exports;
  xc = 1;
  function m() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(m);
      } catch (v) {
        console.error(v);
      }
  }
  return m(), Qu.exports = id(), Qu.exports;
}
var Sc;
function sd() {
  if (Sc) return vi;
  Sc = 1;
  var m = ud();
  return vi.createRoot = m.createRoot, vi.hydrateRoot = m.hydrateRoot, vi;
}
var ad = sd(), Ue = ns();
const Ml = 864e5, rs = (m) => m > 0 ? m < 1 ? m : 1 : 0, Kr = (m, v, c) => m + (v - m) * c, cd = (m) => {
  const v = rs(m);
  return v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
}, fd = (m) => 1 - Math.pow(1 - rs(m), 3), Ec = (m, v, c) => {
  const F = rs((c - m) / (v - m));
  return F * F * (3 - 2 * F);
}, qu = (m) => new Date(m).toISOString().slice(0, 10), rn = (m) => {
  if (typeof m == "number") return Math.floor(m / Ml) * Ml;
  if (typeof m == "string") {
    const v = /^(\d{4})-(\d{2})-(\d{2})/.exec(m);
    if (v) return Date.UTC(+v[1], +v[2] - 1, +v[3]);
    m = new Date(m);
  }
  return Date.UTC(m.getFullYear(), m.getMonth(), m.getDate());
}, dd = (m) => {
  let v = m >>> 0;
  return () => {
    v = v + 1831565813 >>> 0;
    let c = v;
    return c = Math.imul(c ^ c >>> 15, c | 1), c ^= c + Math.imul(c ^ c >>> 7, c | 61), ((c ^ c >>> 14) >>> 0) / 4294967296;
  };
}, pd = (m, v = 7, c = 371) => {
  const F = dd(v), T = Array.from({ length: 4 }, () => ({ at: F(), width: 0.035 + F() * 0.07, gain: 0.6 + F() * 1.1 })), B = [];
  let $ = 0.5;
  for (let H = 0; H < c; H++) {
    const j = m - (c - 1 - H) * Ml, oe = H / Math.max(1, c - 1), ne = new Date(j).getUTCDay(), Q = ne === 0 || ne === 6;
    let se = 0.2;
    for (const ge of T) se += ge.gain * Math.exp(-((oe - ge.at) ** 2) / (2 * ge.width ** 2));
    $ = $ * 0.85 + F() * 0.15, se *= 0.55 + $ * 0.9;
    const Ve = Math.min(0.94, (Q ? 0.22 : 0.5) + se * 0.4);
    let Ze = 0;
    F() < Ve && (Ze = 1 + Math.floor(-Math.log(1 - F()) * (1.2 + se * 7) * (Q ? 0.5 : 1))), F() < 0.01 && (Ze += 18 + Math.floor(F() * 24)), B.push({ date: qu(j), count: Ze });
  }
  return B;
}, md = (m, v, c = 0) => {
  const F = /* @__PURE__ */ new Map();
  for (const j of m) {
    if (!j || typeof j.date != "string") continue;
    const oe = rn(j.date), ne = Number(j.count);
    if (!Number.isFinite(oe) || !(ne > 0) || !Number.isFinite(ne)) continue;
    const Q = qu(oe);
    F.set(Q, (F.get(Q) ?? 0) + ne);
  }
  let T = v - 364 * Ml;
  T -= (new Date(T).getUTCDay() - c + 7) % 7 * Ml;
  const B = [];
  for (let j = T, oe = 0; j <= v; j += Ml, oe++) {
    const ne = qu(j);
    B.push({ date: ne, count: F.get(ne) ?? 0, level: 0, week: Math.floor(oe / 7), day: oe % 7 });
  }
  const $ = B.map((j) => j.count).filter((j) => j > 0).sort((j, oe) => j - oe), H = $.length ? $[Math.floor(0.95 * ($.length - 1))] : 0;
  for (const j of B) j.level = hd(j.count, H);
  return { cells: B, weeks: B.length ? B[B.length - 1].week + 1 : 0, max: $.length ? $[$.length - 1] : 0 };
}, hd = (m, v) => m <= 0 ? 0 : v <= 0 ? 4 : 1 + Math.min(3, Math.floor(m / v * 4)), vd = (m) => {
  let v = 0, c = 0, F = null, T = 0, B = null, $ = { days: 0, start: null, end: null };
  for (const Q of m)
    v += Q.count, Q.count > c && (c = Q.count, F = Q.date), Q.count > 0 ? (T === 0 && (B = Q.date), T++, T > $.days && ($ = { days: T, start: B, end: Q.date })) : T = 0;
  let H = m.length - 1;
  H >= 0 && m[H].count === 0 && H--;
  const j = H;
  for (; H >= 0 && m[H].count > 0; ) H--;
  const oe = j - H, ne = oe > 0 ? { days: oe, start: m[H + 1].date, end: m[j].date } : { days: 0, start: null, end: null };
  return {
    total: v,
    first: m.length ? m[0].date : null,
    last: m.length ? m[m.length - 1].date : null,
    busiest: { count: c, date: F },
    longest: $,
    current: ne
  };
}, yd = (m, v, c = "en-US") => {
  const F = new Intl.DateTimeFormat(c, { month: "short", timeZone: "UTC" }), T = [];
  let B = -1;
  for (let $ = 0; $ < v; $++) {
    const H = m[$ * 7];
    if (!H) break;
    const j = +H.date.slice(5, 7);
    j !== B && T.push({ week: $, label: F.format(rn(H.date)) }), B = j;
  }
  return T.length > 1 && T[1].week - T[0].week < 3 && T.shift(), T;
}, gd = (m, v, c = 1) => m > 0 && v > 0 ? 0.4 + Math.pow(m / v, 0.85) * 7.2 * c : 0.2, wd = 0.42, kd = (m, v, c, F) => {
  const T = (c > 1 ? v / (c - 1) : 0) * 0.36 + F / 6 * 0.06;
  return fd((m - T) / (1 - wd));
}, bu = Math.PI / 4, es = 34 * Math.PI / 180, ts = [8 * Math.PI / 180, 82 * Math.PI / 180], wi = [18 * Math.PI / 180, 62 * Math.PI / 180], Gu = (m, v = 0, c = 0) => {
  const F = Math.min(ts[1], Math.max(0, Kr(0, bu + v, m))), T = Kr(Math.PI / 2, Math.min(wi[1], Math.max(wi[0], es + c)), m);
  return { cs: Math.cos(F), sn: Math.sin(F), se: Math.sin(T), ce: Math.cos(T) };
}, xd = (m, v, c, F) => [
  v * m.cs - c * m.sn,
  (v * m.sn + c * m.cs) * m.se - F * m.ce
], Cc = (m, v, c) => [m[0] + (v[0] - m[0]) * c, m[1] + (v[1] - m[1]) * c, m[2] + (v[2] - m[2]) * c], _c = (m) => (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) / 255, yi = {
  github: { light: ["#c6e48b", "#7bc96f", "#239a3b", "#196127"], dark: ["#0e4429", "#006d32", "#26a641", "#39d353"] },
  halloween: { light: ["#ffee4a", "#ffc501", "#fe9600", "#b33c00"], dark: ["#631c03", "#bd561d", "#fa7a18", "#fddf68"] },
  ocean: { light: ["#b8e3f5", "#6ec3eb", "#2a8fd1", "#0b4f8a"], dark: ["#0c2d4a", "#12508a", "#2a88d8", "#7cc7ff"] },
  ember: { light: ["#fde2c4", "#fbad6e", "#f06b3a", "#b3261e"], dark: ["#4a1a10", "#8f2f16", "#e0572a", "#ffa46b"] },
  grape: { light: ["#e4d4fb", "#b794f4", "#805ad5", "#44337a"], dark: ["#2d1f4f", "#553c9a", "#8b5cf6", "#c4b5fd"] },
  mono: { light: ["#d4d4d4", "#a3a3a3", "#525252", "#171717"], dark: ["#333333", "#5c5c5c", "#a3a3a3", "#fafafa"] }
}, Nc = (m, v) => {
  const c = Array.isArray(m) ? m : typeof m == "object" && m ? v ? m.dark : m.light : yi[m ?? "github"] ? yi[m][v ? "dark" : "light"] : yi.github[v ? "dark" : "light"], F = yi.github[v ? "dark" : "light"];
  return [0, 1, 2, 3].map((T) => c[T] ?? c[c.length - 1] ?? F[T]);
}, po = [23, 23, 23], Pc = [255, 255, 255];
let yr = null;
const Xu = (m, v) => {
  if (!yr) {
    const F = document.createElement("canvas");
    F.width = F.height = 1, yr = F.getContext("2d", { willReadFrequently: !0 });
  }
  if (!yr) return v;
  yr.clearRect(0, 0, 1, 1), yr.fillStyle = "rgba(0,0,0,0)", yr.fillStyle = m, yr.fillRect(0, 0, 1, 1);
  const c = yr.getImageData(0, 0, 1, 1).data;
  return c[3] < 8 ? v : [c[0], c[1], c[2]];
}, gi = (m, v, c) => "rgb(" + Math.round(m) + "," + Math.round(v) + "," + Math.round(c) + ")", Zu = (m, v, c, F) => {
  let T = 0;
  for (let B = 0; B < 4; B++) {
    const $ = m[v + B * 2], H = m[v + B * 2 + 1], j = m[v + (B + 1) % 4 * 2], oe = m[v + (B + 1) % 4 * 2 + 1], ne = (j - $) * (F - H) - (oe - H) * (c - $);
    if (Math.abs(ne) < 1e-9) continue;
    const Q = ne > 0 ? 1 : -1;
    if (T === 0) T = Q;
    else if (Q !== T) return !1;
  }
  return T !== 0;
}, Ju = (m, v, c, F) => {
  if (F < 0.3) {
    m.moveTo(v[c], v[c + 1]), m.lineTo(v[c + 2], v[c + 3]), m.lineTo(v[c + 4], v[c + 5]), m.lineTo(v[c + 6], v[c + 7]), m.closePath();
    return;
  }
  m.moveTo((v[c + 6] + v[c]) / 2, (v[c + 7] + v[c + 1]) / 2);
  for (let T = 0; T < 4; T++) {
    const B = (T + 1) % 4;
    m.arcTo(v[c + T * 2], v[c + T * 2 + 1], v[c + B * 2], v[c + B * 2 + 1], F);
  }
  m.closePath();
}, Sd = () => /* @__PURE__ */ _.jsxs("svg", { viewBox: "0 0 16 16", width: "14", height: "14", "aria-hidden": "true", style: { maxWidth: "none" }, children: [
  /* @__PURE__ */ _.jsx("rect", { x: "1.5", y: "1.5", width: "5.5", height: "5.5", rx: "1", fill: "currentColor" }),
  /* @__PURE__ */ _.jsx("rect", { x: "9", y: "1.5", width: "5.5", height: "5.5", rx: "1", fill: "currentColor" }),
  /* @__PURE__ */ _.jsx("rect", { x: "1.5", y: "9", width: "5.5", height: "5.5", rx: "1", fill: "currentColor" }),
  /* @__PURE__ */ _.jsx("rect", { x: "9", y: "9", width: "5.5", height: "5.5", rx: "1", fill: "currentColor" })
] }), Ed = () => /* @__PURE__ */ _.jsxs("svg", { viewBox: "0 0 16 16", width: "14", height: "14", "aria-hidden": "true", style: { maxWidth: "none" }, children: [
  /* @__PURE__ */ _.jsx("path", { d: "M8 1.2 14.2 4.6v6.8L8 14.8 1.8 11.4V4.6Z", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinejoin: "round" }),
  /* @__PURE__ */ _.jsx("path", { d: "M1.8 4.6 8 8l6.2-3.4M8 8v6.8", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinejoin: "round" })
] }), Yr = "var(--color-muted-foreground, #737373)";
function mo({
  label: m,
  value: v,
  unit: c,
  sub: F,
  accent: T,
  size: B,
  align: $
}) {
  return $ === "stack" ? /* @__PURE__ */ _.jsxs("div", { className: "min-w-0", children: [
    /* @__PURE__ */ _.jsx("div", { className: "text-[13px] leading-tight", style: { color: Yr }, children: m }),
    /* @__PURE__ */ _.jsxs("div", { className: "mt-1 flex items-baseline gap-1.5", children: [
      /* @__PURE__ */ _.jsx(
        "span",
        {
          className: "font-semibold tabular-nums transition-colors duration-500 motion-reduce:transition-none",
          style: { color: T, fontSize: B, lineHeight: 1, letterSpacing: "-0.02em" },
          children: v
        }
      ),
      /* @__PURE__ */ _.jsx("span", { className: "text-[14px]", children: c })
    ] }),
    /* @__PURE__ */ _.jsx("div", { className: "mt-0.5 truncate text-[12px]", style: { color: Yr }, children: F })
  ] }) : /* @__PURE__ */ _.jsxs("div", { className: "grid grid-cols-[auto_auto] items-end gap-x-2", style: { justifyContent: $ }, children: [
    $ === "end" ? /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
      /* @__PURE__ */ _.jsx("div", { className: "text-right text-[13px] leading-tight", style: { color: Yr }, children: m }),
      /* @__PURE__ */ _.jsx("div", {})
    ] }) : /* @__PURE__ */ _.jsx("div", { className: "col-span-2 text-[13px] leading-tight", style: { color: Yr }, children: m }),
    /* @__PURE__ */ _.jsx(
      "div",
      {
        className: "text-right font-semibold tabular-nums transition-colors duration-500 motion-reduce:transition-none",
        style: { color: T, fontSize: B, lineHeight: 0.95, letterSpacing: "-0.02em" },
        children: v
      }
    ),
    /* @__PURE__ */ _.jsxs("div", { className: "pb-[0.15em] leading-tight", children: [
      /* @__PURE__ */ _.jsx("div", { className: "text-[15px]", children: c }),
      /* @__PURE__ */ _.jsx("div", { className: "whitespace-nowrap text-[13px]", style: { color: Yr }, children: F })
    ] })
  ] });
}
function Cd({
  data: m,
  endDate: v,
  view: c,
  defaultView: F = "3d",
  onViewChange: T,
  palette: B = "github",
  title: $,
  unit: H = "contribution",
  unitPlural: j,
  heightScale: oe = 1,
  duration: ne = 1300,
  weekStart: Q = 0,
  orbit: se = !0,
  showStats: Ve = !0,
  showLegend: Ze = !0,
  showToggle: ge = !0,
  footer: we,
  locale: De = "en-US",
  seed: Ot = 7,
  onCellClick: Et,
  className: Je = ""
}) {
  const Ct = v == null ? null : rn(v), ke = Ue.useMemo(() => {
    const A = (m ?? []).map((K) => rn(K.date)).filter(Number.isFinite), ae = Ct ?? (A.length ? Math.max(...A) : rn(/* @__PURE__ */ new Date())), J = m ?? pd(ae, Ot), ft = md(J, ae, Q);
    return { ...ft, stats: vd(ft.cells), months: yd(ft.cells, ft.weeks, De) };
  }, [m, Ct, Ot, Q, De]), [at, _t] = Ue.useState(F), gt = c ?? at, ln = (A) => {
    c === void 0 && _t(A), T == null || T(A);
  }, [Nt, At] = Ue.useState(() => {
    const A = Nc(B, !1);
    return { dark: !1, swatches: ["#ebedf0", ...A], accent: A[3] };
  }), [ct, Pt] = Ue.useState(0), [Be, rt] = Ue.useState(-1), [xe, E] = Ue.useState(-1), [O, N] = Ue.useState(""), f = Ue.useRef(null), y = Ue.useRef(null), G = Ue.useRef(null), X = Ue.useRef(null), b = Ue.useRef(null), re = j ?? H + "s", ie = Ue.useMemo(() => new Intl.NumberFormat(De), [De]), pe = Ue.useMemo(() => new Intl.DateTimeFormat(De, { month: "short", day: "numeric", timeZone: "UTC" }), [De]), Se = Ue.useMemo(() => new Intl.DateTimeFormat(De, { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }), [De]), wt = Ue.useMemo(() => new Intl.DateTimeFormat(De, { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }), [De]), on = (A) => A === 1 ? H : re, zl = (A) => {
    const ae = ke.cells[A];
    return ae ? (ae.count ? ie.format(ae.count) + " " + on(ae.count) : "No " + re) + " on " + wt.format(rn(ae.date)) : "";
  }, Ee = Ue.useRef({ model: ke, duration: ne, heightScale: oe, orbit: se, palette: B, legendLevel: xe, onCellClick: Et, target: gt === "3d" ? 1 : 0, setActive: rt, setWidth: Pt, setTheme: At, setAnnounce: N, describe: zl });
  Ee.current = { model: ke, duration: ne, heightScale: oe, orbit: se, palette: B, legendLevel: xe, onCellClick: Et, target: gt === "3d" ? 1 : 0, setActive: rt, setWidth: Pt, setTheme: At, setAnnounce: N, describe: zl }, Ue.useEffect(() => {
    const A = f.current, ae = y.current, J = G.current, ft = X.current;
    if (!A || !ae || !J || !ft) return;
    const K = J.getContext("2d");
    if (!K) return;
    const En = window.matchMedia("(prefers-reduced-motion: reduce)"), Xn = window.matchMedia("(prefers-color-scheme: dark)");
    let Cn = En.matches, sn = 0, Ut = 0, Rl = !1, In = 0, On = 0, an = 0, cn = 0, $e = 0, _n = 0, Nn = 0, kr = 0, Zr = -1, Zn = 1, xr = 30, jl = 30, Sr = "10px sans-serif";
    const Bt = new Float32Array(15), Pn = new Float32Array(15);
    let Jr = !1, Qe = po, qr = Pc, fn = !1, ce = 0, Jn = 0, dt = new Float32Array(0), Wt = new Float32Array(0), br = new Uint8Array(0), el = new Float32Array(0), Ht = new Float32Array(0), An = new Float32Array(0), Er = new Float32Array(0), Y = new Float32Array(0), Cr = new Uint8Array(0), _r = [], tl = [], Nr = [], Vt = -1, $t = -1, ve = -1, ho = 0, Mn = 0, nl = 0;
    const Pr = () => {
      const S = Ee.current.model;
      ce = S.cells.length, Jn = S.weeks, dt.length !== ce && (dt = new Float32Array(ce), Wt = new Float32Array(ce), br = new Uint8Array(ce), el = new Float32Array(ce), Ht = new Float32Array(ce), An = new Float32Array(ce), Er = new Float32Array(ce), Y = new Float32Array(ce * 24), Cr = new Uint8Array(ce), _r = Array.from({ length: ce }, (R, U) => U));
      for (let R = 0; R < ce; R++) {
        const U = S.cells[R];
        dt[R] = U.week, Wt[R] = U.day, br[R] = U.level, el[R] = gd(U.count, S.max, Ee.current.heightScale);
      }
      tl = S.months;
      const Z = new Intl.DateTimeFormat(De, { weekday: "short", timeZone: "UTC" });
      Nr = [];
      for (let R = 0; R < 7 && R < ce; R++) {
        const U = new Date(rn(S.cells[R].date)).getUTCDay();
        (U === 1 || U === 3 || U === 5) && Nr.push({ day: R, label: Z.format(rn(S.cells[R].date)) });
      }
      Vt >= ce && (Vt = -1), $t >= ce && ($t = -1);
    }, qn = () => {
      const S = getComputedStyle(A);
      Qe = Xu(S.color, po) ?? po, qr = Xu(S.backgroundColor, null) ?? (_c(Qe) > 0.5 ? [10, 10, 10] : Pc), fn = _c(qr) < 0.45, Sr = "400 10px " + (S.fontFamily || "sans-serif");
      const R = Nc(Ee.current.palette, fn), ye = [Cc(qr, Qe, fn ? 0.11 : 0.075), ...R.map((le) => Xu(le, po) ?? po)];
      for (let le = 0; le < 5; le++) for (let Ne = 0; Ne < 3; Ne++) Pn[le * 3 + Ne] = ye[le][Ne];
      (!Jr || Cn) && (Bt.set(Pn), Jr = !0), K.font = Sr, jl = Math.ceil(Math.max(20, ...Nr.map((le) => K.measureText(le.label).width))) + 8;
      const _e = ye.map((le) => gi(le[0], le[1], le[2]));
      Ee.current.setTheme(
        (le) => le.dark === fn && le.swatches.join() === _e.join() ? le : { dark: fn, swatches: _e, accent: _e[4] }
      ), Ke();
    }, rl = (S, Z, R) => {
      const U = Kr(0.78, 0.9, Z), ye = (1 - U) / 2;
      let _e = 1 / 0, le = -1 / 0, Ne = 1 / 0, ue = -1 / 0;
      const Me = (Oe, fe, lt) => {
        const ot = xd(S, Oe, fe, lt);
        ot[0] < _e && (_e = ot[0]), ot[0] > le && (le = ot[0]), ot[1] < Ne && (Ne = ot[1]), ot[1] > ue && (ue = ot[1]);
      };
      for (let Oe = 0; Oe < ce; Oe++) {
        const fe = dt[Oe] + ye, lt = Wt[Oe] + ye, ot = R ? el[Oe] * Z : Ht[Oe];
        Me(fe, lt, ot), Me(fe + U, lt, ot), Me(fe, lt + U, ot), Me(fe + U, lt + U, 0), Me(fe, lt + U, 0), Me(fe + U, lt, 0);
      }
      return Me(0, 7 + 1.5 * Z, 0), Me(Jn, 7 + 1.5 * Z, 0), { minx: _e, maxx: le, miny: Ne, maxy: ue };
    }, bn = () => {
      const S = Math.round(ae.clientWidth);
      if (!S || !ce) return;
      $e = S, xr = $e < 520 ? 0 : jl, Zn = Math.min(2, window.devicePixelRatio || 1);
      const Z = rl(Gu(0), 0, !0);
      _n = 24 + (Z.maxy - Z.miny) / (Z.maxx - Z.minx) * ($e - xr - 4);
      const R = rl(Gu(1), 1, !0), U = (R.maxy - R.miny) / (R.maxx - R.minx) * ($e - 40) + 40;
      Nn = Math.max(Math.min(U, $e * 0.72, 620), Math.min(U, 240)), kr = Math.ceil(Math.max(_n, Nn)), J.width = Math.round($e * Zn), J.height = Math.round(kr * Zn), J.style.width = $e + "px", J.style.height = kr + "px", Zr = -1, Ee.current.setWidth($e), Mt();
    }, Mt = () => {
      if (!$e || !ce) return;
      const S = cd(sn), Z = Gu(S, In, On), R = Kr(_n, Nn, S);
      Math.abs(R - Zr) > 0.2 && (ae.style.height = R.toFixed(1) + "px", Zr = R);
      for (let ee = 0; ee < ce; ee++) Ht[ee] = kd(sn, dt[ee], Jn, Wt[ee]) * el[ee];
      const U = rl(Z, S, !1), ye = Kr(2, 20, S), _e = ye + xr * (1 - S), le = ye + 20 * (1 - S), Ne = $e - _e - ye, ue = R - le - ye, Me = Math.max(1e-6, U.maxx - U.minx), Oe = Math.max(1e-6, U.maxy - U.miny), fe = Math.min(Ne / Me, ue / Oe), lt = _e + (Ne - Me * fe) / 2 - U.minx * fe, ot = le + (ue - Oe * fe) / 2 - U.miny * fe, { cs: dn, sn: Lr, se: So, ce: Tr } = Z, zt = (ee, q) => lt + (ee * dn - q * Lr) * fe, kt = (ee, q, ze) => ot + ((ee * Lr + q * dn) * So - ze * Tr) * fe;
      K.setTransform(Zn, 0, 0, Zn, 0, 0), K.clearRect(0, 0, $e, kr), _r.sort((ee, q) => (dt[ee] + 0.5) * Lr + (Wt[ee] + 0.5) * dn - ((dt[q] + 0.5) * Lr + (Wt[q] + 0.5) * dn));
      const Qt = Kr(0.78, 0.9, S), pt = (1 - Qt) / 2, nr = Kr(0.17, 0.03, S) * fe, Rr = (1 - S) * 0.07, Eo = 0.7 * S, ki = Bt[0], Ol = Bt[1], il = Bt[2];
      for (let ee = 0; ee < ce; ee++) {
        const q = _r[ee], ze = dt[q] + pt, it = Wt[q] + pt, be = ze + Qt, Lt = it + Qt, Ye = Ht[q] + An[q] * Eo, V = q * 24;
        Y[V] = zt(ze, it), Y[V + 1] = kt(ze, it, Ye), Y[V + 2] = zt(be, it), Y[V + 3] = kt(be, it, Ye), Y[V + 4] = zt(be, Lt), Y[V + 5] = kt(be, Lt, Ye), Y[V + 6] = zt(ze, Lt), Y[V + 7] = kt(ze, Lt, Ye), Y[V + 8] = zt(ze, Lt), Y[V + 9] = kt(ze, Lt, 0), Y[V + 10] = zt(be, Lt), Y[V + 11] = kt(be, Lt, 0), Y[V + 12] = Y[V + 4], Y[V + 13] = Y[V + 5], Y[V + 14] = Y[V + 6], Y[V + 15] = Y[V + 7], Y[V + 16] = zt(be, it), Y[V + 17] = kt(be, it, 0), Y[V + 18] = Y[V + 10], Y[V + 19] = Y[V + 11], Y[V + 20] = Y[V + 4], Y[V + 21] = Y[V + 5], Y[V + 22] = Y[V + 2], Y[V + 23] = Y[V + 3];
        const ul = Ye * Tr * fe;
        let mn = 0;
        ul > 0.35 && Qt * dn * fe > 0.35 && (mn |= 1), ul > 0.35 && Qt * Lr * fe > 0.35 && (mn |= 2), Cr[q] = mn;
        const Ul = br[q] * 3;
        let hn = Bt[Ul], vn = Bt[Ul + 1], Kt = Bt[Ul + 2];
        const Bn = Er[q];
        Bn > 2e-3 && (hn += (ki - hn) * 0.72 * Bn, vn += (Ol - vn) * 0.72 * Bn, Kt += (il - Kt) * 0.72 * Bn);
        const jr = An[q];
        if (jr > 2e-3) {
          const Bl = 0.16 * jr;
          hn += (Qe[0] - hn) * Bl, vn += (Qe[1] - vn) * Bl, Kt += (Qe[2] - Kt) * Bl;
        }
        mn & 1 && (K.beginPath(), Ju(K, Y, V + 8, 0), K.fillStyle = gi(hn * 0.84, vn * 0.84, Kt * 0.84), K.fill()), mn & 2 && (K.beginPath(), Ju(K, Y, V + 16, 0), K.fillStyle = gi(hn * 0.68, vn * 0.68, Kt * 0.68), K.fill()), K.beginPath(), Ju(K, Y, V, nr), K.fillStyle = gi(hn, vn, Kt), K.fill(), Rr > 4e-3 && (K.strokeStyle = "rgba(" + Qe[0] + "," + Qe[1] + "," + Qe[2] + "," + Rr.toFixed(3) + ")", K.lineWidth = 1, K.stroke()), jr > 0.02 && (K.strokeStyle = "rgba(" + Qe[0] + "," + Qe[1] + "," + Qe[2] + "," + (0.85 * jr).toFixed(3) + ")", K.lineWidth = 1.5, K.stroke());
      }
      const zn = Cc(qr, Qe, 0.55);
      K.font = Sr;
      const Al = 1 - Ec(0, 0.4, S), pn = Ec(0.62, 1, S);
      if (Al > 4e-3) {
        K.fillStyle = "rgba(" + Math.round(zn[0]) + "," + Math.round(zn[1]) + "," + Math.round(zn[2]) + "," + Al.toFixed(3) + ")", K.textAlign = "left", K.textBaseline = "bottom";
        let ee = -1 / 0;
        for (const q of tl) {
          const ze = zt(q.week + pt, -0.3), it = K.measureText(q.label).width;
          ze < ee || ze + it > $e || (K.fillText(q.label, ze, kt(q.week + pt, -0.3, 0) - 3), ee = ze + it + 6);
        }
        if (K.textAlign = "right", K.textBaseline = "middle", xr > 0) for (const q of Nr) K.fillText(q.label, zt(0, q.day + 0.5) - 6, kt(0, q.day + 0.5, 0));
      }
      if (pn > 4e-3) {
        K.fillStyle = "rgba(" + Math.round(zn[0]) + "," + Math.round(zn[1]) + "," + Math.round(zn[2]) + "," + pn.toFixed(3) + ")", K.textAlign = "left", K.textBaseline = "top";
        let ee = -1 / 0;
        for (const q of tl) {
          const ze = zt(q.week + 0.5, 7.3);
          ze < ee || ze + K.measureText(q.label).width > $e || (K.fillText(q.label, ze, kt(q.week + 0.5, 7.3, 0) + 2), ee = ze + K.measureText(q.label).width + 10);
        }
      }
      if (ve >= 0 && ve < ce) {
        const ee = ve, q = Ht[ee] + An[ee] * Eo, ze = zt(dt[ee] + 0.5, Wt[ee] + 0.5), it = Math.min(kt(dt[ee] + pt, Wt[ee] + pt, q), kt(dt[ee] + pt + Qt, Wt[ee] + pt, q), kt(dt[ee] + pt, Wt[ee] + pt + Qt, q)), be = ho / 2, Lt = Math.min($e - be - 2, Math.max(be + 2, ze));
        ft.style.transform = "translate(" + (Lt - be).toFixed(1) + "px," + (it - 8).toFixed(1) + "px) translateY(-100%)", ft.style.setProperty("--arrow", (ze - Lt + be).toFixed(1) + "px");
      }
    }, vo = (S) => {
      Mn = 0;
      const Z = Math.min(0.05, Math.max(0, (S - nl) / 1e3));
      nl = S;
      let R = !1;
      if (sn !== Ut) {
        const ue = Cn ? 1 : Z * 1e3 / Math.max(1, Ee.current.duration);
        sn = Ut > sn ? Math.min(Ut, sn + ue) : Math.max(Ut, sn - ue), R = !0;
      }
      const U = Cn ? 1 : 1 - Math.exp(-Z * 12);
      In += (an - In) * U, On += (cn - On) * U, Math.abs(an - In) > 1e-4 || Math.abs(cn - On) > 1e-4 ? R = !0 : (In = an, On = cn);
      const ye = Cn ? 1 : 1 - Math.exp(-Z * 7);
      for (let ue = 0; ue < 15; ue++) {
        const Me = Pn[ue] - Bt[ue];
        Math.abs(Me) > 0.4 ? (Bt[ue] += Me * ye, R = !0) : Bt[ue] = Pn[ue];
      }
      const _e = Cn ? 1 : 1 - Math.exp(-Z * 16), le = Cn ? 1 : 1 - Math.exp(-Z * 10), Ne = Ee.current.legendLevel;
      for (let ue = 0; ue < ce; ue++) {
        const Me = ue === ve ? 1 : 0, Oe = Ne >= 0 && br[ue] !== Ne ? 1 : 0, fe = An[ue], lt = Er[ue];
        fe !== Me && (An[ue] = Math.abs(Me - fe) < 3e-3 ? Me : fe + (Me - fe) * _e, R = !0), lt !== Oe && (Er[ue] = Math.abs(Oe - lt) < 3e-3 ? Oe : lt + (Oe - lt) * le, R = !0);
      }
      Mt(), R && (Mn = requestAnimationFrame(vo));
    }, Ke = () => {
      Mn || (nl = performance.now(), Mn = requestAnimationFrame(vo));
    }, Un = () => {
      const S = Vt >= 0 ? Vt : $t;
      S !== ve && (ve = S, Ee.current.setActive(S), Ke());
    }, yo = (S, Z) => {
      for (let R = ce - 1; R >= 0; R--) {
        const U = _r[R], ye = U * 24;
        if (Zu(Y, ye, S, Z) || Cr[U] & 1 && Zu(Y, ye + 8, S, Z) || Cr[U] & 2 && Zu(Y, ye + 16, S, Z)) return U;
      }
      return -1;
    }, go = (S) => {
      const Z = J.getBoundingClientRect();
      return [S.clientX - Z.left, S.clientY - Z.top];
    };
    let Ie = null;
    const Mr = (S) => {
      if (S.button !== 0) return;
      const Z = Ee.current.orbit && Ut === 1;
      if (Ie = { id: S.pointerId, x: S.clientX, y: S.clientY, yaw: an, elev: cn, moved: !1, orbit: Z, mouse: S.pointerType === "mouse" }, Z)
        try {
          J.setPointerCapture(S.pointerId);
        } catch {
        }
    }, er = (S) => {
      if (Ie && Ie.orbit && S.pointerId === Ie.id) {
        const ye = S.clientX - Ie.x, _e = S.clientY - Ie.y;
        if (Ie.moved || Math.hypot(ye, _e) > 4) {
          Ie.moved = !0, an = Math.min(ts[1] - bu, Math.max(ts[0] - bu, Ie.yaw + ye * 6e-3)), Ie.mouse && (cn = Math.min(wi[1] - es, Math.max(wi[0] - es, Ie.elev + _e * 4e-3))), J.style.cursor = "grabbing", Vt = -1, Un(), Ke();
          return;
        }
      }
      if (S.pointerType !== "mouse") return;
      const [Z, R] = go(S), U = yo(Z, R);
      U !== Vt && (Vt = U, Un()), J.style.cursor = Ee.current.orbit && Ut === 1 ? "grab" : U >= 0 ? "pointer" : "default";
    }, zr = (S) => {
      var _e, le;
      if (!Ie || S.pointerId !== Ie.id) return;
      const Z = Ie.moved;
      if (Ie = null, J.hasPointerCapture(S.pointerId) && J.releasePointerCapture(S.pointerId), J.style.cursor = Ee.current.orbit && Ut === 1 ? "grab" : "default", Z) return;
      const [R, U] = go(S), ye = yo(R, U);
      if ($t = ye === $t ? -1 : ye, S.pointerType !== "mouse" && (Vt = -1), Un(), ye >= 0) {
        const Ne = Ee.current.model.cells[ye];
        (le = (_e = Ee.current).onCellClick) == null || le.call(_e, { date: Ne.date, count: Ne.count });
      }
    }, wo = () => {
      Ie = null;
    }, ko = () => {
      Ie || (Vt = -1, Un());
    }, ll = () => {
      an = 0, cn = 0, Ke();
    }, Fl = (S) => {
      var U, ye;
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "Escape", "Enter", " "].includes(S.key) || !ce) return;
      if (S.preventDefault(), S.key === "Escape") {
        $t = -1, Vt = -1, Un();
        return;
      }
      let R = $t >= 0 ? $t : ve >= 0 ? ve : ce - 1;
      if (S.key === "Enter" || S.key === " ") {
        const _e = Ee.current.model.cells[R];
        (ye = (U = Ee.current).onCellClick) == null || ye.call(U, { date: _e.date, count: _e.count });
        return;
      }
      ($t >= 0 || ve >= 0) && (S.key === "ArrowLeft" && (R -= 7), S.key === "ArrowRight" && (R += 7), S.key === "ArrowUp" && (R -= 1), S.key === "ArrowDown" && (R += 1), S.key === "Home" && (R = 0), S.key === "End" && (R = ce - 1)), R = Math.max(0, Math.min(ce - 1, R)), $t = R, Vt = -1, Un(), Ee.current.setAnnounce(Ee.current.describe(R));
    }, ol = () => {
      $t = -1, Un();
    }, tr = () => {
      const S = Ee.current.target;
      Rl && S !== Ut && (Ut = S, S === 0 && (an = 0, cn = 0), J.style.cursor = Ee.current.orbit && Ut === 1 ? "grab" : "default", Ke());
    };
    Pr(), qn(), bn();
    const xo = () => {
      Rl || (Rl = !0, Cn && (sn = Ee.current.target), tr());
    };
    let Zt = null;
    "IntersectionObserver" in window ? (Zt = new IntersectionObserver(
      (S) => {
        S.some((Z) => Z.isIntersecting) && (xo(), Zt == null || Zt.disconnect());
      },
      { threshold: 0.35 }
    ), Zt.observe(ae)) : xo();
    const me = new ResizeObserver(() => {
      Math.round(ae.clientWidth) !== $e && bn();
    });
    me.observe(ae);
    const Dl = new MutationObserver(qn);
    Dl.observe(document.documentElement, { attributes: !0, attributeFilter: ["class", "style", "data-theme"] });
    const Il = () => {
      Cn = En.matches, Ke();
    };
    return En.addEventListener("change", Il), Xn.addEventListener("change", qn), J.addEventListener("pointerdown", Mr), J.addEventListener("pointermove", er), J.addEventListener("pointerup", zr), J.addEventListener("pointercancel", wo), J.addEventListener("pointerleave", ko), J.addEventListener("dblclick", ll), J.addEventListener("keydown", Fl), J.addEventListener("blur", ol), b.current = {
      kick: () => {
        tr(), Ke();
      },
      load: () => {
        Pr(), qn(), bn();
      },
      retheme: qn,
      tipWidth: (S) => {
        ho = S, Mt();
      }
    }, () => {
      Mn && cancelAnimationFrame(Mn), Zt == null || Zt.disconnect(), me.disconnect(), Dl.disconnect(), En.removeEventListener("change", Il), Xn.removeEventListener("change", qn), J.removeEventListener("pointerdown", Mr), J.removeEventListener("pointermove", er), J.removeEventListener("pointerup", zr), J.removeEventListener("pointercancel", wo), J.removeEventListener("pointerleave", ko), J.removeEventListener("dblclick", ll), J.removeEventListener("keydown", Fl), J.removeEventListener("blur", ol), b.current = null;
    };
  }, [De]), Ue.useEffect(() => {
    var A;
    (A = b.current) == null || A.kick();
  }, [gt, xe]), Ue.useEffect(() => {
    var A;
    (A = b.current) == null || A.load();
  }, [ke, oe]), Ue.useEffect(() => {
    var A;
    (A = b.current) == null || A.retheme();
  }, [B]), Ue.useLayoutEffect(() => {
    var ae;
    const A = X.current;
    A && Be >= 0 && ((ae = b.current) == null || ae.tipWidth(A.offsetWidth));
  }, [Be, ke]);
  const { stats: Ce } = ke, gr = (A, ae, J = !1) => {
    if (!A || !ae) return "—";
    const ft = J ? Se : pe;
    return ft.format(rn(A)) + " — " + ft.format(rn(ae));
  }, qe = gt === "3d", Gr = Ve && ct >= 560, wr = Math.round(Math.max(30, Math.min(56, ct * 0.058))), Fn = [
    { label: "1 year total", value: ie.format(Ce.total), unit: on(Ce.total), sub: gr(Ce.first, Ce.last, !0) },
    { label: "Busiest day", value: ie.format(Ce.busiest.count), unit: on(Ce.busiest.count), sub: Ce.busiest.date ? pe.format(rn(Ce.busiest.date)) : "—" },
    { label: "Longest streak", value: ie.format(Ce.longest.days), unit: Ce.longest.days === 1 ? "day" : "days", sub: gr(Ce.longest.start, Ce.longest.end) },
    { label: "Current streak", value: ie.format(Ce.current.days), unit: Ce.current.days === 1 ? "day" : "days", sub: gr(Ce.current.start, Ce.current.end) }
  ], Dn = Ve && !(qe && Gr), un = "cubic-bezier(0.65, 0, 0.35, 1)", Xr = ["No " + re, "Light", "Moderate", "Heavy", "Heaviest"], Ll = ["Hover a day for details · arrow keys to explore", "Drag to orbit · double-click to reset"], Tl = Ll[qe && se ? 1 : 0];
  return /* @__PURE__ */ _.jsxs(
    "section",
    {
      ref: f,
      className: "relative w-full rounded-xl border p-4 font-sans sm:p-5 " + Je,
      style: {
        background: "var(--color-background, #ffffff)",
        color: "var(--color-foreground, #171717)",
        borderColor: "var(--color-border, #e5e5e5)"
      },
      children: [
        /* @__PURE__ */ _.jsxs("header", { className: "mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2", children: [
          /* @__PURE__ */ _.jsx("h3", { className: "m-0 text-[15px] font-normal leading-snug", children: $ ?? /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
            /* @__PURE__ */ _.jsx("span", { className: "font-semibold tabular-nums", children: ie.format(Ce.total) }),
            " ",
            on(Ce.total),
            " in the last year"
          ] }) }),
          ge && /* @__PURE__ */ _.jsxs(
            "div",
            {
              role: "group",
              "aria-label": "Chart view",
              className: "relative inline-flex rounded-md border p-0.5",
              style: { borderColor: "var(--color-border, #e5e5e5)" },
              children: [
                /* @__PURE__ */ _.jsx(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: "absolute top-0.5 bottom-0.5 left-0.5 w-8 rounded transition-transform duration-500 motion-reduce:transition-none",
                    style: {
                      background: "var(--color-foreground, #171717)",
                      transform: qe ? "translateX(100%)" : "translateX(0)",
                      transitionTimingFunction: un
                    }
                  }
                ),
                ["2d", "3d"].map((A) => /* @__PURE__ */ _.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-pressed": gt === A,
                    "aria-label": A === "2d" ? "Flat heat map" : "3D skyline",
                    title: A === "2d" ? "Flat heat map" : "3D skyline",
                    onClick: () => ln(A),
                    className: "relative z-10 grid h-7 w-8 cursor-pointer place-items-center rounded border-0 bg-transparent p-0 transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none",
                    style: {
                      color: gt === A ? "var(--color-background, #ffffff)" : Yr,
                      outlineColor: "var(--color-foreground, #171717)"
                    },
                    children: A === "2d" ? /* @__PURE__ */ _.jsx(Sd, {}) : /* @__PURE__ */ _.jsx(Ed, {})
                  },
                  A
                ))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ _.jsxs("div", { className: "relative rounded-lg border", style: { borderColor: "var(--color-border, #e5e5e5)" }, children: [
          /* @__PURE__ */ _.jsxs("div", { className: "relative px-3 pt-3 sm:px-4 sm:pt-4", children: [
            /* @__PURE__ */ _.jsxs(
              "div",
              {
                ref: y,
                className: "relative w-full overflow-hidden rounded-md outline-offset-4 has-[:focus-visible]:outline-2",
                style: { height: 150, outlineColor: "var(--color-foreground, #171717)" },
                children: [
                  /* @__PURE__ */ _.jsx(
                    "canvas",
                    {
                      ref: G,
                      tabIndex: 0,
                      role: "img",
                      "aria-label": ie.format(Ce.total) + " " + on(Ce.total) + " between " + gr(Ce.first, Ce.last, !0) + ", shown as a " + (qe ? "3D skyline" : "heat map") + ". Use the arrow keys to read individual days.",
                      className: "absolute top-0 left-0 block outline-none",
                      style: { maxWidth: "none", touchAction: qe && se ? "pan-y" : "auto" }
                    }
                  ),
                  Ve && Gr && /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
                    /* @__PURE__ */ _.jsxs(
                      "div",
                      {
                        "aria-hidden": !qe,
                        className: "pointer-events-none absolute top-1 right-1 flex flex-col items-end gap-5 transition-[opacity,transform] motion-reduce:transition-none",
                        style: {
                          opacity: qe ? 1 : 0,
                          transform: qe ? "translateY(0)" : "translateY(-10px)",
                          transitionDuration: qe ? "600ms" : "300ms",
                          transitionDelay: qe ? Math.round(ne * 0.55) + "ms" : "0ms",
                          transitionTimingFunction: un
                        },
                        children: [
                          /* @__PURE__ */ _.jsx(mo, { ...Fn[0], accent: Nt.accent, size: wr, align: "end" }),
                          /* @__PURE__ */ _.jsx(mo, { ...Fn[1], accent: Nt.accent, size: wr, align: "end" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ _.jsxs(
                      "div",
                      {
                        "aria-hidden": !qe,
                        className: "pointer-events-none absolute bottom-1 left-1 flex flex-col items-start gap-5 transition-[opacity,transform] motion-reduce:transition-none",
                        style: {
                          opacity: qe ? 1 : 0,
                          transform: qe ? "translateY(0)" : "translateY(10px)",
                          transitionDuration: qe ? "600ms" : "300ms",
                          transitionDelay: qe ? Math.round(ne * 0.65) + "ms" : "0ms",
                          transitionTimingFunction: un
                        },
                        children: [
                          /* @__PURE__ */ _.jsx(mo, { ...Fn[2], accent: Nt.accent, size: wr, align: "start" }),
                          /* @__PURE__ */ _.jsx(mo, { ...Fn[3], accent: Nt.accent, size: wr, align: "start" })
                        ]
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ _.jsxs(
              "div",
              {
                ref: X,
                role: "tooltip",
                "aria-hidden": Be < 0,
                className: "pointer-events-none absolute top-3 left-3 z-20 whitespace-nowrap rounded-md px-2.5 py-1.5 text-[12px] leading-none shadow-lg transition-opacity duration-150 sm:top-4 sm:left-4 motion-reduce:transition-none",
                style: {
                  opacity: Be >= 0 ? 1 : 0,
                  background: "var(--color-foreground, #171717)",
                  color: "var(--color-background, #ffffff)"
                },
                children: [
                  Be >= 0 && ke.cells[Be] ? /* @__PURE__ */ _.jsxs(_.Fragment, { children: [
                    /* @__PURE__ */ _.jsx("strong", { className: "font-semibold", children: ke.cells[Be].count ? ie.format(ke.cells[Be].count) + " " + on(ke.cells[Be].count) : "No " + re }),
                    /* @__PURE__ */ _.jsxs("span", { className: "opacity-75", children: [
                      " on ",
                      Se.format(rn(ke.cells[Be].date))
                    ] })
                  ] }) : " ",
                  /* @__PURE__ */ _.jsx(
                    "span",
                    {
                      "aria-hidden": "true",
                      className: "absolute top-full h-0 w-0",
                      style: {
                        left: "var(--arrow, 50%)",
                        marginLeft: -5,
                        borderLeft: "5px solid transparent",
                        borderRight: "5px solid transparent",
                        borderTop: "5px solid var(--color-foreground, #171717)"
                      }
                    }
                  )
                ]
              }
            )
          ] }),
          Ve && /* @__PURE__ */ _.jsx(
            "div",
            {
              "aria-hidden": !Dn,
              className: "grid transition-[grid-template-rows,opacity] motion-reduce:transition-none",
              style: {
                gridTemplateRows: Dn ? "1fr" : "0fr",
                opacity: Dn ? 1 : 0,
                transitionDuration: ne + "ms",
                transitionTimingFunction: un
              },
              children: /* @__PURE__ */ _.jsx("div", { className: "min-h-0 overflow-hidden", children: /* @__PURE__ */ _.jsx("div", { className: "grid grid-cols-2 gap-x-4 gap-y-4 px-3 pt-4 pb-1 sm:px-4 md:grid-cols-4", children: Fn.map((A) => /* @__PURE__ */ _.jsx(mo, { ...A, accent: Nt.accent, size: 28, align: "stack" }, A.label)) }) })
            }
          ),
          /* @__PURE__ */ _.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-3 pt-3 pb-3 text-[12px] sm:px-4", style: { color: Yr }, children: [
            we === void 0 ? /* @__PURE__ */ _.jsx("span", { className: "relative grid flex-1", children: Ll.map((A) => /* @__PURE__ */ _.jsx(
              "span",
              {
                "aria-hidden": A !== Tl,
                className: "[grid-area:1/1] transition-opacity duration-500 motion-reduce:transition-none",
                style: { opacity: A === Tl ? 1 : 0 },
                children: A
              },
              A
            )) }) : /* @__PURE__ */ _.jsx("span", { className: "flex-1", children: we }),
            Ze && /* @__PURE__ */ _.jsxs("div", { className: "flex items-center gap-1.5", onMouseLeave: () => E(-1), children: [
              /* @__PURE__ */ _.jsx("span", { className: "mr-0.5", children: "Less" }),
              Nt.swatches.map((A, ae) => /* @__PURE__ */ _.jsx(
                "button",
                {
                  type: "button",
                  "aria-label": "Highlight " + Xr[ae].toLowerCase() + " days",
                  "aria-pressed": xe === ae,
                  title: Xr[ae],
                  onMouseEnter: () => E(ae),
                  onFocus: () => E(ae),
                  onBlur: () => E(-1),
                  onClick: () => E((J) => J === ae ? -1 : ae),
                  className: "h-[11px] w-[11px] cursor-pointer rounded-[2px] border-0 p-0 transition-[background-color,transform] duration-500 hover:scale-125 focus-visible:outline-2 focus-visible:outline-offset-1 motion-reduce:transition-none",
                  style: {
                    background: A,
                    outlineColor: "var(--color-foreground, #171717)",
                    boxShadow: "inset 0 0 0 1px rgba(127,127,127,0.12)"
                  }
                },
                ae
              )),
              /* @__PURE__ */ _.jsx("span", { className: "ml-0.5", children: "More" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ _.jsx("p", { "aria-live": "polite", className: "sr-only", children: O })
      ]
    }
  );
}
function _d() {
  return /* @__PURE__ */ _.jsx("div", { className: "w-full", children: /* @__PURE__ */ _.jsx("div", { className: "mx-auto w-full max-w-[980px]", children: /* @__PURE__ */ _.jsx(Cd, { unit: "document", title: "Documents edited in the last year (sample data)", palette: "ocean" }) }) });
}
const Mc = document.getElementById("skyline-root");
Mc && ad.createRoot(Mc).render(/* @__PURE__ */ _.jsx(_d, {}));
