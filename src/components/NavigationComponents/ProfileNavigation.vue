<script setup>
import {computed} from "vue";
import {useProfileStore} from "@/store/ProfileStore";
import {useAuthStore} from "@/store/AuthStore";
import {useRouter} from "vue-router";

const profileStore = useProfileStore();
const authStore = useAuthStore();
const router = useRouter();

const props = defineProps({
  position: {
    type: String,
    default() {
      return ""
    }
  }
});

const content = computed(() => profileStore.content);

const changeContent = (value) => {
  profileStore.content = value
}

const exit = () => {
  authStore.jwt = null;
  localStorage.clear();
  profileStore.clearStore();
}
</script>

<template>
  <nav class="profileNavigator textMontserrat textMontserrat_medium background_elements">
    <ul class="fraction">
      <li
          :class="{'active':content === 'myAnnouncements'}"
          @click="changeContent('myAnnouncements')"
      >
        Мои объявления
      </li>
<!--      <li
          :class="{'active':content === 'messages'}"
          @click="changeContent('messages')"
      >
        Мои сообщения
      </li>-->
      <li
          :class="{'active':content === 'orders'}"
          @click="changeContent('orders')"
      >
        Мои заказы
      </li>
      <li
          :class="{'active':content === 'wishList'}"
          @click="changeContent('wishList')"
      >
        Избранное
      </li>
      <li
          :class="{'active':content === 'notification' || content === 'notificationBody'}"
          @click="changeContent('notification')"
      >
        Уведомления
      </li>
<!--      <li
          v-if="props.position !== 'header'"
          :class="{'active':content === 'resume'}"
          @click="changeContent('resume')"
      >
        Резюме
      </li>-->
    </ul>
    <ul class="fraction">
      <li
          :class="{'active':content === 'cash'}"
          @click="changeContent('wallet')"
      >
        Кошелёк
      </li>
      <li
          :class="{'active':content === 'settings'}"
          @click="changeContent('settings')">
        Настройки профиля
      </li>
    </ul>
    <ul
    >
      <li @click.stop="exit">
        Выйти
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
nav {
  margin: rem(10) 0;
  border-radius: 10px;

  .fraction {
    border-bottom: 1px solid #2963a44a;
    padding-bottom: rem(8);
    margin-bottom: rem(8);
  }

  li {
    cursor: pointer;
    //padding: rem(4) rem(26);
    padding: rem(4) 0;
    transition: all 0.2s;
    font-size: rem(16);

    &:first-child {
      margin-top: 0;
    }
  }

  .active, li:hover {
    font-weight: 700;
  }

  @media (max-width: em(1920, 16)) {
    //padding: 0 0 rem(87) calc(25rem / 16 + (72 - 25) * ((100vw - 1024rem / 16) / (1920 - 1024)));
    //li {
    //  font-size: calc(16rem / 16 + (22 - 16) * ((100vw - 1024rem / 16) / (1920 - 1024)));
    //}
  }
  @media (max-width: em(1024, 16)) {
    li {
      font-size: rem(20);
    }
  }
}
</style>