export interface IAnnotationImages {
    filename: string
    path: string
}

export interface IAnnotation {
    _id: string
    alias: string
    createdAt: string
    updatedAt: string
    __v: number,
    data: string
}

export interface IUpdateAnnotation {
    message: string
    error: string
    statusCode: number
}

export interface IFilesResponse {
    fileDataList: Array<IFiles>
    metadata: {
        count: number
    }
}

export interface IAnnotationCreate {
    file: string
    path: string
}

export interface IFiles {
    contentType: string
    createdAt: string
    downloadURL: string
    originalName: string
    size: number
    updatedAt: string
    uploadName: string
}


export enum Funcao {
    Resumir = 'Resumir',
    Destacar = 'Destacar',
    Organizar = 'Organizar',
    Explicar = 'Explicar',
    Questionar = 'Questionar',
    Topificar = 'Topificar',
    Corrigir = 'Corrigir'
} 


export interface IChatGPT {
    text : string
    funcao: Funcao
}

export interface IChatGPTReponse {
    text : string
}