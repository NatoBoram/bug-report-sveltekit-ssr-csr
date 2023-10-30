# Bug with `adapter-static` and `+page.server.ts` / `+layout.server.ts`

The goal of this demo is to obtain a cookie named `locale`, either in the server or the client, and pass it to the page while supporting both `@sveltejs/adapter-node` and `@sveltejs/adapter-static`.

- `+page.server.ts`

```ts
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const locale = cookies.get('locale');
	return { locale };
}) satisfies PageServerLoad;
```

- `+page.ts`

```ts
import { browser } from '$app/environment';
import cookie from 'cookie';
import type { PageLoad } from './$types';

export const load = (({ data }) => {
	if (browser)
		return {
			locale: cookie.parse(document.cookie)['locale'],
			from: 'browser'
		};

	return {
		locale: data.locale,
		from: 'server'
	};
}) satisfies PageLoad;
```

- `+page.svelte`

```svelte
<script lang="ts">
	import cookie from 'cookie';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<p><code>locale</code> cookie: <code>{data.locale}</code></p>

<p><code>locale</code> obtained from: <strong>{data.from}</strong></p>
```

## Run the demo

```sh
git clone https://github.com/NatoBoram/bug-report-sveltekit-ssr-csr.git
cd bug-report-sveltekit-ssr-csr
pnpm i

# SSR - It works
pnpm dev

# PWA - It doesn't work
pnpm build
pnpx http-server ./build

# PWA - How it should work
find src/routes -name '+*.server.*' -delete
pnpm build
http-server ./build
git checkout -- 'src/routes/+*.server.*'
```

![image](https://github.com/NatoBoram/bug-report-sveltekit-ssr-csr/assets/10495562/77a0eea5-1930-425e-84cf-6cfcad434e3c)
