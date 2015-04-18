/** 
 * Main app
 */

"use strict";

var _           = require('underscore'),
    async       = require('async'),
    sqlite      = require('sqlite3'),
    fs          = require('fs'),
    localInfo   = require('./util/localinfo');

var defLocalPath = localInfo.getHomePath() + '/.xiranacli';

var defOptions = {
    configDir: defLocalPath, 
};

/**
 * XiramaClient class
 * @class XiramaCliente
 * @param {object} options -    Options
 */
var XiramaClient = function (options) {
    
    this._options = _.extend(
            {},
            defOptions,
            options);

    this._db = null;

};

/**
 * Get database connector
 * @private
 * @return {sqlite3.Database}
 */
XiramaClient.prototype._getDB = function () {

    var dbpath = this._options.configDir + '/local.dat';

    if (!this._db) {
        this._db = new sqlite.Database(dbpath);
    }

    return this._db;

};

/**
 * Initialize the database with the schemas
 * @param {callback} done   - Callback
 */
XiramaClient.prototype._initializateDB = function (done) {

    var db = this._getDB();

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

/**
 * Check if data-dir exists and does not have problems
 */
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

/**
 * Create data-dir with their contents
 * @param {string} [path] - Path of the new data dir.
 * @param {callback} cb - Callback
 */
XiramaClient.prototype._createDataDir = function (path, cb) {
    
    if (typeof path === 'function') {
        cb = path;
        path = undefined;
    }

    path = path || this._options.configDir;
    fs.mkdirSync(path);

    this._initializateDB(function (err) {
        if (err) {
            return cb(err);
        }

        // @TODO create config files
        return cb();

    });

};

module.exports = XiramaClient;
