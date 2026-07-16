"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Photo = { src: string; pathname: string; caption: string };

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadPhotos = useCallback(async () => {
    const res = await fetch("/api/gallery", { cache: "no-store" });
    const json = await res.json();
    setPhotos(json.photos || []);
  }, []);

  useEffect(() => {
    fetch("/api/admin/login")
      .then((r) => r.json())
      .then((j) => setLoggedIn(!!j.loggedIn))
      .catch(() => setLoggedIn(false));
    loadPhotos();
  }, [loadPhotos]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setNotice(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const json = await res.json();
    setBusy(false);
    if (json.ok) {
      setLoggedIn(true);
      setPassword("");
    } else {
      setNotice({ kind: "err", text: json.error || "Login failed" });
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setLoggedIn(false);
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const files = fileRef.current?.files;
    if (!files || files.length === 0) {
      setNotice({ kind: "err", text: "Choose one or more images first" });
      return;
    }
    setBusy(true);
    setNotice(null);
    const form = new FormData();
    [...files].forEach((f) => form.append("files", f));
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Upload failed");
      setNotice({ kind: "ok", text: `Uploaded ${json.uploaded.length} photo(s)` });
      if (fileRef.current) fileRef.current.value = "";
      await loadPhotos();
    } catch (err) {
      setNotice({ kind: "err", text: err instanceof Error ? err.message : "Upload failed" });
    }
    setBusy(false);
  }

  async function handleDelete(photo: Photo) {
    if (!confirm(`Delete "${photo.caption || photo.pathname}" from the gallery?`)) return;
    setBusy(true);
    const res = await fetch("/api/admin/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: photo.src }),
    });
    const json = await res.json();
    setBusy(false);
    if (json.ok) {
      setNotice({ kind: "ok", text: "Photo deleted" });
      await loadPhotos();
    } else {
      setNotice({ kind: "err", text: json.error || "Delete failed" });
    }
  }

  return (
    <main className="min-h-screen bg-cream px-5 py-14">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl text-plum">Gallery Admin</h1>
            <p className="mt-1 text-sm text-plum-dark/60">
              Humming Events · manage the photos shown on the website
            </p>
          </div>
          <div className="flex gap-3">
            <a href="/" className="rounded-full border border-plum/20 px-5 py-2 text-sm text-plum hover:bg-plum/5">
              ← Back to site
            </a>
            {loggedIn && (
              <button
                onClick={handleLogout}
                className="rounded-full border border-rose/40 px-5 py-2 text-sm text-rose hover:bg-rose/5"
              >
                Log out
              </button>
            )}
          </div>
        </header>

        {notice && (
          <div
            className={`mb-6 rounded-xl p-4 text-sm ${
              notice.kind === "ok"
                ? "bg-green-100 text-green-800"
                : "bg-rose/10 text-rose"
            }`}
          >
            {notice.text}
          </div>
        )}

        {loggedIn === null ? (
          <p className="text-plum-dark/60">Checking session…</p>
        ) : !loggedIn ? (
          <form
            onSubmit={handleLogin}
            className="mx-auto max-w-sm rounded-2xl border border-gold/30 bg-white p-8 shadow-lg"
          >
            <h2 className="font-display text-xl text-plum">Log in</h2>
            <p className="mt-1 text-sm text-plum-dark/60">
              Enter the admin password to manage gallery photos.
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              autoFocus
              className="mt-4 w-full rounded-lg border border-plum/15 bg-cream/50 px-4 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
            />
            <button
              type="submit"
              disabled={busy}
              className="mt-4 w-full rounded-full bg-plum py-2.5 font-medium text-cream transition hover:bg-plum-dark disabled:opacity-60"
            >
              {busy ? "Logging in…" : "Log in"}
            </button>
          </form>
        ) : (
          <>
            <form
              onSubmit={handleUpload}
              className="rounded-2xl border border-gold/30 bg-white p-6 shadow-lg"
            >
              <h2 className="font-display text-xl text-plum">Upload photos</h2>
              <p className="mt-1 text-sm text-plum-dark/60">
                JPG / PNG / WebP, up to 8 MB each. They appear in the website
                gallery immediately — the file name becomes the caption.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  className="flex-1 rounded-lg border border-plum/15 bg-cream/50 px-3 py-2 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-plum file:px-4 file:py-1.5 file:text-cream"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="rounded-full bg-rose px-7 py-2.5 font-medium text-white transition hover:bg-rose/85 disabled:opacity-60"
                >
                  {busy ? "Working…" : "Upload"}
                </button>
              </div>
            </form>

            <section className="mt-8">
              <h2 className="font-display text-xl text-plum">
                Current gallery ({photos.length} uploaded)
              </h2>
              {photos.length === 0 ? (
                <p className="mt-2 rounded-xl bg-white p-4 text-sm text-plum-dark/60">
                  No uploaded photos yet — the website is showing its 8 built-in
                  photos. Upload photos above to replace them.
                </p>
              ) : (
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {photos.map((p) => (
                    <figure key={p.pathname} className="overflow-hidden rounded-xl bg-white shadow">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.src} alt={p.caption} className="aspect-square w-full object-cover" />
                      <figcaption className="flex items-center justify-between gap-2 p-2 text-xs text-plum-dark/70">
                        <span className="truncate">{p.caption}</span>
                        <button
                          onClick={() => handleDelete(p)}
                          disabled={busy}
                          className="shrink-0 rounded-full bg-rose/10 px-2.5 py-1 font-medium text-rose hover:bg-rose/20"
                        >
                          Delete
                        </button>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
