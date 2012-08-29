var utils = require("util");
var events = require("events");

var Job = function (lp, identifier) {
    
    var self = new events.EventEmitter();
    var error;
    
    self.identifier = identifier;
    
    lp.stderr.on("data", function(data) {
        error = data.slice(0, data.length - 1);
    });
    
    lp.on("exit", function(code) {
        if (0 === code) {
            self.emit("end");
        }
        else {
            self.emit("error", error);
        }
    });
    
    return self;
}

module.exports = Job;