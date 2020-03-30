import { Injectable } from '@angular/core';
import { SessionDataService } from '../conf/session-data.service';

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   constructor(private _sessionDataService: SessionDataService) { }
   logout(): void {
      this._sessionDataService.wipeData();
   }
}   