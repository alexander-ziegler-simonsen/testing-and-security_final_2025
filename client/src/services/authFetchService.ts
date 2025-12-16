import { useAuthStore } from "../store/auth";

export async function authFetch(
    input: RequestInfo,
    init: RequestInit = {}
) {
    const auth = useAuthStore();

    return fetch(input, {
        ...init,
        headers: {
            ...(init.headers ?? {}),
            ...(auth.accessToken
                ? { Authorization: `Bearer ${auth.accessToken}` }
                : {}),
        },
    });
}
