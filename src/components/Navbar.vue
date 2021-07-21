<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link class="navbar-brand" to="/">Pencil-SPA</router-link>
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item" v-if="!isLoggedIn">
                    <router-link
                        class="btn btn-primary my-1 btn-block"
                        :to="{ name: 'login' }"
                        >Login</router-link
                    >
                </li>
                <li class="nav-item" v-if="isLoggedIn">
                    <router-link
                        class="btn btn-primary btn-block"
                        :to="{ name: 'dashboard' }"
                        >Dashboard</router-link
                    >
                </li>
                <li class="nav-item" v-if="isLoggedIn">
                    <router-link
                        class="btn btn-success ml-2 btn-block"
                        :to="{ name: 'product.create' }"
                        tabindex="-1"
                        aria-disabled="true"
                        >Create Product</router-link
                    >
                </li>
                <li class="nav-item" v-if="isLoggedIn">
                    <button
                        class="btn btn-warning ml-3 btn-block"
                        @click.prevent="performLogout"
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    computed: mapGetters(["isLoggedIn"]),
    methods: {
        ...mapActions(["logout"]),
        performLogout() {
            this.logout()
                .then(() => this.$router.push("/"))
                .catch((error) => console.log(error.message));
        },
    },
};
</script>
