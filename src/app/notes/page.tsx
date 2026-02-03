export const dynamic = "force-dynamic";

type Result = {
  text: string;
  sum: number;
};

async function getData(): Promise<Result> {
  const res = await fetch("/api/worker-b", {
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
