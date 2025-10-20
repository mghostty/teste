const DEFAULT_TITLE = 'SCPL Web • Engenharia';

export default function getPageTitle(title: string): string {
  return title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
}
