import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category, Product, SubCategory } from '../store/models/product.model';

/*
  According to the requirements, the user should be able to see the products without being logged in.
  So in that case, there is no need to limit the service to a module.
*/
@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private readonly apiTestUrl = environment.apiTestUrl;

  // Save private observable to avoid multiple requests
  private products$?: Observable<Product[]>;
  private subCategories$?: Observable<SubCategory[]>;
  readonly categories$: Observable<Category[]>;

  // Since "Categories" names was not provided, I define them here based on the subcategories.
  // These are used to display the categories in the sidenav
  private readonly categoriesNames: { [key: string]: string } = {
    "1": 'Mothers',
    "2": 'Placas de video',
    "5": 'Notebooks',
    "6": 'Monitores',
    "7": 'Procesadores',
    "8": 'Gabinetes',
    "9": 'Almacenamiento',
    "10": 'Memorias',
    "24": 'Periféricos',
    "25": 'Refrigeración',
    "26": 'Fuentes',
  };

  constructor(
    private http: HttpClient
  ) {
    // As the categories come from the subcategories, we need to request them first
    this.categories$ = this.getSubCategories().pipe(
      map(subCategories => this.processCategories(subCategories)),
    );
  }

  filterProductsBySubCategory(products: Product[], subCategoryId?: number): Product[] {
    if (subCategoryId === undefined) return products;
    return products.filter(product => product.id_subcategoria === subCategoryId);
  }

  // #region Data processing for requests

  private processProducts(products: Product[], subCategories: SubCategory[]): Product[] {
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

  private processSubCategories(subCategories: SubCategory[]): SubCategory[] {
    const processedSubCategories: SubCategory[] = [...subCategories];

    // sorted by order
    processedSubCategories.sort((a, b) => a.orden - b.orden);

    return processedSubCategories;
  }

  private processCategories(subCategories: SubCategory[]): Category[] {
    // Get categories
    const categoriesObj: { [key: number]: Category } = {};
    subCategories.forEach(subCategory => {
      categoriesObj[subCategory.id_agrupador] = {
        id: subCategory.id_agrupador,
        nombre: this.categoriesNames[subCategory.id_agrupador.toString()] ?? 'Categoria desconocida',
        subCategories: [
          ...(categoriesObj[subCategory.id_agrupador]?.subCategories || []),
          subCategory,
        ],
      };
    });

    // Emit categories
    return Object.values(categoriesObj);
  }

  // #endregion

  // #region Requests

  getSubCategories(): Observable<SubCategory[]> {
    // If subCategories$ is defined, return it
    if (this.subCategories$) {
      return this.subCategories$;
    }

    // Otherwise, save the request and return it
    const url = `${this.apiTestUrl}/subcategorias.json`;

    // Use shareReplay(1) to avoid multiple requests
    this.subCategories$ = this.http.get<SubCategory[]>(url).pipe(
      map(subcategories => this.processSubCategories(subcategories)),
      tap(console.log),
      shareReplay(1),
    );
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
