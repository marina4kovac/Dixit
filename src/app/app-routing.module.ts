import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateGameComponent } from './game/create-game/create-game.component';
import { GameOptionsComponent } from './game/game-options/game-options.component';
import { AuthGuard } from './guards/auth.guard';
import { WaitingRoomComponent } from './game/waiting-room/waiting-room.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'gameOptions', component: GameOptionsComponent, canActivate: [AuthGuard] },
  { path: 'createGame', component: CreateGameComponent, canActivate: [AuthGuard] },
  { path: 'waitingRoom', component: WaitingRoomComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
