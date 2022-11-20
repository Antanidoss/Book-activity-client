import { NoteColor } from "../types/bookNoteType";
import instanceAxios from "./instanceAxios";

export const bookNoteApi = {
    addBookNote(activeBookId: string, note: string, noteColor: NoteColor) {
        return instanceAxios.post("/bookNote/add", {activeBookId, note, noteColor})
    }
}