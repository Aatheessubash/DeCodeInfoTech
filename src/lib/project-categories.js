export const PROJECT_CATEGORIES = [
  'Website Development',
  'Web Application',
  'SaaS Platform',
  'Mobile App Development',
  'UI/UX Design',
  'Industrial Automation / AI & IoT',
  'CRM Automation / Custom Software',
  '3D Motion Design / Digital Media',
  'Website Redesign',
  'Maintenance / Cloud Support',
  'Others',
];

export function isProjectCategory(value) {
  return PROJECT_CATEGORIES.includes(value);
}
