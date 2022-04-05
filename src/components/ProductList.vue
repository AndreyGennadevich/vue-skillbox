<template>
  <ul class="catalog__list">
    <product-item :products="products"/>
  </ul>
</template>

<script>
import ProductItem from '@/components/ProductItem';

export default {
  components: { ProductItem },
  props: ['products'],
};
</script>
