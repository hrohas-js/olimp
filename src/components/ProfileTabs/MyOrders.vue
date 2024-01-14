<script setup>
import GoodItemProfile from "@/components/Goods/GoodItemProfile";
import {useProfileStore} from "@/store/ProfileStore";
import {computed, onMounted} from "vue";

const profileStore = useProfileStore();

const relevance = computed(() => profileStore.sellsRelevance);
const active = computed(() => profileStore.myActiveSellsAnnouncements);
const archive = computed(() => profileStore.myArchiveSellsAnnouncements);

onMounted(() => {
  profileStore.getSellAnnouncements();
});

const changeTab = (tab) => {
  profileStore.sellsRelevance = tab;
}
</script>

<template>
  <section class="myOrders profileTab profileTab">
    <header class="profileTab__header profileTab__header">
      <h2 class="textMontserrat_medium">
        Мои заказы
      </h2>
    </header>
    <main class="myOrders__main">
      <nav class="profileNavigation">
        <ul>
          <li
              class="profileNavigation__item textMontserrat_bold"
              :class="{'active': relevance === 'active'}"
              @click="changeTab('active')"
          >
            Активные <sup>{{ active.length }}</sup>
          </li>
          <li
              class="textMontserrat_bold profileNavigation__item"
              :class="{'active': relevance === 'archive'}"
              @click="changeTab('archive')"
          >
            Архив <sup>{{ archive.length }}</sup>
          </li>
        </ul>
      </nav>
      <nav class="myActionsGoods">
        <ul>
<!--          <li class="background_gray textMontserrat_regular">
            Покупаю
          </li>-->
          <li class="background_gray textMontserrat_regular">
            Продаю
          </li>
        </ul>
      </nav>
      <div
          v-if="relevance === 'active'"
          class="content"
      >
        <GoodItemProfile
            v-for="item in active"
            :key="item.id"
            :item="item"
        />
      </div>
      <div
          v-if="relevance === 'archive'"
          class="content"
      >
        <GoodItemProfile
            v-for="item in archive"
            :key="item.id"
            :item="item"
        />
      </div>
    </main>
  </section>
</template>

<style scoped lang="scss">
//.myOrders__main {
//  width: fit-content;
//}

.myActionsGoods {
  margin-top: rem(20);

  ul {
    display: flex;
    align-items: center;
    gap: rem(10);
  }

  li {
    width: rem(90);
    height: rem(35);
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .textMontserrat_regular {
    font-size: rem(14);
  }
}
</style>