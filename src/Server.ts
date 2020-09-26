import * as net from "net";
import Timer from "./Utils/Timer";

export interface IPlayer {
  id: string;
  conexion: net.Socket;
}

let timer = new Timer();

let server = net.createServer((socket) => {
  timer.executeAfter(5).then(() => {
    socket.write("connected", "utf-8");
    socket.pipe(socket);
    console.log(`${socket.remoteAddress} has connected!`);
  });
});

const PORT = 8080;

server.listen(PORT, () => {
  console.log("RUNNING ON " + PORT);
});
