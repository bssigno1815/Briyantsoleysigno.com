import AdminCommsPanel from '@/components/AdminCommsPanel';

export default function AdminDashboard() {
  // ensure your auth guard here (admins only)
  return (
    <main className="min-h-screen bg-black text-orange-400 p-6">
      <h1 className="text-2xl font-bold mb-6">BSS • Admin Communications</h1>
      <AdminCommsPanel />
    </main>
  );
}
