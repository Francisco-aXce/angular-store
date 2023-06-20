import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BreakpointsService } from 'src/app/services/breakpoints.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None, // To be able to override the styles of the Angular Material components
})
export class NavbarComponent {

  readonly searchForm = new FormGroup({
    search: new FormControl<string>('', Validators.required),
  });

  get search() { return this.searchForm.controls.search; }

  constructor(
    public bpService: BreakpointsService,
    public productsService: ProductsService,
    public shoppingService: ShoppingService,
    private router: Router,
    private authService: AuthService,
  ) { }

  get currentUser$() {
    return this.authService.currentUser$;
  }

  public onLogin() {
    this.router.navigate(['auth/login']);
  }

  public onSignup() {
    this.router.navigate(['auth/signup']);
  }

  public onLogout() {
    this.authService.logout();
  }

  public onSubmitSeach() {
    if (this.searchForm.invalid) return;
    const search = this.search.value;

    // Navigate to the home page searching for the products (mantaining old query params)
    this.router.navigate(['/'], {
      queryParams: { search },
      queryParamsHandling: 'merge',
    });
  }

}
