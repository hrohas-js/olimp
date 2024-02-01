<script setup>

</script>

<template>
  <article class="advertisingItem">
   <header class="advertisingItem__header">
     <h3 class="textMontserrat textMontserrat_light">
       Реклама
     </h3>
   </header>
    <main class="advertisingItem__main">
      <img src="@/assets/png/Advertising/adv1.jpg" alt="Реклама"/>
      <img src="@/assets/png/Advertising/adv2.jpg" alt="Реклама"/>
    </main>
  </article>
</template>

<style scoped lang="scss">
.advertisingItem{
  position: sticky;
  top: rem(15);
  &__main{
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: rem(10);
    text-align: center;
    .textMontserrat_medium{
      font-size: 2rem;
    }
    img{
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
  @media (max-width: em(1920,16)) {
    &__main{
      .textMontserrat_medium{
        font-size: calc(20rem / 16 + (32 - 20) * ((100vw - 1024rem / 16) / (1920 - 1024)))
      }
    }
  }
}
</style>