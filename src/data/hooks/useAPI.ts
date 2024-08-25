import { useCallback } from 'react'

import { API } from '../api';

interface UseAPIResponse<T> {
    ok: boolean;
    data: T
}

export default function useAPI<T = any>() {
    const httpGet = useCallback(async function (uri: string): Promise<UseAPIResponse<T | null>> {
        try {
            const res = await API.get<T>(uri);
            return {
                ok: true,
                data: res.data
            };
        } catch (error) {
            return {
                ok: false,
                data: null
            }
        }
    }, []);

    const httpPost = useCallback(async function (uri: string, body: T): Promise<void> {
        await API.post(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
    }, []);

    return { httpGet, httpPost }
}
