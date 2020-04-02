import { Component, OnInit, Input, IterableDiffers, DoCheck, OnDestroy } from '@angular/core';
import { SessionDataService } from 'src/app/conf/session-data.service';
import * as _ from 'underscore';
import { Subscription } from 'rxjs';
import { element } from 'protractor';
import { GameState } from '../../models/game-info';
import { ConfigService } from 'src/app/conf/config.service';


@Component({
  selector: 'table-deck',
  templateUrl: './table-deck.component.html',
  styleUrls: ['./table-deck.component.scss']
})
export class TableDeckComponent implements OnInit {
  private _deck: number[];
  private _guessedCard: number;

  @Input('playerNumber') playerNumber: number;

  public get tableDeck(): number[] {
    return this._deck;
  }

  public get deck(): number[] {
    return this._sessionDataService.stateManagement.gameInfo.decks.tableDeck.map(elem => elem.card);
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
    return this._sessionDataService.stateManagement.gameInfo.decks.tableDeck.map(elem => elem.guesses);
  }

  constructor(private _sessionDataService: SessionDataService, private _configService: ConfigService) {
    this._deck = [];
  }

  ngOnInit(): void {
  }
}
