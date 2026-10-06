import { SeoPageTemplate } from '@/components/SeoPage/SeoPage';
import { createPageMetadata, getSeoPage } from '@/data/seo-pages';

const page = getSeoPage('mobile-app-development')!;

export const metadata = createPageMetadata(page);

export default function MobileAppDevelopmentPage() {
  return <SeoPageTemplate page={page} />;
}
