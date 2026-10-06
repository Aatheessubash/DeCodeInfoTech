import { SeoPageTemplate } from '@/components/SeoPage/SeoPage';
import { createPageMetadata, getSeoPage } from '@/data/seo-pages';

const page = getSeoPage('portfolio')!;

export const metadata = createPageMetadata(page);

export default function PortfolioPage() {
  return <SeoPageTemplate page={page} />;
}
