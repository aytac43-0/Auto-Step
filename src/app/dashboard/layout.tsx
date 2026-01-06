import DashboardHeader from '@/components/DashboardHeader'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <DashboardHeader />
            <div className="flex-grow pt-20">
                {children}
            </div>
        </div>
    )
}
