
var assert = require('assert');
var fs = require('fs');
var App = require('../lib/app');

describe("Checking startup config and staf..", function () {

    it("Creating new config dir", function (done) {

        if (!fs.exists(__dirname + '/tmp')) {
            fs.mkdirSync(__dirname + '/tmp');
        }
    
        var dirPath = __dirname + '/tmp/' + (new Date()).getTime();

        var app = new App({
            configDir: dirPath
        });

        app._createDataDir(function (err) {
            if (err) throw err;
            assert.equal(err, undefined, 'Error creating datadir');
            done();
        });


    });

});
