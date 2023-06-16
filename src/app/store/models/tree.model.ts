/**
 * Each node has a name and an optional list of children.
 */
export interface TreeNode {
  name: string;
  redirect?: string;
  children?: TreeNode[];
}
