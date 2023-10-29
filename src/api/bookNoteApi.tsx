import { BookNoteForProfileResultType } from "../types/bookNote/bookNoteForProfile";
import instanceAxios, { GraphqlResponseType } from "./instanceAxios";

export const bookNoteApi = {
  addBookNote(activeBookId: string, note: string, noteColor: string, noteTextColor: string,) {
    return instanceAxios.post("/bookNote/add", { activeBookId, note, noteColor, noteTextColor })
  },
  getLastBookNotes(take: number, userId?: string) {
    let query = `query {
            bookNotes(,
              take: ${take},
              order: { timeOfCreation: DESC },
              userId: "${userId}"
            ) {
              items {
                id
                note
                noteColor
                noteTextColor
                activeBook {
                    book {
                        id
                        title
                    }
                }
              }
            }
          }`

    return instanceAxios.post<GraphqlResponseType<BookNoteForProfileResultType>>(`/graphql`, { query: query }).then(res => res.data.data.bookNotes.items);
  }
}