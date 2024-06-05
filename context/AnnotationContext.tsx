import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { AnnotationService } from "../services/annotationService";
import { AxiosError, AxiosResponse } from "axios";
import { IAnnotation, IAnnotationImages, IChatGPT, IChatGPTReponse, IFiles, IUpdateAnnotation } from "../Types/ITypes";
import { useRouter } from "next/router";
import { FileService } from "../services/filesService";
import { ChatGPTService } from "../services/chatGptService";

export interface AnnotationContextData {
    fetchedAnnotation: IAnnotation
    images: Array<IFiles>
    getAnnotation: (id: string) => void
    isAnnotationLoading: boolean
    create: () => Promise<AxiosResponse<IAnnotation>>
    update: (id: string | string[] | undefined, alias: string) => Promise<AxiosResponse<IUpdateAnnotation>>
    updateAnnotation: (annotation: string, id: string | string[] | undefined) => Promise<AxiosResponse>
    getImages: () => void
    deleteImages: (uploadName: string) => Promise<AxiosResponse | void>
    createImage: (selectedFiles: Array<File>) => Promise<AxiosResponse | void>
    totalImages: number
    hasMore: boolean
    page: number
    chatGpt: (chatGPTBody: IChatGPT) => Promise<AxiosResponse<IChatGPTReponse>>
}

interface AnnotationProviderProps {
    children: ReactNode
}

const AnnotationContext = createContext<AnnotationContextData>({} as AnnotationContextData)


function AnnotationProvider({ children }: AnnotationProviderProps): JSX.Element {
    const [fetchedAnnotation, setFetchedAnnotation] = useState<IAnnotation>({} as IAnnotation)
    const [isAnnotationLoading, setIsAnnotationLoading] = useState<boolean>(false)
    const [images, setImages] = useState<Array<IFiles>>([] as Array<IFiles>)
    const [totalImages, setTotalImages] = useState<number>(0)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [page, setPage] = useState<number>(1)

    const router = useRouter();

    useEffect(() => {
        if (images.length === totalImages) {
            setHasMore(false)
        } else {
            setHasMore(true)
        }
    }, [images])

    async function getAnnotation(id: string) {
        setIsAnnotationLoading(true)
        await AnnotationService.findByAliasOrId(id).then(response => {
            setFetchedAnnotation(response.data)
            setIsAnnotationLoading(false)
        })
            .catch(() => {
                setIsAnnotationLoading(false)
            })
    }

    async function create(): Promise<AxiosResponse<IAnnotation>> {
        try {
            setIsAnnotationLoading(true)
            const response = await AnnotationService.createAnnotation()

            setFetchedAnnotation(response.data)
            return response

        } catch (error) {
            throw Error()
        } finally {
            setIsAnnotationLoading(false);
        }
    }

    async function update(id: string | string[] | undefined, alias: string): Promise<AxiosResponse<IUpdateAnnotation>> {
        try {
            setIsAnnotationLoading(true)
            const response = await AnnotationService.updateAlias(id, alias)

            if (id) {
                const annotationId = Array.isArray(id) ? id[0] : id;
                setFetchedAnnotation(prevState => ({ ...prevState, _id: annotationId, alias: alias }))
            }
            router.push(`/${alias}`);
            setIsAnnotationLoading(false);

            return response

        } catch (error) {
            if (error instanceof AxiosError) {
                const message = error?.response?.data.message || 'An error occurred';
                throw Error(message)
            } else {
                throw Error()
            }
        }
        finally {
            setIsAnnotationLoading(false);
        }
    }

    async function updateAnnotation(annotation: string, id: string | string[] | undefined): Promise<AxiosResponse> {
        try {
            setIsAnnotationLoading(true)
            const response = await AnnotationService.updateAnnotationData(annotation, id)

            setFetchedAnnotation(prevState => ({ ...prevState, data: annotation }))

            return response
        } catch (error) {
            throw Error()
        } finally {
            setIsAnnotationLoading(false);
        }
    }

    async function getImages() {
        try {
            setIsAnnotationLoading(true)

            const offset = (page - 1) * 15

            const response = await FileService.getAllAnnotationImages(fetchedAnnotation._id, 15, offset)

            if (images.length > 0) {
                setImages(prevState => ([...prevState, ...response.data.fileDataList]))
            } else {
                setImages(response.data.fileDataList)
                setTotalImages(response.data.metadata.count)
            }
            setPage(page + 1)
            setIsAnnotationLoading(false)
        } catch (error) {
            throw Error('Erro ao tentar carregar imagens!')
        }
    }

    async function deleteImages(uploadName: string) {
        try {
            setIsAnnotationLoading(true)
            const file = images.find((image) => image.uploadName === uploadName)


            if (file === undefined) {
                setIsAnnotationLoading(true)
                return
            }

            const imagesRequest: IAnnotationImages = {
                filename: file.uploadName,
                path: fetchedAnnotation._id
            }

            await FileService.deleteAnnotationImages(imagesRequest)

            setImages((prevState) => prevState.filter(image => image.uploadName !== file.uploadName))
        } catch (error) {
            throw Error('Erro ao tentar deletar imagem!')
        } finally {
            setIsAnnotationLoading(false);
        }
    }


    async function createImage(selectedFiles: Array<File>) {
        try {
            setIsAnnotationLoading(true)
            selectedFiles.map(async (file: any) => {
                const formData = new FormData();
                formData.append('file', file, file.name);
                formData.append('path', fetchedAnnotation._id);
                await FileService.createImages(formData).then((response) => {
                    setImages((prevState) => [...prevState, response.data])
                    setTotalImages(totalImages + 1)
                })
            });
        } catch (error) {
            throw Error('Erro ao tentar deletar imagem!')
        } finally {
            setIsAnnotationLoading(false);
        }
    }

    async function chatGpt(chatGPTBody: IChatGPT) {
        try {
            const response = await ChatGPTService.endpoint(chatGPTBody)

            return response
        } catch (error) {
            throw Error(`Erro ao tentar ${chatGPTBody.funcao}!`)
        }
    }


    useEffect(() => {
        if (fetchedAnnotation._id) {
            getImages()
        }
    }, [fetchedAnnotation._id])


    return (
        <AnnotationContext.Provider value={{
            fetchedAnnotation,
            getAnnotation,
            isAnnotationLoading,
            create,
            update,
            updateAnnotation,
            getImages,
            images,
            deleteImages,
            createImage,
            hasMore,
            page,
            totalImages,
            chatGpt
        }}>
            {children}
        </AnnotationContext.Provider>
    )
}

export {
    AnnotationProvider,
    AnnotationContext
}