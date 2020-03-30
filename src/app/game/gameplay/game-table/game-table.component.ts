import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { SessionDataService } from 'src/app/conf/session-data.service';
import { Subscription } from 'rxjs';
import { GameInfoI } from '../../models/game-info';

@Component({
  selector: 'game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GameTableComponent implements OnInit, OnDestroy {

  private _playerNumber: number;
  private _gameInfoSubscription: Subscription;
  private _gameInfo: GameInfoI;

  public get gameInfo(): GameInfoI {
    return this._gameInfo;
  }

  public get playerNumber(): number {
    return this._playerNumber;
  }

  constructor(private _sessionDataService: SessionDataService) {
    this._gameInfo = this._sessionDataService.stateManagement.gameInfo;
    this._playerNumber = this._gameInfo.players.indexOf(this._sessionDataService.username);
  }

  ngOnInit() {
    this._gameInfoSubscription = this._sessionDataService.stateManagement.gameInfoSubject.subscribe(
      gameInfo => this._gameInfo = gameInfo
    );
  }

  ngOnDestroy() {
    this._gameInfoSubscription.unsubscribe();
  }
}
