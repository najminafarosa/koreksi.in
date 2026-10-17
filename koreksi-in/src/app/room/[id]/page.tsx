import { createClient } from '@/src/lib/supabase/server'
import { notFound } from 'next/navigation'
import SubmissionForm from './submission-form'
import { Room } from '@/src/types'


interface PageProps {
    params: Promise<{ id: string }>
}

export default async function StudentRoomPage({ params }: PageProps) {
    const { id } = await params
    const supabase = await createClient()

    // Ambil detail room
    const { data: room, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !room) {
        notFound()
    }

    const roomData: Room = room

    return (
        <main className="min-h-screen bg-slate-50/60 py-10 font-sans">
            <SubmissionForm
                roomId={roomData.id}
                roomTitle={roomData.title}
                questionText={roomData.question_text}
            />
        </main>
    )
}