<script setup>
import {computed} from "vue";
import {useMainStore} from "@/store/MainStore";

const mainStore = useMainStore();

const inputs = computed(() => mainStore.inputs);

const props = defineProps({
  inputType: {
    type:String,
    default(){
      return "text"
    }
  },
  placeholder: {
    type:String,
    default() {
      return ""
    }
  },
  inputMode: {
    type: String,
    default(){
      return "text"
    }
  },
  validateID: {
    type: String,
    default() {
      return ""
    }
  }
});

const inputValue = computed({
  get() {
    return inputs.value[props.validateID];
  },
  set(value) {
    mainStore.setInputs(props.validateID, value);
  }
});
</script>

<template>
    <input
        class="border_subBg textMontserrat"
        :type="props.inputType"
        :placeholder="props.placeholder"
        :inputmode="props.inputMode"
        v-model="inputValue"
    />
</template>

<style scoped lang="scss">
input{
  width: 100%;
  border-radius: 5px;
  padding: rem(8) rem(20);
}
</style>