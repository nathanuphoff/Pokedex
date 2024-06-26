import classNames from 'classnames';
import type { CSSProperties, ReactElement, ReactNode } from 'react';
import styles from './Tag.module.css';

export type TagElement = ReactElement<TagProps>;

type TagProps = {
  children: ReactNode;
  hue?: number;
  className?: string;
};

export function Tag({ children, className, hue = 10 }: TagProps): ReactElement {
  return (
    <span
      style={{ '--hue': hue } as CSSProperties}
      className={classNames(styles.tag, className)}
    >
      {children}
    </span>
  );
}
