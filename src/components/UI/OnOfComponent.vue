<script setup>
import {ref} from "vue";

const tumblerOn = ref(true);
const tumblerOff = ref(false);

const changeTumbler = () => {
  tumblerOn.value = !tumblerOn.value;
  tumblerOff.value = !tumblerOff.value;
}
</script>

<template>
  <div class="onOf">
    <div
        class="on element"
        :class="{
          'background_accent':tumblerOn,
          'background_gray':tumblerOff
        }"
        @click="changeTumbler"
    />
    <div
        class="of element"
        :class="{
          'background_accent':tumblerOff,
          'background_gray':tumblerOn
        }"
        @click="changeTumbler"
    />
  </div>
</template>

<style scoped lang="scss">
.onOf {
  display: flex;

  .element {
    border-radius: 5px;
    cursor: pointer;
    flex: 1 1 50%;
    width: rem(30);
    height: rem(25);
  }
}
</style>