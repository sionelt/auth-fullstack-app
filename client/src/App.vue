<template>
  <div id="app" class="p-4">
    <router-view :key="$route.path" />
  </div>
</template>

<style>
#app {
  height: 100vh;
}
</style>
