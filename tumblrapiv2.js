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
        this.output(param);
        this.api_url = 'http://api.tumblr.com/v2';
        this.times = 0;
        this.requests = [];
        this.data = [];
        this.debug = true;
        this.win = document.defaultView || document.parentWindow;
        this.name = 'tumblr_api_v2';
        this.config = {
            api_key: null,
            base_hostname: null
        };
        if (param && param.api_key) {
            this.config.api_key = param.api_key;
        }
        if (param && param.base_hostname) {
            this.config.base_hostname = param.base_hostname;
        }
    },
    setApiKey: function(val) {
        this.config.api_key = val;
    },
    setBaseHostname: function(val) {
        this.config.base_hostname = val;
    },
    output: function(val) {
        if (this.debug) {
            console.log(val);
        }
    },
    api: function(method, param, callback) {
        var callbackName = this.name + '_' + this.times;
        this.win[callbackName] = callback;
        param = param || [];
        param.push('api_key=' + this.config.api_key);
        param.push('jsonp=' + callbackName);
        this.requests[this.times] = {
            method: method,
            param: param,
            callback: callback,
            callbackName: callbackName
        };
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
            e.src += '?' + param.join('&');
            that.output(e.src);
            var s = d.getElementsByTagName(t)[0];
            s.parentNode.insertBefore(e, s);
        })(this, document, 'script');
    }
};
