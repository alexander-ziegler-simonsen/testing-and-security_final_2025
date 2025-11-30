export const API_URL = "http://localhost:3000";

export async function get<T>(path: string): Promise<T> {
    const res = await fetch(API_URL + path);
    return res.json();
}
