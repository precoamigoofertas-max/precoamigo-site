import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const categories = ['casa', 'tecnologia', 'achadinhos', 'automotivo'] as const;

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			category: z.enum(categories),
			draft: z.boolean().default(false),
		}),
});

const ofertas = defineCollection({
	loader: glob({ base: './src/content/ofertas', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		image: z.string(),
		price: z.string(),
		link: z.string().url(),
		validUntil: z.coerce.date().optional(),
		featured: z.boolean().default(true),
		order: z.number().default(0),
	}),
});

export const collections = { blog, ofertas };
