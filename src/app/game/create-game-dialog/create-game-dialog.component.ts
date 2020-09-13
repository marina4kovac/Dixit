import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionDataService } from '../../conf/session-data.service';
import { ConfigService } from '../../conf/config.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'create-game',
  templateUrl: './create-game-dialog.component.html',
  styleUrls: ['./create-game-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateGameDialogComponent implements OnInit, OnDestroy {
  submitted = false;
  processing = false;
  message: string;
  gameForm: FormGroup;

  private _isPrivateGameValueChangeSubscription: Subscription;

  constructor(private _formBuilder: FormBuilder,
    private _configService: ConfigService,
    private _sessionDataService: SessionDataService,
    private _activeModal: NgbActiveModal
  ) { }

  invalidGameName() {
    return (this.submitted && this.gameForm.controls.game_name.errors != null);
  }

  invalidNumberOfPlayers() {
    return (this.submitted && this.gameForm.controls.number_of_players.errors != null);
  }

  invalidPassword() {
    return (this.submitted && this.gameForm.controls.private_game_password.errors != null);
  }

  ngOnInit() {
    this.gameForm = this._formBuilder.group({
      game_name: ['', Validators.required],
      number_of_players: ['', [Validators.required, Validators.pattern('^[1-6]?$')]],
      is_private_game: [''],
      private_game_password: ['']
    });

    this._isPrivateGameValueChangeSubscription = this.gameForm.get('is_private_game').valueChanges
      .subscribe(value => {
        if (value) {
          this.gameForm.get('private_game_password').setValidators(Validators.required);
        } else {
          this.gameForm.get('private_game_password').clearValidators();
        }
        this.gameForm.controls.private_game_password.updateValueAndValidity();
      }
      );
  }

  ngOnDestroy(): void {
    this._isPrivateGameValueChangeSubscription.unsubscribe();
  }


  public async createGame() {
    this.submitted = true;
    this.processing = true;

    if (this.gameForm.invalid == true) {
      this.processing = false;
      return;
    }
    else {
      try {
        let result;
        if (!this.gameForm.get('is_private_game').value) {
          result = await this._configService.saveGame(this.gameForm.get('game_name').value, this.gameForm.get('number_of_players').value, this._sessionDataService.username);
        } else {
          result = await this._configService.saveGame(this.gameForm.get('game_name').value, this.gameForm.get('number_of_players').value, this._sessionDataService.username, this.gameForm.get('private_game_password').value);
        }
        if (!result || !result.success) {
          throw 0;
        }
        this._activeModal.close(result.gameInfoWaiting);
      } catch (error) {
        this.message = error.errorMsg ? error.errorMsg : 'Something went wrong';
        setTimeout(() => this.message = undefined, 1000);
      } finally {
        this.submitted = false;
        this.processing = false;
      }
    }
  }

}