export type BookNoteForProfileType = {
    id: string,
    note: string,
    noteColor: string,
    noteTextColor: string,
    activeBook: {
        book: {
            id: string,
            title: string
        }
    }
}

export type BookNoteForProfileResultType = {
    bookNotes: {
        items: BookNoteForProfileType[]
    }
}