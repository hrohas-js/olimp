<script setup>
import SearchHeader from "@/components/HeaderComponents/SearchHeader";
import ProfileNavigator from "@/components/NavigationComponents/ProfileNavigation";
import ProfileInfo from "@/components/ProfileTabs/ProfileInfo";
import MyAnnouncements from "@/components/ProfileTabs/MyAnnouncements/MyAnnouncements";
import WishList from "@/components/ProfileTabs/WishList";
import Messages from "@/components/ProfileTabs/Massage/Messages";
import Notification from "@/components/ProfileTabs/Notification/NotificationMain";
import NotificationBody from "@/components/ProfileTabs/Notification/NotificationBody";
import ProfileProtect from "@/components/ProfileTabs/ProfileProtect/ProfileProtect";
import ChatBody from "@/components/ProfileTabs/Massage/Chat/ChatBody";
import MyOrders from "@/components/ProfileTabs/MyOrders";
import SettingTabs from "@/components/ProfileTabs/SettingsTab";
import WalletTabs from "@/components/ProfileTabs/WalletTabs";

import {computed, onMounted} from "vue";
import {useMainStore} from "@/store/MainStore";
import {useProfileStore} from "@/store/ProfileStore";

const mainStore = useMainStore();
const profileStore = useProfileStore();

const width = computed(() => mainStore.display_width);
const content = computed(() => profileStore.content);
const user = computed(() => profileStore.user);

const changeTitle = computed(() => {
  switch (content.value) {
    case "profileInfo":
      return "Личная информация"
    case "myAnnouncements":
      return "Мои объявления"
    case "wishList":
      return "Избранное"
    case "messages":
      return "Сообщения"
    case "notification":
      return "Уведомления"
    case "notificationBody":
      return "Уведомления"
    case "profileProtect":
      return "Защита профиля"
    case "orders":
      return "Мои заказы"
    case "settings":
      return "Настройки"
    case "wallet":
      return "Кошелек"
  }
});

onMounted(() => {
  profileStore.getLikes();
});

const showNavigation = () => {
  profileStore.navigationMobile = !profileStore.navigationMobile;
}

const uploadTrigger = () => {
  document.getElementById('avatar').click();
}

const uploadImage = () => {
  const inp = document.getElementById('avatar');
  if (inp.value && inp.files[0]) {
    const formData = new FormData();
    formData.append('photos', inp.files[0]);
    formData.append('id', user.value.id);
    profileStore.uploadAvatar(formData);
  }
}
</script>

<template>
  <section class="profilePage wrapper textMontserrat">
    <search-header/>
    <div class="profilePage__name">
      <h2 class="textMontserrat_medium">
        {{ changeTitle }}
      </h2>
      <div
          v-if="width <= 1024"
          class="burger"
      >
        <svg
            @click="showNavigation"
            xmlns="http://www.w3.org/2000/svg" width="40" height="22" viewBox="0 0 40 22" fill="none">
          <line y1="1" x2="40" y2="1" stroke="#2963A4" stroke-width="2"/>
          <line y1="11" x2="40" y2="11" stroke="#2963A4" stroke-width="2"/>
          <line y1="21" x2="40" y2="21" stroke="#2963A4" stroke-width="2"/>
        </svg>
      </div>
    </div>
    <article class="person">
      <div class="image">
        <img
            v-if="user.avatar_url.length > 0"
            :src="user.avatar_url"
            :alt="user.name"
        />
        <img
            v-else
            src="@/assets/svg/avatar.svg"
            alt="Аватар"
        />
        <div class="image-edit">
          <input
              type="file"
              style="display:none"
              accept="image/png, image/jpeg"
              id="avatar"
              @change="uploadImage"
          />
          <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg"
               width="14px" height="14px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve"
               @click="uploadTrigger"
          >
            <g>
              <path fill="#231F20" d="M60,10H49.656l-6.828-6.828C42.078,2.422,41.062,2,40,2H24c-1.062,0-2.078,0.422-2.828,1.172L14.344,10H4
                c-2.211,0-4,1.789-4,4v44c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V14C64,11.789,62.211,10,60,10z M32,50
                c-8.836,0-16-7.164-16-16s7.164-16,16-16s16,7.164,16,16S40.836,50,32,50z"/>
              <circle fill="#231F20" cx="32" cy="34" r="8"/>
            </g>
          </svg>
        </div>
      </div>
      <div class="text textMontserrat_semiBold">
        <h3 class="userName textMontserrat_semiBold">
          {{ user.name }}
        </h3>
        <!--        <p class="checkProfile color_green">-->
        <!--          Профиль подтвержден-->
        <!--        </p>-->
        <div class="rating">
          <div class="score ">
            <p class="Montserrat_semiBold">
              5,0
            </p>
            <div class="stars">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="25" viewBox="0 0 28 25" fill="none">
                <path
                    d="M9.53823 7.94355L12.905 1.60982C13.3372 0.796728 14.5859 0.796728 15.018 1.60982L18.3848 7.94355L25.914 8.96548C26.88 9.09659 27.265 10.1993 26.5657 10.8318L21.1185 15.7585L22.404 22.7186C22.5691 23.6124 21.5588 24.2939 20.6944 23.8718L13.9615 20.5839L7.22862 23.8718C6.36425 24.2939 5.35389 23.6124 5.51897 22.7186L6.80449 15.7585L1.35742 10.8318C0.658039 10.1993 1.04306 9.09659 2.00908 8.96548L9.53823 7.94355Z"
                    fill="#E9605A" stroke="#E9605A" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="25" viewBox="0 0 28 25" fill="none">
                <path
                    d="M9.53823 7.94355L12.905 1.60982C13.3372 0.796728 14.5859 0.796728 15.018 1.60982L18.3848 7.94355L25.914 8.96548C26.88 9.09659 27.265 10.1993 26.5657 10.8318L21.1185 15.7585L22.404 22.7186C22.5691 23.6124 21.5588 24.2939 20.6944 23.8718L13.9615 20.5839L7.22862 23.8718C6.36425 24.2939 5.35389 23.6124 5.51897 22.7186L6.80449 15.7585L1.35742 10.8318C0.658039 10.1993 1.04306 9.09659 2.00908 8.96548L9.53823 7.94355Z"
                    fill="#E9605A" stroke="#E9605A" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="25" viewBox="0 0 28 25" fill="none">
                <path
                    d="M9.53823 7.94355L12.905 1.60982C13.3372 0.796728 14.5859 0.796728 15.018 1.60982L18.3848 7.94355L25.914 8.96548C26.88 9.09659 27.265 10.1993 26.5657 10.8318L21.1185 15.7585L22.404 22.7186C22.5691 23.6124 21.5588 24.2939 20.6944 23.8718L13.9615 20.5839L7.22862 23.8718C6.36425 24.2939 5.35389 23.6124 5.51897 22.7186L6.80449 15.7585L1.35742 10.8318C0.658039 10.1993 1.04306 9.09659 2.00908 8.96548L9.53823 7.94355Z"
                    fill="#E9605A" stroke="#E9605A" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="25" viewBox="0 0 28 25" fill="none">
                <path
                    d="M9.53823 7.94355L12.905 1.60982C13.3372 0.796728 14.5859 0.796728 15.018 1.60982L18.3848 7.94355L25.914 8.96548C26.88 9.09659 27.265 10.1993 26.5657 10.8318L21.1185 15.7585L22.404 22.7186C22.5691 23.6124 21.5588 24.2939 20.6944 23.8718L13.9615 20.5839L7.22862 23.8718C6.36425 24.2939 5.35389 23.6124 5.51897 22.7186L6.80449 15.7585L1.35742 10.8318C0.658039 10.1993 1.04306 9.09659 2.00908 8.96548L9.53823 7.94355Z"
                    fill="#E9605A" stroke="#E9605A" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="25" viewBox="0 0 28 25" fill="none">
                <path
                    d="M9.53823 7.94355L12.905 1.60982C13.3372 0.796728 14.5859 0.796728 15.018 1.60982L18.3848 7.94355L25.914 8.96548C26.88 9.09659 27.265 10.1993 26.5657 10.8318L21.1185 15.7585L22.404 22.7186C22.5691 23.6124 21.5588 24.2939 20.6944 23.8718L13.9615 20.5839L7.22862 23.8718C6.36425 24.2939 5.35389 23.6124 5.51897 22.7186L6.80449 15.7585L1.35742 10.8318C0.658039 10.1993 1.04306 9.09659 2.00908 8.96548L9.53823 7.94355Z"
                    fill="#E9605A" stroke="#E9605A" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="revues">
            <p class="textMontserrat_medium">
              Отзывы (100)
            </p>
          </div>
        </div>
      </div>
    </article>
    <main class="profilePage__main">
      <profile-navigator v-if="width > 1024"/>
      <div class="content">
        <profile-info v-if="content === 'profileInfo'"/>
        <my-announcements v-if="content === 'myAnnouncements'"/>
        <wish-list v-if="content === 'wishList'"/>
        <messages v-if="content === 'messages'"/>
        <notification v-if="content === 'notification'"/>
        <notification-body v-if="content === 'notificationBody'"/>
        <profile-protect v-if="content === 'profileProtect'"/>
        <chat-body v-if="content === 'chat'"/>
        <my-orders v-if="content === 'orders'"/>
        <setting-tabs v-if="content === 'settings'"/>
        <wallet-tabs v-if="content === 'wallet'"/>
      </div>
    </main>
  </section>
</template>

<style scoped lang="scss">
.profilePage {
  &__name {
    margin-top: rem(40);

    .textMontserrat_medium {
      font-size: rem(26);
    }
  }

  .person {
    margin-top: rem(50);
    //padding-left: 26px;
    max-width: rem(530);
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .image {
      position: relative;
      width: rem(125);
      height: rem(125);
      overflow: hidden;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
      }

      &-edit {
        width: rem(28);
        height: rem(28);
        background: #FFFFFF;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 0;
        right: 0;
        cursor: pointer;
      }
    }

    .userName, .score {
      font-size: rem(16);
      //margin-bottom: rem(10);
    }

    .revues {
      margin-left: rem(5);

      .textMontserrat_medium {
        font-size: rem(16);
      }
    }

    .checkProfile {
      font-size: rem(16);
    }

    .rating {
      margin-top: rem(10);
      display: flex;
      align-items: center;
    }

    .score {
      //margin: rem(10) 0;
      display: flex;
      align-items: center;
      gap: rem(5);

      .textMontserrat_medium {
        font-size: rem(16);
      }

      .stars {
        display: flex;
        gap: rem(5);

        svg {
          width: rem(16);
        }
      }
    }

    .text {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      .textMontserrat_semiBold {
        font-size: rem(25);
      }
    }
  }

  &__main {
    margin-top: rem(26);
    display: flex;
    //justify-content: space-between;
    gap: rem(50);

    .profileNavigator {
      flex: 0 0 30%;
      max-width: rem(250);
    }

    .content {
      max-width: 60%;
      flex: 0 0 70%;

      .profileInfo {
        max-width: 60%;
      }
    }
  }

  @media (max-width: em(1920, 16)) {
    .person {
      //gap: calc(15rem / 16 + (20 - 15) * ((100vw - 390rem / 16) / (1920 - 390)));

      .checkProfile {
        font-size: calc(12rem / 16 + (16 - 12) * ((100vw - 390rem / 16) / (1920 - 390)));
      }

      .revues {
        .textMontserrat_medium {
          font-size: calc(14rem / 16 + (16 - 14) * ((100vw - 390rem / 16) / (1920 - 390)));
        }
      }
    }
    &__main {
      gap: calc(20rem / 16 + (50 - 20) * ((100vw - 1024rem / 16) / (1920 - 1024)));
    }
    &__name {
      .textMontserrat_medium {
        font-size: calc(20rem / 16 + (26 - 20) * ((100vw - 390rem / 16) / (1920 - 390)));
      }
    }
    .profilePage__name {
      display: flex;
      justify-content: space-between;
    }
  }

  @media (max-width: em(1530, 16)) {
    &__main {
      .content {
        max-width: 70%;
      }
    }
  }
  @media (max-width: em(1410, 16)) {
    &__main {
      .content {
        max-width: 75%;
      }
    }
  }
  @media (max-width: em(1300, 16)) {
    &__main {
      .content {
        flex-grow: 1;
        max-width: 100%;
      }
    }
  }
  @media (max-width: em(1024, 16)) {
    .content {
      max-width: 100%;
      flex: auto;
      .profileInfo {
        max-width: 100%;
      }
    }
  }
}
</style>