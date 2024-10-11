import type { ApiResponse, Column, LikeOption, SortOption } from '~/types/table'

export function useSongs() {
    const search = ref('')
    const selectedLikes = ref<LikeOption[]>([])
    const selectedColumns = ref<Column[]>([])
    const sort = ref<SortOption | undefined>(undefined) // Permet d'avoir undefined
    const page = ref(1)
    const pageCount = ref(10)

    const fetchSongs = () => {
        const query: Record<string, any> = {
            q: search.value,
            _page: page.value,
            _limit: pageCount.value,
            _fields: selectedColumns.value.map((column) => column.key).join(','),
            liked: selectedLikes.value.map((like) => like.value),
        }

        if (sort.value) {
            query._sort = sort.value.column
            query._order = sort.value.direction
        }

        return $fetch<ApiResponse>('/api/song', { query })
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
