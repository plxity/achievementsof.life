import { unified } from 'unified';
import remarkParse from 'remark-parse';
import html from 'remark-html';

export default async function markdownToHtml(markdown) {
  const result = await unified().use(remarkParse).use(html).process(markdown);
  return result.toString();
}
