import { Product } from "src/app/store/models/product.model";

export interface ShoppingProducts {
  // Key is the product id, and contains an array of products with the same id.
  // This way we can show the user the quantity of "different" products added to the cart.
  [key: string]: Product[];
}
