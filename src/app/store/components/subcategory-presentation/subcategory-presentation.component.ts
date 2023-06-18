import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SubCategory } from '../../models/product.model';

@Component({
  selector: 'app-subcategory-presentation',
  templateUrl: './subcategory-presentation.component.html',
  styleUrls: ['./subcategory-presentation.component.scss']
})
export class SubcategoryPresentationComponent implements OnChanges {

  @Input() subcategories: SubCategory[] = [];
  @Input() selectedSubcategoryId: number = 0;

  selectedSubcategory?: SubCategory;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedSubcategoryId']) {
      this.selectedSubcategory = this.subcategories.find(subcategory => subcategory.id === this.selectedSubcategoryId);
    }
  }

}
