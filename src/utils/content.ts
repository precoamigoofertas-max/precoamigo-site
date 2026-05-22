import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;
export type Oferta = CollectionEntry<'ofertas'>;

export async function getPublishedPosts(): Promise<BlogPost[]> {
	const posts = await getCollection('blog');
	return posts
		.filter((post) => !post.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
	const posts = await getPublishedPosts();
	return posts.filter((post) => post.data.category === category);
}

export function getPostUrl(post: BlogPost): string {
	if (!post.data.category) {
		return `/blog/${post.id}/`;
	}
	return `/categorias/${post.data.category}/${post.id}/`;
}

export async function getActiveOfertas(): Promise<Oferta[]> {
	const ofertas = await getCollection('ofertas');
	const now = Date.now();
	return ofertas
		.filter((o) => !o.data.validUntil || o.data.validUntil.valueOf() >= now)
		.sort((a, b) => a.data.order - b.data.order);
}

export async function getFeaturedOfertas(limit = 6): Promise<Oferta[]> {
	const active = await getActiveOfertas();
	return active.filter((o) => o.data.featured).slice(0, limit);
}
