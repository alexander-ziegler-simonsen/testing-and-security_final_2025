<script setup lang="ts">
import { ref } from "vue";
import {
    createUserSchema,
    type CreateUserInput,
    type Issue,
} from "../validation/createUserSchema";
import { isPasswordPwned } from "../utils/hibp";

type FieldErrors = Partial<Record<keyof CreateUserInput, string>>;

let wasItPawned = false;

const form = ref<CreateUserInput>({
    firstname: "",
    lastname: "",
    username: "",
    cityName: "",
    cityCode: "",
    address: "",
    password: "",
    repeatPassword: "",
});

const errors = ref<FieldErrors>({});
const loading = ref(false);

function mapZodErrors(issues: Issue[] | undefined): FieldErrors {
    const out: FieldErrors = {};
    if (!issues) return out;

    for (const issue of issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !out[key]) {
            out[key] = issue.message;
        }
    }

    return out;
}

const emit = defineEmits<{
    (e: "create", payload: CreateUserInput): void;
}>();

async function handleSubmit() {
    const result = createUserSchema.safeParse(form.value);

    if (!result.success) {
        errors.value = mapZodErrors(result.error.issues);
        return;
    }

    errors.value = {};
    loading.value = true;

    // Simulate API
    setTimeout(() => {
        emit("create", result.data);
        loading.value = false;
    }, 600);

    const wasIt = await isPasswordPwned(form.value.password);
    wasItPawned = wasIt;
    console.log("was it pawned?:", wasIt);
}
</script>

<template>
    <h1>Create your own account here at 'TradeIt'</h1>
    <p>
        <small><small><small><small>
        by filling out the forms below, you are signing away your human rights and giving us ownership of you and everything you own. If you can read this, don't tell anyone, we will know.
        </small></small></small></small>
    </p>
    <form @submit.prevent="handleSubmit">
        <div>
            <label>Firstname</label>
            <input v-model="form.firstname" />
            <p v-if="errors.firstname" class="error">{{ errors.firstname }}</p>
        </div>

        <div>
            <label>Lastname</label>
            <input v-model="form.lastname" />
            <p v-if="errors.lastname" class="error">{{ errors.lastname }}</p>
        </div>

        <div>
            <label>Username</label>
            <input v-model="form.username" />
            <p v-if="errors.username" class="error">{{ errors.username }}</p>
        </div>

        <div>
            <label>City Name</label>
            <input v-model="form.cityName" />
            <p v-if="errors.cityName" class="error">{{ errors.cityName }}</p>
        </div>

        <div>
            <label>City Code</label>
            <input v-model="form.cityCode" />
            <p v-if="errors.cityCode" class="error">{{ errors.cityCode }}</p>
        </div>

        <div>
            <label>Address</label>
            <input v-model="form.address" />
            <p v-if="errors.address" class="error">{{ errors.address }}</p>
        </div>

        <div>
            <label>Password</label>
            <input type="password" v-model="form.password" />
            <p v-if="errors.password" class="error">{{ errors.password }}</p>
        </div>

        <div>
            <label>Repeat Password</label>
            <input type="password" v-model="form.repeatPassword" />
            <p v-if="errors.repeatPassword" class="error">{{ errors.repeatPassword }}</p>
        </div>

        <button :disabled="loading">
            {{ loading ? "Creating..." : "Create User" }}
        </button>
    </form>

    <div>
        <h1>temp setup</h1>
        <p>was password pawned: {{ wasItPawned }}</p>
    </div>
    <div>
        <p>Don't have a account, click the link below to create one</p>
        <nav>
            <RouterLink id="btnCreateUser" to="/create_user">create new account</RouterLink>
        </nav>
    </div>
</template>

<style scoped>
.error {
    color: red;
}
</style>