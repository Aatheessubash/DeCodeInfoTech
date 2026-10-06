import { SeoPageTemplate } from '@/components/SeoPage/SeoPage';
import { createPageMetadata, getSeoPage } from '@/data/seo-pages';

const page = getSeoPage('contact')!;

export const metadata = createPageMetadata(page);

export default function ContactPage() {
  return <SeoPageTemplate page={page} />;
}
