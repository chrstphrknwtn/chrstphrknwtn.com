import { ReactNode, ComponentPropsWithoutRef, ElementType } from 'react'
import './grid.css'

type Props<T extends ElementType> = {
  as?: T
  children?: ReactNode
  className?: string
} & ComponentPropsWithoutRef<T>

const Grid = <T extends React.ElementType>({
  as,
  children,
  className = ''
}: Props<T>) => {
  const Component = as || 'main'
  const classList = `grid lines ${className}`.trim()
  return <Component className={classList}>{children}</Component>
}

export default Grid
