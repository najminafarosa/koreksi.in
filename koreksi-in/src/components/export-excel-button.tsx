'use client'

import * as XLSX from 'xlsx'
import { Download } from 'lucide-react'

interface SubmissionData {
    student_nim: string
    student_name: string
    created_at?: string
    score?: number | null
    ai_risk?: string | null
    feedback_summary?: string | null
}

interface ExportExcelButtonProps {
    roomTitle: string
    roomCode: string
    submissions: SubmissionData[]
}

export default function ExportExcelButton({ roomTitle, roomCode, submissions }: ExportExcelButtonProps) {
    const handleExport = () => {
        if (!submissions || submissions.length === 0) {
            alert('Belum ada data pengumpulan mahasiswa untuk diunduh.')
            return
        }

        // Format data agar rapi di tabel Excel
        const excelData = submissions.map((sub, index) => ({
            'No': index + 1,
            'NIM': sub.student_nim,
            'Nama Mahasiswa': sub.student_name,
            'Waktu Pengumpulan': sub.created_at ? new Date(sub.created_at).toLocaleString('id-ID') : '-',
            'Skor AI': sub.score ?? 'Belum Dinilai',
            'Risiko AI': sub.ai_risk ? sub.ai_risk.toUpperCase() : 'N/A',
            'Ringkasan Feedback': sub.feedback_summary || '-'
        }))

        // Buat Worksheet & Workbook
        const worksheet = XLSX.utils.json_to_sheet(excelData)

        // Atur lebar kolom agar tidak terpotong saat dibuka di Excel
        const columnWidths = [
            { wch: 5 },  // No
            { wch: 15 }, // NIM
            { wch: 25 }, // Nama
            { wch: 22 }, // Waktu
            { wch: 10 }, // Skor
            { wch: 12 }, // Risiko AI
            { wch: 50 }, // Feedback
        ]
        worksheet['!cols'] = columnWidths

        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Hasil Penilaian')

        // Generate nama file (contoh: Hasil_Koreksi_ALGO-25.xlsx)
        const filename = `Hasil_Koreksi_${roomCode.replace(/\s+/g, '_')}.xlsx`

        // Download file .xlsx
        XLSX.writeFile(workbook, filename)
    }

    return (
        <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-all"
        >
            <Download className="w-4 h-4 text-gray-500" />
            Unduh Excel (.xlsx)
        </button>
    )
}