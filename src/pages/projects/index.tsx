import { useRouter } from 'next/router'
 
import path from 'path'
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { getMarkdownFiles, parseNowMarkdownFile, ParsedNowPost } from 'utils/markdownUtils';

export const getStaticProps = (async (context) => {
  const projectPostDirectory = path.join(process.cwd(), 'notes', 'WebsitePosts', 'Projects');
  const projectFilenames = getMarkdownFiles(projectPostDirectory, ["ProjectTemplate.md"]);

  const nowPostsContent = projectFilenames.map(file => {
    const filePath = path.join(projectPostDirectory, file);
    return parseNowMarkdownFile(filePath);
  })

  return { props: { nowPostsContent } }
}) satisfies GetStaticProps<{
  nowPostsContent: ParsedNowPost[]
}>

export default function Page({
  nowPostsContent,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  
//   const router = useRouter()
  return <p>Testing posts</p>
}