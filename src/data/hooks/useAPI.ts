import { useCallback } from 'react'

import { API } from '../api';

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
            console.log('[err]', error);
            return {
                ok: false,
                data: null,
                error,
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
            return {
                ok: false,
                data: null,
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
            return {
                ok: false,
                error,
                data: null
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
            return {
                ok: false,
                error,
                data: null,
            }
        }
    }

    return { httpGet, httpPost, httpPatch, httpDelete };
}
