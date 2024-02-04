<script setup>
import {ref} from "vue";

const focusFlag = ref(false);

const props = defineProps({
  modelValue: String,
  inputType: {
    type: String,
    default: "text"
  },
  inputPlaceholder: {
    type: String,
    default: ""
  }
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};

const activateFocusFlag = () => {
  focusFlag.value = true;
}

const deactivateFocusFlag = () => {
  focusFlag.value = false;
}
</script>

<template>
  <input
      :type="inputType"
      class="textMontserrat border color_black"
      :class="{
        'border_subBg': focusFlag,
        'border_gray': !focusFlag
      }"
      maxlength="5"
      :value="modelValue"
      :placeholder="props.inputPlaceholder"
      @input="updateValue"
      @focus="activateFocusFlag"
      @blur="deactivateFocusFlag"
  />
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
input {
  width: 100%;
  border-radius: 5px;
  padding: rem(8) rem(20);
}
</style>
