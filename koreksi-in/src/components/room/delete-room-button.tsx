'use client'

import { useState, useTransition } from 'react'
import { deleteRoom } from '@/src/app/actions/delete-room' // Sesuaikan path action milikmu
import { Button } from '@/src/components/ui/button'
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react'

interface DeleteRoomButtonProps {
    roomId: string
    roomTitle: string
}

export default function DeleteRoomButton({ roomId, roomTitle }: DeleteRoomButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleDelete = () => {
        setErrorMessage(null)
        startTransition(async () => {
            const result = await deleteRoom(roomId)
            if (result?.error) {
                setErrorMessage(result.error)
            }
        })
    }

    return (
        <>
            {/* Tombol Pemicu Modal */}
            <Button
                onClick={() => setIsOpen(true)}
                variant="outline"
                className="rounded-xl text-xs font-semibold border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 gap-1.5"
            >
                <Trash2 className="w-3.5 h-3.5" />
                Hapus Room
            </Button>

            {/* Modal Dialog Konfirmasi */}
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-white border border-slate-200 shadow-xl rounded-2xl p-6 space-y-4 text-slate-800">

                        {/* Header Warning */}
                        <div className="flex items-center gap-3 text-rose-600">
                            <div className="p-2.5 bg-rose-50 rounded-xl">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-900">Hapus Room Penilaian?</h3>
                                <p className="text-xs text-slate-500">Tindakan ini tidak dapat dibatalkan.</p>
                            </div>
                        </div>

                        {/* Detail Konfirmasi */}
                        <p className="text-xs text-slate-600 leading-relaxed">
                            Apakah kamu yakin ingin menghapus room <strong className="text-slate-900">&quot;{roomTitle}&quot;</strong>? Seluruh data riwayat pengumpulan tugas dan hasil penilaian AI mahasiswa di dalamnya akan ikut terhapus secara permanen.
                        </p>

                        {/* Pesan Error jika gagal */}
                        {errorMessage && (
                            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                                {errorMessage}
                            </div>
                        )}

                        {/* Tombol Aksi */}
                        <div className="flex justify-end gap-2 pt-2">
                            <Button
                                onClick={() => setIsOpen(false)}
                                variant="outline"
                                disabled={isPending}
                                className="rounded-xl text-xs px-4 py-2 border-slate-200"
                            >
                                Batal
                            </Button>
                            <Button
                                onClick={handleDelete}
                                disabled={isPending}
                                className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs px-4 py-2 gap-1.5"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        Menghapus...
                                    </>
                                ) : (
                                    'Ya, Hapus Permanen'
                                )}
                            </Button>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}