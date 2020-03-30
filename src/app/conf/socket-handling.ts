import { OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';


export class SocketHandling implements OnDestroy {

    constructor(private _socket: Socket, private _gameId: String) {
        this.connect();
    }

    ngOnDestroy() {
        this.disconnect();
    }

    public connect() {
        this._socket.ioSocket.io.opts.query = { gameId: this._gameId };
        this._socket.connect();
    }

    public getMessage() {
        return this._socket.fromEvent<any>('updateRequest');
    }

    public disconnect() {
        this._socket.removeAllListeners();
        this._socket.disconnect();
    }

}
