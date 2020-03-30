import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { SessionDataService } from '../conf/session-data.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private _router: Router, private _sessionDataService: SessionDataService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.isLoggedIn()) {
            return true;
        }
        this._router.navigateByUrl('');
        return false;
    }
    public isLoggedIn(): boolean {
        let status = false;
        if (this._sessionDataService.username) {
            status = true;
        }
        else {
            status = false;
        }
        return status;
    }
}   