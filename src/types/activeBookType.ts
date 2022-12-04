import { BookNoteType } from "./bookNoteType"

export type ActiveBook = {
    id: string,
    totalNumberPages: number,
    numberPagesRead: number,
    bookId: string,
    bookTitle: string,
    imageData: ArrayBuffer,
    notes?: Array<BookNoteType>
}