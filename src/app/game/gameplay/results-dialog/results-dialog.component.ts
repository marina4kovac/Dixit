import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SessionDataService } from 'src/app/conf/session-data.service';
import { ConfigService } from 'src/app/conf/config.service';
import { GameInfoI, GameState } from '../../models/game-info';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'underscore';
import { Router } from '@angular/router';
import { StateManagement } from '../../utils/state-management';

@Component({
  selector: 'results-dialog',
  templateUrl: './results-dialog.component.html',
  styleUrls: ['./results-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResultsDialogComponent implements OnInit {

  private _clicked = false;

  public get results(): any[] {
    return this._sessionDataService.stateManagement.gameInfo.tableDeck.map(elem => {
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

  public get finalResults(): any[] {
    let results = this._sessionDataService.stateManagement.gameInfo.points.map((val, i) => { return { player: this._players[i], points: val } });
    return _.sortBy(results, value => -value.points);
  }

  constructor(private _sessionDataService: SessionDataService,
    private _configService: ConfigService,
    private _activeModal: NgbActiveModal,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (this.isEnd()) {
      this._router.navigateByUrl('/gameOptions');
    }
  }

  public isPlayerChoosing(player: string): boolean {
    return player === this._players[this._sessionDataService.stateManagement.gameInfo.playerChoosing];
  }

  public isMyResult(player: string): boolean {
    return player === this._sessionDataService.username;
  }

  public isEnd(): boolean {
    return this._sessionDataService.stateManagement.gameInfo.freeDeckSize === 0 && this._sessionDataService.stateManagement.gameInfo.state === GameState.Results;
  }

  public canClick(): boolean {
    return !this._clicked;
  }

  async onClose(): Promise<any> {
    this._clicked = true;
    try {
      const oldDeckSize = this._sessionDataService.stateManagement.gameInfo.freeDeckSize;
      let gameInfo: GameInfoI = await this._configService.returnFromResults(this._sessionDataService.stateManagement.gameInfo._id, this._sessionDataService.username, this._sessionDataService.stateManagement.socket);
      if (!gameInfo) {
        throw 0;
      }
      if (gameInfo.state !== GameState.Results || oldDeckSize === 0) {
        this._clicked = false;
        this._sessionDataService.timer = undefined;
        this._sessionDataService.stateManagement.changeGameInfo(gameInfo);
        if (gameInfo.state === GameState.ChoosingWord || gameInfo.freeDeckSize === 0) {
          this._activeModal.close(gameInfo);
        }
        if (oldDeckSize === 0) {
          this._sessionDataService.stateManagement.disconnect();
        }
      }
    } catch (e) {
      this._clicked = false;
      alert('An error occured!');
    }
  }

  async onRematch(): Promise<any> {
    this._clicked = true;
    try {
      const oldGameInfo: GameInfoI = this._sessionDataService.stateManagement.gameInfo;
      const oldPlayer = this._sessionDataService.username;
      let gameInfo: GameInfoI = await this._configService.rematch(this._sessionDataService.stateManagement.gameInfo._id, this._sessionDataService.username, this._sessionDataService.stateManagement.socket);
      if (!gameInfo) {
        throw 0;
      }

      this._sessionDataService.timer = undefined;
      this._sessionDataService.stateManagement.changeGameInfo(gameInfo);
      this._sessionDataService.stateManagement.disconnect();
      this._sessionDataService.stateManagement.changeGameInfo(gameInfo);

      const result: any = await this._configService.joinRematchGame(oldGameInfo.gameName, oldGameInfo.creator, oldPlayer, oldGameInfo.numberOfPlayers, this._sessionDataService.stateManagement.socket, oldGameInfo.password);
      if (result && result.success && (result.gameInfo || result.gameInfoWaiting)) {
        gameInfo = result.gameInfo || result.gameInfoWaiting;
        this._sessionDataService.stateManagement = new StateManagement(this._sessionDataService.stateManagement.socket, gameInfo, oldPlayer);
        this._router.navigateByUrl('/waitingRoom');
        this._activeModal.dismiss();
      } else {
        throw 0;
      }
    } catch (e) {
      this._clicked = false;
      alert('An error occured!');
    }
  }
}
