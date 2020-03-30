import { GameInfoI } from '../models/game-info';
import { OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { SocketHandling } from 'src/app/conf/socket-handling';
import { Socket } from 'ngx-socket-io';

export class StateManagement implements OnDestroy {

    private _socketService: SocketHandling;

    public get gameInfo(): GameInfoI {
        return this._gameInfo;
    }

    public changeGameInfo(value) {
        this._gameInfo = value;
        this.gameInfoSubject.next(value);
    }

    public gameInfoSubject: Subject<GameInfoI>;

    private _getMesssageSubscription: Subscription;

    constructor(private _socket: Socket, private _gameInfo: GameInfoI) {
        this.gameInfoSubject = new Subject();
        this._socketService = new SocketHandling(this._socket, this._gameInfo._id);
        this._getMesssageSubscription = this._socketService.getMessage()
            .subscribe(
                gameInfo => {
                    this._gameInfo = gameInfo;
                    this.gameInfoSubject.next(this._gameInfo);
                }
            );;
    }

    ngOnDestroy() {
        this._getMesssageSubscription.unsubscribe();
        this._socketService.disconnect();
    }
}
