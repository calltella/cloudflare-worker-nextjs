// /app/src/app/notes/page.tsx
import { utcFormatDateTimeWithDay } from "@/lib/date"
import { createNote } from "./actions"

type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

type Env = {
  API: Fetcher;
};

export async function getNotes(env: Env): Promise<Note[]> {
  const res = await env.API.fetch("/api/notes", {
    headers: {
      accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch notes: ${text}`);
  }

  return res.json() as Promise<Note[]>;
}

export default async function UsersPage() {
  const notes = await getNotes(process.env as any);

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Notes</h1>

      {/* ノート作成フォーム */}
      <form action={createNote} className="mb-8 space-y-4">
        <div>
          <input
            type="text"
            name="title"
            placeholder="タイトル"
            required
            className="w-full rounded border p-2"
          />
        </div>
        <div>
          <textarea
            name="content"
            placeholder="内容"
            rows={4}
            className="w-full rounded border p-2"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white hover:opacity-80"
        >
          登録
        </button>
      </form>

      {/* ノート一覧 */}
      {notes.length === 0 ? (
        <p className="text-gray-500">ノートがありません</p>
      ) : (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li key={note.id} className="rounded border p-4">
              <h2 className="font-semibold">{note.title}</h2>
              <p className="mt-2 text-gray-700">{note.content}</p>
              <p className="mt-2 text-xs text-gray-400">
                {utcFormatDateTimeWithDay(note.createdAt)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
