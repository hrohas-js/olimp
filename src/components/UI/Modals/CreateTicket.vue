<script setup>
import {onMounted, computed} from "vue";
import {useMainStore} from "@/store/MainStore";
import SendMessageForm from "@/components/UI/SendMessageForm";
import {useRoute} from "vue-router";

const mainStore = useMainStore();
const route = useRoute();

const advNumber = computed(() => {
  let title = 'Жалоба';
  if (route.params.id) {
    title += ' №' + route.params.id;
  }
  return title;
});

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
        Укажите, какие конкретно нарушения были допущены, и мы примем необходимые меры.
      </h2>
      <send-message-form :subject="advNumber" />
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
      font-size: rem(24);
      margin-bottom: rem(20);

      @media (max-width: em(768, 16)) {
        font-size: rem(18);
        margin-bottom: rem(10);
      }
    }

    .close {
      position: absolute;
      top: rem(6);
      right: rem(6);
    }
  }
}
</style>