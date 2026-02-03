import { headers } from "next/headers";

type Result = {
  text: string;
  sum: number;
};

export const dynamic = "force-dynamic";

async function getData(): Promise<Result> {
  const h = await headers();
  const host = h.get("host");

  if (!host) {
    throw new Error("Host header not found");
  }

  const url = `https://${host}/api`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch worker-b");
  }

  return res.json();
}

export default async function Page() {
  const { text, sum } = await getData();

  return (
    <main>
      <p>{text}</p>
      <p>sum: {sum}</p>
    </main>
  );
}
