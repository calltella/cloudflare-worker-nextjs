"use server";

import { revalidatePath } from "next/cache";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://hono-api:8787";

export async function createNote(formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");

  if (typeof title !== "string" || typeof content !== "string") {
    throw new Error("Invalid form data");
  }

  if (!title.trim()) {
    throw new Error("Title is required");
  }

  const res = await fetch(`${API_BASE_URL}/api/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create note: ${text}`);
  }

  // /notes を再検証 → 一覧が更新される
  revalidatePath("/notes");
}
