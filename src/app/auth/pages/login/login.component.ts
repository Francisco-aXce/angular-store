import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginUser } from '../../models/user.model';

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
  loading = false;

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
    this.loginFormGroup.markAllAsTouched();
    if (this.loginFormGroup.invalid || this.loading) return;
    this.loading = true;

    const email = this.email.value ?? '';
    const password = this.password.value ?? '';
    const credentials: LoginUser = { email, password };

    await this.authService.login(credentials);
    this.loading = false;
  }

}
