import path from 'path'
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { getMarkdownFiles, parseNowMarkdownFile, ParsedNowPost } from 'utils/markdownUtils';

export const getStaticProps = (async (context) => {
  const nowPostDirectory = path.join(process.cwd(), 'notes', 'WebsitePosts', 'NowPosts');
  const nowPostFilenames = getMarkdownFiles(nowPostDirectory, ["NowTemplate.md"]);

  const nowPostsContent = nowPostFilenames.map(file => {
    const filePath = path.join(nowPostDirectory, file);
    return parseNowMarkdownFile(filePath);
  })

  return { props: { nowPostsContent } }
}) satisfies GetStaticProps<{
  nowPostsContent: ParsedNowPost[]
}>

export default function Now({
  nowPostsContent,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <>
    <h1>This is what i'm up to right about <a href="https://www.nownownow.com/about" target="_blank" rel='noopener noreferrer'>/now</a></h1>  
    <br />
    <h2>Currently, I am looking for work as a Software Engineer. I am in the middle of re-working this site with Next.js</h2>
    <p>Updated 8/14/25</p>
    <br />
    {nowPostsContent.map(post => (
      <>
        <h2>{post.data.title}</h2>
        <p>{post.data.date}</p>
        <p>{post.content}</p>
        <br/>
      </>
    ))}
  </>
}