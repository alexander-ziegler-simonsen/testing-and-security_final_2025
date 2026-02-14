import { z } from "zod";
import { useAuthStore } from "../../store/auth";

const MeSchema = z.object({
    id: z.string(),
    email: z.string(),
});

export async function fetchMe() {
    const auth = useAuthStore();

    if (!auth.accessToken) return;

    const res = await fetch("/api/auth/me", {
        headers: {
            Authorization: `Bearer ${auth.accessToken}`,
        },
    });

    if (!res.ok) {
        auth.clearAuth();
        return;
    }

    const user = MeSchema.parse(await res.json());
    auth.setUser(user);
}
