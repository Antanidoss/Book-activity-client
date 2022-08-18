import axios from "axios";

const instanceAxios = axios.create({
    withCredentials: true,
    baseURL: "https://localhost:44395",
})

export type ResponseType<D = {}> = {
    result: D,
    success: boolean,
    errorMessage: string
}

export default instanceAxios;