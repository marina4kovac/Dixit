import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ConfigService } from 'src/app/conf/config.service';
import { PlayerPoints } from '../models/game-info';
import { CalculateTopListsService } from '../utils/calculateTopLists.service';

@Component({
    selector: 'top-players',
    templateUrl: './top-players.component.html',
    styleUrls: ['./top-players.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TopPlayersComponent implements OnInit {

    @Input() type: number;
    @Input() title: string;

    public results: PlayerPoints[] = [];

    constructor(private _calculateTopLists: CalculateTopListsService) {
    }

    async ngOnInit(): Promise<void> {
        this.results = this.type ? this._calculateTopLists.lastWeekList : this._calculateTopLists.lastMonthList;
        if (!this.results) {
            await this.refresh();
        }
    }

    public async refresh() {
        this.results = this.type ? await this._calculateTopLists.topWeekList() : await this._calculateTopLists.topMonthList();
    }

}
