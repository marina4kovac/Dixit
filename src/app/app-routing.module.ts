import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GameOptionsComponent } from './game/game-options/game-options.component';
import { AuthGuard } from './guards/auth.guard';
import { WaitingRoomComponent } from './game/waiting-room/waiting-room.component';
import { GameTableComponent } from './game/gameplay/game-table/game-table.component';
import { LeftGameComponent } from './left-game/left-game.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'gameOptions', component: GameOptionsComponent, canActivate: [AuthGuard] },
  { path: 'waitingRoom', component: WaitingRoomComponent, canActivate: [AuthGuard] },
  { path: 'gameplay', component: GameTableComponent, canActivate: [AuthGuard] },
  { path: 'gameEnd', component: LeftGameComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
