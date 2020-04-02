import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'card-deck',
  templateUrl: './card-deck.component.html',
  styleUrls: ['./card-deck.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardDeckComponent implements OnInit {

  public cardBack: number = 0;

  private _cards: number[];

  public addCard(random_card: number) {
    this._cards.push(random_card);
  }

  @Input() set cards(value: number[]) {
    if (value != this._cards) {
      this._cards = value;
    }
  }

  getCards(): number[] {
    return this._cards;
  }

  @Input('faceUp') faceUp: boolean;
  @Input('canClick') canClick: boolean;
  @Output() cardChosen = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  public chooseCard($event) {
    this.cardChosen.emit($event);
  }

}
