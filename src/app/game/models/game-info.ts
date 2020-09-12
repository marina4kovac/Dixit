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
    creator?: string;
    numberOfPlayers?: number;
    state: GameState;
    freeDeckSize?: number;
    playerDeck?: number[];
    tableDeck?: any[];
    playerChoosing?: number;
    points?: number[];
    prevPoints?: number[];
    players: string[];
    word?: string;
}