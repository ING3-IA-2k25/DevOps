<!-- components/FiltersComponent.vue -->
<template>
    <div class="flex items-center justify-between gap-3 px-4 py-3">
        <UInput v-model="localSearch" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />

        <USelectMenu v-model="localSelectedLikes" :options="likedStatus" multiple placeholder="Liked" class="w-40" />
    </div>
</template>

<script lang="ts" setup>
import type { LikeOption } from '~/types/table'

// Définition des props
const props = defineProps<{
    likedStatus: LikeOption[]
    needReset: boolean[]
}>()

// Définition des événements émis
const emits = defineEmits<{
    (e: 'update:search', value: string): void
    (e: 'update:selectedLikes', value: LikeOption[]): void
    (e: 'update:is_search' | 'update:is_select-like', value: boolean): void
}>()

// États locaux
const localSearch = ref('')
const localSelectedLikes = ref<LikeOption[]>([])

// Watchers pour émettre les mises à jour des filtres
watch(localSearch, (newVal) => {
    emits('update:search', newVal)
    if (newVal !== '') {
        emits('update:is_search', true)
    } else {
        emits('update:is_search', false)
    }
})

watch(localSelectedLikes, (newVal) => {
    emits('update:selectedLikes', newVal)
    if (newVal.length > 0) {
        emits('update:is_select-like', true)
    } else {
        emits('update:is_select-like', false)
    }
})

watch(props.needReset, (newVal) => {
    if (newVal[0]) {
        localSearch.value = ''
        localSelectedLikes.value = []
    }
})
</script>
