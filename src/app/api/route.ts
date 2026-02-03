// app/api/hello/route.ts
import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { API } from "@/types";

// runtime = "edge" は削除（open-next では Node runtime が推奨）

export default async function GET(request: Request) {
  const { env } = await getCloudflareContext({ async: true });
  // unknown を経由してキャスト
  const api = env.API as unknown as API;

  // WorkerEntrypoint.fetch
  const res = await api.fetch(
    new Request("https://internal/api", {
      method: "GET",
    }),
  );
  const text = await res.text();

  // RPC 呼び出し
  const sum = await api.add(1, 2);

  return NextResponse.json({
    text,
    sum,
  });
}
