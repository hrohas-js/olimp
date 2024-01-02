<script setup>

</script>

<template>
  <section class="walletTabs">
    <header class="profileTab__header">
      <h2 class="textMontserrat_medium">
        Кошелек
      </h2>
    </header>
    <main class="walletTabs__main">
      <div class="balance">
        <p class="textMontserrat_regular">
          Баланс
        </p>
        <p class="textMontserrat_semiBold">
          0₽
        </p>
      </div>
      <div class="history">
        <p class="background_gray textMontserrat_regular">
          Пополнение
        </p>
        <p class="color_colorSubBg textMontserrat_regular">
          История операций
        </p>
      </div>
    </main>
  </section>
</template>

<style scoped lang="scss">
.walletTabs{
  &__main{
    margin-top: rem(20);
  }
  .balance{
    .textMontserrat_semiBold{
      margin-top: rem(5);
      font-size: rem(24);
    }
  }
  .history{
    margin-top: rem(10);
    display: flex;
    gap: rem(10);
    align-items: center;
    .background_gray{
      padding: rem(5);
      border-radius: 5px;
    }
    p{
      cursor:pointer;
    }
  }
}
</style>