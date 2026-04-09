import { defineField, defineType, defineArrayMember } from 'sanity'

// Helper for bilingual fields
const localizedString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      { name: 'en', title: 'English', type: 'text', rows: 4 },
      { name: 'pl', title: 'Polish', type: 'text', rows: 4 },
    ],
  })

const localizedStringShort = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      { name: 'en', title: 'English', type: 'string' },
      { name: 'pl', title: 'Polish', type: 'string' },
    ],
  })

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Basic Info', default: true },
    { name: 'media', title: 'Media' },
    { name: 'narrative', title: 'Narrative' },
    { name: 'stats', title: 'Stats & Services' },
  ],
  fields: [
    // ─── Basic Info ───
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      group: 'basic',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: { source: 'client', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      group: 'basic',
      description: 'e.g. "System at Scale", "Market Communication"',
      validation: (rule) => rule.required(),
    }),
    localizedStringShort('category', 'Category'),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      group: 'basic',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isInternal',
      title: 'Internal Project',
      type: 'boolean',
      group: 'basic',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      group: 'basic',
      description: 'Lower = first. Used to control display order.',
    }),

    // ─── Media ───
    defineField({
      name: 'image',
      title: 'Card Image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      group: 'media',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
          ],
        }),
      ],
    }),

    // ─── Narrative ───
    localizedString('description', 'Description'),
    localizedString('challenge', 'Challenge'),
    localizedString('decisions', 'Key Decisions'),
    localizedString('approach', 'Approach'),
    localizedString('quote', 'Quote'),
    localizedString('outcome', 'Outcome'),
    localizedString('reflection', 'Reflection'),

    // ─── Stats & Services ───
    defineField({
      name: 'services',
      title: 'Services',
      type: 'object',
      group: 'stats',
      fields: [
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'pl',
          title: 'Polish',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      group: 'stats',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'value', type: 'string', title: 'Value' },
            {
              name: 'label',
              type: 'object',
              title: 'Label',
              fields: [
                { name: 'en', type: 'string', title: 'English' },
                { name: 'pl', type: 'string', title: 'Polish' },
              ],
            },
          ],
          preview: {
            select: { title: 'value', subtitle: 'label.en' },
          },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Year (newest)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'client',
      subtitle: 'title',
      media: 'image',
    },
  },
})
