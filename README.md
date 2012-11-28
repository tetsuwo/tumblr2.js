Tumblr2.js - JavaScript SDK for [Tumblr API v2](http://www.tumblr.com/docs/en/api/v2)
=====================================================================================

[![Build Status](https://secure.travis-ci.org/tetsuwo/tumblr2.js.png?branch=master)](https://travis-ci.org/tetsuwo/tumblr2.js)


How to use
----------

### Initialize

#### Method type

    var tumblr = new Tumblr2();
    tumblr.setApiKey('fme5U6F8DVblNs7HFYtR0ahOs8o1UjxKjqJUuAlBXJSJUu89oN');
    tumblr.setBaseHostname('tetsuwo.tumblr.com');


#### The below same means

    var tumblr = new Tumblr2({ 
        apiKey: 'fme5U6F8DVblNs7HFYtR0ahOs8o1UjxKjqJUuAlBXJSJUu89oN', 
        baseHostname: 'tetsuwo.tumblr.com' 
    });


#### Get the blog info

    tumblr.api('/blog/info', null, function(response) {
        alert('callback [/blog/info]');
        console.log(response);
    });


#### Get the blog posts

    tumblr.api('/blog/posts', { limit: 100 }, function(response) {
        alert('callback [/blog/posts]');
        console.log(response);
    });


