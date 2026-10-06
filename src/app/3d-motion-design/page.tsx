import { SeoPageTemplate } from '@/components/SeoPage/SeoPage';
import { createPageMetadata, getSeoPage } from '@/data/seo-pages';

const page = getSeoPage('3d-motion-design')!;

export const metadata = createPageMetadata(page);

export default function MotionDesignPage() {
  return <SeoPageTemplate page={page} />;
}
