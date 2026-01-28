import { defineField, defineType } from 'sanity'

export const projectType = defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'category',
            type: 'string',
            options: {
                list: [
                    { title: 'Infrastructure', value: 'Infrastructure' },
                    { title: 'High-Rise', value: 'High-Rise' },
                    { title: 'Industrial', value: 'Industrial' },
                    { title: 'Residential', value: 'Residential' },
                ],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'location',
            type: 'string',
        }),
        defineField({
            name: 'year',
            type: 'string',
        }),
        defineField({
            name: 'description',
            type: 'text',
        }),
        defineField({
            name: 'mainImage',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'stats',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'stat',
                    fields: [
                        { name: 'label', type: 'string' },
                        { name: 'value', type: 'string' },
                    ],
                },
            ],
        }),
    ],
})
