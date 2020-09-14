import { Component, OnInit, ViewEncapsulation, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChooseGameDialogComponent } from '../choose-game-dialog/choose-game-dialog.component';
import { CreateGameDialogComponent } from '../create-game-dialog/create-game-dialog.component';
import { SessionDataService } from 'src/app/conf/session-data.service';
import { StateManagement } from '../utils/state-management';
import { Socket } from 'ngx-socket-io';
import { CalculateTopListsService } from '../utils/calculateTopLists.service';

@Component({
  selector: 'game-options',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.scss'],
  encapsulation: ViewEncapsulation.None,
  entryComponents: [ChooseGameDialogComponent, CreateGameDialogComponent]
})
export class GameOptionsComponent implements OnInit {

  public get username(): string {
    return this._sessionDataService.username;
  }

  public rankWeek: number;
  public rankMonth: number;

  constructor(private _injector: Injector, private _router: Router,
    private _modalService: NgbModal,
    private _sessionDataService: SessionDataService,
    private _socket: Socket, private _calculateTopLists: CalculateTopListsService) {
  }

  async ngOnInit(): Promise<void> {
    const topWeek = await this._calculateTopLists.topWeekList();
    const topMonth = await this._calculateTopLists.topMonthList();

    this.rankWeek = (topWeek.findIndex(rank => rank.player === this._sessionDataService.username) + 1) || (topWeek.length + 1);
    this.rankMonth = (topMonth.findIndex(rank => rank.player === this._sessionDataService.username) + 1) || (topMonth.length + 1);
  }

  public openCreateGameDialog() {
    this._modalService.open(CreateGameDialogComponent, {
      injector: this._injector
    }).result.then(value => {
      if (value) {
        this._sessionDataService.stateManagement = new StateManagement(this._socket, value, this._sessionDataService.username);
        this._router.navigateByUrl('/waitingRoom');
      }
    });
  }

  public openJoinGameDialog() {
    this._modalService.open(ChooseGameDialogComponent,
      {
        injector: this._injector
      }).result.then(value => {
        if (value) {
          this._sessionDataService.stateManagement = new StateManagement(this._socket, value, this._sessionDataService.username);
          this._router.navigateByUrl('/waitingRoom');
        }
      });
  }

  public logout() {
    this._router.navigateByUrl('/');
  }
}
