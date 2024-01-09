<script setup>
import InputAnnouncement from "@/components/UI/Inputs/InputAnnouncement";
import MessageItem from "@/components/ProfileTabs/Massage/Chat/MessageItem.vue";
import {ref} from "vue";

const chat = ref([
  {
    id: 1,
    message_text: 'Сообщение1',
    type: 'text'
  },
  {
    id: 2,
    message_text: 'Сообщение2',
    type: 'text'
  },
  {
    id: 3,
    message_text: 'Сообщение3',
    type: 'text'
  }
]);
/*
import InputDecorate from "@/components/UI/inputs/InputDecorate.vue";
import MessageItem from "@/components/UI/elements/MessageItem.vue";
import {useUsersStore} from "@/store/UsersStore";
import {computed, onMounted, ref, onUnmounted} from "vue";
import IncludeFileItem from "@/components/UI/elements/IncludeFileItem.vue";
import { UserChatMessagesResponse } from "@/api/user/models";
import { ChatUploadedFile } from "@/store/types/user";

const usersStore = useUsersStore();

const audioSwitch = ref(false);
const minutes = ref(0);
const seconds = ref(0);
const timer = ref();
const chatFetcher = ref();
const timeValue = ref(0);
const garbageShow = ref(false);

const chatName = computed(() => usersStore.currentChatName);
const chat = computed(() => usersStore.currentChat as UserChatMessagesResponse);
const chatNumber = computed(() => usersStore.currentChatNumber);
const newMessage = computed(() => usersStore.currentChatNewMessage);
const chatUploadedFiles = computed(() => Object.keys(usersStore.chatUploadedFiles[0]).length > 0 ? usersStore.chatUploadedFiles : []) as unknown as ChatUploadedFile[];
const fileIds = computed(() => usersStore.fileIds)

onMounted(() => {
  chatFetcher.value = setInterval(() => {
    usersStore.getChatMessages(chatNumber.value);
  }, 20000);
});

onUnmounted(() => {
  usersStore.currentChatNumber = 0;
  clearInterval(chatFetcher.value)
});

const convertFileToBase64 = (file: any, callback: any) => {
  const reader = new FileReader();
  reader.onload = callback;
  reader.readAsDataURL(file);
};

const changeFile = (e:any) => {
  e.stopPropagation();
  e.preventDefault();
  e.target.files.forEach((file:any) => {
    convertFileToBase64(file, (resp:any) => {
      const fileToSend = {
        file: resp.currentTarget.result,
        file_name: file.name,
      };
      usersStore.uploadFile(fileToSend);
    });
  });
};

const clickFile = () => {
  document.getElementById("file-input")?.click();
}

const timerLoaded = () => {
  timer.value = setInterval(() => {
    if (timeValue.value < 100) {
      timeValue.value++
    }
    seconds.value++;
    if (seconds.value === 60) {
      seconds.value = 0;
      minutes.value++;
    }
  }, 1000)
}

const recordFile = ref([]);
const fileToSendLocal = ref();
const audioMic = navigator.mediaDevices.getUserMedia({ audio: true });

const recorder = ref();

const runAudio = async () => {
  recordFile.value = [];
  fileToSendLocal.value = null;

  if (navigator.mediaDevices) {
    audioMic.then((stream) => {
      recorder.value = new MediaRecorder(stream);
      recorder.value.ondataavailable = (e: { data: never }) => {
        recordFile.value.push(e.data);
      }
      recorder.value.start(1);
    });
  }
}

const stopAudio = () => {
  fileToSendLocal.value = new Blob(recordFile.value, { type: 'audio/mp3' });
  recorder.value.stop();
  console.log(fileToSendLocal.value)
}

const startAudio = () => {
  audioSwitch.value = true;
  timerLoaded();
  runAudio();
}

const removeAudio = () => {
  recordFile.value = [];
  fileToSendLocal.value = '';
  minutes.value = 0;
  seconds.value = 0;
  timeValue.value = 0;
  audioSwitch.value = false;
};


const timerStop = () => {
  clearInterval(timer.value);
  garbageShow.value = true;
  stopAudio();
}

const sendAudio = () => {
  convertFileToBase64(fileToSendLocal.value, (resp:any) => {
    const fileToSend = {
      file: resp.currentTarget.result,
      file_name: `${new Date()}.mp3`,
    }
    usersStore.uploadFile(fileToSend).then(() => {
      usersStore.sendMessage({
        chat_id: chatNumber.value,
        content: newMessage.value,
        file_ids: fileIds.value
      });
    }).then(() => {
      usersStore.getChatMessages(chatNumber.value).then(() => {
        const chatWindow = document.querySelector('.chat__main');
        if (chatWindow) {
          chatWindow.scrollTo(0, chatWindow.scrollHeight);
        }
      });
      fileToSendLocal.value = '';
      audioSwitch.value = false;
    });
  });
}


const sendMessage = () => {
  if (newMessage.value!.length > 0 || fileIds.value[0] !== 0) {
    usersStore.sendMessage({
      chat_id: chatNumber.value,
      content: newMessage.value,
      file_ids: fileIds.value
    }).then(() => {
      usersStore.getChatMessages(chatNumber.value).then(() => {
        const chatWindow = document.querySelector('.chat__main');
        if (chatWindow) {
          chatWindow.scrollTo(0, chatWindow.scrollHeight);
        }
      })
    })
  }
}*/

const changeFile = (e) => {
  e.stopPropagation();
  e.preventDefault();
};

const clickFile = () => {
  document.getElementById("file-input")?.click();
}
</script>

<template>
  <section class="chat">
    <header class="chat__header background_colorRed">
      <h1 class="color_bg text_large">
        Имя чата
      </h1>
    </header>
    <main class="chat__main background_chat">
      <div class="dataContainer">
        <message-item
            v-for="(item, index) in chat"
            :key="item.id"
            :message-item="item"
            :index="index"
            :length="chat.length"
        />
      </div>
    </main>
    <footer class="chat__footer background_colorWhite">
      <svg
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
      />
      <input-announcement
        input-placeholder="Текст сообщения..."
      />
      <svg
          ref="submit"
          xmlns="http://www.w3.org/2000/svg"
          width="49"
          height="49"
          viewBox="0 0 49 49"
          fill="none"
      >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.15091 27L23.0321 27L16.8848 33.2464L20.4485 36.7536L30.7819 26.2536L32.5076 24.5L30.7819 22.7464L20.4485 12.2464L16.8848 15.7536L23.0321 22L4.15091 22C5.38408 11.8573 14.0245 4 24.5 4C35.8218 4 45 13.1782 45 24.5C45 35.8218 35.8218 45 24.5 45C14.0245 45 5.38408 37.1427 4.15091 27Z"
            fill="#F24259"
        />
      </svg>
    </footer>
  </section>
</template>

<style scoped lang="scss">
.chat {
  height: 100vh;
  &__header {
    height: rem(72);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-shadow: 0 24px 24px -24px rgba(0, 0, 0, .13);

    @media (max-width: em(768, 16)) {
      border-radius: unset;
    }

    .text_large {
      font-size: rem(24);

      @media (max-width: em(768, 16)) {
        font-size: rem(17);
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
    }

    .addFile {
      margin-right: rem(16.75);
    }

    .inputDecorate {
      width: 100%;
      max-width: rem(665);
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