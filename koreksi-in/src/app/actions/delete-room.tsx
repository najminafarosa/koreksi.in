'use server'

import { createClient } from '@/src/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteRoom(roomId: string) {
    const supabase = await createClient()

    // Hapus data room dari database Supabase
    // (Pastikan relasi foreign key di tabel submissions sudah diatur ON DELETE CASCADE,
    // atau hapus submissions terkait terlebih dahulu jika diperlukan).
    const { error: deleteSubmissionsError } = await supabase
        .from('submissions')
        .delete()
        .eq('room_id', roomId)

    if (deleteSubmissionsError) {
        return { error: `Gagal menghapus data pengumpulan: ${deleteSubmissionsError.message}` }
    }

    const { error: deleteRoomError } = await supabase
        .from('rooms')
        .delete()
        .eq('id', roomId)

    if (deleteRoomError) {
        return { error: `Gagal menghapus room: ${deleteRoomError.message}` }
    }

    revalidatePath('/dashboard') // Sesuaikan dengan route halaman utama dashboard dosen
    redirect('/dashboard')       // Arahkan kembali ke halaman utama setelah terhapus
}