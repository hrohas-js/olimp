<script setup>
import {useProfileStore} from "@/store/ProfileStore";
import {computed} from "vue";

const profileStore = useProfileStore();

const props = defineProps({
  writeMessage: {
    type: Boolean,
    default() {
      return false
    }
  },
  item: {
    type: Object,
    default() {
      return {}
    }
  }
});

const mainPhoto = computed(() => {
  let src = '';
  if (props.item.gallery) {
    src = JSON.parse(props.item.gallery)[0].src;
  }
  return src;
});

const changeContent = () => {
  profileStore.currentChat = props.item;
  profileStore.content = "chat";
  profileStore.getMessages({
    chat_id: props.item.chat_id
  });
}
</script>

<template>
  <article class="messageItem" @click="changeContent">
    <div class="messageItem__check"/>
    <div class="messageItem__information">
      <div class="image">
        <img :src="mainPhoto" alt="altText"/>
      </div>
      <div class="text">
        <h2 class="textMontserrat_bold text__item">
          {{ item.user_name }}
        </h2>
        <p class="textMontserrat_medium text__item">
          {{ item.title }}
        </p>
<!--        <p class="textMontserrat_light text__item">
          Арендодатель не подтвердил заявку
        </p>-->
      </div>
<!--      <div class="avatar">
        <img src="@/assets/png/Profile/avatar.jpg" alt="Анжелика"/>
      </div>-->
    </div>
<!--    <time
        v-if="!props.writeMessage"
        class="messageItem__time textMontserrat_medium" datetime="20 авг"
    >
      20 авг
    </time>
    <time
        v-if="props.writeMessage"
        class="messageItem__write textMontserrat_light" datetime="20 авг"
    >
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
           class="icon-icon-JUE8Z status-icon-root-kGiuI status-icon-statusRead-lFsAI"
           data-marker="icon/messenger-statusRead" style="width: 16px; height: 16px; color: rgb(0, 170, 255);">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M10.235 4.177a.75.75 0 00-1.058.089l-4.973 5.877L2.28 8.22a.75.75 0 00-1.06 1.06l2.5 2.5c.31.31.82.29 1.103-.045l5.5-6.5a.75.75 0 00-.088-1.058zM8.27 9.21l-.973 1.149L8.72 11.78c.31.31.82.29 1.103-.045l5.5-6.5a.75.75 0 10-1.146-.97l-4.973 5.878-.934-.934z"
              fill="currentColor">
        </path>
      </svg>
      20 авг
    </time>-->
  </article>
</template>

<style scoped lang="scss">
.messageItem {
  cursor: pointer;
  margin-top: rem(40);
  display: grid;
  grid-template-columns: 1fr (600 / 30) + fr (150 / 30) + fr (100 / 30) + fr;
  grid-template-areas:
  'check information . time';

  &:first-child {
    margin-top: 0;
  }

  &__check {
    border-radius: 5px;
    background: #D9D9D9;
    width: 1rem;
    height: 1rem;
    grid-area: check;
  }

  &__information {
    position: relative;
    display: flex;
    padding-left: rem(25);
    gap: rem(20);
    grid-area: information;

    h2 {
      font-size: rem(18);
    }

    p {
      font-size: rem(16);
    }

    .image {
      flex: 1 1 20%;
    }

    .text {
      flex: 1 1 80%;

      &__item {
        margin-top: rem(4);
        //font-size: 1rem;

        &:first-child {
          margin-top: 0;
        }
      }
    }

    .avatar {
      position: absolute;
      max-width: rem(50);
      max-height: rem(50);
      left: 0;
      top: -15%;

      img {
        border-radius: 50%;
        border: 4px solid $color_bgLight;
      }
    }
  }

  &__time {
    grid-area: time;
    font-size: rem(16);
    justify-self: end;
  }

  &__write {
    grid-area: time;
    font-size: rem(16);
    display: flex;
    align-items: flex-start;
    justify-self: flex-end;
    gap: rem(4);

    svg {
      display: flex;
    }
  }

  @media (max-width: em(1920, 16)) {
    &__information {
      gap: calc(4rem / 16 + (20 - 4) * ((100vw - 1024rem / 16) / (1920 - 1024)));

      //h2, p {
      //  font-size: calc(16rem / 16 + (24 - 16) * ((100vw - 1024rem / 16) / (1920 - 1024)));
      //}
    }
    &__write {
      //gap: calc(4rem / 16 + (16 - 4) * ((100vw - 1024rem / 16) / (1920 - 1024)));
      font-size: calc(12rem / 16 + (16 - 12) * ((100vw - 1024rem / 16) / (1920 - 1024)));

      svg {
        width: calc(16rem / 16 + (20 - 16) * ((100vw - 1024rem / 16) / (1920 - 1024)));
      }
    }
    .avatar {
      width: calc(25rem / 16 + (50 - 25) * ((100vw - 390rem / 16) / (1920 - 390)));
    }
  }
  @media (max-width: em(1553, 16)) {
    grid-template-columns: 1fr (600 / 30) + fr 1fr (100 / 30) + fr;
  }
  @media (max-width: em(1163, 16)) {
    grid-template-columns: 0.5fr (600 / 30) + fr 0.5fr (80 / 30) + fr;
  }
  @media (max-width: em(768, 16)){
    grid-template-columns: 0.5fr 15fr 0.5fr 2.6666666667fr;
    &__information{
      gap: rem(10);
      .image{
        img{
          height: 100%;
          object-fit:cover;
        }
      }
      h2 {
        font-size: calc(12rem / 16 + (18 - 12) * ((100vw - 390rem / 16) / (768 - 390)));
      }

      p, {
        font-size: calc(10rem / 16 + (16 - 10) * ((100vw - 390rem / 16) / (768 - 390)));
      }
      .text{
        &__item{
          margin-top: calc(0rem / 16 + (4 - 0) * ((100vw - 390rem / 16) / (768 - 390)));
        }
      }
      .avatar{
        left: rem(10);
        top: -20%;
      }
    }
    &__time{
      font-size: calc(10rem / 16 + (16 - 10) * ((100vw - 390rem / 16) / (768 - 390)));
    }
    &__write {
      font-size: calc(10rem / 16 + (16 - 10) * ((100vw - 390rem / 16) / (768 - 390)));
    }
  }
}
</style>