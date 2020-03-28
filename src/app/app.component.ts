import { ConfigService } from './conf/config.service';
import { Component, ViewEncapsulation } from '@angular/core'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
  ]
})
export class AppComponent {


  constructor(private _configService: ConfigService) {
    this._configService.getUsers().then((res) => { console.log("success"); }, (error) => { console.log("error"); });
  }

}
