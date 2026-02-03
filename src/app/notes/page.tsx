// app/page.tsx
export const runtime = "edge";

import { getCloudflareContext } from "@opennextjs/cloudflare";

type Result = {
  text: string;
  sum: number;
};

async function getData(): Promise<Result> {
  // Service Binding 経由で API Worker を呼ぶ
  const api = getCloudflareContext().env.API;

  if (!api) {
    throw new Error("Service Binding 'API' is not available on this worker.");
  }

  // 叩きたいパスを明示（相手 Worker のルーティングに合わせる）
  const res = await api.fetch("/", {
    // Service Binding の fetch には Next の cache 制御は効きません
    // 必要ならヘッダー等を入れる
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch /api/worker-b: ${res.status} ${res.statusText}`);
  }

  // 返却は { text: string; sum: number } を想定
  return res.json();
}

export default async function Page() {
  try {
    const data = await getData();
    return (
      <main>
        <p>{data.text}</p>
        <p>合計: {data.sum}</p>
      </main>
    );
  } catch (e) {
    // ここでログ収集（Sentry等）も検討
    return (
      <main>
        <p>データの取得に失敗しました。しばらくしてから再度お試しください。</p>
      </main>
    );
  }
}
``