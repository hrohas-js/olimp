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
        Условия и требования к размещению
        и содержанию объявления.
      </h2>
      <div class="textMontserrat_medium color_black">
        <p>
          1. Объявление не должно вступать в противоречия с существующим
          законодательством и должно быть законным.
        </p>
        <p>
          2. Информация в размещаемом объявлении должна быть достоверной и актуальной.
          Информация в объявлении должна быть понятной и не иметь разночтений и не
          должна вводить в заблуждение.
        </p>
        <p>
          3. Контактные данные должны быть актуальными по которым с Вами смогут связаться.
        </p>
        <p>
          4. Вы самостоятельно несете ответственность за достоверность и законность
          содержания Вашего объявления.
        </p>
        <p>
          5. Объявления должны размещаться только в тех категориях, которые существуют
          на данной площадке Production City и к которым относятся Ваше объявление.
        </p>
        <p>
          6. Объявление размещается на 30 дней после чего потребуется его повторная
          активация, в случае необходимости и актуальности Вашего объявления, на Ваше
          усмотрение.
        </p>
        <p>
          7. Модераторы вправе блокировать любые объявления и материалы, которые будут
          противоречить условиям размещения.
        </p>
        <p>
          8. Размещая объявление Вы принимаете все перечисленные условия и даете согласие
          на публикацию и общего доступа к содержанию Вашего объявления в сети интернет.
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
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: rem(25);
    position: relative;
    border-radius: rem(5);

    .close {
      position: absolute;
      top: rem(6);
      right: rem(6);
    }
  }
}
</style>