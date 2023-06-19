import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { SidenavContentComponent } from './components/sidenav-content/sidenav-content.component';
import { NestedTreeComponent } from './components/nested-tree/nested-tree.component';
import { RouterModule } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    NavbarComponent,
    SidenavContentComponent,
    NestedTreeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,

    // Angular Material
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatTreeModule,
    MatBadgeModule,
  ],
  providers: [
    ProductsService,
  ],
  exports: [
    NavbarComponent,
  ],
})
export class SharedMainModule { }
