var Job = require ("./job");
var spawn = require("child_process").spawn;
var _ = require ("underscore");

var optionsFactory = function (options) {
    var defaultOptions = {};
    
    defaultOptions.encryption = false;
    defaultOptions.username = null;
    defaultOptions.backwardsCompatibility = false;
    defaultOptions.destination = null;
    defaultOptions.hostname = null;
    defaultOptions.numCopies = 1;
    defaultOptions.priority = 1;
    defaultOptions.mediaSize = "a4";
    defaultOptions.fitPlot = false;
    
    return _.defaults(options, defaultOptions);
};

var argsFactory = function (options) {
    var args = [];

    if (true === options.encryption) {
        args.push ("-E");
    }
    
    if (_.isString(options.username)) {
        args.push("-U");
        args.push(options.username);
    }
    
    if (true === options.backwardsCompatibility) {
        args.push("-c");
    }
    
    if (_.isString(options.destination)) {
        args.push("-d");
        args.push(options.destination);
    }
    
    if (_.isString(options.hostname)) {
        args.push("-h");
        args.push(options.hostname);
    }
    
    if (!_.isEmpty(options.numCopies) && _.isNumber(options.numCopies) && options.numCopies > 1) {
        args.push("-n");
        args.push(options.numCopies);
    }
    
    if (!_.isEmpty(options.priority) && _.isNumber(options.priority) && options.priority > 1) {
        args.push("-q");
        args.push(options.priority);
    }
    
    if (_.isString(options.mediaSize)) {
        args.push("-o");
        args.push("mediaSize=" + options.mediaSize);
    }
    
    if (!_.isEmpty(options.fitPlot) && _.isBoolean(options.fitPlot) && options.fitPlot) {
        args.push("-o");
        args.push("fitPlot");
    }
    
    return args;
};

module.exports.printText = function (text, options, identifier) {
    options = optionsFactory(options);
    
    var args = argsFactory(options);
    var lp = spawn("lp", args);

    lp.stdin.write(text);
    lp.stdin.end();
    
    return new Job(lp, identifier);
}

module.exports.printFile = function (file, options, identifier) {
    options = optionsFactory(options);
    
    var args = argsFactory(options);
    
    args.push ("--");
    args.push (file);

    var lp = spawn("lp", args);
    
    return new Job(lp, identifier);
}