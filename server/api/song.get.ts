import type { FilterQuery } from 'mongoose'
import Song from '~/server/models/song.model'
import type { SongDocument } from '~/server/models/song.model'

export default defineEventHandler(async (event) => {
    const query = getQuery(event) // To get query parameters
    const page = parseInt(query._page as string) || 1
    const limit = parseInt(query._limit as string) || 10
    const sortColumn = (query._sort as string) || 'trackName' // Default sort column
    const sortOrder = query._order === 'desc' ? -1 : 1 // Sort direction, ascending by default
    const fields = (query._fields as string).split(',')

    const searchQuery: FilterQuery<SongDocument> = {}
    if (query.q) {
        searchQuery.trackName = { $regex: query.q, $options: 'i' }
    }
    if (query.liked) {
        const likedValues = Array.isArray(query.liked) ? query.liked : [query.liked]
        searchQuery.liked = { $in: likedValues.map((val) => val === 'true') }
    }

    try {
        const songs = await Song.find(searchQuery)
            .sort({ [sortColumn]: sortOrder }) // Sort based on column and order
            .skip((page - 1) * limit) // Pagination logic
            .limit(limit) // Limit results
            .select(fields.join(' '))
        const total = await Song.countDocuments(searchQuery) // Total number of songs matching the query
        return {
            data: songs, // Array of song objects
            total: total, // Total number of matching songs
        }
    } catch (error) {
        console.error('Error fetching songs:', error)
        return {
            message: 'Error fetching songs from the database',
        }
    }
})
