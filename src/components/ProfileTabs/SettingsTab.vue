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
  mainStore.inputs = user.value;
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

const editProfile = () => {
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
  } else if (0 < mainStore.inputs.password.length && mainStore.inputs.password.length < 6) {
    ElMessage({
      type: 'error',
      message: 'Пароль должен содержать как минимум 6 символов!',
      duration: 6000
    });
  } else if (mainStore.inputs.old_password.length > 0 && (mainStore.inputs.password.length === 0 || mainStore.inputs.confirm_password === 0)) {
    ElMessage({
      type: 'error',
      message: 'Заполните все поля для изменения пароля',
      duration: 6000
    });
  } else if (mainStore.inputs.password !== mainStore.inputs.confirm_password) {
    ElMessage({
      type: 'error',
      message: 'Пароли не совпадают!',
      duration: 6000
    });
  } else {
    empty = emptyCheck('email', 'Поле Email не может быть пустым');
    empty = emptyCheck('name', 'Поле Имя не может быть пустым');
    if (!empty) {
      profileStore.editProfileInfo();
    }
  }
};
</script>

<template>
  <section class="settingsTab profileTab">
    <header class="profileTab__header">
      <h2 class="textMontserrat_medium">
        Редактирование персональных данных
      </h2>
    </header>
    <main class="settingsTab__main">
      <form class="textMontserrat_regular" @submit.prevent="editProfile">
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
                validate-i-d="city"
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
            <label for="phone">Телефон:</label>
            <input-border
                id="phone"
                input-type="tel"
                validate-i-d="phone"
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
    </main>
  </section>
</template>

<style scoped lang="scss">
.settingsTab {
  &__main {
    margin-top: rem(20);
    width: 60%;

    @media (max-width: em(768, 16)) {
      width: 100%;
    }

    form {
      .form-col {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: rem(10);

        @media (max-width: em(768, 16)) {
          gap: rem(5);
        }
      }

      .form-col.flex {
        display: flex;
        flex-direction: column;
        width: 50%;
      }

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
  }
}
</style>