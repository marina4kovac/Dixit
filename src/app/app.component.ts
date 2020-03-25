import { Component, ViewChildren, TemplateRef, ComponentFactoryResolver, QueryList, AfterViewInit, ElementRef, ViewContainerRef, ComponentFactory, Injector } from '@angular/core';
import { GameGeneratorService, Gameplay } from './utils/game-generator/game-generator.service';
import { CardDeckComponent } from './card-deck/card-deck.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public game: Gameplay;

  constructor(private injector: Injector, private componentFactoryResolver: ComponentFactoryResolver) {
    this.game = GameGeneratorService.newGame(4);
  }

  public drawCard(player: number) {
    GameGeneratorService.drawCard(this.game, player);
  }
}
