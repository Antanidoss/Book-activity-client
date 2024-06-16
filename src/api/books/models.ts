export type AddBook = {
  title: string;
  description: string;
  image: Blob;
  authorIds: Array<string>;
  categoryIds: Array<string>;
};
