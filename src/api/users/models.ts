export type GetCurrentUser = {
    id: string,
    userName: string,
    email: string,
    token: string,
    avatarImage: ArrayBuffer,
    roles: string[]
}

export type AuthUser = {
    userId: string,
    userName: string,
    email: string,
    token: string,
    avatarImage: ArrayBuffer,
    roles: string[]
}