export interface ICategory {
  id: number;
  name: string;
  alias: string;
}

export interface IGetCategoriesResponse {
  categories: ICategory[];
}
