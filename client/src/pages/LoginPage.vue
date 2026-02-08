<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";
import { RouterLink, useRouter } from "vue-router";
import { loginSchema, type LoginInput } from "../validation/loginSchema";
import { useAuthStore } from "../store/auth";

type Issue = z.ZodError["issues"][number];
type FieldErrors = Partial<Record<keyof LoginInput, string>>;

const form = ref<LoginInput>({
    email: "",
    password: "",
});

const errors = ref<FieldErrors>({});
const loading = ref(false);

const router = useRouter();
const auth = useAuthStore();

function mapZodErrorsToStrings(issues: Issue[] | undefined) {
    const out: Record<string, string> = {};
    if (!issues) return out;

    for (const issue of issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !out[key]) {
            out[key] = issue.message;
        }
    }
    return out;
}

async function handleSubmit() {
    const parsed = loginSchema.safeParse(form.value);

    if (!parsed.success) {
        errors.value = mapZodErrorsToStrings(parsed.error.issues);
        return;
    }

    errors.value = {};
    loading.value = true;

    try {
        const res = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(parsed.data),
        });

        if (!res.ok) {
            throw new Error("Invalid credentials");
        }

        const json = await res.json();

        // store tokens
        auth.setTokens({
            accessToken: json.accessToken,
            refreshToken: json.refreshToken,
        });

        // store user if provided
        if (json.user) {
            auth.setUser(json.user);
        }

        router.push("/account");
    } catch (err) {
        console.error(err);
        errors.value = {
            password: "Invalid email or password",
        };
    } finally {
        loading.value = false;
    }
}
</script>



<template>
    <div>
        <div>
            <h1>Login</h1>

            <form @submit.prevent="handleSubmit" class="space-y-4">
                <div>
                    <label>Email</label>
                    <input id="LoginInputEmail" type="email" v-model="form.email" />
                    <p id="LoginEmailFeedback" v-if="errors.email">
                        {{ errors.email }}
                    </p>
                </div>

                <div>
                    <label>Password</label>
                    <input id="LoginInputPassword" type="password" v-model="form.password" />
                    <p id="LoginPasswordFeedback" v-if="errors.password">
                        {{ errors.password }}
                    </p>
                </div>

                <button id="LoginBtnSubmit" :disabled="loading">
                    {{ loading ? "Logging in..." : "Login" }}
                </button>
            </form>

            <p>Don't have a account?</p>
            <div>
                <RouterLink to="/create_user" custom v-slot="{ navigate }">
                    <button @click="navigate" >make new account</button>
                </RouterLink>
                
            </div>
        </div>
    </div>
</template>
