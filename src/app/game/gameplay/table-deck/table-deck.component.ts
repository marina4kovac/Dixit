import { Component, OnInit, Input, IterableDiffers, DoCheck, OnDestroy, ViewEncapsulation } from '@angular/core';
import { SessionDataService } from 'src/app/conf/session-data.service';
import * as _ from 'underscore';
import { GameState } from '../../models/game-info';
import { ConfigService } from 'src/app/conf/config.service';


@Component({
  selector: 'table-deck',
  templateUrl: './table-deck.component.html',
  styleUrls: ['./table-deck.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableDeckComponent implements OnInit {
  private _guessedCard: number;
  private _playedCard: number;

  @Input('playerNumber') playerNumber: number;
  @Input('playedCard') set playedCard(card: number) {
    if (card !== this._playedCard) {
      this._playedCard = card;
      if (card === undefined) {
        this._guessedCard = undefined;
      }
    }
  }
  get playedCard(): number {
    return this._playedCard;
  }

  public get deck(): number[] {
    return this._sessionDataService.stateManagement.gameInfo.tableDeck.map(elem => elem.card).filter(elem => elem != this.playedCard);
  }

  public faceUp(): boolean {
    return this._sessionDataService.stateManagement.gameInfo.state === GameState.Guessing || this._sessionDataService.stateManagement.gameInfo.state === GameState.Results;
  }

  public canClick(): boolean {
    return this._sessionDataService.stateManagement.gameInfo.playerChoosing !== this.playerNumber && this._sessionDataService.stateManagement.gameInfo.state === GameState.Guessing && !this._guessedCard;
  }

  public async guessCard($event) {
    this._guessedCard = $event;
    try {
      let gameInfo = await this._configService.guessCard(this._sessionDataService.stateManagement.gameInfo._id, this._sessionDataService.username, this._guessedCard, this._sessionDataService.stateManagement.socket);
      if (!gameInfo) {
        throw 0;
      }
      this._sessionDataService.stateManagement.changeGameInfo(gameInfo);
    } catch (e) {
      this._guessedCard = undefined;
    }
  }

  public get displayResults(): boolean {
    return this._sessionDataService.stateManagement.gameInfo.state === GameState.Results;
  }

  public get results(): string[] {
    return this._sessionDataService.stateManagement.gameInfo.tableDeck.map(elem => elem.guesses);
  }

  constructor(private _sessionDataService: SessionDataService, private _configService: ConfigService) {
  }

  ngOnInit(): void {
  }
}
