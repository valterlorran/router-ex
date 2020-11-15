import { Socket } from "socket.io";

export class SocketController {
    protected socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    public onConnection() {}
    public onDisconnect() {}
    
}