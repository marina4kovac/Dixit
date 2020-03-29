export enum GameState {
    Waiting,
    ChoosingWord,
    PlayingCards,
    Guessing
}

export interface GameDecksI {
    freeDeck: Set<number>;
    playersDecks: Set<number>[];
    tableDeck?: Set<number>;
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
}