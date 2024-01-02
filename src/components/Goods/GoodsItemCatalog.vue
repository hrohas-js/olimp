<script setup>

</script>

<template>
  <article class="goodsItemCatalog textMontserrat">
    <div class="image">
      <img src="@/assets/png/GoodItem/goodsItemCatalog.png" alt="altText"/>
    </div>
    <div class="text">
      <header class="goodsItemCatalog__header">
        <h2 class="textMontserrat_medium color_colorSubBg">
          Аренда проф. фотоаппарат
        </h2>
        <div class="wishButton">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="13" viewBox="0 0 15 13" fill="none">
            <path d="M14 4.66932C14 5.6373 13.614 6.56705 12.9248 7.25482C11.3382 8.83847 9.79931 10.4899 8.15344 12.0161C7.77618 12.3609 7.17773 12.3483 6.81672 11.9879L2.07494 7.25482C0.641686 5.82414 0.641686 3.51449 2.07494 2.08383C3.52228 0.639122 5.88016 0.639122 7.32749 2.08383L7.49987 2.25587L7.67212 2.08394C8.36606 1.39089 9.31116 1 10.2984 1C11.2857 1 12.2308 1.39085 12.9248 2.08383C13.6141 2.77165 14 3.70135 14 4.66932Z" stroke="black" stroke-opacity="0.8" stroke-linejoin="round"/>
          </svg>
        </div>
      </header>
      <main class="goodsItemCatalog__main">
        <p class="textMontserrat_regular">
          Цена: 1000 руб./ час
        </p>
      </main>
      <footer class="goodsItemCatalog__footer color_blackLight">
        <p class="textMontserrat_light">
          Москва, м. курская
        </p>
        <time class="textMontserrat_light" datetime="Сегодня 19:50">
          Сегодня 19:50
        </time>
      </footer>
    </div>
  </article>
</template>

<style scoped lang="scss">
.goodsItemCatalog {
  padding-right: rem(10);
  margin-top: rem(20);
  cursor: pointer;
  display: flex;
  //align-items: center;
  gap: rem(10);
  border-radius: 5px;
  border: 1px solid rgba(41, 99, 164, 0.10);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.05);
  &:first-child{
    margin-top: 0;
  }
  .image{
    flex-shrink: 0;
  }
  .text {
    width: 100%;
    padding: rem(8) 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .textMontserrat_medium {
      font-size: 1rem;
    }
    .wishButton{
      display: flex;
    }
  }

  &__main {
    .textMontserrat_regular {
      font-size: rem(14);
    }
  }

  &__footer {
    .textMontserrat_light {
      font-size: rem(14);
    }
  }
  @media (max-width: em(1024,16)) {
    margin-top: calc(10rem / 16 + (20 - 10) * ((100vw - 390rem / 16) / (1024 - 390)));
  }
}
</style>