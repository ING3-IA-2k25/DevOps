<!-- components/Actions.vue -->
<template>
    <div class="flex justify-between items-center w-full px-4 py-3">
        <div class="flex items-center gap-1.5">
            <span class="text-sm leading-5">Rows per page:</span>

            <USelect
                v-model="localPageCount"
                :options="[3, 5, 10, 20, 30, 40]"
                class="me-2 w-20"
                size="xs"
                @update:model-value="updatePageCount"
            />
        </div>

        <div class="flex gap-1.5 items-center">
            <!-- Dropdown pour les actions (Like/Dislike) -->
            <UDropdown v-if="selectedRows.length > 0" :items="actions" :ui="{ width: 'w-36' }">
                <UButton icon="i-heroicons-chevron-down" trailing color="gray" size="xs"> Mark as </UButton>
            </UDropdown>

            <!-- Bouton Columns -->
            <USelectMenu v-model="localSelectedColumns" :options="columns" multiple>
                <UButton icon="i-heroicons-view-columns" color="gray" size="xs"> Columns </UButton>
            </USelectMenu>

            <!-- Bouton Reset -->
            <UButton icon="i-heroicons-funnel" color="gray" size="xs" :disabled="isResetDisabled" @click="emitReset">
                Reset
            </UButton>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { DropdownItem, Column } from '~/types/table'
import type Song from '~/server/models/song.model'

// Définition des props
const props = defineProps<{
    actions: DropdownItem[][]
    columns: Column[]
    defaultColumnKeys: Column[]
    selectedRows: Song[]
    canReset: boolean
}>()
// Définition des événements émis
const emits = defineEmits<{
    (e: 'update:selectedColumns', value: Column[]): void
    (e: 'update:pageCount', value: number): void
    (e: 'handleAction', action: DropdownItem): void
    (e: 'resetFilters'): void // Ajout de l'événement resetFilters
}>()

// États locaux
const localSelectedColumns = ref<Column[]>([...props.defaultColumnKeys])
const localPageCount = ref(10)

// Computed pour déterminer si le bouton Reset doit être désactivé
const isResetDisabled = computed(() => {
    return (
        localSelectedColumns.value.length === props.defaultColumnKeys.length &&
        props.defaultColumnKeys.every((defaultCol) =>
            localSelectedColumns.value.some((selectedCol) => selectedCol.key === defaultCol.key)
        ) &&
        Number(localPageCount.value) === 10 &&
        !props.canReset
    )
})

// Fonction pour mettre à jour le nombre de lignes par page
const updatePageCount = (value: number) => {
    emits('update:pageCount', Number(value))
}

// Fonction pour émettre l'événement resetFilters et réinitialiser les colonnes
const emitReset = () => {
    localSelectedColumns.value = [...props.defaultColumnKeys]
    localPageCount.value = 10 // Remet le nombre de lignes par page à 10 par défaut
    emits('update:selectedColumns', [...props.defaultColumnKeys])
    emits('resetFilters')
}

// Watcher pour émettre les mises à jour des colonnes sélectionnées
watch(localSelectedColumns, (newVal) => {
    emits('update:selectedColumns', newVal)
})
</script>
