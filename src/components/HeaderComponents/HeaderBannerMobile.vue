<template>
  <div class="filterContainer">
    <div class="searchContainer">
      <router-link to="/">
        <img
            src="@/assets/logo.jpg"
            alt="logo"
        />
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.filterContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: rem(10) 0;
}
</style>