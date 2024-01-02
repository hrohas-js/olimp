<script setup>
import ActionButton from "@/components/UI/Button/ActionButton";
import MainButton from "@/components/UI/Button/MainButton";
</script>

<template>
  <section class="notificationBody textMontserrat profileTab">
    <header class="notificationBody__header fraction profileTab__header">
      <h2 class="textMontserrat_medium">
        Уведомления
      </h2>
      <div class="action">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 52 24" fill="none">
          <path
              d="M0.939339 10.9393C0.353554 11.5251 0.353554 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.939339 10.9393ZM52 10.5L2 10.5V13.5L52 13.5V10.5Z"
              fill="#2963A4"/>
        </svg>
        <p class="textMontserrat_regular color_colorSubBg">
          Назад
        </p>
      </div>
    </header>
    <main class="notificationBody__main">
      <div class="information">
        <h3 class="textMontserrat_regular">
          Это вы вошли в профиль?
        </h3>
        <p class="textMontserrat_light deviceInfo">
          Windows, браузер Chrome, вход через Google
        </p>
      </div>
      <p class="notificationBody__mainText textMontserrat_regular">
        Если вы не заходили в профиль с этого устройства, смените пароль на Авито, в почте и привязанных соцсетях, чтобы
        защитить аккаунт от злоумышленников.
        Если это были вы, всё в порядке.
      </p>
    </main>
    <footer class="notificationBody__footer">
      <action-button text="Поменять пароль"/>
      <main-button button-text="Перейти к объявлениям"/>
    </footer>
  </section>
</template>

<style scoped lang="scss">
.notificationBody {
  &__header {
    //.textMontserrat_medium {
    //  font-size: rem(20);
    //}
    //
    //.textMontserrat_light {
    //  font-size: rem(20);
    //}

    .action {
      margin-top: rem(10);
      display: flex;
      align-items: center;
      gap: rem(10);

      svg, p {
        cursor: pointer;
      }
    }
  }

  &__main {
    margin-top: rem(10);

    .information {
      max-width: rem(566);
      margin-bottom: rem(10);
    }

    .textMontserrat_medium,  {
      font-size: rem(18);
    }
    .textMontserrat_light{
      font-size:rem(14);
    }
    .textMontserrat_regular{
      font-size: 1rem;
    }
  }

  .deviceInfo {
    margin-top: rem(10);
  }

  &__footer {
    max-width: rem(370);
    margin-top: rem(10);
    display: flex;
    align-items: center;
    gap: rem(10);

    button {
      flex: 1 1 50%;
    }
  }

  .fraction {
    padding-bottom: rem(10);
    border-bottom: 1px solid $color_subBgLight;
  }
}
</style>