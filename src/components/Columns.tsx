import { FC } from 'react'
import clsx from 'clsx'

const Columns: FC<{ className?: string }> = ({ children, className }) => {
  return <div className={clsx('grid', className)}>{children}</div>
}

export default Columns
