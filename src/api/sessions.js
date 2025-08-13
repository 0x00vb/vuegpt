import api from './index'

export const getSessions = async () => {
    const response = await api.get('/sessions')
    return response.data
}

export const getSession = async (id) => {
    const response = await api.get(`/sessions/${id}`)
    return response.data
}

export const createSession = async (title) => {
    const response = await api.post('/sessions', { title })
    return response.data
}

export const renameSession = async (id, title) => {
    const response = await api.put(`/sessions/${id}/rename`, { title })
    return response.data
}

export const deleteSession = async (id) => {
    const response = await api.delete(`/sessions/${id}`)
    return response.data
}