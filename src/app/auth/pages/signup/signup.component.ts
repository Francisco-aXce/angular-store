import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  readonly loginFormGroup = new FormGroup({
    // Both name and surname allows for alphabetic characters (both uppercase and lowercase), spaces, hyphens, and apostrophes.
    name: new FormControl<string>('', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ\-']+(\s[a-zA-ZÀ-ÖØ-öø-ÿ\-']+)*$/)]),
    surname: new FormControl<string>('', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ\-']+(\s[a-zA-ZÀ-ÖØ-öø-ÿ\-']+)*$/)]),
    // DNI must have 8 digits (0-9).
    dni: new FormControl<string>('', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    // For this case, I just verify that is a valid cellphone number from "Argentina".
    cellphone: new FormControl<string>('', [Validators.required, Validators.pattern(/^\+?54[1-9]{1}[0-9]{9}$/)]),
    // Password must have at least one lowercase letter, one uppercase letter, one digit, and one special character (@, $, !, %, *, ?, &).
    password: new FormControl<string>('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
  });

  hidePassword = true;
  loading = false;

  get name() { return this.loginFormGroup.controls.name; }
  get surname() { return this.loginFormGroup.controls.surname; }
  get dni() { return this.loginFormGroup.controls.dni; }
  get email() { return this.loginFormGroup.controls.email; }
  get cellphone() { return this.loginFormGroup.controls.cellphone; }
  get password() { return this.loginFormGroup.controls.password; }

  constructor(
    private router: Router,
  ) { }

  onTogglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  async onSubmit() {

  }

}
