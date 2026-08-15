import { createClient } from '@sanity/client';
import { toHTML } from '@portabletext/to-html';
import sanitizeHtml from 'sanitize-html';

export interface CmsContentPage {
  pageKey: string;
  title?: string;
  eyebrow?: string;
  intro?: string;
  body?: unknown[];
  customHtml?: string;
  imageUrl?: string;
  imageAlt?: string;
  videoFileUrl?: string;
  videoUrl?: string;
  mediaCaption?: string;
  seoDescription?: string;
}

export const cmsClient = createClient({
  projectId: 'my832n63',
  dataset: 'production',
  apiVersion: '2026-08-01',
  useCdn: false,
});

export async function getContentPages(pageKeys: string[]) {
  if (!pageKeys.length) return [];

  return cmsClient.fetch<CmsContentPage[]>(
    `*[_type == "contentPage" && pageKey in $pageKeys] {
      pageKey,
      title,
      eyebrow,
      intro,
      body,
      customHtml,
      "imageUrl": mainImage.asset->url,
      "imageAlt": mainImage.alt,
      "videoFileUrl": videoFile.asset->url,
      videoUrl,
      mediaCaption,
      seoDescription
    }`,
    { pageKeys }
  );
}

export function renderCmsBody(page: CmsContentPage | undefined) {
  if (!page) return undefined;

  const portableTextHtml = page.body?.length ? toHTML(page.body as Parameters<typeof toHTML>[0]) : '';
  const combinedHtml = [page.intro ? `<p class="content-intro">${escapeHtml(page.intro)}</p>` : '', portableTextHtml, page.customHtml ?? '']
    .filter(Boolean)
    .join('');

  if (!combinedHtml) return undefined;

  return sanitizeHtml(combinedHtml, {
    allowedTags: [
      'p', 'br', 'strong', 'em', 'u', 'h2', 'h3', 'h4', 'blockquote',
      'ul', 'ol', 'li', 'a', 'span', 'div', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      span: ['class'],
      div: ['class'],
      p: ['class'],
      table: ['class'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
