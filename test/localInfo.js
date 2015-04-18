
var assert = require('assert');
var localInfo = require('../lib/util/localinfo');

describe('Get Local Info vars', function () {

    it('Getting platform', function () {
        var home = localInfo.getPlatform();

        assert.notEqual(home, undefined, "home dir not obtain");

    });

    it('Getting home', function () {
        var home = localInfo.getHomePath();

        assert.notEqual(home, undefined, "home dir not obtain");

    });

});
