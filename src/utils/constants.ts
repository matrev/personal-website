import path from 'path';

export const CONTENT_DIRECTORIES = {
  PROJECTS: path.join(process.cwd(), 'notes', 'WebsitePosts', 'Projects'),
  NOW: path.join(process.cwd(), 'notes', 'WebsitePosts', 'NowPosts'),
} as const;
