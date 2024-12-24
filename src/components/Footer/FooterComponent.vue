<script setup>
import {useMainStore} from "@/store/MainStore";
import {computed} from "vue";
import {useCatalogStore} from "@/store/CatalogStore";

const mainStore = useMainStore();
const catalogStore = useCatalogStore();

const width = computed(() => mainStore.display_width);
const categories = computed(() => catalogStore.categories);
</script>

<template>
  <footer class="footerComponent background_subBg">
    <div class="wrapper">
      <header class="footerComponent__header textMontserrat">
        <router-link to="/">
          <img
              src="@/assets/logo.jpg"
              alt="logo"
          />
        </router-link>
        <h2
            v-if="width >= 768"
            class="textMontserrat_medium color_colorBg"
        >
          Центр Творчества
        </h2>
      </header>
      <main class="footerComponent__main border_accent">
        <ul>
          <li
              v-for="category in categories"
              :key="category.id"
              class="textMontserrat"
          >
            <router-link :to="`/catalog/${category.id}/all`">
              <p class="textMontserrat_regular color_colorBg">
                {{ category.name }} {{ category.name === 'Работа' ? '(вакансии)' : '' }}
              </p>
            </router-link>
          </li>
        </ul>
        <div class="group">
          <ul>
            <li class="textMontserrat">
              <p class="textMontserrat_regular color_colorBg">
                Новости
              </p>
            </li>
            <li class="textMontserrat">
              <p class="textMontserrat_regular color_colorBg">
                Анонсы
              </p>
            </li>
            <li class="textMontserrat">
              <router-link to="/rules" class="textMontserrat_regular color_colorBg">
                Правила сайта
              </router-link>
            </li>
            <li class="textMontserrat">
              <router-link to="/question" class="textMontserrat_regular color_colorBg">
                Поддержка
              </router-link>
            </li>
          </ul>
          <ul>
            <li class="textMontserrat">
              <router-link to="/about" class="textMontserrat_regular color_colorBg">
                О компании
              </router-link>
            </li>
            <li class="textMontserrat">
              <p class="textMontserrat_regular color_colorBg">
                Вакансии
              </p>
            </li>
            <li class="textMontserrat">
              <router-link to="/advert" class="textMontserrat_regular color_colorBg">
                Реклама на сайте
              </router-link>
            </li>
            <li class="textMontserrat">
              <router-link to="/cooperation" class="textMontserrat_regular color_colorBg">
                Предложения о сотрудничестве
              </router-link>
            </li>
          </ul>
        </div>
      </main>
      <div class="copy textMontserrat textMontserrat_medium color_colorBg">
        <span>
          Production City - центр творчества
        </span>
        <span>
          &copy;ООО "Возможно все! продакшен" 2022-2025
        </span>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footerComponent {
  padding: rem(50) 0 rem(80);

  .border_accent {
    border-left: 0;
    border-right: 0;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: rem(50);
    //margin-left: rem(123);
    padding-bottom: rem(8);

    img {
      max-width: rem(250);
    }

    .textMontserrat_medium {
      font-size: rem(18);
    }

    .textMontserrat_select {
      font-size: rem(32);
      letter-spacing: 6.4px;
    }
  }

  &__main {
    padding: rem(25) 0;
    display: flex;
    gap: rem(100);

    .group {
      display: flex;
      gap: rem(200);
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: rem(20);

      li {
        cursor: pointer;
        font-style: rem(20);
      }
    }
    .textMontserrat_regular{
      font-size: rem(14);
    }
  }

  .copy {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: rem(20);
    font-size: rem(10);
  }

  @media (max-width: em(1920, 16)) {
    &__main, .group {
      gap: calc(48rem / 16 + (100 - 48) * ((100vw - 1024rem / 16) / (1920 - 1024)));
    }
  }
  @media (max-width: em(1024, 16)) {
    &__header {
      margin: 0;
      .textMontserrat_medium {
        font-size: 1rem;
      }

      .textMontserrat_regular {
        //font-size: rem(20);
        letter-spacing: 4px;
      }
    }

    &__main {
      gap: rem(10);
      padding: rem(10);
      justify-content: space-between;
      ul{
        li{
          font-size: calc(10rem / 16 + (16 - 10) * ((100vw - 390rem / 16) / (1024 - 390)));
        }
      }
    }
    .group {
      flex-direction: column;
      gap: rem(10);
    }
  }
}
</style>