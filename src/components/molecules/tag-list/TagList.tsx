import { ReactElement } from 'react'
import { TagElement } from '../../atoms/tag/Tag'
import styles from './TagList.module.css'

type TagListProps = {
  children: Array<TagElement>
}

export function TagList({ children }: TagListProps): ReactElement {
  return (
    <ul className={styles.list}>
      {children.map((child, index) => (
        <li key={child.key ?? index}>{child}</li>
      ))}
    </ul>
  )
}
