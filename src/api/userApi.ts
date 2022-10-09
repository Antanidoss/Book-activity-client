import instanceAxios from "./instanceAxios";
import { ResponseType } from "./instanceAxios";

type AuthUserResponseType = {
    id: string,
    userName: string,
    email: string,
    token: string,
    avatarImage: ArrayBuffer
}

type CurrentUserType = {
    id: string,
    userName: string,
    email: string,
    token: string,
    avatarImage: ArrayBuffer
}

export const userApi = {
    auth(email: string, password: string, rememberMe: boolean) {
        return instanceAxios.post<ResponseType<AuthUserResponseType>>("/user/authentication", { email, password, rememberMe })
            .then(r => {
                if (r.data.result != null)
                    localStorage.setItem("Authorization", r.data.result.token);
                    
                return r.data;
            })
    },
    getCurrentUser() {
        return instanceAxios.get<ResponseType<CurrentUserType>>("/user/getCurrentUser")
            .then(r => {
                localStorage.setItem("Authorization", r.data.result.token);
                return r.data;
            })
    }
}