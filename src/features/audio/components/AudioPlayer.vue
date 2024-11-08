<script setup>
  import { onMounted, onUnmounted } from 'vue';
  import AudioBar from '@/entities/audio/components/AudioBar.vue';
  import AudioButtonList from '@/entities/audio/components/AudioButtonList.vue';
  import AudioScript from '@/entities/audio/components/AudioScript.vue';
  import AudioTimer from '@/entities/audio/components/AudioTimer.vue';
  import useAudioPlayer from '@/features/audio/hooks/useAudioPlayer';

  const { audioMounted, aduioUnMounted } = useAudioPlayer();

  onMounted(audioMounted);

  onUnmounted(aduioUnMounted);
</script>
<template>
  <article class="audio-container">
    <AudioBar />
    <AudioTimer />
    <AudioScript />
    <AudioButtonList />
  </article>
</template>
