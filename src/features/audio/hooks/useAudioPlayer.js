import { nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useAudioStore } from '@/app/store/useAudioStore';
import { useContentStore } from '@/app/store/useContentStore';

import { getKoreanScript, getScriptList } from '@/shared/lib/getScript';

const useAudioPlayer = () => {
  const KO_DELAY = 0.14;
  const lyrics = [];

  const route = useRoute();
  const { id } = route.params;

  const { audio, isPlay, currentIndex, totalTime, currentTime, percentage } =
    storeToRefs(useAudioStore());
  const { contentListRef } = storeToRefs(useContentStore());
  const currentContent = contentListRef.value[id];

  const scriptList = getScriptList({
    scriptList: currentContent?.docent,
  });

  scriptList.forEach((script, i) => {
    const cleanScript = getKoreanScript({ script });
    if (i === 0) {
      const timeStemp = Math.round(cleanScript.length * KO_DELAY);
      const lyric = {
        script: cleanScript,
        timeStemp: timeStemp,
      };
      lyrics.push(lyric);
    } else {
      const currentTimeStemp = cleanScript.length * KO_DELAY;
      const prevTimeStemp = lyrics[i - 1]?.timeStemp;
      const timeStemp = Math.round(currentTimeStemp + prevTimeStemp);
      const lyric = {
        script: cleanScript,
        timeStemp: timeStemp,
      };
      lyrics.push(lyric);
    }
  });

  const updateCurrentIndex = () => {
    const updateIndex = lyrics.findIndex((lyric, index) => {
      const currentTimeStemp = lyric.timeStemp;
      const nextTimeStemp = lyrics[index + 1]?.timeStemp;

      const result =
        currentTime.value >= currentTimeStemp &&
        currentTime.value < nextTimeStemp;
      return result === -1 ? 0 : result;
    });

    currentIndex.value = updateIndex;
  };

  const clearAudio = () => {
    currentIndex.value = audio.value.currentTime = 0;
    isPlay.value = false;
  };

  const onTimeUpdate = (event) => {
    console.log(percentage.value);
    currentTime.value = audio.value.currentTime;
    const currentTimeStemp = lyrics[currentIndex.value]?.timeStemp;
    if (!currentTimeStemp) return null;
    if (currentTime.value > currentTimeStemp) currentIndex.value++;
  };

  const onLoadedMetadata = () => {
    if (audio.value) totalTime.value = audio.value.duration;
  };

  const onEnded = () => {
    clearAudio();
  };

  const audioMounted = async () => {
    audio.value = new Audio(currentContent?.tts);

    await nextTick();
    if (audio.value) {
      totalTime.value = audio.value.duration;
      audio.value.addEventListener('timeupdate', onTimeUpdate);
      audio.value.addEventListener('loadedmetadata', onLoadedMetadata);
      audio.value.addEventListener('ended', onEnded);
    }
  };

  const aduioUnMounted = () => {
    audio.value.pause();
    clearAudio();
  };

  return {
    lyrics,
    percentage,
    clearAudio,
    updateCurrentIndex,
    audioMounted,
    aduioUnMounted,
  };
};

export default useAudioPlayer;
