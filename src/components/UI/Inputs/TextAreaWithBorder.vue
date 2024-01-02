<script setup>
const props = defineProps({
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<template>
  <textarea
      cols="30"
      rows="10"
      class="border_subBg textMontserrat"
      :value="modelValue"
      @input="updateValue"
  />
</template>

<style scoped lang="scss">
textarea{
  border-radius: 5px;
  padding: rem(8) rem(20);
}
textarea::-webkit-resizer {
  resize: none;
}
</style>