import { NextResponse } from "next/server";
import type { API } from "@/types";

export const runtime = "edge";

export async function GET(request: Request) {
  // Service Binding はここでのみ取得可能
  const api = (globalThis as any).API as API | undefined;

  if (!api) {
    return NextResponse.json(
      { error: "Service Binding API is not available" },
      { status: 500 },
    );
  }

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
