import { AxiosResponse } from "axios";
import { api } from "./api";
import { IAnnotation, IUpdateAnnotation } from "../Types/ITypes";

class AnnotationService {
    static async createAnnotation(): Promise<AxiosResponse<IAnnotation>> {
        try {
            const response = await api.post<IAnnotation>('/annotations/',
                {
                    alias: '',
                    password: '',
                    data: ''
                })

            return response
        }
        catch (error) {
            throw new Error();
        }
    }


    static async updateAnnotationData(
        annotation: string,
        id: string | string[] | undefined
    ) {
        try {
            const response = await api.patch(`/annotations/${id}`, JSON.stringify({ data: annotation }), {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })

            return response
        } catch (error) {
            throw new Error();
        }

    };

    static async updateAlias(
        id: string | string[] | undefined,
        alias: string | string[] | undefined
    ): Promise<AxiosResponse<IUpdateAnnotation>> {
        try {
            const response = await api.patch(`/annotations/${id}`, JSON.stringify({ alias: alias }), {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })

            return response
        } catch (error) {
            throw error;
        }
    };

    static async findByAliasOrId(id: string | string[] | undefined) {
        try {
            const response = await api.get<IAnnotation>(`/annotations/${id}/find-by-alias-or-id`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })


            return response;
        } catch (error) {
            throw new Error();
        }
    };


    static async createPasswordAnnotation(id: string | string[] | undefined, password: string) {
        try {
            const response = await api.post(`/annotations/create-password`, {
                aliasOrId: id,
                newEncryptedPassword: password
            })

            return response;
        } catch (error) {
            throw new Error();
        }
    };


    static async removePasswordAnnotation(id: string | string[] | undefined) {
        try {
            const response = await api.post(`/annotations/create-password`, {
                aliasOrId: id
            })

            return response;
        } catch (error) {
            throw new Error();
        }
    };

    static async handleListenComment(commentText: string) {
      try {
        const response = await api.post(`/text-to-speech/sinthesize`, {
          text: commentText,
        });

        const array = Buffer.from(response.data.data, 'base64');
        const blob = new Blob([array], {type: 'audio/wav'})
        const objecturl = URL.createObjectURL(blob);

        return objecturl
      } catch(error) {
        alert('Não foi possivel sintetizar seu comentário.');
      }
  };
}

export {
    AnnotationService
}
