import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardHolderComponent } from './card-holder/card-holder.component';
import { CardDeckComponent } from './card-deck/card-deck.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfigService } from './conf/config.service';
import { API_URL, ApiUrlInterceptorService } from './conf/api-url-interceptor.service';
import { environment } from '../environments/environment';
import { CreateGameComponent } from './create-game/create-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { GameOptionsComponent } from './game-options/game-options.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    CardHolderComponent,
    CardDeckComponent,
    CreateGameComponent,
    LoginComponent,
    GameOptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ConfigService,
    { provide: API_URL, useValue: environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptorService, multi: true, deps: [API_URL] },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
