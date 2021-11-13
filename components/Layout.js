import React from 'react';
import styles from './content.module.css';
export default function Layout({ children }) {
  return <div className={styles['user-container']}>{children}</div>;
}
