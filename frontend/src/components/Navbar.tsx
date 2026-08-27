export function Navbar() {
  return (
    <header className="h-16 border-b bg-white">
      <div className="flex h-full items-center justify-between px-6">
        <h1 className="text-xl font-semibold text-slate-900">
          TaskFlow
        </h1>

        <div className="text-sm text-slate-600">
          Admin
        </div>
      </div>
    </header>
  );
}
