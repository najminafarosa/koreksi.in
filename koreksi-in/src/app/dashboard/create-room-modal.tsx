'use client'

import { useState } from 'react'
import { createRoom } from '@/src/app/actions/create-room'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Loader2, Plus, Dices, Calendar, Clock, BookOpen, KeyRound, FileText, Sparkles, X } from 'lucide-react'

export default function CreateRoomModal({ onCreated }: { onCreated?: () => void }) {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [roomCode, setRoomCode] = useState('')

    function generateRandomCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let result = ''
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setRoomCode(result)
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setErrorMessage('')

        const formData = new FormData(event.currentTarget)
        const result = await createRoom(formData)

        setLoading(false)

        if (result?.error) {
            setErrorMessage(result.error)
        } else {
            setIsOpen(false)
            if (onCreated) onCreated()
        }
    }

    if (!isOpen) {
        return (
            <Button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold px-4 py-2.5 shadow-sm gap-2 transition-all"
            >
                <Plus className="w-4 h-4" />
                Buat Room Baru
            </Button>
        )
    }

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="max-w-xl w-full border border-slate-200 shadow-xl rounded-2xl bg-white my-8 overflow-hidden text-slate-800">

                {/* Modal Header */}
                <div className="border-b border-slate-100 px-6 py-4 flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-slate-900">Buat Room / Tugas Baru</h3>
                            <p className="text-xs text-slate-500">Atur soal, kunci jawaban, dan deadline untuk penilaian AI.</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Modal Form Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {errorMessage && (
                        <div className="p-3 text-xs bg-rose-50 text-rose-600 rounded-xl border border-rose-200 font-medium">
                            {errorMessage}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                            Judul Tugas / Mata Kuliah *
                        </label>
                        <Input
                            name="title"
                            placeholder="Contoh: Tugas Pemrograman Dasar - Algoritma Searching"
                            required
                            className="rounded-xl text-xs border-slate-300 focus:border-blue-600"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                            <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                            Kode Room Unik *
                        </label>
                        <div className="flex gap-2">
                            <Input
                                name="room_code"
                                value={roomCode}
                                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                                placeholder="ALGO-26"
                                required
                                className="rounded-xl text-xs border-slate-300 font-mono font-bold uppercase"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={generateRandomCode}
                                className="rounded-xl border-slate-300 hover:bg-slate-50 px-3"
                                title="Generate Acak"
                            >
                                <Dices className="w-4 h-4 text-slate-600" />
                            </Button>
                        </div>
                    </div>

                    {/* Opsi Batas Waktu Terpisah: Tanggal & Jam */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                                Tanggal Deadline (Opsional)
                            </label>
                            <Input
                                type="date"
                                name="deadline_date"
                                className="rounded-xl text-xs border-slate-300 text-slate-700"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-blue-600" />
                                Jam Deadline (Default: 23:59)
                            </label>
                            <Input
                                type="time"
                                name="deadline_time"
                                defaultValue="23:59"
                                className="rounded-xl text-xs border-slate-300 text-slate-700"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-blue-600" />
                            Deskripsi Soal / Pertanyaan *
                        </label>
                        <textarea
                            name="question_text"
                            rows={3}
                            required
                            placeholder="Jelaskan perbedaan antara Linear Search dan Binary Search..."
                            className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-800"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                            Kunci Jawaban Ideal (Panduan AI) *
                        </label>
                        <textarea
                            name="answer_key_text"
                            rows={3}
                            required
                            placeholder="Linear search O(n), Binary search O(log n) pada array terurut..."
                            className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-800"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Aturan Rubrik Penilaian (Opsional)
                        </label>
                        <textarea
                            name="rubric_rules"
                            rows={2}
                            placeholder="Skor 100 jika menyebutkan kompleksitas waktu dan perbedaan utama..."
                            className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 text-slate-800"
                        />
                    </div>

                    {/* Modal Footer */}
                    <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            className="rounded-xl text-xs border-slate-300 text-slate-600"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs px-5 shadow-sm"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                                    Membuat Room...
                                </>
                            ) : (
                                'Buat Room'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}