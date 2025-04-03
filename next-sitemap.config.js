/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.VERCEL_URL || process.env.SITE_URL || 'https://example.com',
    generateRobotsTxt: true, // (optional)
// ...other options
};
