export type AddNotificationType = {
    notificationId: string,
    messageNotification: string,
    fromUser?: {
        userId: string,
        avatarImage?: string
    }
}