<script setup>
import MassageItem from "@/components/ProfileTabs/Massage/MassageItem";
import {ref} from "vue";

const relevance = ref("all");
</script>

<template>
  <section class="massages textMontserrat">
    <header class="massages__header">
      <h2 class="textMontserrat_medium">
        Сообщения
      </h2>
      <div class="activeMenu border_subBg">
        ...
      </div>
    </header>
    <main class="massages__main">
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
            Рынок <sup>60</sup>
          </li>
          <li class="textMontserrat_bold profileNavigation__item">
            Вакансии <sup>40</sup>
          </li>
          <li class="textMontserrat_bold profileNavigation__item">
            Работа <sup>11</sup>
          </li>
        </ul>
        </nav>
        <div class="massagesContainer">
          <massage-item/>
          <massage-item :writeMassage="true"/>
          <massage-item/>
        </div>
    </main>
  </section>
</template>

<style scoped lang="scss">
.massages {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      font-size: rem(20);
    }

    .activeMenu {
      border-radius: 5px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      width: rem(60);
      height: rem(40);
    }
  }

  &__main {
    //margin-top: rem(51);

    .massagesButtonsContainer {
      display: flex;
      gap: rem(35);

      button, .inputSearch {
        flex: 1 1 50%;
        max-width: rem(400);
      }
    }
  }

  .massagesContainer {
    margin-top: rem(20);
  }
}

</style>