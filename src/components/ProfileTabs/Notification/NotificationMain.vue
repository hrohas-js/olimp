<script setup>
import NotificationItem from "@/components/ProfileTabs/Notification/NotificationItem";
import {useProfileStore} from "@/store/ProfileStore";
import {onMounted, computed} from "vue";

const profileStore = useProfileStore();

const notifications = computed(() => profileStore.notifications)

onMounted(() => {
  profileStore.getNotifications({
    user_id: profileStore.user.id
  });
});
</script>

<template>
  <section class="notification textMontserrat">
    <header class="notification__header fraction">
      <h2 class="textMontserrat_medium">
        Мои уведомления
      </h2>
    </header>
    <main class="notification__main">
      <notification-item
          v-for="(item, index) in notifications"
          :key="index"
          :item="item"
      />
    </main>
  </section>
</template>

<style scoped lang="scss">
.notification {
  &__header {
    .textMontserrat_medium {
      font-size: rem(20);
    }
  }

  &__main {
    margin-top: rem(10);
  }

  &__item {
    .textMontserrat_medium, .textMontserrat_light {
      font-size: rem(18);
    }

    .item__header {
      display: flex;
      justify-content: space-between;
      gap: rem(20);
      margin-bottom: rem(10);
    }

    .fraction {
      padding-bottom: rem(10);
    }
  }
  .fraction {
    padding-bottom: rem(10);
    border-bottom: 1px solid $color_subBgLight;
  }
}
</style>