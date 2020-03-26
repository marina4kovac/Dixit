import { Component, ViewChildren, TemplateRef, ComponentFactoryResolver, QueryList, AfterViewInit, ElementRef, ViewContainerRef, ComponentFactory, Injector, ViewEncapsulation } from '@angular/core';
import { GameGeneratorService, Gameplay } from './utils/game-generator/game-generator.service';
import { ConfigService } from './conf/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {


  public game: Gameplay;

  constructor(private _configService: ConfigService) {
    this.game = GameGeneratorService.newGame(4);
    this._configService.getUsers().then((res) => { console.log("success"); }, (error) => { console.log("error"); });
  }

  public drawCard(player: number) {
    GameGeneratorService.drawCard(this.game, player);
  }
}
