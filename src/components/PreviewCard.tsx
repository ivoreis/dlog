import Image from 'next/image'
import Link from 'next/link'

export interface PreviewCardProps {
  type: 'deck' | 'blog'
  title: string
  description?: string
  date: string
  coverImage?: string
  url: string
}

const defaultImage =
  'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80'

const PreviewCard = (props: PreviewCardProps) => {
  const { title, description, date, coverImage, type, url } = props

  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div className="flex-shrink-0">
        <Image
          width={600}
          height={250}
          className="h-48 w-full object-cover"
          src={coverImage || defaultImage}
          alt={title}
        />
      </div>
      <div className="flex-1 bg-default transition duration-150 ease-in-out p-6 flex flex-col justify-between">
        <div className="flex-1">
          <div className="flex text-sm leading-5 font-medium">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-100 text-indigo-800">
              {type.toUpperCase()}
            </span>
            <span className="flex-1" />
            <time dateTime={date} className="text-xs text-default">
              {date}
            </time>
          </div>
          <Link href={url}>
            <a className="block">
              <h3 className="mt-2 text-xl leading-7 font-semibold text-default">
                {title}
              </h3>
              {description?.length ? (
                <p className="mt-3 text-base leading-6 text-default">
                  {description}
                </p>
              ) : null}
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PreviewCard
