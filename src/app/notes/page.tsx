import { headers } from "next/headers";

async function getData() {
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
