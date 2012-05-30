describe('Tumblr2', function() {

    var testdata = {
        debug: true,
        apiKey: 'fme5U6F8DVblNs7HFYtR0ahOs8o1UjxKjqJUuAlBXJSJUu89oN',
        baseHostname: 'tetsuwo.tumblr.com'
    };

    it('default', function() {
        var tumblr = new Tumblr2();
        expect(tumblr.debug).toBeFalsy();
        expect(tumblr.config.apiKey).toBeNull();
        expect(tumblr.config.baseHostname).toBeNull();
    });

    it('initialize', function() {
        var tumblr = new Tumblr2(testdata);
        expect(tumblr.debug).toBeTruthy();
        expect(tumblr.config.apiKey).toEqual(testdata.apiKey);
        expect(tumblr.config.baseHostname).toEqual(testdata.baseHostname);
    });

    it('setApiKey', function() {
        var tumblr = new Tumblr2();
        tumblr.setApiKey(testdata.apiKey);

        expect(tumblr.config.apiKey).toEqual(testdata.apiKey);
    });

    it('setBaseHostname', function() {
        var tumblr = new Tumblr2();
        tumblr.setBaseHostname(testdata.baseHostname);

        expect(tumblr.config.baseHostname).toEqual(testdata.baseHostname);
    });

});
