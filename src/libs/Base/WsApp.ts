import BaseApp from "./BaseApp";

import SocketIo, { Socket } from "socket.io";
import {SocketController} from "../../index";


export class WsApp extends BaseApp{
    public io: SocketIo.Server;

    protected controller: typeof SocketController|any;

    public handler() {
        this.io = new SocketIo.Server(this._app?.getHttpServer().server);

        this.io.on('connection', (socket: Socket)=>{
            let controller: SocketController | null = (new this.controller(socket)) as SocketController;

            controller.onConnection();

            socket.on('disconnecting', ()=>{
                controller?.onDisconnect();
            })

            socket.on('disconnect', ()=>{
                controller = null;
            });
        });
    }
}