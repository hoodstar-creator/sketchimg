"use client";

import { FormEvent, useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password: form.get("password") }),
    });

    if (response.ok) {
      window.location.replace("/admin");
      return;
    }

    setError(response.status === 503 ? "서버에 운영자 비밀번호가 설정되지 않았습니다." : "비밀번호가 올바르지 않습니다.");
    setBusy(false);
  }

  return (
    <form className="stack" onSubmit={submit}>
      <div className="field">
        <label htmlFor="password">비밀번호</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required />
      </div>
      {error && <div className="error" role="alert">{error}</div>}
      <button type="submit" disabled={busy}>{busy ? "확인 중…" : "로그인"}</button>
    </form>
  );
}
