import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { GameState, GameInfoI } from '../../models/game-info';
import { SessionDataService } from 'src/app/conf/session-data.service';
import { ConfigService } from 'src/app/conf/config.service';

@Component({
  selector: 'play-card',
  templateUrl: './play-card.component.html',
  styleUrls: ['./play-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlayCardComponent implements OnInit {
  processing = false;

  private _playedCard: number;
  @Input('playerNumber') playerNumber: number;

  constructor(private _configService: ConfigService, private _sessionDataService: SessionDataService) {
  }

  ngOnInit(): void {
  }

  public get playerDeck() {
    return this._sessionDataService.stateManagement.gameInfo.decks.playersDecks[this.playerNumber];
  }

  public get canClick(): boolean {
    return !this.processing && this._sessionDataService.stateManagement.gameInfo.state === GameState.PlayingCards && !this._playedCard && this.playerDeck.length === 6;
  }

  public async cardChosen($event) {
    this.processing = true;

    this._playedCard = $event;
    try {
      let gameInfo = await this._configService.playCard(this._sessionDataService.stateManagement.gameInfo._id, this.playerNumber, this._playedCard, this._sessionDataService.stateManagement.socket);
      if (!gameInfo) {
        throw 0;
      }
      this._sessionDataService.stateManagement.changeGameInfo(gameInfo);

    } finally {
      this.processing = false;
    }
  }
} 
