import { createClient } from '@/src/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from '@/src/components/logout-button'
import CreateRoomModal from './create-room-modal'
import { Room } from '@/src/types'
import { BookOpen, Calendar, UserCheck } from 'lucide-react'

export const dynamic = 'force-dynamic'

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
        <main className="min-h-screen bg-slate-50/60 py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header Profil Dosen */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                            {dosenName.charAt(0).toUpperCase()}
                        </div>
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                                    Selamat Datang, {dosenName}
                                </h1>
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                                    <UserCheck className="w-3 h-3" /> Dosen
                                </span>
                            </div>
                            <p className="text-xs text-slate-500">{dosenEmail}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        {/* Menggunakan Modal langsung di sini */}
                        <CreateRoomModal />
                        <LogoutButton />
                    </div>
                </div>

                {/* Daftar Room Milik Dosen */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-blue-600" />
                            Daftar Ruang Penilaian Saya ({rooms.length})
                        </h2>
                    </div>

                    {rooms.length === 0 ? (
                        <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center space-y-3">
                            <p className="text-sm font-semibold text-slate-700">Belum Ada Room Penilaian</p>
                            <p className="text-xs text-slate-400 max-w-sm mx-auto">
                                Kamu belum membuat ruang tugas. Silakan buat room baru untuk dibagikan kodenya kepada mahasiswa.
                            </p>
                            <div className="pt-2">
                                <CreateRoomModal />
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {rooms.map((room) => (
                                <Link key={room.id} href={`/room/${room.id}/dashboard`} className="group">
                                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-blue-500 hover:shadow-md transition-all space-y-4 h-full flex flex-col justify-between">
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                                                    {room.room_code}
                                                </span>
                                                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                                                    {room.status}
                                                </span>
                                            </div>
                                            <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                                {room.title}
                                            </h3>
                                            <p className="text-xs text-slate-500 line-clamp-2">
                                                {room.question_text}
                                            </p>
                                        </div>

                                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{new Date(room.created_at).toLocaleDateString('id-ID')}</span>
                                            </div>
                                            <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                                                Kelola &rarr;
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