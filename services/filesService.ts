import { AxiosResponse } from "axios";
import { api } from "./api";
import { IAnnotationImages, IFiles, IFilesResponse } from "../Types/ITypes";


class FileService {
    static async getAllAnnotationImages (path: string | string[] | undefined, limit: number = 10, offset: number = 0): Promise<AxiosResponse<IFilesResponse>> {
        const response = await api.get(`/files/${path}?limit=${limit}&offset=${offset}`)

        return response
    };

    static async deleteAllAnnotationImages (path: string) {
        const response = await api.delete(`/files/${path}`)

        return response
    };

    static async deleteAnnotationImages (body: IAnnotationImages) {
        const response = await api.delete(`/files/${body.path}/${body.filename}`)

        return response
    };

    static async createImages (formData: FormData): Promise<AxiosResponse<IFiles>> {
        const response = await api.post(`/files`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }

        })

        return response
    };
}

export {
    FileService
}

