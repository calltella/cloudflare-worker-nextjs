import { NextResponse } from "next/server";
import type { API } from "../../../types";

export const runtime = "edge";

export async function GET(request: Request) {
  // Service Binding はここで使える
  const workerB = (globalThis as any).WORKER_B as API;

  if (!workerB) {
    return NextResponse.json(
      { error: "WORKER_B is not available" },
      { status: 500 },
    );
  }

  // fetch 相当
  const res = await workerB.fetch(request);
  const text = await res.text();

  // RPC 相当
  const sum = await workerB.add(1, 2);

  return NextResponse.json({
    text,
    sum,
  });
}
