export type GetUserProfile = {
    userById: {
        id: string,
        userName: string,
        avatarDataBase64: string,
        subscriptionsCount: number,
        subscribersCount: number,
        isSubscribed: boolean
    }
}

export type GetUsers = {
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