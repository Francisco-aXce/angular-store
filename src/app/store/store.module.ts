import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ProductsService } from '../services/products.service';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    StoreRoutingModule
  ],
  providers: [
    ProductsService,
  ],
})
export class StoreModule { }
