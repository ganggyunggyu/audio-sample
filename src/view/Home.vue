<script setup>
  import { useContentStore } from '@/app/store/useContentStore';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const { contentListRef } = useContentStore();

  const handleContentClick = ({ contentId }) => {
    router.push(`/docent/${contentId}`);
  };
</script>
<template>
  <main class="home-page">
    <section>
      <article
        v-for="(content, index) of contentListRef"
        @click="handleContentClick({ contentId: index })"
        :key="index"
      >
        <img :src="content.image" alt="content-image" />
        <p>{{ content.title }}</p>
      </article>
    </section>
  </main>
</template>
<style scoped></style>
