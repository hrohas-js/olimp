<script setup>
import {useProfileStore} from "@/store/ProfileStore";

const profileStore = useProfileStore();

const showNavigation = () => {
  profileStore.navigationMobile = !profileStore.navigationMobile
}

const changeContent = (value) => {
  showNavigation();
  profileStore.content = value
}
</script>

<template>
  <div class="modal">
    <div class="profileNavigationMobile">
      <nav>
        <ul>
          <li
              @click="changeContent('myAnnouncements')"
          >
            <p class="textMontserrat_semiBold">
              Мои объявления
            </p>
          </li>
<!--          <li
              @click="changeContent('messages')"
          >
            <p class="textMontserrat_semiBold">
              Мои сообщения
            </p>
          </li>-->
          <li
              @click="changeContent('orders')"
          >
            <p class="textMontserrat_semiBold">
              Мои заказы
            </p>
          </li>
          <li
              @click="changeContent('wishList')"
          >
            <p class="textMontserrat_semiBold">
              Избранное
            </p>
          </li>
        </ul>
        <ul>
          <li
              @click="changeContent('notification')"
          >
            <p class="textMontserrat_semiBold">
              Уведомления
            </p>
          </li>
        </ul>
        <ul>
          <li
              @click="changeContent('cash')"
          >
            <p class="textMontserrat_semiBold">
              Кошелёк
            </p>
          </li>
          <li
              @click="changeContent('settings')"
          >
            <p class="textMontserrat_semiBold">
              Настройки профиля
            </p>
          </li>
          <li
              class="close"
              @click="showNavigation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="30" fill="#E9605A"/>
              <path
                  d="M16.8297 18.8295L28.7335 30.7333M28.7335 30.7333L40.6373 42.6371M28.7335 30.7333L41.563 17.9038M28.7335 30.7333L15.904 43.5628"
                  stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profileNavigationMobile {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ul {
    margin-top: rem(38);

    :first-child {
      margin-top: 0;
    }

    li {
      margin-top: rem(20);
    }

    .close {
      display: flex;
      justify-content: center;
    }
  }

  .textMontserrat_semiBold {
    font-size: rem(20);
  }
}
</style>