<template>
    <div class="login">
        <div class>
            <div class="col-md-6 offset-md-3">
                <!-- <h2 class="display-4 text-center mt-3">Login</h2> -->

                <form action="#" class="mt-5">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            v-model="email"
                            class="form-control"
                        />
                    </div>

                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            v-model="password"
                            class="form-control"
                        />
                        <div style="color:red;" v-if="error">{{ error }}</div>
                    </div>

                    <div class="form-group">
                        <button
                            type="submit"
                            class="btn btn-info btn-block"
                            @click.prevent="performLogin"
                        >
                            Login
                        </button>
                    </div>
                </form>

                <circle-spin v-show="isLoading"></circle-spin>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "login",
    data() {
        return {
            email: "",
            password: "",
            error: "",
            isLoading: false,
        };
    },
    methods: {
        ...mapActions(["login"]),
        performLogin() {
            this.isLoading = true;
            this.login({ email: this.email, password: this.password })
                .then(() => {
                    this.isLoading = false;
                    this.$router.push("/dashboard");
                })
                .catch((error) => {
                    this.isLoading = false;
                    this.error = "There was error during login process";
                    console.log(error.message);
                });
        },
    },
};
</script>

<style></style>
