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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { GameOptionsComponent } from './game/game-options/game-options.component';
import { AuthGuard } from './guards/auth.guard';
import { WaitingRoomComponent } from './game/waiting-room/waiting-room.component';
import { ChooseGameDialogComponent } from './game/choose-game-dialog/choose-game-dialog.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CommonModule } from '@angular/common';
import { CreateGameDialogComponent } from './game/create-game-dialog/create-game-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SessionDataService } from './conf/session-data.service';
import { ChooseWordComponent } from './game/gameplay/choose-word/choose-word.component';
import { GameTableComponent } from './game/gameplay/game-table/game-table.component';
import { PlayCardComponent } from './game/gameplay/play-card/play-card.component';
import { TableDeckComponent } from './game/gameplay/table-deck/table-deck.component';
import { ResultsDialogComponent } from './game/gameplay/results-dialog/results-dialog.component';
import { GameStatusComponent } from './game/gameplay/game-status/game-status.component';
import { LeftGameComponent } from './left-game/left-game.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

const config: SocketIoConfig = { url: environment.apiUrl, options: { autoConnect: false } };

@NgModule({
  declarations: [
    AppComponent,
    CardHolderComponent,
    CardDeckComponent,
    LoginComponent,
    RegisterComponent,
    GameOptionsComponent,
    WaitingRoomComponent,
    ChooseGameDialogComponent,
    CreateGameDialogComponent,
    ChooseWordComponent,
    GameTableComponent,
    PlayCardComponent,
    TableDeckComponent,
    ResultsDialogComponent,
    GameStatusComponent,
    LeftGameComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [
    ConfigService,
    { provide: API_URL, useValue: environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptorService, multi: true, deps: [API_URL] },
    SessionDataService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
