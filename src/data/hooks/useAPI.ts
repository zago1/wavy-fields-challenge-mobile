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
            const res = await API.post<R>(uri, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

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

    return { httpGet, httpPost };
}
