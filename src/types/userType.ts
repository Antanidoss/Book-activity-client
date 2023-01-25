export type UserType = {
    id: string,
    name: string,
    email?: string,
    avatarImage: ArrayBuffer | null,
    userSubscriptions?: Array<UserType>,
    isSubscription?: boolean,
    isSubscriber?: boolean
 }