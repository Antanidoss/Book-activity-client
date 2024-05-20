import { UploadChangeParam, UploadFile } from "antd/lib/upload";
import instanceAxios from "../instanceAxios";
import { ResponseType } from "../instanceAxios";

export const ocrApi = {
    getTextOnImage(image: UploadChangeParam<UploadFile>) {
        const formData = new FormData();
        formData.append("image", image.file.originFileObj as Blob, image.file.originFileObj?.name);

        instanceAxios.defaults.headers.post["Content-Type"] = "multipart/form-data";

        return instanceAxios.post<ResponseType<string>>(`/ocr/get`, formData)
            .then(r => r.data);
    }
}