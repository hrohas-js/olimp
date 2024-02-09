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
    switch (props.paramName) {
      case 'age':
        return catalogStore.filterParams.age.from;
      case 'height':
        return catalogStore.filterParams.height.from;
    }
  },
  set(value) {
    switch (props.paramName) {
      case 'age':
        catalogStore.filterParams.age.from = value;
        break;
      case 'height':
        catalogStore.filterParams.height.from = value;
        break;
    }
  }
});
const toValue = computed({
  get() {
    switch (props.paramName) {
      case 'age':
        return catalogStore.filterParams.age.to;
      case 'height':
        return catalogStore.filterParams.height.to;
    }
  },
  set(value) {
    switch (props.paramName) {
      case 'age':
        catalogStore.filterParams.age.to = value;
        break;
      case 'height':
        catalogStore.filterParams.height.to = value;
        break;
    }
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
    height: rem(30);
    max-width: rem(80);
    text-align: center;
  }
}
</style>