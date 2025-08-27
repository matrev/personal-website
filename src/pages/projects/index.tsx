import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import Link from 'next/link'
import { ProjectPreview, getProjectPreviews } from 'utils/markdownUtils';
import styles from 'styles/Projects.module.css';

export const getStaticProps = (async () => {
  const projectPreviews = await getProjectPreviews();
  return { props: { projectPreviews } }
}) satisfies GetStaticProps<{
  projectPreviews: ProjectPreview[]
}>

export default function ProjectPage({
  projectPreviews,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  return <>
    <h1>Projects</h1>
    <div className={styles['projects-grid']}>
      {projectPreviews.map(preview => (
        <div key={preview.slug} className={styles['project-card']}>
          <h2>{preview.data.title}</h2>
          <time dateTime={preview.data.date}>
            Last Updated: {new Date(preview.data.date).toLocaleDateString()}
          </time>
          <div className={styles['project-action-buttons']}>
            <Link href={`/projects/${preview.slug}`} className={styles['read-more']}>
              Read more
            </Link>
            {preview.data.source &&
            (<Link href={preview.data.source} target="_blank" rel='noopener noreferrer' className={styles['read-more']}>Source</Link>)
            }
          </div>
        </div>
      ))}
    </div>
  </>;
}