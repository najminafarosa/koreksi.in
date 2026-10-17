'use client'

import { useState } from 'react'
import { submitAssignment } from '@/src/app/actions/submit-assignment'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Loader2, UploadCloud, CheckCircle2, FileText, User, Hash } from 'lucide-react'

export default function SubmissionForm({
    roomId,
    roomTitle,
    questionText
}: {
    roomId: string
    roomTitle: string
    questionText: string
}) {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setErrorMessage('')

        const formData = new FormData(e.currentTarget)
        const result = await submitAssignment(roomId, formData)

        setLoading(false)

        if (result?.error) {
            setErrorMessage(result.error)
        } else {
            setSuccess(true)
        }
    }

    if (success) {
        return (
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm text-center space-y-4 max-w-lg mx-auto my-12 text-slate-800">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">Tugas Berhasil Dikirim!</h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                    File PDF jawabanmu telah disimpan. Jawaban sedang dalam antrean evaluasi dan penilaian otomatis oleh sistem AI.
                </p>
                <Button
                    onClick={() => setSuccess(false)}
                    variant="outline"
                    className="rounded-xl text-xs font-semibold mt-2 border-slate-300 text-slate-700"
                >
                    Kirim Jawaban Lain
                </Button>
            </div>
        )
    }

    return (
        <div className="max-w-xl mx-auto py-10 px-4">
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden text-slate-800">

                {/* Header Soal */}
                <div className="bg-slate-50/70 border-b border-slate-100 p-6 space-y-3">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 font-mono">
                            Pengumpulan Tugas
                        </span>
                    </div>
                    <h1 className="text-base font-bold text-slate-900">{roomTitle}</h1>
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200/60 text-xs text-slate-700 space-y-1.5">
                        <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-blue-600" /> Deskripsi Soal / Pertanyaan:
                        </p>
                        <p className="leading-relaxed whitespace-pre-wrap text-slate-600">{questionText}</p>
                    </div>
                </div>

                {/* Form Input */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {errorMessage && (
                        <div className="p-3 text-xs bg-rose-50 text-rose-600 rounded-xl border border-rose-200 font-medium">
                            {errorMessage}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                            <Hash className="w-3.5 h-3.5 text-blue-600" />
                            NIM Mahasiswa *
                        </label>
                        <Input
                            name="student_nim"
                            placeholder="Contoh: 260101001"
                            required
                            className="rounded-xl text-xs border-slate-300 font-mono"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-blue-600" />
                            Nama Lengkap *
                        </label>
                        <Input
                            name="student_name"
                            placeholder="Contoh: An Najmi Narwa"
                            required
                            className="rounded-xl text-xs border-slate-300"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                            <UploadCloud className="w-3.5 h-3.5 text-blue-600" />
                            Unggah File Jawaban (PDF) *
                        </label>
                        <Input
                            type="file"
                            name="file"
                            accept=".pdf"
                            required
                            className="rounded-xl text-xs border-slate-300 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                        />
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold py-2.5 shadow-sm"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Mengirim Berkas...
                                </>
                            ) : (
                                '🚀 Kirim Jawaban Tugas'
                            )}
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    )
}