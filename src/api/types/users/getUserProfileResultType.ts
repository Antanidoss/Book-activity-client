export type GetUserProfileResultType = {
    userById: {
        id: string,
        userName: string,
        avatarDataBase64: string,
        subscriptionsCount: number,
        subscribersCount: number,
        isSubscribed: boolean
    }
}