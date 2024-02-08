import { z, defineCollection, type ImageFunction } from 'astro:content';

const seoSchema = (image: ImageFunction) => z.object({
  title: z.string(),
  description: z.string(),
  type: z.string().optional(),
  image: image().refine((img) => img.width >= 1080, {
    message: 'OG image must be at least 1080 pixels wide!',
  }).optional(),
  keywords: z.string().optional(),
});

const workCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    company: z.string(),
    title: z.string(),
    color: z.string().optional(),
    images: z.array(image().refine((img) => img.width >= 560, {
      message: 'Image must be at least 560 pixels wide!',
    })).optional(),
    year: z.number(),
    services: z.array(z.string()).optional(),
    liveUri: z.string().optional(),
    seo: seoSchema(image),
  }),
});

const postCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    featuredImage: image().refine((img) => img.width >= 1080, {
      message: 'Image must be at least 1080 pixels wide!',
    }).optional(),
    publishedAt: z.date(),
    tags: z.array(z.string()).optional(),
    seo: seoSchema(image),
  }),
});

export const collections = {
  work: workCollection,
  posts: postCollection,
};