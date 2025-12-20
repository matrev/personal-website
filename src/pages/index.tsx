
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import Link from 'next/link'
import { ProjectPreview, getProjectPreviews } from '../utils/markdownUtils';
import LatestProjects from '../components/LatestProjects';
import styles from '../styles/LatestProjects.module.css';

export const getStaticProps = (async () => {
  const projectPreviews = await getProjectPreviews();
  // Sort by date descending and take top 5
  const recentProjects = projectPreviews
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .slice(0, 5);
  return { props: { recentProjects } }
}) satisfies GetStaticProps<{
  recentProjects: ProjectPreview[]
}>

export default function Index({
  recentProjects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <>
    <h2>Welcome to my personal website</h2>
    <h3>Recent Projects</h3>
    <LatestProjects items={recentProjects} />
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Link href="/projects" className={styles.viewAllButton}>
        View All Projects
      </Link>
    </div>
  </>
}