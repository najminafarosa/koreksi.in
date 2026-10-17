import { ShieldCheck, ShieldAlert, AlertTriangle, HelpCircle } from 'lucide-react'

export default function AIRiskBadge({ level }: { level?: string | null }) {
    if (!level) {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                <HelpCircle className="w-3.5 h-3.5" />
                Belum Diperiksa
            </span>
        )
    }

    const cleanLevel = level.toUpperCase()

    if (cleanLevel === 'LOW') {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Risiko Rendah (LOW)
            </span>
        )
    }

    if (cleanLevel === 'MEDIUM') {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Risiko Sedang (MEDIUM)
            </span>
        )
    }

    if (cleanLevel === 'HIGH') {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                Risiko Tinggi (HIGH)
            </span>
        )
    }

    return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 uppercase">
            {level}
        </span>
    )
}