import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { CONTENT_DIRECTORIES } from './constants';

export type PostMetadata = {
  title: string,
  subtitle: string,
  date: string,
  source?: string,
}

export type ParsedPost = {
    data: PostMetadata,
    content: string,
    contentHtml?: string
}

export type ProjectPreview = {
    slug: string;
    data: PostMetadata;
}

export async function markdownToHtml(markdown: string): Promise<string> {
    const result = await remark()
        .use(html)
        .process(markdown);
    return result.toString();
}

export async function getProjectPreviews(): Promise<ProjectPreview[]> {
    const projectFilenames = getMarkdownFiles(CONTENT_DIRECTORIES.PROJECTS, ["ProjectsTemplate.md"]);
    return projectFilenames.map(file => {
        const filePath = `${CONTENT_DIRECTORIES.PROJECTS}/${file}`;
        const { data } = matter(fs.readFileSync(filePath, 'utf8'));
        return {
            slug: file.replace(/\.md$/, ''),
            data: data as PostMetadata
        };
    });
}

export async function getProjectPost(slug: string): Promise<ParsedPost> {
    const [filename] = getMarkdownFileFromSlug(CONTENT_DIRECTORIES.PROJECTS, slug);
    if (!filename) {
        throw new Error(`No post found for slug: ${slug}`);
    }
    const filePath = `${CONTENT_DIRECTORIES.PROJECTS}/${filename}`;
    return await parseMarkdownFile(filePath);
}

export function getMarkdownFiles(directory: string, ignoreFileNames: string[]) {
  const files = fs.readdirSync(directory);
  return files.filter(file => path.extname(file).toLowerCase() === '.md' && !ignoreFileNames.includes(file));
}

export function getAllProjectSlugs(): string[] {
  const projectPostFiles = fs.readdirSync(CONTENT_DIRECTORIES.PROJECTS);
  return projectPostFiles.map(filename => filename.replace(/\.md$/, ''))
}

export function getMarkdownFileFromSlug(directory: string, slug: string) {
  const files = fs.readdirSync(directory);
  return files.filter(file => path.basename(file).toLowerCase() === slug.toLowerCase() + '.md')
}

export async function parseMarkdownFile(filePath: string): Promise<ParsedPost> {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(fileContent);
    const contentHtml = await markdownToHtml(parsed.content);
    
    return {
        data: parsed.data as PostMetadata,
        content: parsed.content,
        contentHtml
    };
}