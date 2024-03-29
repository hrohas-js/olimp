<script setup>
import DataMessage from "@/components/ProfileTabs/Massage/Chat/DataMessage.vue";
import {computed} from "vue";
import {useProfileStore} from "@/store/ProfileStore";

const profileStore = useProfileStore();

const user = computed(() => profileStore.user);
const currentChatHistory = computed(() => profileStore.currentChatHistory);

const props = defineProps({
  messageItem: {
    type: Object,
    default: () => {}
  },
  index: {
    type: Number,
    default: 0
  },
  length: {
    type: Number,
    default: 0
  }
});

const previousMessageDate = computed(() => {
  let date = "";
  if (props.index > 0) {
    date = currentChatHistory.value[props.index - 1].dt_created
  } else {
    date = currentChatHistory.value[0].dt_created
  }
  return date;
})
const currentTime = computed(() => {
  const current = props.messageItem.dt_created.split(" ")[1].split(":");
  return current[0] + ':' + current[1];
});
const currentDate = computed(() => {
  let date = "";
  const current = props.messageItem.dt_created.split(" ")[0].split("-");
  const previous = previousMessageDate.value.split(" ")[0].split("-");
  const currentDateObj = new Date(current[0], current[1] - 1, current[2]);
  const previousDateObj = new Date(previous[0], previous[1] - 1, previous[2]);

  // Проверка на "Сегодня"
  const today = new Date();
  if (currentDateObj.toDateString() === today.toDateString()) {
    return "Сегодня";
  }

  // Проверка на "Вчера"
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (currentDateObj.toDateString() === yesterday.toDateString()) {
    return "Вчера";
  }

  // Остальная логика
  if (props.index === 0 || currentDateObj > previousDateObj) {
    let month = currentDateObj.toLocaleDateString('default', { month: 'long' });
    if (month[month.length - 1] === "ь" || month[month.length - 1] === "й") {
      const regex = /ь$|й$/g;
      month = month.replace(regex, "я");
    } else {
      month += "а";
    }
    date = currentDateObj.getDate() + ' ' + month;
  }
  return date;
});

const openFile = () => {
  window.open(props.messageItem.message_text, "_blank");
}
</script>

<template>
  <div
      class="message-item"
      :class="{
          'client': props.messageItem.user_id === user.id,
          'employee': props.messageItem.user_id !== user.id,
      }"
  >
    <data-message
        v-if="currentDate.length > 0"
        :date="currentDate"
    />
    <div
        class="message-content text_mediumTh"
        :class="{
          'last-message': index === length - 1,
          'is-file': messageItem.type === 'image',
        }"
    >
      <span v-if="messageItem.type !== 'image'">
        {{ messageItem.message_text }}
      </span>
      <img
          v-else
          :src="messageItem.message_text"
          alt="photo"
          @click="openFile"
      />
      <span class="time">
        {{ currentTime }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">

.message-item {
  display: flex;
  flex-direction: column;
  gap: rem(20);

  .text_mediumTh {
    @media (max-width: em(768, 16)) {
      font-size: rem(14);
    }
  }
}

.message-content {
  width: fit-content;
  max-width: 65%;
  padding: rem(20) rem(28);
  border-radius: rem(42);
  position: relative;

  @media (max-width: em(768, 16)) {
    padding: rem(16);
    width: 90%;
  }

  .time {
    position: absolute;
    bottom: 0;
    font-size: rem(10);
  }
}

.audio {
  width: auto;
  padding: rem(17) rem(32) rem(17) rem(6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: rem(10);

  &__controls {
    display: flex;
    justify-content: center;
    align-items: center;
    width: rem(50);
    height: rem(50);
    border-radius: 50%;
    background: #F24259;
    cursor: pointer;
  }

  img {
    height: rem(42);
  }
}

.client {
  align-items: flex-end;
  .message-content {
    border-bottom-right-radius: unset;
    background-color: $color_subBgOpacity;
    .time {
      right: 0;
    }
  }
}

.employee {
  align-items: flex-start;
  .message-content {
    border-bottom-left-radius: unset;
    background-color: $color_grayLight;
    .time {
      left: 0;
    }
  }
}

.last-message {
  margin-bottom: rem(40);
}

.is-file {
  cursor: pointer;
  text-decoration: underline;
}

</style>