import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { GameOptionsComponent } from './game-options/game-options.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'gameOptions', component: GameOptionsComponent, canActivate: [AuthGuard] },
  { path: 'createGame', component: CreateGameComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
