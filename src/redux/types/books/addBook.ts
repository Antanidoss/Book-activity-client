import { UploadChangeParam, UploadFile } from "antd/lib/upload"

export type AddBookType = {
    title: string,
    description: string,
    image: UploadChangeParam<UploadFile>,
    authorIds: Array<string>,
    categoryIds: Array<string>
}

export type AuthorType = {
    id: string,
    firstName: string,
    surname: string
}

export type CategoryType = {
    id: string,
    title: string
}