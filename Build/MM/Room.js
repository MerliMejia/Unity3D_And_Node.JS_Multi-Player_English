"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneVsOne = void 0;
/**
 * Este metodo devuelve verdadero si el type de habitacion esta configurado para ser 1VS1
 * @param players type: { player1: IPlayer; player2: IPlayer } | Map<String, IPlayer>... Que type de
 * configuracion o cantidad de players es.
 */
function isOneVsOne(players) {
    return players == undefined;
}
/**
 * Esta clase es la clase padre de donde heredaran todas las diferentes habitaciones o modes de juegos
 */
var Habitacion = /** @class */ (function () {
    function Habitacion(type) {
        this.player1 = null;
        this.player2 = null;
        this.players = null;
        if (isOneVsOne(type)) {
            this.config = { mode: "1VS1" };
            this.player1 = type.player1;
            this.player2 = type.player2;
        }
        else {
            this.config = { mode: "2VS2" };
            this.players = type;
        }
    }
    return Habitacion;
}());
/**
 * Esta clase sera la encargada de comunicar los players en el metodo 1VS1
 */
var OneVsOne = /** @class */ (function (_super) {
    __extends(OneVsOne, _super);
    function OneVsOne(player1, player2) {
        return _super.call(this, { player1: player1, player2: player2 }) || this;
    }
    return OneVsOne;
}(Habitacion));
exports.OneVsOne = OneVsOne;
//# sourceMappingURL=Room.js.map