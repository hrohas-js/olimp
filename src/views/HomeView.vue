<script setup>
import HeaderBanner from "@/components/HeaderComponents/HeaderBanner";
import NavigationCategories from "@/components/NavigationComponents/NavigationCategories";
import AnnouncementItem from "@/components/AnnouncementComponents/AnnouncementItem";
import GoodItem from "@/components/Goods/GoodItem";
import AdvertisingItem from "@/components/Advertising/AdvertisingItem";
import GoodsItemReviews from "@/components/Goods/GoodsItemHit";
import MainSearch from "@/components/UI/Filters/MainSearch";
import "vue3-carousel/dist/carousel.css";
import {Carousel, Navigation, Slide} from "vue3-carousel";
import {computed, onBeforeMount} from "vue";
import {useRouter} from "vue-router";
import {useMainStore} from "@/store/MainStore";
import {useCatalogStore} from "@/store/CatalogStore";
import {useProfileStore} from "@/store/ProfileStore";
import HeaderBannerMobile from "@/components/HeaderComponents/HeaderBannerMobile";

const router = useRouter();
const mainStore = useMainStore();
const catalogStore = useCatalogStore();
const profileStore = useProfileStore();

const width = computed(() => mainStore.display_width);
const location = computed(() => mainStore.location);
const catalog = computed(() => {
  const originalCatalog = catalogStore.searchCatalog;
  return originalCatalog.slice().sort(() => Math.random() - 0.5);
});
const name = computed(() => profileStore.user.name);
const info = computed(() => mainStore.info);
const video = computed(() => mainStore.videoReviews);

onBeforeMount(() => {
  catalogStore.getAnnouncements();
  profileStore.getLikes();
});

const openGeo = () => {
  mainStore.popup = 'location';
}
</script>

<template>
  <section class="home">
    <header-banner-mobile v-if="width <= 768" />
    <header-banner v-if="width > 768"/>
    <div class="wrapper">
      <section class="content">
        <navigation-categories/>
        <div
            v-if="width <= 1024 && width > 768"
            class="filterContainer"
        >
          <div
              class="geo"
              @click="openGeo"
          >
            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7.999" cy="6.8" stroke="#000" stroke-width="1.2" r="1.8"></circle>
              <path
                  d="m8.002 14.998-.452.395a.6.6 0 0 0 .903 0l-.451-.395Zm-4.196-4.8-.466.378.014.017.452-.395Zm8.396 0 .451.396a.587.587 0 0 0 .014-.018l-.465-.378Zm-9-3.4a4.8 4.8 0 0 1 4.8-4.8v-1.2a6 6 0 0 0-6 6h1.2Zm4.8-4.8a4.8 4.8 0 0 1 4.8 4.8h1.2a6 6 0 0 0-6-6v1.2Zm.451 12.606-4.195-4.8-.904.79 4.196 4.8.903-.79Zm3.297-4.8-4.2 4.8.903.79 4.2-4.8-.903-.79Zm1.052-3.006a4.774 4.774 0 0 1-1.066 3.022l.931.756a5.974 5.974 0 0 0 1.335-3.778h-1.2ZM4.272 9.82a4.778 4.778 0 0 1-1.07-3.022h-1.2c0 1.432.501 2.747 1.338 3.778l.932-.756Z"
                  fill="#000">
              </path>
            </svg>
            <p class="textMontserrat_regular">
              {{ location === '' ? 'Выберите город' : location }}
            </p>
          </div>
          <div class="searchContainer">
            <main-search/>
          </div>
        </div>
        <section
            v-if="width <= 1024"
            class="announcement"
        >
          <header class="announcement__header">
            <h2 class="subTitle">
              Инфо
            </h2>
          </header>
          <main class="announcement__container">
            <announcement-item
                v-for="(item, index) in info"
                :key="index"
                :item="item"
            />
          </main>
        </section>
        <div
            v-if="width > 1024"
            class="filterContainer"
        >
          <div
              class="geo"
              @click="openGeo"
          >
            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7.999" cy="6.8" stroke="#000" stroke-width="1.2" r="1.8"></circle>
              <path
                  d="m8.002 14.998-.452.395a.6.6 0 0 0 .903 0l-.451-.395Zm-4.196-4.8-.466.378.014.017.452-.395Zm8.396 0 .451.396a.587.587 0 0 0 .014-.018l-.465-.378Zm-9-3.4a4.8 4.8 0 0 1 4.8-4.8v-1.2a6 6 0 0 0-6 6h1.2Zm4.8-4.8a4.8 4.8 0 0 1 4.8 4.8h1.2a6 6 0 0 0-6-6v1.2Zm.451 12.606-4.195-4.8-.904.79 4.196 4.8.903-.79Zm3.297-4.8-4.2 4.8.903.79 4.2-4.8-.903-.79Zm1.052-3.006a4.774 4.774 0 0 1-1.066 3.022l.931.756a5.974 5.974 0 0 0 1.335-3.778h-1.2ZM4.272 9.82a4.778 4.778 0 0 1-1.07-3.022h-1.2c0 1.432.501 2.747 1.338 3.778l.932-.756Z"
                  fill="#000">
              </path>
            </svg>
            <p class="textMontserrat_regular">
              {{ location === '' ? 'Выберите город' : location }}
            </p>
          </div>
          <div class="searchContainer">
            <main-search/>
          </div>
        </div>
      </section>
      <main class="main">
        <aside
            v-if="width > 1024"
            class="left"
        >
          <section class="announcement">
            <header class="announcement__header">
              <h2 class="subTitle">
                Инфо
              </h2>
            </header>
            <main class="announcement__container">
              <announcement-item
                  v-for="(item, index) in info"
                  :key="index"
                  :item="item"
              />
            </main>
          </section>
        </aside>
        <section class="mainContent">
          <section class="goodsContainer">
            <header class="mainContent__header">
              <h2 class="subTitle">
                Рекомендации
              </h2>
            </header>
            <div class="goodItemContainer">
              <good-item
                  v-for="item in catalog"
                  :key="item.id"
                  :item="item"
              />
            </div>
          </section>
          <section class="reviewsContainer">
            <header class="reviewsContainer__header">
              <h2 class="subTitle">
                Интересные обзоры
              </h2>
            </header>
            <main class="reviewsContainer__main">
              <carousel
                  :items-to-show="width > 1420 ? 4 : width > 1100 ? 3 : width > 1025 ? 2 : width > 768 ? 3 : 2"
                  class="blue-slider"
              >
                <slide
                    v-for="(item, index) in video"
                    :key="index"
                >
                  <goods-item-reviews :item="item" />
                </slide>
                <template #addons>
                  <navigation/>
                </template>
              </carousel>
            </main>
          </section>
        </section>
        <aside
            class="right"
            v-if="width > 1024"
        >
          <advertising-item/>
        </aside>
      </main>
    </div>
  </section>
</template>

<style scoped lang="scss">
.home {
  .filterContainer {
    display: flex;
    margin: 0 auto;
    padding: rem(25) rem(80);
    max-width: rem(1000);
    border-radius: 10px;

    .geo {
      flex: 1 1 25%;
      display: flex;
      gap: rem(5);
      justify-content: flex-end;
      align-items: center;
      margin-right: rem(10);
      cursor: pointer;

      &:hover {
        color: $color_accent;

        circle,
        path {
          stroke: $color_accent;
        }
      }

      svg {
        flex-shrink: 0;
      }
    }

    .searchContainer {
      flex: 1 1 75%;
      height: fit-content;
    }
  }

  .content {
    &__header {
      display: flex;
      justify-content: center;
      text-align: center;
    }

    .navigationCategories {
      margin-top: rem(17);
    }
  }

  .news {
    margin-top: rem(119);

    &__header {
      margin-bottom: rem(50);
    }

    .newsItem {
      margin-top: rem(50);

      &:first-child {
        margin-top: 0;
      }
    }

    @media (max-width: em(1024, 16)) {
      margin-top: rem(26);
      &__header {
        margin-bottom: rem(22);
      }

      &__main {
        display: flex;
        gap: calc(0.5rem + (32 - 8) * ((100vw - 390rem / 16) / (1024 - 390)));

        .newsItem {
          margin-top: 0;
        }
      }
    }
  }

  .showMore {
    cursor: pointer;
    padding-top: rem(50);
  }

  .mainContent {
    flex: 1 1 65%;
    margin: 0 rem(10);
    border-left: 1px solid #ebebeb;
    border-right: 1px solid #ebebeb;

    &__header {
      margin-bottom: rem(10);
      padding: 0 rem(10);
    }

    .reviewsContainer {
      margin-top: rem(31);

      .carousel__slide {
        padding: 0 rem(8);
      }

      &__header {
        padding: 0 rem(10);
      }

      &__main {
        margin-top: rem(17);
        display: flex;
        gap: rem(16);
      }
    }

    @media (max-width: em(1920, 16)) {
      .reviewsContainer {
        &__main {
          gap: calc(10rem / 16 + (16 - 10) * ((100vw - 390rem / 16) / (1920 - 390)));
        }
      }
    }
    @media (max-width: em(1024, 16)) {
      width: 100%;
      &__header {
        margin: rem(26) 0;
      }
    }
  }

  .advertising {

    //max-width: rem(250);
    //@media (max-width: em(1920, 16)) {
    //  width: calc(200rem / 16 + (250 - 200) * ((100vw - 1024rem / 16) / (1920 - 1024)));
    //}
  }

  @media(max-width: em(1024, 16)) {
    .mainContent{
      margin: 0;
    }
    .filterContainer{
      margin-top: rem(30);
      padding: 0;
      .geo{
        flex: 1 1 35%;
      }
      .searchContainer{
        flex: 1 1 65%;
      }
    }
    .announcement {
      margin-top: rem(30);

      &__header {
        margin-bottom: rem(22);
      }

      &__container {
        display: flex;
        gap: calc(0.5rem + (16 - 8) * ((100vw - 390rem / 16) / (1024 - 390)));
        max-width: rem(950);
        overflow-x: auto;

        .announcementItem {
          flex-shrink: 0;
          margin-top: 0;
        }

        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }

  @media (max-width: em(768, 16)) {
    .filterContainer {
      margin: 0 auto;
      display: flex;
      gap: rem(8);
      align-items: center;
      padding: rem(7) 3.08%;
      border-radius: 0;
      justify-content: space-between;
      .searchContainer{
        flex: 0 1 70%;
      }
      .geo{
        flex: 0 1 5%;
      }
      .notifications {
        flex: 0 1 5%;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  @media(max-width: em(1024, 16)) {
    &__main {
      margin-top: rem(26);
    }
  }
}
</style>