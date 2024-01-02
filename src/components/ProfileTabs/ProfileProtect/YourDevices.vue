<script setup>

</script>

<template>
  <section class="yourDevices textMontserrat">
    <header class="yourDevices__header">
      <time class="textMontserrat_medium" datetime="15:14">
        Волгоград, сегодня в 15:14
      </time>
      <p class="textMontserrat_light">
        это устройство
      </p>
      <p class="textMontserrat_light"></p>
    </header>
    <main class="yourDevices__main">
      <p class="textMontserrat_light">
        Windows, браузер Chrome, вход через Google
      </p>
    </main>
  </section>
</template>

<style scoped lang="scss">
.yourDevices {
  margin-top: rem(10);

  &:first-child {
    margin-top: 0;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    .textMontserrat_medium {
      font-size: rem(16);
    }
  }

  &__main {
    margin-top: rem(10);
    display: flex;
    align-items: center;
    gap: rem(25);

    .textMontserrat_light {
      font-size: rem(14);
    }
  }
}
</style>