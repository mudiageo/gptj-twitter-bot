import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';
import { Server } from 'socket.io';
import injectSocketIO from './socket-handler.js';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$stores: path.resolve('./src/stores')
				}
			},
			plugins: [
				{
					name: 'sveltekit-socket-io­',
					configureServer(server) {
						injectSocketIO(server.httpServer);
					}
				}
			]
		},

		files: {
			serviceWorker: 'src/service-worker'
		}
	}
};

export default config;
