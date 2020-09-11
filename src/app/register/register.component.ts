import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '../conf/config.service';
import { Router } from '@angular/router';
import { AuthService } from '../guards/auth.service';
import { SessionDataService } from '../conf/session-data.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  submitted = false;
  processing = false;
  wrongData = false;
  networkError = false;
  registerForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _configService: ConfigService,
    private _router: Router,
    private _authService: AuthService,
    private _sessionDataService: SessionDataService
  ) { }

  invalidUsername() {
    return this.submitted && this.registerForm.controls.username.errors != null;
  }

  invalidPassword() {
    return this.submitted && this.registerForm.controls.password.errors != null;
  }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this._authService.logout();
  }

  async onSubmit() {
    this.processing = true;
    this.submitted = true;

    if (this.registerForm.invalid == true) {
      this.processing = false;
      return;
    } else {
      const username = this.registerForm.get('username').value;
      const password = this.registerForm.get('password').value;
      try {
        const registerInfo = await this._configService.tryRegister(username, password);
        if (!registerInfo) {
          this.networkError = true;
          setTimeout(() => (this.networkError = false), 1000);
        } else if (registerInfo.success) {
          this._sessionDataService.username = username;
          this._router.navigateByUrl('/gameOptions');
        } else {
          switch (registerInfo.errorId) {
            case 'INVALID_USERNAME':
              this.wrongData = true;
              this.submitted = false;
              this.registerForm.reset();
              setTimeout(() => (this.wrongData = false), 1000);
              break;
            case 'DB_ERROR':
            default:
              this.networkError = true;
              setTimeout(() => (this.networkError = false), 1000);
              break;
          }
        }
      } catch (error) {
        this.networkError = true;
        setTimeout(() => (this.networkError = false), 1000);
      } finally {
        this.processing = false;
      }
    }
  }
}
