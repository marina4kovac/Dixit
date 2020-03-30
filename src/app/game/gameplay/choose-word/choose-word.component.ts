import { Component, OnInit, ViewEncapsulation, OnDestroy, Input } from '@angular/core';
import { SessionDataService } from 'src/app/conf/session-data.service';
import { GameInfoI } from '../../models/game-info';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/conf/config.service';

@Component({
  selector: 'choose-word',
  templateUrl: './choose-word.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class ChooseWordComponent implements OnInit, OnDestroy {
  submitted = false;
  processing = false;
  message: string;
  choosingWordForm: FormGroup;

  @Input('playerNumber') private _playerNumber: number;

  private _gameInfo: GameInfoI;
  private _gameInfoSubscription: Subscription;

  constructor(private _formBuilder: FormBuilder, private _sessionDataService: SessionDataService, private _configService: ConfigService) {
    this._gameInfo = this._sessionDataService.stateManagement.gameInfo;
  }

  ngOnInit() {
    this._gameInfoSubscription = this._sessionDataService.stateManagement.gameInfoSubject.subscribe(gameInfo =>
      this._gameInfo = gameInfo);
    this.choosingWordForm = this._formBuilder.group({
      word: ['', [Validators.required, Validators.pattern('^[a-zA-Z\d]+$')]]
    });
  }

  public isChoosing(): boolean {
    return this._playerNumber === this._gameInfo.playerChoosing;
  }

  public invalidWord(): boolean {
    return (this.submitted && this.choosingWordForm.controls.word.errors != null);
  }

  public async chooseWord() {
    this.submitted = true;
    this.processing = true;

    if (this.choosingWordForm.invalid == true) {
      this.processing = false;
      return;
    }
    else {
      try {
        let gameInfo: GameInfoI = await this._configService.chooseWord(this._gameInfo._id, this.choosingWordForm.get('word').value);
        if (!gameInfo) {
          throw 0;
        }
        this._sessionDataService.stateManagement.changeGameInfo(gameInfo);
      } catch (error) {
        this.message = 'Something went wrong';
        setTimeout(() => this.message = undefined, 1000);
      } finally {
        this.submitted = false;
        this.processing = false;
      }
    }
  }


  ngOnDestroy() {
    this._gameInfoSubscription.unsubscribe();
  }
}
