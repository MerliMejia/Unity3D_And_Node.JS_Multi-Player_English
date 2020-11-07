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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoVsTwo = exports.OneVsOne = void 0;
var uuid_1 = __importDefault(require("uuid"));
/**
 * This method returns true if the players type is for OneVsOne rooms
 * @param players type: { player1: IPlayer; player2: IPlayer } | Map<String, IPlayer>
 */
function isOneVsOne(players) {
    return (players.player1 !== undefined);
}
/**
 * This is kind of the abstract class from which all the rooms are going to inherit from.
 */
var Room = /** @class */ (function () {
    function Room(type) {
        this.player1 = null;
        this.player2 = null;
        this.players = null;
        this.config = {
            id: uuid_1.default(),
            mode: '1VS1',
        };
        if (isOneVsOne(type)) {
            this.config.mode = '1VS1';
            this.player1 = type.player1;
            this.player2 = type.player2;
            console.log('HAB 1VS1 CREATED');
        }
        else {
            this.config.mode = '2VS2';
            this.players = type;
            console.log('HAB 2VS2 CREATED');
        }
    }
    return Room;
}());
/**
 * This will be the class for working with one vs one rooms
 */
var OneVsOne = /** @class */ (function (_super) {
    __extends(OneVsOne, _super);
    function OneVsOne(player1, player2) {
        return _super.call(this, { player1: player1, player2: player2 }) || this;
    }
    return OneVsOne;
}(Room));
exports.OneVsOne = OneVsOne;
var TwoVsTwo = /** @class */ (function (_super) {
    __extends(TwoVsTwo, _super);
    function TwoVsTwo(players) {
        return _super.call(this, players) || this;
    }
    return TwoVsTwo;
}(Room));
exports.TwoVsTwo = TwoVsTwo;
//# sourceMappingURL=Room.js.map