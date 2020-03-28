import { GameInfoI } from '../models/game-info';
import { Injectable, InjectionToken, Injector, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService, SOCKET_SERVICE } from '../../conf/socket-service.service';

export const STATE_MANAGEMENT = new InjectionToken<StateManagementService>('stateManagement');

@Injectable({
    providedIn: 'root'
})
export class StateManagementService {

    private _socketService: SocketService;

    private _gameInfo: GameInfoI;

    public set gameInfo(value) {
        if (value === this._gameInfo) {
            return;
        } else if (value === undefined) {
            this._getMesssageSubscription.unsubscribe();
            this._socketService.disconnect();
        } else if (this._gameInfo === undefined) {
            this._gameInfo = value;
            this._socketService.connect({ gameId: value._id });
            this._getMesssageSubscription = this._socketService.getMessage()
                .subscribe(
                    gameInfo => {
                        this.gameInfo = gameInfo;
                    }
                );
            return;
        }
        this._gameInfo = value;
    }

    public get gameInfo(): GameInfoI {
        return this._gameInfo;
    }
    private _getMesssageSubscription: Subscription;

    constructor(private _injector: Injector, @Inject(SOCKET_SERVICE) _socketService: SocketService) {
        this._socketService = _socketService;
        this._gameInfo = undefined;
        this._getMesssageSubscription = undefined;
    }

    public destroy() {
        this._gameInfo = undefined;
        this._getMesssageSubscription = undefined;
        this._socketService.disconnect();
    }
}
