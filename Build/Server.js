"use strict";
/**
 * @author Merli Mejia - Email: merlimejia2@gmail.com
 * @description server TCP el cual utiliza sockets
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
//Lista de todos los players buscando partida
var searchMatch = new Map();
//Objeto con los diferentes commands
var commands = {
    SEARCH_MATCH: "SEARCH_MATCH",
};
//Lista de todas las habitaciones 1VS1
var oneVsOneRooms = new Map();
/**
 * @description Creamos un server TCP
 * @param socket Referencia al cliente connected a nuestro server
 */
var server = net.createServer(function (socket) {
    var id = uuid_1.default();
    var connected = false;
    //Mandamos mensaje de "connected" al cliente despues de 5 segundos
    timer.executeAfter(1).then(function () {
        console.log(socket.remoteAddress + " has connected");
        connected = true;
        socket.write(Buffer.from("connected", "utf-8"));
        timer.executeAfter(1).then(function () {
            socket.write(Buffer.from("id: " + id, "utf-8")); //Enviamos el id al cliente
        });
    });
    /**
     * Recibimos informacion del cliente
     */
    socket.on("data", function (data) {
        if (data.toString() == commands.SEARCH_MATCH) {
            console.log(id + " is searching for a match");
            searchMatch.set(id, { id: id, conexion: socket }); //Agregamos el jugador a la lista de espera
        }
    });
    //Ejecuta algo cuando el cliente se desconecta
    socket.on("close", function () {
        console.log("DESCONNECTED");
    });
});
var PUERTO = 8080; //Puerto en el cual correra el server
//Pone nuestro server a escuchar peticiones en un puerto especifico
server.listen(PUERTO, function () {
    console.log("RUNNING ON PORT: " + PUERTO);
    console.log("Waiting for players to search a match");
    var searchingTimer = new Timer_1.default(function () {
        //se ejecuta 60 veces cada segundo
        if (searchMatch.size >= 2) {
            var players_1 = [];
            searchMatch.forEach(function (j) {
                players_1.push(j);
            });
            oneVsOneRooms.set(players_1[0].id + players_1[1].id, new Room_1.OneVsOne(players_1[0], players_1[1]));
            console.log("Room created: " + players_1[0].id + players_1[1].id);
            searchMatch.delete(players_1[0].id);
            searchMatch.delete(players_1[1].id);
        }
    });
});
//# sourceMappingURL=Server.js.map