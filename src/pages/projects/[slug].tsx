import type { GetStaticProps, InferGetStaticPropsType, GetStaticPaths, GetStaticPropsContext } from 'next'
import { ParsedPost, getAllProjectSlugs, getProjectPost } from 'utils/markdownUtils';
import parse, { attributesToProps, HTMLReactParserOptions, Text, Element, DOMNode } from 'html-react-parser';
import Link from 'next/link';

export const reactParserOptions: HTMLReactParserOptions = {
  replace: (domNode: DOMNode) => {
    if (domNode.type === 'tag' && domNode instanceof Element && domNode.name === 'a' && !domNode.attribs.href?.includes("marktrevino.com") ) {
      const props = attributesToProps(domNode.attribs)
      props.target = "_blank"
      props.rel = "noopener noreferrer nofollow"
      console.log('domNode', domNode)
      return (<a {...props}>{(domNode.children[0] as Text).data}</a>)
    }
    return domNode
  }
}

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
    <>
      <Link href="/projects">back</Link>
      <h1>{projectPostContent.data.title}</h1>
      {projectPostContent.data.date && (
        <time dateTime={projectPostContent.data.date}>
          {new Date(projectPostContent.data.date).toLocaleDateString()}
        </time>
      )}
      <div className="prose">
        {projectPostContent.contentHtml && parse(projectPostContent.contentHtml, reactParserOptions)}
      </div>
    </>
  );
}