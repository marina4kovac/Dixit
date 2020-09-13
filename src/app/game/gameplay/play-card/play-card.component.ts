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


  @Input() startTimer = (): void => {
    this._sessionDataService.timer = 60;
    setTimeout(async () => {
      await this.decTimer();
    }, 1000);
  };

  private async decTimer() {
    if (this._sessionDataService.timer > 0 && this._sessionDataService.stateManagement.gameInfo.state === GameState.PlayingCards) {
      this._sessionDataService.timer--;
      if (!this._playedCard && this.playerDeck.length === 6 && this._sessionDataService.timer === 0) {
        this.processing = true;
        const card = this._sessionDataService.stateManagement.gameInfo.playerDeck.splice(Math.random() * 6, 1)[0];
        await this.cardChosen(card);
      } else {
        setTimeout(async () => {
          await this.decTimer();
        }, 1000);
      }
    }
  }

  constructor(private _configService: ConfigService, private _sessionDataService: SessionDataService) {
  }

  ngOnInit(): void {
  }

  public get playerDeck() {
    return this._sessionDataService.stateManagement.gameInfo.playerDeck;
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
      this._playedCard = undefined;
    }
  }
} 
