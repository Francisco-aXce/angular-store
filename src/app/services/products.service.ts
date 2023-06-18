import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../store/models/product.model';

@Injectable()
export class ProductsService {

  private readonly apiTestUrl = environment.apiTestUrl;

  constructor(
    private http: HttpClient
  ) { }



  // #region Requests

  getProducts(): Observable<Product[]> {
    const url = `${this.apiTestUrl}/productos.json`;

    return this.http.get<Product[]>(url);
  }

  // #endregion

}
