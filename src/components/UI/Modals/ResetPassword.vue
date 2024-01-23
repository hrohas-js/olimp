<script setup>
import {onMounted, computed, ref} from "vue";
import {useMainStore} from "@/store/MainStore";
import {useProfileStore} from "@/store/ProfileStore";
import InputAnnouncement from "@/components/UI/Inputs/InputAnnouncement";
import {useAuthStore} from "@/store/AuthStore";

const mainStore = useMainStore();
const profileStore = useProfileStore();
const authStore = useAuthStore();

const user = computed(() => profileStore.user);

const resetEmail = ref('');

onMounted(() => {
  document.addEventListener('click', (e) => {
    mainStore.closeModal(e.target);
  });
  mainStore.inputs = user.value;
});

const closeModal = () => {
  mainStore.popup = '';
};

const sendEmail = () => {
  authStore.resetPassword({
    email: resetEmail.value
  }).then(() => {
    mainStore.popup = 'auth';

  });
}
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <h2 class="textMontserrat_medium color_black">
        Восстановление пароля
      </h2>
      <form
          class="textMontserrat_regular"
          @submit.prevent="sendEmail"
      >
        <div class="form-group color_black">
          <label for="email">Введите ваш Email:</label>
          <input-announcement v-model="resetEmail" />
        </div>
        <button
            class="button_mainButton background_green"
            type="submit"
        >
          Отправить
        </button>
      </form>
      <button
          class="close"
          @click="closeModal"
      >
        <svg
            width="20"
            height="20"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <circle
              cx="30"
              cy="30"
              r="30"
              fill="#E9605A"
          />
          <path
              d="M16.8297 18.8295L28.7335 30.7333M28.7335 30.7333L40.6373 42.6371M28.7335 30.7333L41.563 17.9038M28.7335 30.7333L15.904 43.5628"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.textMontserrat {
  &_light {
    font-size: rem(13);
  }
  &_medium {
    font-size: rem(24);
  }
}
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  position: relative;

  h2 {
    margin-bottom: rem(20);

    @media (max-width: em(768, 16)) {
      margin-bottom: rem(10);
      font-size: rem(18);
    }
  }

  form {
    .form-group {
      margin-bottom: rem(15);

      @media (max-width: em(768, 16)) {
        margin-bottom: rem(5);
      }

      &:first-child {
        grid-column: 1 / 3;
      }

      label {
        margin-bottom: 5px;
        display: block;
      }

      input {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
      }
    }

    button {
      grid-column: 1 / 3;
      width: 57%;
      margin: 0 auto;
    }
  }

  .close {
    position: absolute;
    top: rem(6);
    right: rem(6);
  }
}
</style>