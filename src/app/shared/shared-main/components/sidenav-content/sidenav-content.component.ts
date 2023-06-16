import { Component } from '@angular/core';
import { TreeNode } from 'src/app/store/models/tree.model';

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss']
})
export class SidenavContentComponent {

  // FIXME: THIS IS TEMP DATA

  readonly categories: TreeNode[] = [
    {
      name: 'Categoría 1',
      children: [
        {
          name: 'Subcategoría 1',
          redirect: 'auth',
        },
      ],
    },
    {
      name: 'Categoría 2',
      children: [
        {
          name: 'Subcategoría 1',
          redirect: 'auth',
        },
      ],
    },
  ];

  // ---

}
