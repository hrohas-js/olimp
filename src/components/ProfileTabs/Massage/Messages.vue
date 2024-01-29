<script setup>
import MassageItem from "@/components/ProfileTabs/Massage/MessageItem";
import {ref, computed, onMounted} from "vue";
import {useCatalogStore} from "@/store/CatalogStore";
import {useProfileStore} from "@/store/ProfileStore";
import {useMainStore} from "@/store/MainStore";

const catalogStore = useCatalogStore();
const profileStore = useProfileStore();
const mainStore = useMainStore();

const categories = computed(() => profileStore.chatCategories);
const chats = computed(() => profileStore.myFilteredChats);
const allCount = computed(() => profileStore.myChats.length);
const relevance = computed(() => profileStore.relevance);
const miniChat = computed(() => mainStore.miniChat);
const selectedMessages = computed(() => profileStore.selectedMessages.length > 0);

const showMenu = ref(false);

const props = defineProps({
  mini: {
    type: Boolean,
    default: false
  }
});

onMounted(() => {
  refresh();
  document.addEventListener('click', (e) => {
    if (showMenu.value && !e.target.classList.contains('activeMenu')) {
      showMenu.value = false;
    }
  });
});

const changeTab = (slug) => {
  profileStore.relevance = slug;
}

const showMenuTrigger = () => {
  showMenu.value = !showMenu.value;
}

const refresh = () => {
  profileStore.getChatsCategories({
    user_id: profileStore.user.id
  });
  profileStore.getAllChats({
    user_id: profileStore.user.id
  });
  document.querySelectorAll('input[type=checkbox]').forEach(elem => {
    elem.checked = false;
  });
}

const selectedDelete = () => {
  if (selectedMessages.value) {
    showMenu.value = false;
    profileStore.remove().then(() => {
      refresh();
    });
  }
}

const selectedMark = () => {
  if (selectedMessages.value) {
    showMenu.value = false;
    profileStore.setImportant().then(() => {
      refresh();
    });
  }
}

const selectedMarkDown = () => {
  if (selectedMessages.value) {
    showMenu.value = false;
    profileStore.setDownImportant().then(() => {
      refresh();
    });
  }
}

const selectedBlacklist = () => {
  if (selectedMessages.value) {
    showMenu.value = false;
    profileStore.setBlacklist().then(() => {
      refresh();
    });
  }
}

const selectedDownBlacklist = () => {
  if (selectedMessages.value) {
    showMenu.value = false;
    profileStore.setDownBlacklist().then(() => {
      refresh();
    });
  }
}
</script>

<template>
  <section
      class="messages textMontserrat"
      :class="{'messages-mini': props.mini}"
  >
    <header class="messages__header">
      <h2 class="textMontserrat_medium">
        Сообщения
      </h2>
      <div class="controls">
        <div
            class="activeMenu border_subBg"
            @click="showMenuTrigger"
        >
          ...
        </div>
        <div
            v-if="showMenu"
            class="activeMenu-list border_subBg"
        >
          <div
              class="textMontserrat_medium"
              @click="selectedMark"
          >
            Отметить как важное
          </div>
          <div
              class="textMontserrat_medium"
              @click="selectedMarkDown"
          >
            Отменить важное
          </div>
          <div
              class="textMontserrat_medium"
              @click="selectedBlacklist"
          >
            Заблокировать
          </div>
          <div
              class="textMontserrat_medium"
              @click="selectedDownBlacklist"
          >
            Разблокировать
          </div>
          <div
              class="textMontserrat_medium"
              @click="selectedDelete"
          >
            Удалить
          </div>
        </div>
      </div>
    </header>
    <main class="messages__main">
      <nav
          v-if="!miniChat"
          class="profileNavigation"
      >
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

    .controls {
      position: relative;

      .activeMenu {
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        width: rem(40);
        height: rem(30);
        user-select: none;
      }

      .activeMenu-list {
        position: absolute;
        z-index: 99;
        border-radius: 5px;
        right: 0;
        width: rem(200);
        background: white;

        .textMontserrat_medium {
          cursor: pointer;
          padding: rem(10);
          transition: all 0.3s;
          background: white;

          &:hover {
            background: $color_grayLight;
          }
        }
      }
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
.messages-mini {
  margin-top: rem(60);
  padding: 0 rem(10);
}
</style>