import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Carousel.module.css';

interface CarouselProps {
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

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [items.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (items.length === 0) {
    return <div>No projects available</div>;
  }

  const currentItem = items[currentIndex];

  return (
    <div className={styles.carousel}>
      <div className={styles.carouselInner}>
        <div className={styles.slide}>
          <h3>{currentItem.data.title}</h3>
          {currentItem.data.subtitle && <p>{currentItem.data.subtitle}</p>}
          <p>Last Updated: {new Date(currentItem.data.date).toLocaleDateString()}</p>
          <Link href={`/projects/${currentItem.slug}`} className={styles.readMore}>
            Read more
          </Link>
          {currentItem.data.source && (
            <Link href={currentItem.data.source} target="_blank" rel="noopener noreferrer" className={styles.source}>
              Source
            </Link>
          )}
        </div>
      </div>
      <div className={styles.dots}>
        {items.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;