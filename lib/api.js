import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), '_users');

export function getUsersSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getUserInfoByName(name, fields = []) {
  const realSlug = name.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}`, 'index.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const items = {};

  fields.forEach((field) => {
    if (field === 'name') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}
