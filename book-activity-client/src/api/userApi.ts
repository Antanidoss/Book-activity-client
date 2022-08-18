import instanceAxios from "./instanceAxios";
import { ResponseType } from "./instanceAxios";

type AuthUserResponseType = {
    userName: string,
    email: string,
    token: string
}

export const userApi = {
    auth(email: string, password: string, rememberMe: boolean) {
        return instanceAxios.post<ResponseType<AuthUserResponseType>>("/user/authentication", { email, password, rememberMe })
            .then(r => r.data)
    }
}