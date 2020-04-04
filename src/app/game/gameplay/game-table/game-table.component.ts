import { Component, OnInit, ViewEncapsulation, OnDestroy, Injector } from '@angular/core';
import { SessionDataService } from 'src/app/conf/session-data.service';
import { Subscription } from 'rxjs';
import { GameInfoI, GameState } from '../../models/game-info';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResultsDialogComponent } from '../results-dialog/results-dialog.component';
import { Router } from '@angular/router';

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

  constructor(private _sessionDataService: SessionDataService, private _injector: Injector, private _modalService: NgbModal, private _router: Router) {
    // this._sessionDataService.stateManagement.reconnect();
    this._gameInfo = this._sessionDataService.stateManagement.gameInfo;
    this._playerNumber = this._gameInfo.players.indexOf(this._sessionDataService.username);
  }

  ngOnInit() {
    this._gameInfoSubscription = this._sessionDataService.stateManagement.gameInfoSubject.subscribe(
      gameInfo => {
        if (this._gameInfo.state === GameState.Guessing && gameInfo.state === GameState.Results) {
          this._modalService.open(ResultsDialogComponent, {
            injector: this._injector,
            backdrop: 'static',
            keyboard: false,
            windowClass: 'results-modal-dialog'
          });
        } else if (this._gameInfo.state === GameState.Results && gameInfo.state === GameState.ChoosingWord) {
          this._modalService.dismissAll();
        } else if (gameInfo.state === GameState.End) {
          this._router.navigateByUrl('/');
        }
        this._gameInfo = gameInfo;
      }
    );
  }

  ngOnDestroy() {
    this._gameInfoSubscription.unsubscribe();
  }

  public get playedCard(): number {
    if (!this._gameInfo.decks.tableDeck)
      return undefined;
    let played = this._gameInfo.decks.tableDeck.find(elem => elem.player === this.playerNumber);
    if (!played) {
      return undefined;
    }
    return played.card;
  }
}
