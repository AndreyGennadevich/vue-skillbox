<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.image" :alt="product.title">
    </router-link>
    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
              {{ numberFormat(product.price) }} ₽
            </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="itemColor in product.colors" :key="itemColor.code">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="itemColor.code" v-model="color">
          <span class="colors__value" v-bind:style="{ backgroundColor: itemColor.code }">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import goToPage from '@/helpers/goToPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      color: '#73B6EA',
    };
  },
  methods: {
    goToPage,
    numberFormat,
  },
  props: {
    product: {
      type: Object,
      required: true,
      default: {},
    }
  },
};
</script>
