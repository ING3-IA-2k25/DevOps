// composables/useSongs.ts
import type { ApiResponse, Column, LikeOption, SortOption } from '~/types/table'

export function useSongs() {
    const search = ref('')
    const selectedLikes = ref<LikeOption[]>([])
    const selectedColumns = ref<Column[]>([])
    const sort = ref<SortOption>({ column: '_id', direction: 'asc' })
    const page = ref(1)
    const pageCount = ref(10)

    const fetchSongs = () => {
        return $fetch<ApiResponse>('/api/song', {
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
        watch: [page, search, pageCount, sort, selectedColumns, selectedLikes],
    })

    const songs = computed(() => response.value?.data || [])
    const totalSongs = computed(() => response.value?.total || 0)

    return {
        search,
        selectedLikes,
        selectedColumns,
        sort,
        page,
        pageCount,
        songs,
        totalSongs,
        status,
        refresh,
    }
}
