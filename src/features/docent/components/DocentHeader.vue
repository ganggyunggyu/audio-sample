<script setup>
  import { useArStore } from '@/app/store/useArStore';
  import { storeToRefs } from 'pinia';

  const { isStart } = storeToRefs(useArStore());

  const handleHomeClick = () => {
    router.push('/');
  };
</script>
<template>
  <header v-if="isStart" class="docent-header">
    <h2 @click="handleHomeClick">Home</h2>
    <h2>{{ displayContent.title }}</h2>
  </header>
</template>
<style scoped>
  .docent-header {
  }
</style>
