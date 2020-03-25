import { Component, OnInit, Input } from '@angular/core';
import { GameGeneratorService } from '../utils/game-generator/game-generator.service';

@Component({
  selector: 'card-deck',
  templateUrl: './card-deck.component.html',
  styleUrls: ['./card-deck.component.scss']
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
