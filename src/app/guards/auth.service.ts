import { Injectable } from '@angular/core';
import { SessionDataService } from '../conf/session-data.service'
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
   providedIn: 'root'
})
export class AuthService {
   private user: auth.UserCredential;

   constructor(private _sessionDataService: SessionDataService, private _afAuth: AngularFireAuth) { }

   logout(): void {
      this._sessionDataService.wipeData();
      if (this.user) {
         this._afAuth.signOut();
      }
   }

   async loginWithGoogle() {
      this.user = await this._afAuth.signInWithPopup(new auth.GoogleAuthProvider());
      return this.user?.user?.email;
   }

   async loginWithFacebook() {
      this.user = await this._afAuth.signInWithPopup(new auth.FacebookAuthProvider());
      return this.user?.additionalUserInfo?.profile && this.user?.additionalUserInfo?.profile['email'];
   }
}
