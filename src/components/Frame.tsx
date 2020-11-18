import { FC } from 'react'
import { Open } from '~/components/Icons'

export type FrameProps = {
  title?: string
  titleBar?: React.ReactNode
  zoom?: number
} & React.PropsWithoutRef<JSX.IntrinsicElements['div']>

export const FrameButtons: FC = () => {
  return (
    <div className="flex flex-shrink-0 mt-1 h-4 w-16">
      <div className="inline-block rounded-xl w-3 h-3 bg-red-500" />
      <div className="w-2" />
      <div className="inline-block rounded-xl w-3 h-3 bg-yellow-300" />
      <div className="w-2" />
      <div className="inline-block rounded-xl w-3 h-3 bg-green-500" />
    </div>
  )
}

export const UrlBar: FC<{ url: string; linkUrl: string }> = ({
  url,
  linkUrl,
}) => (
  <>
    <div className="flex flex-1 h-full items-center w-max-content pl-4">
      <FrameButtons />
      <div className="w-4" />
      <div className="flex w-full">
        <div className="flex w-3/4 bg-gray-100 px-2 mx-auto">
          <input
            value={linkUrl}
            readOnly
            className="p-1 bg-transparent flex-1 outline-none"
          />
          <Open href={url} className="bg-transparent" />
        </div>
      </div>
    </div>
  </>
)

export const DefaultTitleBar: FC<{ title?: string }> = ({ title }) => {
  return (
    <>
      <div className="flex flex-1 h-full items-center w-max-content pl-4">
        <FrameButtons />
      </div>
      <div
        className="overflow-hidden whitespace-nowrap text-lg text-default"
        style={{ textOverflow: 'ellipsis' }}
      >
        {title}
      </div>
      <div className="flex flex-1 h-full items-center w-max-content" />
    </>
  )
}

const Frame = ({
  title,
  children,
  titleBar,
  zoom = 1,
  ...props
}: FrameProps) => {
  const bar = titleBar || <DefaultTitleBar title={title} />
  return (
    <div
      className="flex flex-col bg-default rounded-md overflow-hidden shadow-2xl border-gray-50 border-2"
      style={{ height: 'max-content' }}
      {...props}
    >
      <div className="text-sm w-full h-10 flex-grow-0 flex-shrink-0 flex items-center border-b border-gray-50">
        {bar}
      </div>
      <div className="min-h-0 flex-grow flex-shrink bg-default">
        <div
          className="overflow-auto relative origin-top-left"
          style={
            {
              '--ch-frame-zoom': zoom,
              width: 'calc(100%/var(--ch-frame-zoom))',
              height: 'calc(100%/var(--ch-frame-zoom))',
              transform: 'scale(var(--ch-frame-zoom))',
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default Frame
