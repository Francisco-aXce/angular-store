import { Injectable } from '@angular/core';
import { ShoppingProducts } from '../shared/shared-main/models/shopping.model';
import { Product } from '../store/models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

/*
  As the requiremnts say, the user must be able to see the quantity of products added to the cart,
  that means that the service can be provided in the root of the application.
*/
@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  // BehaviorSubject to notify the user when a product is added to the cart.
  readonly products$: BehaviorSubject<ShoppingProducts>;
  readonly totalProducts$: Observable<number>;
  readonly totalDifferentProducts$: Observable<number>;

  // Key to store the cart in the local storage.
  private static readonly CART_KEY = 'store_cart';

  constructor() {
    // Get the cart from the local storage.
    const cart = localStorage.getItem(ShoppingService.CART_KEY);
    // If the cart exists, we parse it to a JSON object, if not, we initialize it as an empty object.
    const parsedCart = cart ? JSON.parse(cart) : {};

    this.products$ = new BehaviorSubject<ShoppingProducts>(parsedCart);
    this.totalProducts$ = this.products$.pipe(
      map((products) => Object.values(products).reduce((acc, curr) => acc + curr.length, 0)),
      shareReplay(),
    );
    this.totalDifferentProducts$ = this.products$.pipe(
      map((products) => Object.keys(products).length),
      shareReplay(),
    );
  }

  /**
   * Adds a product to the cart and returns the quantity of the same product added to the cart.
   * @param {Product} product Product to be added to the cart.
   * @returns {number} Quantity of the same product added to the cart.
   */
  public addProductToCart(product: Product): number {
    const productId = product.id_producto.toString();
    const currentCart = this.products$.getValue();
    const currentProductInCart = currentCart[productId]?.length ?? 0;

    // Only add the product to the cart if the quantity of the same product added to the cart is less than the stock.
    if (currentProductInCart < product.stock) {

      if (currentCart[productId]) {
        // If a same product is added to the cart, we just add it to the array of products with the same id.
        currentCart[productId].push(product);
      } else {
        // If not, we create a new array with the product.
        currentCart[productId] = [product];
      }

      // Notify the user that a product was added to the cart.
      this.saveCart(currentCart);

    }

    // Return the quantity of the same product added to the cart.
    return currentCart[productId].length;
  };

  /**
   * Removes a product from the cart and returns the quantity of the same product in the cart.
   * @param {Product} product Product to be removed from the cart.
   * @returns {number} Quantity of the same product in the cart.
   */
  public removeProductFromCart(product: Product): number {
    const productId = product.id_producto.toString();
    const currentCart = this.products$.getValue();
    const currentProductInCart = currentCart[productId]?.length ?? 0;

    // Only remove the product from the cart if the quantity of the same product in the cart is greater than 0.
    if (currentProductInCart > 0) {

      // Remove the product from the array of products with the same id.
      currentCart?.[productId]?.pop?.();

      // Make sure every field in the cart is not empty.
      Object.keys(currentCart).forEach((key) => {
        if (currentCart[key].length <= 0) {
          delete currentCart[key];
        }
      });

      // Notify the user that a product was removed from the cart.
      this.saveCart(currentCart);
    }

    // Return the quantity of the same product in the cart.
    return currentCart[productId]?.length ?? 0;
  }

  /**
   * Returns the quantity of the same product added to the cart.
   * @param product Product to be checked.
   * @returns Quantity of the same product added to the cart.
   */
  public getProductQuantityInCart(product: Product): number {
    const productId = product.id_producto?.toString();
    const currentCart = this.products$.getValue();
    return currentCart[productId]?.length ?? 0;
  }

  /**
   * Saves the cart in the local storage and notifies the user that a product was added to the cart.
   * @param cart Cart to be saved in the local storage.
   */
  private saveCart(cart: ShoppingProducts): void {
    localStorage.setItem(ShoppingService.CART_KEY, JSON.stringify(cart));
    this.products$.next(cart);
  }

}
