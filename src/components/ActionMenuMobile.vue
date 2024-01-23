<script setup>
import MainSearch from "@/components/UI/Filters/MainSearch";
import {ref, computed} from "vue";
import {useMainStore} from "@/store/MainStore";
import {useAuthStore} from "@/store/AuthStore";
import {useRouter} from "vue-router";
import {useProfileStore} from "@/store/ProfileStore";

const mainStore = useMainStore();
const authStore = useAuthStore();
const profileStore = useProfileStore();
const router = useRouter();

const jwt = computed(() => authStore.jwt);

const searchShow = ref(false);

const changeSearchShow = () => {
  searchShow.value = !searchShow.value;
}

const profileRouter = (to, param = '') => {
  if (jwt.value) {
    router.push(to);
    if (param.length > 0) {
      profileStore.content = param;
    }
  } else {
    mainStore.popup = 'auth';
  }
}
</script>

<template>
  <nav class="actionMenu background_elements">
    <main-search v-if="searchShow" />
    <ul class="wrapper">
      <li @click="changeSearchShow">
        <div class="image">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path d="M19 19L25 25" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1 11.2857C1 16.9663 5.60507 21.5714 11.2857 21.5714C14.1309 21.5714 16.7065 20.4162 18.5685 18.5491C20.4242 16.6886 21.5714 14.1211 21.5714 11.2857C21.5714 5.60507 16.9663 1 11.2857 1C5.60507 1 1 5.60507 1 11.2857Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <p class=" textMontserrat_medium color_colorSubBg">
          Поиск
        </p>
      </li>
      <li @click="profileRouter('/profile', 'wishList')">
        <div class="image">
          <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 27 24" fill="none">
            <path d="M26.3846 8.16494C26.3846 10.0551 25.6309 11.8706 24.2851 13.2136C21.187 16.3059 18.1821 19.5305 14.9683 22.5108C14.2316 23.184 13.063 23.1594 12.3581 22.4558L3.099 13.2136C0.300333 10.4199 0.300333 5.90995 3.099 3.11636C5.92517 0.295327 10.5293 0.295327 13.3555 3.11636L13.6921 3.45229L14.0284 3.11656C15.3834 1.76328 17.2289 1 19.1567 1C21.0846 1 22.9299 1.7632 24.2851 3.11636C25.6311 4.45944 26.3846 6.27483 26.3846 8.16494Z" stroke="white" stroke-linejoin="round"/>
          </svg>
        </div>
        <p class=" textMontserrat_medium color_colorSubBg">
          Избранное
        </p>
      </li>
      <li @click="profileRouter('/create')">
        <div class="image">
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="27" viewBox="0 0 35 27" fill="none">
            <rect x="0.5" y="0.5" width="34" height="26" stroke="white"/>
            <path d="M9 13.5H17.5952M17.5952 13.5H26.1905M17.5952 13.5V4M17.5952 13.5V23" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <p class="textMontserrat textMontserrat_medium color_colorSubBg">
          Объявления
        </p>
      </li>
      <li @click="profileRouter('/profile', 'messages')">
        <div class="image">
          <svg xmlns="http://www.w3.org/2000/svg" width="31" height="22" viewBox="0 0 31 22" fill="none">
            <path d="M8.25 6.7998L15.5 11.8748L22.75 6.7998" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1 18.4V3.9C1 2.29837 2.29837 1 3.9 1H27.1C28.7017 1 30 2.29837 30 3.9V18.4C30 20.0017 28.7017 21.3 27.1 21.3H3.9C2.29837 21.3 1 20.0017 1 18.4Z" stroke="white"/>
          </svg>
        </div>
        <p class="textMontserrat textMontserrat_medium color_colorSubBg">
          Сообщения
        </p>
      </li>
      <li @click="profileRouter('/profile')">
        <div class="image">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="27" viewBox="0 0 24 27" fill="none">
            <path d="M1 26V24.4375C1 18.3969 5.89689 13.5 11.9375 13.5C17.9781 13.5 22.875 18.3969 22.875 24.4375V26" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.9375 13.5C15.3892 13.5 18.1875 10.7017 18.1875 7.25C18.1875 3.79822 15.3892 1 11.9375 1C8.48572 1 5.6875 3.79822 5.6875 7.25C5.6875 10.7017 8.48572 13.5 11.9375 13.5Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <p class="textMontserrat textMontserrat_medium color_colorSubBg">
          Профиль
        </p>
      </li>
    </ul>
  </nav>

</template>

<style scoped lang="scss">
.actionMenu{
  padding:rem(8) 0;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 99999;

  .wrapper {
    margin-top: rem(5);
  }

  ul{
    display: flex;
    justify-content: space-between;
    li{
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: rem(3);
    }
  }
  svg path, svg rect{
    stroke: $color_subBg;
  }
}
</style>