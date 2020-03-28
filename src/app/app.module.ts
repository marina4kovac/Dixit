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
import { CreateGameComponent } from './game/create-game/create-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { GameOptionsComponent } from './game/game-options/game-options.component';
import { AuthGuard } from './guards/auth.guard';
import { WaitingRoomComponent } from './game/waiting-room/waiting-room.component';
import { ChooseGameDialogComponent } from './game/choose-game-dialog/choose-game-dialog.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService, SOCKET_SERVICE } from './conf/socket-service.service';
import { StateManagementService, STATE_MANAGEMENT } from './game/utils/state-management.service';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: { autoConnect: false } };

@NgModule({
  declarations: [
    AppComponent,
    CardHolderComponent,
    CardDeckComponent,
    CreateGameComponent,
    LoginComponent,
    GameOptionsComponent,
    WaitingRoomComponent,
    ChooseGameDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    ConfigService,
    { provide: API_URL, useValue: environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptorService, multi: true, deps: [API_URL] },
    AuthGuard,
    { provide: SOCKET_SERVICE, useClass: SocketService },
    { provide: STATE_MANAGEMENT, useClass: StateManagementService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
