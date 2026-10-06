import { SeoPageTemplate } from '@/components/SeoPage/SeoPage';
import { createPageMetadata, getSeoPage } from '@/data/seo-pages';

const page = getSeoPage('ui-ux-design')!;

export const metadata = createPageMetadata(page);

export default function UiUxDesignPage() {
  return <SeoPageTemplate page={page} />;
}
