<script setup>
import {useCatalogStore} from "@/store/CatalogStore";

const catalogStore = useCatalogStore();

const props = defineProps({
  filterParam: {
    type: Array,
    default() {
      return []
    }
  },
  id: {
    type: Object,
    default() {
      return {}
    }
  }
});

const setCurrentFilter = (filID, filconID) => {
  catalogStore.filterID = filID;
  catalogStore.filterContentID = filconID;
  console.log(catalogStore.filterID)
  console.log(catalogStore.filterContentID)
}
</script>

<template>
  <ul class="textMontserrat textMontserrat_regular">
    <li
        v-for="item in props.filterParam"
        :key="item.id"
    >
      <input
          type="checkbox"
          :id="item.id"
          @click="setCurrentFilter(props.id, item)"
      />
      <label :for="item.id">
        {{ item.name }}
      </label>
    </li>
  </ul>
</template>

<style scoped lang="scss">
ul {
  li {
    display: flex;
    margin-bottom: rem(12);
    gap: rem(10);
    align-items: baseline;

    &:last-child {
      margin-bottom: 0;
    }

    input[type=chekbox] {
      width: rem(18);
      height: rem(18);
    }

  }

  .showMore, label, input[type=chekbox] {
    cursor: pointer;
  }
}
</style>