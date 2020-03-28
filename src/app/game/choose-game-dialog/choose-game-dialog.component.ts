import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-choose-game-dialog',
  templateUrl: './choose-game-dialog.component.html',
  styleUrls: ['./choose-game-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChooseGameDialogComponent implements OnInit {


  constructor(private _activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onClose(){
    this._activeModal.close();
  }
}
