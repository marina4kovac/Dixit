export enum GameState {
    Waiting,
    ChoosingWord,
    PlayingCards,
    Guessing,
    Results,
    End
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
    prevPoints?: number[];
    players: string[];
    word?: string;
}