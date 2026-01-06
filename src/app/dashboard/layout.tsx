import { getCurrentProfile } from '@/lib/getCurrentProfile'
import { redirect } from 'next/navigation'
import DashboardHeader from '@/components/DashboardHeader'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const profile = await getCurrentProfile()

    if (!profile) redirect('/login')

    return (
        <div className="flex flex-col min-h-screen">
            <DashboardHeader role={profile.role as 'user' | 'admin'} />
            <div className="flex-grow pt-20">
                {children}
            </div>
        </div>
    )
}
