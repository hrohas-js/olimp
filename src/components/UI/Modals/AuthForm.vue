<script setup>
import {onMounted, computed} from 'vue';
import InputBorder from "@/components/UI/Inputs/InputBorder";
import {useMainStore} from "@/store/MainStore";
import {useAuthStore} from "@/store/AuthStore";
import {ElMessage} from "element-plus";
import {useProfileStore} from "@/store/ProfileStore";

const mainStore = useMainStore();
const authStore = useAuthStore();
const profileStore = useProfileStore();

const popup = computed(() => mainStore.popup);
const errors = computed(() => mainStore.errors);

onMounted(() => {
  document.addEventListener('click', (e) => {
    mainStore.closeModal(e.target);
  })
});

const emptyCheck = (key, message) => {
  if (mainStore.inputs[key].length === 0) {
    document.getElementById(key).classList.add('border_accent');
    ElMessage({
      type: 'error',
      message: message,
      duration: 6000
    });
    return true;
  }
}

const login = () => {
  let empty = false;
  document.querySelectorAll('.modal-content input').forEach(elem => {
    elem.classList.remove('border_accent');
  });
  if (errors.value.length > 0) {
    errors.value.forEach(elem => {
      document.getElementById(elem.id).classList.add('border_accent');
      ElMessage({
        type: 'error',
        message: elem.error,
        duration: 6000
      });
    });
  } else if (popup.value === 'register' && mainStore.inputs.password.length < 6) {
    ElMessage({
      type: 'error',
      message: 'Пароль должен содержать как минимум 6 символов!',
      duration: 6000
    });
  } else if (popup.value === 'register' && mainStore.inputs.password !== mainStore.inputs.confirm_password) {
    ElMessage({
      type: 'error',
      message: 'Пароли не совпадают!',
      duration: 6000
    });
  } else if (popup.value === 'register') {
    empty = emptyCheck('name', 'Поле Имя не может быть пустым');
    empty = emptyCheck('email', 'Поле Email не может быть пустым');
    empty = emptyCheck('password', 'Поле Пароль не может быть пустым');
    if (!empty) {
      authStore.register();
      mainStore.clearInputs();
    }
  } else if (popup.value === 'auth') {
    empty = emptyCheck('email', 'Поле Email не может быть пустым');
    empty = emptyCheck('password', 'Поле Пароль не может быть пустым');
    if (!empty) {
      authStore.auth().then(() => {
        profileStore.getLikes();
        profileStore.getReviews();
        profileStore.getNotifications();
        mainStore.clearInputs();
      });
    }
  }
};

const showRegistrationForm = () => {
  mainStore.popup = 'register';
};

const showAuthForm = () => {
  mainStore.popup = 'auth';
};

const showResetPasswordForm = () => {
  mainStore.popup = 'reset';
}

const closeModal = () => {
  mainStore.popup = '';
};
</script>

<template>
  <div
      class="modal"
      :class="{
        'auth': popup === 'auth',
        'register': popup === 'register'
      }"
  >
    <div v-if="popup === 'auth'" class="modal-content">
      <h2 class="textMontserrat_medium color_black">Вход</h2>
      <form @submit.prevent="login" class="textMontserrat_regular">
        <div class="form-group color_black">
          <label for="email">Email:</label>
          <input-border
              id="email"
              input-type="email"
              validate-i-d="email"
          />
        </div>
        <div class="form-group color_black">
          <label for="password">Пароль:</label>
          <input-border
              id="password"
              input-type="password"
              validate-i-d="password"
          />
        </div>
        <button class="button_mainButton background_subBg" type="submit">Войти</button>
      </form>
      <button
          class="button_mainButton background_green"
          @click="showRegistrationForm"
      >
        Зарегистрироваться
      </button>
      <p
          class="forgot-password"
          @click="showResetPasswordForm"
      >
        Забыли пароль?
      </p>
      <button
          class="close"
          @click="closeModal"
      >
        <svg width="20" height="20" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="30" fill="#E9605A"/>
          <path d="M16.8297 18.8295L28.7335 30.7333M28.7335 30.7333L40.6373 42.6371M28.7335 30.7333L41.563 17.9038M28.7335 30.7333L15.904 43.5628" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <div v-if="popup === 'register'" class="modal-content">
      <h2 class="textMontserrat_medium color_black">
        Регистрация
      </h2>
      <form @submit.prevent="login" class="textMontserrat_regular">
        <div class="form-col">
          <div class="form-group color_black">
            <label for="name">Представьтесь:</label>
            <input-border
                id="name"
                input-type="text"
                validate-i-d="name"
            />
          </div>
          <div class="form-group color_black">
            <label for="city">Город:</label>
            <input-border
                id="city"
                input-type="text"
                validate-i-d="title"
            />
          </div>
          <div class="form-group color_black">
            <label for="phone">
              Телефон:
            </label>
            <input-border
                id="phone"
                input-type="tel"
                validate-i-d="phone"
            />
          </div>
          <div class="form-group color_black">
            <label for="password">
              Пароль:
            </label>
            <input-border
                id="password"
                input-type="password"
                validate-i-d="password"
            />
          </div>
          <div class="form-group color_black">
            <label for="email">
              Email:
            </label>
            <input-border
                id="email"
                input-type="email"
                validate-i-d="email"
            />
          </div>
          <div class="form-group color_black">
            <label for="confirm_password">Подтвердите пароль:</label>
            <input-border
                id="confirm_password"
                input-type="password"
                validate-i-d="confirm_password"
            />
          </div>
        </div>
        <button
            class="button_mainButton background_green"
            type="submit"
        >
          Зарегистрироваться
        </button>
      </form>
      <button class="button_mainButton background_red" @click="showAuthForm">Войти</button>
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
.auth {
  .background_green {
    margin-top: rem(10);
  }
  .background_subBg {
    width: 100%;
  }
}
.register {
  .background_green {
    margin-bottom: rem(10);
  }
  .background_red {
    width: 57%;
    margin: 0 auto;
    -webkit-box-sizing: border-box; /* Для старых версий Safari и Chrome */
    -moz-box-sizing: border-box;    /* Для старых версий Firefox */
    box-sizing: border-box;         /* Стандартный способ */
  }
}
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
  -webkit-border-radius: 8px; /* Для старых версий Safari и Chrome */
  -moz-border-radius: 8px;    /* Для старых версий Firefox */
  text-align: center;
  position: relative;
  min-width: rem(370);

  @media (max-width: em(768,16)) {
    min-width: auto;
  }

  h2 {
    margin-bottom: 20px;
  }

  form {
    .form-col {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: rem(10);
    }

    .form-col.flex {
      display: flex;
      flex-direction: column;
      width: 50%;
    }

    .form-group {
      margin-bottom: 15px;
      position: relative;

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
        -webkit-box-sizing: border-box; /* Для старых версий Safari и Chrome */
        -moz-box-sizing: border-box;    /* Для старых версий Firefox */
        box-sizing: border-box;         /* Стандартный способ */
      }
    }

    button {
      grid-column: 1 / 3;
      width: 57%;
      margin: 0 auto;
      -webkit-box-sizing: border-box; /* Для старых версий Safari и Chrome */
      -moz-box-sizing: border-box;    /* Для старых версий Firefox */
      box-sizing: border-box;         /* Стандартный способ */
    }
  }

  .forgot-password {
    color: #3498db;
    text-decoration: underline;
    cursor: pointer;
    margin-top: 10px;
  }

  .close {
    position: absolute;
    top: rem(6);
    right: rem(6);
  }
}
.border_accent{
  border-radius: rem(8);
}
</style>

