import { Component, Input } from '@angular/core';
import { Category } from 'src/app/store/models/product.model';
import { TreeNode } from 'src/app/shared/shared-main/models/tree.model';

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss']
})
export class SidenavContentComponent {

  @Input() set categories(value: Category[] | null) {
    if (value === null) return;
    this.onCategoriesChange(value);
  }

  treeData: TreeNode[] = [];

  private onCategoriesChange(categories: Category[]): void {
    this.treeData = categories.map(category => ({
      name: category.nombre,
      id: category.id,
      children: category.subCategories?.map(subcategory => ({
        name: subcategory.nombre,
        id: subcategory.id,
      })),
    }));
  }

}
