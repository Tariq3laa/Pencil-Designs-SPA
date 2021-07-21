import axios from 'axios';

export default {
    login (email, password) {
        return axios.post('auth/login', {
            email,
            password
        })
    }, 

    logout(token) {
        return axios.post('auth/logout', {}, 
            { headers: { Authorization: `Bearer ${token}` } }
        )
    },

    refresh(token) {
        return axios.post('auth/refresh', {}, 
            { headers: { Authorization: `Bearer ${token}` } }
        )
    }
};
