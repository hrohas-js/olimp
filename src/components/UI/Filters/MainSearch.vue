<script setup>
import InputSearch from "@/components/UI/Inputs/InputSearch";
import SelectOptions from "@/components/UI/Filters/SelectOptions";
import MainButton from "@/components/UI/Button/MainButton";
import {computed} from "vue";
import {useMainStore} from "@/store/MainStore";
const mainStore = useMainStore();

const width = computed(() => mainStore.display_width);
</script>

<template>
  <div
      v-if="width > 768"
      class="mainSearch"
  >
    <div
        class="mainFilter border_subBg search"
    >
      <input-search/>
    </div>
    <div class="mainFilter border_subBg button">
      <!--        <select-options/>-->
      <div class="actions">
        <!--      <div class="categoriesFilter">-->
        <!--        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="16" viewBox="0 0 27 16" fill="none">-->
        <!--          <path d="M1 1H25.9997" stroke="black" stroke-opacity="0.8" stroke-linecap="round"/>-->
        <!--          <path d="M10.0142 7.94437H26.0001" stroke="black" stroke-opacity="0.8" stroke-linecap="round"/>-->
        <!--          <path d="M1 7.94437H5.15273" stroke="black" stroke-opacity="0.8" stroke-linecap="round"/>-->
        <!--          <path d="M1 14.8887H25.9997" stroke="black" stroke-opacity="0.8" stroke-linecap="round"/>-->
        <!--        </svg>-->
        <!--      </div>-->
        <main-button
            :button-text="'Поиск'"
            color="blue"
        />
      </div>
    </div>
  </div>
  <div
      v-if="width <= 768"
      class="mainFilter border_subBg"
  >
    <input-search
        :placeholder-text="'Поиск'"
    />
    <!--    <div class="categoriesFilter">-->
    <!--      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="16" viewBox="0 0 27 16" fill="none">-->
    <!--        <path d="M1 1H25.9997" stroke="black" stroke-opacity="0.8" stroke-linecap="round"/>-->
    <!--        <path d="M10.0142 7.94437H26.0001" stroke="black" stroke-opacity="0.8" stroke-linecap="round"/>-->
    <!--        <path d="M1 7.94437H5.15273" stroke="black" stroke-opacity="0.8" stroke-linecap="round"/>-->
    <!--        <path d="M1 14.8887H25.9997" stroke="black" stroke-opacity="0.8" stroke-linecap="round"/>-->
    <!--      </svg>-->
    <!--    </div>-->
  </div>
</template>

<style scoped lang="scss">
.mainSearch {
  display: flex;
  max-width: rem(753);
}

.mainFilter {

  border-radius: 10px;
  padding: rem(2) rem(10);
  display: flex;
  justify-content: space-between;
  gap: rem(10);

  &:first-child {
    flex: 1 1 75%;
    border-top-right-radius: unset;
    border-bottom-right-radius: unset;
    border-right: 0;
  }

  &:last-child {
    flex: 1 1 27%;
    display: flex;
    justify-content: flex-end;
    border-top-left-radius: unset;
    border-bottom-left-radius: unset;
    padding: 0 0 0 rem(12);
    border-left: 0;
    justify-content: flex-end;
  }

  .inputSearch {
    width: 100%;
    max-width: rem(500);
  }


  .actions {
    min-width: rem(135);
    //display: flex;
    //align-items: center;
    //justify-content: flex-end;
    //gap: rem(45);


    .button_mainButton {
      max-width: rem(135);
    }
  }

  .categoriesFilter {
    cursor: pointer;
    display: flex;
  }

  .border_subBg {
    border-width: rem(2);
    border-radius: rem(10);
  }

  @media (max-width: em(768, 16)) {
    .mainFilter {
      width: 100%;

    }
    .border_subBg {
      border-radius: 0;
    }
    &:first-child {
      padding: rem(7) 3%;
      border-top-left-radius: unset;
      border-bottom-left-radius: unset;
      border: 1px solid $color_subBg;
    }
    &:last-child{
      justify-content: flex-start;
    }
  }
}

</style>