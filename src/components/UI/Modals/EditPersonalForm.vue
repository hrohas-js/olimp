<script setup>
import {onMounted, computed} from "vue";
import {useMainStore} from "@/store/MainStore";
import {useProfileStore} from "@/store/ProfileStore";
import InputBorder from "@/components/UI/Inputs/InputBorder";
import {ElMessage} from "element-plus";

const mainStore = useMainStore();
const profileStore = useProfileStore();

const user = computed(() => profileStore.user);
const errors = computed(() => mainStore.errors);

onMounted(() => {
  document.addEventListener('click', (e) => {
    mainStore.closeModal(e.target);
  });
  mainStore.inputs = user.value;
});

const emptyCheck = (key, message) => {
  if (mainStore.inputs[key].length === 0) {
    document.getElementById(key).classList.add('border_accent');
    ElMessage.error(message);
    return true;
  }
}

const editProfile = () => {
  let empty = false;
  document.querySelectorAll('.modal-content input').forEach(elem => {
    elem.classList.remove('border_accent');
  });
  if (errors.value.length > 0) {
    errors.value.forEach(elem => {
      document.getElementById(elem.id).classList.add('border_accent');
      ElMessage.error(elem.error);
    });
  } else if (0 < mainStore.inputs.password.length && mainStore.inputs.password.length < 6) {
    ElMessage.error('Пароль должен содержать как минимум 6 символов!');
  } else if (mainStore.inputs.old_password.length > 0 && (mainStore.inputs.password.length === 0 || mainStore.inputs.confirm_password === 0)) {
    ElMessage.error('Заполните все поля для изменения пароля');
  } else if (mainStore.inputs.password !== mainStore.inputs.confirm_password) {
    ElMessage.error('Пароли не совпадают!');
  } else {
    empty = emptyCheck('email', 'Поле Email не может быть пустым');
    empty = emptyCheck('name', 'Поле Имя не может быть пустым');
    if (!empty) {
      profileStore.editProfileInfo();
    }
  }
};

const closeModal = () => {
  mainStore.popup = '';
};
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <h2 class="textMontserrat_medium color_black">
        Редактирование персональных данных
      </h2>
      <form class="textMontserrat_regular" @submit.prevent="editProfile">
        <div class="form-col">
          <div class="form-group color_black">
            <label for="name">Имя:</label>
            <input-border
                id="name"
                input-type="text"
                validate-i-d="name"
            />
          </div>
          <div class="form-group color_black">
            <label for="email">Email:</label>
            <input-border
                id="email"
                input-type="email"
                validate-i-d="email"
            />
          </div>
          <div class="form-group color_black">
            <label for="phone">Телефон:</label>
            <input-border
                id="phone"
                input-type="tel"
                validate-i-d="phone"
            />
          </div>
          <div class="form-group color_black">
            <label for="birth_datetime">Дата рождения:</label>
            <input-border
                id="birth_datetime"
                input-type="date"
                validate-i-d="birth_datetime"
            />
          </div>
          <div class="form-group color_black">
            <label for="city">Город:</label>
            <input-border
                id="city"
                input-type="text"
                validate-i-d="city"
            />
          </div>
          <div class="form-group color_black">
            <label for="street">Улица:</label>
            <input-border
                id="street"
                input-type="text"
                validate-i-d="street"
            />
          </div>
          <div class="form-group color_black">
            <label for="flat">Квартира:</label>
            <input-border
                id="flat"
                input-type="text"
                validate-i-d="flat"
            />
          </div>
          <div class="form-group color_black">
            <label for="floor">Этаж:</label>
            <input-border
                id="floor"
                input-type="text"
                validate-i-d="floor"
            />
          </div>
          <div class="form-group color_black">
            <label for="entrance">Подъезд:</label>
            <input-border
                id="entrance"
                input-type="text"
                validate-i-d="entrance"
            />
          </div>
          <div class="form-group color_black">
            <label for="house">Дом:</label>
            <input-border
                id="house"
                input-type="text"
                validate-i-d="house"
            />
          </div>
        </div>
        <div class="form-col flex">
          <div class="form-group color_black">
            <label for="old_password">Старый пароль:</label>
            <input-border
                id="old_password"
                input-type="password"
                validate-i-d="old_password"
            />
          </div>
          <div class="form-group color_black">
            <label for="password">Новый пароль:</label>
            <input-border
                id="password"
                input-type="password"
                validate-i-d="password"
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
        <button class="button_mainButton background_green" type="submit">Сохранить</button>
      </form>
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
    margin-bottom: 20px;
  }

  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: rem(10);

    .form-col {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: rem(10);
    }

    .form-col.flex {
      display: flex;
      flex-direction: column;
    }

    .form-group {
      margin-bottom: 15px;

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