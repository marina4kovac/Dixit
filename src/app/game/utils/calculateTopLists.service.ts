import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { ConfigService } from 'src/app/conf/config.service';
import { PlayerPoints } from '../models/game-info';


@Injectable({
    providedIn: 'root'
})
export class CalculateTopListsService {
    public lastWeekList: PlayerPoints[];
    public lastMonthList: PlayerPoints[];

    constructor(private _configService: ConfigService) { }

    public async topWeekList(numberOfResults?: number): Promise<PlayerPoints[]> {
        let endDateWeek = new Date();
        endDateWeek.setHours(23, 59, 59);
        const dayOfWeek = endDateWeek.getDay();
        let startDateWeek = new Date(endDateWeek);
        const diff = startDateWeek.getDate() - dayOfWeek + (dayOfWeek == 0 ? -6 : 1);
        startDateWeek.setHours(0, 0, 0);
        startDateWeek = new Date(startDateWeek.setDate(diff));
        this.lastWeekList = await this.topList(startDateWeek, endDateWeek, numberOfResults);
        return this.lastWeekList;
    }

    public async topMonthList(numberOfResults?: number): Promise<PlayerPoints[]> {
        let endDateMonth = new Date();
        endDateMonth.setHours(23, 59, 59);
        let startDateMonth = new Date(endDateMonth.getFullYear(), endDateMonth.getMonth(), 1, 0, 0, 0);
        this.lastMonthList = await this.topList(startDateMonth, endDateMonth, numberOfResults);
        return this.lastMonthList;
    }

    public async topList(startDate: Date, endDate: Date, numberOfResults?: number): Promise<PlayerPoints[]> {
        let gameHistory = await this._configService.getGameHistory();
        while (!gameHistory || !gameHistory.games) {
            gameHistory = await this._configService.getGameHistory();
        }
        const playerList = new Map<string, number>();
        for (let game of gameHistory.games) {
            const date = new Date(game.date);
            if (startDate <= date && date <= endDate) {
                for (let i = 0; i < game.players.length; i++) {
                    let prevPoints = 0;
                    if (playerList.has(game.players[i])) {
                        prevPoints = playerList.get(game.players[i]);
                    }
                    playerList.set(game.players[i], prevPoints + game.points[i]);
                }
            }
        }

        let allResults: PlayerPoints[] = [];
        playerList.forEach((points, player) => allResults.push({ player, points }));
        allResults = allResults.sort((a, b) => b.points - a.points);
        if (numberOfResults !== undefined) {
            allResults = allResults.splice(0, numberOfResults);
        }
        return allResults;
    }
}