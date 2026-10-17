'use server'

import { createClient } from '@/src/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createRoom(formData: FormData) {
    const supabase = await createClient()

    // 1. Ambil data user dosen yang sedang login aktif
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
        return { error: 'Anda harus login menggunakan akun Google Dosen terlebih dahulu.' }
    }

    const title = (formData.get('title') as string)?.trim()
    const roomCode = (formData.get('room_code') as string)?.trim().toUpperCase()
    const questionText = (formData.get('question_text') as string)?.trim()
    const answerKeyText = (formData.get('answer_key_text') as string)?.trim()
    const rubricRules = (formData.get('rubric_rules') as string)?.trim()

    const deadlineDate = formData.get('deadline_date') as string
    const deadlineTime = (formData.get('deadline_time') as string) || '23:59'

    if (!title || !roomCode || !questionText || !answerKeyText) {
        return { error: 'Mohon isi semua bidang yang wajib diisi.' }
    }

    // Menggabungkan Tanggal + Jam secara aman
    let formattedDeadline: string | null = null
    if (deadlineDate && deadlineDate.trim() !== '') {
        const combinedDateTimeString = `${deadlineDate}T${deadlineTime}:00`
        const parsedDate = new Date(combinedDateTimeString)

        if (!isNaN(parsedDate.getTime())) {
            formattedDeadline = parsedDate.toISOString()
        } else {
            return { error: 'Format tanggal atau jam yang dimasukkan tidak valid.' }
        }
    }

    // 2. Insert room (id dihapus agar digenerate otomatis oleh database Supabase)
    const { data, error } = await supabase
        .from('rooms')
        .insert([
            {
                dosen_id: user.id, // Tetap terikat dengan ID Google Auth Dosen sebagai pemilik room
                title,
                room_code: roomCode,
                question_text: questionText,
                answer_key_text: answerKeyText,
                rubric_rules: rubricRules || null,
                deadline: formattedDeadline,
                status: 'active',
            },
        ])
        .select()
        .single()

    if (error) {
        if (error.code === '23505') {
            return { error: `Kode Room "${roomCode}" sudah digunakan. Gunakan kode lain.` }
        }
        return { error: `Gagal membuat room: ${error.message}` }
    }

    revalidatePath('/dashboard')
    return { success: true, room: data }
}