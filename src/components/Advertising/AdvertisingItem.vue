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
<!--      <h2 class="textMontserrat textMontserrat_medium">-->
<!--        Рекламное объявление-->
<!--      </h2>-->
      <img src="@/assets/png/Advertising/advertisingItem.jpg" alt="Реклама"/>
    </main>
  </article>
</template>

<style scoped lang="scss">
.advertisingItem{
  position: sticky;
  top: rem(15);
  //background: #F6CB32;
  height: rem(450);
  &__main{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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