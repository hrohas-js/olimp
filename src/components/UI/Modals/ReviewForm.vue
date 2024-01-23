<script setup>
import TextAreaWithBorder from "@/components/UI/Inputs/TextAreaWithBorder";
import {ref, computed} from "vue";
import {useMainStore} from "@/store/MainStore";
import {useProfileStore} from "@/store/ProfileStore";

const mainStore = useMainStore();
const profileStore = useProfileStore();

const rating = ref(0);
const reviewText = ref('');

const chat = computed(() => profileStore.currentChat);
const userName = computed(() => profileStore.user.name);

const setRating = (num) => {
  rating.value = num
}

const closeModal = () => {
  mainStore.popup = '';
}

const sendReview = () => {
  profileStore.addReview({
    text: reviewText.value,
    rating: rating.value,
    user_name: userName.value,
    user_id: chat.value.author_id
  }).then(() => {
    mainStore.popup = '';
  });
}
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <h2 class="textMontserrat_medium color_black">
        Оставьте отзыв
      </h2>
      <form
          class="textMontserrat_regular"
          @submit.prevent="sendReview"
      >
        <div class="form-group color_black">
          <label>
            Поставьте оценку
          </label>
          <div class="stars">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="25" viewBox="0 0 28 25" fill="none" @click="setRating(1)">
              <path
                  d="M9.53823 7.94355L12.905 1.60982C13.3372 0.796728 14.5859 0.796728 15.018 1.60982L18.3848 7.94355L25.914 8.96548C26.88 9.09659 27.265 10.1993 26.5657 10.8318L21.1185 15.7585L22.404 22.7186C22.5691 23.6124 21.5588 24.2939 20.6944 23.8718L13.9615 20.5839L7.22862 23.8718C6.36425 24.2939 5.35389 23.6124 5.51897 22.7186L6.80449 15.7585L1.35742 10.8318C0.658039 10.1993 1.04306 9.09659 2.00908 8.96548L9.53823 7.94355Z"
                  :fill="rating >= 1 ? '#E9605A' : ''" stroke="#E9605A" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="25" viewBox="0 0 28 25" fill="none" @click="setRating(2)">
              <path
                  d="M9.53823 7.94355L12.905 1.60982C13.3372 0.796728 14.5859 0.796728 15.018 1.60982L18.3848 7.94355L25.914 8.96548C26.88 9.09659 27.265 10.1993 26.5657 10.8318L21.1185 15.7585L22.404 22.7186C22.5691 23.6124 21.5588 24.2939 20.6944 23.8718L13.9615 20.5839L7.22862 23.8718C6.36425 24.2939 5.35389 23.6124 5.51897 22.7186L6.80449 15.7585L1.35742 10.8318C0.658039 10.1993 1.04306 9.09659 2.00908 8.96548L9.53823 7.94355Z"
                  :fill="rating >= 2 ? '#E9605A' : ''" stroke="#E9605A" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="25" viewBox="0 0 28 25" fill="none" @click="setRating(3)">
              <path
                  d="M9.53823 7.94355L12.905 1.60982C13.3372 0.796728 14.5859 0.796728 15.018 1.60982L18.3848 7.94355L25.914 8.96548C26.88 9.09659 27.265 10.1993 26.5657 10.8318L21.1185 15.7585L22.404 22.7186C22.5691 23.6124 21.5588 24.2939 20.6944 23.8718L13.9615 20.5839L7.22862 23.8718C6.36425 24.2939 5.35389 23.6124 5.51897 22.7186L6.80449 15.7585L1.35742 10.8318C0.658039 10.1993 1.04306 9.09659 2.00908 8.96548L9.53823 7.94355Z"
                  :fill="rating >= 3 ? '#E9605A' : ''" stroke="#E9605A" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="25" viewBox="0 0 28 25" fill="none" @click="setRating(4)">
              <path
                  d="M9.53823 7.94355L12.905 1.60982C13.3372 0.796728 14.5859 0.796728 15.018 1.60982L18.3848 7.94355L25.914 8.96548C26.88 9.09659 27.265 10.1993 26.5657 10.8318L21.1185 15.7585L22.404 22.7186C22.5691 23.6124 21.5588 24.2939 20.6944 23.8718L13.9615 20.5839L7.22862 23.8718C6.36425 24.2939 5.35389 23.6124 5.51897 22.7186L6.80449 15.7585L1.35742 10.8318C0.658039 10.1993 1.04306 9.09659 2.00908 8.96548L9.53823 7.94355Z"
                  :fill="rating >= 4 ? '#E9605A' : ''" stroke="#E9605A" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="25" viewBox="0 0 28 25" fill="none" @click="setRating(5)">
              <path
                  d="M9.53823 7.94355L12.905 1.60982C13.3372 0.796728 14.5859 0.796728 15.018 1.60982L18.3848 7.94355L25.914 8.96548C26.88 9.09659 27.265 10.1993 26.5657 10.8318L21.1185 15.7585L22.404 22.7186C22.5691 23.6124 21.5588 24.2939 20.6944 23.8718L13.9615 20.5839L7.22862 23.8718C6.36425 24.2939 5.35389 23.6124 5.51897 22.7186L6.80449 15.7585L1.35742 10.8318C0.658039 10.1993 1.04306 9.09659 2.00908 8.96548L9.53823 7.94355Z"
                  :fill="rating >= 5 ? '#E9605A' : ''" stroke="#E9605A" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="form-group color_black">
          <label>
            Текст отзыва
          </label>
          <text-area-with-border v-model="reviewText" />
        </div>
        <button
            class="button_mainButton background_subBg"
            type="submit"
        >
          Отправить
        </button>
      </form>
      <button
          class="close"
          @click="closeModal"
      >
        <svg
            width="20"
            height="20"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <circle
              cx="30"
              cy="30"
              r="30"
              fill="#E9605A"
          />
          <path
              d="M16.8297 18.8295L28.7335 30.7333M28.7335 30.7333L40.6373 42.6371M28.7335 30.7333L41.563 17.9038M28.7335 30.7333L15.904 43.5628"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  position: relative;
  min-width: rem(370);

  @media (max-width: em(768,16)) {
    min-width: auto;
  }

  h2 {
    margin-bottom: 20px;
    font-size: rem(24);
  }

  form {
    .form-group {
      margin-bottom: 15px;
      position: relative;

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

      .stars {
        display: flex;
        gap: rem(5);
        justify-content: center;

        svg {
          cursor: pointer;
        }
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