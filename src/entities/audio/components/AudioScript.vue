<script setup>
  import { storeToRefs } from 'pinia';
  import { useAudioStore } from '@/app/store/useAudioStore';
  import useAudioPlayer from '@/features/audio/hooks/useAudioPlayer';
  import { computed } from 'vue';

  const { lyrics } = useAudioPlayer();
  const { currentIndex } = storeToRefs(useAudioStore());

  const displayedLyrics = computed(() => {
    return [
      { text: lyrics[currentIndex.value - 1]?.script || '', class: '' },
      {
        text: lyrics[currentIndex.value]?.script || '',
        class: 'script-active',
      },
      { text: lyrics[currentIndex.value + 1]?.script || '', class: '' },
    ];
  });
</script>

<template>
  <div class="script-container">
    <transition-group name="slide-docent" tag="div">
      <p
        v-for="(lyric, index) in displayedLyrics"
        :key="index + currentIndex"
        :class="['script', lyric.class]"
      >
        {{ lyric.text }}
      </p>
    </transition-group>
  </div>
</template>

<style scoped>
  .script-container {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    text-align: center;
    height: 150px;
    overflow: hidden;
  }

  .script {
    color: grey;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 10px;
    transition: transform 0.3s ease, color 0.3s ease;
  }

  .script-active {
    color: black;
    font-weight: bold;
    transform: scale(1.2);
    z-index: 2;
  }
</style>
