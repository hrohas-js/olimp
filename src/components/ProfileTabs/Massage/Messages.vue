<script setup>
import MassageItem from "@/components/ProfileTabs/Massage/MessageItem";
import {ref, computed, onMounted} from "vue";
import {useCatalogStore} from "@/store/CatalogStore";
import {useProfileStore} from "@/store/ProfileStore";

const catalogStore = useCatalogStore();
const profileStore = useProfileStore();

const categories = computed(() => catalogStore.categories);

const relevance = ref("all");

onMounted(() => {
  profileStore.getAllChats({
    user_id: profileStore.user.id,
    category_id: categories.value[0].id
  });
});

const changeTab = (slug) => {
  relevance.value = slug
}
</script>

<template>
  <section class="messages textMontserrat">
    <header class="messages__header">
      <h2 class="textMontserrat_medium">
        Сообщения
      </h2>
      <div class="activeMenu border_subBg">
        ...
      </div>
    </header>
    <main class="messages__main">
      <nav class="profileNavigation">
        <ul>
          <li
              class="profileNavigation__item textMontserrat_bold"
              :class="{'active':relevance === 'all'}"
              @click="changeTab('all')"
          >
            Все <sup>8</sup>
          </li>
          <li
              v-for="item in categories"
              :key="item.id"
              class="textMontserrat_bold profileNavigation__item"
              :class="{'active':relevance === item.slug}"
              @click="changeTab(item.slug)"
          >
            {{ item.name }} <sup>70</sup>
          </li>
        </ul>
        </nav>
        <div class="messagesContainer">
          <massage-item/>
          <massage-item :writeMassage="true"/>
          <massage-item/>
        </div>
    </main>
  </section>
</template>

<style scoped lang="scss">
.messages {
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

    .messagesButtonsContainer {
      display: flex;
      gap: rem(35);

      button, .inputSearch {
        flex: 1 1 50%;
        max-width: rem(400);
      }
    }
  }

  .messagesContainer {
    margin-top: rem(20);
  }
}

</style>