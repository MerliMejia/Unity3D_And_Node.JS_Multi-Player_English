/**
 * @author Merli Mejia - Email: merlimejia2@gmail.com
 * @description server TCP el cual utiliza sockets
 */

import * as net from "net";
import Timer from "./Utils/Timer";
import uuid from "uuid";
import {OneVsOne} from "./MM/Room"

let timer: Timer = new Timer();

//Interfaz de players
export interface IPlayer {
  id: string;
  conexion: net.Socket;
}

//Lista de todos los players buscando partida
let searchMatch: Map<String, IPlayer> = new Map<String, IPlayer>();
//Objeto con los diferentes commands
let commands = {
  SEARCH_MATCH: "SEARCH_MATCH",
};

//Lista de todas las habitaciones 1VS1
let oneVsOneRooms: Map<string, OneVsOne> = new Map<string, OneVsOne>();

/**
 * @description Creamos un server TCP
 * @param socket Referencia al cliente connected a nuestro server
 */
let server = net.createServer((socket) => {
  let id = uuid()
  let connected = false;

  //Mandamos mensaje de "connected" al cliente despues de 5 segundos
  timer.executeAfter(1).then(() => {
    console.log(`${socket.remoteAddress} has connected`);
    connected = true;
    socket.write(Buffer.from("connected", "utf-8"));
    timer.executeAfter(1).then(() => {
      socket.write(Buffer.from(`id: ${id}`, "utf-8")); //Enviamos el id al cliente
    });
  });

  /**
   * Recibimos informacion del cliente
   */
  socket.on("data", (data) => {
    if (data.toString() == commands.SEARCH_MATCH) {
      console.log(`${id} is searching for a match`);
      searchMatch.set(id, { id: id, conexion: socket }); //Agregamos el jugador a la lista de espera
    }
  });

  //Ejecuta algo cuando el cliente se desconecta
  socket.on("close", () => {
    console.log("DESCONNECTED");
  });
});

const PUERTO = 8080; //Puerto en el cual correra el server

//Pone nuestro server a escuchar peticiones en un puerto especifico
server.listen(PUERTO, () => {
  console.log("RUNNING ON PORT: " + PUERTO);
  console.log("Waiting for players to search a match");

  let searchingTimer: Timer = new Timer(() => {
    //se ejecuta 60 veces cada segundo
    if (searchMatch.size >= 2) {
      let players: Array<IPlayer> = [];
      searchMatch.forEach((j) => {
        players.push(j);
      });
      oneVsOneRooms.set(
        players[0].id + players[1].id,
        new OneVsOne(players[0], players[1])
      );
      console.log("Room created: " + players[0].id + players[1].id);
      searchMatch.delete(players[0].id);
      searchMatch.delete(players[1].id);
    }
  });
});
