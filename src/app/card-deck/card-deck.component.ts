import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'card-deck',
  templateUrl: './card-deck.component.html',
  styleUrls: ['./card-deck.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardDeckComponent implements OnInit {

  private _cards: Set<number>;

  public addCard(random_card: number) {
    this._cards.add(random_card);
  }

  @Input() set cards(value: Set<number>) {
    if (value != this._cards) {
      this._cards = value;
    }
  }

  get cards() {
    return this._cards;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
