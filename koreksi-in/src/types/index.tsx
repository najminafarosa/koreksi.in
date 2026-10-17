export type RoomStatus = 'active' | 'archived' | 'closed'

export interface Room {
    id: string
    dosen_id?: string | null
    room_code: string
    title: string
    description?: string | null
    question_text: string
    answer_key_text: string
    rubric_rules?: string | null
    deadline?: string | null
    status: RoomStatus
    created_at: string
}

export interface Submission {
    id: string
    room_id: string
    student_nim: string
    student_name: string
    file_path?: string
    file_url?: string
    score?: number | null
    feedback?: string | null
    ai_risk?: string | null
    status?: string | null
    created_at?: string
}