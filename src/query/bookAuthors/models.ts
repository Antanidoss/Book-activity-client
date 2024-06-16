export type GetAuthorsByName = {
  authors: {
    items: GetAuthorsByNameItem[];
  };
};

export type GetAuthorsByNameItem = {
  id: string;
  firstName: string;
  surname: string;
};
