<script setup>
import {ref} from "vue";

const focusFlag = ref(false);

const props = defineProps({
  options: {
    type: Array,
    default: () => ([])
  }
});

const activateFocusFlag = () => {
  focusFlag.value = true;
}

const deactivateFocusFlag = () => {
  focusFlag.value = false;
}
</script>

<template>
  <select
      class="textMontserrat border color_black"
      :class="{
        'border_subBg': focusFlag,
        'border_gray': !focusFlag
      }"
      @focus="activateFocusFlag"
      @blur="deactivateFocusFlag"
  >
    <option
        v-for="paramVariant in props.options"
        :key="paramVariant.id"
        :value="paramVariant.name"
    >
      {{ paramVariant.name }}
    </option>
  </select>
</template>

<style scoped lang="scss">
.border {
  border-width: rem(2);
  &_gray {
    border-color: $color_gray;
  }
  &_subBg {
    box-shadow: 0 2px 4px $color_blueLikeAvt;
  }
}
select {
  width: 30%;
  border-radius: 5px;
  padding: rem(8) rem(20);
}
</style>