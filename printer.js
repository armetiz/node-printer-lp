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
    defaultOptions.verbose = false;
    
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
    
    return args;
};

var stdioFactory = function (options) {
    var stdio = [];
    
    if (true === options.verbose) {
        stdio.push(null);
        stdio.push(process.stdout);
        stdio.push(process.stderr);
    }
    else {
        stdio.push(null);
        stdio.push(null);
        stdio.push(null);
    }
    
    return stdio;
};

module.exports.printText = function (text, options) {
    options = optionsFactory(options);
    
    var stdio = stdioFactory(options);
    var args = argsFactory(options);
    var lp = spawn("lp", args, {stdio: stdio});

    lp.stdin.write(text);
    lp.stdin.end();
}

module.exports.printFile = function (file, options) {
    options = optionsFactory(options);
    
    var stdio = stdioFactory(options);
    var args = argsFactory(options);
    
    args.push ("--");
    args.push (file);

    var lp = spawn("lp", args, {stdio: stdio});
}