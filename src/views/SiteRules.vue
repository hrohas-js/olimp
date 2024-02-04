<script setup>
import HeaderBannerMobile from "@/components/HeaderComponents/HeaderBannerMobile";
import SearchHeader from "@/components/HeaderComponents/SearchHeader";
import {useMainStore} from "@/store/MainStore";
import {computed} from "vue";

const mainStore = useMainStore();

const width = computed(() => mainStore.display_width);
</script>

<template>
  <section class="about">
    <div class="wrapper">
      <header-banner-mobile v-if="width <= 768" />
      <search-header v-if="width > 1024"/>
      <div class="content">
        <h2 class="textMontserrat textMontserrat_medium">
          Условия и требования к размещению
          и содержанию объявления.
        </h2>
        <div class="textMontserrat textMontserrat_medium">
          <p>
            1. Объявление не должно вступать в противоречия с существующим
            законодательством и должно быть законным.
          </p>
          <p>
            2. Информация в размещаемом объявлении должна быть достоверной и актуальной.
            Информация в объявлении должна быть понятной и не иметь разночтений и не
            должна вводить в заблуждение.
          </p>
          <p>
            3. Контактные данные должны быть актуальными по которым с Вами смогут связаться.
          </p>
          <p>
            4. Вы самостоятельно несете ответственность за достоверность и законность
            содержания Вашего объявления.
          </p>
          <p>
            5. Объявления должны размещаться только в тех категориях, которые существуют на
            на данной площадке Production city и к которым относятся Ваше объявление.
          </p>
          <p>
            6. Объявление размещается на 30 дней после чего потребуется его повторная
            активация, в случае необходимости и актуальности Вашего объявления, на Ваше
            усмотрение.
          </p>
          <p>
            7. Модераторы вправе блокировать любые объявления и материалы, которые будут
            противоречить условиям размещения.
          </p>
          <p>
            8. Размещая объявление Вы принимаете все перечисленные условия и даете согласие
            на публикацию и общего доступа к содержанию Вашего объявления в сети интернет.
          </p>
        </div>
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
  div.textMontserrat_medium {
    display: flex;
    flex-direction: column;
    gap: rem(10);
    font-size: rem(14);
  }
}
</style>