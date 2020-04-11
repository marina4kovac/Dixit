import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SessionDataService } from '../conf/session-data.service';

@Component({
  selector: 'left-game',
  templateUrl: './left-game.component.html',
  styleUrls: ['./left-game.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeftGameComponent implements OnInit {

  constructor(private _sessionDataSerivce: SessionDataService) {
    this._sessionDataSerivce.stateManagement.disconnect();
  }

  ngOnInit(): void {
  }

}
