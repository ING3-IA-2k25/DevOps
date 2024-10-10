<script lang="ts" setup>
import type Song from '~/server/models/song.model'
import type { DropdownItem, LikeOption, ApiResponse } from '~/types/table'
const columns = [
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

const likedStatus: LikeOption[] = [
    { key: 'disliked', label: 'Disliked', value: false },
    { key: 'liked', label: 'Liked', value: true },
]

// Define default column keys
const defaultColumnKeys = [columns[0], columns[1], columns[2], columns[3], columns[4]]
const selectedColumns = ref([...defaultColumnKeys])
const columnsTable = computed(() => columns.filter((column) => selectedColumns.value.includes(column)))
// Selected Rows
const selectedRows = ref<Song[]>([])
function select(row: Song) {
    const index = selectedRows.value.findIndex((item) => item._id === row._id)
    if (index === -1) {
        selectedRows.value.push(row)
    } else {
        selectedRows.value.splice(index, 1)
    }
}

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

const selectedLikes = ref<LikeOption[]>([])
const search = ref('')
const resetFilters = () => {
    search.value = ''
    selectedLikes.value = []
    selectedColumns.value = [...defaultColumnKeys]
}

// Pagination
const sort = ref({ column: '_id', direction: 'asc' as const })
const page = ref(1)
const pageCount = ref(10)
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1)

// Data
const fetchSongs = () => {
    return $fetch<ApiResponse>(`/api/song`, {
        query: {
            q: search.value,
            _page: page.value,
            _limit: pageCount.value,
            _sort: sort.value.column,
            _order: sort.value.direction,
            _fields: selectedColumns.value.map((column) => column.key).join(','),
            liked: selectedLikes.value.map((like) => like.value),
        },
    })
}

const {
    data: response,
    status,
    refresh,
} = useLazyAsyncData<ApiResponse>('songs', fetchSongs, {
    default: () => ({
        data: [],
        total: 0,
    }),
    watch: [page, search, pageCount, sort, columnsTable, selectedLikes],
})
const songs = computed(() => response.value?.data || [])
const totalSongs = computed(() => response.value?.total || 0)
const pageTotal = ref(totalSongs)
const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))
</script>
<template>
    <UCard
        class="w-full"
        :ui="{
            base: '',
            ring: '',
            divide: 'divide-y divide-gray-200 dark:divide-gray-700',
            header: { padding: 'px-4 py-5' },
            body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
            footer: { padding: 'p-4' },
        }"
    >
        <template #header>
            <h2 class="font-semibold text-xl text-gray-900 dark:text-white leading-tight">songs</h2>
        </template>

        <!-- Filters -->
        <div class="flex items-center justify-between gap-3 px-4 py-3">
            <UInput v-model="search" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />

            <USelectMenu v-model="selectedLikes" :options="likedStatus" multiple placeholder="Liked" class="w-40" />
        </div>

        <!-- Header and Action buttons -->
        <div class="flex justify-between items-center w-full px-4 py-3">
            <div class="flex items-center gap-1.5">
                <span class="text-sm leading-5">Rows per page:</span>

                <USelect
                    v-model="pageCount"
                    :options="[3, 5, 10, 20, 30, 40]"
                    class="me-2 w-20"
                    size="xs"
                    @update:model-value="(value) => (pageCount = Number(value))"
                />
            </div>

            <div class="flex gap-1.5 items-center">
                <UDropdown v-if="selectedRows.length > 0" :items="actions" :ui="{ width: 'w-36' }">
                    <UButton icon="i-heroicons-chevron-down" trailing color="gray" size="xs"> Mark as </UButton>
                </UDropdown>

                <USelectMenu v-model="selectedColumns" :options="columns" multiple>
                    <UButton icon="i-heroicons-view-columns" color="gray" size="xs"> Columns </UButton>
                </USelectMenu>

                <UButton
                    icon="i-heroicons-funnel"
                    color="gray"
                    size="xs"
                    :disabled="
                        search === '' &&
                        selectedLikes.length === 0 &&
                        selectedColumns.length === defaultColumnKeys.length
                    "
                    @click="resetFilters"
                >
                    Reset
                </UButton>
            </div>
        </div>

        <!-- Table -->
        <UTable
            v-model="selectedRows"
            v-model:sort="sort"
            :rows="songs"
            :columns="columnsTable"
            :loading="status === 'pending'"
            sort-asc-icon="i-heroicons-arrow-up"
            sort-desc-icon="i-heroicons-arrow-down"
            sort-mode="manual"
            class="w-full"
            :ui="{ td: { base: 'max-w-[0] truncate' }, default: { checkbox: { color: 'primary' as any } } }"
            @select="select"
        >
            <template #liked-data="{ row }">
                <UBadge
                    size="xs"
                    :label="row.liked ? 'Liked' : 'Disliked'"
                    :color="row.liked ? 'emerald' : 'orange'"
                    variant="subtle"
                />
            </template>

            <template #actions-data="{ row }">
                <UButton
                    v-if="!row.completed"
                    icon="i-heroicons-check"
                    size="2xs"
                    color="emerald"
                    variant="outline"
                    :ui="{ rounded: 'rounded-full' }"
                    square
                />

                <UButton
                    v-else
                    icon="i-heroicons-arrow-path"
                    size="2xs"
                    color="orange"
                    variant="outline"
                    :ui="{ rounded: 'rounded-full' }"
                    square
                />
            </template>
        </UTable>

        <!-- Number of rows & Pagination -->
        <template #footer>
            <div class="flex flex-wrap justify-between items-center">
                <div>
                    <span class="text-sm leading-5">
                        Showing
                        <span class="font-medium">{{ pageFrom }}</span>
                        to
                        <span class="font-medium">{{ pageTo }}</span>
                        of
                        <span class="font-medium">{{ pageTotal }}</span>
                        results
                    </span>
                </div>

                <UPagination
                    v-model="page"
                    :page-count="pageCount"
                    :total="pageTotal"
                    :ui="{
                        wrapper: 'flex items-center gap-1',
                        rounded: '!rounded-full min-w-[32px] justify-center',
                        default: {
                            activeButton: {
                                variant: 'outline',
                            },
                        },
                    }"
                />
            </div>
        </template>
    </UCard>
</template>
