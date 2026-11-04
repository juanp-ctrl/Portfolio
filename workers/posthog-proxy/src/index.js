// Reverse proxy for PostHog (US cloud) so analytics requests are served
// from a first-party subdomain and aren't dropped by ad blockers.
// Based on https://posthog.com/docs/advanced/proxy/cloudflare

const API_HOST = 'us.i.posthog.com'
const ASSET_HOST = 'us-assets.i.posthog.com'

async function handleRequest(request, ctx) {
  const url = new URL(request.url)
  const pathWithParams = url.pathname + url.search

  if (
    url.pathname.startsWith('/static/') ||
    url.pathname.startsWith('/array/')
  ) {
    return retrieveStatic(request, pathWithParams, ctx)
  }
  return forwardRequest(request, pathWithParams)
}

async function retrieveStatic(request, pathname, ctx) {
  let response = await caches.default.match(request)
  if (!response) {
    response = await fetch(`https://${ASSET_HOST}${pathname}`)
    ctx.waitUntil(caches.default.put(request, response.clone()))
  }
  return response
}

async function forwardRequest(request, pathWithSearch) {
  const ip = request.headers.get('CF-Connecting-IP') || ''
  const headers = new Headers(request.headers)
  headers.delete('cookie')
  headers.set('X-Forwarded-For', ip)

  const auth = headers.get('authorization')
  if (auth && !/^Bearer (phc_|phs_|phx_)/.test(auth)) {
    headers.delete('authorization')
  }

  const hasBody = !['GET', 'HEAD'].includes(request.method)
  const originRequest = new Request(`https://${API_HOST}${pathWithSearch}`, {
    method: request.method,
    headers,
    body: hasBody ? await request.arrayBuffer() : null,
    redirect: request.redirect,
  })

  return fetch(originRequest)
}

export default {
  async fetch(request, env, ctx) {
    return handleRequest(request, ctx)
  },
}
