import type { GetStaticProps, InferGetStaticPropsType, GetStaticPaths, GetStaticPropsContext } from 'next'
import { ParsedPost, getAllProjectSlugs, getProjectPost } from 'utils/markdownUtils';
import parse from 'html-react-parser';

export const getStaticPaths = (async () => {
  const slugs = getAllProjectSlugs();
  return {
    paths: slugs.flatMap(slug => [
      { params: { slug: slug } },
      { params: { slug: slug.toLowerCase() } }
    ]),
    fallback: false,
  }
}) satisfies GetStaticPaths

export const getStaticProps = (async (context: GetStaticPropsContext) => {
  const slug = typeof context.params?.slug === 'string' ? context.params.slug : '';
  const projectPostContent = await getProjectPost(slug);
  return { props: { projectPostContent } };
}) satisfies GetStaticProps<{
  projectPostContent: ParsedPost
}>


export default function ProjectPage({
  projectPostContent,
 }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <article>
      <h1>{projectPostContent.data.title}</h1>
      {projectPostContent.data.date && (
        <time dateTime={projectPostContent.data.date}>
          {new Date(projectPostContent.data.date).toLocaleDateString()}
        </time>
      )}
      <div className="prose">
        {projectPostContent.contentHtml && parse(projectPostContent.contentHtml)}
      </div>
    </article>
  );
}