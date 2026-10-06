import { SeoPageTemplate } from '@/components/SeoPage/SeoPage';
import { createPageMetadata, getSeoPage } from '@/data/seo-pages';

const page = getSeoPage('web-development')!;

export const metadata = createPageMetadata(page);

export default function WebDevelopmentPage() {
  return <SeoPageTemplate page={page} />;
}
