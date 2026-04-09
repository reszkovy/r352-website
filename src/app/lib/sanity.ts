import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// ⚠️ REPLACE with your Sanity project ID
const PROJECT_ID = 'pi8mx0t0'
const DATASET = 'production'
const API_VERSION = '2024-01-01'

export const sanityClient = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  useCdn: true, // CDN for fast reads in production
})

// Image URL builder
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ─── GROQ Queries ───

export const ARTICLES_QUERY = `*[_type == "article"] | order(date desc) {
  _id,
  title,
  "slug": slug.current,
  date,
  category,
  image,
  excerpt,
  "hasLegacyHtml": defined(legacyHtml)
}`

export const ARTICLE_BY_SLUG_QUERY = `*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  date,
  category,
  image,
  excerpt,
  content,
  legacyHtml
}`

export const PROJECTS_QUERY = `*[_type == "project"] | order(order asc, year desc) {
  _id,
  client,
  "slug": slug.current,
  title,
  category,
  year,
  image,
  coverImage,
  isInternal
}`

export const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  client,
  "slug": slug.current,
  title,
  category,
  year,
  image,
  coverImage,
  gallery,
  isInternal,
  description,
  services,
  challenge,
  decisions,
  approach,
  quote,
  outcome,
  reflection,
  stats
}`

// ─── Fetch helpers ───

export async function getArticles() {
  return sanityClient.fetch(ARTICLES_QUERY)
}

export async function getArticleBySlug(slug: string) {
  return sanityClient.fetch(ARTICLE_BY_SLUG_QUERY, { slug })
}

export async function getProjects() {
  return sanityClient.fetch(PROJECTS_QUERY)
}

export async function getProjectBySlug(slug: string) {
  return sanityClient.fetch(PROJECT_BY_SLUG_QUERY, { slug })
}
