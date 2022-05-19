<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="priceFromModel">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="priceToModel">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" type="text" name="category" v-model.number="categoryIdModel">
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.title }}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="color in colors">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color" :value="color.id" v-model="colorModel">
              <span class="colors__value" :style="{backgroundColor: color.code}">
                  </span>
            </label>
          </li>

        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="8" checked="">
              <span class="check-list__desc">
                    8
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
              <span class="check-list__desc">
                    16
                    <span>(461)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
              <span class="check-list__desc">
                    32
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">
              <span class="check-list__desc">
                    64
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="128">
              <span class="check-list__desc">
                    128
                    <span>(313)</span>
                  </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="volume" value="264">
              <span class="check-list__desc">
                    264
                    <span>(313)</span>
                  </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit" @click.prevent="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from 'axios';
import {API_BASE_URL} from '../config';

export default {
  data() {
    return {
      categories: [],
      colors: [],
    };
  },
  props: {
    priceFrom: {
      type: Number,
      required: true,
      default: 0,
    },
    priceTo: {
      type: Number,
      required: true,
      default: 0,
    },
    categoryId: {
      type: Number,
      required: true,
      default: 0,
    },
    color: {
      type: [String, Number],
      required: true,
      default: 0,
    },
  },
  computed: {
    priceFromModel: {
      get() {
        return this.priceFrom;
      },
      set(value) {
        this.$emit('update:priceFrom', value);
      },
    },
    priceToModel: {
      get() {
        return this.priceTo;
      },
      set(value) {
        this.$emit('update:priceTo', value);
      },
    },
    categoryIdModel: {
      get() {
        return this.categoryId;
      },
      set(value) {
        this.$emit('update:categoryId', value);
      },
    },
    colorModel: {
      get() {
        return this.color;
      },
      set(value) {
        this.$emit('update:color', value);
      },
    },
  },
  methods: {
    submit() {
      this.emitter.emit('submit');
    },
    reset() {
      this.emitter.emit('reset');
    },
    loadCategories() {
      axios.get(API_BASE_URL + '/api/productCategories')
        .then(response => this.categories = response.data.items);
    },
    loadColors() {
      axios.get(API_BASE_URL + '/api/colors')
        .then(response => this.colors = response.data.items)
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
  }

};
</script>
