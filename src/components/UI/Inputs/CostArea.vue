<script setup>
import {computed} from "vue";
import {useCatalogStore} from "@/store/CatalogStore";

const catalogStore = useCatalogStore();

const props = defineProps({
  placeholderFrom: {
    type: String,
    default: () => {
      return ""
    }
  },
  placeholderTo: {
    type: String,
    default: () => {
      return ""
    }
  },
  paramName: {
    type: String,
    default: () => {
      return ""
    }
  }
});

const fromValue = computed({
  get() {
    return catalogStore.filterParams.age.from;
  },
  set(value) {
    catalogStore.filterParams.age.from = value;
  }
});
const toValue = computed({
  get() {
    return catalogStore.filterParams.age.to;
  },
  set(value) {
    catalogStore.filterParams.age.to = value;
  }
});
</script>

<template>
  <div class="cost textMontserrat">
    <input
        v-model="fromValue"
        type="text"
        class="cost__item textMontserrat_light border_subBg"
        placeholder="от"
    >
    <input
        v-model="toValue"
        type="text"
        class="cost__item textMontserrat_light border_subBg"
        placeholder="до"
    >
  </div>
</template>

<style scoped lang="scss">
.cost{
  display: flex;
  gap: rem(20);
  &__item{
    height: rem(45);
    max-width: rem(120);
    text-align: center;
  }
}
</style>