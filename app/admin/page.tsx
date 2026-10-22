import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import Brand from "@/app/brand";
import UploadPanel from "./upload-panel";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/login");

  return (
    <main className="page">
      <section className="card stack">
        <Brand />
        <div className="section-heading">
          <h1>사진 업로드</h1>
          <p>완성된 그림을 촬영하면 손님용 QR코드를 만듭니다.</p>
        </div>
        <UploadPanel />
      </section>
    </main>
  );
}
