<script setup>
import OnOfComponent from "@/components/UI/OnOfComponent";
import YourDevices from "@/components/ProfileTabs/ProfileProtect/YourDevices";
import ActionButton from "@/components/UI/Button/ActionButton";
import InputWithBackground from "@/components/UI/Inputs/InputWithBackground";
</script>

<template>
  <section class="profileProtect profileTab">
    <header class="profileTab__header fraction">
      <h2 class="textMontserrat_medium">
        Защита профиля
      </h2>
      <p class="textMontserrat_light">
        Здесь можно управлять настройками безопасности.
      </p>
    </header>
    <main class="profileProtect__main">
      <div class="profileProtect__item smsOrPush">
        <header class="item__header">
          <h3 class="textMontserrat_medium">
            Безопасный вход
          </h3>
        </header>
        <main class="item__main">
          <p class="textMontserrat_light">
            Присылать смс или пуш-уведомление с кодом доступа.
          </p>
          <on-of-component/>
        </main>
      </div>
      <div class="profileProtect__item devices">
        <header class="item__header">
          <h3 class="textMontserrat_medium">
            Устройства
          </h3>
        </header>
        <main class="item__main">
          <p class="textMontserrat_light">
            Посмотрите, где вы сейчас авторизованы.
          </p>
        </main>
      </div>
      <div class="devicesContainer">
        <your-devices/>
        <your-devices/>
        <your-devices/>
        <your-devices/>
      </div>
    </main>
    <footer class="profileProtect__footer profileProtect__item">
      <header class="item__header">
        <h3 class="textMontserrat_medium">
          Смена пароля
        </h3>
      </header>
      <div class="inputContainer">
        <input-with-background
            placeholder="Текущий пароль"
            input-mode="password"
        />
        <input-with-background
            placeholder="Новый пароль"
            input-mode="password"
        />
        <action-button text="Сохранить"/>
      </div>
    </footer>
  </section>
</template>

<style scoped lang="scss">
.profileTab {
  &__header {
    display: flex;
    flex-direction: column;
    gap: rem(10);
  }
}

.profileProtect {

  &__main {
    margin-top: rem(10);
  }

  .profileProtect__item {
    .item__header {
      .textMontserrat_medium {
        font-size: rem(16);
      }

      .textMontserrat_light {
        font-size: rem(14);
      }
    }

    .item__main {
      margin-top: rem(10);
      display: flex;
      align-items: center;
      gap: rem(15);

      .textMontserrat_light {
        font-size: rem(14);
      }
    }
  }

  .smsOrPush {
    margin-bottom: rem(10);
  }

  .devicesContainer {
    margin-top: rem(20);
  }

  &__footer {
    max-width: rem(280);
    margin-top: rem(20);
  }

  .inputContainer {
    margin-top: rem(10);
    display: flex;
    flex-direction: column;
    gap: rem(12);

    .button_actionButton {
      max-width: 100%;
    }
  }

  .fraction {
    padding-bottom: rem(20);
  }

}
</style>