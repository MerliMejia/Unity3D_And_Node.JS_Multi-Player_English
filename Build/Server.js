"use strict";
/**
 * @author Merli Mejia - Email: merlimejia2@gmail.com
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var net = __importStar(require("net"));
var Timer_1 = __importDefault(require("./Utils/Timer"));
var uuid_1 = __importDefault(require("uuid"));
var Room_1 = require("./MM/Room");
var timer = new Timer_1.default();
//List of all the players who are searching a match
var searchMatch = new Map();
//Object with all commands(I'll change it for a enum later)
var commands = {
    SEARCH_MATCH: 'SEARCH_MATCH'
};
//List of all One Vs One rooms
var oneVsOneRooms = new Map();
var twoVsTwoRooms = new Map();
/**
 * @description Create the TCP server
 * @param socket client refference
 */
var server = net.createServer(function (socket) {
    var id = uuid_1.default();
    var connected = false;
    //Send a "connected" message after one second to the client
    timer.executeAfter(1).then(function () {
        console.log(socket.remoteAddress + " has connected");
        connected = true;
        socket.write(Buffer.from('connected', 'utf-8'));
        timer.executeAfter(1).then(function () {
            socket.write(Buffer.from("id: " + id, 'utf-8')); //Sent an auto generated id to the client
        });
    });
    /**
     * Receive data from the client
     */
    socket.on('data', function (data) {
        if (data.toString() == commands.SEARCH_MATCH) {
            console.log(id + " is searching for a match");
            searchMatch.set(id, { id: id, conexion: socket }); //Add the player to the waiting list.
        }
    });
    //The client has desconnected
    socket.on('close', function () {
        console.log('DESCONNECTED');
        searchMatch.delete(id);
    });
});
var PORT = 8080; //Port in which the server is listening.
//Make the server listen on the selected port
server.listen(PORT, function () {
    console.log('RUNNING ON PORT: ' + PORT);
    console.log('Waiting for players to search a match');
    var searchingTimer = new Timer_1.default(function () {
        //Get executed 60 times every second
        // if (searchMatch.size >= 2) {
        //   let players: Array<IPlayer> = [];
        //   searchMatch.forEach((j) => {
        //     players.push(j);
        //   });
        //   oneVsOneRooms.set(
        //     players[0].id + players[1].id,
        //     new OneVsOne(players[0], players[1])
        //   );
        //   console.log('Room created: ' + players[0].id + players[1].id);
        //   searchMatch.delete(players[0].id);
        //   searchMatch.delete(players[1].id);
        // }
        if (searchMatch.size >= 4) {
            var players_1 = new Map();
            searchMatch.forEach(function (j) {
                players_1.set(j.id, j);
            });
            var habId = uuid_1.default();
            twoVsTwoRooms.set(habId, new Room_1.TwoVsTwo(players_1));
            players_1.forEach(function (v, k) {
                searchMatch.delete(v.id);
            });
        }
    });
});
//# sourceMappingURL=Server.js.map