import { Component, OnInit, ViewEncapsulation, OnDestroy, Injector, ViewChild } from '@angular/core';
import { SessionDataService } from 'src/app/conf/session-data.service';
import { Subscription } from 'rxjs';
import { GameInfoI, GameState } from '../../models/game-info';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResultsDialogComponent } from '../results-dialog/results-dialog.component';
import { Router } from '@angular/router';
import { ChooseWordComponent } from '../choose-word/choose-word.component';
import { PlayCardComponent } from '../play-card/play-card.component';
import { TableDeckComponent } from '../table-deck/table-deck.component';

@Component({
  selector: 'game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GameTableComponent implements OnInit, OnDestroy {

  @ViewChild(ChooseWordComponent, { static: false }) chooseWordComponent: ChooseWordComponent;
  @ViewChild(PlayCardComponent, { static: false }) playCardComponent: PlayCardComponent;
  @ViewChild(TableDeckComponent, { static: false }) tableDeckComponent: TableDeckComponent;

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
        if (!gameInfo) {
          this._modalService.dismissAll();
          this._router.navigateByUrl('/gameEnd');
        } else if ((this._gameInfo.state === GameState.Guessing || this._gameInfo.state === GameState.PlayingCards) && gameInfo.state === GameState.Results) {
          this._modalService.open(ResultsDialogComponent, {
            injector: this._injector,
            backdrop: 'static',
            keyboard: false,
            windowClass: 'results-modal-dialog'
          }).result.then((gameInfo: GameInfoI) => {
            if (gameInfo.state === GameState.ChoosingWord) {
              this.chooseWordComponent.startTimer();
            } else if (gameInfo.state === GameState.PlayingCards) {
              this.playCardComponent.startTimer();
            }
          }).catch(() => { });
        } else if ((this._gameInfo.state === GameState.Waiting || this._gameInfo.state === GameState.Results) && (gameInfo.state === GameState.ChoosingWord || gameInfo.state === GameState.PlayingCards)) {
          if (this._gameInfo.state === GameState.Results) {
            this._modalService.dismissAll();
          }
          if (gameInfo.state === GameState.ChoosingWord) {
            this.chooseWordComponent.startTimer();
          } else if (gameInfo.state === GameState.PlayingCards) {
            this.playCardComponent.startTimer();
          }
        } else if (gameInfo.state === GameState.End) {
          this._modalService.dismissAll();
          this._sessionDataService.stateManagement.disconnect();
          // this._modalService.open()
          this._router.navigateByUrl('/gameOptions');
        } else if (gameInfo.state === GameState.PlayingCards && (this._gameInfo.state === GameState.ChoosingWord || this._gameInfo.state === GameState.Results)) {
          this.playCardComponent.startTimer();
        } else if (gameInfo.state === GameState.ChoosingWord && this._sessionDataService.timer === undefined) {
          this.chooseWordComponent.startTimer();
        } else if (this._gameInfo.state === GameState.PlayingCards && gameInfo.state === GameState.Guessing) {
          this.tableDeckComponent.startTimer();
        }
        this._gameInfo = gameInfo;
      }
    );
  }

  ngOnDestroy() {
    this._gameInfoSubscription.unsubscribe();
  }

  public get playedCard(): number {
    if (!this._gameInfo.tableDeck)
      return undefined;
    let played = this._gameInfo.tableDeck.find(elem => elem.player === this.playerNumber);
    if (!played) {
      return undefined;
    }
    return played.card;
  }
}
