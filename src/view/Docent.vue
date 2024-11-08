<script setup>
  import { computed, onMounted, onUnmounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useRoute, useRouter } from 'vue-router';

  import { useContentStore } from '@/app/store/useContentStore';
  import { useArStore } from '@/app/store/useArStore';

  import useAr from '@/features/docent/hooks/useAr';
  import WebAr from '@/features/docent/components/WebAr.vue';
  import AudioPlayer from '@/features/audio/components/AudioPlayer.vue';

  const router = useRouter();
  const { id } = useRoute().params;
  const { arMounted, arUnMounted } = useAr();
  const { contentListRef } = storeToRefs(useContentStore());
  const { isStart } = storeToRefs(useArStore());

  const displayContent = computed(() => {
    return contentListRef.value[+id];
  });

  const handleHomeClick = () => {
    router.push('/');
  };

  onMounted(arMounted);

  onUnmounted(arUnMounted);
</script>
<template>
  <main class="docent-page">
    <TransitionGroup name="fade" appear>
      <header key="docent-header" v-if="isStart" class="docent-header">
        <h2 @click="handleHomeClick">Home</h2>
        <h2>{{ displayContent.title }}</h2>
      </header>

      <WebAr key="docent-ar" />

      <AudioPlayer key="docent-player" v-if="isStart" class="audio-player" />
    </TransitionGroup>
  </main>
</template>
<style scoped>
  .docent-page {
    width: 100vw;
    height: 100vh;
  }
  .docent-header {
    position: fixed;
    top: 0;
    left: 0;
    padding: 10px;
    width: 100vw;
    display: flex;
    justify-content: space-around;
    z-index: 999;
    background-color: white;
  }
  .audio-player {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    background-color: white;
  }
</style>
