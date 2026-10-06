import { SeoPageTemplate } from '@/components/SeoPage/SeoPage';
import { createPageMetadata, getSeoPage } from '@/data/seo-pages';

const page = getSeoPage('blog')!;

export const metadata = createPageMetadata(page);

export default function BlogPage() {
  return <SeoPageTemplate page={page} />;
}
