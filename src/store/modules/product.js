import api from '../../api/product';

const state = {
    products: []
};

const getters = {
    products: state => state.products
};

const actions = {
    async fetchProducts({rootState, commit}) {
        const { token } = rootState.auth;
        const response = await api.index(token);
        commit('setProducts', response.data.data)
    },

    async storeProduct({rootState}, payload) {
        const { token } = rootState.auth;
        const formData = new FormData();
        formData.append('name', payload.name);
        formData.append('price', payload.price);
        formData.append('image', payload.image);
        formData.append('description', payload.description);
        await api.store(token, formData);
    },

    async editProduct({rootState}, payload) {
        const { token } = rootState.auth;
        const response = await api.edit(token, payload.id);
        return response;
    },

    async updateProduct({rootState}, payload) {
        const { token } = rootState.auth;
        const formData = new FormData();
        formData.append('name', payload.name);
        formData.append('price', payload.price);
        formData.append('description', payload.description);
        payload.image && formData.append('image', payload.image);
        await api.update(token, payload.id, formData);
    },

    async deleteProduct({rootState}, payload) {
        const { token } = rootState.auth;
        await api.delete(token, payload.id);
    }
};

const mutations = {
    setProducts: (state, products) => state.products = products,
};

export default {
    state,
    getters,
    actions,
    mutations
}