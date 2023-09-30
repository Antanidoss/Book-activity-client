export type UserFilterResultType = {
    users: {
        totalCount: number,
        items:  UserOfListType[]
    }
}

type UserOfListType = {
    id: string,
    userName: string,
    avatarDataBase64: string,
    isSubscriber: boolean,
    isSubscription: boolean,
    activeBookCount: number,
    bookOpinionCount: number
}