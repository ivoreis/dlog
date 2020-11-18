import clsx from 'clsx'
import styles from './style.module.css'

export interface GridProps {
  color?: string
  size?: number
  className?: string
  style?: object
}

const Grid = ({ color = '#3182ce', className = '', style = {} }: GridProps) => (
  <div
    className={clsx(
      styles['spinners-grid'],
      'inline-block relative',
      className,
    )}
    style={{ ...style }}
  >
    {[...Array(9)].map((_, index) => (
      <div key={index.toString()} style={{ background: `${color}` }} />
    ))}
  </div>
)

export default Grid
