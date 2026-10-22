import { notFound } from "next/navigation";
import Brand from "@/app/brand";

const TOKEN = /^[A-Za-z0-9_-]{22}$/;

export default async function PhotoPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!TOKEN.test(token)) notFound();

  return (
    <main className="page">
      <section className="card stack center">
        <Brand />
        <div className="section-heading">
          <h1>완성된 캐리커처</h1>
          <p>아래 버튼을 눌러 사진을 저장하세요.</p>
        </div>
        <img className="photo" src={`/api/photo/${token}`} alt="완성된 캐리커처" />
        <a className="button full" href={`/api/photo/${token}?download=1`}>사진 다운로드</a>
      </section>
    </main>
  );
}
