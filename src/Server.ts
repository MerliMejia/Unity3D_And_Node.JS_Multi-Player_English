/**
 * @author Merli Mejia - Email: merlimejia2@gmail.com
 */

import * as net from 'net';
import Timer from './Utils/Timer';
import uuid from 'uuid';
import { OneVsOne, TwoVsTwo } from './MM/Room';

let timer: Timer = new Timer();

//Players interface
export interface IPlayer {
  id: string;
  conexion: net.Socket;
}

//List of all the players who are searching a match
let searchMatch: Map<String, IPlayer> = new Map<String, IPlayer>();
//Object with all commands(I'll change it for a enum later)
let commands = {
  SEARCH_MATCH: 'SEARCH_MATCH',
};

//List of all One Vs One rooms
let oneVsOneRooms: Map<string, OneVsOne> = new Map<string, OneVsOne>();
let twoVsTwoRooms: Map<string, TwoVsTwo> = new Map<string, TwoVsTwo>();

/**
 * @description Create the TCP server
 * @param socket client refference
 */
let server = net.createServer((socket) => {
  let id = uuid();
  let connected = false;

  //Send a "connected" message after one second to the client
  timer.executeAfter(1).then(() => {
    console.log(`${socket.remoteAddress} has connected`);
    connected = true;
    socket.write(Buffer.from('connected', 'utf-8'));
    timer.executeAfter(1).then(() => {
      socket.write(Buffer.from(`id: ${id}`, 'utf-8')); //Sent an auto generated id to the client
    });
  });

  /**
   * Receive data from the client
   */
  socket.on('data', (data) => {
    if (data.toString() == commands.SEARCH_MATCH) {
      console.log(`${id} is searching for a match`);
      searchMatch.set(id, { id: id, conexion: socket }); //Add the player to the waiting list.
    }
  });

  //The client has desconnected
  socket.on('close', () => {
    console.log('DESCONNECTED');
  });
});

const PORT = 8080; //Port in which the server is listening.

//Make the server listen on the selected port
server.listen(PORT, () => {
  console.log('RUNNING ON PORT: ' + PORT);
  console.log('Waiting for players to search a match');

  let searchingTimer: Timer = new Timer(() => {
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
      let players: Map<String, IPlayer> = new Map<String, IPlayer>();
      searchMatch.forEach((j) => {
        players.set(j.id, j);
      });
      let habId = uuid();
      twoVsTwoRooms.set(habId, new TwoVsTwo(players));
      players.forEach((v, k) => {
        searchMatch.delete(v.id);
      });
    }
  });
});
