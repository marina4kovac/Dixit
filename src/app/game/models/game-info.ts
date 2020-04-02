export enum GameState {
    Waiting,
    ChoosingWord,
    PlayingCards,
    Guessing,
    Results
}

export interface GameDecksI {
    freeDeck: number[];
    playersDecks: Array<number[]>;
    tableDeck?: any[];
}

export interface GameInfoI {
    _id: String;
    gameName: string;
    numberOfPlayers: number;
    state: GameState;
    decks: GameDecksI;
    playerChoosing: number;
    points: number[];
    players: string[];
    word?: string;
}