import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TreeNode } from 'src/app/shared/shared-main/models/tree.model';

@Component({
  selector: 'app-nested-tree',
  templateUrl: './nested-tree.component.html',
  styleUrls: ['./nested-tree.component.scss']
})
export class NestedTreeComponent {

  @Input() set data(value: TreeNode[]) {
    this.dataSource.data = value;
  }

  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

}
