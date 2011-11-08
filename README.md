### initialize

#### method type

    var tumblr = new TumblrAPIv2();
    tumblr.setApiKey('fme5U6F8DVblNs7HFYtR0ahOs8o1UjxKjqJUuAlBXJSJUu89oN');
    tumblr.setBaseHostname('tetsuwo.tumblr.com');

#### the below same means

    var tumblr = new TumblrAPIv2({ 
        apiKey: 'fme5U6F8DVblNs7HFYtR0ahOs8o1UjxKjqJUuAlBXJSJUu89oN', 
        baseHostname: 'tetsuwo.tumblr.com' 
    });


### get the blog info

    tumblr.api('/blog/info', null, function(res) {
        alert('callback [/blog/info]');
        console.log(res);
    });


### get the blog posts

    tumblr.api('/blog/posts', { limit: 100 }, function(res) {
        alert('callback [/blog/posts]');
        console.log(res);
    });

