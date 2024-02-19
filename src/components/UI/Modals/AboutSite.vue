<script setup>
import {onMounted} from "vue";
import {useMainStore} from "@/store/MainStore";

const mainStore = useMainStore();

onMounted(async() => {
  document.addEventListener('click', (e) => {
    mainStore.closeModal(e.target);
  })
});

const closeModal = () => {
  mainStore.popup = '';
};
</script>

<template>
  <div class="modal">
    <div class="modal__content background_mainBg">
      <h2 class="textMontserrat_medium color_black">
        PRODUCTION CITY
      </h2>
      <h3 class="textMontserrat_medium color_black">
        Творческая площадка для кино-фото-видео-музыкальных и других
        творческих проектов
      </h3>
      <hr>
      <div class="textMontserrat_medium color_black">
        <p>
          <b>-Подобрать</b> специалистов и участников на проект.
        </p>
        <p>
          <b>-Рынок</b>, продать-купить-арендовать необходимую технику.
        </p>
        <p>
          <b>-Найти</b> необходимый Лофт, студию, локацию, квартиру,
          транспорт на проект или мероприятие.
        </p>
        <p>
          <b>-Найти работу</b> в творческой профессии – актеры, модели , режиссёры,
          операторы, осветители , сценаристы, звукорежиссеры и мн. др.
        </p>
        <p>
          <b>-Принять участие</b> в различных мероприятиях которые будут проводиться
          на площадке   PRODUCTION CITY.  (productioncity.pro)
        </p>
        <p>
          <b>PRODUCTION CITY</b>- ЭТО ВИРТУАЛЬНЫЙ ГОРОД ТВОИХ ВОЗМОЖНОСТЕЙ!
        </p>
      </div>
      <button class="close" @click="closeModal">
        <svg width="20" height="20" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="30" fill="#E9605A"/>
          <path d="M16.8297 18.8295L28.7335 30.7333M28.7335 30.7333L40.6373 42.6371M28.7335 30.7333L41.563 17.9038M28.7335 30.7333L15.904 43.5628" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  &__content {
    padding: 3%;
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: rem(25);
    position: relative;
    border-radius: rem(5);

    @media (max-width: em(768, 16)) {
      width: 97%;
      gap: 0;
    }

    h2 {
      font-size: rem(36);

      @media (max-width: em(768, 16)) {
        font-size: rem(20);
      }
    }
    h2, h3 {
      text-align: center;
    }
    hr {
      color: $color_accent;
      background-color: $color_accent;
      height: 2px;
    }
    div.textMontserrat_medium {
      display: flex;
      flex-direction: column;
      gap: rem(10);
      font-size: rem(14);
    }

    .close {
      position: absolute;
      top: rem(6);
      right: rem(6);
    }
  }
}
</style>