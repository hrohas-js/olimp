<script setup>

</script>

<template>
  <div class="page-404">
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
    <h1>Страница не найдена</h1>
    <p>Извините, мы не можем найти страницу, которую вы ищете.</p>
    <router-link to="/">Вернуться на главную</router-link>
  </div>
</template>

<style scoped>
.page-404 {
  text-align: center;
  padding: 50px;
}

.icon {
  width: 50px;
  height: 50px;
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 15px;
}

p {
  margin-bottom: 20px;
}
</style>
