import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { getWordCount, getReadingTime } from '../../lib/utils'

export const GET: APIRoute = async ({ site, url }) => {
  const p = new URL(url).searchParams
  const g = (k: string) => p.get(k)
  const tagFilter = g('tag')
  const tagsFilter = g('tags')
  const allTagsFilter = g('all_tags')
  const excludeTagFilter = g('exclude_tag')
  const afterFilter = g('after')
  const beforeFilter = g('before')
  const includeBody = g('include_body') !== 'false'

  let posts = await getCollection('posts', ({ data }) => !data.draft)

  if (tagFilter) {
    posts = posts.filter(p => p.data.tags.includes(tagFilter))
  }
  if (tagsFilter) {
    const tags = tagsFilter.split(',')
    posts = posts.filter(p => tags.some(t => p.data.tags.includes(t)))
  }
  if (allTagsFilter) {
    const tags = allTagsFilter.split(',')
    posts = posts.filter(p => tags.every(t => p.data.tags.includes(t)))
  }
  if (excludeTagFilter) {
    posts = posts.filter(p => !p.data.tags.includes(excludeTagFilter))
  }
  if (afterFilter) {
    posts = posts.filter(p => p.data.pubDatetime >= new Date(afterFilter))
  }
  if (beforeFilter) {
    posts = posts.filter(p => p.data.pubDatetime <= new Date(beforeFilter))
  }

  const sorted = posts.sort((a, b) => b.data.pubDatetime.valueOf() - a.data.pubDatetime.valueOf())
  const baseUrl = site?.toString().replace(/\/$/, '') || ''

  let result = sorted.map(post => ({
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
    ...(includeBody ? { body: post.body || '' } : {})
  }))

  const offset = g('offset') ? parseInt(g('offset')!, 10) : 0
  const limit = g('limit') ? parseInt(g('limit')!, 10) : result.length

  return new Response(JSON.stringify({
    posts: result.slice(offset, offset + limit),
    total: sorted.length
  }, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  })
}
