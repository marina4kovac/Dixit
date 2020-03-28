import { Component, OnInit, ViewEncapsulation, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChooseGameDialogComponent } from '../choose-game-dialog/choose-game-dialog.component';
import { SocketService, SOCKET_SERVICE } from 'src/app/conf/socket-service.service';

@Component({
  selector: 'game-options',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [NgbModal],
  entryComponents: [ChooseGameDialogComponent]
})
export class GameOptionsComponent implements OnInit {

  constructor(private _injector: Injector, private _router: Router, private _modalService: NgbModal) {
  }

  ngOnInit(): void {

  }

  public gotoCreateGame() {
    this._router.navigateByUrl('/createGame');
  }

  public openJoinGameDialog() {
    this._modalService.open(ChooseGameDialogComponent,
      {
        injector: this._injector
      });
  }
}
