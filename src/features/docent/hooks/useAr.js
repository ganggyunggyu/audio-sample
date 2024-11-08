import { nextTick, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useArStore } from '@/app/store/useArStore';
import { useAudioStore } from '@/app/store/useAudioStore';

const useAr = () => {
  const { isStart, isTracking, iframeRef } = storeToRefs(useArStore());
  const { isPlay } = storeToRefs(useAudioStore());

  const handleMessageEvent = (event) => {
    const message = event.data?.message;

    if (message === 'Onirix SDK started') {
    } else if (message === 'Onirix SDK initialized') {
      isStart.value = true;
    } else if (message === 'Tracking has started') {
      isTracking.value = true;
    }
  };

  const playAnimation = () => {
    iframeRef.value.contentWindow.postMessage({ action: 'play' }, '*');
  };
  const pauseAnimation = () => {
    iframeRef.value.contentWindow.postMessage({ action: 'pause' }, '*');
  };

  const arMounted = async () => {
    await nextTick();
    const iframe = document.querySelector('.ar-scene');
    iframeRef.value = iframe;

    window.addEventListener('message', handleMessageEvent);
  };
  const arUnMounted = () => {
    isStart.value = false;
    isTracking.value = false;
    window.removeEventListener('message', handleMessageEvent);
  };

  watch(isPlay, (newValue) => {
    if (newValue) {
      playAnimation();
    } else {
      pauseAnimation();
    }
  });

  watch(isTracking, (newValue) => {
    if (newValue) {
      playAnimation();
    }
  });

  return {
    arMounted,
    arUnMounted,
  };
};
export default useAr;
