import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import UploadPanel from "./upload-panel";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/login");

  return (
    <main className="page">
      <section className="card stack">
        <div>
          <h1>사진 전달</h1>
          <p>사진 한 장을 선택하면 손님용 QR코드를 만듭니다.</p>
        </div>
        <UploadPanel />
      </section>
    </main>
  );
}
