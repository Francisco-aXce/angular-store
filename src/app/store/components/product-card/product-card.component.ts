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

  productsInCart: number = 0;

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
