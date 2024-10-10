import { serverQueryContent } from '#content/server'
import Song from '~/server/models/song.model'

export default defineEventHandler(async (event) => {
    const songs = await serverQueryContent(event).findOne()
    if (!Array.isArray(songs?.body)) {
        return { success: false, message: 'Expected an array of songs' }
    }

    try {
        // Insert multiple songs into the collection
        const collectionExists = await Song.exists({})

        if (!collectionExists) {
            // Insert multiple songs into the collection if it doesn't exist
            const insertedSongs = await Song.insertMany(songs.body)
            return { success: true, data: insertedSongs }
        } else {
            return { success: false, message: "Collection 'songs' already exists" }
        }
    } catch (error) {
        const err = error as Error
        return { success: false, error: err.message }
    }
})
