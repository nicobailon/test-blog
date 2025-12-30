import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { getWordCount, getReadingTime } from '../../lib/utils'

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection('posts', ({ data }) => !data.draft)

  if (posts.length === 0) {
    return new Response(JSON.stringify({ error: 'No posts found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const post = posts[Math.floor(Math.random() * posts.length)]
  const baseUrl = site?.toString().replace(/\/$/, '') || ''

  return new Response(JSON.stringify({
    slug: post.slug,
    title: post.data.title,
    pubDatetime: post.data.pubDatetime.toISOString(),
    modDatetime: post.data.modDatetime?.toISOString(),
    description: post.data.description,
    tags: post.data.tags,
    featured: post.data.featured,
    url: `${baseUrl}/${post.slug}`,
    wordCount: getWordCount(post.body || ''),
    readingTime: getReadingTime(post.body || ''),
    body: post.body || ''
  }, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  })
}
