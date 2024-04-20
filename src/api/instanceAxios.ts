import axios from "axios";

export const SERVER_ADDRESS =  process.env.REACT_APP_SERVER_ADDRESS;

const instanceAxios = axios.create({
    withCredentials: true,
    baseURL: SERVER_ADDRESS,
})

instanceAxios.defaults.headers.common["Authorization"] = localStorage.getItem("Authorization") as string;

export type ResponseType<D = {}> = {
    result: D,
    success: boolean,
    errorMessage: string
}

export type GraphqlResponseType<D = unknown> = {
    data: D
}

export const isBadStatusCode = (status: number) => {
    return status > 204;
}

export const setConnectionId = (connectionId: string) => {
    instanceAxios.defaults.headers.common["ConnectionId"] = connectionId;
}

export const setAuthorizationToken = (token: string) => {
    instanceAxios.defaults.headers.common["Authorization"] = token;
}

export default instanceAxios;