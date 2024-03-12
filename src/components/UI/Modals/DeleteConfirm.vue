<script setup>
import {onMounted} from "vue";
import {useMainStore} from "@/store/MainStore";
import {useProfileStore} from "@/store/ProfileStore";
import {useAnnouncementStore} from "@/store/AnnouncementStore";

const mainStore = useMainStore();
const profileStore = useProfileStore();
const announcementStore = useAnnouncementStore();

onMounted(async() => {
  document.addEventListener('click', (e) => {
    mainStore.closeModal(e.target);
  })
});

const closeModal = () => {
  mainStore.popup = '';
};

const deleteTrigger = () => {
  announcementStore.removeAnnouncement({
    id: profileStore.idForDelete
  }).then(() => {
    profileStore.idForDelete = 0;
    profileStore.getAnnouncementOfUser({
      user_id: profileStore.user.id
    });
    mainStore.popup = '';
  });
}
</script>

<template>
  <div class="modal">
    <div class="modal__content background_mainBg">
      <h3 class="textMontserrat_medium color_black">
        Вы уверены, что хотите удалить объявление?
      </h3>
      <div class="buttons">
        <button
            class="button_mainButton background_green"
            @click="deleteTrigger"
        >
          Да
        </button>
        <button
            class="button_mainButton background_accent"
            @click="closeModal"
        >
          Нет
        </button>
      </div>
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
.modal {
  &__content {
    padding: 3%;
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: rem(20);
    position: relative;
    border-radius: rem(5);

    h3 {
      text-align: center;
    }

    .buttons {
      display: flex;
      gap: rem(10);
    }

    .close {
      position: absolute;
      top: rem(6);
      right: rem(6);
    }
  }
}
</style>