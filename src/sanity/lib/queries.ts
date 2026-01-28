import { groq } from 'next-sanity'

export const projectsQuery = groq`*[_type == "project"] | order(year desc) {
  "id": _id,
  title,
  "slug": slug.current,
  category,
  location,
  year,
  description,
  "image": mainImage.asset->url,
  stats[] {
    label,
    value
  }
}`

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  "id": _id,
  title,
  "slug": slug.current,
  category,
  location,
  year,
  description,
  "image": mainImage.asset->url,
  stats[] {
    label,
    value
  }
}`
