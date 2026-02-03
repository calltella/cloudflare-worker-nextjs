export const dynamic = "force-dynamic";

import { utcFormatDateTimeWithDay } from "@/lib/date";
import { createNote } from "./actions";

type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

// OpenNext が注入する実行時 Env
function getEnv() {
  return (globalThis as any).__OPEN_NEXT_ENV__ as {
    API: Fetcher;
  };
}

export async function getNotes(): Promise<Note[]> {
  const env = getEnv();

  if (!env?.API) {
    throw new Error("Service Binding API is not available");
  }

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

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Notes</h1>

      <form action={createNote} className="mb-8 space-y-4">
        <input
          type="text"
          name="title"
          placeholder="タイトル"
          required
          className="w-full rounded border p-2"
        />
        <textarea
          name="content"
          placeholder="内容"
          rows={4}
          className="w-full rounded border p-2"
        />
        <button className="rounded bg-black px-4 py-2 text-white">
          登録
        </button>
      </form>

      {notes.length === 0 ? (
        <p className="text-gray-500">ノートがありません</p>
      ) : (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li key={note.id} className="rounded border p-4">
              <h2 className="font-semibold">{note.title}</h2>
              <p className="mt-2">{note.content}</p>
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
