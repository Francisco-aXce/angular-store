import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { BreakpointsService } from 'src/app/services/breakpoints.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public readonly products$: Observable<Product[]>;

  constructor(
    public bpService: BreakpointsService,
    private productsService: ProductsService,
  ) {
    this.products$ = this.productsService.getProducts();
  }

}
