import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Filters } from '../../models/product.model';
import { Observable, combineLatest } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent {

  filters$: Observable<{ [key: string]: string }> = combineLatest([this.route.queryParams, this.productsService.getSubCategories()]).pipe(
    map(([queryParams, subcategories]) => {
      const filters = Object.fromEntries(Object.entries(queryParams)
        .filter(([key, value]) => Object.values(Filters).includes(key as Filters) && value !== null && value !== undefined));

      if (filters[Filters.SUBCATEGORY]) {
        const subcategoryId = parseInt(filters[Filters.SUBCATEGORY] as string);
        const subcategory = subcategories.find(subcategory => subcategory.id === subcategoryId);
        filters[Filters.SUBCATEGORY] = subcategory?.nombre;
      }

      return filters;
    }),
    tap(filters => this.logger.log('**Filters**', filters)),
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private logger: LoggerService,
  ) { }

  onRemoveFilter(key: string) {
    this.router.navigate([], {
      queryParams: {
        [key]: null,
      },
      queryParamsHandling: 'merge',
    });
  }

}
