import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SubcategoryPresentationComponent } from './components/subcategory-presentation/subcategory-presentation.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    HomeComponent,
    ProductCardComponent,
    ProductsListComponent,
    SubcategoryPresentationComponent,
    ProductFiltersComponent,
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,

    // Angular Material
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
  ],
})
export class StoreModule { }
