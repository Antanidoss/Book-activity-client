import { UploadChangeParam, UploadFile } from "antd/lib/upload"

export type AddBookModelType = {
    title: string,
    description: string,
    image: UploadChangeParam<UploadFile>,
    authorIds: Array<string>
}