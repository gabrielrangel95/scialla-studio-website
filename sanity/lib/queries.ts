import { groq } from 'next-sanity'

// Get all projects with basic info
export const projectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    "location": location->{name, slug},
    category,
    featuredImage,
    description,
    completionDate,
    seo
  }
`

// Get single project by slug
export const projectQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    slug,
    "location": location->{name, slug},
    category,
    featuredImage,
    gallery,
    description,
    completionDate,
    seo
  }
`

// Get projects by city
export const projectsByCityQuery = groq`
  *[_type == "project" && location->slug.current == $city] | order(_createdAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    "location": location->{name, slug},
    category,
    featuredImage,
    description,
    completionDate
  }
`

// Get all cities
export const citiesQuery = groq`
  *[_type == "city"] | order(name asc) {
    _id,
    name,
    slug,
    heroImage,
    description,
    testimonials
  }
`

// Get single city by slug
export const cityQuery = groq`
  *[_type == "city" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    heroImage,
    description,
    testimonials,
    "projects": *[_type == "project" && location._ref == ^._id] | order(_createdAt desc) [0...6] {
      _id,
      title,
      slug,
      featuredImage,
      category
    }
  }
`

// Get latest projects for homepage
export const latestProjectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) [0...6] {
    _id,
    _createdAt,
    title,
    slug,
    "location": location->{name, slug},
    category,
    featuredImage,
    completionDate
  }
`