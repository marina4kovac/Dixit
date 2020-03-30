import { ConfigService } from './conf/config.service';
import { Component, ViewEncapsulation, OnDestroy } from '@angular/core'
import { AuthService } from './guards/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnDestroy {


  constructor(private _configService: ConfigService, private _authService: AuthService) {
    this._configService.getUsers().then((res) => { console.log('success'); }, (error) => { console.log('error'); });
  }

  ngOnDestroy() {
    console.log('app component destroyed');
    this._authService.logout();
  }
}
