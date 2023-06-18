import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../../models/product.model';
import { BreakpointsService } from 'src/app/services/breakpoints.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products: Product[] = [];

  constructor(
    public bpService: BreakpointsService,
    private productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(finalProducts => {
      this.products = finalProducts;
    });
  }

}
