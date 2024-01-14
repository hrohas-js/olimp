<script setup>
import InputAnnouncement from "@/components/UI/Inputs/InputAnnouncement";
import MessageItem from "@/components/ProfileTabs/Massage/Chat/MessageItem.vue";
import {useProfileStore} from "@/store/ProfileStore";
import {useMainStore} from "@/store/MainStore";
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {getCurrentDateTime} from "@/plugins/validator";

const profileStore = useProfileStore();
const mainStore = useMainStore();
const router = useRouter();

const chat = computed(() => profileStore.currentChatHistory);
const chatInfo = computed(() => profileStore.currentChat);
const userID = computed(() => profileStore.user.id);

let ws;
const messageValue = ref('');

const mainPhoto = computed(() => {
  let res = '';
  if (chatInfo.value.gallery) {
    res = JSON.parse(chatInfo.value.gallery)[0].src;
  }
  return res;
});
const chatID = computed(() => {
  let id = 0;
  if (chatInfo.value.id) {
    id = chatInfo.value.id
    ws = new WebSocket(`ws://95-163-243-224.cloudvps.regruhosting.ru:10000/chat/${id}`);
    ws.onopen = function() {
      console.log('Connected to the chat');
    };
    ws.onmessage = function(event) {
      profileStore.currentChatHistory.push(JSON.parse(event.data));
      messageValue.value = '';
    };

  }
  return id;
});

const changeFile = (e) => {
  e.stopPropagation();
  e.preventDefault();
};

const clickFile = () => {
  document.getElementById("file-input")?.click();
}

const send = () => {
  const message = {
    chat_id: chatID.value,
    user_id: userID.value,
    message_text: messageValue.value,
    dt_created: getCurrentDateTime(),
    is_read: false
  }
  profileStore.sendMessage(message).then(() => {
    ws.send(JSON.stringify(message));
  })
}

const goBack = () => {
  router.push('/profile');
  profileStore.content = 'messages';
  mainStore.miniChat = false;
}
</script>

<template>
  <section class="chat background_mainBg">
    <header class="chat__header">
      <div
          class="back"
          @click="goBack"
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="icon-icon-JUE8Z" style="width: 24px; height: 24px;">
          <path d="m7.414 13 5.293 5.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 1 1 1.414 1.414L7.414 11H19a1 1 0 1 1 0 2H7.414Z" fill="black"></path>
        </svg>
      </div>
      <div class="header-content">
        <div class="image">
          <span style="display: none">{{ chatID }}</span>
          <img
              :src="mainPhoto"
              alt="main"
          />
        </div>
        <div class="info">
          <div class="info__name">
            <span class="textMontserrat_bold">
            {{ chatInfo.user_name }}
          </span>
            <span class="color_grayDarker">
            В сети в 12:26
          </span>
          </div>
          <div class="info__title">
            {{ chatInfo.chat_name }}
          </div>
        </div>
      </div>
    </header>
    <main class="chat__main">
      <div class="dataContainer">
        <message-item
            v-for="(item, index) in chat"
            :key="index"
            :message-item="item"
            :index="index"
            :length="chat.length"
        />
      </div>
    </main>
    <footer class="chat__footer background_colorWhite">
<!--      <svg
          class="addFile"
          xmlns="http://www.w3.org/2000/svg"
          width="37"
          height="36"
          viewBox="0 0 37 36"
          fill="none"
          @click="clickFile"
      >
        <path
            d="M25.6344 9.22228L25.6344 23.7415C25.6573 26.0415 24.8469 28.272 23.3528 30.0206L22.9379 30.4355C21.5433 31.8625 19.6347 32.6708 17.6393 32.6794C13.227 32.6794 9.6349 28.6536 9.6349 23.7133L9.6349 10.7025C9.63708 9.96921 10.231 9.37531 10.9643 9.37313C11.3198 9.37167 11.6611 9.51225 11.9125 9.76364C12.1639 10.015 12.3045 10.3564 12.303 10.7119L12.303 23.7415C12.2936 27.2205 14.6884 30.0489 17.6299 30.0489C19.0614 30.0106 20.4061 29.3537 21.3163 28.2482C22.3855 26.985 22.9615 25.3775 22.9379 23.7227L23.0134 9.18457C23.178 7.16097 21.6954 5.37675 19.6758 5.1682C17.6604 5.37474 16.1809 7.15606 16.3477 9.17514L16.3477 23.6944C16.3407 24.1621 16.5012 24.6169 16.8002 24.9766C17.0148 25.2441 17.3345 25.4056 17.6771 25.4197C18.5035 25.2861 19.0872 24.538 19.0158 23.7038L19.0158 8.41146C19.018 7.67818 19.6119 7.08428 20.3452 7.0821C20.7007 7.08064 21.0421 7.22123 21.2935 7.47261C21.5449 7.724 21.6855 8.06538 21.684 8.42089L21.684 23.6944C21.786 26.0089 20.0003 27.9715 17.6865 28.0879C15.3728 27.9764 13.583 26.0182 13.6795 23.7038L13.6324 9.23171C13.4631 5.73383 16.1421 2.75199 19.6381 2.54719C23.1299 2.74992 25.8058 5.72883 25.6344 9.22228V9.22228Z"
            fill="#231F20"
        />
      </svg>
      <input
          id="file-input"
          type="file"
          @change="changeFile"
      />-->
      <input-announcement
          v-model="messageValue"
          input-placeholder="Текст сообщения..."
      />
      <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          class="icon-submit"
          style="width: 24px; height: 24px;"
          @click="send"
      >
        <path d="M22 12a1 1 0 0 1-.574.905l-17 8a1 1 0 0 1-1.39-1.168l1.5-5.5a1 1 0 0 1 .605-.67L9.214 12l-4.073-1.567a1 1 0 0 1-.606-.67l-1.5-5.5a1 1 0 0 1 1.39-1.168l17 8A1 1 0 0 1 22 12Z" fill="currentColor"></path>
      </svg>
    </footer>
  </section>
</template>

<style scoped lang="scss">
.chat {
  height: rem(360);

  &.mini {
    height: rem(470);

    .chat__main {
      height: 70%;
    }
  }

  &__header {
    height: rem(72);
    display: flex;
    align-items: center;
    gap: rem(10);
    box-shadow: 0 24px 24px -24px rgba(0, 0, 0, .13);

    @media (max-width: em(768, 16)) {
      border-radius: unset;
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: rem(10);
    }

    .back {
      flex: 0 0 10%;
      cursor: pointer;
    }

    .info {
      flex: 0 1 90%;
    }

    .image {
      img {
        height: rem(35);
      }
    }
  }

  &__main {
    position: relative;
    height: 60%;
    padding: rem(45) rem(20);
    overflow-y: auto;

    .dataContainer {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: rem(20);
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    padding: rem(13) rem(19);
    border-radius: 0 0 10px 10px;
    box-shadow: 0 -24px 24px -24px rgba(0, 0, 0, .13);

    svg {
      cursor: pointer;
      path {
        fill: $color_gray;
      }
    }

    .icon-submit {
      margin-left: rem(10);
      path {
        fill: $color_subBg;
      }
    }

    .voice {
      margin: 0 rem(10);
    }

    .audio-road {
      position: relative;
      width: 100%;
      height: rem(30);
      max-width: rem(700);
      //background: url("@/assets/image/png/audio.png") left center;
      background-size: contain;

      .audio-layer {
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        &_upper {
          width: 100%;
        }

        &_lower {
          background: transparent;
        }
      }
    }
  }

  .uploaded-files {
    margin-top: rem(10);
    display: flex;
    flex-direction: column;
    gap: rem(10);
  }

  #file-input {
    display: none;
  }

  .record-time {
    font-weight: 500;
    margin: 0 rem(10);
  }
}
</style>