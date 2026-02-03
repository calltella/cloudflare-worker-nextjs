// app/page.tsx (または該当のサーバーコンポーネント)
import { headers } from "next/headers";

type Result = {
  text: string;
  sum: number;
};

// ※ 相対パスでOK。環境に依存せず動く
async function getData(): Promise<Result> {
  // headers() は同期
  const _h = headers(); // 必要ならここで User-Agent 等を読む

  const res = await fetch("/api/worker-b", { cache: "no-store" });
  if (!res.ok) {
    // エラーログだけして、後段でフェイルセーフにするのが◎
    throw new Error(`Failed to fetch /api/worker-b: ${res.status} ${res.statusText}`);
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
