import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useArStore = defineStore('ar', () => {
  const isStart = ref(false);
  const isTracking = ref(false);
  const iframeRef = ref(null);

  return { iframeRef, isStart, isTracking };
});
