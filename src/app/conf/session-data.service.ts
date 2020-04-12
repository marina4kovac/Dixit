import { Injectable } from '@angular/core';
import { StateManagement } from '../game/utils/state-management';

@Injectable({
    providedIn: 'root'
})
export class SessionDataService {

    public username: string;

    public stateManagement: StateManagement;

    public wipeData() {
        this.username = undefined;
        if (this.stateManagement) {
            this.stateManagement.disconnect();
            delete this.stateManagement;
        }
    }
}