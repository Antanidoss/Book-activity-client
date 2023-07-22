export type UserFilterResultType = {
    id: string,
    userName: string,
    avatarImage: ArrayBuffer,
    isSubscriber: boolean,
    isSubscription: boolean,
    activeBookCount: number,
    bookOpinionCount: number
}