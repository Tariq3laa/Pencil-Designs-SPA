<template>
    <div class="add">
        <div class>
            <div class="col-md-6 offset-md-3">
                <h2 class="text-center mt-4">Add Product Form</h2>

                <form action="#" enctype="multipart/form-data">
                    <div class="input-group mt-4">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="name">Name</span>
                        </div>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            v-model="name"
                            class="form-control"
                            :class="{ 'is-invalid': nameError }"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </div>
                    <span
                        class="help-block"
                        style="color:#f70f0fde"
                        v-show="nameError"
                    >
                        <strong>{{ nameError }} </strong>
                    </span>

                    <div class="input-group mt-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="price"
                                >Price</span
                            >
                        </div>
                        <input
                            type="text"
                            name="price"
                            id="price"
                            v-model="price"
                            class="form-control"
                            :class="{ 'is-invalid': priceError }"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </div>
                    <span
                        class="help-block"
                        style="color:#f70f0fde"
                        v-show="priceError"
                    >
                        <strong>{{ priceError }} </strong>
                    </span>

                    <div class="input-group mt-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="description"
                                >Description</span
                            >
                        </div>
                        <textarea
                            name="description"
                            id="description"
                            v-model="description"
                            class="form-control"
                            :class="{ 'is-invalid': descriptionError }"
                            style="resize:none;"
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </div>
                    <span
                        class="help-block"
                        style="color:#f70f0fde"
                        v-show="descriptionError"
                    >
                        <strong>{{ descriptionError }} </strong>
                    </span>

                    <div class="input-group mt-3">
                        <div class="input-group-prepend">
                            <span
                                class="input-group-text"
                                id="inputGroupFileAddon01"
                                >Image</span
                            >
                        </div>
                        <div class="custom-file">
                            <input
                                type="file"
                                accept="image/*"
                                id="image"
                                name="image"
                                @change="setImage($event.target.files[0])"
                                class="custom-file-input"
                                :class="{ 'is-invalid': imageError }"
                                aria-describedby="inputGroupFileAddon01"
                            />
                            <label class="custom-file-label" for="image"
                                >Choose image</label
                            >
                        </div>
                    </div>
                    <span
                        class="help-block"
                        style="color:#f70f0fde"
                        v-show="imageError"
                    >
                        <strong>{{ imageError }} </strong>
                    </span>

                    <div class="form-group mt-3">
                        <button
                            type="submit"
                            class="btn btn-info btn-block"
                            @click.prevent="store"
                        >
                            Save
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
    name: "add",
    data() {
        return {
            name: "",
            nameError: "",
            price: "",
            priceError: "",
            image: null,
            imageError: "",
            description: "",
            descriptionError: "",
            error: "",
            isLoading: false,
        };
    },
    methods: {
        ...mapActions(["storeProduct"]),
        setImage(image) { this.image = image; }, 
        store() {
            this.isLoading = true;
            this.storeProduct({
                name: this.name,
                image: this.image,
                price: this.price,
                description: this.description,
            })
                .then(() => {
                    this.isLoading = false;
                    this.$router.push("/dashboard");
                })
                .catch((error) => {
                    this.isLoading = false;
                    if ("name" in error.response.data.errors)
                        this.nameError = error.response.data.errors.name[0];
                    if ("image" in error.response.data.errors)
                        this.imageError = error.response.data.errors.image[0];
                    if ("price" in error.response.data.errors)
                        this.priceError = error.response.data.errors.price[0];
                    if ("description" in error.response.data.errors)
                        this.descriptionError =
                            error.response.data.errors.description[0];
                });
        },
    },
};
</script>

<style></style>
