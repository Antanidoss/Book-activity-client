export type GetCategoriesByTitle = {
  categories: {
    items: GetCategoriesByTitleItem[];
  };
};
export type GetCategoriesByTitleItem = {
  id: string;
  title: string;
};
