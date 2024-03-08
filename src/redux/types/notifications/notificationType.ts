export type NotificationType = {
    id: string,
    description: string,
    fromUser?: {
        id: string
        avatarDataBase64?: string
    }
}