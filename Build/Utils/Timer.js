"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Timer = /** @class */ (function () {
    function Timer(execute, interval) {
        this.interval = 60;
        if (interval !== undefined)
            this.interval = interval;
        if (execute !== undefined)
            this.empezar(execute);
    }
    Timer.prototype.empezar = function (execute) {
        this.si = setInterval(function () {
            execute();
        }, 1000 / this.interval);
    };
    Timer.prototype.stop = function () {
        clearInterval(this.si);
    };
    Timer.prototype.executeAfter = function (time, callback) {
        return new Promise(function (res, rej) {
            var interval = setInterval(function () {
                callback !== undefined ? callback() : null;
                res();
                clearInterval(interval);
            }, 1000 * time);
        });
    };
    return Timer;
}());
exports.default = Timer;
//# sourceMappingURL=Timer.js.map