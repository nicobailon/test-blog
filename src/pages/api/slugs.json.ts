import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts', ({ data }) => !data.draft)
  const slugs = posts
    .sort((a, b) => b.data.pubDatetime.valueOf() - a.data.pubDatetime.valueOf())
    .map(p => p.slug)

  return new Response(JSON.stringify({ slugs }, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  })
}
