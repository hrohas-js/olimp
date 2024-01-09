<script setup>

import DataMessage from "@/components/ProfileTabs/Massage/Chat/DataMessage.vue";
import {computed, defineProps} from "vue";


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

//const currentChat = computed(() => usersStore.currentChat as UserChatMessagesResponse);

const previousMessageDate = computed(() => {
  let date = "";
  if (props.index > 0) {
    //date = currentChat.value.messages[props.index - 1].dt_created
  } else {
    //date = currentChat.value.messages[0].dt_created
  }
  return date;
})
const currentDate = computed(() => {
  let date = "";
  /*const current = props.messageItem.dt_created.split("T")[0].split("-");
  const previous = previousMessageDate.value.split("T")[0].split("-");
  const dt = new Date(current.join("."));
  if (props.index === 0 || (current[2] > previous[2] && current[1] === previous[1])) {
    let month = dt.toLocaleDateString('default', { month: 'long' });
    // eslint-disable-next-line no-constant-condition
    if (month[month.length - 1] === "ь" || "й") {
      const regex = /ь$/g;
      month = month.replace(regex, "я")
    } else {
      month += "а";
    }
    date = dt.getDate() + ' ' + month;
  }*/
  return date;
})

const openFile = () => {
  /*if (props.messageItem.type === "file") {
    window.open(props.messageItem.link, "_blank");
  }*/
}
</script>

<template>
  <div class="message-item">
    <data-message
        v-if="currentDate.length > 0"
        :date="currentDate"
    />
    <div
        class="message-content text_mediumTh"
        :class="{
          'last-message': index === length - 1,
          'is-file': messageItem.type === 'file'
        }"
        @click="openFile"
    >
      {{ messageItem.message_text }}
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
  width: 65%;
  padding: rem(20) rem(28);
  background: #FFFFFF;
  border-radius: rem(42);
  @media (max-width: em(768, 16)) {
    padding: rem(16);
    width: 90%;
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
  }
}

.employee {
  align-items: flex-start;
  .message-content {
    border-bottom-left-radius: unset;
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