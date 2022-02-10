<template>
  <Nav />
  <Products v-if="!showProduct()" />
  <SingleProduct v-if="showProduct()" />

</template>
<script setup>
import Nav from "../components/Nav.vue";
import Products from "../components/product/ProductsList.vue";
import SingleProduct from "../components/product/SingleProduct.vue";
import { useStore } from "vuex";

const store = useStore();
const showProduct = () => {
  return store.getters["products/getShowProduct"];
};
</script>

