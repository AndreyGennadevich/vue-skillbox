<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">

      <product-filter v-model:price-from="filterPriceFrom" v-model:price-to="filterPriceTo" v-model:category-id="filterCategoryId" v-model:color="filterColor"/>

      <section class="catalog">

        <div class="loader" v-if="productsLoading">Загрузка товаров...</div>
        <div v-if="productsLoadingFailed">Произошла ошибка при загрузке товаров <button @click.prevent="loadProducts">Попробовать еще раз</button></div>

        <product-list v-else="!productsLoading" :products="products(productsList)"/>
        <base-pagination v-model:page="page" :count="countProducts(productsList)" :per-page="productsPerPage"/>

      </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      productsList: [],
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: 0,
      page: 1,
      productsPerPage: 3,

      productsData: null,

      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  methods: {
    submit() {
      this.loadProducts();
    },
    reset() {
      this.filterPriceFrom = 0;
      this.filterPriceTo = 0;
      this.filterCategoryId = 0;
      this.filterColor = 0;
      this.loadProducts();
    },
    products() {
      return this.productsData
       ? this.productsData.items.map(product => {
        return {
          ...product,
          image: product.image.file.url,
        }
      })
       : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer)
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get( API_BASE_URL + `/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
              colorId: this.filterColor,
            },
          })
          .then(response => this.productsData = response.data)
          .catch(() => this.productsLoadingFailed = true)
          .then(() => this.productsLoading = false);
      }, 0)
    },
  },
  created() {
    this.emitter.on('submit', () => this.submit());
    this.emitter.on('reset', () => this.reset());
    this.loadProducts();
  },
  watch: {
    page() {
      this.loadProducts();
    },
  }
};
</script>