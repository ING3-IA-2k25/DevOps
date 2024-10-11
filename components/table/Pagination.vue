<!-- components/PaginationComponent.vue -->
<template>
    <div class="flex flex-wrap justify-between items-center">
        <div>
            <span class="text-sm leading-5">
                Showing
                <span class="font-medium">{{ pageFrom }}</span>
                to
                <span class="font-medium">{{ pageTo }}</span>
                of
                <span class="font-medium">{{ totalSongs }}</span>
                results
            </span>
        </div>

        <UPagination
            v-model="localPage"
            :page-count="pagesCount"
            :total="totalSongs"
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

<script lang="ts" setup>
const props = defineProps<{
    totalSongs: number
    pageCount: number
}>()

const emits = defineEmits<{
    (e: 'update:page', value: number): void
}>()

const localPage = ref(1)

const pagesCount = computed(() => props.pageCount)
const pageFrom = computed(() => (localPage.value - 1) * props.pageCount + 1)
const pageTo = computed(() => Math.min(localPage.value * props.pageCount, props.totalSongs))

watch(localPage, (newVal) => {
    emits('update:page', newVal)
})
</script>
