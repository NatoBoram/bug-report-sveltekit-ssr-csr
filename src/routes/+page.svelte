<script lang="ts">
	import cookie from 'cookie';
	import type { PageData } from './$types';

	export let data: PageData;

	function setLocaleCookie() {
		const localeCookie = cookie.serialize('locale', 'fr', {
			domain: location.hostname,
			path: '/',
			sameSite: true,
			secure: location.protocol === 'https:'
		});
		console.log('Saving cookie:', localeCookie);
		document.cookie = localeCookie;
	}
</script>

<p><code>locale</code> cookie: <code>{data.locale}</code></p>

<p><code>locale</code> obtained from: <strong>{data.from}</strong></p>

<button on:click={setLocaleCookie}>Set <code>locale</code> cookie</button>
