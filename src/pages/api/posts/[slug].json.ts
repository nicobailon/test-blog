import type { APIRoute, GetStaticPaths } from 'astro'
import { getCollection } from 'astro:content'
import { getWordCount, getReadingTime } from '../../../lib/utils'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('posts')
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post }
  }))
}

export const GET: APIRoute = async ({ props, site }) => {
  const { post } = props as { post: Awaited<ReturnType<typeof getCollection>>[number] }
  const baseUrl = site?.toString().replace(/\/$/, '') || ''

  return new Response(JSON.stringify({
    slug: post.slug,
    title: post.data.title,
    pubDatetime: post.data.pubDatetime.toISOString(),
    modDatetime: post.data.modDatetime?.toISOString(),
    description: post.data.description,
    tags: post.data.tags,
    featured: post.data.featured,
    draft: post.data.draft,
    url: `${baseUrl}/${post.slug}`,
    wordCount: getWordCount(post.body || ''),
    readingTime: getReadingTime(post.body || ''),
    body: post.body || ''
  }, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  })
}
