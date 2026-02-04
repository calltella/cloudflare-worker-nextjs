import Link from "next/link";

export default function Home() {
  console.log(`process.env.API_BASE_URL: ${process.env.API_BASE_URL}`)
  return (
    <main className="min-h-screen flex flex-col items-center">
      <Link
        href="/notes"
        className="md:px-4 py-2 block text-(--color-text) hover:text-(--color-secondary)"
      >
        Notes
      </Link>
    </main>
  );
}
