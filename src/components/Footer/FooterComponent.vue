<script setup>
import {useMainStore} from "@/store/MainStore";
import {computed} from "vue";

const mainStore = useMainStore();

const width = computed(() => mainStore.display_width);
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
        <h2 class="textMontserrat_medium color_colorBg">
          Центр Творчества
        </h2>
      </header>
      <main class="footerComponent__main border_accent">
        <ul>
          <li class="textMontserrat">
            <p class="textMontserrat_regular color_colorBg">
              Кастинги
            </p>
          </li>
          <li class="textMontserrat">
            <p class="textMontserrat_regular color_colorBg">
              Поиск специалистов и участников на проект
            </p>
          </li>
          <li class="textMontserrat">
            <p class="textMontserrat_regular color_colorBg">
              Требуются специалисты на проект (работа)
            </p>
          </li>
          <li class="textMontserrat">
            <p class="textMontserrat_regular color_colorBg">
              Рынок
            </p>
          </li>
          <li class="textMontserrat">
            <p class="textMontserrat_regular color_colorBg">
              Аренда
            </p>
          </li>
          <li class="textMontserrat">
            <p class="textMontserrat_regular color_colorBg">
              Заказчикам
            </p>
          </li>
          <li class="textMontserrat">
            <p class="textMontserrat_regular color_colorBg">
              Недвижимость, лофты, локации для съемок
            </p>
          </li>
          <li class="textMontserrat">
            <p class="textMontserrat_regular color_colorBg">
              Предложения о сотрудничестве
            </p>
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
              <p class="textMontserrat_regular color_colorBg">
                Вопрос - ответ
              </p>
            </li>
            <li class="textMontserrat">
              <p class="textMontserrat_regular color_colorBg">
                Вакансии
              </p>
            </li>
          </ul>
          <ul>
            <li class="textMontserrat">
              <p class="textMontserrat_regular color_colorBg">
                Личный кабинет
              </p>
            </li>
            <li class="textMontserrat">
              <p class="textMontserrat_regular color_colorBg">
                Сообщения
              </p>
            </li>
            <li class="textMontserrat">
              <p class="textMontserrat_regular color_colorBg">
                Корзина
              </p>
            </li>
          </ul>
          <ul>
            <li class="textMontserrat">
              <p class="textMontserrat_regular color_colorBg">
                О компании
              </p>
            </li>
            <li class="textMontserrat">
              <p class="textMontserrat_regular color_colorBg">
                Правила сайта
              </p>
            </li>
            <li class="textMontserrat">
              <p class="textMontserrat_regular color_colorBg">
                Реклама на сайте
              </p>
            </li>
          </ul>
        </div>
      </main>
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