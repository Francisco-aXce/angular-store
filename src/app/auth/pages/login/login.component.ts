import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  readonly loginFormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    // Password must have at least one lowercase letter, one uppercase letter, one digit, and one special character (@, $, !, %, *, ?, &).
    password: new FormControl<string>('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
  });

  get email() { return this.loginFormGroup.controls.email; }
  get password() { return this.loginFormGroup.controls.password; }

  hidePassword = true;

  constructor(
    private router: Router,
  ) { }

  onTogglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  onCancel() {
    this.router.navigate(['/']);
  }

}
