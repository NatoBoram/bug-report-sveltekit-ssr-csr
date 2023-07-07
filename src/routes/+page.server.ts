import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const locale = cookies.get('locale');
	return { locale };
}) satisfies PageServerLoad;
