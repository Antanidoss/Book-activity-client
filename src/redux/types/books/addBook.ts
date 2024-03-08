import { UploadChangeParam, UploadFile } from "antd/lib/upload"

export type AddBookType = {
    title: string,
    description: string,
    image: UploadChangeParam<UploadFile>,
    authorIds: Array<string>
}

export type AuthorType = {
    id: string,
    firstName: string,
    surname: string
}