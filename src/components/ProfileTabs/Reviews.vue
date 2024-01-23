<script setup>
import {useProfileStore} from "@/store/ProfileStore";
import {computed} from "vue";

const profileStore = useProfileStore();

const reviews = computed(() => profileStore.myReviews);
</script>

<template>
  <section class="reviews profileTab">
    <header class="profileTab__header">
      <h2 class="textMontserrat_medium">
        Отзывы
      </h2>
    </header>
    <main class="reviews-content">
      <div
          v-for="item in reviews"
          :key="item.id"
          class="reviews-content__item"
      >
        <h3 class="textMontserrat_semiBold">
          {{ item.user_name }}
        </h3>
        <div class="stars">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" viewBox="0 0 28 25" fill="none">
            <path
                d="M9.53823 7.94355L12.905 1.60982C13.3372 0.796728 14.5859 0.796728 15.018 1.60982L18.3848 7.94355L25.914 8.96548C26.88 9.09659 27.265 10.1993 26.5657 10.8318L21.1185 15.7585L22.404 22.7186C22.5691 23.6124 21.5588 24.2939 20.6944 23.8718L13.9615 20.5839L7.22862 23.8718C6.36425 24.2939 5.35389 23.6124 5.51897 22.7186L6.80449 15.7585L1.35742 10.8318C0.658039 10.1993 1.04306 9.09659 2.00908 8.96548L9.53823 7.94355Z"
                :fill="item.rating >= 1 ? '#E9605A' : ''" stroke="#E9605A" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" viewBox="0 0 28 25" fill="none">
            <path
                d="M9.53823 7.94355L12.905 1.60982C13.3372 0.796728 14.5859 0.796728 15.018 1.60982L18.3848 7.94355L25.914 8.96548C26.88 9.09659 27.265 10.1993 26.5657 10.8318L21.1185 15.7585L22.404 22.7186C22.5691 23.6124 21.5588 24.2939 20.6944 23.8718L13.9615 20.5839L7.22862 23.8718C6.36425 24.2939 5.35389 23.6124 5.51897 22.7186L6.80449 15.7585L1.35742 10.8318C0.658039 10.1993 1.04306 9.09659 2.00908 8.96548L9.53823 7.94355Z"
                :fill="item.rating >= 2 ? '#E9605A' : ''" stroke="#E9605A" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" viewBox="0 0 28 25" fill="none">
            <path
                d="M9.53823 7.94355L12.905 1.60982C13.3372 0.796728 14.5859 0.796728 15.018 1.60982L18.3848 7.94355L25.914 8.96548C26.88 9.09659 27.265 10.1993 26.5657 10.8318L21.1185 15.7585L22.404 22.7186C22.5691 23.6124 21.5588 24.2939 20.6944 23.8718L13.9615 20.5839L7.22862 23.8718C6.36425 24.2939 5.35389 23.6124 5.51897 22.7186L6.80449 15.7585L1.35742 10.8318C0.658039 10.1993 1.04306 9.09659 2.00908 8.96548L9.53823 7.94355Z"
                :fill="item.rating >= 3 ? '#E9605A' : ''" stroke="#E9605A" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" viewBox="0 0 28 25" fill="none">
            <path
                d="M9.53823 7.94355L12.905 1.60982C13.3372 0.796728 14.5859 0.796728 15.018 1.60982L18.3848 7.94355L25.914 8.96548C26.88 9.09659 27.265 10.1993 26.5657 10.8318L21.1185 15.7585L22.404 22.7186C22.5691 23.6124 21.5588 24.2939 20.6944 23.8718L13.9615 20.5839L7.22862 23.8718C6.36425 24.2939 5.35389 23.6124 5.51897 22.7186L6.80449 15.7585L1.35742 10.8318C0.658039 10.1993 1.04306 9.09659 2.00908 8.96548L9.53823 7.94355Z"
                :fill="item.rating >= 4 ? '#E9605A' : ''" stroke="#E9605A" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" viewBox="0 0 28 25" fill="none">
            <path
                d="M9.53823 7.94355L12.905 1.60982C13.3372 0.796728 14.5859 0.796728 15.018 1.60982L18.3848 7.94355L25.914 8.96548C26.88 9.09659 27.265 10.1993 26.5657 10.8318L21.1185 15.7585L22.404 22.7186C22.5691 23.6124 21.5588 24.2939 20.6944 23.8718L13.9615 20.5839L7.22862 23.8718C6.36425 24.2939 5.35389 23.6124 5.51897 22.7186L6.80449 15.7585L1.35742 10.8318C0.658039 10.1993 1.04306 9.09659 2.00908 8.96548L9.53823 7.94355Z"
                :fill="item.rating === 5 ? '#E9605A' : ''" stroke="#E9605A" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <p>
          {{ item.review_text }}
        </p>
      </div>
    </main>
  </section>
</template>

<style scoped lang="scss">
.reviews-content {
  margin-top: rem(30);
  display: flex;
  flex-direction: column;
  gap: rem(20);

  &__item {
    display: flex;
    flex-direction: column;
    gap: rem(10);


  }
}
</style>