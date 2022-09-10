import instanceAxios from "./instanceAxios";
import { ResponseType } from "./instanceAxios";

type AuthUserResponseType = {
    userId: string,
    userName: string,
    email: string,
    token: string
}

type CurrentUserType = {
    userId: string,
    userName: string,
    email: string,
    token: string
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
        instanceAxios.defaults.headers.common["Authorization"] = localStorage.getItem("Authorization") as string;
        return instanceAxios.get<ResponseType<CurrentUserType>>("/user/getCurrentUser")
            .then(r => {
                localStorage.setItem("Authorization", r.data.result.token);
                return r.data;
            })
    }
}