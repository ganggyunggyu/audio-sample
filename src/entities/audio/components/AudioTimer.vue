<script setup>
  import { storeToRefs } from 'pinia';
  import { useAudioStore } from '@/app/store/useAudioStore';
  import { getFormatTime } from '@/shared/lib/getFormatTime';

  const { currentTime, totalTime } = storeToRefs(useAudioStore());
</script>
<template>
  <div class="time-container">
    <p class="current-time">{{ getFormatTime({ second: currentTime }) }}</p>
    <p class="total-time">{{ getFormatTime({ second: totalTime }) }}</p>
  </div>
</template>
<style scoped>
  .time-container {
    width: 100vw;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }
</style>
