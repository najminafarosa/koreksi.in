import { createClient } from '@/src/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import LogoutButton from '@/src/components/logout-button'
import CreateRoomModal from './create-room-modal'
import { Room } from '@/src/types'
import { BookOpen, Calendar, UserCheck, ArrowRight, PlusCircle } from 'lucide-react'

export default async function TeacherDashboardPage() {
    const supabase = await createClient()

    // 1. Ambil data dosen yang sedang login
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        redirect('/login')
    }

    // Ambil nama dari metadata Google Auth
    const dosenName = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Dosen'
    const dosenEmail = user.email

    // 2. Query HANYA room milik dosen ini menggunakan dosen_id
    const { data: roomsData } = await supabase
        .from('rooms')
        .select('*')
        .eq('dosen_id', user.id)
        .order('created_at', { ascending: false })

    const rooms: Room[] = roomsData || []

    return (
        <main className="min-h-screen relative overflow-hidden bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">

            {/* BACKGROUND DEKORATIF DENGAN MESH GLOW */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-blue-600/20 rounded-full blur-[128px]"></div>
                <div className="absolute top-1/3 -right-40 w-[28rem] h-[28rem] bg-indigo-600/15 rounded-full blur-[128px]"></div>
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b20_1px,transparent_1px),linear-gradient(to_bottom,#1e293b20_1px,transparent_1px)] bg-[size:3rem_3rem]"
                    style={{
                        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, #000 70%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, #000 70%, transparent 100%)'
                    }}
                ></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto space-y-8">

                {/* Header Profil Dosen (Tema Dark Glass) */}
                <div className="bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                    <div className="flex items-center gap-4">
                        {/* Avatar Dosen */}
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-blue-500/20">
                            {dosenName.charAt(0).toUpperCase()}
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
                                    Selamat Datang, {dosenName}
                                </h1>
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-950/80 text-blue-400 border border-blue-800/60">
                                    <UserCheck className="w-3 h-3 text-blue-400" /> Dosen
                                </span>
                            </div>
                            <p className="text-xs text-slate-400">{dosenEmail}</p>
                        </div>
                    </div>

                    {/* Aksi & Branding Logo (Diberi Glow & Highlight) */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                        <div className="hidden lg:flex items-center px-3 py-1.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md">
                            <Image
                                src="/koreksi-in.png"
                                alt="Koreksi.in Logo"
                                width={120}
                                height={40}
                                className="h-8 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all hover:scale-105"
                                priority
                            />
                        </div>
                        <CreateRoomModal />
                        <LogoutButton />
                    </div>
                </div>

                {/* Section Daftar Room Milik Dosen */}
                <div className="space-y-5">
                    <div className="flex justify-between items-center">
                        <h2 className="text-base font-bold text-slate-200 flex items-center gap-2 tracking-wide">
                            <BookOpen className="w-5 h-5 text-blue-400" />
                            Daftar Ruang Penilaian Saya ({rooms.length})
                        </h2>
                    </div>

                    {rooms.length === 0 ? (
                        /* Empty State Tema Dark Glass */
                        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-12 text-center space-y-4 shadow-xl max-w-2xl mx-auto">
                            <div className="w-12 h-12 bg-blue-950/80 text-blue-400 rounded-2xl flex items-center justify-center mx-auto border border-blue-800/60">
                                <PlusCircle className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-base font-bold text-slate-100">Belum Ada Room Penilaian</p>
                                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                                    Kamu belum membuat ruang tugas. Silakan buat room baru untuk dibagikan kodenya kepada mahasiswa.
                                </p>
                            </div>
                            <div className="pt-2">
                                <CreateRoomModal />
                            </div>
                        </div>
                    ) : (
                        /* Grid Kartu Room Tema Dark Glass */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {rooms.map((room) => (
                                <Link key={room.id} href={`/room/${room.id}/dashboard`} className="group">
                                    <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-800/80 hover:border-blue-500/60 hover:bg-slate-900/95 hover:shadow-[0_10px_30px_rgba(59,_130,_246,_0.15)] transition-all duration-300 space-y-4 h-full flex flex-col justify-between">
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-blue-950/80 text-blue-400 border border-blue-800/60">
                                                    {room.room_code}
                                                </span>
                                                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                                                    {room.status}
                                                </span>
                                            </div>

                                            <div>
                                                <h3 className="text-base font-bold text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-1">
                                                    {room.title}
                                                </h3>
                                                <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                                                    {room.question_text}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                                <span>{new Date(room.created_at).toLocaleDateString('id-ID')}</span>
                                            </div>
                                            <span className="text-blue-400 font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                Kelola <ArrowRight className="w-3.5 h-3.5" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </main>
    )
}