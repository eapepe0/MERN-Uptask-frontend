import axios from "axios";

export const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
})

export const clientePrivadoAxios = (token) => {
    return axios.create({
        baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
    })
}

export default clienteAxios