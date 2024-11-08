import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useAudioStore = defineStore('audio', () => {
  const audio = ref(null);
  const currentTime = ref(0);
  const totalTime = ref(0);
  const currentIndex = ref(0);
  const isPlay = ref(false);

  const percentage = computed(() => {
    return totalTime.value > 0
      ? (currentTime.value / totalTime.value) * 100
      : 0;
  });

  return {
    audio,
    currentTime,
    totalTime,
    currentIndex,
    isPlay,
    percentage,
  };
});
