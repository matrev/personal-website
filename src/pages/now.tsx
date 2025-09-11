import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { getMarkdownFiles, parseMarkdownFile, ParsedPost } from 'utils/markdownUtils';
import ShowMoreButton from 'components/showMoreButton';
import { CONTENT_DIRECTORIES } from 'utils/constants';

export const getStaticProps = (async () => {
  const nowPostFilenames = getMarkdownFiles(CONTENT_DIRECTORIES.NOW, ["NowTemplate.md"]);

  const nowPostsContent = await Promise.all(
    nowPostFilenames.map(file => {
      const filePath =  CONTENT_DIRECTORIES.NOW + "/" + file;
      return parseMarkdownFile(filePath);
    })
  );

  return { props: { nowPostsContent } }
}) satisfies GetStaticProps<{
  nowPostsContent: ParsedPost[]
}>

export default function Now({
  nowPostsContent,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  // Since the now post files are sorted in chronological order, the last post is the latest.
  const latestNowPost = nowPostsContent[nowPostsContent.length - 1];
  const remainingPosts = nowPostsContent.slice(0, nowPostsContent.length - 1);

  return (
  <>
    <h1>This is what I&apos;m up to right about <a href="https://www.nownownow.com/about" target="_blank" rel="noopener noreferrer">/now</a></h1>  
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
  </>)
}