import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const authApi = {
    login: (email: string, password: string) => 
        api.post("/auth/login", {email, password}),

    register: (firstName: string, lastName: string, email: string, password: string) =>
        api.post("/auth/register", {
            firstName,
            lastName,
            email,
            password
        }),
    
    me: () => api.get("/users/me"),
};

export default api;