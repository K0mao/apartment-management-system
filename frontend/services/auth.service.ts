import api from "@/lib/axios"

export interface LoginPayload{
    email: string;
    password: string;
}

export interface LoginRespons{
    accessToken: string;
}

export const authService = {
    login: async (data: LoginPayload) => {
        const response = await api.post<LoginRespons>("/auth/login", data);
        return response.data
    }
}