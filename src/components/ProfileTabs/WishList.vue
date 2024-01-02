<script setup>
import GoodItemProfile from "@/components/Goods/GoodItemProfile";
import {ref} from "vue";

const relevance = ref("all");
</script>

<template>
  <section class="wishList profileTab">
    <header class="profileTab__header">
      <h2 class="textMontserrat_medium">
        Избранное
      </h2>
    </header>
    <main class="wishList__main">
      <nav class="profileNavigation">
        <ul>
          <li
              class="profileNavigation__item textMontserrat_bold"
              :class="{'active':relevance === 'all'}"
          >
            Все <sup>8</sup>
          </li>
          <li class="textMontserrat_bold profileNavigation__item">
            Аренда <sup>70</sup>
          </li>
          <li class="textMontserrat_bold profileNavigation__item">
            Рынок <sup>10</sup>
          </li>
          <li class="textMontserrat_bold profileNavigation__item">
            Вакансии <sup>40</sup>
          </li>
          <li class="textMontserrat_bold profileNavigation__item">
            Работа <sup>11</sup>
          </li>
        </ul>
      </nav>
      <div class="content">
        <good-item-profile/>
      </div>
    </main>
  </section>
</template>

<style scoped lang="scss">
//.wishList__main {
//  width: fit-content;
//}
</style>
