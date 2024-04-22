<script setup>
import MainButton from "@/components/UI/Button/MainButton";
import ProfileNavigation from "@/components/NavigationComponents/ProfileNavigation";
import {computed, ref} from "vue";
import {useRouter, useRoute} from "vue-router";
import {useAuthStore} from "@/store/AuthStore";
import {useMainStore} from "@/store/MainStore";
import {useProfileStore} from "@/store/ProfileStore";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const mainStore = useMainStore();
const profileStore = useProfileStore();

const showNavigation = ref(false);

const isAuth = computed(() => authStore.jwt !== null);
const name = computed(() => profileStore.user.name);
const mainLetter = computed(() => profileStore.userMainLetter);
const country = computed(() =>  mainStore.country);
const notCount = computed(() => profileStore.newNotificationsCount);

const newMessages = computed(() => {
  let res = false;
  [...profileStore.myChats].forEach(elem => {
    if (elem.new_messages === 1) {
      res = true;
    }
  });
  return res;
});

const routerPush = (page) => {
  router.push(page)
}

const openAuthForm = () => {
  mainStore.popup = 'auth';
}

const openRegistrationForm = () => {
  mainStore.popup = 'register';
}

const goToProfile = (mode) => {
  profileStore.content = mode;
  router.push('/profile');
}
</script>

<template>
  <div
      v-if="route.name !== 'home'"
      class="hr"
  />
  <div
      :class="{
        'background_subBg':route.name !== 'home',
        'background_elements':route.name === 'home'
      }"
  >
    <header class="wrapper mainHeader">
      <div class="mainHeader__item">
        <div class="image country">
          <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
            <path
                d="M1 15.5C1 23.5081 7.49187 30 15.5 30C23.5081 30 30 23.5081 30 15.5C30 7.49187 23.5081 1 15.5 1C7.49187 1 1 7.49187 1 15.5Z"
                stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
            <path
                d="M16.9501 1.07149C16.9501 1.07149 21.3001 6.79989 21.3001 15.4998C21.3001 24.1998 16.9501 29.9283 16.9501 29.9283"
                stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
            <path
                d="M14.0501 29.9283C14.0501 29.9283 9.70007 24.1998 9.70007 15.4998C9.70007 6.79989 14.0501 1.07149 14.0501 1.07149"
                stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1.91284 20.575H29.0869" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1.91284 10.425H29.0869" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <p class="textMontserrat textMontserrat_medium">
          {{ country }}
        </p>
      </div>
      <div
          v-if="!isAuth"
          class="mainHeader__item"
      >
        <p
            class="textMontserrat textMontserrat_medium"
            @click="openAuthForm"
        >
          Войти
        </p>
        <div class="line background_accent"/>
        <p
            class="textMontserrat textMontserrat_medium"
            @click="openRegistrationForm"
        >
          Зарегистрироваться
        </p>
      </div>
      <div
          v-if="isAuth"
          class="mainHeader__item actions"
      >
        <div
            class="image"
            @click="goToProfile('notification')"
        >
          <span
              v-if="notCount > 0"
              class="background_accent color_likeAvt"
          >
            {{ notCount }}
          </span>
          <svg
              class="ring"
              xmlns="http://www.w3.org/2000/svg" width="28" height="31" viewBox="0 0 28 31" fill="none">
            <path
                d="M22.778 10.2444C22.778 7.79266 21.865 5.44131 20.2395 3.70764C18.6142 1.97396 16.4099 1 14.1113 1C11.8128 1 9.60839 1.97396 7.98307 3.70764C6.35775 5.44131 5.44466 7.79266 5.44466 10.2444C5.44466 21.0297 1.11133 24.1111 1.11133 24.1111H27.1113C27.1113 24.1111 22.778 21.0297 22.778 10.2444Z"
                stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
            <path
                d="M16.6101 28.4445C16.3561 28.8823 15.9917 29.2457 15.553 29.4982C15.1145 29.7508 14.6173 29.8838 14.1112 29.8838C13.6051 29.8838 13.1079 29.7508 12.6693 29.4982C12.2308 29.2457 11.8662 28.8823 11.6123 28.4445"
                stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div
            class="image"
            @click="goToProfile('wishList')"
        >
          <svg
              class="heart"
              xmlns="http://www.w3.org/2000/svg" width="32" height="28" viewBox="0 0 32 28" fill="none">
            <path
                d="M31 9.46765C31 11.7015 30.1093 13.847 28.5187 15.4342C24.8573 19.0888 21.3061 22.8997 17.5079 26.4218C16.6373 27.2174 15.2563 27.1884 14.4232 26.3568L3.48064 15.4342C0.173121 12.1326 0.173121 6.80267 3.48064 3.50116C6.82066 0.167205 12.2619 0.167205 15.6019 3.50116L15.9997 3.89816L16.3972 3.50139C17.9986 1.90206 20.1796 1 22.4579 1C24.7363 1 26.9171 1.90197 28.5187 3.50116C30.1094 5.08843 31 7.23389 31 9.46765Z"
                stroke="black" stroke-linejoin="round"/>
          </svg>
        </div>
<!--        <div
            class="image"
            @click="goToProfile('messages')"
        >
          <span
              v-if="newMessages"
              class="background_accent color_likeAvt"
          />
          <svg
              class="mail"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px" y="0px" width="42px" height="42px" viewBox="-0.5 0.5 42 42" xml:space="preserve">
                <path d="M40.5,31.5v-18c0,0-18.2,12.7-19.97,13.359C18.79,26.23,0.5,13.5,0.5,13.5v18c0,2.5,0.53,3,3,3h34
	                    C40.029,34.5,40.5,34.061,40.5,31.5z M40.471,9.971c0-1.821-0.531-2.471-2.971-2.471h-34c-2.51,0-3,0.78-3,2.6l0.03,0.28
	                    c0,0,18.069,12.44,20,13.12C22.57,22.71,40.5,10.1,40.5,10.1L40.471,9.971z"/>
          </svg>
        </div>-->
        <!--        <div class="image">-->
        <!--          <svg width="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" @click="routerPush('/profile')">-->
        <!--            <g data-name="Layer 2" id="Layer_2">-->
        <!--              <path-->
        <!--                  d="M16,17.5A7.5,7.5,0,1,1,23.5,10,7.5,7.5,0,0,1,16,17.5Zm0-14A6.5,6.5,0,1,0,22.5,10,6.51,6.51,0,0,0,16,3.5Z"/>-->
        <!--              <path-->
        <!--                  d="M26,28.5H6a.5.5,0,0,1-.5-.5V22a.68.68,0,0,1,0-.14c.48-1.66,2-2.81,3.4-3.82.33-.25.64-.48.93-.72a.51.51,0,0,1,.68.05A7.17,7.17,0,0,0,16,19.5a7.11,7.11,0,0,0,5.45-2.13.51.51,0,0,1,.68-.05c.29.24.6.47.93.71,1.37,1,2.92,2.17,3.4,3.83a.68.68,0,0,1,0,.14v6A.5.5,0,0,1,26,28.5Zm-19.5-1h19V22.07c-.41-1.3-1.79-2.33-3-3.23l-.61-.46A8.24,8.24,0,0,1,16,20.5a8.29,8.29,0,0,1-5.89-2.12l-.62.46c-1.22.9-2.6,1.93-3,3.23Z"/>-->
        <!--            </g>-->
        <!--          </svg>-->
        <!--        </div>-->
        <div
            class="person"
            @click="routerPush('/profile')"
            @mouseenter="showNavigation = true"
            @mouseleave="showNavigation = false"
        >
          <div
              :class="{
                'background_subBg':route.name === 'home',
                'background_accent':route.name !== 'home'
          }"
              class="circle textMontserrat_bold"
          >
            {{ mainLetter }}
          </div>
          <div class="name">
            <p class="textMontserrat_regular">
              {{ name }}
            </p>
            <div class="arrow">
              <svg
                  fill="#f1f1f1" height="8px" width="8px" id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 330 330" xml:space="preserve"
              >
                <path
                    id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	                    c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	                    s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                />
              </svg>
            </div>
          </div>
          <div
              v-if="showNavigation"
              class="navigatorContainer background_elements"
          >
            <profile-navigation
                position="header"
            />
          </div>
        </div>
        <div
            v-if="route.name === 'home'"
            class="line background_accent"
        />
        <main-button
            v-if="route.name !== 'home'"
            button-text="Разместить объявление"
            @click="routerPush('/create')"
        />
      </div>
    </header>
  </div>
</template>

<style scoped lang="scss">
.hr {
  display: block;
  width: 100%;
  height: rem(3);
  padding: rem(2) 0;
  background-color: $color_subBg;
  margin-bottom: rem(1);
}
.background_subBg {

  svg path {
    //stroke: $color_bg;
    fill: $color_bg;
  }

  color: $color_bg;

  .ring, .heart {
    path {
      fill: $color_bg;;
      stroke: $color_bg;
    }
  }
}
.background_elements{
  .ring, .heart {
    path {
      fill: $color_blackLight;
      stroke: $color_blackLight;
    }
  }
}
.mainHeader {
  //padding-top: rem(8);
  //padding-bottom: rem(8);
  height: rem(44);
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__item {
    height: 100%;
    display: flex;
    align-items: center;
    gap: rem(8);

    .image {
      //max-width: rem(24);
      min-width: rem(20);
      min-height: rem(20);
      position: relative;

      span {
        position: absolute;
        top: rem(-3);
        right: rem(-3);
        font-size: rem(8);
        width: rem(12);
        height: rem(12);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        z-index: 999;
      }

      svg {
        width: rem(20);
        height: rem(20);
      }

      &.country {
        width: rem(16);
      }

      .mail {
        transform: scale(1.1);
      }
    }

    .line {
      width: rem(2);
      height: rem(20);
    }

    :is(p,svg) {
      cursor: pointer;
    }
  }

  .person {
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    gap: rem(8);

    .circle {
      flex-shrink: 0;
      cursor: pointer;
      width: rem(32);
      height: rem(32);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
    }

    .name {
      cursor: pointer;
      display: flex;
      gap: rem(3);

      .arrow {
        flex-shrink: 0;
      }
    }
  }

  .actions {
    gap: rem(28);
  }
}

.navigatorContainer {
  width: rem(320);
  padding: 0 rem(20);
  position: absolute;
  top: rem(44);
  right: 0;
  z-index: 99000;
  box-shadow: 0 10px 10px 5px rgb(221, 221, 221);
}

.profileNavigator {
  color: $color_black;
}

.cinema {
  padding-top: rem(30);
  background-image: url("@/assets/svg/cinema.svg");
  background-size: rem(32);
  background-position-y: -4px;
  background-repeat: repeat-x;

  &_white {
    background-position-y: -2px;
    background-image: url("@/assets/svg/cinemaWhite.svg");
  }
}
</style>