import api from "./index";

export const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
}

export const register = async (firstName, lastName, email, password) => {
    const response = await api.post('/auth/register', { firstName, lastName, email, password })
    return response.data
}

export const verifyToken = async () => {
    const { data } = await api.post('/auth/verify-token')
    console.log('Token verification response:', data)
    return data
}