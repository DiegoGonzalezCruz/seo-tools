import puppeteer from 'puppeteer'
import slug from 'slug'

export const POST = async (req) => {
  try {
    const response = await req.json()
    // console.log('response:', response)
    const { url, targetClass, userData } = response
    // console.log('url:', url)
    // console.log('targetClass:', targetClass)
    // console.log('userData:', userData)
    if (!url) {
      return new Response('URL is required', { status: 400 })
    }

    const browser = await puppeteer.launch({
      headless: 'new',
    })
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle2' })

    let content
    const parsedUrl = new URL(url)
    let urlSlug = parsedUrl.pathname.split('/').filter(Boolean).pop()
    urlSlug = urlSlug.replace(/[^a-zA-Z0-9-_]/g, '_')

    // Extract the date from the <em> tag if present
    const dateText = await page.evaluate(() => {
      const emTag = document.querySelector('em')
      return emTag ? emTag.textContent : null
    })

    // Construct the filename with the dates if they exist
    let filename = `${urlSlug}-${slug(dateText || '')}`

    if (targetClass) {
      content = await page.evaluate((targetClass) => {
        const element = document.querySelector(`.${targetClass}`)
        return element ? element.outerHTML : ''
      }, targetClass)

      if (!content) {
        await browser.close()
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Specified content not found',
          }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          },
        )
      }

      await page.setContent(content, { waitUntil: 'domcontentloaded' })
    } else {
      content = await page.content()
    }

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    })

    await browser.close()

    const pdfBase64 = pdfBuffer.toString('base64')

    // return new Response(
    //   JSON.stringify({
    //     filename: `${filename}.pdf`,
    //     pdfBase64,
    //   }),
    //   {
    //     status: 200,
    //     headers: { 'Content-Type': 'application/json' },
    //   },
    // )
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}.pdf"`,
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return new Response('Error generating PDF', { status: 500 })
  }
}
