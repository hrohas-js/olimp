<script setup>
import NavigationCategories from "@/components/NavigationComponents/NavigationCategories";

import {useRouter} from "vue-router";
import {useRoute} from "vue-router";
import {useMainStore} from "@/store/MainStore";
import {computed} from "vue";

const router = useRouter();
const route = useRoute();
const mainStore = useMainStore();

const width = computed(() => mainStore.display_width);
</script>

<template>
  <header class="search background_elements fractions">
    <div
        v-if="width <= 1024"
        class="arrowBeak"
    >
      <svg width="18px" height="20px" viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg">
        <title>ic_back</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"
           stroke-linejoin="round">
          <g id="24-px-Icons" transform="translate(-219.000000, -26.000000)" stroke="#000000">
            <g id="ic_back" transform="translate(216.000000, 24.000000)">
              <g transform="translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000) "
                 id="forward">
                <g transform="translate(4.000000, 3.000000)" stroke-width="2">
                  <path d="M0,9 L16,9" id="Line"></path>
                  <path d="M16,9 L7.93774223,0.937742233" id="Line"></path>
                  <path d="M16,9 L7.93774223,17.0622578" id="Line"></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
    <router-link to="/">
      <div
          v-if="width > 1024"
          class="logo textMontserrat"
      >
        <div class="logo-bebas">
          <img
              src="@/assets/logo.jpg"
              alt="logo"
          />
        </div>
        <!--      <p class="textMontserrat_regular">
                Центр творчества
              </p>-->
      </div>
    </router-link>
    <div
         v-if="route.name !== 'CreateAnnouncement' || route.name !== 'PostAdvertisements'"
         class="searchFilter"
    >
      <navigation-categories />
    </div>
    <div
        v-if="width <= 768"
        class="image"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="31" viewBox="0 0 28 31" fill="none">
        <path
            d="M22.778 10.2444C22.778 7.79266 21.865 5.44131 20.2395 3.70764C18.6142 1.97396 16.4099 1 14.1113 1C11.8128 1 9.60839 1.97396 7.98307 3.70764C6.35775 5.44131 5.44466 7.79266 5.44466 10.2444C5.44466 21.0297 1.11133 24.1111 1.11133 24.1111H27.1113C27.1113 24.1111 22.778 21.0297 22.778 10.2444Z"
            stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        <path
            d="M16.6101 28.4445C16.3561 28.8823 15.9917 29.2457 15.553 29.4982C15.1145 29.7508 14.6173 29.8838 14.1112 29.8838C13.6051 29.8838 13.1079 29.7508 12.6693 29.4982C12.2308 29.2457 11.8662 28.8823 11.6123 28.4445"
            stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </header>
</template>

<style scoped lang="scss">
.search {
  display: flex;
  padding: rem(10) 0;
  gap: rem(50);
  align-items: center;

  ul {
    grid-template-columns: repeat(4, rem(185));
  }

  .logo {
    cursor: pointer;
    flex: 1 1 30%;
    max-width: rem(250);

    .textMontserrat_bold {
      font-size: rem(36);
      //text-align: center;
      letter-spacing: 4.6px;

    }

    .textMontserrat_regular {
      font-size: rem(20);
      //text-align: center;
    }
  }

  .searchFilter {
    overflow-x: auto;
    flex: 1 1 70%;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .arrowBeak {
    cursor: pointer;
  }

  @media (max-width: em(1920, 16)) and (min-width: em(1024, 16)) {
    gap: calc(20rem / 16 + (50 - 20) * ((100vw - 1024rem / 16) / (1920 - 1024)));

    //padding-left: calc(0rem + (37 - 0) * ((100vw - 1024rem / 16) / (1920 - 1024)));
    //padding-right: calc(0rem + (53 - 0) * ((100vw - 1024rem / 16) / (1920 - 1024)));
  }
  @media (max-width: em(1920, 16)) and (min-width: em(390, 16)) {
    padding-top: calc(7rem / 16 + (10 - 7) * ((100vw - 390rem / 16) / (1920 - 390)));
    padding-bottom: calc(7rem / 16 + (10 - 7) * ((100vw - 390rem / 16) / (1920 - 390)));
  }
  @media (max-width: em(1024, 16)) {
    //padding-left: 0;
    //padding-right: 0;
    gap: 1rem;
  }
  @media (max-width: em(390, 16)) {
    padding-top: rem(7);
    padding-bottom: rem(7);
  }
}
</style>