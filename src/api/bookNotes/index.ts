import { instanceAxios } from "../instanceAxios";

export const bookNoteApi = {
  addBookNote(activeBookId: string, note: string, noteColor: string, noteTextColor: string,) {
    return instanceAxios.post("/bookNote/add", { activeBookId, note, noteColor, noteTextColor })
  },
}