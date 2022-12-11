export type ActiveBookFilterResultType = {
    id: string,
    totalNumberPages: number,
    numberPagesRead: number,
    bookTitle: string,
    bookId: string,
    imageData: ArrayBuffer,
    notes?: Array<{
        id: string,
        note: string,
        noteColor: number
    }>
}