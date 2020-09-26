"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Timer = /** @class */ (function () {
    function Timer() {
    }
    Timer.prototype.executeAfter = function (time) {
        return new Promise(function (res, rej) {
            var interval = setInterval(function () {
                res();
                clearInterval(interval);
            }, 1000 * time);
        });
    };
    return Timer;
}());
exports.default = Timer;
//# sourceMappingURL=Timer.js.map