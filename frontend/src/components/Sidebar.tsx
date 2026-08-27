export function Sidebar() {
    return (
        <aside className="hidden min-h-[calc(100vh-64px)] w-64 border-r bg-white md:block">
            <nav className="p-4">
                <ul className="space-y-2">
                    <li>Dashboard</li>
                    <li>Tasks</li>
                    <li>Users</li>
                </ul>
            </nav>
        </aside>
    );
}
