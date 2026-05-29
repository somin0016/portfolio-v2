import { defineCollection, z } from 'astro:content';

const project = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
    year: z.number(),
		index: z.number().optional(),
		background: z.string(),
		heroImage: z.string().optional(),
		skills: z.array(z.string()).optional(),
		links: z
			.array(
				z.object({
					name: z.string(),
					url: z.string(),
				})
			)
			.optional(),
	}),
});

export const collections = { project };
