import Link from 'next/link'

const GoToButton = ({ goTo }) => {
  return (
    <div>
      <Link href={goTo} className="btn btn-primary">
        GoToButton - {goTo}
      </Link>
    </div>
  )
}

export default GoToButton
