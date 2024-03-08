export interface SignalRNotification {
    NotificationId: string,
    MessageNotification: string,
    fromUser?: {
        UserId: string,
        AvatarDataBase64: string
    }
}