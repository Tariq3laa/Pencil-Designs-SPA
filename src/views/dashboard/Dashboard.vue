<template>
    <div class="container" v-if="isLoggedIn">
        <div class="row">
            <div class="col">
                <h4 class="col text-center mt-3">
                    Welcome <br />
                    MR: {{ user.name }}
                </h4>
            </div>
        </div>

        <div
            v-if="products.length > 0"
            class="d-flex justify-content-between container mt-5 mb-5"
        >
            <div
                class="card p-3 bg-white"
                style="width: 21rem;"
                v-for="product in products"
                :key="product.id"
            >
                <div class="about-product text-center mt-2">
                    <img :src="product.image" class="card-img-top" />
                    <div>
                        <h4>{{ product.name }}</h4>
                        <h6 class="mt-0 text-black-50">
                            {{ product.description }}
                        </h6>
                    </div>
                </div>
                <div
                    class="d-flex justify-content-between total font-weight-bold"
                >
                    <span>Total</span><span>${{ product.price }}</span>
                </div>

                <div class="d-flex justify-content-around container mt-2">
                    <a
                        @click.prevent="edit(product.id)"
                        class="btn btn-primary"
                    >
                        Edit
                    </a>
                    <a
                        @click.prevent="remove(product.id)"
                        class="btn btn-danger"
                        >Delete</a
                    >
                </div>
            </div>
        </div>

        <div v-else>
            <h1 class="col display-5 text-center mt-3 mb-3">
                No products yet :(
                <circle-spin v-show="isLoading"></circle-spin>
            </h1>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            isLoading: true,
        };
    },
    computed: mapGetters(["user", "isLoggedIn", "products"]),
    methods: {
        ...mapActions(["fetchProducts", "deleteProduct"]),
        edit(id) { this.$router.push(`/product/${id}/edit`) },
        remove(id) { this.deleteProduct({ id }).then(() => this.fetchProducts()) },
    },
    created() { this.fetchProducts().then(() => (this.isLoading = false)); },
};
</script>
