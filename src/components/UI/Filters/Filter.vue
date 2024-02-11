<script setup>
import CostArea from "@/components/UI/Inputs/CostArea";
import FilterItem from "@/components/UI/Filters/filter-item";
import {computed, onMounted} from "vue";
import {useCatalogStore} from "@/store/CatalogStore";
import {useMainStore} from "@/store/MainStore";

const catalogStore = useCatalogStore();
const mainStore = useMainStore();

const width = computed(() => mainStore.display_width);
const filters = computed(() => catalogStore.filters);
const actorFlag = computed(() => catalogStore.actorFlag);
const modelFlag = computed(() => catalogStore.modelFlag);
const musicianFlag = computed(() => catalogStore.musicianFlag);
const sex = computed(() => catalogStore.filterParams.sex);
const type = computed(() => catalogStore.filterParams.type);
const instruments = computed(() => catalogStore.filterParams.instruments);

const emptyAge = computed(() => {
  return catalogStore.filterParams.age.from === '' && catalogStore.filterParams.age.to === '';
});
const emptyHeight = computed(() => {
  return catalogStore.filterParams.height.from === '' && catalogStore.filterParams.height.to === '';
});

onMounted(() => {
  document.addEventListener('click', (e) => {
    mainStore.closeModal(e.target);
  })
});

const closeModal = () => {
  catalogStore.showModalFilters = false
}

const resetFilterRange = (name) => {
  catalogStore.filterParams[name].from = '';
  catalogStore.filterParams[name].to = '';
}
</script>

<template>
  <nav class="filter background_elements">
    <div
        v-if="width <= 768"
        class="close"
        @click="closeModal"
    >
      <svg width="34" height="34" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M22.6066 21.3934C22.2161 21.0029 21.5829 21.0029 21.1924 21.3934C20.8019 21.7839 20.8019 22.4171 21.1924 22.8076L22.6066 21.3934ZM40.9914 42.6066C41.3819 42.9971 42.0151 42.9971 42.4056 42.6066C42.7961 42.2161 42.7961 41.5829 42.4056 41.1924L40.9914 42.6066ZM21.1924 41.1924C20.8019 41.5829 20.8019 42.2161 21.1924 42.6066C21.5829 42.9971 22.2161 42.9971 22.6066 42.6066L21.1924 41.1924ZM42.4056 22.8076C42.7961 22.4171 42.7961 21.7839 42.4056 21.3934C42.0151 21.0029 41.3819 21.0029 40.9914 21.3934L42.4056 22.8076ZM21.1924 22.8076L40.9914 42.6066L42.4056 41.1924L22.6066 21.3934L21.1924 22.8076ZM22.6066 42.6066L42.4056 22.8076L40.9914 21.3934L21.1924 41.1924L22.6066 42.6066Z"
            fill="black"/>
      </svg>
    </div>
    <div
        v-for="filter in filters"
        :key="filter.id"
        class="fraction"
    >
      <div v-if="filter.name !== 'Музыкальные инструменты'">
        <p
            v-if="filter.name.length > 0"
            class="textMontserrat textMontserrat_semiBold"
            v-html="filter.name"
        />
        <div class="content">
          <filter-item
              :id="filter"
              :filter-param="filter.content"
          />
        </div>
      </div>
    </div>
    <div
        v-if="modelFlag"
        class="fraction"
    >
      <div>
        <p
            class="textMontserrat textMontserrat_semiBold"
            v-html="sex.name"
        />
        <div class="content">
          <filter-item
              filter-type="sex"
              :id="sex"
              :filter-param="sex.content"
          />
        </div>
      </div>
    </div>
    <div
        v-if="actorFlag || modelFlag"
        class="fraction"
    >
      <div>
        <p
            class="textMontserrat textMontserrat_semiBold"
            v-html="type.name"
        />
        <div class="content">
          <filter-item
              filter-type="type"
              :id="type"
              :filter-param="type.content"
          />
        </div>
      </div>
    </div>
    <div
        v-if="musicianFlag"
        class="fraction"
    >
      <div>
        <p
            class="textMontserrat textMontserrat_semiBold"
            v-html="instruments.name"
        />
        <div class="content">
          <filter-item
              filter-type="instruments"
              :id="instruments"
              :filter-param="instruments.content"
          />
        </div>
      </div>
    </div>
    <div
        v-if="actorFlag || modelFlag"
        class="fraction"
    >
      <p class="textMontserrat textMontserrat_medium">
        Возраст
      </p>
      <div class="content cost">
        <cost-area
            placeholder-from="от"
            placeholder-to="до"
            param-name="age"
        />
        <div
            v-if="!emptyAge"
            class="textMontserrat textMontserrat_medium"
            @click="resetFilterRange('age')"
        >
          сбросить
        </div>
      </div>
    </div>
    <div
        v-if="actorFlag || modelFlag"
        class="fraction"
    >
      <p class="textMontserrat textMontserrat_medium">
        Рост
      </p>
      <div class="content cost">
        <cost-area
            placeholder-from="от"
            placeholder-to="до"
            param-name="height"
        />
        <div
            v-if="!emptyHeight"
            class="textMontserrat textMontserrat_medium"
            @click="resetFilterRange('height')"
        >
          сбросить
        </div>
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

      &.cost > .textMontserrat_medium {
        text-align: right;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}

@media (max-width: em(768, 16)) {
  .filter {
    padding: rem(5);
  }
  .close {
    position: absolute;
    top: 10px;
    right: 20px;
  }
}
</style>