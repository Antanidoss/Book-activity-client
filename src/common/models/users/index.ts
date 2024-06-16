export type UserFilterType = {
  name: string | null;
};

export type CurrentUserType = {
  id: string;
  avatarImage: ArrayBuffer | null;
  userName: string;
  roles: string[];
};
