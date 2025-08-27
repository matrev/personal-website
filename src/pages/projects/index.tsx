import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import Link from 'next/link'
import { ProjectPreview, getProjectPreviews } from 'utils/markdownUtils';

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
    {projectPreviews.map(preview => (
      <div key={preview.slug}>
        <h2>{preview.data.title}</h2>
        <p>{preview.data.date}</p>
        <Link href={`/projects/${preview.slug}`}>Read more</Link>
      </div>
    ))}
  </>;
}