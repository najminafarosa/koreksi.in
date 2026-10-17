'use client'

import { useTransition } from 'react'
import { signInWithGoogle } from '@/src/app/actions/auth'
import { Button } from '@/src/components/ui/button'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
    const [isPending, startTransition] = useTransition()

    const handleLogin = () => {
        startTransition(async () => {
            await signInWithGoogle()
        })
    }

    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
            <div className="max-w-md w-full bg-white border border-slate-200/80 shadow-xl rounded-2xl p-8 space-y-6 text-center">
                <div className="space-y-2">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Login Dosen</h1>
                    <p className="text-xs text-slate-500">Masuk menggunakan akun Google institusi/pribadi untuk mengelola ruang penilaian Koreksi.in.</p>
                </div>

                <Button
                    onClick={handleLogin}
                    disabled={isPending}
                    variant="outline"
                    className="w-full py-6 rounded-xl border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-3 transition-all shadow-xs"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                            Memproses Google Login...
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.15 21.32 7.22 24 12 24z" />
                                <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.6H1.18C.43 8.12 0 9.81 0 12s.43 3.88 1.18 5.4l4.09-3.16z" />
                                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.22 0 3.15 2.68 1.18 6.6l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96z" />
                            </svg>
                            Masuk dengan Akun Google
                        </>
                    )}
                </Button>
            </div>
        </main>
    )
}