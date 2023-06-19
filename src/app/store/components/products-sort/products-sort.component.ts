import { Component, ViewEncapsulation } from '@angular/core';
import { SortOptions } from '../../models/product.model';
import { MatSelectChange } from '@angular/material/select';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-sort',
  templateUrl: './products-sort.component.html',
  styleUrls: ['./products-sort.component.scss'],
  encapsulation: ViewEncapsulation.None, // To be able to override the styles of the Angular Material components
})
export class ProductsSortComponent {

  constructor(
    private productsService: ProductsService,
  ) { }

  get sortOptions() {
    // Returns it as string so I can control the order of the options
    return [SortOptions.NONE, SortOptions.FEATURED, SortOptions.PRICE_ASC, SortOptions.PRICE_DESC];
  }

  onSelectionChange(event: MatSelectChange) {
    this.productsService.sortBy$.next(event.value);
  }
}
