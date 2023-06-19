import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { BreakpointsService } from 'src/app/services/breakpoints.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, SubCategory } from '../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public readonly products$: Observable<Product[]>;
  public readonly subCategories$: Observable<SubCategory[]>;
  public readonly selectedSubcategoryId$ = new BehaviorSubject<number | undefined>(undefined);

  constructor(
    public bpService: BreakpointsService,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.subCategories$ = this.productsService.getSubCategories();

    this.products$ = combineLatest([this.productsService.getProducts(), this.route.queryParams, this.subCategories$]).pipe(
      map(([products, queryParams, subcategories]) => {
        const { subCate } = queryParams;
        const subCategoryId = parseInt(subCate) || undefined;

        // Check if it's a valid subcategory, if not, remove it from the query params and return the all products
        if (!subcategories.find(subcategory => subcategory.id === subCategoryId)) {
          this.router.navigate(['/'], {
            queryParams: {
              subCate: undefined,
            },
            queryParamsHandling: 'merge',
          });
          return products;
        }

        this.selectedSubcategoryId$.next(subCategoryId);

        return this.productsService.filterProductsBySubCategory(products, subCategoryId);
      }),
    );
  }

}
