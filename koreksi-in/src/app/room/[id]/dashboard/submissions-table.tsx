import { Submission } from '@/src/types'
import AIRiskBadge from './ai-risk-badge'
import SubmissionDetailDialog from './submissions-detail-dialog'
import { FileCheck } from 'lucide-react'

export default function SubmissionsTable({ submissions }: { submissions: Submission[] }) {
    return (
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">

            {/* Header Tabel */}
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
                <div>
                    <h2 className="text-sm font-bold text-slate-900">Daftar Pengumpulan Tugas Mahasiswa</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Total {submissions.length} mahasiswa telah mengumpulkan tugas.</p>
                </div>
            </div>

            {submissions.length === 0 ? (
                <div className="p-12 text-center text-slate-400 space-y-2">
                    <FileCheck className="w-10 h-10 mx-auto text-slate-300" />
                    <p className="text-sm font-medium text-slate-600">Belum ada mahasiswa yang mengumpulkan tugas.</p>
                    <p className="text-xs text-slate-400">Bagikan link atau kode room kepada mahasiswa untuk mulai mengumpulkan.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                                <th className="p-4">NIM</th>
                                <th className="p-4">Nama Mahasiswa</th>
                                <th className="p-4">Waktu Kirim</th>
                                <th className="p-4 text-center">Skor</th>
                                <th className="p-4">Status AI-Risk</th>
                                <th className="p-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                            {submissions.map((sub) => (
                                <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="p-4 font-mono font-semibold text-slate-900">{sub.student_nim}</td>
                                    <td className="p-4 font-bold text-slate-900">{sub.student_name}</td>
                                    <td className="p-4 text-slate-500">
                                        {sub.created_at
                                            ? new Date(sub.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
                                            : '-'
                                        }
                                    </td>
                                    <td className="p-4 text-center font-bold text-blue-600">
                                        {sub.score !== null && sub.score !== undefined ? `${sub.score}` : 'Pending'}
                                    </td>
                                    <td className="p-4">
                                        <AIRiskBadge level={sub.ai_risk} />
                                    </td>
                                    <td className="p-4 text-right">
                                        <SubmissionDetailDialog submission={sub} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}