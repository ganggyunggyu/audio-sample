import { useAudioStore } from '@/app/store/useAudioStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const useScript = () => {
  const { currentIndex } = useAudioStore(storeToRefs());

  return { displayedLyrics };
};
export default useScript;
