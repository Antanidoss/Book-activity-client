export type UserProfileType = {
    id: string,
    userName: string,
    avatarDataBase64: string,
    subscriptionsCount: number,
    subscribersCount: number,
    isSubscribed: boolean
}

export type BookNoteType = {
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