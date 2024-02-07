<script setup>
import HeaderBannerMobile from "@/components/HeaderComponents/HeaderBannerMobile";
import SearchHeader from "@/components/HeaderComponents/SearchHeader";
import {useMainStore} from "@/store/MainStore";
import {computed} from "vue";
import SendMessageForm from "@/components/UI/SendMessageForm";

const mainStore = useMainStore();

const width = computed(() => mainStore.display_width);
</script>

<template>
  <section class="question">
    <div class="wrapper">
      <header-banner-mobile v-if="width <= 768" />
      <search-header v-if="width > 1024"/>
      <div class="content">
        <h2 class="textMontserrat textMontserrat_medium">
          Реклама на сайте
        </h2>
        <p class="textMontserrat textMontserrat_medium">
          Напишите свои предложения, мы постараемся в короткие сроки ответить Вам на указанную Вами электронную почту.
        </p>
        <send-message-form subject="Реклама на сайте" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.content {
  max-width: 60%;
  margin: 0 auto;

  @media (max-width: em(768, 16)) {
    max-width: 100%;
  }

  h2 {
    font-size: rem(36);
    margin-top: rem(40);
    margin-bottom: rem(20);
  }

  p {
    margin-bottom: rem(20);
    font-size: rem(18);
  }
}
</style>