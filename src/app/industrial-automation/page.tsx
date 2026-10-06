import { SeoPageTemplate } from '@/components/SeoPage/SeoPage';
import { createPageMetadata, getSeoPage } from '@/data/seo-pages';

const page = getSeoPage('industrial-automation')!;

export const metadata = createPageMetadata(page);

export default function IndustrialAutomationPage() {
  return <SeoPageTemplate page={page} />;
}
