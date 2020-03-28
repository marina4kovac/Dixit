import { Component, OnInit, ViewEncapsulation, Input, OnDestroy, Injector, Inject } from '@angular/core';
import { StateManagementService, STATE_MANAGEMENT } from '../utils/state-management.service';

@Component({
  selector: 'waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WaitingRoomComponent implements OnInit, OnDestroy {

  private _stateManagementService: StateManagementService;

  constructor(injector: Injector) {
    this._stateManagementService = injector.get(STATE_MANAGEMENT);
  }

  ngOnDestroy(): void {
    this._stateManagementService.destroy();
  }

  ngOnInit(): void {
  }

}
