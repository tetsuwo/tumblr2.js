/*!
 * Tumblr API v2 - Wrapper Prototype Class
 * http://tetsuwo.tumblr.com
 *
 * Copyright 2011, Tetsuwo OISHI
 * Dual license under the MIT license
 *
 * Date: 2011-11-07
 */
function TumblrAPIv2() {
    this.initialize.apply(this, arguments);
}
TumblrAPIv2.prototype = {
    initialize: function(param) {
        this.api_url = 'http://api.tumblr.com/v2';
        this.times = 0;
        this.requests = [];
        this.data = [];
        this.debug = false;
        this.win = document.defaultView || document.parentWindow;
        this.name = 'TumblrAPIv2';
        this.config = {
            api_key: null,
            base_hostname: null
        };
        if (param) {
            if (param.debug) {
                this.debug = param.debug;
            }
            if (param.apiKey) {
                this.config.api_key = param.apiKey;
            }
            if (param.baseHostname) {
                this.config.base_hostname = param.baseHostname;
            }
        }
        this.output(param);
    },
    setApiKey: function(val) {
        this.config.api_key = val;
        return this;
    },
    setBaseHostname: function(val) {
        this.config.base_hostname = val;
        return this;
    },
    output: function(val) {
        if (this.debug) {
            console.log(val);
        }
    },
    serialize: function(param, prefix) {
        var query = [];
        for(var p in param) {
            var k = prefix ? prefix + '[' + p + ']' : p, v = param[p];
            query.push(typeof v == 'object' ?
                this.serialize(v, k) :
                encodeURIComponent(k) + '=' + encodeURIComponent(v));
        }
        return query.join('&');
    },
    api: function(method, param, callback) {
        var callbackName = this.name + '_' + this.times;
        this.win[callbackName] = callback;

        param = param || {};
        param.api_key = this.config.api_key;
        param.jsonp = callbackName;
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
            e.src = that.api_url;
            if (method.indexOf('/blog') === 0) {
                e.src += method.replace('/blog', '/blog/' + that.config.base_hostname);
            } else {
                e.src += method;
            }
            e.src += '?' + that.serialize(param);
            that.output(e.src);
            var s = d.getElementsByTagName(t)[0];
            s.parentNode.insertBefore(e, s);
        })(this, document, 'script');

        return this;
    }
};
