import { NextResponse } from 'next/server'
import { createClient } from '@/src/lib/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/dashboard'

    // Ambil URL domain publik secara dinamis (mendukung Vercel & Custom Domain)
    const forwardedHost = request.headers.get('x-forwarded-host')
    const isDev = process.env.NODE_ENV === 'development'

    let baseUrl = origin
    if (!isDev) {
        if (forwardedHost) {
            baseUrl = `https://${forwardedHost}`
        } else if (process.env.NEXT_PUBLIC_SITE_URL) {
            baseUrl = process.env.NEXT_PUBLIC_SITE_URL
        } else if (process.env.VERCEL_URL) {
            baseUrl = `https://${process.env.VERCEL_URL}`
        }
    }

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            return NextResponse.redirect(`${baseUrl}${next}`)
        }
    }

    return NextResponse.redirect(`${baseUrl}/login?error=AuthenticationFailed`)
}