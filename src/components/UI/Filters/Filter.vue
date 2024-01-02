<script setup>
import CostArea from "@/components/UI/Inputs/CostArea";
import FilterItem from "@/components/UI/Filters/filter-item";
import {computed} from "vue";
import {useCatalogStore} from "@/store/CatalogStore";

const catalogStore = useCatalogStore();

const filters = computed(() => catalogStore.filters)
</script>

<template>
  <nav class="filter background_elements">
<!--    <div
        v-if="$route.params.category === 'market'"
        class="fraction"
    >
      <p class="textMontserrat textMontserrat_medium">
        Цена, руб
      </p>
      <div class="content cost">
        <cost-area
            placeholder-from="от 100"
            placeholder-to="до 50000"
        />
      </div>
    </div>-->
    <div
        v-for="filter in filters"
        :key="filter.id"
        class="fraction"
    >
      <p
          v-if="filter.name.length > 0"
          class="textMontserrat textMontserrat_medium"
      >
        {{ filter.name }}
      </p>
      <div class="content">
        <filter-item
            :id="filter.id"
            :filter-param="filter.content"
        />
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.filter {
  padding: rem(40) rem(20) rem(44) 0;

  .fraction {
    margin-top: rem(40);

    &:first-child {
      margin-top: 0;
    }

    .content {
      padding-left: rem(10);
      margin-top: rem(20);
    }
  }
}
</style>