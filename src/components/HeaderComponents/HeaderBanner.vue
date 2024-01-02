<script setup>
import MainButton from "@/components/UI/Button/MainButton";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/store/AuthStore";
import {useMainStore} from "@/store/MainStore";
import {computed} from "vue";

const router = useRouter();
const authStore = useAuthStore();
const mainStore = useMainStore();

const isAuth = computed(() => authStore.jwt !== null);

const create = () => {
  if (isAuth.value) {
    router.push('/create');
  } else {
    mainStore.popup = 'auth';
  }
}
</script>

<template>
  <section class="headerBanner">
    <div class="wrapper">
      <header class="headerBanner__header">
        <div class="logo-bebas">
          <img
              src="@/assets/logo.jpg"
              alt="logo"
          />
        </div>
      </header>
      <footer class="headerBanner__footer">
        <main-button
            :button-text="'Разместить объявление'"
            @click="create"
        />
      </footer>
    </div>
  </section>
</template>

<style scoped lang="scss">
.headerBanner {
  height: rem(200);
  background: url("@/assets/png/Header/headerBanner.png");
  padding: rem(19) 0;

  .wrapper {
    height: 100%;
    position: relative;
  }
  &__header{
    display: flex;
    justify-content: center;
    align-items: center;
    .logo-bebas {
      position: absolute;
      bottom: 0;
      left: rem(30);
    }

  }
  &__footer {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    .button_mainButton {
      max-width: rem(220);
    }
  }
}
</style>