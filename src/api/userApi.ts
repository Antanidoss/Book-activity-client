import { UploadChangeParam, UploadFile } from "antd/lib/upload";
import { AuthUserResponseType } from "../types/users/authUserResponseType";
import { CurrentUserResponseType } from "../types/users/currentUserResponseType";
import { FilterResultType } from "../types/common/filterResultType";
import { UserFilterResultType } from "../types/users/userFilterResultType";
import { UserFilterType } from "../types/users/userFilterType";
import instanceAxios, { GraphqlResponseType, setAuthorizationToken } from "./instanceAxios";
import { ResponseType } from "./instanceAxios";
import { UserProfileType } from "../types/users/userProfileType";

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
        return instanceAxios.get<ResponseType<CurrentUserResponseType>>("/user/getCurrentUser")
            .then(r => {
                if (r.data.result !== null) {
                    localStorage.setItem("Authorization", r.data.result.token);
                    setAuthorizationToken(r.data.result.token);
                }

                return r.data;
            })
    },
    addUser(userName: string, email: string, password: string, avatarImage: UploadChangeParam<UploadFile> | undefined) {
        var formData = new FormData();
        formData.append("name", userName);
        formData.append("email", email);
        formData.append("password", password);

        if (avatarImage !== undefined) {
            formData.append("avatarImage", avatarImage.file.originFileObj as Blob);
        }

        return instanceAxios.post("/user/add", formData)
    },
    updateUser(userId: string, userName: string, avatarImage: UploadChangeParam<UploadFile> | undefined) {
        var formData = new FormData();
        formData.append("userId", userId);
        formData.append("name", userName);

        if (avatarImage !== undefined) {
            formData.append("avatarImage", avatarImage.file.originFileObj as Blob);
        }

        return instanceAxios.post("/user/update", formData)
    },
    getUsersByFilter(filter: UserFilterType, skip: number, take: number, currentUserId?: string) {
        return instanceAxios.get<FilterResultType<UserFilterResultType>>("/user/getByFilter", {
            params: {
                name: filter.name,
                skip,
                take,
                currentUserId
            }
        }).then(res => res.data)
    },
    subscribeToUser(userId: string) {
        return instanceAxios.put(`/user/subscribeUser?subscribedUserId=${userId}`);
    },
    unsubscribeUser(userId: string) {
        return instanceAxios.delete(`/user/unsubscribe?unsubscribedUserId=${userId}`);
    },
    getUserProfile(userId: string, forCurrentUser: boolean) {
        let query = `query {
            userById(userId: "${userId}") {
                id
                userName
                avatarImage
                subscriptionsCount
                subscribersCount
                ${ forCurrentUser ? "" : "isSubscribed" }
                activeBooks {
                    id
                    totalNumberPages
                    numberPagesRead
                    book {
                      id
                      title
                      imageDataBase64
                    }
                }
            }
        }`

        return instanceAxios.post<GraphqlResponseType<{userById: UserProfileType}>>(`/graphql`, { query: query }).then(res => res.data.data.userById);
    }
}