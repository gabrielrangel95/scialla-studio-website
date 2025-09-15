import { defineField, defineType } from 'sanity'
import { MapPinIcon } from 'lucide-react'

export default defineType({
  name: 'city',
  title: 'City',
  type: 'document',
  icon: MapPinIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'City Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly version of the city name (e.g., "orlando", "tampa", "nyc", "los-angeles")',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Main image for the city landing page',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        }
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of interior design services in this city',
      rows: 4,
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'clientName',
              title: 'Client Name',
              type: 'string',
            },
            {
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 3,
            },
            {
              name: 'rating',
              title: 'Rating',
              type: 'number',
              options: {
                list: [
                  { title: '5 Stars', value: 5 },
                  { title: '4 Stars', value: 4 },
                  { title: '3 Stars', value: 3 },
                  { title: '2 Stars', value: 2 },
                  { title: '1 Star', value: 1 },
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Meta Title',
          type: 'string',
          description: 'Title that appears in search results',
        },
        {
          name: 'description',
          title: 'Meta Description',
          type: 'text',
          description: 'Description that appears in search results',
          rows: 3,
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'SEO keywords for this city',
        },
        {
          name: 'ogImage',
          title: 'Social Media Image',
          type: 'image',
          description: 'Image used when sharing on social media',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'heroImage',
    },
  },
})