<template>
      <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <div v-if="formLoading">
        <div class="lds-facebook"><div></div><div></div><div></div></div>
      </div>

      <form class="cart__form form" action="#" method="POST" @submit.prevent="order(formData)">
        <div class="cart__field">
          <div class="cart__data">

            <BaseFormText v-model="formData.name" :error="formError.name" title="ФИО" placeholder="Введите ваше полное имя"/>

            <BaseFormText v-model="formData.address" :error="formError.address" title="Адрес доставки" placeholder="Введите ваш адрес"/>

            <BaseFormText v-model="formData.phone" :error="formError.phone" title="Телефон" type="tel" placeholder="Введите ваш телефон"/>

            <BaseFormText v-model="formData.email" :error="formError.email" title="Email" type='email' placeholder="Введи ваш Email"/>
            
            <BaseFormTextarea title='Комментарий к заказу' v-model='formData.comment' :error='formError.comment' placeholder='Ваши пожелания'/>

          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="product in products">
              <h3>{{product.product.title}}</h3>
              <b>{{ numberFormat(product.product.price)}} ₽</b>
              <span>Артикул: {{product.productId}}</span>
            </li>
          </ul>
          
          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ products.reduce((a, b) => a + b.amount, 0) }}</b> товара на сумму <b>{{totalPrice}} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
    import { getOrders } from '@/api/order';
    import BaseFormField from '@/components/BaseFormField.vue';
    import BaseFormText from '@/components/BaseFormText.vue';
    import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
    import numberFormat from '@/helpers/numberFormat';
    import Vuex from 'vuex';

    export default {
        components: { BaseFormField, BaseFormText, BaseFormTextarea },
        data() {
            return {
                formData: {},
                formError: {},
                formErrorMessage: '',
                formLoading: false,
            }
        },
        methods: {
          numberFormat,
          // ...Vuex.mapActions({ orderCart: 'order' })
          order() {
            this.formError = {};
            this.formErrorMessage = '';
            this.formLoading = true;
            return getOrders(this.formData)
              .then(response=> {
                this.$store.commit('resetCart');
                this.$store.commit('updateOrderInfo', response.data);
                this.$router.push({name: 'orderInfo', params: {id: response.data.id}});
              }) 
              .catch(error => {
                this.formError = error.response.data.error.request || {};
                this.formErrorMessage = error.response.data.error.message;
              })
              .then(() => this.formLoading = false)
          }
        },
        computed: {
          ...Vuex.mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice' }),
        },
    }
</script>

<style>
  .lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #9eff00;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
}
</style>