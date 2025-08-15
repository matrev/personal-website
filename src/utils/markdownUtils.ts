import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type NowPostMetadata = {
  title: string,
  date: string
}

export type ParsedNowPost = {
    data: NowPostMetadata,
    content: string
}

export function getMarkdownFiles(directory: string, ignoreFileNames: string[]) {
  const files = fs.readdirSync(directory);
  return files.filter(file => path.extname(file).toLowerCase() === '.md' && !ignoreFileNames.includes(file));
}

export function parseNowMarkdownFile(filePath: string): ParsedNowPost {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(fileContent);
  return {
    data: parsed.data as NowPostMetadata,
    content: parsed.content
  };
}