/** @type {import('next-sitemap').IConfig} */
const sitemap = {
    siteUrl: process.env.NEXT_SITE_URL || 'https://vineelsai.com',
    generateRobotsTxt: true,
}

export default sitemap