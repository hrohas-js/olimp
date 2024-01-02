<script setup>
import {useMainStore} from "@/store/MainStore";
import {computed} from "vue";

const mainStore = useMainStore();

const width = computed(() => mainStore.display_width);
</script>

<template>
  <section
      class="saleInformation textMontserrat"
      :class="{'fraction':width > 1024}"
  >
    <main class="saleInformation__main">
      <div class="information">
        <header class="saleInformation__header">
          <h3 class="textMontserrat color_subBg">Ксения Лодочкина</h3>
        </header>
        <div class="score">
          <p class="textMontserrat_regular">
            5,0 </p>
          <div class="stars">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 28 25" fill="none"><path data-v-45ebcf8e="" d="M9.53823 7.94355L12.905 1.60982C13.3372 0.796728 14.5859 0.796728 15.018 1.60982L18.3848 7.94355L25.914 8.96548C26.88 9.09659 27.265 10.1993 26.5657 10.8318L21.1185 15.7585L22.404 22.7186C22.5691 23.6124 21.5588 24.2939 20.6944 23.8718L13.9615 20.5839L7.22862 23.8718C6.36425 24.2939 5.35389 23.6124 5.51897 22.7186L6.80449 15.7585L1.35742 10.8318C0.658039 10.1993 1.04306 9.09659 2.00908 8.96548L9.53823 7.94355Z" fill="#E9605A" stroke="#E9605A" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            <svg data-v-45ebcf8e="" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 28 25" fill="none">
              <path data-v-45ebcf8e="" d="M9.53823 7.94355L12.905 1.60982C13.3372 0.796728 14.5859 0.796728 15.018 1.60982L18.3848 7.94355L25.914 8.96548C26.88 9.09659 27.265 10.1993 26.5657 10.8318L21.1185 15.7585L22.404 22.7186C22.5691 23.6124 21.5588 24.2939 20.6944 23.8718L13.9615 20.5839L7.22862 23.8718C6.36425 24.2939 5.35389 23.6124 5.51897 22.7186L6.80449 15.7585L1.35742 10.8318C0.658039 10.1993 1.04306 9.09659 2.00908 8.96548L9.53823 7.94355Z" fill="#E9605A" stroke="#E9605A" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <svg data-v-45ebcf8e="" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 28 25" fill="none">
              <path data-v-45ebcf8e="" d="M9.53823 7.94355L12.905 1.60982C13.3372 0.796728 14.5859 0.796728 15.018 1.60982L18.3848 7.94355L25.914 8.96548C26.88 9.09659 27.265 10.1993 26.5657 10.8318L21.1185 15.7585L22.404 22.7186C22.5691 23.6124 21.5588 24.2939 20.6944 23.8718L13.9615 20.5839L7.22862 23.8718C6.36425 24.2939 5.35389 23.6124 5.51897 22.7186L6.80449 15.7585L1.35742 10.8318C0.658039 10.1993 1.04306 9.09659 2.00908 8.96548L9.53823 7.94355Z" fill="#E9605A" stroke="#E9605A" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <svg data-v-45ebcf8e="" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 28 25" fill="none"><path data-v-45ebcf8e="" d="M9.53823 7.94355L12.905 1.60982C13.3372 0.796728 14.5859 0.796728 15.018 1.60982L18.3848 7.94355L25.914 8.96548C26.88 9.09659 27.265 10.1993 26.5657 10.8318L21.1185 15.7585L22.404 22.7186C22.5691 23.6124 21.5588 24.2939 20.6944 23.8718L13.9615 20.5839L7.22862 23.8718C6.36425 24.2939 5.35389 23.6124 5.51897 22.7186L6.80449 15.7585L1.35742 10.8318C0.658039 10.1993 1.04306 9.09659 2.00908 8.96548L9.53823 7.94355Z" fill="#E9605A" stroke="#E9605A" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <svg data-v-45ebcf8e="" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 28 25" fill="none"><path data-v-45ebcf8e="" d="M9.53823 7.94355L12.905 1.60982C13.3372 0.796728 14.5859 0.796728 15.018 1.60982L18.3848 7.94355L25.914 8.96548C26.88 9.09659 27.265 10.1993 26.5657 10.8318L21.1185 15.7585L22.404 22.7186C22.5691 23.6124 21.5588 24.2939 20.6944 23.8718L13.9615 20.5839L7.22862 23.8718C6.36425 24.2939 5.35389 23.6124 5.51897 22.7186L6.80449 15.7585L1.35742 10.8318C0.658039 10.1993 1.04306 9.09659 2.00908 8.96548L9.53823 7.94355Z" fill="#E9605A" stroke="#E9605A" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </div>
          <p class="textMontserrat_regular color_colorSubBg">
            3 отзыва
          </p>
        </div>
        <p class="textMontserrat_regular contactPerson">Частное лицо</p>
      </div>
      <div class="circle background_subBg color_colorBg">
        К
      </div>
    </main>
  </section>
</template>

<style scoped lang="scss">
.saleInformation{
  &__header{
    font-size:rem(15);
  }
  &__main{
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    gap: 1rem;
    .information{
      .score{
        margin-top: rem(10);
        display:flex;
        justify-content: space-between;
        gap: rem(8);
        font-size: rem(12);
        .color_subBg{
          cursor: pointer;
        }
      }
      .contactPerson{
        margin-top: rem(5);
      }
    }
    .circle{
      width: rem(60);
      height: rem(60);
      border-radius: 50%;
      display:flex;
      justify-content: center;
      align-items: center;
    }
  }
}

</style>