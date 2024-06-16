export type GetBookOpinions = {
  bookOpinions: {
    items: GetBookOpinionsItem[];
  };
};

export type GetBookOpinionsItem = {
  user: {
    id: string;
    avatarDataBase64: string;
    userName: string;
  };
  hasLike: boolean;
  hasDislike: boolean;
  bookId: string;
  grade: number;
  likesCount: number;
  dislikesCount: number;
  description: string;
};

export type GetBookOpinionByUserId = {
  bookOpinions: {
    items: GetBookOpinionByUserIdItem[];
  };
};

export type GetBookOpinionByUserIdItem = {
  likesCount: number;
  dislikesCount: number;
  grade: number;
  description: string;
};
