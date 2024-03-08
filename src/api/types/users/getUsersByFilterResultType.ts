export type GetUsersByFilterResultType = {
    users: {
        totalCount: number,
        items: Array<{
            id: string,
            userName: string,
            avatarDataBase64: string,
            isSubscriber: boolean,
            isSubscription: boolean,
            activeBookCount: number,
            bookOpinionCount: number
        }>
    }
}