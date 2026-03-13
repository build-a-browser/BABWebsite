import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const steps = defineCollection({
	loader: glob({ base: './src/content/steps', pattern: '*.md' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		status: z.enum(['Draft', 'Stub']).optional(),
		"next-step": z.string().optional(),
		hashes: z.object({
			predraft: z.string().optional(),
			draft: z.string().optional(),
			release: z.string().optional()
		}).optional(),
		examples: z.array(z.string()).optional(),
		"wpt-pages": z.array(z.string()).optional()
	}),
});

export const collections = { steps };
