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
      <label>Введите ваше имя:</label>
      <input-announcement v-model="name" />
    </div>
    <div class="form-group color_black">
      <label>Введите ваш Email:</label>
      <input-announcement v-model="email" />
    </div>
    <div class="form-group color_black">
      <label>Введите ваше сообщение:</label>
      <text-area-with-border v-model="message" />
    </div>
    <button
        class="button_mainButton background_green"
        type="submit"
    >
      Отправить
    </button>
  </form>
</template>

<style scoped lang="scss">
button {
  max-width: 50%;
  margin: 0 auto;
}
</style>