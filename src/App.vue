<script setup>
  import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView v-slot="{ Component /**route*/ }">
    <Suspense>
      <template #fallback>Loading...</template>

      <template v-if="Component">
        <div v-if="isBlock" class="block" />

        <Transition v-else name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </template>
    </Suspense>
  </RouterView>
</template>

<style scoped>
  img {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
  }
</style>
