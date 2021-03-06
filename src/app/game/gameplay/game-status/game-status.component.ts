import { Component, OnInit, Input } from '@angular/core';
import { SessionDataService } from 'src/app/conf/session-data.service';
import { GameState } from '../../models/game-info';

@Component({
  selector: 'game-status',
  templateUrl: './game-status.component.html',
  styleUrls: ['./game-status.component.scss']
})
export class GameStatusComponent implements OnInit {

  public get results(): any[] {
    return this._sessionDataService.stateManagement.gameInfo.players.map((value, index) => {
      return {
        player: value.replace(/^[^:]*:/g, '').replace(/@[^@]*$/g, ''),
        points: this._sessionDataService.stateManagement.gameInfo.points[index]
      };
    });
  }

  public get deckSize(): number {
    return this._sessionDataService.stateManagement.gameInfo.freeDeckSize;
  }

  public myResults(player: string): boolean {
    return this._sessionDataService.username === player;
  }

  public get status(): string {
    switch (this._sessionDataService.stateManagement.gameInfo.state) {
      case GameState.ChoosingWord:
        const playerName = this._sessionDataService.stateManagement.gameInfo.players[this._sessionDataService.stateManagement.gameInfo.playerChoosing].replace(/^[^:]*:/g, '').replace(/@[^@]*$/g, '');
        return `Player ${playerName} is choosing the word : ${this._sessionDataService.timer}`;
      case GameState.PlayingCards:
        return `Playing cards is in progress (${this._sessionDataService.stateManagement.gameInfo.tableDeck.length}/${this._sessionDataService.stateManagement.gameInfo.numberOfPlayers} played) : ${this._sessionDataService.timer}`;
      case GameState.Guessing:
        return `Guessing cards is in progress : ${this._sessionDataService.timer}`;
      case GameState.Results:
        return `Displaying results`;
    }
    return ``;
  }

  constructor(private _sessionDataService: SessionDataService) { }

  ngOnInit(): void {
  }

}
