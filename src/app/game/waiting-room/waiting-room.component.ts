import { Component, OnInit, ViewEncapsulation, Input, OnDestroy, Injector, Inject } from '@angular/core';
import { StateManagementService, STATE_MANAGEMENT } from '../utils/state-management.service';
import { Observable } from 'rxjs';
import { GameState } from '../models/game-info';

@Component({
  selector: 'waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WaitingRoomComponent implements OnInit, OnDestroy {

  public _stateManagementService: StateManagementService;

  constructor(injector: Injector) {
    this._stateManagementService = injector.get(STATE_MANAGEMENT);
  }

  ngOnDestroy(): void {
    this._stateManagementService.destroy();
  }

  ngOnInit(): void {
    // this._stateManagementService.gameInfoChanged.subscribe((value) => {
    //   if (value.state === GameState.ChoosingWord) {
    //     console.log('choosing word');
    //   }
  }

}


