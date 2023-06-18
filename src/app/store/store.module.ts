import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ProductsService } from '../services/products.service';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    HomeComponent,
    ProductCardComponent,
    ProductsListComponent,
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,

    // Angular Material
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    ProductsService,
  ],
})
export class StoreModule { }
