<script setup>
import MassageItem from "@/components/ProfileTabs/Massage/MessageItem";
import {ref, computed, onMounted} from "vue";
import {useCatalogStore} from "@/store/CatalogStore";
import {useProfileStore} from "@/store/ProfileStore";

const catalogStore = useCatalogStore();
const profileStore = useProfileStore();

const categories = computed(() => profileStore.chatCategories);
const chats = computed(() => profileStore.myFilteredChats);
const allCount = computed(() => profileStore.myChats.length);
const relevance = computed(() => profileStore.relevance);

onMounted(() => {
  profileStore.getChatsCategories({
    user_id: profileStore.user.id
  });
  profileStore.getAllChats({
    user_id: profileStore.user.id
  });
});

const changeTab = (slug) => {
  profileStore.relevance = slug;
}
</script>

<template>
  <section class="messages textMontserrat">
    <header class="messages__header">
      <h2 class="textMontserrat_medium">
        Сообщения
      </h2>
<!--      <div class="activeMenu border_subBg">
        ...
      </div>-->
    </header>
    <main class="messages__main">
      <nav class="profileNavigation">
        <ul>
          <li
              class="profileNavigation__item textMontserrat_bold"
              :class="{'active':relevance === 0}"
              @click="changeTab(0)"
          >
            Все <sup>{{ allCount }}</sup>
          </li>
          <li
              v-for="item in categories"
              :key="item.id"
              class="textMontserrat_bold profileNavigation__item"
              :class="{'active':relevance === item.id}"
              @click="changeTab(item.id)"
          >
            {{ item.name }} <sup>{{ item.chat_count }}</sup>
          </li>
        </ul>
        </nav>
        <div class="messagesContainer">
          <massage-item
              v-for="item in chats"
              :key="item.id"
              :item="item"
          />
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