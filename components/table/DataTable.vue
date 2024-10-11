<!-- components/DataTableComponent.vue -->
<template>
    <UTable
        v-model:sort="localSort"
        v-model:="localSelectedRows"
        :rows="songs"
        :columns="columnsTable"
        :loading="isLoading"
        sort-asc-icon="i-heroicons-arrow-up"
        sort-desc-icon="i-heroicons-arrow-down"
        sort-mode="manual"
        class="w-full"
        :ui="{ td: { base: 'max-w-[0] truncate' }, default: { checkbox: { color: 'primary' } } }"
        @select="onSelect"
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

defineProps<{
    songs: Song[]
    columnsTable: Column[]
    isLoading: boolean
}>()

const emits = defineEmits<{
    (e: 'update:selectedRows', value: Song[]): void
    (e: 'update:sort', value: SortOption): void
}>()

const localSelectedRows = ref<Song[]>([])
const localSort = ref<SortOption>({ column: '_id', direction: 'asc' })

const onSelect = (row: Song) => {
    const index = localSelectedRows.value.findIndex((item) => item._id === row._id)
    if (index === -1) {
        localSelectedRows.value.push(row)
    } else {
        localSelectedRows.value.splice(index, 1)
    }
}

watch(localSelectedRows, (newVal) => {
    emits('update:selectedRows', newVal)
})

watch(localSort, (newVal) => {
    emits('update:sort', newVal)
})
</script>
