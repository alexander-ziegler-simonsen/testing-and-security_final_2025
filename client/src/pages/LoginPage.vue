<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";
import { loginSchema, type LoginInput } from "../validation/loginSchema";


type Issue = z.ZodError["issues"][number];
type FieldErrors = Partial<Record<keyof LoginInput, string>>;

const form = ref<LoginInput>({
    email: "",
    password: "",
});

const errors = ref<FieldErrors>({});
const loading = ref(false);

const emit = defineEmits<{
    (e: "login", payload: LoginInput): void;
}>();

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

function handleSubmit() {
    const parsed = loginSchema.safeParse(form.value);

    if (!parsed.success) {
        // Option A: use parsed.error.issues and map them to strings
        errors.value = mapZodErrorsToStrings(parsed.error.issues);
        return;
    }

    // success
    errors.value = {};
    loading.value = true;

    // Simulate API call
    setTimeout(() => {
        emit("login", parsed.data);
        loading.value = false;
    }, 600);
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

                <button  id="LoginBtnSubmit" :disabled="loading">
                    {{ loading ? "Logging in..." : "Login" }}
                </button>
            </form>
        </div>
        <div>
            <p>Don't have a account, click the link below to create one</p>
            <nav>
                <RouterLink id="btnCreateUser" to="/create_user">create new account</RouterLink>
            </nav>
        </div>
    </div>
</template>
