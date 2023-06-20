import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() product?: Product;
  @Input() vertical: boolean = false;

  // Note: Im not sure if this is the best way to do this, but with this input,
  // we can set the priority image to be shown in the product card based on the index of the item to be shown.
  // I make sure that the priority image is only set once.
  @Input() set priorityImage(value: boolean) {
    if (this.priority === undefined) {
      this.priority = value;
    }
  }

  productsInCart: number = 0;
  priority?: boolean;

  constructor(
    private shoppingService: ShoppingService,
  ) { }

  ngOnInit(): void {
    if (this.product) {
      this.productsInCart = this.shoppingService.getProductQuantityInCart(this.product);
    }
  }

  public onAddProductToCart(): void {
    if (this.product) {
      this.productsInCart = this.shoppingService.addProductToCart(this.product);
    }
  }

  public onRemoveProductFromCart(): void {
    if (this.product) {
      this.productsInCart = this.shoppingService.removeProductFromCart(this.product);
    }
  }

}
