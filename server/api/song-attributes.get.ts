import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const songs = await serverQueryContent(event).findOne()
  return songs?.body || []
})