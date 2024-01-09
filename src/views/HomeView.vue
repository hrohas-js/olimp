<script setup>
import HeaderBanner from "@/components/HeaderComponents/HeaderBanner";
import NavigationCategories from "@/components/NavigationComponents/NavigationCategories";
import AnnouncementItem from "@/components/AnnouncementComponents/AnnouncementItem";
import NewsItem from "@/components/News/NewsItem";
import GoodItem from "@/components/Goods/GoodItem";
import AdvertisingItem from "@/components/Advertising/AdvertisingItem";
import GoodsItemReviews from "@/components/Goods/GoodsItemHit";
import MainSearch from "@/components/UI/Filters/MainSearch";
import "vue3-carousel/dist/carousel.css";
import {Carousel, Slide, Navigation} from "vue3-carousel";
import {computed, onMounted, watch, ref} from "vue";
import {useRouter} from "vue-router";
import {useMainStore} from "@/store/MainStore";
import {useCatalogStore} from "@/store/CatalogStore";
import {useProfileStore} from "@/store/ProfileStore";

const router = useRouter();
const mainStore = useMainStore();
const catalogStore = useCatalogStore();
const profileStore = useProfileStore();

const width = computed(() => mainStore.display_width);
const location = computed(() => mainStore.location);
const catalog = computed(() => catalogStore.searchCatalog);
const name = computed(() => profileStore.user.name);

/*let ws;

const val = ref('');

const closeWebSocket = () => {
  if (ws) {
    ws.close();
    console.log('WebSocket connection closed');
  }
};

const initializeWebSocket = () => {
  if (name.value !== '') {
    console.log(name.value)
    const messagesList = document.getElementById('messages');

    ws = new WebSocket('ws://localhost:3000');

    ws.onopen = function() {
      console.log('Connected to the WebSocket server');
      ws.send(JSON.stringify({ type: 'name', text: name.value }));
    };

    ws.onmessage = function(event) {
      const data = JSON.parse(event.data);
      const messageName = document.createElement('li');
      messageName.textContent = data.username;
      messagesList.appendChild(messageName);
      const message = document.createElement('li');
      message.textContent = data.text; // Исправлено с messageName на message
      messagesList.appendChild(message);
    }
  }
};

onMounted(() => {
  if (name.value) {
    initializeWebSocket();
  }
});

watch(name, (newValue) => {
  if (newValue && newValue.length > 0) {
    initializeWebSocket();
  } else {
    closeWebSocket();
  }
});

const send = () => {
  ws.send(JSON.stringify({type: 'message', text: val.value}));
  val.value = '';
}*/

const openGeo = () => {
  mainStore.popup = 'location';
}
</script>

<template>
  <section class="home">
<!--    <input v-model="val" type="text" id="message" placeholder="Enter message"/>
    <button id="send" @click="send">Send</button>
    <ul id="messages"></ul>-->
    <div
        v-if="width <= 768"
        class="filterContainer"
    >
      <div class="geo">
        <svg width="20px" height="22px" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7.999" cy="6.8" stroke="#000" stroke-width="1.2" r="1.8"></circle>
          <path
              d="m8.002 14.998-.452.395a.6.6 0 0 0 .903 0l-.451-.395Zm-4.196-4.8-.466.378.014.017.452-.395Zm8.396 0 .451.396a.587.587 0 0 0 .014-.018l-.465-.378Zm-9-3.4a4.8 4.8 0 0 1 4.8-4.8v-1.2a6 6 0 0 0-6 6h1.2Zm4.8-4.8a4.8 4.8 0 0 1 4.8 4.8h1.2a6 6 0 0 0-6-6v1.2Zm.451 12.606-4.195-4.8-.904.79 4.196 4.8.903-.79Zm3.297-4.8-4.2 4.8.903.79 4.2-4.8-.903-.79Zm1.052-3.006a4.774 4.774 0 0 1-1.066 3.022l.931.756a5.974 5.974 0 0 0 1.335-3.778h-1.2ZM4.272 9.82a4.778 4.778 0 0 1-1.07-3.022h-1.2c0 1.432.501 2.747 1.338 3.778l.932-.756Z"
              fill="#000">
          </path>
        </svg>
      </div>
      <div class="searchContainer">
        <main-search/>
      </div>
      <div class="notifications">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
          <path
              d="M16.0026 7.40112C16.0026 5.70343 15.3704 4.07529 14.2449 2.87485C13.1195 1.6744 11.5932 1 10.0016 1C8.41 1 6.88361 1.6744 5.75819 2.87485C4.63278 4.07529 4.00052 5.70343 4.00052 7.40112C4.00052 14.8691 1 17.0028 1 17.0028H19.0031C19.0031 17.0028 16.0026 14.8691 16.0026 7.40112Z"
              stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
          <path
              d="M11.7318 20.0034C11.556 20.3066 11.3037 20.5582 10.9999 20.733C10.6963 20.908 10.352 21.0001 10.0015 21.0001C9.65108 21.0001 9.30682 20.908 9.00317 20.733C8.69951 20.5582 8.44707 20.3066 8.27124 20.0034"
              stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <header-banner v-if="width > 768"/>
    <div class="wrapper">
      <section class="content">
        <header
            v-if="width > 768"
            class="content__header"
        >
          <h2 class="textMontserrat textMontserrat_semiBold lineHeader">
            Центр содействия по реализации кино, фото, видео, музыкальных и других творческих проектов
          </h2>
        </header>
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
              {{ location }}
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
            <announcement-item/>
            <announcement-item/>
            <announcement-item/>
          </main>
        </section>
        <section
            v-if="width <=1024"
            class="news"
        >
          <header class="news__header">
            <h2 class="subTitle">
              Новости
            </h2>
          </header>
          <main class="news__main">
            <carousel
                :items-to-show="3"
                class="red-slider"
            >
              <slide
                  v-for="slide in 6"
                  :key="slide"
              >
                <news-item :news-text="'Из моделей в актеры!'"/>
              </slide>
              <template #addons>
                <navigation/>
              </template>
            </carousel>
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
              {{ location }}
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
                  :relevanceText="'urgent'"
                  :status-text="'Срочный кастинг'"
              />
              <announcement-item/>
              <announcement-item/>
              <announcement-item/>
              <announcement-item/>
            </main>
            <footer class="announcement__footer">
              <p class="showMore textMontserrat textMontserrat_regular color_accent">
                Смотреть все кастинги...
              </p>
            </footer>
          </section>
          <section
              v-if="width > 1024"
              class="news"
          >
            <header class="news__header">
              <h2 class="subTitle">
                Новости
              </h2>
            </header>
            <main class="news__main">
              <news-item :news-text="'Из моделей в актеры!'"/>
              <news-item :news-text="'Из моделей в актеры!'"/>
              <news-item :news-text="'Из моделей в актеры!'"/>
              <news-item :news-text="'Из моделей в актеры!'"/>
            </main>
            <footer class="news__footer">
              <p class="showMore textMontserrat textMontserrat_regular color_accent">
                Смотреть все новости...
              </p>
            </footer>
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
<!--            <section class="goodItemContainer">
              <good-item
                  :item-title="'Локация для съемок'"
                  :item-price="'1000'"
              />
              <good-item
                  :item-title="'Галь Гадот'"
                  :item-price="'1000'"
              />
              <good-item
                  :item-title="'Локация для съемок'"
                  :item-price="'1000'"
              />
              <good-item
                  :item-title="'Галь Гадот'"
                  :item-price="'1000'"
              />
              <good-item
                  :item-title="'Локация для съемок'"
                  :item-price="'1000'"
              />
              <good-item
                  :item-title="'Галь Гадот'"
                  :item-price="'1000'"
              />
              <good-item
                  :item-title="'Локация для съемок'"
                  :item-price="'1000'"
              />
              <good-item
                  :item-title="'Галь Гадот'"
                  :item-price="'1000'"
              />
            </section>-->
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
        </section>
        <aside
            class="right"
            v-if="width > 1024"
        >
          <section class="advertising">
            <advertising-item/>
          </section>
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


  .announcement {
    &__header {
      margin-bottom: rem(20);
    }

    .announcementItem {
      margin-top: rem(30);
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
        margin-bottom: rem(26);
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
        gap: calc(0.5rem + (32 - 8) * ((100vw - 390rem / 16) / (1024 - 390)));
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
      .searchContainer{
        flex: 1 1 90%;
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