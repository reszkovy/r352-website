import { useState, useEffect } from 'react'
import {
  getArticles,
  getArticleBySlug,
  getProjects,
  getProjectBySlug,
  urlFor,
} from '@/app/lib/sanity'

// Static fallbacks — used when Sanity is not configured or fetch fails
import { journalArticles } from '@/app/data/journalArticles'
import { projects as staticProjects } from '@/app/data/projects'

interface UseSanityResult<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

// Check if Sanity is configured (project ID replaced)
const isSanityConfigured = () => {
  try {
    // If the project ID is still the placeholder, Sanity is not configured
    return !import.meta.env.VITE_SANITY_SKIP && true
  } catch {
    return false
  }
}

// ─── Articles ───

export function useArticles(): UseSanityResult<any[]> & { data: any[] } {
  const [data, setData] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!isSanityConfigured()) {
      // Fallback to static data — map to match Sanity shape
      setData(
        journalArticles.map((a) => ({
          _id: String(a.id),
          title: a.title,
          slug: String(a.id),
          date: a.date,
          category: a.category,
          image: null, // static image handled separately
          _static: true,
          _staticImage: a.image,
        }))
      )
      setLoading(false)
      return
    }

    getArticles()
      .then((result) => {
        if (result && result.length > 0) {
          setData(result)
        } else {
          // Sanity is empty — fallback
          setData(
            journalArticles.map((a) => ({
              _id: String(a.id),
              title: a.title,
              slug: String(a.id),
              date: a.date,
              category: a.category,
              image: null,
              _static: true,
              _staticImage: a.image,
            }))
          )
        }
      })
      .catch((err) => {
        setError(err)
        // Fallback on error
        setData(
          journalArticles.map((a) => ({
            _id: String(a.id),
            title: a.title,
            slug: String(a.id),
            date: a.date,
            category: a.category,
            image: null,
            _static: true,
            _staticImage: a.image,
          }))
        )
      })
      .finally(() => setLoading(false))
  }, [])

  return { data: data || [], loading, error }
}

export function useArticle(slug: string): UseSanityResult<any> {
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!isSanityConfigured()) {
      const article = journalArticles.find((a) => String(a.id) === slug)
      if (article) {
        setData({
          _id: String(article.id),
          title: article.title,
          slug: String(article.id),
          date: article.date,
          category: article.category,
          legacyHtml: article.content,
          _static: true,
          _staticImage: article.image,
        })
      }
      setLoading(false)
      return
    }

    getArticleBySlug(slug)
      .then((result) => {
        if (result) {
          setData(result)
        } else {
          // Try static fallback by ID
          const article = journalArticles.find((a) => String(a.id) === slug)
          if (article) {
            setData({
              _id: String(article.id),
              title: article.title,
              slug: String(article.id),
              date: article.date,
              category: article.category,
              legacyHtml: article.content,
              _static: true,
              _staticImage: article.image,
            })
          }
        }
      })
      .catch((err) => {
        setError(err)
        const article = journalArticles.find((a) => String(a.id) === slug)
        if (article) {
          setData({
            _id: String(article.id),
            title: article.title,
            slug: String(article.id),
            date: article.date,
            category: article.category,
            legacyHtml: article.content,
            _static: true,
            _staticImage: article.image,
          })
        }
      })
      .finally(() => setLoading(false))
  }, [slug])

  return { data, loading, error }
}

// ─── Projects ───

export function useProjects(): UseSanityResult<any[]> & { data: any[] } {
  const [data, setData] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!isSanityConfigured()) {
      setData(
        staticProjects.map((p) => ({
          _id: p.id,
          client: p.client,
          slug: p.id,
          title: p.title,
          category: p.category,
          year: p.year,
          isInternal: p.isInternal,
          _static: true,
          _staticImage: p.image,
          _staticCoverImage: p.coverImage,
        }))
      )
      setLoading(false)
      return
    }

    getProjects()
      .then((result) => {
        if (result && result.length > 0) {
          setData(result)
        } else {
          setData(
            staticProjects.map((p) => ({
              _id: p.id,
              client: p.client,
              slug: p.id,
              title: p.title,
              category: p.category,
              year: p.year,
              isInternal: p.isInternal,
              _static: true,
              _staticImage: p.image,
              _staticCoverImage: p.coverImage,
            }))
          )
        }
      })
      .catch((err) => {
        setError(err)
        setData(
          staticProjects.map((p) => ({
            _id: p.id,
            client: p.client,
            slug: p.id,
            title: p.title,
            category: p.category,
            year: p.year,
            isInternal: p.isInternal,
            _static: true,
            _staticImage: p.image,
            _staticCoverImage: p.coverImage,
          }))
        )
      })
      .finally(() => setLoading(false))
  }, [])

  return { data: data || [], loading, error }
}

export function useProject(slug: string): UseSanityResult<any> {
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!isSanityConfigured()) {
      const project = staticProjects.find((p) => p.id === slug)
      if (project) {
        setData({ ...project, _static: true, slug: project.id })
      }
      setLoading(false)
      return
    }

    getProjectBySlug(slug)
      .then((result) => {
        if (result) {
          setData(result)
        } else {
          const project = staticProjects.find((p) => p.id === slug)
          if (project) {
            setData({ ...project, _static: true, slug: project.id })
          }
        }
      })
      .catch((err) => {
        setError(err)
        const project = staticProjects.find((p) => p.id === slug)
        if (project) {
          setData({ ...project, _static: true, slug: project.id })
        }
      })
      .finally(() => setLoading(false))
  }, [slug])

  return { data, loading, error }
}

// ─── Image resolver ───
// Returns a URL string for either a Sanity image object or a static fallback path

export function resolveImage(
  sanityImage: any,
  staticFallback: string | undefined,
  options?: { width?: number; height?: number; quality?: number }
): string {
  if (sanityImage && sanityImage.asset) {
    let builder = urlFor(sanityImage)
    if (options?.width) builder = builder.width(options.width)
    if (options?.height) builder = builder.height(options.height)
    if (options?.quality) builder = builder.quality(options.quality)
    return builder.url()
  }
  return staticFallback || ''
}
