import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from 'src/app/conf/config.service';
import { GameInfoI } from '../models/game-info';

@Component({
  selector: 'app-choose-game-dialog',
  templateUrl: './choose-game-dialog.component.html',
  styleUrls: ['./choose-game-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChooseGameDialogComponent implements OnInit {


  public activeGames: GameInfoI[];

  constructor(private _activeModal: NgbActiveModal, private configService: ConfigService) {
  }

  ngOnInit() {
    this.fetchActiveGames();
  }

  public async fetchActiveGames(): Promise<void> {
    try {
      this.activeGames = await this.configService.getActiveGames();
    } catch (err) {
      this.fetchActiveGames();
    }
  }

  public async tryWaitingRoom(game: GameInfoI): Promise<void> {
    try {
      // let gameInfo: GameInfoI;
      // Object.assign(gameInfo, game);


      let result: any = await this.configService.joinGame(localStorage.getItem('token'), game);
      if (!result || !result.success) {
        throw 0;
      }
      this._activeModal.close(result.gameInfo);
    } catch (e) {
      this.fetchActiveGames();
    }
  }

  public onClose(): void {
    this._activeModal.close(undefined);
  }
}
