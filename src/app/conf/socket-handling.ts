import { OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';


export class SocketHandling implements OnDestroy {

    private _latestData: any;
    private _latestDataSubject = new Subject();

    constructor(private _socket: Socket, private _gameId: String, private _player) {
        this.connect();
    }

    ngOnDestroy() {
        this.disconnect();
    }

    public connect() {
        this._socket.ioSocket.io.opts.query = { gameId: this._gameId, player: this._player };
        this._socket.connect();
        this._socket.on('updateRequest', (result) => {
            if (result && result._id === this._gameId) {
                this._latestData = result;
                this._latestDataSubject.next(result);
            }
        });
    }

    public getMessages() {
        return this._latestDataSubject;
    }

    public disconnect() {
        this._socket.removeAllListeners();
        this._socket.disconnect();
    }

}
