import classNames from 'classnames';
import { ReactElement } from 'react';
import styles from './PageSection.module.css';

export type PageSectionTag = 'section' | 'header' | 'footer';

type PageSectionProps = {
  children: ReactElement | Array<ReactElement>;
  as?: PageSectionTag;
  className?: string;
};

export function PageSection({
  children,
  as: Tag = 'section',
  className,
}: PageSectionProps): ReactElement {
  return (
    <Tag className={classNames(className)}>
      <div className={styles.wrapper}>{children}</div>
    </Tag>
  );
}
