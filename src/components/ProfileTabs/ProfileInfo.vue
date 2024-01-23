<script setup>
import {ref, computed} from "vue";
import {useMainStore} from "@/store/MainStore";
import {useProfileStore} from "@/store/ProfileStore";

const mainStore = useMainStore();
const profileStore = useProfileStore();

const sex = ref("female");

const width = computed(() => mainStore.display_width);
const user = computed(() => profileStore.user);
const fullAddress = computed(() => profileStore.fullAddress);
const maskPhone = computed(() => {
  const regex = /(\+7 \(\d{3}\)) \d{3}/;
  return user.value.phone ? user.value.phone.replace(regex, '$1 ***') : '';

});

const changeSex = (value) => {
  sex.value = value
}
</script>

<template>
  <section class="profileInfo profileTab">
    <header
        v-if="width > 1024"
        class="profileTab__header"
    >
      <h2 class="textMontserrat_medium">
        Личная информация
      </h2>
    </header>
    <main class="profileInfo__main">
      <div
          class="profileInfo__userData fraction"
          :class="{'profileInfo__mobile':width < 768}"
      >
        <ul class="textMontserrat_regular">
          <li>
            <p class="profileInfo_FIO">
              {{ user.name }}
            </p>
          </li>
        </ul>
        <ul class="userInfo__table textMontserrat_light">
          <li>
            <p>
              Дата рождения
            </p>
          </li>
        </ul>
        <div class="userInfo__table textMontserrat_regular">
          <time :datetime="user.birth_datetime">
            {{ user.birth_datetime }}
          </time>
        </div>
      </div>
      <div
          :class="{'profileInfo__mobile':width < 768}"
          class="profileInfo__region fraction"
      >
        <p class="textMontserrat_light">
          Адресная информация
        </p>
        <div class="takeYourCounty">
          {{ fullAddress }}
        </div>
      </div>
      <div class="profileInfo__mail">
        <p class="textMontserrat_light">
          Почтовый ящик
        </p>
        <div class="fraction textMontserrat_regular">
          <div class="contentField__item">
            <p>
              {{ user.email }}
            </p>
          </div>
        </div>
      </div>
      <div class="profileInfo__phone">
        <p class="textMontserrat_light">
          Мобильный телефон
        </p>
        <div class="textMontserrat_regular">
          <div class="contentField__item">
            <p>
              {{ maskPhone }}
            </p>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<style scoped lang="scss">
.profileInfo {

  &_FIO {
    margin-bottom: rem(20);
  }

  &__main {
    margin-top: rem(20);
  }

  &__userData {
    button {
      max-width: rem(200);
      margin-top: rem(10);
    }

    .userInfo__table {
      display: grid;
      grid-template-columns: repeat(3, 200px);
      margin-top: rem(10);
    }

    .textMontserrat_regular {
      margin-top: rem(15);
      font-size: rem(16);
    }
  }

  &__region {
    margin-top: rem(12);

    .takeYourCounty {
      margin-top: rem(20);
    }

    .enterManually {
      cursor: pointer;
      margin-top: rem(17);
      display: flex;
      align-items: center;
      gap: rem(41);
    }
  }

  &__mail {
    margin-top: rem(12);
  }

  &__phone {
    margin-top: rem(12);
  }

  &__footer {
    margin-top: rem(30);
    display: flex;
    justify-content: center;

  }

  .fraction {
    padding-bottom: rem(12);
  }

  .contentField {
    &__item {
      max-width: rem(600);
      margin-top: rem(20);
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      justify-content: space-between;
    }
  }

  .buttonContainer {
    max-width: rem(472);
    width: 100%;
    display: flex;
    gap: rem(30);

    button {
      width: 40%;
      margin: 0 auto;
    }
  }

  @media (max-width: em(1024, 16)) {
    &__region {
      padding-left: 0;
      padding-right: 0;
      padding-top: 0;
    }
  }
  @media (max-width: em(768, 16)) {
    padding: 0;

    &__userData {
      border: 0;
      padding-bottom: 0;
    }

    .userInfo__table {
      display: grid;
      grid-template-columns: 1fr;
      row-gap: rem(10);

      li {
        font-size: calc(14rem / 16 + (20 - 14) * ((100vw - 390rem / 16) / (768 - 390)));
      }
    }

    .changeData {
      padding: rem(11) rem(10) rem(11) rem(37);
      display: flex;
      align-items: center;
      justify-content: space-between;

      svg {
        cursor: pointer;
      }
    }

    &__birthDay {
      max-width: 80%;
      margin-top: rem(33);
      display: flex;

      .day, .years {
        flex: 1 1 20%;
      }

      .muns {
        flex: 1 1 60%;
        gap: rem(15);
      }

      .birthDay__item {
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .textMontserrat_regular {
        margin-top: 0;
        font-size: calc(14rem / 16 + (20 - 14) * ((100vw - 390rem / 16) / (768 - 390)));
      }

      svg {
        path {
          fill: $color_accent;
        }
      }
    }

    .sex {
      margin-top: rem(10);
      display: flex;

      &__item {
        border-radius: 2px;
        padding: rem(11) rem(19);
        font-size: calc(14rem / 16 + (20 - 14) * ((100vw - 390rem / 16) / (768 - 390)));

      }
    }

    &__region {
      margin-top: rem(33);
      border-bottom: 0;
      padding: 0;

      .textMontserrat_light {
        font-size: calc(14rem / 16 + (20 - 14) * ((100vw - 390rem / 16) / (768 - 390)));
      }

      .takeYourCounty {
        margin-top: rem(10);
      }
    }

    &__mail {
      margin-top: rem(33);
    }

    &__phone {
      margin-top: rem(33);
    }

    .contentField {
      width: 100%;
      margin-right: rem(10);
      max-width: 100%;
      padding: 0;
      border: none;

      &__item {
        max-width: 100%;
        padding: 0;
        grid-template-columns: 2fr 0.2fr;

        svg {
          justify-self: end;
        }
      }
    }
    &__footer {
      margin-top: rem(50);
    }
    .buttonContainer {
      max-width: 100%;
      flex-direction: column;
      gap: rem(10);

      .button_actionButton {
        max-width: 100%;
        padding: 0.625rem 0;
      }

      .button {
        flex: 1 1 100%;
      }
    }
  }
}
</style>