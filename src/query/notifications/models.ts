export type GetNotifications = {
    notifications: {
        items: GetNotificationsItem[]
    }
}

export type GetNotificationsItem = {
    id: string,
    description: string,
    fromUser?: {
        id: string
        avatarDataBase64?: string
    }
}