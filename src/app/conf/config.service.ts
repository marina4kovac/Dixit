import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GameInfoI, GameState } from '../game/models/game-info';
import { Socket } from 'ngx-socket-io';
import * as CryptoJS from 'crypto-js';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private _http: HttpClient) {
  }

  public getUsers(): Promise<any> {
    return this._http.get('/api/v1/users').toPromise();
  }

  public tryLogin(username: string, password: string): Promise<any> {
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
    return this._http.post('/api/v1/users/login', {
      'username': username,
      'password': hashedPassword
    }).toPromise();
  }

  public async loginPlatform(userEmail: string): Promise<any> {
    return await this._http.post('api/v1/users/loginPlatform', {
      'userEmail': userEmail
    }).toPromise();
  }

  public tryRegister(username: string, password: string): Promise<any> {
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
    return this._http.post('/api/v1/users/register', {
      'username': username,
      'password': hashedPassword
    }).toPromise();
  }

  public saveGame(gameName: string, numberOfPlayers: number, player: string, password?: string): Promise<any> {
    let ret;
    if (!password) {
      ret = this._http.post('/api/v1/games/createGame', {
        gameName,
        numberOfPlayers,
        player
      }).toPromise();
    } else {
      const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
      ret = this._http.post('/api/v1/games/createPrivateGame', {
        gameName,
        numberOfPlayers,
        player,
        password: hashedPassword
      }).toPromise();
    }
    return ret;
  }

  public async getActiveGames(): Promise<GameInfoI[]> {
    const result = await this._http.get('/api/v1/games/getActiveGames').toPromise();
    return (result as any).activeGames;
  }

  public joinGame(player: string, gameInfo: GameInfoI): Promise<any> {
    return this._http.post('/api/v1/games/joinGame', {
      player,
      gameInfo
    }).toPromise();
  }

  public async chooseWord(gameId: String, word: string, socket: Socket): Promise<any> {
    const result = await this._http.post('/api/v1/games/chooseWord', {
      gameId,
      word
    }).toPromise();
    if (result) {
      socket.emit('updated', gameId);
    }
    return result;;
  }

  public async playCard(gameId: String, player: number, card: number, socket: Socket): Promise<any> {
    const result = await this._http.post('/api/v1/games/playCard', {
      gameId,
      player,
      card
    }).toPromise();
    if (result) {
      socket.emit('updated', gameId);
    }
    return result;;
  }

  public async guessCard(gameId: String, player: string, card: number, socket: Socket): Promise<any> {
    const result = await this._http.post('/api/v1/games/guessCard', {
      gameId,
      player,
      card
    }).toPromise();
    if (result) {
      socket.emit('updated', gameId);
    }
    return result;
  }

  public async returnFromResults(gameId: String, player: string, socket: Socket): Promise<any> {
    let result;
    try {
      result = await this._http.post('/api/v1/games/returnFromResults', {
        gameId,
        player
      }).toPromise();
      if (result) {
        socket.emit('updated', gameId);
      }
    } catch {

    }
    return result;
  }

  public async rematch(gameId: String, player: string, socket: Socket): Promise<any> {
    const result = await this._http.post('/api/v1/games/rematch', {
      gameId,
      player
    }).toPromise();
    if (result) {
      socket.emit('updated', gameId);
    }
    return result;
  }
  a
  public async joinRematchGame(gameName: string, creator: string, player: string, numberOfPlayers: number, socket: Socket, password?: string): Promise<any> {
    const result: any = await this._http.post('/api/v1/games/joinRematchGame', {
      gameName,
      creator,
      player,
      numberOfPlayers,
      password
    }).toPromise();
    // if (result && result.success && result.gameInfo && result.gameInfo.state === GameState.ChoosingWord) {
    //   socket.emit('updated', result.gameInfo._id);
    // }
    return result;
  }

}
