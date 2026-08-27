import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

type AppLayoutProps = {
    children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <div className="flex">
                <Sidebar />

                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
