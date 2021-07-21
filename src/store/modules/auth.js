import api from '../../api/auth';

const state = {
    user: JSON.parse(window.localStorage.getItem('user')),
    token: window.localStorage.getItem('token')
};

const getters = {
    user: state => state.user,
    isLoggedIn: state => !!state.token
};

const actions = {
    async login({commit}, payload) {
        const response = await api.login(payload.email, payload.password);
        commit('setUser', response.data.user)
        commit('setToken', response.data.access_token)
        window.localStorage.setItem('user', JSON.stringify(response.data.user))
        window.localStorage.setItem('token', response.data.access_token)
    },

    async logout({state, commit}) {
        await api.logout(state.token)
        commit('setUser', null)
        commit('setToken', null)
        window.localStorage.removeItem('user')
        window.localStorage.removeItem('token')
    },

    async refresh({state, commit}) {
        const response = await api.refresh(state.token);
        commit('setToken', response.data.access_token)
        window.localStorage.setItem('token', response.data.access_token)
    }
};

const mutations = {
    setToken: (state, token) => state.token = token,
    setUser: (state, user) => state.user = user,
};

export default {
    state,
    getters,
    actions,
    mutations
}