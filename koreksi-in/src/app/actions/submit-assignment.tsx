'use server'

import { createClient } from '@/src/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitAssignment(roomId: string, formData: FormData) {
    const supabase = await createClient()

    const studentNim = (formData.get('student_nim') as string)?.trim()
    const studentName = (formData.get('student_name') as string)?.trim()
    const file = formData.get('file') as File

    if (!studentNim || !studentName || !file || file.size === 0) {
        return { error: 'Mohon isi NIM, Nama, dan unggah file PDF jawaban.' }
    }

    if (file.type !== 'application/pdf') {
        return { error: 'Format file harus berupa dokumen PDF.' }
    }

    // 0. Ambil room_code terlebih dahulu dari tabel rooms berdasarkan roomId
    const { data: roomData, error: roomError } = await supabase
        .from('rooms')
        .select('room_code')
        .eq('id', roomId)
        .single()

    if (roomError || !roomData) {
        return { error: 'Gagal memuat data room yang dituju.' }
    }

    // 1. Upload file PDF ke Supabase Storage (bucket: 'assignment')
    const fileExt = file.name.split('.').pop()
    const fileName = `${roomId}/${studentNim}-${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
        .from('assignment')
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
        })

    if (uploadError) {
        return { error: `Gagal mengunggah file: ${uploadError.message}` }
    }

    // Dapatkan Public URL file yang diunggah
    const { data: publicUrlData } = supabase.storage
        .from('assignment')
        .getPublicUrl(fileName)

    const filePath = publicUrlData.publicUrl

    // 2. Simpan record ke tabel 'submissions' dan dapatkan ID-nya
    const { data: insertedData, error: insertError } = await supabase
        .from('submissions')
        .insert([
            {
                room_id: roomId,
                student_nim: studentNim,
                student_name: studentName,
                file_path: filePath,
            },
        ])
        .select('id')
        .single()

    if (insertError) {
        return { error: `Gagal menyimpan data pengumpulan: ${insertError.message}` }
    }

    // 3. Pemicu Webhook ke n8n dengan menyertakan room_code
    try {
        await fetch('https://n8n.koreksi-in.web.id/webhook/process-submission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                submission_id: insertedData.id,
                room_id: roomId,
                room_code: roomData.room_code, // <-- room_code sekarang ikut terkirim ke n8n
                student_nim: studentNim,
                student_name: studentName,
                file_url: filePath,
            }),
        })
    } catch (webhookError) {
        console.error('Gagal mengirim webhook ke n8n:', webhookError)
    }

    revalidatePath(`/room/${roomId}/dashboard`)
    return { success: true }
}