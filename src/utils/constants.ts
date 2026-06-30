import path from 'path';

export const CONTENT_DIRECTORIES = {
  PROJECTS: path.join(process.cwd(), 'notes', 'WebsitePosts', 'Projects'),
  NOW: path.join(process.cwd(), 'notes', 'WebsitePosts', 'NowPosts'),
} as const;

// Markdown files that are templates/scaffolding, not real published posts.
// Excluded from previews, generated routes, and static path generation.
export const IGNORED_PROJECT_FILES = ['ProjectsTemplate.md'] as const;
