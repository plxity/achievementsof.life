import React from 'react';
import styles from './InfoHeader.module.css';
// import TwitterIcon from '/twitter.svg';
// import GitHubIcon from '/GitHub.svg';
export default function InfoHeader({ name = '', github = '', twitter = '', peerlist= '' }) {
  return (
    <div className={styles['info-container']}>
      <h1 className={styles['title']}>{name}</h1>
      <div className={styles['icon-container']}>
        {twitter && (
          <a href={twitter}>
            <img
              src="/twitter.svg"
              alt="twitter-icon"
              className={styles['social-icon']}
            />
          </a>
        )}
        {github && (
          <a href={github}>
            <img
              src="/github.svg"
              alt="github-icon"
              className={styles['social-icon']}
            />
          </a>
        )}
        {peerlist && (
          <a href={peerlist}>
            <img
              src="/peerlist.svg"
              alt="peerlist-icon"
              className={styles['social-icon']}
            />
          </a>
        )}
      </div>
    </div>
  );
}
