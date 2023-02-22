import axios from 'axios'

const baseUrl = 'http://dev.local:3001/persons'

export const getAll = async () => {
    try {
        const res = await axios.get(baseUrl)
        return res.data
    } catch (error) {
        return error
    }
}

const create = async (person) => {
    try {
        const res = await axios.post(baseUrl, person)
        if (res.status === 201)
            return res.data
        else return { error: { message: 'Error creating resource.' } }
    } catch (error) {
        return error
    }
}

const update = async (id, person) => {
    try {
        const res = await axios.put(`${baseUrl}/${id}`, person)
        return res.data
    } catch (error) {
        return error
    }
}

const remove = async (id) => {
    try {
        const res = await axios.delete(`${baseUrl}/${id}`)
        if (res.status !== 200) throw new Error('This contact is already deleted.')
        return
    } catch (error) {
        return { message: error.message }
    }
}


export default {
    getAll,
    create,
    update,
    remove
}