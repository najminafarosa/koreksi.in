'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitAssignment(formData: FormData) {
    const supabase = await createClient()

    const file = formData.get('file') as File
    const roomId = formData.get('room_id') as string
    const studentNim = formData.get('student_nim') as string
    const studentName = formData.get('student_name') as string

    if (!file || !roomId || !studentNim || !studentName) {
        return { error: 'Semua field wajib diisi' }
    }

    try {
        // 1. Upload File ke Supabase Storage (Bucket: 'assignment')
        const fileExt = file.name.split('.').pop()
        const fileName = `${roomId}/${studentNim}_${Date.now()}.${fileExt}`

        const { data: storageData, error: uploadError } = await supabase.storage
            .from('assignment')
            .upload(fileName, file)

        if (uploadError) {
            console.error('Storage Upload Error:', uploadError)
            return { error: 'Gagal mengunggah file PDF' }
        }

        // 2. Dapatkan Public URL File yang diunggah
        const { data: urlData } = supabase.storage
            .from('assignment')
            .getPublicUrl(fileName)

        const fileUrl = urlData.publicUrl

        // 3. Simpan Initial Record Submission ke Database Supabase
        const { data: submission, error: dbError } = await supabase
            .from('submissions')
            .insert({
                room_id: roomId,
                student_nim: studentNim,
                student_name: studentName,
                file_path: fileUrl,
                status: 'pending'
            })
            .select()
            .single()

        if (dbError) {
            console.error('Database Error:', dbError)
            return { error: 'Gagal menyimpan data pengumpulan' }
        }

        // 4. Trigger n8n Production Webhook secara Asynchronous (Background)
        const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL
        if (n8nWebhookUrl) {
            fetch(n8nWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    submission_id: submission.id,
                    room_id: roomId,
                    student_nim: studentNim,
                    student_name: studentName,
                    file_url: fileUrl
                })
            }).catch((err) => console.error('Error triggering n8n webhook:', err))
        }

        revalidatePath(`/room/${roomId}`)
        return { success: true, submissionId: submission.id }

    } catch (err) {
        console.error('Server Action Error:', err)
        return { error: 'Terjadi kesalahan pada server' }
    }
}