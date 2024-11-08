<script setup>
  import { storeToRefs } from 'pinia';
  import { useAudioStore } from '@/app/store/useAudioStore';
  import useAudioPlayer from '@/features/audio/hooks/useAudioPlayer';

  const { clearAudio } = useAudioPlayer();
  const { isPlay, audio } = storeToRefs(useAudioStore());

  const handlePlayClick = () => {
    isPlay.value = true;
    if (audio.value) {
      audio.value.play();
    }
  };

  const handlePauseClick = () => {
    isPlay.value = false;
    if (audio.value) {
      audio.value.pause();
    }
  };

  const handleStopClick = () => {
    if (audio.value) {
      audio.value.pause();
      clearAudio();
    }
  };
</script>

<template>
  <div class="audio-button-container">
    <button
      class="audio-button play-button"
      v-show="!isPlay"
      @click="handlePlayClick"
    >
      Play
    </button>
    <button
      class="audio-button pause-button"
      v-show="isPlay"
      @click="handlePauseClick"
    >
      Pause
    </button>
    <button class="audio-button stop-button" @click="handleStopClick">
      Stop
    </button>
  </div>
</template>
<style scoped>
  .audio-button-container {
    position: fixed;
    right: 0;
    bottom: 0;
  }
  .audio-button {
    margin-right: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  .audio-button:hover {
    background-color: #0056b3;
  }
</style>
