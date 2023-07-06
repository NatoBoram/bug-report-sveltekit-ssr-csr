import adapterAuto from '@sveltejs/adapter-auto';
import adapterNode from '@sveltejs/adapter-node';
import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { loadEnv } from 'vite';

/** @type {{BUILD_ADAPTER: "static" | "node" | undefined, BUILD_BASE: string | undefined}} */
const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), 'BUILD_');

/** @returns {import('@sveltejs/kit').Adapter} */
function adapter() {
	if (env.BUILD_ADAPTER === 'node') return adapterNode();
	else if (env.BUILD_ADAPTER === 'static') return adapterStatic({ fallback: '404.html' });
	else if (process.env.GITHUB_ACTIONS) return adapterStatic({ fallback: '404.html' });
	return adapterAuto();
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
