import { defineCollection, z } from 'astro:content';

const project = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
    year: z.number(),
		background: z.string(),
		heroImage: z.string().optional(),
	}),
});

export const collections = { project };
