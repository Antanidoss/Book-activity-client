import { UploadChangeParam, UploadFile } from "antd/lib/upload"

export type AddBookType = {
    title: string,
    description: string,
    image: UploadChangeParam<UploadFile>,
    authorIds: Array<string>
}