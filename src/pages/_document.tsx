import { Html, Head, Main, NextScript } from 'next/document'
import fs from 'fs'
import path from 'path'
import { getAllProjectSlugs } from 'utils/markdownUtils'

// Walk src/pages at build time and collect the canonical route casings for
// every static page, skipping special files (_app, _document, 404) and
// dynamic routes (e.g. [slug]). Runs in Node during the static export.
function collectStaticRoutes(dir: string, baseRoute = ''): string[] {
  const routes: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const { name } = entry;
    if (entry.isDirectory()) {
      routes.push(...collectStaticRoutes(path.join(dir, name), `${baseRoute}/${name}`));
      continue;
    }
    const ext = path.extname(name);
    if (!['.tsx', '.ts', '.jsx', '.js'].includes(ext)) continue;
    const base = name.slice(0, -ext.length);
    if (base.startsWith('_') || base === '404' || base.includes('[')) continue;
    routes.push(base === 'index' ? baseRoute || '/' : `${baseRoute}/${base}`);
  }
  return routes;
}

// Canonical /projects/<slug> routes, derived from the same source of truth as
// the static page build (getAllProjectSlugs), so dynamic project pages get the
// same case-insensitive resolution as static pages.
const STATIC_ROUTES = [
  ...collectStaticRoutes(path.join(process.cwd(), 'src', 'pages')),
  ...getAllProjectSlugs().map((slug) => `/projects/${slug}`),
];

// Runs synchronously during HTML parsing, before the body paints, so a
// mis-cased URL is redirected to its canonical route without ever showing
// the 404 page. The route list is generated from the pages directory and the
// project markdown files above, covering both static and dynamic routes.
const caseInsensitiveRedirect = `
(function () {
  var routes = ${JSON.stringify(STATIC_ROUTES)};
  var p = location.pathname.replace(/\\/+$/, '') || '/';
  if (routes.indexOf(p) !== -1) return;
  for (var i = 0; i < routes.length; i++) {
    if (routes[i].toLowerCase() === p.toLowerCase()) {
      location.replace(routes[i] + location.search + location.hash);
      return;
    }
  }
})();
`;

export default function Document() {
  return (
    <Html>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: caseInsensitiveRedirect }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}