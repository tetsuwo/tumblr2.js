/*!
 * Tumblr2 - JavaScript SDK for Tumblr API v2
 *
 * Copyright 2011-2012, Tetsuwo OISHI.
 * Dual license under the MIT license.
 * http://tetsuwo.tumblr.com
 *
 * Version: 0.1.5
 * Date: 2011-11-07
 */

function Tumblr2(param) {
    this.initialize.apply(this, arguments);
}

Tumblr2.prototype.initialize = function(param) {
    this.apiUrl = 'http://api.tumblr.com/v2';
    this.name = '_tumblr2';
    this.times = 0;
    this.requests = [];
    this.data = [];
    this.debug = false;
    this.win = document.defaultView || document.parentWindow;

    this.config = {
        apiKey: null,
        baseHostname: null
    };

    if (param) {
        if (param.debug) {
            this.debug = param.debug;
        }
        if (param.apiKey) {
            this.config.apiKey = param.apiKey;
        }
        if (param.baseHostname) {
            this.config.baseHostname = param.baseHostname;
        }
    }

    this.output(param);
};

Tumblr2.prototype.setApiKey = function(val) {
    this.config.apiKey = val;
    return this;
};

Tumblr2.prototype.setBaseHostname = function(val) {
    this.config.baseHostname = val;
    return this;
};

Tumblr2.prototype.output = function(val) {
    if (this.debug) {
        console.log(val);
    }
};

Tumblr2.prototype.serialize = function(param, prefix) {
    var query = [];

    for(var p in param) {
        var k = prefix ? prefix + '[' + p + ']' : p, v = param[p];
        query.push(
            typeof v == 'object' ?
                this.serialize(v, k) :
                encodeURIComponent(k) + '=' + encodeURIComponent(v)
        );
    }

    return query.join('&');
};

Tumblr2.prototype.api = function(method, param, callback) {
    var callbackName = this.name + '_cb_' + this.times;
    this.win[callbackName] = callback;

    param = param || {};
    param.api_key = this.config.apiKey;
    param.jsonp   = callbackName;

    this.requests[this.times] = {
        method: method,
        param: param,
        callback: callback,
        callbackName: callbackName
    };

    if (param.limit === 'all') {
        param.limit = null;
    }

    this.times++;

    (function(that, d, t) {
        var e = d.createElement(t);
        e.type = 'text/javascript';
        e.async = true;
        e.src = that.apiUrl;
        if (method.indexOf('/blog') === 0) {
            e.src += method.replace('/blog', '/blog/' + that.config.baseHostname);
        } else {
            e.src += method;
        }
        e.src += '?' + that.serialize(param);
        that.output(e.src);
        var s = d.getElementsByTagName(t)[0];
        s.parentNode.insertBefore(e, s);
    })(this, document, 'script');

    return this;
};
