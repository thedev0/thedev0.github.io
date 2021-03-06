workbox.core.setCacheNameDetails({ prefix: 'folio' });

workbox.skipWaiting();
workbox.clientsClaim();

workbox.precaching.suppressWarnings();

/**
 * Ignore the non-important files added as a result of
 * webpack's publicPath thingy, for now...
 */
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
workbox.precaching.precacheAndRoute(
	self.__precacheManifest.filter(
		m =>
			!m.url.startsWith('bundles/') &&
			!m.url.startsWith('static/commons') &&
			m.url !== 'build-manifest.json'
	),
	{}
);

workbox.routing.registerRoute(
	/[.](png|jpg|css)/,
	workbox.strategies.cacheFirst({
		cacheName: 'assets-cache',
		cacheableResponse: {
			statuses: [0, 200]
		}
	}),
	'GET'
);

workbox.routing.registerRoute(
	/^http.*/,
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'http-cache'
	}),
	'GET'
);
