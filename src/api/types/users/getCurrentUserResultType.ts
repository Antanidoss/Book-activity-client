export type GetCurrentUserResultType = {
    id: string,
    userName: string,
    email: string,
    token: string,
    avatarImage: ArrayBuffer,
    roles: string[]
}