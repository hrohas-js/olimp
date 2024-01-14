<script setup>
import MainHeader from "@/components/HeaderComponents/MainHeader";
import ActionMenuMobile from "@/components/ActionMenuMobile";
import FooterComponent from "@/components/Footer/FooterComponent";
import HeaderCartPage from "@/components/HeaderComponents/HeaderCartPage";
import ProfileNavigationMobile from "@/components/NavigationComponents/ProfileNavigationMobile";
import CatalogSubCategories from "@/components/NavigationComponents/CatalogSubCategories";
import Loader from "@/components/UI/Modals/Loader";
import AuthForm from "@/components/UI/Modals/AuthForm";
import {useMainStore} from "@/store/MainStore";
import {useProfileStore} from "@/store/ProfileStore";
import {useCatalogStore} from "@/store/CatalogStore";
import {useAuthStore} from "@/store/AuthStore";
import {useRouter} from "vue-router";
import {onMounted, onBeforeMount, computed, watch, nextTick} from "vue";
import EditPersonalForm from "@/components/UI/Modals/EditPersonalForm";
import GeoForm from "@/components/UI/Modals/GeoForm";
import GeoAnnouncementForm from "@/components/UI/Modals/GeoAnnouncementForm";
import ChatBody from "@/components/ProfileTabs/Massage/Chat/ChatBody";
import Filter from "@/components/UI/Filters/Filter";

const mainStore = useMainStore();
const profileStore = useProfileStore();
const catalogStore = useCatalogStore();
const authStore = useAuthStore();
const router = useRouter();

const width = computed(() => mainStore.display_width);
const popup = computed(() => mainStore.popup);
const navigation = computed(() => profileStore.navigationMobile);
const subCategories = computed(() => catalogStore.subCategories);
const showModalSubCategories = computed(() => catalogStore.showModalSubCategories);
const showModalFilters = computed(() => catalogStore.showModalFilters);
const load = computed(() => mainStore.loader);
const jwt = computed(() => authStore.jwt);
const miniChat = computed(() => mainStore.miniChat);
const notifications = computed(() => profileStore.notifications);

watch(jwt, (newValue, oldValue) => {
  if (newValue !== null && oldValue === null) {
    router.push('/profile');
  } else if (newValue === null) {
    nextTick(() => {
      router.push('/');
    });
  }
});
watch(notifications, (newValue, oldValue) => {
  if (newValue.length > oldValue.length) {
    profileStore.newNotificationsCount = newValue.length - oldValue.length
  } else {
    profileStore.newNotificationsCount = 0
  }
});

onBeforeMount(() => {
  catalogStore.getCategories();
  catalogStore.getAnnouncements();
  mainStore.fetchCoords();
});

onMounted(() => {
  if (jwt.value !== null) {
    authStore.checkAuth();
  }
  mainStore.display_width = window.innerWidth;
  window.addEventListener('resize', () => {
    mainStore.display_width = window.innerWidth;
  });
});
</script>

<template>
  <section
      class="app textMontserrat"
      :class="{'overflow':navigation}"
  >
    <main-header v-if="width > 768"/>
    <header-cart-page v-if="width < 1024 && $route.path ==='/cartPage'"/>
    <main class="app__main">
      <router-view/>
    </main>
    <div
        v-if="showModalSubCategories"
        class="modal"
    >
      <catalog-sub-categories :category-items="subCategories"/>
    </div>
    <div
        v-if="showModalFilters"
        class="modal"
    >
      <Filter class="color_black filter-mobile" />
    </div>
    <action-menu-mobile v-if="width <= 768"/>
    <footer-component/>
    <profile-navigation-mobile v-if="navigation"/>
    <loader v-if="load" />
    <auth-form v-if="popup === 'auth' || popup === 'register'" />
    <edit-personal-form v-if="popup === 'edit-personal'" />
    <geo-form v-if="popup === 'location'" />
    <geo-announcement-form v-if="popup === 'deal-location'" />
    <div
        v-if="miniChat"
        class="widget"
    >
      <chat-body class="mini" />
    </div>
  </section>
</template>

<style lang="scss">
@font-face {
  font-family: 'Bebas';
  src: url('@/assets/fonts/Bebas.ttf') format('truetype');
}
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Forum&display=swap');

* {
  padding: 0;
  margin: 0;
  border: none;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

main {
  position: relative;
}

:focus,
:active {
  outline: none;
}

a:focus,
a:active {
  outline: none;
}

a, a:link, a:visited {
  text-decoration: none;
  display: inline-block;
}

a:hover {
  text-decoration: none;
}

aside, nav, footer, header, section, main {
  display: block;
}

h1, h2, h3, h4, h5, h6, p {
  font-size: inherit;
  font-weight: inherit;
}

ul, li {
  list-style: none;
}

img {
  vertical-align: top;
}

img, svg {
  max-width: 100%;
  height: auto;
}

address {
  font-style: normal;
}

input, textarea, button, select {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: transparent;
}

input::-ms-clear {
  display: none;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none; // Yeah, yeah everybody write about it
}

input[type='number'],
input[type="number"]:hover,
input[type="number"]:focus {
  appearance: none;
  -moz-appearance: textfield;
}

textarea {
  -webkit-appearance: none;
}

textarea::-webkit-resizer {
  display: none;
}

button, input[type="submit"] {
  display: inline-block;
  box-shadow: none;
  background: none;
  cursor: pointer;
}

input:focus, input:active,
button:focus, button:active {
  outline: none;
}

button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

//миксины
@mixin mainButton {
  @extend .background_accent;
  @extend .textMontserrat;
  @extend .textMontserrat_medium;
  @extend .color_colorBg;
  width: 100%;
  padding: rem(10) 0;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  gap: rem(10);
  align-items: center;
  border-radius: rem(10);
  @media (max-width: em(1024, 16)) {
    font-size: 1rem;
  }
}

@mixin subTitle {
  @extend .textMontserrat;
  @extend .textMontserrat_medium;
  @extend .color_colorSubBg;
  font-size: rem(24);
  @media (max-width: em(1920, 16)) {
    font-size: calc(20rem / 16 + (24 - 20) * ((100vw - 390rem / 16) / (1920 - 390)));
  }
}

@mixin subItemTitle {
  @extend .textMontserrat;
  @extend .textMontserrat_medium;
  @extend .color_colorSubBg;
  font-size: rem(20);
  @media (max-width: em(1920, 16)) {
    font-size: calc(14rem / 16 + (20 - 14) * ((100vw - 390rem / 16) / (1920 - 390)));
  }
}

@mixin subItemText {
  @extend .textMontserrat;
  @extend .textMontserrat_light;
  font-size: rem(15);
  @media (max-width: em(1920, 16)) {
    font-size: calc(13rem / 16 + (15 - 13) * ((100vw - 390rem / 16) / (1920 - 390)));
  }
}

@mixin subItemPrise {
  @extend .textMontserrat;
  @extend .textMontserrat_regular;
  font-size: rem(20);
  @media (max-width: em(1920, 16)) {
    font-size: calc(14rem / 16 + (20 - 14) * ((100vw - 390rem / 16) / (1920 - 390)));
  }
}

@mixin activeButton {
  @extend .textMontserrat;
  @extend .textMontserrat_light;
  @extend .border_subBg;
  height: rem(35);
  border-radius: 5px;
  width: 100%;
  max-width: rem(249);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

//общие стили

.app {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;

  &__main {
    flex: 1 1 auto;
    padding-bottom: rem(200);
  }

  @media (max-width: em(1920, 16)) {
    &__main {
      padding-bottom: calc(54rem / 16 + (200 - 54) * ((100vw - 390rem / 16) / (1920 - 390)));
    }
  }
}

.wrapper {
  width: 100%;
  max-width: rem(1620);
  padding: 0 2.68229166667%;
  margin: 0 auto;
  @media (max-width: em(768, 16)) {
    padding: 0 3.08%;
  }
}

.modal {
  @extend .background_modal;
  @extend .color_colorBg;
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.widget {
  position: fixed;
  bottom: 0;
  right: 3%;
  width: rem(372);
  box-shadow: 0 5px 17px 0 rgba(0, 0, 0, .15)
}

.overflow {
  overflow: hidden;
}

.textMontserrat {
  font-family: 'Montserrat', sans-serif;
  font-size: rem(16);

  &_thin {
    font-weight: 100;
  }

  &_light {
    font-weight: 300;
  }

  &_regular {
    font-weight: 400;
  }

  &_medium {
    font-weight: 500;
  }

  &_semiBold {
    font-weight: 600;
  }

  &_bold {
    font-weight: 700;
  }

  &_extraBold {
    font-weight: 800;
  }

  &_select {
    font-weight: 900;
  }

  @media (max-width: em(1920, 16)) {
    &_medium {
      font-size: calc(10rem / 16 + (16 - 10) * ((100vw - 390rem / 16) / (1920 - 390)));
    }
  }
}

.textForum {
  font-family: 'Forum', serif;
  font-size: rem(16);

  &_regular {
    font-weight: 400;
  }
}

.subTitle {
  @include subTitle;
}

.announcementItem {
  width: 100%;
  //max-width: rem(250);
  @extend .background_elements;
}

.subItemTitle {
  @include subItemTitle;
}

.subItemText {
  @include subItemText;
  @media (max-width: em(768, 16)) {
    font-weight: 100;
  }
}

.subItemTextPrice {
  @include subItemPrise;
}

.background {
  &_mainBg {
    background-color: $color_bg;
  }

  &_elements {
    background-color: $color_bgLight;
  }

  &_accent {
    background-color: $color_accent;
  }

  &_avito {
    background-color: $color_blueLikeAvt;
  }

  &_subBg {
    background-color: $color_subBg;
  }

  &_green {
    background: $color_green;
  }

  &_gray {
    background: $color_gray;
  }

  &_grayLight {
    background: $color_grayLight;
  }

  &_modal {
    background: $color_subBgLight;
    backdrop-filter: blur(2px);
  }

  &_blackLight {
    background: $color_blackLight;
  }
}

.border {

  &_subBg {
    border: 1px solid $color_subBg;
  }

  &_subBgOpacity {
    border: 1px solid $color_subBgOpacity;
  }

  &_accent {
    border: 1px solid $color_accent;
  }

  &_gray {
    border: 1px solid $color_bg;
  }
}

.color {
  &_colorBg {
    color: $color_bg;
  }

  &_gray {
    color: $color_gray;
  }

  &_grayDarker {
    color: $color_grayDarker;
  }

  &_colorSubBg {
    color: $color_subBg;
  }

  &_likeAvt {
    color: $color_blueLikeAvt;
  }

  &_accent {
    color: $color_accent;
  }

  &_green {
    color: $color_green;
  }

  &_blackLight {
    color: $color_blackLight;
  }

  &_black {
    color: $color_black;
  }
}

.button {
  &_mainButton {
    @include mainButton;
  }

  &_actionButton {
    @include activeButton;
  }
}

.content {
  :has(.lineHeader) {
    .lineHeader::after {
      @extend .background_accent;
      content: "";
      width: rem(300);
      height: rem(1);
      display: block;
      margin: rem(4) auto 0;
    }
  }
}

.filterContainer {
  @extend .background_elements;
}

.categoryName {
  margin: rem(20) 0;

  .textMontserrat {
    font-size: rem(26);
  }

  @media (max-width: em(1920, 16)) {
    .textMontserrat_medium {
      font-size: calc(20rem / 16 + (26 - 20) * ((100vw - 390rem / 16) / (1920 - 390)))
    }
  }
  @media(max-width: em(1024, 16)) {
    margin: rem(20) 0;
  }
}

.main {
  display: flex;
}

.left {
  flex: 0 0 15%;
}

.right {
  flex: 0 0 20%;
}

.goodItemContainer {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: rem(10) rem(8);
  height: fit-content;
  padding: 0 rem(10);
  @media (max-width: em(1420, 16)) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: em(1100, 16)) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: em(1025, 16)) {
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
  }
  @media (max-width: em(768, 16)) {
    grid-template-columns: repeat(2, 1fr);
  }

  &.mainCatalog {
    grid-template-columns: repeat(5, 1fr);
  }
}

.profileTab {
  @extend .textMontserrat;
  @extend .background_elements;
  //padding: 0 rem(20);

  &__header {
    .textMontserrat_medium {
      font-size: rem(18);
    }

    .textMontserrat_light {
      font-size: rem(16);
    }
  }

  @media (max-width: em(1024, 16)) {
    padding: 0;
  }

  .fraction {
    border-bottom: 1px solid $color_subBgOpacity;
    padding-bottom: rem(28);
  }
}

.fractions {
  border-bottom: 1px solid $color_subBgOpacity;
  padding-bottom: rem(28);
}

.profileNavigation {
  overflow-x: auto;
  .textMontserrat_bold{
    font-size: rem(16);
  }

  ul {
    min-width: rem(488);
    border-bottom: 1px solid $color_subBgLight;
    margin-top: rem(20);
    display: flex;
    gap: rem(20);
  }

  &__item {
    padding: 0 rem(10) rem(10) 0;
    color: $color_blackLight;
    cursor: pointer;
  }

  .active {
    color: $color_black;
    border-bottom: 1px solid $color_subBg;
    font-size: 1rem;
  }

  @media (max-width: em(1024, 16)) {
    font-size: calc(1rem + (20 - 16) * ((100vw - 390rem / 16) / (1024 - 390)));
    ul {
      gap: rem(10);
    }
    //&__item {
    //  padding-right: calc(15rem / 16 + (76 - 15) * ((100vw - 390rem / 16) / (1024 - 390)));
    //
    //}
  }
  &::-webkit-scrollbar{
    display: none;
  }
}

.profileGoods {
  //max-width: rem(600);
  .header {
    .textMontserrat_medium {
      font-size: rem(20);
    }
  }

  .info {
    .price {
      font-size: rem(20);
    }
  }

  time, .infoLocation {
    @extend .color_blackLight;
    font-size: rem(14);
  }


  @media (max-width: em(1920, 16)) {
    .header {
      .textMontserrat_medium {
        font-size: calc(14rem / 16 + (20 - 14) * ((100vw - 390rem / 16) / (1920 - 390)));
      }
    }
    .info {
      .price {
        font-size: calc(12rem / 16 + (20 - 12) * ((100vw - 390rem / 16) / (1920 - 390)));
      }

      time {
        margin: calc(7rem / 16 + (10 - 7) * ((100vw - 390rem / 16) / (1920 - 390))) 0;
        font-size: calc(10rem / 16 + (14 - 10) * ((100vw - 390rem / 16) / (1024 - 390)));
      }

      .infoLocation {
        font-size: calc(10rem / 16 + (14 - 10) * ((100vw - 390rem / 16) / (1920 - 390)));
      }
    }
  }
}

.navigationCategories {
  li {
    @extend .background_mainBg;
    cursor: pointer;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: rem(7);
    border-radius: 10px;
    transition: all 0.3s;
    a {
      padding: rem(10);
    }
    p {
      flex: 1 1 80%;
      text-align: left;
    }

    &:hover {
      background-color: $color_gray;
    }
  }

  .active {
    background-color: $color_gray;
  }

}

.catalogSubCategories {
  @extend .navigationCategories;
  @extend .textMontserrat;

  sub {
    @extend .background_subBg;
    @extend .color_colorBg;
    width: rem(25);
    height: rem(25);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &_mobile {
    height: 70%;
    overflow: auto;
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
    background: $color_bg;

    ul {
      display: flex;
      flex-direction: column;
      gap: rem(8);
      overflow: auto;
    }

    li {
      padding: 0;
      background: none;
    }
  }
}

.filter-mobile {
  height: 60%;
  overflow: auto;
  padding: rem(10);
}

.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.custom-checkbox:checked + label::before {
  border-color: #0b76ef;
  background-color: #0b76ef;
}

.custom-radio {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

/* для элемента label связанного с .custom-radio */
.custom-radio + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}

/* создание в label псевдоэлемента  before со следующими стилями */
.custom-radio + label::before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid $color_gray;
  border-radius: 50%;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}

/* стили для радиокнопки, находящейся в фокусе */
.custom-radio:focus + label::before {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* стили для радиокнопки, находящейся в фокусе и не находящейся в состоянии checked */
.custom-radio:focus:not(:checked) + label::before {
  border-color: $color_accent;
}

/* стили для радиокнопки, находящейся в состоянии checked */
.custom-radio:checked + label::before {
  border-color: $color_accent;
  background-color: $color_accent;
}

.blue-slider {
  .carousel__prev, .carousel__next {
    background: #2963A4 !important;
    border-radius: 50% !important;
    width: rem(50) !important;
    height: rem(50) !important;

    @media (max-width: em(768, 16)) {
      //margin: 0 rem(-10) !important;
      display: none;
    }

    svg {
      fill: #FFFFFF;
    }
  }

  @media (max-width: em(768, 16)) {
    overflow-x: hidden;
  }
}

.red-slider {
  svg {
    fill: #E9605A;
    transform: scale(1.5);
  }
}

#gallery {
  margin-bottom: rem(20);

  .carousel__viewport {
    border: 1px solid $color_subBg;
  }

  .carousel__track {
    margin: 0 !important;
  }

  .carousel__slide {
    height: rem(300);
    @extend .background_modal;
  }

  .carousel__prev,
  .carousel__next {
    width: rem(45);
    height: rem(45);
    background: #f2f3f4;
    border-radius: 50%;
    opacity: 0.5;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

#thumbnails {
  .carousel__slide--active {
    border: 2px solid $color_subBg;
  }

  ol {
    gap: rem(8);

    img {
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>