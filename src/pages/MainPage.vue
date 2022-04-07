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

        <product-list :products="products(productsList)"/>
        <base-pagination v-model:page="page" :count="countProducts(productsList)" :per-page="productsPerPage"/>

      </section>
    </div>
  </main>
</template>

<script>
import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      productsList: products,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: 0,
      page: 1,
      productsPerPage: 3,
    };
  },
  methods: {
    submit() {
      let filteredProducts = products;

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter((product) => product.price > this.filterPriceFrom);
      }

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter((product) => product.price < this.filterPriceTo);
      }

      if (this.filterCategoryId) {
        filteredProducts = filteredProducts.filter((product) => product.categoryId === this.filterCategoryId);
      }

      if (this.filterColor) {
        filteredProducts = filteredProducts.filter((product) => (product.color.indexOf(this.filterColor) !== -1));
      }

      this.productsList = filteredProducts;
    },
    reset() {
      this.filterPriceFrom = 0;
      this.filterPriceTo = 0;
      this.filterCategoryId = 0;
      this.filterColor = 0;
      this.productsList = products;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.productsList.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.productsList.length;
    },
  },
  created() {
    this.emitter.on('submit', () => this.submit());
    this.emitter.on('reset', () => this.reset());
  },
};
</script>
