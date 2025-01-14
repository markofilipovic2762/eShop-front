import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://localhost:5131',
    headers: {
        'Content-Type': 'application/json'
    },
        
})