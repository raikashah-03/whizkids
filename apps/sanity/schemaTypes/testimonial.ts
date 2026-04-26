import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorImage',
      title: 'Author Image',
      type: 'image',
      description: 'Not mandatory',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stars',
      title: 'Number of Stars',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'message',
      media: 'authorImage',
    },
  },
})
