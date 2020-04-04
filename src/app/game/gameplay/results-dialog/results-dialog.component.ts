import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SessionDataService } from 'src/app/conf/session-data.service';
import { ConfigService } from 'src/app/conf/config.service';
import { GameInfoI, GameState } from '../../models/game-info';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'results-dialog',
  templateUrl: './results-dialog.component.html',
  styleUrls: ['./results-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResultsDialogComponent implements OnInit {

  private _clicked = false;

  public get results(): any[] {
    return this._sessionDataService.stateManagement.gameInfo.decks.tableDeck.map(elem => {
      return {
        card: elem.card,
        player: this._players[elem.player],
        guesses: elem.guesses,
        points: this.points[elem.player]
      }
    });
  }

  public get points(): number[] {
    return this._sessionDataService.stateManagement.gameInfo.points.map((val, i) => val - (this._prevPoints ? this._prevPoints[i] : 0));
  }

  private get _players(): string[] {
    return this._sessionDataService.stateManagement.gameInfo.players;
  }

  private get _prevPoints(): number[] {
    return this._sessionDataService.stateManagement.gameInfo.prevPoints;
  }


  constructor(private _sessionDataService: SessionDataService, private _configService: ConfigService, private _activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  public isPlayerChoosing(player: string): boolean {
    return player === this._players[this._sessionDataService.stateManagement.gameInfo.playerChoosing];
  }

  public canClick(): boolean {
    return !this._clicked;
  }

  async onClose(): Promise<any> {
    this._clicked = true;
    try {
      let gameInfo: GameInfoI = await this._configService.returnFromResults(this._sessionDataService.stateManagement.gameInfo._id, this._sessionDataService.stateManagement.socket);
      if (!gameInfo) {
        throw 0;
      }
      if (gameInfo.state !== GameState.Results) {
        this._clicked = false;
        this._sessionDataService.stateManagement.changeGameInfo(gameInfo);
        if (gameInfo.state === GameState.ChoosingWord) {
          this._activeModal.close();
        }
      }
    } catch (e) {
      this._clicked = false;
      alert('An error occured!');
    }
  }
}
