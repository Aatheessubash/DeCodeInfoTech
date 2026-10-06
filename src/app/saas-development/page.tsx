import { SeoPageTemplate } from '@/components/SeoPage/SeoPage';
import { createPageMetadata, getSeoPage } from '@/data/seo-pages';

const page = getSeoPage('saas-development')!;

export const metadata = createPageMetadata(page);

export default function SaasDevelopmentPage() {
  return <SeoPageTemplate page={page} />;
}
