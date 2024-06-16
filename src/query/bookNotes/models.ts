export type GetLastBookNotesType = {
  bookNotes: {
    items: Array<{
      id: string;
      note: string;
      noteColor: string;
      noteTextColor: string;
      activeBook: {
        book: {
          id: string;
          title: string;
        };
      };
    }>;
  };
};
