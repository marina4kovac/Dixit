import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'game-options',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GameOptionsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public gotoCreateGame(){
    this.router.navigateByUrl('/createGame');
  }


}
