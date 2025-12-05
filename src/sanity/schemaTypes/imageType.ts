import { defineField, defineType } from 'sanity'

export const imageType = defineType({
  name: 'galleryImage', // <--- Renamed this from 'image'
  title: 'Gallery Image', // <--- Updated title for clarity
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required().max(100),
      description: 'Image title displayed in gallery',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
      description: 'URL-friendly identifier for the image',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      validation: (rule) => rule.max(500),
      description: 'Detailed description of the image',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image Asset',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
      description: 'The main image file',
    }),
    defineField({
      name: 'width',
      type: 'number',
      title: 'Image Width (px)',
      validation: (rule) => rule.required().positive(),
      description: 'Width of the image in pixels',
    }),
    defineField({
      name: 'height',
      type: 'number',
      title: 'Image Height (px)',
      validation: (rule) => rule.required().positive(),
      description: 'Height of the image in pixels',
    }),
    defineField({
      name: 'fileSize',
      type: 'number',
      title: 'File Size (bytes)',
      validation: (rule) => rule.required().positive(),
      description: 'Size of the image file in bytes',
    }),
    // defineField({
    //   name: 'uploadedBy',
    //   type: 'reference',
    //   title: 'Uploaded By',
    //   to: [{ type: 'user' }],
    //   validation: (rule) => rule.required(),
    //   description: 'User who uploaded this image',
    // }),
    defineField({
      name: 'isPublished',
      type: 'boolean',
      title: 'Is Published',
      initialValue: true,
      description: 'Mark as published to make visible in gallery',
    }),
    defineField({
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
      description: 'Timestamp when image was created',
    }),
    defineField({
      name: 'updatedAt',
      type: 'datetime',
      title: 'Updated At',
      initialValue: () => new Date().toISOString(),
      description: 'Timestamp when image was last updated',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Untitled',
        media: selection.media,
      }
    },
  },
})
