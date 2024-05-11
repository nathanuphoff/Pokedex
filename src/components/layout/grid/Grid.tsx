import classNames from 'classnames';
import { CSSProperties, Children, type ReactElement } from 'react';
import styles from './Grid.module.css';

type GridProps = {
  children: ReactElement | Array<ReactElement>;
  className?: string;
  columnWidth?: number;
};

export function Grid({
  children,
  className,
  columnWidth = 128,
}: GridProps): ReactElement {
  const style = {
    '--column-width': `${columnWidth}px`,
  } as CSSProperties;

  return (
    <ul style={style} className={classNames(styles.grid, className)}>
      {Children.map(children, (child) => (
        <li className={styles.item} key={child.key}>
          {child}
        </li>
      ))}
    </ul>
  );
}
