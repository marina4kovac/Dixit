import { Component, OnInit, Input } from '@angular/core';
import { SessionDataService } from 'src/app/conf/session-data.service';

@Component({
  selector: 'game-status',
  templateUrl: './game-status.component.html',
  styleUrls: ['./game-status.component.scss']
})
export class GameStatusComponent implements OnInit {

  @Input('playerNumber') playerNumber: number;

  public get results(): any[] {
    return this._sessionDataService.stateManagement.gameInfo.players.map((value, index) => {
      return {
        player: value,
        points: this._sessionDataService.stateManagement.gameInfo.points[index]
      };
    });
  }

  public get deckSize(): number {
    return this._sessionDataService.stateManagement.gameInfo.decks.freeDeck.length;
  }

  public myResults(number: number): boolean {
    return this.playerNumber === number;
  }


  constructor(private _sessionDataService: SessionDataService) { }

  ngOnInit(): void {
  }

}
