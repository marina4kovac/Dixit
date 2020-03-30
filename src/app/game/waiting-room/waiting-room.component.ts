import { Component, ViewEncapsulation, OnDestroy } from '@angular/core';
import { SessionDataService } from 'src/app/conf/session-data.service';
import { Subscription } from 'rxjs';
import { GameInfoI, GameState } from '../models/game-info';
import { Router } from '@angular/router';

@Component({
  selector: 'waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WaitingRoomComponent implements OnDestroy {

  public get gameInfo() {
    return this._gameInfo;
  }

  private _gameInfo: GameInfoI;
  private _gameInfoSubscription: Subscription;

  constructor(private _router: Router, private _sessionDataService: SessionDataService) {
    this._gameInfo = this._sessionDataService.stateManagement.gameInfo;
    if (this._gameInfo.state !== GameState.Waiting) {
      this._router.navigateByUrl('/gameplay');
    }
    this._gameInfoSubscription = this._sessionDataService.stateManagement.gameInfoSubject.subscribe(gameInfo => {
      this._gameInfo = gameInfo;
      if (gameInfo.state !== GameState.Waiting) {
        this._router.navigateByUrl('/gameplay');
      }
    });
  }

  ngOnDestroy() {
    this._gameInfoSubscription.unsubscribe();
  }

}


