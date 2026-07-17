import type { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  label: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  /** Hex accent color for the edge bar + icon. Defaults to steel blue. */
  accent?: string;
}

export function KpiCard({ label, value, subtitle, icon: Icon, accent = '#2454A6' }: KpiCardProps) {
  return (
    <div className="relative bg-white rounded-md border border-[#E2E4E9] p-5 pl-6">
      <span className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: accent }} />
      <div className="flex items-center gap-1.5 mb-3">
        <Icon size={13} style={{ color: accent }} />
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#6B7280]">{label}</p>
      </div>
      <p className="font-mono text-2xl font-semibold text-[#12151C] tabular-nums leading-none">{value}</p>
      <p className="text-xs text-[#6B7280] mt-2">{subtitle}</p>
    </div>
  );
}