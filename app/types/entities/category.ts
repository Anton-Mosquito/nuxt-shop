/**
 * Product category
 */
export interface Category {
  id: number;
  name: string;
  alias: string;
  parentId?: number;
  description?: string;
  image?: string;
  order?: number;
}

/**
 * Category tree node for nested categories
 * @unused - Reserved for future use
 */
// export interface CategoryTreeNode extends Category {
//   children: CategoryTreeNode[];
//   level: number;
// }
