import Link from 'next/link'
import Image from 'next/image'
import { GraduationCap, UserCheck, ArrowRight, Sparkles } from 'lucide-react'

export default function HomePage() {
    return (
        <main className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center p-4 sm:p-6 font-sans text-slate-100">

            {/* BACKGROUND ELEGAN & DEKORATIF MODERN */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* 1. Multi-color Glowing Orbs (Lampu Pijar Gradasi) */}
                <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] bg-blue-600/30 rounded-full blur-[128px] animate-pulse"></div>
                <div className="absolute top-1/2 -right-32 -translate-y-1/2 w-[28rem] h-[28rem] bg-indigo-600/25 rounded-full blur-[128px] animate-pulse delay-700"></div>
                <div className="absolute -bottom-32 left-1/3 w-[32rem] h-[32rem] bg-sky-500/20 rounded-full blur-[128px] animate-pulse delay-1000"></div>

                {/* 2. Gridlines Modern dengan Fade Out Radial Mask */}
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3rem_3rem]"
                    style={{
                        maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)'
                    }}
                ></div>

                {/* 3. Aksen Ring Melayang (Kedalaman 3D) */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] rounded-full border border-slate-800/40 opacity-50"></div>
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] rounded-full border border-slate-800/20 opacity-30"></div>
            </div>

            {/* CARD UTAMA KOREKSI.IN */}
            <div className="relative z-10 max-w-xl w-full">

                {/* Aksen Glow Tipis di Belakang Card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-500 rounded-[2rem] blur-xl opacity-20 transition duration-1000"></div>

                <div className="relative bg-white/95 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)] rounded-3xl p-8 sm:p-10 space-y-8 text-center text-slate-800">

                    {/* Badge Kecil Status AI */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-semibold tracking-wide">
                        <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                        <span>Platform Asistensi Penilaian Berbasis AI</span>
                    </div>

                    {/* Header Logo & Deskripsi Aplikasi */}
                    <div className="space-y-3 flex flex-col items-center">
                        <div className="transition-transform duration-300 hover:scale-105">
                            <Image
                                src="/koreksi-in.png"
                                alt="Koreksi.in Logo"
                                width={180}
                                height={60}
                                className="h-14 w-auto object-contain filter drop-shadow-sm"
                                priority
                            />
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed pt-1">
                            Solusi cerdas penilaian tugas mahasiswa secara otomatis, cepat, dan terintegrasi khusus untuk dosen dan mahasiswa.
                        </p>
                    </div>

                    {/* Tombol Pilihan Peran */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">

                        {/* Tombol Masuk Mahasiswa */}
                        <Link href="/join" className="group">
                            <div className="h-full p-6 rounded-2xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all text-left flex flex-col justify-between space-y-4 bg-white/80">
                                <div className="p-2.5 bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-700 rounded-xl w-fit transition-all duration-300 shadow-xs">
                                    <GraduationCap className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                                        <span>Mahasiswa</span>
                                        <ArrowRight className="w-3.5 h-3.5 text-blue-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1">Gabung room pengumpulan tugas pakai kode unik dari dosen.</p>
                                </div>
                            </div>
                        </Link>

                        {/* Tombol Login Dosen */}
                        <Link href="/login" className="group">
                            <div className="h-full p-6 rounded-2xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all text-left flex flex-col justify-between space-y-4 bg-white/80">
                                <div className="p-2.5 bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-700 rounded-xl w-fit transition-all duration-300 shadow-xs">
                                    <UserCheck className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                                        <span>Dosen / Pengajar</span>
                                        <ArrowRight className="w-3.5 h-3.5 text-blue-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1">Masuk dengan Google untuk buat dan kelola ruang penilaian.</p>
                                </div>
                            </div>
                        </Link>

                    </div>

                    <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-100/80 flex items-center justify-center gap-2">
                        <span>Koreksi.in</span>
                        <span>&bull;</span>
                        <span>Didukung AI Engine & Supabase</span>
                    </div>

                </div>
            </div>
        </main>
    )
}