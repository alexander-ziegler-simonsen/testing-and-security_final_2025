import { defineStore } from "pinia";
import { ref, computed } from "vue";

type User = {
    id: string;
    email: string;
};

export const useAuthStore = defineStore("auth", () => {
    // state
    const accessToken = ref<string | null>(null);
    const user = ref<User | null>(null);

    // getters
    const isAuthenticated = computed(() => !!accessToken.value);

    // actions
    function setTokens(tokens: { accessToken: string; refreshToken: string }) {
        accessToken.value = tokens.accessToken;
        localStorage.setItem("refresh_token", tokens.refreshToken);
    }

    function clearAuth() {
        accessToken.value = null;
        user.value = null;
        localStorage.removeItem("refresh_token");
    }

    function setUser(u: User) {
        user.value = u;
    }

    function getRefreshToken() {
        return localStorage.getItem("refresh_token");
    }

    return {
        // state
        accessToken,
        user,

        // getters
        isAuthenticated,

        // actions
        setTokens,
        setUser,
        clearAuth,
        getRefreshToken,
    };
});
