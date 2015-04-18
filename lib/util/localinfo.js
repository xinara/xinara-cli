
"use strict";

exports.getPlatform = function () {

    if (process.platform === 'win32') {
        return "win32";
    } else {
        return "unix";
    }
};

exports.getHomePath = function () {

    var platForm = this.getPlatform();
    var envVar = platForm === 'win32' ? 'USERPROFILE' : 'HOME';

    return process.env[envVar];
};
