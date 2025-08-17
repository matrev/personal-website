import path from 'path'
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { getMarkdownFiles, parseNowMarkdownFile, ParsedNowPost } from 'utils/markdownUtils';
import { useState } from 'react';
import ShowMoreButton from 'components/showMoreButton';

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
  const [isMoreShown, setIsMoreShown] = useState(false);

  // Since the now post files are sorted in chronological order, the last post is the latest.
  const latestNowPost = nowPostsContent[nowPostsContent.length - 1];
  const remainingPosts = nowPostsContent.slice(0, nowPostsContent.length - 1);
  return <>
        <h1>This is what I'm doing right about <a href="https://www.nownownow.com/about" target="_blank" rel='noopener noreferrer'>/now</a></h1>  
        <br />
        <h2>{latestNowPost?.data.title}</h2>
        <p>{latestNowPost?.data.date}</p>
        <p>{latestNowPost?.content}</p>
        <br/>
    <ShowMoreButton>
      {remainingPosts.reverse().map(post => (
        <>
          <h2>{post.data.title}</h2>
          <p>{post.data.date}</p>
          <p>{post.content}</p>
          <br/>
        </>
      ))}
    </ShowMoreButton>
  </>
}