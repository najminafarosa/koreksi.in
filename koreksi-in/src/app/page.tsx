import Link from 'next/link'
import Image from 'next/image'
import { GraduationCap, UserCheck, ArrowRight } from 'lucide-react'

export default function HomePage() {
    return (
        <main className="min-h-screen relative overflow-hidden bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans text-slate-800">

            {/* Card Utama */}
            <div className="relative z-10 max-w-xl w-full bg-white border border-slate-200/80 shadow-xl rounded-3xl p-8 sm:p-10 space-y-8 text-center text-slate-800">

                {/* Logo Aplikasi (Judul teks Koreksi.in di bawahnya telah dihilangkan) */}
                <div className="space-y-3 flex flex-col items-center">
                    <div className="transition-transform hover:scale-105 mb-1">
                        <Image
                            src="/koreksi-in.png"
                            alt="Koreksi.in Logo"
                            width={160}
                            height={54}
                            className="h-12 w-auto object-contain drop-shadow-sm"
                            priority
                        />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                        Platform asistensi penilaian tugas berbasis AI untuk dosen dan ruang pengumpulan instan untuk mahasiswa.
                    </p>
                </div>

                {/* Tombol Pilihan Peran */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">

                    {/* Tombol Masuk Mahasiswa */}
                    <Link href="/join" className="group">
                        <div className="h-full p-6 rounded-2xl border-2 border-slate-100 hover:border-blue-600 hover:bg-blue-50/40 transition-all text-left flex flex-col justify-between space-y-4">
                            <div className="p-2.5 bg-slate-100 group-hover:bg-blue-100 text-slate-700 group-hover:text-blue-600 rounded-xl w-fit transition-colors">
                                <GraduationCap className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                                    Mahasiswa <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">Gabung room pakai kode unik dari dosen.</p>
                            </div>
                        </div>
                    </Link>

                    {/* Tombol Login Dosen */}
                    <Link href="/login" className="group">
                        <div className="h-full p-6 rounded-2xl border-2 border-slate-100 hover:border-blue-600 hover:bg-blue-50/40 transition-all text-left flex flex-col justify-between space-y-4">
                            <div className="p-2.5 bg-slate-100 group-hover:bg-blue-100 text-slate-700 group-hover:text-blue-600 rounded-xl w-fit transition-colors">
                                <UserCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                                    Dosen / Pengajar <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">Masuk akun Google untuk kelola ruang tugas.</p>
                            </div>
                        </div>
                    </Link>

                </div>

                <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                    Koreksi.in &bull; Didukung oleh Sistem AI & Supabase
                </div>

            </div>
        </main>
    )
}