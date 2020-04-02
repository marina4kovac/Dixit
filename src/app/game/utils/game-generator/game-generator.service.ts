import { Injectable } from '@angular/core';
import { GameDecksI, GameInfoI, GameState } from '../../models/game-info';
import { ConfigService } from 'src/app/conf/config.service';

const totalNumberOfCards = 84;
const cardsPerPlayer = 6;


@Injectable({
  providedIn: 'root'
})
export class GameGeneratorService {

  constructor(private _configService: ConfigService) { }

  public createGame(gameName: string, creator: string, numberOfPlayers: number): Promise<GameInfoI> {
    let gameInfo: GameInfoI = {
      _id: undefined,
      gameName,
      numberOfPlayers,
      state: GameState.Waiting,
      decks: this.createGameDecks(numberOfPlayers),
      playerChoosing: 0,
      points: Array(numberOfPlayers).fill(0),
      players: [creator]
    };

    return this._configService.saveGame(gameInfo).then(result => {
      if (!result || !result.success) {
        result;
      }
      gameInfo._id = result.gameId;
      return gameInfo;
    });
  }

  public createGameDecks(numberOfPlayers: number): GameDecksI {

    let freeCards = [...Array<number>(totalNumberOfCards + 1).keys()].slice(1);


    let players_decks: Array<number[]> = [];

    for (let i = 0; i < numberOfPlayers; i++) {
      let deck = [];
      for (let card = 0; card < cardsPerPlayer; card++) {
        let seed: number = Math.random();
        let random_cardId = Math.floor(seed * freeCards.length);
        if (!freeCards[random_cardId]) {
          alert(`card error: floor ${seed}*${freeCards.length}===${random_cardId}`);
        }
        deck.push(freeCards[random_cardId]);
        freeCards.splice(random_cardId, 1);
      }
      players_decks.push(deck);
    }

    return {
      freeDeck: freeCards,
      playersDecks: players_decks,
      tableDeck: []
    };
  }

  // public drawCard(game: GameDecksI, player: number): void {
  //   let free_deck: Array<number> = [...game.freeDeck];
  //   const random_card = Math.floor(Math.random() * (free_deck.length + 1));
  //   free_deck.splice(random_card, 1);
  //   game.playersDecks[player].add(random_card);
  //   game.freeDeck = new Set(free_deck);
  // }

}
