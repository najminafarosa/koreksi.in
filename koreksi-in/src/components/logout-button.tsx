'use client'

import { useTransition } from 'react'
import { signOut } from '@/src/app/actions/auth'
import { Button } from '@/src/components/ui/button'
import { LogOut, Loader2 } from 'lucide-react'

export default function LogoutButton() {
    const [isPending, startTransition] = useTransition()

    const handleLogout = () => {
        startTransition(async () => {
            await signOut()
        })
    }

    return (
        <Button
            onClick={handleLogout}
            disabled={isPending}
            variant="outline"
            className="rounded-xl text-xs font-semibold border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 gap-1.5"
        >
            {isPending ? (
                <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-500" />
                    Keluar...
                </>
            ) : (
                <>
                    <LogOut className="w-3.5 h-3.5 text-slate-500" />
                    Keluar Akun
                </>
            )}
        </Button>
    )
}