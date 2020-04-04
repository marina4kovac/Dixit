import { Component, OnInit, ViewEncapsulation, OnDestroy, Input } from '@angular/core';
import { SessionDataService } from 'src/app/conf/session-data.service';
import { GameInfoI, GameState } from '../../models/game-info';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/conf/config.service';
import { GameGeneratorService } from '../../utils/game-generator/game-generator.service';

@Component({
  selector: 'choose-word',
  templateUrl: './choose-word.component.html',
  styleUrls: ['./choose-word.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChooseWordComponent implements OnInit {
  submitted = false;
  processing = false;
  message: string;
  choosingWordForm: FormGroup;

  @Input('playerNumber') private _playerNumber: number;

  public get word(): string {
    return this._sessionDataService.stateManagement.gameInfo.word;
  }

  constructor(private _formBuilder: FormBuilder, private _sessionDataService: SessionDataService, private _configService: ConfigService) {
  }

  ngOnInit() {
    this.choosingWordForm = this._formBuilder.group({
      word: ['', [Validators.required, Validators.pattern('^[a-zA-Z\d]+$')]]
    });
  }

  public showWord(): boolean {
    return this._sessionDataService.stateManagement.gameInfo.state !== 1;
  }

  public isChoosing(): boolean {
    return this._sessionDataService.stateManagement.gameInfo.state === GameState.ChoosingWord && this._playerNumber === this._sessionDataService.stateManagement.gameInfo.playerChoosing;
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
        let gameInfo: GameInfoI = await this._configService.chooseWord(this._sessionDataService.stateManagement.gameInfo._id, this.choosingWordForm.get('word').value, this._sessionDataService.stateManagement.socket);
        if (!gameInfo) {
          throw 0;
        }
        this._sessionDataService.stateManagement.changeGameInfo(gameInfo);
        this.choosingWordForm.reset();
      } catch (error) {
        this.message = 'Something went wrong';
        setTimeout(() => this.message = undefined, 1000);
      } finally {
        this.submitted = false;
        this.processing = false;
      }
    }
  }
}
