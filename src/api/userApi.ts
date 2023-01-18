import { UploadChangeParam, UploadFile } from "antd/lib/upload";
import { FilterResultType } from "../types/api/filterResultType";
import { UserFilterResultType } from "../types/api/userFilterResultType";
import { UserFilterType } from "../types/api/userFilterType";
import instanceAxios, { setAuthorizationToken } from "./instanceAxios";
import { ResponseType } from "./instanceAxios";

type AuthUserResponseType = {
    userId: string,
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
                    setAuthorizationToken(r.data.result.token);
                }

                return r.data;
            })
    },
    getCurrentUser() {
        return instanceAxios.get<ResponseType<CurrentUserType>>("/user/getCurrentUser")
            .then(r => {
                if (r.data.result !== null) {
                    localStorage.setItem("Authorization", r.data.result.token);
                    setAuthorizationToken(r.data.result.token);
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
    },
    updateUser(userId: string, userName: string, avatarImage: UploadChangeParam<UploadFile>) {
        var formData = new FormData();
        formData.append("userId", userId);
        formData.append("name", userName);
        formData.append("avatarImage", avatarImage.file.originFileObj as Blob);

        return instanceAxios.post("/user/update", formData)
    },
    getUsersByFilter(filter: UserFilterType, skip: number, take: number) {
        return instanceAxios.get<FilterResultType<UserFilterResultType>>("/user/getUsersByFilter", {
            params: {
                name: filter.name,
                skip,
                take
            }
        }).then(res => res.data)
    },
    subscribeToUser(userId: string) {
        return instanceAxios.put(`/user/subscribeUser?subscribedUserId=${userId}`);
    }
}