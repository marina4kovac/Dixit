import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '../conf/config.service';
import { Router } from '@angular/router';
import { AuthService } from '../guards/auth.service';
import { SessionDataService } from '../conf/session-data.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  submitted = false;
  processing = false;
  wrongData = false;
  networkError = false;
  loginForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _configService: ConfigService,
    private _router: Router,
    private _authService: AuthService,
    private _sessionDataService: SessionDataService
  ) { }

  invalidUsername() {
    return this.submitted && this.loginForm.controls.username.errors != null;
  }

  invalidPassword() {
    return this.submitted && this.loginForm.controls.password.errors != null;
  }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this._authService.logout();
  }

  async onSubmit() {
    this.processing = true;
    this.submitted = true;

    if (this.loginForm.invalid == true) {
      this.processing = false;
      return;
    } else {
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;
      try {
        const loginInfo = await this._configService.tryLogin(username, password);
        if (!loginInfo) {
          this.networkError = true;
          setTimeout(() => (this.networkError = false), 1000);
        } else if (loginInfo.success) {
          this._sessionDataService.username = username;
          this._router.navigateByUrl('/gameOptions');
        } else {
          switch (loginInfo.errorId) {
            case 'WRONG_USERNAME':
            case 'WRONG_PASSWORD':
              this.wrongData = true;
              this.submitted = false;
              this.loginForm.reset();
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