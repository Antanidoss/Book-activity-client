export type UserOfListType = {
    id: string,
    name: string,
    email?: string,
    avatarImage: string | null,
    isSubscription?: boolean,
    isSubscriber?: boolean,
    activeBookCount?: number,
    bookOpinionCount?: number
 }