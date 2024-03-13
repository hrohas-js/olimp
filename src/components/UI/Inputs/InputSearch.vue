<script setup>
import {computed} from "vue";
import {useCatalogStore} from "@/store/CatalogStore";
import {validateField} from "@/plugins/validator";

const catalogStore = useCatalogStore();

const props = defineProps({
  placeholderText: {
    type: String,
    default() {
      return ""
    }
  },
  imageShow: {
    type: Boolean,
    default() {
      return true
    }
  },
  border: {
    type: Boolean,
    default() {
      return false
    }
  },
  centerPlaceholder: {
    type: Boolean,
    default() {
      return false
    }
  }
});

const searchValue = computed({
  get() {
    return catalogStore.search;
  },
  set(value) {
    catalogStore.search = validateField('search', value).message;
  }
});
</script>

<template>
  <div
      class="inputSearch"
      :class="{'border_subBg': props.border}"
  >
    <div
        v-if="props.imageShow"
        class="image"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M16 16L21 21" stroke="black" stroke-opacity="0.8" stroke-linecap="round" stroke-linejoin="round"/>
        <path
            d="M1 9.57143C1 14.3053 4.83756 18.1429 9.57143 18.1429C11.9424 18.1429 14.0887 17.1801 15.6404 15.6243C17.1869 14.0739 18.1429 11.9343 18.1429 9.57143C18.1429 4.83756 14.3053 1 9.57143 1C4.83756 1 1 4.83756 1 9.57143Z"
            stroke="black" stroke-opacity="0.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <input
        v-model="searchValue"
        class="textMontserrat textMontserrat_medium"
        :class="{'centerPlaceholder': props.centerPlaceholder}"
        type="text"
        inputmode="text"
        :placeholder="props.placeholderText"
    />
  </div>
</template>

<style scoped lang="scss">
.inputSearch {
  display: flex;
  align-items: center;
  gap: rem(8);

  input {
    width: 100%;
    font-size: 1rem;
  }
  .centerPlaceholder{
    &::placeholder{
      text-align: center;
    }
  }
}
.border_subBg{
  border-radius: 5px;
}
</style>