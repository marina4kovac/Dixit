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


  constructor(private _authService: AuthService) {
  }

  async ngOnDestroy() {
   await this._authService.logout();
  }
}
