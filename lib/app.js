/** 
 * Main app
 */

"use strict";

var _           = require('underscore'),
    async       = require('async'),
    sqlite      = require('sqlite3'),
    fs          = require('fs'),
    localInfo   = require('./util/localinfo');

var defLocalPath = localInfo.getHomePath() + '/.xinara-cli';

var defOptions = {
    configDir: defLocalPath, 
};

/**
 * XinaraClient class
 *
 * This class create a connect with the basic members of Xinara,
 * the options are optinals if exists the the data directory with
 * the configuration file.
 *
 * @class
 * @param {Object} [options] -    Options
 * @param {String} [options.confiDir=~/.xinara-cli] - Directory with the db and configuration file 
 * @param {String} [options.someother] - LAsldasdasd ads
 */
var XinaraClient = function (options) {
    
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
XinaraClient.prototype._getDB = function () {

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
XinaraClient.prototype._initializateDB = function (done) {

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
XinaraClient.prototype._checkDataDir = function () {
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
XinaraClient.prototype._createDataDir = function (path, cb) {
    
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

module.exports = XinaraClient;
