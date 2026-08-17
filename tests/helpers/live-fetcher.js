const { JSDOM } = require('jsdom');

const MAX_HTML_BYTES = 2 * 1024 * 1024;
const MAX_RESOURCE_FETCHES = 20;

async function fetchText(url) {
  const response = await fetch(url, {
    redirect: 'follow',
    signal: AbortSignal.timeout(15000),
    headers: { 'user-agent': 'Shopify-Dev-Inspector-Validation/1.0' }
  });
  const text = (await response.text()).slice(0, MAX_HTML_BYTES);
  return { url: response.url, status: response.status, ok: response.ok, text };
}

async function fetchLivePage(url) {
  const page = await fetchText(url);
  if (!page.ok) {
    return { ...page, resources: [] };
  }

  const dom = new JSDOM(page.text, { url: page.url });
  const urls = Array.from(dom.window.document.querySelectorAll('[src], link[href]'), (element) => element.src || element.href)
    .filter(Boolean)
    .slice(0, MAX_RESOURCE_FETCHES);
  dom.window.close();

  const resources = await Promise.all(urls.map(async (resourceUrl) => {
    try {
      const response = await fetch(resourceUrl, {
        method: 'GET',
        redirect: 'follow',
        signal: AbortSignal.timeout(10000),
        headers: { 'user-agent': 'Shopify-Dev-Inspector-Validation/1.0' }
      });
      return { url: resourceUrl, status: response.status, ok: response.ok };
    } catch (error) {
      return { url: resourceUrl, ok: false, error: error.message };
    }
  }));

  return { ...page, resources };
}

module.exports = { fetchLivePage };
