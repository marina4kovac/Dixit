import { Injectable } from '@angular/core';
import { CardDeckComponent } from 'src/app/card-deck/card-deck.component';

const totalNumberOfCards = 84;
const cardsPerPlayer = 6;

export interface Gameplay {
  free_deck: Array<number>;
  players_decks: Set<number>[];
}


@Injectable({
  providedIn: 'root'
})
export class GameGeneratorService {

  public static newGame(numberOfPlayers: number): Gameplay {

    let freeCards = [...Array(totalNumberOfCards).keys()];


    let players_decks: Set<number>[] = [];

    for (let i = 0; i < numberOfPlayers; i++) {
      let deck = new Set<number>();
      for (let card = 0; card < cardsPerPlayer; card++) {
        let random_cardId = Math.floor(Math.random() * (freeCards.length + 1));
        deck.add(freeCards[random_cardId]);
        freeCards.splice(random_cardId, 1);
      }
      players_decks.push(deck);
    }

    return {
      free_deck: freeCards,
      players_decks
    };
  }

  public static drawCard(game: Gameplay, player: number): void{
    const random_card = Math.floor(Math.random()*(game.free_deck.length + 1));
    game.free_deck.splice(random_card, 1);
    game.players_decks[player].add(random_card);
  }

}
