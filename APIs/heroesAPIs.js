import axios from 'axios'

const API_BASE_URL = 'https://swapi.dev/api'

const instance = axios.create({
        baseURL: API_BASE_URL
    }
)

export const getHeroes = async url => {
    try {
        const response = await axios.get(url)
        return (response.data)
    } catch (err) {
        console.error(err)
    }
}
