import axios from "axios";

export const nextServer = axios.create({
    baseURL: "https://localhost:3000/api",
    withCredentials: true, 
})

