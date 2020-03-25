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
@NgModule({
  declarations: [
    AppComponent,
    CardHolderComponent,
    CardDeckComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ConfigService,
    { provide: API_URL, useValue: environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptorService, multi: true, deps: [API_URL] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
