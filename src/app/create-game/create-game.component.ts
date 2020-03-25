import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {
  registered = false;
	submitted = false;
	gameForm: FormGroup;

  constructor(private formBuilder: FormBuilder)
  {

  }

  invalidGameName()
  {
  	return (this.submitted && this.gameForm.controls.game_name.errors != null);
  }

  invalidNumberOfPlayers()
  {
  	return (this.submitted && this.gameForm.controls.number_of_players.errors != null);
  }

  ngOnInit()
  {
  	this.gameForm = this.formBuilder.group({
  		game_name: ['', Validators.required],
  	  number_of_players: ['', [Validators.required, Validators.pattern('^[4-6]?$')]]
  	});
  }

  onSubmit()
  {
  	this.submitted = true;

  	if(this.gameForm.invalid == true)
  	{
  		return;
  	}
  	else
  	{
  		this.registered = true;
  	}
  }

}