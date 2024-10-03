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
const columns = computed(() => {
  if (data.value && data.value.length > 0) {
    return Object.keys(data.value[0]).map((key) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      sortable: true,
    }));
  }
  return [];
});

const page = ref(1)
const q = ref('')

const pageCount = 10


const filteredRows = computed(() => {
  if (!q.value) {
    return data.value
  }

  return data.value.filter((song) => {
    return Object.values(data).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

const Slicedrows = computed(() => {
  const start = (page.value - 1) * pageCount;
  const end = page.value * pageCount;
  
  return filteredRows.value.slice(start, end);
});

</script>

<template>
  <div>
    <div class="flex items-center px-3 py-3.5 border-b border-gray-200 dark:border-gray-700 h-20">
      <img src="../assets/sproutifart.png" alt="sproutifart" class="h-20 m-5"  >
      <p class="text-3xl m-2 text-fern-500 font-extrabold">Sproutifart</p>
      <UInput v-model="q" placeholder="Rechercher un artiste, une musique..." class="w-80 ml-5"/>
    </div>

    <UTable 
    :rows="Slicedrows" 
    :columns="columns" 
    :loading="!data"
    :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
    :progress="{ color: 'primary', animation: 'carousel' }"

    />
    <UPagination v-model="page" :page-count="pageCount" :total="data.values.length" class="ml-5" />
  </div>
</template>

