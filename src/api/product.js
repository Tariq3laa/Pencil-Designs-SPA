import axios from 'axios';

export default {
    index(token) {
        return axios.get('product', {
            headers: { Authorization: `Bearer ${token}` }
        })
    },

    store(token, formData) {
        return axios.post('product', formData, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },

    edit(token, id) {
        return axios.get(`product/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },

    update(token, id, formData) {
        return axios.post(`product/${id}?_method=PUT`, formData, 
            { headers: { Authorization: `Bearer ${token}` } }
        )
    },

    delete(token, id) {
        return axios.delete(`product/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    },
};


