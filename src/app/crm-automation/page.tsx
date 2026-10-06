import { SeoPageTemplate } from '@/components/SeoPage/SeoPage';
import { createPageMetadata, getSeoPage } from '@/data/seo-pages';

const page = getSeoPage('crm-automation')!;

export const metadata = createPageMetadata(page);

export default function CrmAutomationPage() {
  return <SeoPageTemplate page={page} />;
}
