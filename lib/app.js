/** 
 * Main app
 */

"use strict";

var _           = require('underscore'),
    async       = require('async'),
    sqlite      = require('sqlite3'),
    fs          = require('fs'),
    localInfo   = require('./util/localInfo');

var defLocalPath = localInfo.getHomePath() + '/.xiranacli';

var defOptions = {
    configDir: defLocalPath 
};

var XiramaClient = function (options) {
    
    this._options = _.extend(
            {},
            defOptions,
            options);

    var dbpath = this._options.configDir + '/local.dat';

    this._db = new sqlite.Database(dbpath);

};

XiramaClient.prototype._initializateDB = function (done) {

    var db = this._db;

    db.serialize(function () {
        
        async.series([
            function (tcb) {
                 db.run(
                    'CREATE TABLE servers ('+
                    '   url TEXT PRIMARY KEY NOT NULL,'+
                    '   kid TEXT,'+
                    '   type INTEGER'+
                    ');',
                    tcb
                );
            },
            function (tcb) {
                db.run(
                    'CREATE TABLE wallet ('+
                    '   kid TEXT PRIMARY KEY NOT NULL,'+
                    '   private INTEGER,'+
                    '   data BLOB'+
                    ');',
                    tcb
                );
            },
            function (tcb) {
                db.run(
                    'CREATE TABLE blocks ('+
                    '   sum TEXT PRIMARY KEY NOT NULL,' +
                    '   kid TEXT,' +
                    '   syncat INTEGER,' +
                    '   data BLOB,' +
                    '   server TEXT' +
                    ');',
                    tcb
                );
            }
        ], function (err) {
            done(err);
        });

    });   

};

XiramaClient.prototype._checkDataDir = function () {
    var path;

    path = this._options.configDir;

    if (!fs.fileExistsSync(path)) {
        throw new Error("Config dir does not exists, try running --create-config option");
    }

    var stats = fs.statSync(path);

    if (!stats.isDirectory()) {
        throw new Error("Config path is not a directory!");
    }

};

module.exports = XiramaClient;
