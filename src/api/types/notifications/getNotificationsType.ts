export type GetNotificationsType = {
    notifications: {
        items: Array<{
            id: string,
            description: string,
            fromUser?: {
                id: string
                avatarDataBase64?: string
            }
        }> 
    }
}