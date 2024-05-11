import classNames from 'classnames';
import { ReactElement, ReactNode } from 'react';
import styles from './Heading.module.css';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingProps = {
  as?: HeadingTag;
  children: ReactNode;
  className?: string;
};

export function Heading({
  as: Tag = 'h1',
  children,
  className,
}: HeadingProps): ReactElement {
  return (
    <Tag className={classNames(styles.heading, className, styles[Tag])}>
      {children}
    </Tag>
  );
}
