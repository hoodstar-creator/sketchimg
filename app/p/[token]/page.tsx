import { notFound } from "next/navigation";

const TOKEN = /^[A-Za-z0-9_-]{22}$/;

export default async function PhotoPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!TOKEN.test(token)) notFound();

  return (
    <main className="page">
      <section className="card stack center">
        <h1>캐리커처가 완성됐어요</h1>
        <img className="photo" src={`/api/photo/${token}`} alt="완성된 캐리커처" />
        <a className="button full" href={`/api/photo/${token}?download=1`}>사진 다운로드</a>
      </section>
    </main>
  );
}
