<script setup>
import {ref} from "vue";

const chooseFlag = ref('');

const props = defineProps({
  chooses: {
    type: Array,
    default: () => ([])
  }
});

const changeChooseFlag = (flag) => {
  chooseFlag.value = flag;
}
</script>

<template>
  <div class="choose-box border border_gray">
    <div
        v-for="item in props.chooses"
        :key="item.id"
        class="choose-box__item"
        :class="{'active': chooseFlag === item.name}"
        @click="changeChooseFlag(item.name)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.border {
  border-width: rem(2);
  &_gray {
    border-color: $color_gray;
  }
}

.choose-box {
  display: flex;
  border-radius: 5px;
  width: fit-content;

  &__item {
    padding: rem(5);
    cursor: pointer;

    &:first-child {
      border-right: 2px solid $color_gray;
    }
  }
}

.active {
  background-color: $color_blueLikeAvt;
}
</style>