<!-- components/DataTableComponent.vue -->
<template>
    <UTable
        v-model:sort="localSort"
        v-model:selectedRows="localSelectedRows"
        :rows="songs"
        :columns="columnsTable"
        :loading="isLoading"
        sort-asc-icon="i-heroicons-arrow-up"
        sort-desc-icon="i-heroicons-arrow-down"
        sort-mode="manual"
        class="w-full"
        :ui="{ td: { base: 'max-w-[0] truncate' }, default: { checkbox: { color: 'primary' } } }"
        @select="onSelect"
        @sort="onSort"
    >
        <template #liked-data="{ row }">
            <UBadge
                size="xs"
                :label="row.liked ? 'Liked' : 'Disliked'"
                :color="row.liked ? 'emerald' : 'orange'"
                variant="subtle"
            />
        </template>
    </UTable>
</template>

<script lang="ts" setup>
import type { Column, SortOption } from '~/types/table'
import type Song from '~/server/models/song.model'

// Définition des props
defineProps<{
    songs: Song[]
    columnsTable: Column[]
    isLoading: boolean
}>()

// Définition des événements émis
const emits = defineEmits<{
    (e: 'update:selectedRows', value: Song[]): void
    (e: 'update:sort', value: SortOption | undefined): void
}>()

// États locaux
const localSelectedRows = ref<Song[]>([])
const localSort = ref<SortOption | undefined>(undefined) // Utiliser undefined au lieu de null

// Méthode de sélection des lignes
const onSelect = (row: Song) => {
    const index = localSelectedRows.value.findIndex((item) => item._id === row._id)
    if (index === -1) {
        localSelectedRows.value.push(row)
    } else {
        localSelectedRows.value.splice(index, 1)
    }
}

// Méthode de gestion du tri
const onSort = (clickedColumn: string) => {
    if (clickedColumn === '_id') return // Ignorer le tri sur la colonne _id

    if (localSort.value?.column === clickedColumn) {
        // Bascule la direction
        localSort.value.direction = localSort.value.direction === 'asc' ? 'desc' : 'asc'
    } else {
        // Définit la nouvelle colonne avec une direction ascendante par défaut
        localSort.value = { column: clickedColumn, direction: 'asc' }
    }
    // Émettre l'événement de tri mis à jour
    emits('update:sort', localSort.value ? { ...localSort.value } : undefined)
}

// Watchers pour émettre les événements lors des changements
watch(localSelectedRows, (newVal) => {
    emits('update:selectedRows', newVal)
})

watch(localSort, (newVal) => {
    emits('update:sort', newVal)
})
</script>
