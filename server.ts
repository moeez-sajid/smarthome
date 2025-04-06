import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import axios from 'axios';
import AppServerModule from './src/main.server';
import { environment } from './src/environments/environment';

// Global cache for blog posts
let cachedPosts: any = [];

// Function to fetch and cache blog posts
async function fetchAndCachePosts() {
  try {
    const response = await axios.get(`${environment.apiUrl}/blogs`);
    cachedPosts = response.data.blogs;
    console.log(`Successfully cached ${cachedPosts.length} blog posts`);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    cachedPosts = []; // Reset cache on error
  }
}

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Robots.txt route
  server.get('/robots.txt', (req, res) => {
    const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /search/
Disallow: /auth/

Sitemap: ${environment.baseUrl}/sitemap.xml`;

    res.set('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });

  // Sitemap route
  server.get('/sitemap.xml', (req, res) => {
    // Start XML structure
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Add homepage
    xml += '  <url>\n';
    xml += `    <loc>${environment.baseUrl}</loc>\n`;
    xml += '    <changefreq>daily</changefreq>\n';
    xml += '  </url>\n';
    
    // Add blog posts if they exist and are in the correct format
    if (Array.isArray(cachedPosts)) {
      cachedPosts.forEach(post => {
        if (post && typeof post === 'object' && post.slug) {
          xml += '  <url>\n';
          xml += `    <loc>${environment.baseUrl}/blog/${post.slug}</loc>\n`;
          if (post.updatedAt) {
            xml += `    <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>\n`;
          }
          xml += '    <changefreq>weekly</changefreq>\n';
          xml += '  </url>\n';
        }
      });
    } else {
      console.warn('cachedPosts is not an array:', cachedPosts);
    }
    
    xml += '</urlset>';
    
    res.set('Content-Type', 'application/xml');
    res.send(xml);
  });

  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Fetch posts before starting the server
  fetchAndCachePosts()
    .then(() => {
      // Start up the Node server
      const server = app();
      server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
      });
    })
    .catch(error => {
      console.error('Failed to start server:', error);
      process.exit(1);
    });
}

run();
