import { Injectable } from '@angular/core';
import { LoginUser, User } from '../auth/models/user.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly currentUser$: BehaviorSubject<User | null>;

  private static readonly USERS_KEY = 'users';
  private static readonly CURRENT_USER_KEY = 'users';

  constructor(
    private router: Router,
  ) {
    const user = this.getCurrentUser();
    this.currentUser$ = new BehaviorSubject<User | null>(user);
  }

  /**
   * Try to login with the given credentials.
   * @param {LoginUser} credentials
   * @returns {boolean} True if the login was successful, false otherwise.
   */
  public async login(credentials: LoginUser): Promise<boolean> {
    const { email, password } = credentials;
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem(AuthService.CURRENT_USER_KEY, JSON.stringify(user));
      this.currentUser$.next(user);
      this.router.navigate(['/']);
      console.log('Logged in');
    } else {
      console.log('Invalid credentials');
    }

    // To simulate a delay in the response
    return await new Promise(resolve => setTimeout(() => resolve(!!user), 4000));
  }

  private getUsers(): User[] {
    const users = localStorage.getItem(AuthService.USERS_KEY);
    return (users ? JSON.parse(users) : []) as User[];
  }

  private getCurrentUser(): User | null {
    const user = localStorage.getItem(AuthService.CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }

}
