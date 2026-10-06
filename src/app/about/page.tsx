import { SeoPageTemplate } from '@/components/SeoPage/SeoPage';
import { createPageMetadata, getSeoPage } from '@/data/seo-pages';

const page = getSeoPage('about')!;

export const metadata = createPageMetadata(page);

export default function AboutPage() {
  return <SeoPageTemplate page={page} />;
}
