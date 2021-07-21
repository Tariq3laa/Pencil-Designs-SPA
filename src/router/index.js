import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import(/* webpackChunkName: "login" */ "../views/auth/Login.vue"),
        meta: {
            guest: true,
        },
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: () =>
            import(
                /* webpackChunkName: "dashboard" */ "../views/dashboard/Dashboard.vue"
            ),
        meta: {
            auth: true,
        },
    },
    {
        path: "/product/create",
        name: "product.create",
        component: () =>
            import(
                /* webpackChunkName: "product.create" */ "../views/dashboard/product/Create.vue"
            ),
        meta: {
            auth: true,
        },
    },
    {
        path: "/product/:id/edit",
        name: "product.edit",
        component: () =>
            import(
                /* webpackChunkName: "product.edit" */ "../views/dashboard/product/Edit.vue"
            ),
        meta: {
            auth: true,
        },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.auth)) {
        if (!store.getters.isLoggedIn) {
            next({
                path: "/login",
            });
        } else {
            next();
        }
    } else if (to.matched.some((record) => record.meta.guest)) {
        if (!store.getters.isLoggedIn) {
            next();
        } else {
            next({
                path: "/dashboard",
            });
        }
    } else {
        next();
    }
});

export default router;
