<script setup>
import SearchHeader from "@/components/HeaderComponents/SearchHeader";
import ActionButton from "@/components/UI/Button/ActionButton";
import ImageGallery from "@/components/CartPageComponents/ImageGalary";
import MainButton from "@/components/UI/Button/MainButton";
import GoodsItemReviews from "@/components/Goods/GoodsItemHit";
import HeaderBannerMobile from "@/components/HeaderComponents/HeaderBannerMobile";
import "vue3-carousel/dist/carousel.css";
import {Carousel, Slide, Navigation} from "vue3-carousel";
import GoodItem from "@/components/Goods/GoodItem";
import SaleInformation from "@/components/SalesInformation";
import {useRouter} from "vue-router";
import {useRoute} from "vue-router";
import {useMainStore} from "@/store/MainStore";
import {useProductStore} from "@/store/ProductStore";
import {useCatalogStore} from "@/store/CatalogStore";
import {computed, onMounted, onUnmounted} from "vue";
import {useAuthStore} from "@/store/AuthStore";
import {useProfileStore} from "@/store/ProfileStore";
import {useAnnouncementStore} from "@/store/AnnouncementStore";

const router = useRouter();
const route = useRoute();
const mainStore = useMainStore();
const productStore = useProductStore();
const catalogStore = useCatalogStore();
const authStore = useAuthStore();
const profileStore = useProfileStore();
const announcementStore = useAnnouncementStore();

const width = computed(() => mainStore.display_width);
const someItem = computed(() => mainStore.someItem);
const isAuth = computed(() => authStore.jwt !== null);
const chat = computed(() => profileStore.currentChat);

const product = computed(() => {
  let prod = {};
  [...catalogStore.catalog].forEach(elem => {
    if (elem.id == route.params.id) {
      prod = elem
    }
  });
  return prod;
});
const gallery = computed(() => {
  if (product.value.gallery) {
    return JSON.parse(product.value.gallery);
  } else {
    return [];
  }
});
const parameters = computed(() => {
  if (product.value.parameters) {
    return JSON.parse(product.value.parameters);
  } else {
    return [];
  }
});
const categories = computed(() => {
  if (product.value.categories) {
    return JSON.parse(product.value.categories);
  } else {
    return [];
  }
});
const callShow = computed(() => {
  let flag = false;
  if (product.value.communication) {
    if (product.value.communication.indexOf('call') !== -1) {
      flag = true;
    }
  }
  return flag;
});
const messageShow = computed(() => {
  let flag = false;
  if (product.value.communication) {
    if (product.value.communication.indexOf('message') !== -1) {
      flag = true;
    }
  }
  return flag;
});
const isLiked = computed(() => {
  const id = parseInt(route.params.id);
  let flag = false;
  profileStore.myLikes.forEach(elem => {
    if (id === elem.id) {
      flag = true;
    }
  });
  return flag;
});
const wishText = computed(() => {
  if (isLiked.value) {
    return 'В избранном'
  } else {
    return 'Добавить в избранное'
  }
});
const isActor = computed(() => {
  let flag = false;
  if (product.value.categories) {
    const arr = JSON.parse(product.value.categories);
    if ((arr[2].id === 30 || arr[2].id === 51) && (arr[3].id === 1 || arr[3].id === 2 || arr[3].id === 6)) {
      flag = true;
    }
  }
  return flag
});
const breadcrumbs = computed(() => {
  let str = '';
  if (product.value.categories) {
    const arr = JSON.parse(product.value.categories);
    arr.forEach((elem, index) => {
      if (index !== 2) {
        str += elem.name.replace(/<br\s*\/?>/gi, ' ');
        if (index !== arr.length - 1) {
          str += ' / '
        }
      }
    });
  }
  return str;
});

const upperTitle = computed(() =>{
  return mainStore.upperCase(product.value.title);
});

onMounted(() => {
  productStore.getUserOfAnnouncement({
    id: route.params.author
  });
  announcementStore.setAnnouncementViews({
    id: route.params.id,
    views: product.value.views
  });
});

onUnmounted(() => {
  productStore.author = '';
  localStorage.removeItem('author');
});

const getLocation = () => {
  productStore.fetchMap(product.value.location);
  mainStore.popup = 'deal-location';
}

/*const goToProduct = (param = '') => {
  router.push('/cartPage')
  mainStore.someItem = param
}*/

const setLike = () => {
  if (isLiked.value) {
    profileStore.myLikes = profileStore.myLikes.filter(elem => product.value.id !== elem.id);
    profileStore.removeLike({
      user_id: profileStore.user.id,
      announcement_id: product.value.id
    });
  } else {
    profileStore.myLikes.push(product.value);
    profileStore.addLike({
      user_id: profileStore.user.id,
      announcement_id: product.value.id
    });
  }
  localStorage.setItem('myLikes', JSON.stringify(profileStore.myLikes));
}

const openChat = () => {
  if (isAuth.value) {
    profileStore.getChat({
      title: product.value.title,
      user1: profileStore.user.id,
      user2: productStore.author.id,
      announcement_id: product.value.id,
      category_id: categories.value[0].id
    }).then(() => {
      mainStore.miniChat = true;
    });
  } else {
    mainStore.popup = 'auth';
  }
}
</script>

<template>
  <section class="cartPage wrapper textMontserrat">
    <header-banner-mobile v-if="width <= 768" />
    <search-header v-if="width > 1024"/>
    <p class="textMontserrat_medium">
      {{ breadcrumbs }}
    </p>
    <div v-if="width > 1024" class="categoryName">
      <h2 class="textMontserrat_semiBold">
          {{ upperTitle }}
      </h2>
    </div>
    <main class="cartPage__main background_elements">
      <action-button
          v-if="width > 1024 && isAuth"
          :text="wishText"
          :double-elem="true"
          :class="{'wish': isLiked}"
          @click="setLike"
      />
      <div class="content">
        <div class="content__item content__photo">
          <div :class="{'fraction':width > 1024}">
            <image-gallery :slider="gallery" />
          </div>
          <section
              v-if="width > 1024"
              class="moreInfo"
              :class="{fraction:someItem !=='technics'}"
          >
            <h3 class="textMontserrat_bold">
              Дополнительная информация
            </h3>
            <p
                v-html="product.description"
                class="textMontserrat_regular"
            />
          </section>
          <div
              v-if="someItem === 'technics' && width <= 1024"
              class="cartPageName textMontserrat_medium"
              :class="{'fraction':width > 1024}"
          >
            <p class="productName">
              {{ product.title }}
            </p>
            <p>
              {{ product.price }} ₽
            </p>
          </div>
          <div
              v-if="width <= 1024"
              class="buttonActionContainer"
          >
            <SaleInformation v-if="!isActor && isAuth"/>
<!--            <div
                v-if="someItem === 'technics' && width > 1024"
                class="buttonContainer"
                :class="{'fraction':width > 1024}"
            >
              <main-button
                  button-text="Купить с доставкой"
                  size="big"
              />
            </div>-->
<!--            <div-->
<!--                class="buttonContainer"-->
<!--                :class="{'fraction':width > 1024, 'row': someItem !== 'technics' && width < 1024}"-->
<!--            >-->
<!--              <main-button-->
<!--                  v-if="width < 1024 && someItem === 'technics'"-->
<!--                  button-text="Купить с доставкой"-->
<!--                  size="big"-->
<!--              />-->
<!--              <main-button-->
<!--                  button-text="Показать телефон"-->
<!--                  color="green"-->
<!--                  size="big"-->
<!--              />-->
<!--              <main-button-->
<!--                  button-text="Написать сообщение"-->
<!--                  color="blue"-->
<!--                  size="big"-->
<!--              />-->
<!--            </div>-->
            <div
                class="buttonContainer"
            >
<!--              <main-button
                  v-if="width < 1024 && someItem === 'technics'"
                  button-text="Купить с доставкой"
                  size="big"
              />-->
              <main-button
                  v-if="callShow"
                  button-text="Показать телефон"
                  color="green"
                  size="big"
                  :phone="product.phone"
              />
              <main-button
                  v-if="messageShow"
                  button-text="Написать сообщение"
                  color="blue"
                  size="big"
                  @click="openChat"
              />
            </div>
          </div>
          <section
              v-if="width <= 1024"
              class="map"
          >
            <h3 class="textMontserrat_bold">
              Место сделки
            </h3>
            <div class="map-container">
              <div class="map-show">
                <svg height="20px" width="20px" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 166.418 166.418" xml:space="preserve">
                  <path style="fill:#000002;" d="M83.209,166.418c-7.121,0-13.11-4.387-15.258-11.176l-3.572-11.285
                  c-5.089-16.083-13.75-31.047-25.742-44.478c-9.853-11.036-15.236-25.269-15.156-40.078c0.086-15.993,6.312-30.945,17.53-42.102
                  C52.229,6.144,67.215,0,83.209,0c32.934,0,59.728,26.794,59.728,59.729c0,15.138-5.676,29.576-15.982,40.657
                  c-11.19,12.03-19.574,26.691-24.917,43.575l-3.57,11.281C96.319,162.031,90.33,166.418,83.209,166.418z M83.209,5
                  C52.685,5,28.645,28.908,28.481,59.429c-0.073,13.568,4.858,26.61,13.886,36.721c12.465,13.961,21.475,29.538,26.779,46.3
                  l3.572,11.285c1.793,5.665,6.595,7.684,10.492,7.684c3.896,0,8.698-2.019,10.491-7.684l3.57-11.281
                  c5.568-17.597,14.324-32.896,26.023-45.474c9.443-10.151,14.644-23.381,14.644-37.251C137.937,29.551,113.387,5,83.209,5z
                   M83.209,91.996c-18.188,0-32.984-14.797-32.984-32.984c0-18.188,14.797-32.985,32.984-32.985c18.188,0,32.985,14.797,32.985,32.985
                  C116.194,77.199,101.397,91.996,83.209,91.996z M83.209,31.026c-15.431,0-27.984,12.554-27.984,27.985
                  c0,15.431,12.554,27.984,27.984,27.984c15.431,0,27.985-12.554,27.985-27.984C111.194,43.58,98.64,31.026,83.209,31.026z"/>
                </svg>
                <span class="textMontserrat_medium">
                  {{ product.location }}
                </span>
              </div>
<!--              <div class="underground">
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="20px" height="16px" viewBox="337.5 232.3 125 85.9" xml:space="preserve"
                >
                  <polygon fill="#FF0013" points="453.9,306.2 424.7,232.3 400,275.5 375.4,232.3 346.1,306.2 337.5,306.2 337.5,317.4 381.7,317.4
                    381.7,306.2 375.1,306.2 381.5,287.8 400,318.2 418.5,287.8 424.9,306.2 418.3,306.2 418.3,317.4 462.5,317.4 462.5,306.2 "/>
                </svg>
                <span class="textMontserrat_medium">
                  Курская
                </span>
              </div>-->
              <div
                  class="show-button"
                  @click="getLocation"
              >
                Показать на карте
              </div>
            </div>
          </section>
<!--          <div-->
<!--              v-if="width <= 1024"-->
<!--              class="cartPage__user"-->
<!--          >-->
<!--            <p class="user__name textMontserrat_medium">-->
<!--              Пользователь-->
<!--            </p>-->
<!--            <div class="score">-->
<!--              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">-->
<!--                <path-->
<!--                    d="M7.91674 7.33976L10.6441 1.55679C10.9942 0.814404 12.0058 0.814404 12.3559 1.55679L15.0832 7.33976L21.1826 8.27283C21.9651 8.39254 22.277 9.39934 21.7105 9.97684L17.2978 14.4752L18.3392 20.83C18.4729 21.6461 17.6545 22.2684 16.9542 21.883L11.5 18.881L6.04574 21.883C5.34553 22.2684 4.52704 21.6461 4.66077 20.83L5.70216 14.4752L1.28954 9.97684C0.72298 9.39934 1.03488 8.39254 1.81745 8.27283L7.91674 7.33976Z"-->
<!--                    fill="#E9605A" stroke="#E9605A" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--              </svg>-->
<!--              <p class="textMontserrat_light">-->
<!--                Рейтинг:-->
<!--              </p>-->
<!--              <p class="textMontserrat_medium scoreBall">-->
<!--                5-->
<!--              </p>-->
<!--            </div>-->
<!--          </div>-->
          <section
              v-if="!isActor"
              class="parameters"
              :class="{'fraction':width > 1024}"
          >
            <h3 class="textMontserrat_bold">
              Параметры
            </h3>
            <main class="parameters__main">
              <div class="tableContent">
                <ul
                    v-for="(item, index) in parameters"
                    :key="index"
                >
                  <li class="textMontserrat_regular">
                    {{ item.name }}
                  </li>
                  <li class="textMontserrat_medium">
                    {{ item.value }}
                  </li>
                </ul>
              </div>
            </main>
            <section
                v-if="width <= 1024 && someItem === 'technics'"
                class="moreInfo"
                :class="{'fraction':width > 1024}"
            >
              <h3 class="textMontserrat_medium">
                Дополнительная информация
              </h3>
              <p
                  v-html="product.description"
                  class="textMontserrat_regular"
              />
            </section>
          </section>
          <div class="complain">
            <p class="textMontserrat_regular complain__item">
              №&nbsp;{{ product.id }}
            </p>
            <p class="textMontserrat_regular announcementDate">{{ product.date_publish }}</p>
            <p class="complain__item complain__button textMontserrat_medium background_mainBg">
              Пожаловаться
            </p>
          </div>
        </div>
        <div
            v-if="width > 1024"
            class="content__item content__information"
        >
          <div
              v-if="width > 1024 && !isActor"
              class="cartPageName textMontserrat_medium"
              :class="{'fraction':width > 1024}"
          >
<!--            <p>-->
<!--              Фотоаппарат Canon EOS 600D-->
<!--            </p>-->
            <p>
              {{ product.price }} ₽
            </p>
          </div>
<!--          <div
              v-if="someItem === 'technics' && width > 1024"
              class="buttonContainer"
              :class="{'fraction':width > 1024}"
          >
            <main-button
                button-text="Купить с доставкой"
                size="big"
            />
          </div>-->
<!--          <div-->
<!--              class="buttonContainer"-->
<!--              :class="{'fraction':width > 1024, 'row': someItem !== 'technics' && width < 1024}"-->
<!--          >-->
<!--            <main-button-->
<!--                v-if="width < 1024 && someItem === 'technics'"-->
<!--                button-text="Купить с доставкой"-->
<!--                size="big"-->
<!--            />-->
<!--            <main-button-->
<!--                button-text="Показать телефон"-->
<!--                color="green"-->
<!--                size="big"-->
<!--            />-->
<!--            <main-button-->
<!--                button-text="Написать сообщение"-->
<!--                color="blue"-->
<!--                size="big"-->
<!--            />-->
<!--          </div>-->
          <div
              class="buttonContainer fraction"
          >
<!--            <main-button
                v-if="width < 1024 && someItem === 'technics'"
                button-text="Купить с доставкой"
                size="big"
            />-->
            <main-button
                v-if="callShow"
                button-text="Показать телефон"
                color="green"
                size="big"
                :phone="product.phone"
            />
            <main-button
                v-if="messageShow"
                button-text="Написать сообщение"
                color="blue"
                size="big"
                @click="openChat"
            />
          </div>
          <SaleInformation v-if="!isActor && isAuth" />
          <section v-if="!isActor" class="map">
            <h3 class="textMontserrat_bold">
              Место сделки
            </h3>
            <div class="map-container">
              <div class="map-show">
                <svg height="20px" width="20px" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 166.418 166.418" xml:space="preserve">
                  <path style="fill:#000002;" d="M83.209,166.418c-7.121,0-13.11-4.387-15.258-11.176l-3.572-11.285
                  c-5.089-16.083-13.75-31.047-25.742-44.478c-9.853-11.036-15.236-25.269-15.156-40.078c0.086-15.993,6.312-30.945,17.53-42.102
                  C52.229,6.144,67.215,0,83.209,0c32.934,0,59.728,26.794,59.728,59.729c0,15.138-5.676,29.576-15.982,40.657
                  c-11.19,12.03-19.574,26.691-24.917,43.575l-3.57,11.281C96.319,162.031,90.33,166.418,83.209,166.418z M83.209,5
                  C52.685,5,28.645,28.908,28.481,59.429c-0.073,13.568,4.858,26.61,13.886,36.721c12.465,13.961,21.475,29.538,26.779,46.3
                  l3.572,11.285c1.793,5.665,6.595,7.684,10.492,7.684c3.896,0,8.698-2.019,10.491-7.684l3.57-11.281
                  c5.568-17.597,14.324-32.896,26.023-45.474c9.443-10.151,14.644-23.381,14.644-37.251C137.937,29.551,113.387,5,83.209,5z
                   M83.209,91.996c-18.188,0-32.984-14.797-32.984-32.984c0-18.188,14.797-32.985,32.984-32.985c18.188,0,32.985,14.797,32.985,32.985
                  C116.194,77.199,101.397,91.996,83.209,91.996z M83.209,31.026c-15.431,0-27.984,12.554-27.984,27.985
                  c0,15.431,12.554,27.984,27.984,27.984c15.431,0,27.985-12.554,27.985-27.984C111.194,43.58,98.64,31.026,83.209,31.026z"/>
                </svg>
                <span class="textMontserrat_medium">
                  {{ product.location }}
                </span>
              </div>
<!--              <div class="underground">
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="20px" height="16px" viewBox="337.5 232.3 125 85.9" xml:space="preserve"
                >
                  <polygon fill="#FF0013" points="453.9,306.2 424.7,232.3 400,275.5 375.4,232.3 346.1,306.2 337.5,306.2 337.5,317.4 381.7,317.4
                    381.7,306.2 375.1,306.2 381.5,287.8 400,318.2 418.5,287.8 424.9,306.2 418.3,306.2 418.3,317.4 462.5,317.4 462.5,306.2 "/>
                </svg>
                <span class="textMontserrat_medium">
                  Курская
                </span>
              </div>-->
              <div
                  class="show-button"
                  @click="getLocation"
              >
                Показать на карте
              </div>
            </div>
          </section>
          <section
              v-else
              class="parameters"
              :class="{'fraction':width > 1024}"
          >
            <h3 class="textMontserrat_bold">
              Параметры
            </h3>
            <main class="parameters__main">
              <div class="tableContent">
                <ul>
                  <li class="textMontserrat_regular">
                    Город
                  </li>
                  <li class="textMontserrat_medium">
                    {{ product.location }}
                  </li>
                </ul>
                <ul
                    v-for="(item, index) in parameters"
                    :key="index"
                >
                  <li class="textMontserrat_regular">
                    {{ item.name }}
                  </li>
                  <li class="textMontserrat_medium">
                    {{ item.value }}
                  </li>
                </ul>
              </div>
            </main>
            <section
                v-if="width <= 1024 && someItem === 'technics'"
                class="moreInfo"
                :class="{'fraction':width > 1024}"
            >
              <h3 class="textMontserrat_medium">
                Дополнительная информация
              </h3>
              <p
                  v-html="product.description"
                  class="textMontserrat_regular"
              />
            </section>
          </section>
        </div>
      </div>
<!--      <section class="reviewsContainer">
        <header class="reviewsContainer__header">
          <h2 class="subTitle">
            Похожие объявления
          </h2>
        </header>
        <main class="reviewsContainer__main">
          <carousel
              :items-to-show="width > 1420 ? 7 : width > 1100 ? 4 : width > 1025 ? 3 : width > 768 ? 3 : 2"
              class="blue-slider"
          >
            <slide :key="1">
              <good-item
                  :item-title="'Локация для съемок'"
                  :item-price="'1000'"
                  @click="goToProduct('technics')"
              />
            </slide>
            <slide :key="2">
              <good-item
                  :item-title="'Галь Гадот'"
                  :item-price="'1000'"
                  @click="goToProduct()"
              />
            </slide>
            <slide :key="3">
              <good-item
                  :item-title="'Локация для съемок'"
                  :item-price="'1000'"
                  @click="goToProduct('technics')"
              />
            </slide>
            <slide :key="4">
              <good-item
                  :item-title="'Галь Гадот'"
                  :item-price="'1000'"
                  @click="goToProduct()"
              />
            </slide>
            <slide :key="5">
              <good-item
                  :item-title="'Локация для съемок'"
                  :item-price="'1000'"
                  @click="goToProduct('technics')"
              />
            </slide>
            <slide :key="6">
              <good-item
                  :item-title="'Галь Гадот'"
                  :item-price="'1000'"
                  @click="goToProduct()"
              />
            </slide>
            <slide :key="7">
              <good-item
                  :item-title="'Галь Гадот'"
                  :item-price="'1000'"
                  @click="goToProduct()"
              />
            </slide>
            <slide :key="8">
              <good-item
                  :item-title="'Галь Гадот'"
                  :item-price="'1000'"
                  @click="goToProduct()"
              />
            </slide>
            <template #addons>
              <navigation/>
            </template>
          </carousel>
        </main>
      </section>-->
      <section class="reviewsContainer" style="display: none">
        <header class="reviewsContainer__header">
          <h2 class="subTitle">
            Интересные обзоры
          </h2>
        </header>
        <main class="reviewsContainer__main cart-page">
          <carousel
              :items-to-show="width > 1420 ? 7 : width > 1100 ? 4 : width > 1025 ? 3 : width > 768 ? 4 : 3"
              class="blue-slider"
          >
            <slide
                v-for="slide in 7"
                :key="slide"
            >
              <goods-item-reviews/>
            </slide>
            <template #addons>
              <navigation/>
            </template>
          </carousel>
        </main>
      </section>
    </main>
  </section>
</template>

<style scoped lang="scss">
.cartPage {
  .content{
    margin-top: rem(10);
  }
  .categoryName{
    font-size: rem(32);
  }
  &__main {
    position: relative;
    padding: 0 0 rem(20);

    .button_actionButton {
      //position: absolute;
      //top: rem(8);
      //left: 0;
      height: rem(28);
      max-width:rem(200);
      font-size: rem(14);
    }
  }

  .content {
    display: flex;
    gap: rem(32);

    //&__item {
    //  flex: 1 1 50%
    //}
    &__photo {
      flex: 0 1 40%;
    }
    &__information {
      flex: 0 1 30%;
      .saleInformation {
        margin-top: rem(10);
      }
    }
  }

  .moreInfo {
    margin-top: rem(12);

    p {
      white-space: pre-wrap;
    }

    .textMontserrat_medium {
      font-size: rem(18);
    }

    .textMontserrat_regular {
      padding-top: rem(20);
      font-size: rem(16);
    }
  }
  .complain{
    margin-top: rem(12);
    display:flex;
    justify-content: space-between;
    align-items: center;
    &__button{
      cursor:pointer;
      width:100%;
      max-width:rem(150);
      padding: rem(5);
      display: flex;
      justify-content: center;
    }
    .announcementDate{
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
  .cartPageName {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: rem(24);

    .textMontserrat_semiBold{
     font-size: rem(24);
    }
    .textMontserrat_regular {
      font-size: 1rem;
    }

    .rating {
      display: flex;
      align-items: center;
      gap: rem(12);

      .textMontserrat_medium {
        font-size: 1rem;
      }
    }
  }

  .buttonContainer {
    padding-top: rem(12);
    display: flex;
    flex-direction: column;
    gap: rem(12);

    //button {
    //  max-width: 70%;
    //}
  }

  .parameters {
    padding: rem(12) 0;

    h3 {
      font-size: rem(18);
    }

    &__main {
      margin-top: rem(15);
    }

    .parameters__table {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    .tableContent {
      max-width: rem(470);

      ul {
        margin-right: rem(10);
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        margin-bottom: rem(10);
      }

      li {
        &:first-child {
          margin-top: 0;
        }
      }
    }
  }

  .interests {
    padding-top: rem(12);

    &__item {
      margin-top: rem(15);

      &:first-child {
        margin-top: 0;
      }
    }

    &__header {
      .textMontserrat_medium {
        font-size: rem(18);
      }

    }

    &__main {
      margin-top: rem(10);
    }
  }

  .activity {
    padding: rem(12) 0;
    //max-width: rem(420);
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    li {
      margin-top: rem(25);

      &:first-child {
        margin-top: 0;
      }
    }

    .textMontserrat_medium {
      font-size: 1rem;
    }
  }

  @media (max-width: em(1620, 16)) {
    .moreInfo {
      .textMontserrat_medium {
        font-size: calc(16rem / 16 + (18 - 16) * ((100vw - 390rem / 16) / (1620 - 390)));
      }

      .textMontserrat_regular {
        font-size: calc(14rem / 16 + (16 - 14) * ((100vw - 390rem / 16) / (1620 - 390)));
      }
    }
    .parameters, .interests__header, .activity {
      .textMontserrat_regular, .textMontserrat_medium, .textMontserrat_light {
        font-size: calc(14rem / 16 + (16 - 14) * ((100vw - 390rem / 16) / (1620 - 390)));
      }
    }
    .cartPageName {
      //.textMontserrat_medium, p{
      //  font-size: calc(24rem / 16 + (32 - 24) * ((100vw - 390rem / 16) / (1920 - 390)));
      //}
    }
  }

  @media (max-width: em(1620, 16)) and (min-width: em(1024, 16)) {
    .cartPage__main {
      //padding: 4.9375rem calc(8rem / 16 + (120 - 8) * ((100vw - 1024rem / 16) / (1920 - 1024)));
    }
    .content {
      gap: calc(20rem / 16 + (60 - 20) * ((100vw - 1024rem / 16) / (1620 - 1024)));
    }
  }
  @media (max-width: em(1024, 16)) {
    .content {
      flex-direction: column;
      gap: rem(25);

      .cartPageName {
        flex-wrap: wrap;
        gap: rem(1);
        margin-top: calc(15rem / 16 + (25 - 15) * ((100vw - 390rem / 16) / (1024 - 390)));
      }
      .saleInformation{
       margin: calc(15rem / 16 + (25 - 15) * ((100vw - 390rem / 16) / (1024 - 390))) 0;
      }
      .productName {
        font-size: calc(16rem / 16 + (24 - 16) * ((100vw - 390rem / 16) / (1024 - 390)));
      }
      .textMontserrat_medium {
        font-size: 1rem;
      }
    }
    .imageGallery {
      max-width: 100%;
    }
    &__main {
      padding: 0;
    }
    &__user {
      margin-top: rem(25);

      .score {
        margin-top: rem(10);
        display: flex;
        align-items: center;
        gap: rem(11);

        .textMontserrat_light {
          font-size: 1rem;
        }
      }
    }
    .buttonContainer {
      padding: 0;
      gap: calc(16rem / 16 + (25 - 16) * ((100vw - 390rem / 16) / (1024 - 390)))
    }
    .parameters {
      padding: rem(40) 0;
    }
    .moreInfo {
      display: flex;
      flex-direction: column;
      gap: rem(30);

      .textMontserrat_light {
        font-size: calc(14rem / 16 + (16 - 14) * ((100vw - 390rem / 16) / (1024 - 390)));
      }
    }
    .row {
      flex-direction: row;
      padding: 0 rem(21);
    }
    .parameters {
      gap: rem(30);

      .parameters__table {
        display: flex;
        flex-direction: column;
        gap: rem(20);
      }

      .tableContent {
        max-width: 100%;

      }
    }
    .activity {
      gap: rem(30);
      padding: 0;
      display: flex;
    }
  }

  .reviewsContainer {
    margin-top: rem(15);

    &__main {
      margin-top: rem(10);
      display: flex;
      gap: rem(16);

      &.cart-page {
        .carousel__slide {
          padding: 0 rem(8);
        }
      }
    }
  }
}
.fraction {
  padding-bottom: rem(12);
  border-bottom: 1px solid $color_subBg;
}
.carousel__slide {
  align-items: flex-start;
}

.map {
  margin-top: rem(10);

  h3 {
    margin-bottom: rem(10);
  }

  .map-show,
  .underground {
    display: flex;
    align-items: center;
    gap: rem(10);
  }

  .show-button {
    cursor: pointer;
    margin-top: rem(10);
    width: fit-content;
    background: #E9605A;
    padding: rem(5);
    color: #FFFFFF;
    font-size: rem(12);
    border-radius: rem(10);
  }
}
</style>