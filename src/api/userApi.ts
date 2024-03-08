import { UploadChangeParam, UploadFile } from "antd/lib/upload";
import instanceAxios, { GraphqlResponseType, setAuthorizationToken } from "./instanceAxios";
import { ResponseType } from "./instanceAxios";
import { GetUsersByFilterResultType } from "./types/users/getUsersByFilterResultType";
import { GetUserProfileResultType } from "./types/users/getUserProfileResultType";
import { GetUserByFilterType } from "./types/users/getUserByFilterType";
import { AuthUserResultType } from "./types/users/authUserResultType";
import { GetCurrentUserResultType } from "./types/users/getCurrentUserResultType";

export const userApi = {
    auth(email: string, password: string, rememberMe: boolean) {
        return instanceAxios.post<ResponseType<AuthUserResultType>>("/user/authentication", { email, password, rememberMe })
            .then(r => {
                if (r.data.result != null) {
                    localStorage.setItem("Authorization", r.data.result.token);
                    setAuthorizationToken(r.data.result.token);
                }

                return r.data;
            })
    },
    getCurrentUser() {
        return instanceAxios.get<ResponseType<GetCurrentUserResultType>>("/user/getCurrentUser")
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

        return instanceAxios.post<ResponseType>("/user/add", formData)
            .then(() => ({ success: true, errorMessage: "" }))
            .catch(error => ({ success: false, errorMessage: error.response.data }))
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
    getUsersByFilter(filter: GetUserByFilterType, skip: number, take: number) {
        let where = filter.name === null ? "" : `where: { userName: { contains: ${"\"" + filter.name + "\""} } }`
        const query = `query {
            users(skip: ${skip}, take: ${take}, ${where}) {
                items {
                  id
                  userName
                  avatarDataBase64
                  isSubscribed
                  isSubscription
                  activeBookCount
                  bookOpinionCount
                }
                totalCount
              }
        }`

        return instanceAxios.post<GraphqlResponseType<GetUsersByFilterResultType>>(`/graphql`, { query }).then(res => res.data);
    },
    subscribeToUser(userId: string) {
        return instanceAxios.put(`/user/subscribeUser?subscribedUserId=${userId}`);
    },
    unsubscribeUser(userId: string) {
        return instanceAxios.delete(`/user/unsubscribe?unsubscribedUserId=${userId}`);
    },
    getUserProfile(userId: string, forCurrentUser: boolean) {
        const query = `query {
            userById(userId: "${userId}") {
                id
                userName
                avatarDataBase64
                subscriptionsCount
                subscribersCount
                ${forCurrentUser ? "" : "isSubscribed"}
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

        return instanceAxios.post<GraphqlResponseType<GetUserProfileResultType>>(`/graphql`, { query }).then(res => res.data.data.userById);
    }
}