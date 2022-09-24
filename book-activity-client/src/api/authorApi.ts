import instanceAxios from "./instanceAxios";
import { ResponseType } from "./instanceAxios";

export const authorApi = {
    addAuthor(firstName: string, surname: string, patronymic: string) {
        return instanceAxios.post<ResponseType<string>>(`/author/add?firstName=${firstName}&surname=${surname}&patronymic=${patronymic}`)
            .then(r => r.data);
    }
}