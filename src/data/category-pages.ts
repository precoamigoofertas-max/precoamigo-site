/** Páginas estáticas (money pages) exibidas nos hubs de categoria */
export type StaticCategoryPage = {
	title: string;
	href: string;
	image: string;
	badge: string;
	description: string;
	dateLabel?: string;
};

export const staticCategoryPages: Record<string, StaticCategoryPage[]> = {
	casa: [
		{
			title: 'Como Fazer Parede de Cimento Queimado Gastando Pouco',
			href: '/categorias/casa/cimento-queimado',
			image: '/cimento-queimado.jpg',
			badge: 'Faça Você Mesmo',
			description:
				'Transforme sua sala em um único fim de semana com este kit completo Faça Você Mesmo por menos de R$ 170.',
			dateLabel: 'Atualizado hoje',
		},
	],
	tecnologia: [],
	achadinhos: [],
	automotivo: [],
};
