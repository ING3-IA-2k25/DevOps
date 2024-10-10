import type Song from '~/server/models/song.model'

interface ApiRes {
    data: Song[]
    total: number
}

export type ApiResponse = ApiRes

// Define LikeOption interface
interface LikeOpt {
    key: string
    label: string
    value: boolean
}

export type LikeOption = LikeOpt

interface DropdownIt {
    key: string
    label: string
    icon?: string
    click?: () => void
    // Add other properties if necessary
}

export type DropdownItem = DropdownIt
