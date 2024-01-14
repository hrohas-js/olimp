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
  },
  filterType: {
    type: String,
    default() {
      return ""
    }
  }
});

const setCurrentFilter = (filID, filconID) => {
  if (props.filterType === 'sex') {
    catalogStore.filterParams.selectedSex = filconID;
  } else if (props.filterType === 'type') {
    catalogStore.filterParams.selectedType = filconID;
  } else {
    catalogStore.filterID = filID;
    catalogStore.filterContentID = filconID;
  }
}
</script>

<template>
  <ul class="textMontserrat textMontserrat_regular">
    <li
        v-for="item in props.filterParam"
        :key="item.id"
    >
      <input
          type="radio"
          :id="item.id"
          :name="props.id.id"
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