import { Component, ViewEncapsulation } from '@angular/core';
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

  constructor(
    public bpService: BreakpointsService,
    public productsService: ProductsService,
    public shoppingService: ShoppingService,
  ) { }

}
