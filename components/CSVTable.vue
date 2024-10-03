<script setup lang="ts">

const { data: content, error } = await useAsyncData('songAttributes', async () => {
  try {
    const result = await queryContent('spotify_song_attributes').findOne();
    // Return only the 'body' array
    return result?.body || [];
  } catch (err) {
    console.error('Data fetching error:', err);
    return [];
  }
});

if (error.value) {
  console.error('AsyncData error:', error.value);
}

// 'data.value' now contains the array of song attributes
const data = ref(content.value || []);
const test = ref(data.value.length);
const columns = computed(() => {
  if (data.value && data.value.length > 0) {
    return Object.keys(data.value[0]).map((key) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
    }));
  }
  return [];
});
</script>

<template>
  <div>
    <UTable
      :rows="data"
      :columns="columns"
      :loading="!data"
      sort-asc-icon="i-heroicons-arrow-up-20-solid"
      sort-desc-icon="i-heroicons-arrow-down-20-solid"
      
      class="w-full"
    />
  </div>
</template>

