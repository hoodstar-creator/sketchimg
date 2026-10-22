import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import Brand from "@/app/brand";
import LoginForm from "./login-form";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main className="page">
      <section className="card stack">
        <Brand />
        <div className="section-heading">
          <h1>운영자 로그인</h1>
          <p>사진 업로드를 위한 운영자 전용 페이지입니다.</p>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
