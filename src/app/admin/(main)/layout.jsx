import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyToken } from "../../../../../../lib/auth";
import { AdminSidebar } from "../../../../../../components/admin/AdminSidebar";

export default async function AdminMainLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    // Optionally, you could also clear the invalid cookie here
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
