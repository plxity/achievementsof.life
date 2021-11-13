import React from 'react';
import styles from './AchievementCard.module.css';
function createMarkup(content) {
  return { __html: content };
}
export default function AchievementCard({ content = '' }) {
  return (
    <div
      className={styles['card']}
      dangerouslySetInnerHTML={createMarkup(content)}
    />
  );
}
