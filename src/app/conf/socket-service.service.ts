import { GameInfoI } from '../game/models/game-info';
import { Injectable, InjectionToken } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

export const SOCKET_SERVICE = new InjectionToken<SocketService>('socketService');

@Injectable({
    providedIn: 'root'
})
export class SocketService {

    private _requests: Observable<GameInfoI>;
    constructor(private _socket: Socket) {

    }

    public connect(options: any) {
        this._socket.ioSocket.io.opts.query = { gameId: options.gameId };
        this._socket.connect();
        this._requests = this._socket.fromEvent<any>('updateRequest');
    }

    public getMessage() {
        return this._requests;
    }

    public disconnect() {
        this._socket.removeAllListeners();
        this._requests = of(undefined);
        this._socket.disconnect();
    }

}
