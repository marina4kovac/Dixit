import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/conf/config.service';
import { GameInfoI } from '../models/game-info';
import { SessionDataService } from 'src/app/conf/session-data.service';

@Component({
  selector: 'app-choose-game-dialog',
  templateUrl: './choose-game-dialog.component.html',
  styleUrls: ['./choose-game-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChooseGameDialogComponent implements OnInit {

  processing: boolean = false;

  public activeGames: GameInfoI[];

  constructor(private _activeModal: NgbActiveModal, private _configService: ConfigService, private _sessionDataService: SessionDataService) {
  }

  ngOnInit() {
    this.fetchActiveGames();
  }

  public async fetchActiveGames(): Promise<void> {
    try {
      this.activeGames = await this._configService.getActiveGames();
    } catch (err) {
      this.fetchActiveGames();
    }
  }

  public async tryWaitingRoom(game: GameInfoI): Promise<void> {
    this.processing = true;
    try {
      let result: any = await this._configService.joinGame(this._sessionDataService.username, game);
      if (!result || !result.success) {
        throw 0;
      }
      this._activeModal.close(result.gameInfo);
    } catch (e) {
      this.fetchActiveGames();
    }
    this.processing = true;
  }

  public onClose(): void {
    this._activeModal.close(undefined);
  }
}
