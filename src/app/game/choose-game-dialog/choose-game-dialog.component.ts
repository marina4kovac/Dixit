import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/conf/config.service';
import { GameInfoI } from '../models/game-info';
import { SessionDataService } from 'src/app/conf/session-data.service';
import { EnterPrivateGameDialogComponent } from './enter-private-game-dialog/enter-private-game-dialog.component';

@Component({
  selector: 'app-choose-game-dialog',
  templateUrl: './choose-game-dialog.component.html',
  styleUrls: ['./choose-game-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChooseGameDialogComponent implements OnInit {

  processing: boolean = false;

  public activeGames: GameInfoI[];

  constructor(private _injector: Injector, private _activeModal: NgbActiveModal, private _configService: ConfigService, private _sessionDataService: SessionDataService, private _modalService: NgbModal,
  ) {
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
      if (game.password) {
        const modalRef: NgbModalRef = this._modalService.open(EnterPrivateGameDialogComponent, {
          injector: this._injector,

        });
        modalRef.componentInstance.game = game;
        let result = await modalRef.result;
        if (!result) {
          throw 0;
        }
      }
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
