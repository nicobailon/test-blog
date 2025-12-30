import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export const GET: APIRoute = async ({ site }) => {
  const allPosts = await getCollection('posts')
  const published = allPosts.filter(p => !p.data.draft)
  const drafts = allPosts.filter(p => p.data.draft)
  const featured = published.filter(p => p.data.featured)

  const tagCounts: Record<string, number> = {}
  for (const p of published) {
    for (const t of p.data.tags) {
      tagCounts[t] = (tagCounts[t] || 0) + 1
    }
  }

  const latest = published.sort((a, b) =>
    b.data.pubDatetime.valueOf() - a.data.pubDatetime.valueOf()
  )[0]

  return new Response(JSON.stringify({
    site: site?.toString() || '',
    posts: {
      total: allPosts.length,
      published: published.length,
      drafts: drafts.length,
      featured: featured.length
    },
    tags: Object.entries(tagCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
    latestPost: latest ? {
      slug: latest.slug,
      title: latest.data.title,
      pubDatetime: latest.data.pubDatetime.toISOString()
    } : null,
    generatedAt: new Date().toISOString()
  }, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  })
}
