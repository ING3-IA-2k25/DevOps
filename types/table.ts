import type Song from '~/server/models/song.model'

export interface ApiResponse {
    data: Song[]
    total: number
}

// Define LikeOption interface
export interface LikeOption {
    key: string
    label: string
    value: boolean
}

export interface DropdownItem {
    key: string
    label: string
    icon?: string
    click?: () => void
    // Add other properties if necessary
}

// Interface pour une colonne du tableau
export interface Column {
    key: string
    label: string
    sortable: boolean
}

// Type pour la direction du tri
export type SortDirection = 'asc' | 'desc'

// Interface pour les options de tri
export interface SortOption {
    column: string
    direction: SortDirection
}
