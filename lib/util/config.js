
/**
 * Config
 * @module config
 */

"use strict";

var fs      = require('fs');

var Options = function (filename) {

    var cleanData;
    this._data = {};
    
    try {
        cleanData = fs.readFileSync(filename, {
            encoding: 'utf8',
            falg: 'r'
        });
    } catch (err) {
        throw new Error('Can not read config file: ' + err.message);
    }

    try {
        this._data = JSON.parse(cleanData);    
    } catch (err) {
        throw new Error('Can not parse config file: ' + err.message);
    }

};

Options.get = function (value, def) {
    if (typeof this._data[value] !== 'undefined') {
        return this._data[value];
    } else if (typeof def !== 'undefined') {
        return def;
    } else {
        throw new Error("Option" + value + "no set");
    }
};

module.exports = Options;
