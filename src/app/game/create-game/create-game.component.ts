import { Component, OnInit, ViewEncapsulation, Inject, Injector, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameGeneratorService } from '../utils/game-generator/game-generator.service';
import { GameInfoI } from '../models/game-info';
import { StateManagementService, STATE_MANAGEMENT } from '../utils/state-management.service';
import { SOCKET_SERVICE, SocketService } from 'src/app/conf/socket-service.service';


@Component({
  selector: 'create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [GameGeneratorService]
})
export class CreateGameComponent implements OnInit, OnDestroy {
  submitted = false;
  processing = false;
  message: string;
  gameForm: FormGroup;
  private _redirecting = false;

  constructor(private _formBuilder: FormBuilder,
    private _router: Router,
    private _gameGenerator: GameGeneratorService,
    @Inject(STATE_MANAGEMENT) private _stateManagementService: StateManagementService) {

  }
  ngOnDestroy(): void {
    if (!this._redirecting) {
      this._stateManagementService.destroy();
    }
  }

  invalidGameName() {
    return (this.submitted && this.gameForm.controls.game_name.errors != null);
  }

  invalidNumberOfPlayers() {
    return (this.submitted && this.gameForm.controls.number_of_players.errors != null);
  }

  ngOnInit() {
    this.gameForm = this._formBuilder.group({
      game_name: ['', Validators.required],
      number_of_players: ['', [Validators.required, Validators.pattern('^[4-6]?$')]]
    });
  }

  async onSubmit() {
    this.submitted = true;
    this.processing = true;

    if (this.gameForm.invalid == true) {
      this.processing = false;
      return;
    }
    else {
      try {
        let gameInfo: GameInfoI = await this._gameGenerator.createGame(this.gameForm.get('game_name').value, this.gameForm.get('number_of_players').value);
        this._stateManagementService.gameInfo = gameInfo;
        this._redirecting = true;
        this._router.navigateByUrl('waitingRoom');
      } catch (error) {
        this.message = error.error ? error.error : 'Something went wrong';
        setTimeout(() => this.message = undefined, 1000);
      } finally {
        this.submitted = false;
        this.processing = false;
      }
    }
  }

}