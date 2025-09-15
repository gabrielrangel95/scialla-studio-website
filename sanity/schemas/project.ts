import { defineField, defineType } from 'sanity'
import { HomeIcon } from 'lucide-react'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly version of the project title',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: { type: 'city' },
      description: 'Which city is this project located in?',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Kitchen Design', value: 'kitchen-design' },
          { title: 'Bathroom Design', value: 'bathroom-design' },
          { title: 'Living Room', value: 'living-room' },
          { title: 'Bedroom', value: 'bedroom' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Full Home', value: 'full-home' },
          { title: 'Luxury', value: 'luxury' },
          { title: 'Modern', value: 'modern' },
          { title: 'Traditional', value: 'traditional' },
        ],
      },
      validation: Rule => Rule.min(1).required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Main image used in portfolio grid and project header',
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
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      description: 'Additional images for the project gallery',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption for the image',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'blockContent',
      description: 'Detailed description of the project',
    }),
    defineField({
      name: 'completionDate',
      title: 'Completion Date',
      type: 'date',
      description: 'When was this project completed?',
    }),
    defineField({
      name: 'client',
      title: 'Client Information',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Client Name',
          type: 'string',
          description: 'Can be left empty for privacy',
        },
        {
          name: 'testimonial',
          title: 'Client Testimonial',
          type: 'text',
          rows: 4,
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
    }),
    defineField({
      name: 'projectDetails',
      title: 'Project Details',
      type: 'object',
      fields: [
        {
          name: 'duration',
          title: 'Project Duration',
          type: 'string',
          description: 'e.g., "3 months", "6 weeks"',
        },
        {
          name: 'budget',
          title: 'Budget Range',
          type: 'string',
          options: {
            list: [
              { title: 'Under $50k', value: 'under-50k' },
              { title: '$50k - $100k', value: '50k-100k' },
              { title: '$100k - $250k', value: '100k-250k' },
              { title: '$250k+', value: '250k-plus' },
            ],
          },
        },
        {
          name: 'squareFootage',
          title: 'Square Footage',
          type: 'number',
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
          description: 'SEO keywords for this project',
        },
        {
          name: 'ogImage',
          title: 'Social Media Image',
          type: 'image',
          description: 'Image used when sharing on social media (defaults to featured image)',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      location: 'location.name',
      media: 'featuredImage',
    },
    prepare(selection) {
      const { title, location } = selection
      return Object.assign({}, selection, {
        subtitle: location ? `${location}` : 'No location set',
      })
    },
  },
})