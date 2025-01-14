import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../quickKart-services/user-service/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../quickKart-services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status!: string;
  errorMsg!: string;
  msg!: string;
  showDiv: boolean = false;
  constructor(private _userService: UserService, private router: Router, private authService: AuthService) { }

  submitLoginForm(form: NgForm) {
    this._userService.validateCredentials(form.value.email, form.value.password).subscribe(
      responseLoginStatus => {
        this.status = responseLoginStatus;
        if (this.status.toLowerCase() != "invalid credentials") {
          sessionStorage.setItem('userName', form.value.email);
          sessionStorage.setItem('userRole', this.status);
          this.authService.login(form.value.email);  // Login with email

          this.router.navigate(['/home']);
        }
        else {
          this.msg = this.status + ". Try again with valid credentials.";
        }
      },
      responseLoginError => {
        this.errorMsg = responseLoginError;
      },
      () => console.log("SubmitLoginForm method executed successfully")
    );
  }
  ngOnInit() {
  }
}
