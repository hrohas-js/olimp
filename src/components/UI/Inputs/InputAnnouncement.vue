<script setup>
const props = defineProps({
  modelValue: String,
  inputType: {
    type: String,
    default: "text"
  }
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<template>
  <input
      :type="inputType"
      class="border_subBg textMontserrat"
      :value="modelValue"
      @input="updateValue"
  />
</template>

<style scoped lang="scss">
input {
  width: 100%;
  border-radius: 5px;
  padding: rem(8) rem(20);
}
</style>
