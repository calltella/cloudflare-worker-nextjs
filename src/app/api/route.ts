// src/app/api/route.ts
import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { API } from "@/types";

// ← export default を削除し、名前付きエクスポートにする
export async function GET(request: Request) {
  const { env } = await getCloudflareContext({ async: true });
  const api = env.API as unknown as API;

  const res = await api.fetch(
    new Request("https://internal/api", {
      method: "GET",
    }),
  );
  const text = await res.text();

  const sum = await api.add(1, 2);

  return NextResponse.json({
    text,
    sum,
  });
}
