import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ConfigService } from "../conf/config.service";
import { Router } from '@angular/router';
import { AuthService } from '../guards/auth.service';

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  submitted = false;
  processing = false;
  wrongData = false;
  networkError = false;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private configService: ConfigService,
    private router: Router,
    private authService: AuthService
  ) { }

  invalidUsername() {
    return this.submitted && this.loginForm.controls.username.errors != null;
  }

  invalidPassword() {
    return this.submitted && this.loginForm.controls.password.errors != null;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.authService.logout();
  }

  onSubmit() {
    this.processing = true;
    this.submitted = true;

    if (this.loginForm.invalid == true) {
      this.processing = false;
      return;
    } else {
      this.configService
        .getUsers()
        .then(
          response => {
            const user = response.users.find(
              user => user.username === this.loginForm.get("username").value
            );
            if (
              !user ||
              user.password !== this.loginForm.get("password").value
            ) {
              this.wrongData = true;
              this.submitted = false;
              this.loginForm.reset();
              setTimeout(() => (this.wrongData = false), 1000);
            } else {
              localStorage.setItem('isLoggedIn', "true");
              localStorage.setItem('token', user.username);
              this.router.navigateByUrl('/gameOptions');
            }
          },
          error => {
            this.networkError = true;
            setTimeout(() => (this.networkError = false), 1000);
          }
        )
        .finally(() => {
          this.processing = false;
        });
    }
  }
}
