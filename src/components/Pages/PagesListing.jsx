import { decode } from 'html-entities'
import Link from 'next/link'

const PagesListing = ({ pages }) => {
  return (
    <div>
      {Array.isArray(pages) &&
        pages.map((page) => {
          // console.log(page, 'page')
          return (
            <Link
              key={page.id}
              className=" cursor-pointer"
              href={`/pages/${page.slug}`}
            >
              <h2>{decode(page.title.rendered)}</h2>
            </Link>
          )
        })}
    </div>
  )
}

export default PagesListing
