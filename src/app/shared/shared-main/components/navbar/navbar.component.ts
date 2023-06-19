import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointsService } from 'src/app/services/breakpoints.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None, // To be able to override the styles of the Angular Material components
})
export class NavbarComponent {

  constructor(
    public bpService: BreakpointsService,
    public productsService: ProductsService,
    private router: Router,
  ) { }

  public onLogin() {
    this.router.navigate(['auth/login']);
  }

  public onSignup() {
    this.router.navigate(['auth/signup']);
  }

}
