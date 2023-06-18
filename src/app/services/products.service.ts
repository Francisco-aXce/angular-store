import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product, SubCategory } from '../store/models/product.model';

@Injectable()
export class ProductsService {

  private readonly apiTestUrl = environment.apiTestUrl;

  // Save private observable to avoid multiple requests
  private products$?: Observable<Product[]>;
  private subCategories$?: Observable<SubCategory[]>;

  constructor(
    private http: HttpClient
  ) { }

  processProducts(products: Product[], subCategories: SubCategory[]): Product[] {
    const processedProducts: Product[] = [...products];

    return processedProducts.map(product => {
      const subCategory = subCategories.find(subCategory => subCategory.id === product.id_subcategoria);
      // Set subcategory of the product
      if (subCategory) {
        product.subcategoria = subCategory;
      }

      // Calculate final price (with IVA)
      product.precio_final = product.precio * (1 + product.iva / 100);

      return product;
    });
  }

  // #region Requests

  getSubCategories(): Observable<SubCategory[]> {
    // If subCategories$ is defined, return it
    if (this.subCategories$) {
      return this.subCategories$;
    }

    // Otherwise, save the request and return it
    const url = `${this.apiTestUrl}/subcategorias.json`;

    // Use shareReplay(1) to avoid multiple requests
    this.subCategories$ = this.http.get<SubCategory[]>(url).pipe(shareReplay(1));
    return this.subCategories$;
  }

  getProducts(): Observable<Product[]> {
    // If products$ is defined, return it
    if (this.products$) {
      return this.products$;
    }

    // Otherwise, save the request and return it
    const url = `${this.apiTestUrl}/productos.json`;

    // Use shareReplay(1) to avoid multiple requests
    this.products$ = this.http.get<Product[]>(url).pipe(
      switchMap(products => {
        // Get subcategories
        return this.getSubCategories().pipe(
          map(subCategories => {
            // Process products
            return this.processProducts(products, subCategories);
          })
        );
      }),
      tap(console.log),
      shareReplay(1),
    );
    return this.products$;
  }

  // #endregion

}
