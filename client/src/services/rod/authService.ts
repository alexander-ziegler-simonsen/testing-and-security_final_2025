import { z } from "zod";
import { useAuthStore } from "../../store/auth";

const LoginResponseSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
});

export async function login(email: string, password: string) {
    const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");

    const data = LoginResponseSchema.parse(await res.json());

    const auth = useAuthStore();
    auth.setTokens(data);
}
