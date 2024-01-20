<template>
  <div class="filterContainer">
    <div class="geo">
      <svg width="20px" height="22px" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="7.999" cy="6.8" stroke="#000" stroke-width="1.2" r="1.8"></circle>
        <path
            d="m8.002 14.998-.452.395a.6.6 0 0 0 .903 0l-.451-.395Zm-4.196-4.8-.466.378.014.017.452-.395Zm8.396 0 .451.396a.587.587 0 0 0 .014-.018l-.465-.378Zm-9-3.4a4.8 4.8 0 0 1 4.8-4.8v-1.2a6 6 0 0 0-6 6h1.2Zm4.8-4.8a4.8 4.8 0 0 1 4.8 4.8h1.2a6 6 0 0 0-6-6v1.2Zm.451 12.606-4.195-4.8-.904.79 4.196 4.8.903-.79Zm3.297-4.8-4.2 4.8.903.79 4.2-4.8-.903-.79Zm1.052-3.006a4.774 4.774 0 0 1-1.066 3.022l.931.756a5.974 5.974 0 0 0 1.335-3.778h-1.2ZM4.272 9.82a4.778 4.778 0 0 1-1.07-3.022h-1.2c0 1.432.501 2.747 1.338 3.778l.932-.756Z"
            fill="#000">
        </path>
      </svg>
    </div>
    <div class="searchContainer">
      <router-link to="/">
        <img
            src="@/assets/logo.jpg"
            alt="logo"
        />
      </router-link>
    </div>
    <div class="notifications">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
        <path
            d="M16.0026 7.40112C16.0026 5.70343 15.3704 4.07529 14.2449 2.87485C13.1195 1.6744 11.5932 1 10.0016 1C8.41 1 6.88361 1.6744 5.75819 2.87485C4.63278 4.07529 4.00052 5.70343 4.00052 7.40112C4.00052 14.8691 1 17.0028 1 17.0028H19.0031C19.0031 17.0028 16.0026 14.8691 16.0026 7.40112Z"
            stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        <path
            d="M11.7318 20.0034C11.556 20.3066 11.3037 20.5582 10.9999 20.733C10.6963 20.908 10.352 21.0001 10.0015 21.0001C9.65108 21.0001 9.30682 20.908 9.00317 20.733C8.69951 20.5582 8.44707 20.3066 8.27124 20.0034"
            stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
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