'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/src/lib/supabase/client'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Loader2, KeyRound, ArrowRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function JoinRoomPage() {
    const [roomCode, setRoomCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const router = useRouter()
    const supabase = createClient()

    async function handleJoin(e: React.FormEvent) {
        e.preventDefault()
        const cleanCode = roomCode.trim().toUpperCase()
        if (!cleanCode) return

        setLoading(true)
        setErrorMessage('')

        const { data, error } = await supabase
            .from('rooms')
            .select('id')
            .eq('room_code', cleanCode)
            .single()

        setLoading(false)

        if (error || !data) {
            setErrorMessage(`Room dengan kode "${cleanCode}" tidak ditemukan. Periksa kembali kode Anda.`)
        } else {
            router.push(`/room/${data.id}`)
        }
    }

    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
            <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-2xl shadow-sm p-8 space-y-6">

                <div className="space-y-1">
                    <Link href="/" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-slate-600 mb-4 transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5" /> Beranda Utama
                    </Link>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Gabung Room Tugas</h1>
                    <p className="text-xs text-slate-500">Masukkan kode unik yang diberikan oleh dosen pengampu.</p>
                </div>

                <form onSubmit={handleJoin} className="space-y-4">
                    {errorMessage && (
                        <div className="p-3 text-xs bg-rose-50 text-rose-600 rounded-xl border border-rose-200 font-medium leading-relaxed">
                            {errorMessage}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                            <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                            Kode Room (Contoh: ALGO-26)
                        </label>
                        <Input
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                            placeholder="Ketik kode room..."
                            required
                            className="rounded-xl text-sm font-mono font-bold tracking-wider uppercase border-slate-300 py-2.5"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold py-3 shadow-sm flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Mencari Room...
                            </>
                        ) : (
                            <>
                                Masuk ke Room
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </Button>
                </form>

            </div>
        </main>
    )
}