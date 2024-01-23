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

const setCurrentFilter = (e, filID, filconID) => {
  if (props.filterType === 'sex') {
    if (e.target.checked) {
      catalogStore.filterParams.selectedSex.push(filconID);
    } else {
      catalogStore.filterParams.selectedSex = [...catalogStore.filterParams.selectedSex].filter(elem => elem.id !== filconID.id);
    }
  } else if (props.filterType === 'type') {
    if (e.target.checked) {
      catalogStore.filterParams.selectedType.push(filconID);
    } else {
      catalogStore.filterParams.selectedType = [...catalogStore.filterParams.selectedType].filter(elem => elem.id !== filconID.id);
    }
  } else {
    if (e.target.checked) {
      catalogStore.filterID.push(filID);
      catalogStore.filterContentID.push(filconID);
    } else {
      let found = false;
      catalogStore.filterID = [...catalogStore.filterID].filter(elem => {
        if (elem.id === filID.id && !found) {
          found = true;
          return false;
        }
        return true;
      });
      catalogStore.filterContentID = [...catalogStore.filterContentID].filter(elem => elem.id !== filconID.id);
    }
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
          type="checkbox"
          :id="item.id"
          :name="props.id.id"
          @change="setCurrentFilter($event, props.id, item)"
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