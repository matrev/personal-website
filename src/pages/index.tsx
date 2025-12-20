
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { ProjectPreview, getProjectPreviews } from '../utils/markdownUtils';
import Carousel from '../components/Carousel';

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
    <Carousel items={recentProjects} />
  </>
}