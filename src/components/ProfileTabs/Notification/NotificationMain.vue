<script setup>
import NotificationItem from "@/components/ProfileTabs/Notification/NotificationItem";
import {useProfileStore} from "@/store/ProfileStore";

const profileStore = useProfileStore();

const changeContent = (value) => {
  profileStore.content = value
}
</script>

<template>
  <section class="notification textMontserrat">
    <header class="notification__header fraction">
      <h2 class="textMontserrat_medium">
        Мои объявления
      </h2>
    </header>
    <main class="notification__main">
      <notification-item @click="changeContent('notificationBody')"/>
      <notification-item @click="changeContent('notificationBody')"/>
      <notification-item @click="changeContent('notificationBody')"/>
      <notification-item @click="changeContent('notificationBody')"/>
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