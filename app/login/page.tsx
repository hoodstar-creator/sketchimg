import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/auth";
import LoginForm from "./login-form";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main className="page">
      <section className="card stack">
        <div>
          <h1>운영자 로그인</h1>
          <p>사진을 업로드하려면 운영자 비밀번호를 입력하세요.</p>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
