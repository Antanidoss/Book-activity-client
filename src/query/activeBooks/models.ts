export type GetActiveBooks = {
  activeBooks: {
    totalCount: number;
    items: GetActiveBooksItem[];
  };
};

export type GetActiveBooksItem = {
  id: string;
  totalNumberPages: number;
  numberPagesRead: number;
  book: {
    id: string;
    title: string;
    imageDataBase64: string;
    averageRating: number;
    hasOpinion: boolean;
    bookOpinionCount: number;
  };
};
