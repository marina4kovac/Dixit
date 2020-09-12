import { Component, Injector, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { GameInfoI } from '../../models/game-info';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as CryptoJS from 'crypto-js';

@Component({
  templateUrl: './enter-private-game-dialog.component.html',
  styleUrls: ['./enter-private-game-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EnterPrivateGameDialogComponent implements OnInit {
  submitted = false;
  processing = false;
  message: string;
  entryForm: FormGroup;

  @Input() game: GameInfoI;

  constructor(private _formBuilder: FormBuilder,
    private _activeModal: NgbActiveModal
  ) {
  }

  public invalidPassword() {
    return (this.submitted && this.entryForm.controls.password.errors != null);
  }

  ngOnInit() {
    this.entryForm = this._formBuilder.group({
      password: ['']
    });
  }

  public enterGame() {
    this.submitted = true;
    this.processing = true;

    if (this.entryForm.invalid == true) {
      this.processing = false;
      return;
    }
    else {
      // if (!this.gameForm.get('is_private_game')) {
      //   result = await this._configService.saveGame(this.gameForm.get('game_name').value, this.gameForm.get('number_of_players').value, this._sessionDataService.username);
      // } else {
      //   result = await this._configService.saveGame(this.gameForm.get('game_name').value, this.gameForm.get('number_of_players').value, this._sessionDataService.username, this.gameForm.get('private_game_password').value);
      // }
      // if (!result || !result.success) {
      //   throw 0;
      // }
      const hashedPassword = CryptoJS.SHA256(this.entryForm.get('password').value).toString(CryptoJS.enc.Base64);
      if (this.game && hashedPassword === this.game.password) {

        this.submitted = false;
        this.processing = false;
        this._activeModal.close(true);
      } else {
        this.submitted = false;
        this.processing = false;
        this.message = 'Wrong password';
        setTimeout(() => this.message = undefined, 1000);
      }
    }
  }
}
