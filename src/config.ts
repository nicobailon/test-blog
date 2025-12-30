interface BlogConfig {
  name?: string
  title: string
  description?: string
  site: string
  language?: string
  author?: {
    name?: string
    email?: string
    url?: string
    avatar?: string
    bio?: string
  }
  social?: {
    twitter?: string
    github?: string
    linkedin?: string
    mastodon?: string
    bluesky?: string
    youtube?: string
    email?: string
  }
  features?: {
    search?: boolean
    rss?: boolean
    ogImages?: boolean
    hero?: boolean
    newsletter?: boolean
    relatedPosts?: boolean
    shareLinks?: boolean
    comments?: boolean
    reactions?: boolean
  }
  newsletter?: {
    enabled?: boolean
    provider?: string
    action?: string
    placeholder?: string
  }
  hero?: {
    title?: string
    subtitle?: string
  }
  turnstile?: {
    enabled?: boolean
    siteKey?: string
  }
}

import configJson from '../config.json'
const config = configJson as BlogConfig

const base = import.meta.env.BASE_URL.endsWith('/') 
  ? import.meta.env.BASE_URL.slice(0, -1) 
  : import.meta.env.BASE_URL

export const BASE = base
export const url = (path: string) => `${base}${path.startsWith('/') ? path : '/' + path}`

export const SITE = {
  name: config.name || '',
  title: config.title,
  description: config.description || '',
  url: config.site,
  author: config.author?.name || 'Anonymous'
}

export const AUTHOR: { name: string; email?: string; url?: string; avatar?: string; bio?: string } = {
  name: config.author?.name || 'Anonymous',
  email: config.author?.email || '',
  url: config.author?.url || '',
  avatar: config.author?.avatar ? (config.author.avatar.startsWith('/') ? url(config.author.avatar) : config.author.avatar) : url('/images/avatar.png'),
  bio: config.author?.bio || ''
}

export const HERO = {
  title: config.hero?.title || config.title,
  subtitle: config.hero?.subtitle || config.description || ''
}

export const NEWSLETTER = {
  enabled: config.newsletter?.enabled ?? false,
  provider: config.newsletter?.provider || '',
  action: config.newsletter?.action || '',
  placeholder: config.newsletter?.placeholder || 'your@email.com'
}

export const SOCIALS: { name: string; href: string; icon: string }[] = [
  ...(config.social?.twitter ? [{ name: 'Twitter', href: `https://twitter.com/${config.social.twitter}`, icon: 'twitter' }] : []),
  ...(config.social?.github ? [{ name: 'GitHub', href: `https://github.com/${config.social.github}`, icon: 'github' }] : []),
  ...(config.social?.linkedin ? [{ name: 'LinkedIn', href: `https://linkedin.com/in/${config.social.linkedin}`, icon: 'linkedin' }] : []),
  ...(config.social?.mastodon ? [{ name: 'Mastodon', href: config.social.mastodon, icon: 'mastodon' }] : []),
  ...(config.social?.bluesky ? [{ name: 'Bluesky', href: `https://bsky.app/profile/${config.social.bluesky}`, icon: 'bluesky' }] : []),
  ...(config.social?.youtube ? [{ name: 'YouTube', href: `https://youtube.com/@${config.social.youtube}`, icon: 'youtube' }] : []),
  ...(config.social?.email ? [{ name: 'Email', href: `mailto:${config.social.email}`, icon: 'email' }] : []),
]

export const FEATURES = {
  search: config.features?.search ?? true,
  rss: config.features?.rss ?? true,
  ogImages: config.features?.ogImages ?? false,
  hero: config.features?.hero ?? false,
  newsletter: config.features?.newsletter ?? false,
  relatedPosts: config.features?.relatedPosts ?? false,
  shareLinks: config.features?.shareLinks ?? false,
  comments: config.features?.comments ?? false,
  reactions: config.features?.reactions ?? false
}

export const TURNSTILE = {
  enabled: config.turnstile?.enabled ?? false,
  siteKey: config.turnstile?.siteKey || ''
}

export const API_BASE = 'https://llms-blog.nico604.workers.dev/api'
