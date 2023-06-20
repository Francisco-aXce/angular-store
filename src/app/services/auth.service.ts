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
  private static readonly CURRENT_USER_KEY = 'current_user';

  constructor(
    private router: Router,
  ) {
    const user = this.getCurrentUser();
    this.currentUser$ = new BehaviorSubject<User | null>(user);
  }

  public logout(): void {
    localStorage.removeItem(AuthService.CURRENT_USER_KEY);
    this.currentUser$.next(null);
  }

  /**
   * Try to login with the given credentials.
   * @param {LoginUser} credentials
   * @returns {Promise<boolean>} True if the login was successful, false otherwise.
   */
  public async login(credentials: LoginUser): Promise<boolean> {
    const { email, password } = credentials;
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // To simulate a delay in the response
      return await new Promise(resolve => setTimeout(() => {
        // Save the logged in user in the local storage
        localStorage.setItem(AuthService.CURRENT_USER_KEY, JSON.stringify(user));
        this.currentUser$.next(user);
        // Navigate to the home page
        this.router.navigate(['/']);
        console.log('Logged in');

        return resolve(true)
      }, 4000));
    } else {
      // To simulate a delay in the response
      return await new Promise(resolve => setTimeout(() => {
        console.log('Invalid credentials');

        return resolve(true)
      }, 4000));
    }
  }

  /**
   * Sign up a new user.
   * @param {User} user
   * @returns {Promise<boolean>} True if the sign up was successful, false otherwise.
   */
  public async signup(user: User): Promise<boolean> {
    const users = this.getUsers();

    // Check if the email is already in use, in that case return false
    if (users.find(u => u.email === user.email)) {
      return await new Promise(resolve => setTimeout(() => {
        console.log('Email already in use');
        return resolve(false);
      }, 4000));
    }

    // Add the new user to the list and save it
    users.push(user);
    this.saveUsers(users);

    return await new Promise(resolve => setTimeout(() => {

      // Navigates to the login page
      this.router.navigate(['/auth', 'login']);

      return resolve(true)
    }, 4000));
  }

  private getUsers(): User[] {
    const users = localStorage.getItem(AuthService.USERS_KEY);
    return (users ? JSON.parse(users) : []) as User[];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(AuthService.USERS_KEY, JSON.stringify(users));
  }

  private getCurrentUser(): User | null {
    const user = localStorage.getItem(AuthService.CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  }

}
