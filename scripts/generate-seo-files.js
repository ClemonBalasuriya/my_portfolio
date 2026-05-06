const fs = require('fs')
const path = require('path')

const siteUrl = (
  process.env.SITE_URL ||
  process.env.REACT_APP_SITE_URL ||
  process.env.URL ||
  'http://localhost:3000'
).replace(/\/$/, '')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteUrl}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${siteUrl}/about</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${siteUrl}/portfolio</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>${siteUrl}/contact</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>${siteUrl}/dashboard</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
</urlset>
`

const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:

Sitemap: ${siteUrl}/sitemap.xml
`

const outputDir = path.join(__dirname, '..', 'build')

if (!fs.existsSync(outputDir)) {
  throw new Error('Build output directory not found. Run this script after the build step.')
}

fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemap)
fs.writeFileSync(path.join(outputDir, 'robots.txt'), robots)
