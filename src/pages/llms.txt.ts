import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

export const GET: APIRoute = async ({ site }) => {
  const posts = await getCollection('posts', ({ data }) => !data.draft)
  const sorted = posts.sort((a, b) => b.data.pubDatetime.valueOf() - a.data.pubDatetime.valueOf())
  const baseUrl = site?.toString().replace(/\/$/, '') || ''

  const entries = sorted.map(post => {
    const date = post.data.pubDatetime.toISOString().split('T')[0]
    return `- [${post.data.title}](${baseUrl}/${post.slug}): ${date}`
  }).join('\n')

  const content = `# Blog

## Posts

${entries}

## API

### List Posts
GET ${baseUrl}/api/posts.json

Query parameters:
- tag=TAG - Filter by single tag
- tags=a,b,c - Filter by any of these tags (OR)
- all_tags=a,b - Filter by all of these tags (AND)
- exclude_tag=TAG - Exclude posts with this tag
- after=YYYY-MM-DD - Posts after date
- before=YYYY-MM-DD - Posts before date
- limit=N - Limit results
- offset=N - Skip results
- include_body=false - Exclude post content (smaller response)

### Single Post
GET ${baseUrl}/api/posts/SLUG.json
GET ${baseUrl}/SLUG (with Accept: text/markdown header)

### Convenience
GET ${baseUrl}/api/slugs.json - List of all post slugs
GET ${baseUrl}/api/random.json - Random post
GET ${baseUrl}/api/status.json - Blog stats

### Feeds
GET ${baseUrl}/rss.xml - RSS feed
`

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}
