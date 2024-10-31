// pages/api/fetch-links.js
import puppeteer from 'puppeteer'

export const POST = async (req) => {
  const { url } = await req.json()

  if (!url) {
    return new Response('URL is required', { status: 400 })
  }

  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'domcontentloaded' })

    // Extract links from the page
    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a'))
        .map((link) => link.href)
        .filter(
          (href) =>
            href && !href.startsWith('#') && !href.startsWith('javascript:'),
        )
    })

    await browser.close()
    return new Response(JSON.stringify({ links }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new Response('Failed to fetch or process the URL.', { status: 500 })
  }
}
