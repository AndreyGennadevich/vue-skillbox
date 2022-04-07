<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" @click="paginationDec" :class="{'pagination__link--disabled' : page === 1}"
         aria-label="Предыдущая страница">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a class="pagination__link" :class="{'pagination__link--current' : pageNumber === page}" @click="paginate(pageNumber)">
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" @click="paginationInc" :class="{'pagination__link--disabled' : page === pages}"
         aria-label="Следующая страница">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
  export default {
    props: ['page', 'count', 'perPage'],
    computed: {
      pages() {
        return Math.ceil(this.count / this.perPage);
      },
    },
    methods: {
      paginate(page) {
        this.$emit('update:page', page);
      },
      paginationInc() {
        if (this.page < this.pages) {
          this.$emit('update:page', this.page + 1);
        }
      },
      paginationDec() {
        if (this.page > 1) {
          this.$emit('update:page', this.page - 1);
        }
      },
    }
  };
</script>
