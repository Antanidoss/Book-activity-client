import { UploadChangeParam, UploadFile } from "antd/lib/upload";
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
                if (r.data.result != null) {
                    localStorage.setItem("Authorization", r.data.result.token);
                }

                return r.data;
            })
    },
    getCurrentUser() {
        return instanceAxios.get<ResponseType<CurrentUserType>>("/user/getCurrentUser")
            .then(r => {
                if (r.data.result !== null) {
                    localStorage.setItem("Authorization", r.data.result.token);
                }

                return r.data;
            })
    },
    addUser(userName: string, email: string, password: string, avatarImage: UploadChangeParam<UploadFile>) {
        var formData = new FormData();
        formData.append("name", userName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("avatarImage", avatarImage.file.originFileObj as Blob);

        return instanceAxios.post("/user/add", formData)
    }
}