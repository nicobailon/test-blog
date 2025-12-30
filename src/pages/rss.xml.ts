import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET(context: { site: URL }) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDatetime.valueOf() - a.data.pubDatetime.valueOf())

  const base = import.meta.env.BASE_URL.endsWith('/') 
    ? import.meta.env.BASE_URL 
    : import.meta.env.BASE_URL + '/'

  return rss({
    title: 'USS Enterprise Engineering Log',
    description: 'Technical logs from the Engineering Division',
    site: context.site,
    items: posts.map(p => ({
      title: p.data.title,
      pubDate: p.data.pubDatetime,
      description: p.data.description,
      link: `${base}${p.slug}/`
    }))
  })
}
