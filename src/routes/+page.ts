import cookie from 'cookie';
import type { PageLoad } from './$types';
import { browser } from '$app/environment';

export const load = (({ data }) => {
	if (browser) return { locale: cookie.parse(document.cookie)['locale'], from: 'browser' };

	return { locale: data.locale, from: 'server' };
}) satisfies PageLoad;
