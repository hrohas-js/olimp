<script setup>
import InputAnnouncement from "@/components/UI/Inputs/InputAnnouncement";
import TextAreaWithBorder from "@/components/UI/Inputs/TextAreaWithBorder";
import {ref} from "vue";
import {useMainStore} from "@/store/MainStore";
import {ElMessage} from "element-plus";

const mainStore = useMainStore();

const name = ref('');
const email = ref('');
const message = ref('');

const props = defineProps({
  subject: {
    type: String,
    default() {
      return '';
    }
  }
});

const send = () => {
  if (name.value.length > 0 && email.value.length > 0 && message.value.length > 0) {
    mainStore.sendEmailRequest({
      subject: props.subject,
      name: name.value,
      email: email.value,
      message: message.value
    }).then(() => {
      name.value = '';
      email.value = '';
      message.value = '';
      mainStore.popup = '';
    });
  } else {
    ElMessage({
      type: 'error',
      message: 'Заполните все поля',
      duration: 6000
    });
  }
}
</script>

<template>
  <form
      class="textMontserrat_regular"
      @submit.prevent="send"
  >
    <div class="form-group color_black">
      <label>Имя:</label>
      <input-announcement v-model="name" />
    </div>
    <div class="form-group color_black">
      <label>Email:</label>
      <input-announcement v-model="email" />
    </div>
    <div class="form-group color_black">
      <label>Сообщение:</label>
      <text-area-with-border v-model="message" />
    </div>
    <button
        class="button_mainButton background_green"
        type="submit"
    >
      Отправить
    </button>
    <div class="notice">
      (если ответа не будет в принятых, проверьте в Спаме)
    </div>
  </form>
</template>

<style scoped lang="scss">
button {
  max-width: 50%;
  margin: 0 auto;
}

.notice {
  max-width: 50%;
  margin: rem(5) auto;
  font-size: rem(14);
  text-align: center;
}
</style>