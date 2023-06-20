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
  image = '';
  srcSet = '';

  constructor(
    private shoppingService: ShoppingService,
  ) { }

  ngOnInit(): void {
    if (this.product) {
      this.productsInCart = this.shoppingService.getProductQuantityInCart(this.product);

      // Images
      const normalImage = 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_' + this.product?.imagenes?.[0]?.nombre + '.jpg';
      const medImage = 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_' + this.product?.imagenes?.[0]?.nombre + '-med.jpg';
      // Passed to te src attribute of the img tag
      this.image = normalImage;
      this.srcSet = `${medImage} 600w, ${normalImage} 2000w`;
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
