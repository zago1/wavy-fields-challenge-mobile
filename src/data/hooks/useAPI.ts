import { useCallback } from 'react'

import { API } from '../api';
import { AxiosError } from 'axios';

interface UseAPIResponse<T> {
    ok: boolean;
    data: T,
    error?: any;
}

export default function useAPI<T = any, R = any>() {
    const httpGet = async (uri: string): Promise<UseAPIResponse<T | null>> => {
        try {
            const res = await API.get<T>(uri);
            return {
                ok: true,
                data: res.data
            };
        } catch (error) {
            let errorMessage = error;
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data;
            }

            return {
                ok: false,
                data: null,
                error: errorMessage
            }
        }
    };

    const httpPost = async (uri: string, body: T): Promise<UseAPIResponse<R | null>> => {
        try {
            const res = await API.post<R>(uri, body);

            return {
                ok: true,
                data: res.data,
            }

        } catch (error) {
            console.log('[err]', error);
            let errorMessage = error;
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data;
            }

            return {
                ok: false,
                data: null,
                error: errorMessage
            }
        }
    };

    const httpPatch = async (uri: string, body: T): Promise<UseAPIResponse<R | null>> => {
        try {
            const res = await API.patch<R>(uri, body);

            return {
                ok: true,
                data: res.data
            }
        } catch (error) {
            let errorMessage = error;
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data;
            }

            return {
                ok: false,
                data: null,
                error: errorMessage
            }
        }
    }

    const httpDelete = async (uri: string): Promise<UseAPIResponse<null>> => {
        try {
            await API.delete(uri);

            return {
                ok: true,
                data: null
            }
        } catch (error) {
            let errorMessage = error;
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data;
            }

            return {
                ok: false,
                data: null,
                error: errorMessage
            }
        }
    }

    return { httpGet, httpPost, httpPatch, httpDelete };
}
