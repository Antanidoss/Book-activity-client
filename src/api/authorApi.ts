import { AuthorType } from "../types/authorType";
import instanceAxios from "./instanceAxios";
import { ResponseType } from "./instanceAxios";

export const authorApi = {
    addAuthor(firstName: string, surname: string) {
        return instanceAxios.post<ResponseType<string>>(`/author/add?firstName=${firstName}&surname=${surname}`)
            .then(r => r.data);
    },
    getAuthorsByName(name: string, take: number) {
        return instanceAxios.get<ResponseType<Array<AuthorType>>>(`/author/getByName?name=${name}&take=${take}`)
            .then(r => r.data);
    },
}