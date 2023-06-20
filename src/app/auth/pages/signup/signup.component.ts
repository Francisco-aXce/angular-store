import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  readonly signupFormGroup = new FormGroup({
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

  get name() { return this.signupFormGroup.controls.name; }
  get surname() { return this.signupFormGroup.controls.surname; }
  get dni() { return this.signupFormGroup.controls.dni; }
  get email() { return this.signupFormGroup.controls.email; }
  get cellphone() { return this.signupFormGroup.controls.cellphone; }
  get password() { return this.signupFormGroup.controls.password; }

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  onTogglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  async onSubmit() {
    this.signupFormGroup.markAllAsTouched();
    if (this.signupFormGroup.invalid) return;
    this.loading = true;

    const name = this.name.value ?? '';
    const surname = this.surname.value ?? '';
    const dni = this.dni.value ?? '';
    const email = this.email.value ?? '';
    const phone = this.cellphone.value ?? '';
    const password = this.password.value ?? '';

    const userData: User = {
      name,
      surname,
      dni,
      email,
      phone,
      password,
    };

    await this.authService.signup(userData);
    this.loading = false;
  }

}
