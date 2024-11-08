<script setup>
  import { storeToRefs } from 'pinia';
  import { useAudioStore } from '@/app/store/useAudioStore';
  import useAudioPlayer from '@/features/audio/hooks/useAudioPlayer';

  const { updateCurrentIndex } = useAudioPlayer();
  const { audio, currentTime, totalTime, percentage } = storeToRefs(
    useAudioStore(),
  );

  const handleProgressClick = async (event) => {
    console.log(event.x);
    if (!audio.value) return;

    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();

    const clickX = event.clientX - rect.left;
    const clickRatio = clickX / rect.width;

    currentTime.value = audio.value.currentTime = clickRatio * totalTime.value;

    updateCurrentIndex();
  };
</script>
<template>
  <div class="bar-container" @click="handleProgressClick">
    <div class="total-bar" />
    <div class="current-bar" :style="{ width: percentage + '%' }" />
  </div>
</template>
<style scoped>
  .bar-container {
    position: relative;
    width: 100%;
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 10px;
  }

  .total-bar {
    width: 100%;
    height: 100%;
    background-color: #e0e0e0;
    border-radius: 5px;
  }

  .current-bar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: #007bff;
    border-radius: 5px;
    transition: width 0.2s;
  }
</style>
