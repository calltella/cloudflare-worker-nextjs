export const dynamic = "force-dynamic";
import { headers } from "next/headers";

type Result = {
  text: string;
  sum: number;
};

async function getData(): Promise<Result> {
  const h = await headers(); // ← await が必須
  const host = h.get("host");

  if (!host) {
    throw new Error("Host header not found");
  }

  const url = `https://${host}/api/worker-b`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch worker-b");
  }

  return res.json();
}


export default async function Page() {
  try {
    const data = await getData(); // data.text / data.sum が使える
    return (
      <main>
        <p>{data.text}</p>
        <p>合計: {data.sum}</p>
      </main>
    );
  } catch (e) {
    // ユーザー向けフェイルセーフ
    return (
      <main>
        <p>データの取得に失敗しました。しばらくしてから再度お試しください。</p>
      </main>
    );
  }
}

