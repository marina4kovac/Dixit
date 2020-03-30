export enum GameState {
    Waiting,
    ChoosingWord,
    PlayingCards,
    Guessing
}

export interface GameDecksI {
    freeDeck: number[];
    playersDecks: Array<number[]>;
    tableDeck?: number[];
}

export interface GameInfoI {
    _id: String;
    gameName: string;
    numberOfPlayers: number;
    state: GameState;
    decks: GameDecksI;
    playerChoosing;
    points: number[];
    players: string[];
    word?: string;
}