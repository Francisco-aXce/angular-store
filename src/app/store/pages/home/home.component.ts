import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { BreakpointsService } from 'src/app/services/breakpoints.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, SubCategory } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
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
  ) {
    this.subCategories$ = this.productsService.getSubCategories();

    this.products$ = combineLatest([this.productsService.getProducts(), this.route.queryParams]).pipe(
      map(([products, queryParams]) => {
        const { subCate } = queryParams;
        const subCategoryId = parseInt(subCate) || undefined;
        this.selectedSubcategoryId$.next(subCategoryId);

        return this.productsService.filterProductsBySubCategory(products, subCategoryId);
      }),
    );
  }

}
