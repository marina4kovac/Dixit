import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

const card_image_path = '/assets/images/cards/card';


@Component({
  selector: 'card-holder',
  templateUrl: './card-holder.component.html',
  styleUrls: ['./card-holder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardHolderComponent implements OnInit {

  private _cardId: number;

  @Input('cardId')
  set cardId(value: number) {
    if (this._cardId !== value) {
      this._cardId = value;
      this.cardSource = `${card_image_path}${this._cardId}.jpg`;
    }
  }

  get cardId() {
    return this._cardId;
  }

  public cardSource: string;

  constructor() { }

  ngOnInit(): void {
  }

}
