<!-- pages/songs.vue -->
<template>
    <UCard
        class="w-full"
        :ui="{
            base: '',
            ring: '',
            divide: 'divide-y divide-gray-200 dark:divide-gray-700',
            header: { padding: 'px-4 py-5' },
            body: {
                padding: '',
                base: 'divide-y divide-gray-200 dark:divide-gray-700',
            },
            footer: { padding: 'p-4' },
        }"
    >
        <div class="flex items-center">
            <img src="../../assets/sproutifart.png" alt="Sproutify" class="h-24" />
            <h2 class="font-semibold text-5xl m-6 text-fern-500">Sproutify</h2>
        </div>
        <!-- Filters -->
        <Filters
            :liked-status="likedStatus"
            :need-reset="needReset"
            @update:search="search = $event"
            @update:selected-likes="selectedLikes = $event"
            @update:is_search="isSearchActive = $event"
            @update:is_select-like="isSelectLikeActive = $event"
        />
        <!-- Actions and Columns -->
        <Actions
            :actions="actions"
            :columns="columns"
            :default-column-keys="defaultColumnKeys"
            :selected-rows="selectedRows"
            :can-reset="isSearchActive || isSelectLikeActive"
            @update:selected-columns="selectedColumns = $event"
            @update:page-count="pageCount = $event"
            @handle-action="handleAction"
            @reset-filters="resetFilters"
        />

        <!-- Table -->
        <DataTable
            v-model:sort="sort"
            v-model:="selectedRows"
            :songs="songs"
            :columns-table="columnsTable"
            :is-loading="status === 'pending'"
        />

        <!-- Pagination -->
        <template #footer>
            <Pagination :total-songs="totalSongs" :page-count="pageCount" @update:page="page = $event" />
        </template>
    </UCard>
</template>

<script lang="ts" setup>
import type { DropdownItem, LikeOption, Column } from '~/types/table'
import type Song from '~/server/models/song.model'

// Import du composable
import { useSongs } from '~/composables/useSongs'

// Colonnes du tableau
const columns: Column[] = [
    { key: '_id', label: 'ID', sortable: true },
    { key: 'trackName', label: 'Track Name', sortable: true },
    { key: 'artistName', label: 'Artist Name', sortable: true },
    { key: 'liked', label: 'Liked', sortable: false },
    { key: 'genre', label: 'Genre', sortable: true },
    { key: 'msPlayed', label: 'Milliseconds Played', sortable: true },
    { key: 'danceability', label: 'Danceability', sortable: true },
    { key: 'energy', label: 'Energy', sortable: true },
    { key: 'key', label: 'Key', sortable: true },
    { key: 'loudness', label: 'Loudness (dB)', sortable: true },
    { key: 'mode', label: 'Mode', sortable: true },
    { key: 'speechiness', label: 'Speechiness', sortable: true },
    { key: 'acousticness', label: 'Acousticness', sortable: true },
    { key: 'instrumentalness', label: 'Instrumentalness', sortable: true },
    { key: 'liveness', label: 'Liveness', sortable: true },
    { key: 'valence', label: 'Valence', sortable: true },
    { key: 'tempo', label: 'Tempo (BPM)', sortable: true },
    { key: 'duration_ms', label: 'Duration (ms)', sortable: true },
    { key: 'time_signature', label: 'Time Signature', sortable: true },
    { key: 'createdAt', label: 'Created At', sortable: true },
    { key: 'updatedAt', label: 'Updated At', sortable: true },
    { key: 'track_href', label: 'Track Link', sortable: false },
    { key: 'analysis_url', label: 'Analysis URL', sortable: false },
]

// Actions disponibles
const actions: DropdownItem[][] = [
    [
        {
            key: 'like',
            label: 'Like',
            icon: 'i-heroicons-thumb-up',
            click: function () {
                handleAction(this)
            },
        },
        {
            key: 'dislike',
            label: 'Dislike',
            icon: 'i-heroicons-thumb-down',
            click: function () {
                handleAction(this)
            },
        },
    ],
]

// Options de likes
const likedStatus: LikeOption[] = [
    { key: 'disliked', label: 'Disliked', value: false },
    { key: 'liked', label: 'Liked', value: true },
]
const needReset = ref([false])
// Colonnes par défaut
const defaultColumnKeys = [columns[0], columns[1], columns[2], columns[3], columns[4]]

// Utilisation du composable
const { search, selectedLikes, selectedColumns, sort, page, pageCount, songs, totalSongs, status, refresh } = useSongs()

// Initialisation des colonnes sélectionnées
selectedColumns.value = [...defaultColumnKeys]

// Calcul des colonnes à afficher
const columnsTable = computed(() => columns.filter((column) => selectedColumns.value.includes(column)))

// Sélection des lignes
const selectedRows = ref<Song[]>([])

// Gestion des actions
function handleAction(action: DropdownItem) {
    const actionKey = action.key
    let newLikedValue: boolean
    if (actionKey === 'like') {
        newLikedValue = true
    } else if (actionKey === 'dislike') {
        newLikedValue = false
    } else {
        return
    }
    const selectedIds = selectedRows.value.map((song: Song) => song._id)
    updateSongsLikedStatus(selectedIds, newLikedValue)
}

async function updateSongsLikedStatus(songIds: string[], liked: boolean) {
    try {
        await $fetch('/api/like', {
            method: 'POST',
            body: {
                songIds,
                liked,
            },
        })
        const selectedSongIds = selectedRows.value.map((song) => song._id)
        await refresh()
        // Réinitialiser la sélection
        selectedRows.value = songs.value.filter((song) => selectedSongIds.includes(song._id))
    } catch (error) {
        console.error('Erreur lors de la mise à jour des chansons :', error)
    }
}
const isSearchActive = ref(false)
const isSelectLikeActive = ref(false)
function resetFilters() {
    search.value = ''
    selectedLikes.value = []
    selectedColumns.value = [...defaultColumnKeys] // Réinitialiser les colonnes
    pageCount.value = 10 // Réinitialiser le nombre de lignes par page

    isSearchActive.value = false
    isSelectLikeActive.value = false
    needReset.value[0] = true
    setTimeout(() => (needReset.value[0] = false), 30)
}
</script>
