import {
  Wrench,
  Zap,
  Building2,
  Ruler,
  Flame,
  Home,
  Layers,
  Paintbrush,
  Hammer,
  Grid3X3,
  type LucideProps,
} from 'lucide-react';
import type { TradeSlug } from '@/types';

const ICON_MAP: Record<TradeSlug, React.ComponentType<LucideProps>> = {
  plumbers: Wrench,
  electricians: Zap,
  builders: Building2,
  surveyors: Ruler,
  'gas-engineers': Flame,
  roofers: Home,
  plasterers: Layers,
  'painters-decorators': Paintbrush,
  'joiners-carpenters': Hammer,
  tilers: Grid3X3,
};

interface TradeIconProps extends LucideProps {
  slug: TradeSlug | string;
}

export function TradeIcon({ slug, ...props }: TradeIconProps) {
  const Icon = ICON_MAP[slug as TradeSlug] ?? Wrench;
  return <Icon {...props} />;
}
