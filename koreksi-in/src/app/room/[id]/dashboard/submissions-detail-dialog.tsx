'use client'

import { useState } from 'react'
import { Submission } from '@/src/types'
import { Button } from '@/src/components/ui/button'
import AIRiskBadge from './ai-risk-badge'
import { FileText, Award, Sparkles, ExternalLink, X } from 'lucide-react'

export default function SubmissionDetailDialog({ submission }: { submission: Submission }) {
    const [isOpen, setIsOpen] = useState(false)

    // Ambil URL berkas dari file_path atau file_url
    const pdfUrl = submission.file_path || submission.file_url

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                variant="outline"
                className="rounded-xl text-xs font-semibold border-slate-200 hover:border-blue-600 hover:bg-blue-50 text-slate-700 px-3 py-1.5"
            >
                Lihat Detail
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                    <div className="max-w-2xl w-full border border-slate-200 shadow-xl rounded-2xl bg-white my-8 overflow-hidden text-slate-800">

                        {/* Header */}
                        <div className="border-b border-slate-100 px-6 py-4 flex justify-between items-center bg-slate-50/50">
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-slate-900">
                                        {submission.student_name} ({submission.student_nim})
                                    </h3>
                                    <p className="text-xs text-slate-500">Rincian hasil evaluasi dan penilaian otomatis AI.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">

                            {/* Skor & AI Risk Banner */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Skor Akhir</p>
                                        <p className="text-2xl font-black text-blue-900 mt-0.5">
                                            {submission.score !== null && submission.score !== undefined ? submission.score : 'Pending'}
                                            <span className="text-xs font-normal text-slate-500"> / 100</span>
                                        </p>
                                    </div>
                                    <Award className="w-8 h-8 text-blue-500/80" />
                                </div>

                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status AI-Risk</p>
                                        <div className="mt-2">
                                            <AIRiskBadge level={submission.ai_risk} />
                                        </div>
                                    </div>
                                    <Sparkles className="w-6 h-6 text-slate-400" />
                                </div>
                            </div>

                            {/* Feedback AI */}
                            <div className="space-y-2">
                                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                                    Ringkasan Feedback Gemini AI
                                </h4>
                                <div
                                    dir="ltr"
                                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed text-left whitespace-pre-line"
                                >
                                    {submission.feedback ? submission.feedback.trim() : 'Belum ada ringkasan feedback dari sistem AI.'}
                                </div>
                            </div>

                            {/* Berkas Jawaban */}
                            <div className="space-y-2 pt-2 border-t border-slate-100">
                                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Berkas Lampiran Mahasiswa</h4>
                                {pdfUrl ? (
                                    <a
                                        href={pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors border border-blue-200"
                                    >
                                        <FileText className="w-4 h-4" />
                                        Pratinjau / Unduh Berkas PDF Jawaban
                                        <ExternalLink className="w-3.5 h-3.5 ml-1" />
                                    </a>
                                ) : (
                                    <p className="text-xs text-slate-400 italic">Berkas PDF tidak ditemukan.</p>
                                )}
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="flex justify-end px-6 py-3 bg-slate-50/50 border-t border-slate-100">
                            <Button
                                onClick={() => setIsOpen(false)}
                                className="bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs px-4 py-2"
                            >
                                Tutup
                            </Button>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}