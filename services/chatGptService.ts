import { AxiosResponse } from "axios";
import { api } from "./api";
import { Funcao, IChatGPT, IChatGPTReponse } from "../Types/ITypes";

class ChatGPTService {
    static async endpoint(chatGPTBody: IChatGPT): Promise<AxiosResponse<IChatGPTReponse>> {
        let endpointURL = ''

        switch (chatGPTBody.funcao) {
            case Funcao.Resumir:
                endpointURL = 'summarize';
                break;
            case Funcao.Destacar:
                endpointURL = 'highlight';
                break;
            case Funcao.Organizar:
                endpointURL = 'rearrange';
                break;
            case Funcao.Explicar:
                endpointURL = 'explain';
                break;
            case Funcao.Questionar:
                endpointURL = 'questionize';
                break;
            case Funcao.Topificar:
                endpointURL = 'topify';
                break;
            case Funcao.Corrigir:
                endpointURL = 'fix';
                break;
            default:
                throw new Error(`Função não suportada: ${chatGPTBody.funcao}`);
        }

        const response = await api.post(`/chat-gpt/${endpointURL}`, {
            text: chatGPTBody.text
        })

        return response
    };
}


export {
    ChatGPTService
}