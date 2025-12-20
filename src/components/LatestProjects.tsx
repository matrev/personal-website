import React from 'react';
import Link from 'next/link';
import styles from 'styles/LatestProjects.module.css';

interface LatestProjectsProps {
  items: {
    slug: string;
    data: {
      title: string;
      subtitle?: string;
      date: string;
      source?: string;
    };
  }[];
}

const LatestProjects: React.FC<LatestProjectsProps> = ({ items }) => {
  const displayItems = items.slice(0, 3); // Show first three items

  if (displayItems.length === 0) {
    return <div>No projects available</div>;
  }

  return (
    <div className={styles.latestProjectsContainer}>
      {displayItems.map((item) => (
        <div key={item.slug} className={styles.card}>
          <h3>{item.data.title}</h3>
          {item.data.subtitle && <p>{item.data.subtitle}</p>}
          <Link href={`/projects/${item.slug}`} className={styles.readMore}>
            Read more
          </Link>
          {item.data.source && (
            <Link href={item.data.source} target="_blank" rel="noopener noreferrer" className={styles.source}>
              Source
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default LatestProjects;