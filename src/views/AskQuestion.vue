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
          Поддержка
        </h2>
        <p class="textMontserrat textMontserrat_medium">
          Изложите суть вопроса , мы направим Вам ответ на указанную Вами электронную почту.
        </p>
        <send-message-form subject="Вопрос-ответ" />
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