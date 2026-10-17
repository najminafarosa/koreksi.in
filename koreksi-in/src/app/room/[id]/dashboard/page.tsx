import { createClient } from '@/src/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import SubmissionsTable from './submissions-table'
import DeleteRoomButton from '@/src/components/room/delete-room-button'
import ExportExcelButton from '@/src/components/export-excel-button'
import { Room, Submission } from '@/src/types'
import { Card, CardContent } from '@/src/components/ui/card'
import { ArrowLeft, Users, Award, ShieldAlert, Calendar, Clock } from 'lucide-react'

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function RoomDashboardPage({ params }: PageProps) {
    const { id } = await params
    const supabase = await createClient()

    // Ambil detail room
    const { data: room, error: roomError } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', id)
        .single()

    if (roomError || !room) {
        notFound()
    }

    const roomData: Room = room

    // Ambil daftar submission untuk room ini
    const { data: submissions } = await supabase
        .from('submissions')
        .select('*')
        .eq('room_id', id)
        .order('created_at', { ascending: false })

    const submissionList: Submission[] = submissions || []

    // Hitung rata-rata nilai kelas
    const scoredSubmissions = submissionList.filter(s => s.score !== null && s.score !== undefined)
    const avgScore = scoredSubmissions.length > 0
        ? (scoredSubmissions.reduce((acc, curr) => acc + (curr.score || 0), 0) / scoredSubmissions.length).toFixed(1)
        : '0'

    // Hitung jumlah high risk
    const highRiskCount = submissionList.filter(s => s.ai_risk === 'high').length

    return (
        <main className="min-h-screen bg-slate-50/60 py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Top Navigation & Info */}
                <div className="space-y-4">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali ke Beranda Dosen
                    </Link>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 font-mono">
                                    {roomData.room_code}
                                </span>
                                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                                    {roomData.status}
                                </span>
                            </div>
                            <h1 className="text-xl font-bold text-slate-900 tracking-tight">{roomData.title}</h1>
                            <p className="text-xs text-slate-500 line-clamp-1">{roomData.question_text}</p>
                        </div>

                        {/* Bagian Aksi Kanan Header (Deadline, Unduh Excel, & Tombol Hapus) */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200/60 w-full sm:w-auto">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                                    <span>Dibuat: {new Date(roomData.created_at).toLocaleDateString('id-ID')}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                                    <span>
                                        Deadline: {roomData.deadline ? new Date(roomData.deadline).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : 'Tidak Ada'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {/* Tombol Unduh Excel */}
                                <ExportExcelButton
                                    roomTitle={roomData.title}
                                    roomCode={roomData.room_code}
                                    submissions={submissionList}
                                />

                                {/* Tombol Hapus Room */}
                                <DeleteRoomButton roomId={roomData.id} roomTitle={roomData.title} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Metric Cards Room */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="border border-slate-200/80 shadow-xs rounded-2xl bg-white">
                        <CardContent className="p-5 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Pengumpulan</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{submissionList.length} Mahasiswa</p>
                                <span className="text-[11px] text-blue-600 font-medium mt-1 inline-block">● Tugas Masuk</span>
                            </div>
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <Users className="w-5 h-5" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-slate-200/80 shadow-xs rounded-2xl bg-white">
                        <CardContent className="p-5 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rata-Rata Kelas</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{avgScore} <span className="text-xs text-slate-400 font-normal">/ 100</span></p>
                                <span className="text-[11px] text-emerald-600 font-medium mt-1 inline-block">Berdasarkan Skor AI</span>
                            </div>
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                                <Award className="w-5 h-5" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-slate-200/80 shadow-xs rounded-2xl bg-white">
                        <CardContent className="p-5 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Indikasi AI-Risk</p>
                                <p className="text-2xl font-bold text-slate-900 mt-1">{highRiskCount} Mahasiswa</p>
                                <span className="text-[11px] text-rose-600 font-medium mt-1 inline-block">High Risk Terdeteksi</span>
                            </div>
                            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                                <ShieldAlert className="w-5 h-5" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabel Submissions */}
                <SubmissionsTable submissions={submissionList} />

            </div>
        </main>
    )
}