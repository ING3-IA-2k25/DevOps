import Song from '~/server/models/song.model'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { songIds, liked } = body
        if (!Array.isArray(songIds) || typeof liked !== 'boolean') {
            throw new Error('Paramètres invalides')
        }

        // Mettez à jour les chansons correspondantes
        await Song.updateMany({ _id: { $in: songIds } }, { $set: { liked } })

        return { success: true }
    } catch (error) {
        console.error('Erreur lors de la mise à jour des chansons :', error)
        const err = error as Error
        return { success: false, error: err.message }
    }
})
