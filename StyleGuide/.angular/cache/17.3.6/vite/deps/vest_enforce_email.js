import {
  enforce
} from "./chunk-WXW2A56X.js";
import "./chunk-ASLTLD6L.js";

// node_modules/n4s/dist/es/email.development.js
var email_development_exports = {};
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$1 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$1 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$1(obj);
}
function assertString(input) {
  var isString = typeof input === "string" || input instanceof String;
  if (!isString) {
    var invalidType = _typeof$1(input);
    if (input === null)
      invalidType = "null";
    else if (invalidType === "object")
      invalidType = input.constructor.name;
    throw new TypeError("Expected a string but received a ".concat(invalidType));
  }
}
function merge() {
  var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var defaults = arguments.length > 1 ? arguments[1] : void 0;
  for (var key in defaults) {
    if (typeof obj[key] === "undefined") {
      obj[key] = defaults[key];
    }
  }
  return obj;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function isByteLength(str, options) {
  assertString(str);
  var min;
  var max;
  if (_typeof(options) === "object") {
    min = options.min || 0;
    max = options.max;
  } else {
    min = arguments[1];
    max = arguments[2];
  }
  var len = encodeURI(str).split(/%..|./).length - 1;
  return len >= min && (typeof max === "undefined" || len <= max);
}
var default_fqdn_options = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_numeric_tld: false,
  allow_wildcard: false,
  ignore_max_length: false
};
function isFQDN(str, options) {
  assertString(str);
  options = merge(options, default_fqdn_options);
  if (options.allow_trailing_dot && str[str.length - 1] === ".") {
    str = str.substring(0, str.length - 1);
  }
  if (options.allow_wildcard === true && str.indexOf("*.") === 0) {
    str = str.substring(2);
  }
  var parts = str.split(".");
  var tld = parts[parts.length - 1];
  if (options.require_tld) {
    if (parts.length < 2) {
      return false;
    }
    if (!options.allow_numeric_tld && !/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    }
    if (/\s/.test(tld)) {
      return false;
    }
  }
  if (!options.allow_numeric_tld && /^\d+$/.test(tld)) {
    return false;
  }
  return parts.every(function(part) {
    if (part.length > 63 && !options.ignore_max_length) {
      return false;
    }
    if (!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    }
    if (/[\uff01-\uff5e]/.test(part)) {
      return false;
    }
    if (/^-|-$/.test(part)) {
      return false;
    }
    if (!options.allow_underscores && /_/.test(part)) {
      return false;
    }
    return true;
  });
}
var IPv4SegmentFormat = "(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])";
var IPv4AddressFormat = "(".concat(IPv4SegmentFormat, "[.]){3}").concat(IPv4SegmentFormat);
var IPv4AddressRegExp = new RegExp("^".concat(IPv4AddressFormat, "$"));
var IPv6SegmentFormat = "(?:[0-9a-fA-F]{1,4})";
var IPv6AddressRegExp = new RegExp("^(" + "(?:".concat(IPv6SegmentFormat, ":){7}(?:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){6}(?:").concat(IPv4AddressFormat, "|:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){5}(?::").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,2}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){4}(?:(:").concat(IPv6SegmentFormat, "){0,1}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,3}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){3}(?:(:").concat(IPv6SegmentFormat, "){0,2}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,4}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){2}(?:(:").concat(IPv6SegmentFormat, "){0,3}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,5}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){1}(?:(:").concat(IPv6SegmentFormat, "){0,4}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,6}|:)|") + "(?::((?::".concat(IPv6SegmentFormat, "){0,5}:").concat(IPv4AddressFormat, "|(?::").concat(IPv6SegmentFormat, "){1,7}|:))") + ")(%[0-9a-zA-Z-.:]{1,})?$");
function isIP(str) {
  var version = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  assertString(str);
  version = String(version);
  if (!version) {
    return isIP(str, 4) || isIP(str, 6);
  }
  if (version === "4") {
    return IPv4AddressRegExp.test(str);
  }
  if (version === "6") {
    return IPv6AddressRegExp.test(str);
  }
  return false;
}
var default_email_options = {
  allow_display_name: false,
  require_display_name: false,
  allow_utf8_local_part: true,
  require_tld: true,
  blacklisted_chars: "",
  ignore_max_length: false,
  host_blacklist: [],
  host_whitelist: []
};
var splitNameAddress = /^([^\x00-\x1F\x7F-\x9F\cX]+)</i;
var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
var gmailUserPart = /^[a-z\d]+$/;
var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
var defaultMaxEmailLength = 254;
function validateDisplayName(display_name) {
  var display_name_without_quotes = display_name.replace(/^"(.+)"$/, "$1");
  if (!display_name_without_quotes.trim()) {
    return false;
  }
  var contains_illegal = /[\.";<>]/.test(display_name_without_quotes);
  if (contains_illegal) {
    if (display_name_without_quotes === display_name) {
      return false;
    }
    var all_start_with_back_slash = display_name_without_quotes.split('"').length === display_name_without_quotes.split('\\"').length;
    if (!all_start_with_back_slash) {
      return false;
    }
  }
  return true;
}
function isEmail(str, options) {
  assertString(str);
  options = merge(options, default_email_options);
  if (options.require_display_name || options.allow_display_name) {
    var display_email = str.match(splitNameAddress);
    if (display_email) {
      var display_name = display_email[1];
      str = str.replace(display_name, "").replace(/(^<|>$)/g, "");
      if (display_name.endsWith(" ")) {
        display_name = display_name.slice(0, -1);
      }
      if (!validateDisplayName(display_name)) {
        return false;
      }
    } else if (options.require_display_name) {
      return false;
    }
  }
  if (!options.ignore_max_length && str.length > defaultMaxEmailLength) {
    return false;
  }
  var parts = str.split("@");
  var domain = parts.pop();
  var lower_domain = domain.toLowerCase();
  if (options.host_blacklist.includes(lower_domain)) {
    return false;
  }
  if (options.host_whitelist.length > 0 && !options.host_whitelist.includes(lower_domain)) {
    return false;
  }
  var user = parts.join("@");
  if (options.domain_specific_validation && (lower_domain === "gmail.com" || lower_domain === "googlemail.com")) {
    user = user.toLowerCase();
    var username = user.split("+")[0];
    if (!isByteLength(username.replace(/\./g, ""), {
      min: 6,
      max: 30
    })) {
      return false;
    }
    var _user_parts = username.split(".");
    for (var i = 0; i < _user_parts.length; i++) {
      if (!gmailUserPart.test(_user_parts[i])) {
        return false;
      }
    }
  }
  if (options.ignore_max_length === false && (!isByteLength(user, {
    max: 64
  }) || !isByteLength(domain, {
    max: 254
  }))) {
    return false;
  }
  if (!isFQDN(domain, {
    require_tld: options.require_tld,
    ignore_max_length: options.ignore_max_length
  })) {
    if (!options.allow_ip_domain) {
      return false;
    }
    if (!isIP(domain)) {
      if (!domain.startsWith("[") || !domain.endsWith("]")) {
        return false;
      }
      var noBracketdomain = domain.slice(1, -1);
      if (noBracketdomain.length === 0 || !isIP(noBracketdomain)) {
        return false;
      }
    }
  }
  if (user[0] === '"') {
    user = user.slice(1, user.length - 1);
    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
  }
  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;
  var user_parts = user.split(".");
  for (var _i = 0; _i < user_parts.length; _i++) {
    if (!pattern.test(user_parts[_i])) {
      return false;
    }
  }
  if (options.blacklisted_chars) {
    if (user.search(new RegExp("[".concat(options.blacklisted_chars, "]+"), "g")) !== -1)
      return false;
  }
  return true;
}
enforce.extend({ isEmail });
export {
  email_development_exports as email
};
//# sourceMappingURL=vest_enforce_email.js.map
