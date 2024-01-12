<script setup>
import GoodItemProfile from "@/components/Goods/GoodItemProfile";
import {computed, onMounted} from "vue";
import {useProfileStore} from "@/store/ProfileStore";

const profileStore = useProfileStore();

const categories = computed(() => profileStore.wishCategories);
const relevance = computed(() => profileStore.wishRelevance);
const myLikes = computed(() => profileStore.myLikes);
const myFilteredLikes = computed(() => profileStore.myFilteredLikes);

onMounted(() => {
  profileStore.getLikesCategories({
    user_id: profileStore.user.id
  });
});

const changeTab = (slug) => {
  profileStore.wishRelevance = slug;
}
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
              :class="{'active':relevance === 0}"
              @click="changeTab(0)"
          >
            Все <sup>{{ myLikes.length }}</sup>
          </li>
          <li
              v-for="item in categories"
              :key="item.id"
              class="textMontserrat_bold profileNavigation__item"
              :class="{'active':relevance === item.id}"
              @click="changeTab(item.id)"
          >
            {{ item.name }} <sup>{{ item.like_count }}</sup>
          </li>
        </ul>
      </nav>
      <div class="content">
        <good-item-profile
            v-for="item in myFilteredLikes"
            :key="item.id"
            :item="item"
        />
      </div>
    </main>
  </section>
</template>

<style scoped lang="scss">
//.wishList__main {
//  width: fit-content;
//}
</style>
