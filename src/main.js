import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;

import VueSpinners from "vue-spinners";
Vue.use(VueSpinners);

const axiosApiInstance = axios.create();
axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

axiosApiInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function(error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            store.dispatch('refresh');
            axios.defaults.headers.common["Authorization"] = `Bearer ${store.state.token}`;
            return axiosApiInstance(originalRequest);
        }
        return Promise.reject(error);
    }
);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
